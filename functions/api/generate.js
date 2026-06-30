import { systemInstruction } from './skill.js';

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { keyword, modelConfig } = await request.json();

    if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
      return new Response(JSON.stringify({ error: '请输入有效的教学主题关键词。' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const cleanKeyword = keyword.trim();
    const modelId = modelConfig ? `${modelConfig.provider}:${modelConfig.modelName}` : 'built-in:gemini-2.5-flash';
    const cacheKey = `html:${modelId}:${cleanKeyword}`;
    const KV = env.AETHERVIZ_KV;

    // 1. 尝试从 KV 缓存中读取
    if (KV) {
      try {
        const cachedHtml = await KV.get(cacheKey);
        if (cachedHtml) {
          console.log(`[Edge Cache Hit] 命中缓存: [${modelId}] -> "${cleanKeyword}"`);
          return new Response(JSON.stringify({ html: cachedHtml, fromCache: true }), {
            status: 200,
            headers: { 
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      } catch (err) {
        console.error('[Cache Read Error]', err);
      }
    }

    let htmlContent = '';
    const builtInApiKey = env.GEMINI_API_KEY;

    // 判断是使用前端传入的自定义模型配置，还是回退到后端预配置的 Gemini API
    if (modelConfig && modelConfig.apiKey) {
      console.log(`[Edge] 正在通过自定义模型 [${modelConfig.provider} - ${modelConfig.modelName}] 生成主题 "${keyword}"...`);
      htmlContent = await callCustomModel(keyword, modelConfig, systemInstruction);
    } else {
      // 回退逻辑
      if (!builtInApiKey) {
        return new Response(JSON.stringify({ error: '边缘服务未配置内置 GEMINI_API_KEY，且未收到前端自定义的模型配置。请在界面上配置自定义模型，或在 Cloudflare 控制台添加环境变量。' }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
      
      console.log(`[Edge] 正在通过内置 Gemini 模型生成主题 "${keyword}"...`);
      htmlContent = await callGeminiDirectly(keyword, builtInApiKey, systemInstruction);
    }

    // 强力清洗：只提取 <!DOCTYPE html> 到 </html> 之间的真正网页源码，过滤掉模型输出的前言、思考文字和 markdown 包裹
    let cleanedHtml = htmlContent.trim();
    const docTypeIdx = cleanedHtml.toLowerCase().indexOf("<!doctype html>");
    const htmlEndIdx = cleanedHtml.toLowerCase().lastIndexOf("</html>");

    if (docTypeIdx !== -1 && htmlEndIdx !== -1 && htmlEndIdx > docTypeIdx) {
      cleanedHtml = cleanedHtml.substring(docTypeIdx, htmlEndIdx + 7);
    } else {
      // 降级处理：如果没有标准的首尾标签，则执行常规的 markdown 剥离
      if (cleanedHtml.startsWith("```html")) {
        cleanedHtml = cleanedHtml.substring(7);
      } else if (cleanedHtml.startsWith("```")) {
        cleanedHtml = cleanedHtml.substring(3);
      }
      if (cleanedHtml.endsWith("```")) {
        cleanedHtml = cleanedHtml.substring(0, cleanedHtml.length - 3);
      }
    }

    const finalHtml = cleanedHtml.trim();

    // 2. 将结果写入 KV 缓存，并更新全局历史列表
    if (KV && finalHtml) {
      try {
        await KV.put(cacheKey, finalHtml);
        
        const historyStr = await KV.get('history_list') || '[]';
        const history = JSON.parse(historyStr);
        const newHistoryItem = {
          id: `${modelId}:${cleanKeyword}:${Date.now()}`,
          keyword: cleanKeyword,
          modelName: modelConfig ? modelConfig.modelName : 'gemini-2.5-flash',
          provider: modelConfig ? modelConfig.provider : 'built-in',
          createdAt: new Date().toISOString()
        };

        const filtered = history.filter(item => !(item.keyword === newHistoryItem.keyword && item.modelName === newHistoryItem.modelName));
        filtered.unshift(newHistoryItem);

        if (filtered.length > 100) {
          filtered.pop();
        }

        await KV.put('history_list', JSON.stringify(filtered));
        console.log(`[Edge Cache Write] 缓存写入并更新历史: [${modelId}] -> "${cleanKeyword}"`);
      } catch (err) {
        console.error('[Cache Write Error]', err);
      }
    }
    
    return new Response(JSON.stringify({ html: finalHtml, fromCache: false }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('[Edge Error]', error);
    return new Response(JSON.stringify({ 
      error: '生成 3D 页面时发生错误，请检查您的 API 配置和网络状态。', 
      details: error.message 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// 边缘环境直接 fetch 调用 Custom Model
async function callCustomModel(keyword, config, systemInstruction) {
  const { provider, apiKey, baseURL, modelName } = config;
  const prompt = `教学主题：\"${keyword.trim()}\"。
请根据此主题，按照你的 AetherViz Master 规范，生成一个零依赖、可在浏览器中直接运行的高清3D交互式教学网页（单文件 HTML）。
请确保：
1. 包含完整的 HTML、CSS (利用 CDN 引入 Tailwind CSS)、JavaScript、Three.js、OrbitControls、KaTeX 等。
2. 包含一个侧边栏（包含原理说明、公式 KaTeX、重要性说明等）和一个主 3D 渲染 Canvas 区。
3. 包含底部的参数控制器面板和折叠式小测验面板。
4. 语言自动使用中文输出。
5. 必须严格遵守输出格式：只输出 HTML 代码本身，绝对不要包裹在 \`\`\`html 这里的 markdown 代码块中，绝对不要在代码外添加任何额外的文字或 markdown 解释。`;

  if (provider === "openai") {
    const url = `${baseURL.replace(/\/$/, "")}/chat/completions`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = `HTTP ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMsg = errorJson.error?.message || errorJson.message || errorMsg;
      } catch (e) {}
      throw new Error(`OpenAI 接口请求失败 (${errorMsg})`);
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      throw new Error("模型未返回任何结果");
    }
    return data.choices[0].message.content;
  } 
  
  if (provider === "anthropic") {
    const url = `${baseURL.replace(/\/$/, "")}/v1/messages`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: modelName,
        system: systemInstruction,
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 4000,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = `HTTP ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMsg = errorJson.error?.message || errorJson.message || errorMsg;
      } catch (e) {}
      throw new Error(`Anthropic 接口请求失败 (${errorMsg})`);
    }

    const data = await response.json();
    if (!data.content || data.content.length === 0) {
      throw new Error("模型未返回任何结果");
    }
    return data.content[0].text;
  }

  throw new Error(`不支持的接口提供商: ${provider}`);
}

// 边缘环境直接 fetch 调用 Google Gemini API
async function callGeminiDirectly(keyword, apiKey, systemInstruction) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const prompt = `教学主题：\"${keyword.trim()}\"。
请根据此主题，按照你的 AetherViz Master 规范，生成一个零依赖、可在浏览器中直接运行的高清3D交互式教学网页（单文件 HTML）。
请确保：
1. 包含完整的 HTML、CSS (利用 CDN 引入 Tailwind CSS)、JavaScript、Three.js、OrbitControls、KaTeX 等。
2. 包含一个侧边栏（包含原理说明、公式 KaTeX、重要性说明等）和一个主 3D 渲染 Canvas 区。
3. 包含底部的参数控制器面板和折叠式小测验面板。
4. 语言自动使用中文输出。
5. 必须严格遵守输出格式：只输出 HTML 代码本身，绝对不要包裹在 \`\`\`html 这里的 markdown 代码块中，绝对不要在代码外添加任何额外的文字或 markdown 解释。`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        temperature: 0.1
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMsg = `HTTP ${response.status}`;
    try {
      const errorJson = JSON.parse(errorText);
      errorMsg = errorJson.error?.message || errorJson.message || errorMsg;
    } catch (e) {}
    throw new Error(`Gemini 接口请求失败 (${errorMsg})`);
  }

  const data = await response.json();
  if (!data.candidates || data.candidates.length === 0) {
    throw new Error("Gemini 未返回任何候选结果");
  }
  return data.candidates[0].content.parts[0].text;
}

// 处理预检请求 (CORS Option)
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
