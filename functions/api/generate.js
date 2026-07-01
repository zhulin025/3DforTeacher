import { systemInstruction } from './skill.js';

// 主入口：处理 POST 请求（启动异步生成任务）
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

    // 1. 限流检查（Rate Limiting）：单 IP 限制 1 分钟最多请求 3 次
    if (KV) {
      try {
        const ip = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
        const minuteTimestamp = Math.floor(Date.now() / 60000);
        const rateLimitKey = `rate:${ip}:${minuteTimestamp}`;
        
        const currentCountStr = await KV.get(rateLimitKey);
        const currentCount = currentCountStr ? parseInt(currentCountStr) : 0;
        
        if (currentCount >= 3) {
          return new Response(JSON.stringify({ error: '请求过于频繁，请稍候再试（限流限制：1分钟最多 3 次）。' }), {
            status: 429,
            headers: { 
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
        // 累加计数，设置 120 秒过期
        await KV.put(rateLimitKey, (currentCount + 1).toString(), { expirationTtl: 120 });
      } catch (err) {
        console.error('[Rate Limit Error]', err);
      }
    }

    // 2. 尝试从 KV 缓存中同步读取
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

    // 3. 创建异步生成任务
    const taskId = crypto.randomUUID();
    const taskKey = `task:${taskId}`;
    
    const initialTask = {
      status: 'pending',
      keyword: cleanKeyword,
      createdAt: Date.now()
    };

    if (KV) {
      // 写入初始 pending 状态，30分钟自动过期清理
      await KV.put(taskKey, JSON.stringify(initialTask), { expirationTtl: 1800 });
      
      // 启动 waitUntil 后台线程执行生成 + 校验 + 重试
      context.waitUntil(runAsyncTask(taskId, cleanKeyword, modelConfig, env));
    } else {
      return new Response(JSON.stringify({ error: '边缘环境缺失 KV 绑定，无法启动生成任务。' }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 立即向前端返回任务 ID
    return new Response(JSON.stringify({ taskId, status: 'pending', fromCache: false }), {
      status: 202,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('[Edge POST Error]', error);
    return new Response(JSON.stringify({ 
      error: '接收生成指令时发生错误。', 
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

// 轮询状态接口：支持 GET 获取任务状态
export async function onRequestGet(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');

    if (!taskId) {
      return new Response(JSON.stringify({ error: '缺少 taskId 参数。' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const KV = env.AETHERVIZ_KV;
    if (!KV) {
      return new Response(JSON.stringify({ error: '边缘服务未配置 KV 数据库。' }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const taskDataStr = await KV.get(`task:${taskId}`);
    if (!taskDataStr) {
      return new Response(JSON.stringify({ status: 'failed', error: '任务记录未找到或已过期失效。' }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 直接返回任务 JSON 对象 (包含了 status, html, error 等)
    return new Response(taskDataStr, {
      status: 200,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('[Edge GET Error]', error);
    return new Response(JSON.stringify({ error: '读取任务状态时出错。', details: error.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// 后台任务异步处理链
async function runAsyncTask(taskId, keyword, modelConfig, env) {
  const KV = env.AETHERVIZ_KV;
  const taskKey = `task:${taskId}`;
  const modelId = modelConfig ? `${modelConfig.provider}:${modelConfig.modelName}` : 'built-in:gemini-2.5-flash';
  const cacheKey = `html:${modelId}:${keyword}`;
  
  try {
    // 1. 更新为 processing 状态
    await KV.put(taskKey, JSON.stringify({
      status: 'processing',
      keyword,
      createdAt: Date.now()
    }), { expirationTtl: 1800 });

    const builtInApiKey = env.GEMINI_API_KEY;
    let finalHtml = '';
    let success = false;
    let lastErrorMsg = '';

    // 2. 带自动重试与质量检测的大模型请求（最多重试 3 次）
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`[Task ${taskId}] 正在发起生成尝试 #${attempt}，模型: [${modelId}]`);
        
        let rawHtml = '';
        if (modelConfig && modelConfig.apiKey) {
          rawHtml = await callCustomModel(keyword, modelConfig, systemInstruction);
        } else {
          if (!builtInApiKey) {
            throw new Error('边缘服务未配置内置 GEMINI_API_KEY，且未收到前端自定义的模型配置。请在界面上配置自定义模型，或在 Cloudflare 控制台添加环境变量。');
          }
          rawHtml = await callGeminiDirectly(keyword, builtInApiKey, systemInstruction);
        }

        // 清洗提取 HTML
        let cleanedHtml = rawHtml.trim();
        const docTypeIdx = cleanedHtml.toLowerCase().indexOf("<!doctype html>");
        const htmlEndIdx = cleanedHtml.toLowerCase().lastIndexOf("</html>");

        if (docTypeIdx !== -1 && htmlEndIdx !== -1 && htmlEndIdx > docTypeIdx) {
          cleanedHtml = cleanedHtml.substring(docTypeIdx, htmlEndIdx + 7);
        } else {
          if (cleanedHtml.startsWith("```html")) cleanedHtml = cleanedHtml.substring(7);
          else if (cleanedHtml.startsWith("```")) cleanedHtml = cleanedHtml.substring(3);
          if (cleanedHtml.endsWith("```")) cleanedHtml = cleanedHtml.substring(0, cleanedHtml.length - 3);
        }
        
        const candidateHtml = cleanedHtml.trim();

        // 质量检测与自适应闭合修补
        const validation = validateAndRepairHtml(candidateHtml);
        if (validation.valid) {
          finalHtml = validation.repairedHtml;
          success = true;
          console.log(`[Task ${taskId}] 尝试 #${attempt} 验证通过（包含可能的截断修补）！`);
          break;
        } else {
          console.warn(`[Task ${taskId}] 尝试 #${attempt} 校验未通过。原因: ${validation.reason}`);
          throw new Error(`代码体检未通过: ${validation.reason}`);
        }

      } catch (err) {
        lastErrorMsg = err.message;
        console.error(`[Task ${taskId}] 尝试 #${attempt} 失败: ${err.message}`);
        
        // 判断是否是不可恢复的配置/权限问题。若是，则无需重试，立即断开循环
        const isFatal = err.message.includes('API_KEY') || 
                        err.message.includes('未配置') || 
                        err.message.includes('401') || 
                        err.message.includes('403') || 
                        err.message.includes('Unauthorized') || 
                        err.message.includes('不支持的接口');
                        
        if (isFatal) {
          console.warn(`[Task ${taskId}] 检测到不可自动恢复的环境/鉴权错误，直接打回失败。`);
          break;
        }
        
        // 若还没到最后一次，休眠 1.5 秒后再试，防大模型并发保护
        if (attempt < 3) {
          await new Promise(r => setTimeout(r, 1500));
        }
      }
    }

    // 3. 处理最终结果
    if (success && finalHtml) {
      // 写入缓存
      await KV.put(cacheKey, finalHtml);

      // 更新历史记录
      try {
        const historyStr = await KV.get('history_list') || '[]';
        const history = JSON.parse(historyStr);
        const newHistoryItem = {
          id: `${modelId}:${keyword}:${Date.now()}`,
          keyword: keyword,
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
      } catch (err) {
        console.error(`[Task ${taskId}] 更新历史记录失败:`, err);
      }

      // 将任务写入成功状态并返回数据，过期时间 30 分钟
      await KV.put(taskKey, JSON.stringify({
        status: 'success',
        keyword,
        html: finalHtml,
        completedAt: Date.now()
      }), { expirationTtl: 1800 });
      
      console.log(`[Task Success] 任务 ${taskId} 生成并发布成功！`);

    } else {
      // 任务标记为失败
      await KV.put(taskKey, JSON.stringify({
        status: 'failed',
        keyword,
        error: `后端大模型生成失败: ${lastErrorMsg}`,
        failedAt: Date.now()
      }), { expirationTtl: 1800 });
      
      console.error(`[Task Failed] 任务 ${taskId} 最终失败: ${lastErrorMsg}`);
    }

  } catch (globalErr) {
    console.error(`[Task Uncaught Exception] ${taskId}:`, globalErr);
    try {
      await KV.put(taskKey, JSON.stringify({
        status: 'failed',
        keyword,
        error: `系统未捕获的后台运行异常: ${globalErr.message}`,
        failedAt: Date.now()
      }), { expirationTtl: 1800 });
    } catch (e) {}
  }
}

// 融合自适应软修复的代码质量检测函数
function validateAndRepairHtml(html) {
  if (!html || typeof html !== 'string') {
    return { valid: false, reason: '生成网页内容为空或非法', repairedHtml: html };
  }
  
  let repaired = html.trim();
  const lowerHtml = repaired.toLowerCase();
  
  // 1. 文档结构基本检测
  if (!lowerHtml.includes('<!doctype html>') && !lowerHtml.includes('<html')) {
    return { valid: false, reason: '缺少 HTML 基本文档结构标记', repairedHtml: html };
  }

  // 2. 自适应自动修补闭合（针对大模型生成中途被截断）
  let needsRepair = false;
  let appendContent = '';
  
  const openScriptCount = (lowerHtml.match(/<script/g) || []).length;
  const closeScriptCount = (lowerHtml.match(/<\/script>/g) || []).length;
  if (openScriptCount > closeScriptCount) {
    appendContent += '\n</script>';
    needsRepair = true;
  }
  
  if (!lowerHtml.includes('</body>')) {
    appendContent += '\n</body>';
    needsRepair = true;
  }
  
  if (!lowerHtml.includes('</html>')) {
    appendContent += '\n</html>';
    needsRepair = true;
  }
  
  if (needsRepair && appendContent) {
    repaired += appendContent;
    console.log(`[Validation Repair] 自动检测到大模型输出被截断，已追加修补标签: ${appendContent.replace(/\n/g, ' ')}`);
  }

  const updatedLowerHtml = repaired.toLowerCase();

  // 3. 3D 可视化依赖检查 (必须包含 Three.js)
  const hasThree = updatedLowerHtml.includes('three.js') || 
                   updatedLowerHtml.includes('three.min.js') || 
                   updatedLowerHtml.includes('unpkg.com/three') || 
                   updatedLowerHtml.includes('three.module') ||
                   updatedLowerHtml.includes('three@');
  if (!hasThree) {
    return { valid: false, reason: '未检测到任何 Three.js 3D 依赖库脚本引用', repairedHtml: repaired };
  }
  
  // 4. 场景渲染基本结构
  const hasCanvas = updatedLowerHtml.includes('canvas') || 
                    updatedLowerHtml.includes('renderer') || 
                    updatedLowerHtml.includes('webgl') || 
                    updatedLowerHtml.includes('three');
  if (!hasCanvas) {
    return { valid: false, reason: '缺少用于渲染 3D 场景的 Canvas/WebGL 配置或渲染类', repairedHtml: repaired };
  }

  // 5. 体量检测 (体量过短的通常是空模板或不完整回答)
  if (repaired.length < 1500) {
    return { valid: false, reason: '生成代码长度不足（仅 ' + repaired.length + ' 字节）', repairedHtml: repaired };
  }

  return { valid: true, repairedHtml: repaired };
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
