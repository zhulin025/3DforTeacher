import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" })); // 提高请求体大小限制以防万一
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 初始化 Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables. Model calls will fail.");
}
const genAI = new GoogleGenerativeAI(apiKey || "");

// 读取 SKILL.md 作为系统提示词
let systemInstruction = "";
try {
  systemInstruction = fs.readFileSync(path.join(__dirname, "SKILL.md"), "utf8");
} catch (error) {
  console.error("Error reading SKILL.md:", error);
}

const generationHistory = [];

app.get("/api/history", (req, res) => {
  res.json(generationHistory.slice(0, 30));
});

app.delete("/api/history", (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "缺少 id 参数。" });
  }

  const idx = generationHistory.findIndex(item => item.id === id);
  if (idx !== -1) {
    generationHistory.splice(idx, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "未找到对应的历史记录项。" });
  }
});

// 自定义模型接口调用助手
async function callCustomModel(keyword, config) {
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

app.post("/api/generate", async (req, res) => {
  const { keyword, modelConfig } = req.body;

  if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
    return res.status(400).json({ error: "请输入有效的教学主题关键词。" });
  }

  try {
    let htmlContent = "";

    // 判断是使用前端传入的自定义模型配置，还是回退到后端预配置的 Gemini API
    if (modelConfig && modelConfig.apiKey) {
      console.log(`正在通过自定义模型 [${modelConfig.provider} - ${modelConfig.modelName}] 生成主题 "${keyword}"...`);
      htmlContent = await callCustomModel(keyword, modelConfig);
    } else {
      // 回退逻辑
      if (!apiKey) {
        return res.status(500).json({ error: "服务器未配置内置 GEMINI_API_KEY，且未收到前端自定义的模型配置。请在界面上配置自定义模型或在后端配置 .env 文件。" });
      }
      
      console.log(`正在通过后端内置 Gemini 模型生成主题 "${keyword}"...`);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemInstruction,
      });

      const prompt = `教学主题：\"${keyword.trim()}\"。
请根据此主题，按照你的 AetherViz Master 规范，生成一个零依赖、可在浏览器中直接运行的高清3D交互式教学网页（单文件 HTML）。
请确保：
1. 包含完整的 HTML、CSS (利用 CDN 引入 Tailwind CSS)、JavaScript、Three.js、OrbitControls、KaTeX 等。
2. 包含一个侧边栏（包含原理说明、公式 KaTeX、重要性说明等）和一个主 3D 渲染 Canvas 区。
3. 包含底部的参数控制器面板和折叠式小测验面板。
4. 语言自动使用中文输出。
5. 必须严格遵守输出格式：只输出 HTML 代码本身，绝对不要包裹在 \`\`\`html 这里的 markdown 代码块中，绝对不要在代码外添加任何额外的文字或 markdown 解释。`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
        }
      });

      const geminiResponse = await result.response;
      htmlContent = geminiResponse.text();
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
    htmlContent = cleanedHtml.trim();

    generationHistory.unshift({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      keyword: keyword.trim(),
      provider: modelConfig?.provider || "built-in",
      modelName: modelConfig?.modelName || "gemini-2.5-flash",
      createdAt: new Date().toISOString()
    });
    if (generationHistory.length > 100) {
      generationHistory.length = 100;
    }

    console.log(`生成成功！HTML 大小：${htmlContent.length} 字节`);
    res.json({ html: htmlContent });
  } catch (error) {
    console.error("生成失败：", error);
    res.status(500).json({ 
      error: "生成 3D 页面时发生错误，请检查您的 API 配置和网络状态。",
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`服务器正在运行，访问：http://localhost:${PORT}`);
});
