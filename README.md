# AetherViz AI - 3D 教学可视化生成器网站

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/Node.js-20+-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.19-lightgrey.svg" alt="Express">
  <img src="https://img.shields.io/badge/Three.js-r134-orange.svg" alt="Three.js">
  <img src="https://img.shields.io/badge/Tailwind-v3.4-cyan.svg" alt="Tailwind">
</p>

AetherViz AI 是一个面向教师、学生和教育工作者的全栈 Web 应用程序。它将大语言模型的 3D 教育可视化生成 Skill（AetherViz Master）转化为了一个高顏值、交互式的图形化网站。

老师只需输入想要讲解的教学主题关键词，或者直接点击预设的学科卡片，系统就会调用主流的大语言模型，瞬间为您生成一个**零依赖、可在浏览器中直接运行的高清3D交互式教学网页**（单文件 HTML）。

---

## ✨ 核心特性

* **⚙️ 多模型自定义配置**：
  * 支持在网页端自由添加、编辑和删除多个大模型（如 OpenAI GPT-4o、Claude 3.5 Sonnet、DeepSeek V3 等）。
  * 所有的 API Key 和接口配置均完全本地存储在浏览器的 `LocalStorage` 中，**后端保持完全无状态**，保障隐私与密钥安全。
* **🔌 双接口协议兼容**：
  * 后端无状态代理完美兼容 **OpenAI 兼容协议** 和 **Anthropic 协议**，支持自定义 `Base URL`。
  * 同时也向下兼容，在未配置前端模型时，可自动回退使用后端预设的 Gemini 2.5 Flash 接口。
* **🧹 高精度源码提取**：
  * 内置 HTML 文档边界提取算法，能够精准地从模型的输出中提取首尾 `<!DOCTYPE html>` 到 `</html>` 的核心段落，彻底过滤并清洗大模型附带输出的前言废话、思考文字及 markdown 代码块包装。
* **⚛️ 3D 原子 Loading 动效**：
  * 设计了具有丰富科技感与物理韵味的 3D 旋转原子加载遮罩，配合动态加载进度条与智能提示轮播，给用户极佳的生成等待体验。
* **🖥️ 双栏式预览控制台**：
  * 左栏提供模型切换、关键词输入和按学科（物理、化学、生物、数学、天文、编程）分类的预设关键词列表。
  * 右栏以精美的浏览器 Mockup 窗口内嵌 `<iframe>` 渲染生成的 3D 页面，并提供「新窗口全屏交互」、「复制 HTML 源码」和「下载 lesson.html 文件」等辅助教学的操作按钮。

---

## 🛠 技术栈

| 层次 | 技术组件 | 作用与版本 |
|------|----------|------------|
| **前端** | Tailwind CSS | 提供现代化 UI 基础布局与栅格响应 |
| | FontAwesome | 提供高质感的科技感图标集 |
| | Google Fonts | 引入 `Outfit` 与 `Inter`  premium 字体家族 |
| | CSS3/Vanilla JS | 实现 Glassmorphism 磨砂玻璃背景及 3D 原子自转动画 |
| **后端** | Node.js / Express | 承载轻量级 Web 服务器与静态资源托管 |
| | Fetch API | 原生实现接口转发代理，零多余依赖 |
| | @google/generative-ai | 内置向后兼容的官方 Gemini API 驱动支持 |

---

## 🚀 快速启动

### 1. 准备工作
确保本地已安装 Node.js (建议 18.0.0 或更高版本)。

### 2. 克隆与安装依赖
```bash
# 进入项目目录
cd 3DforTeacher

# 安装必要的依赖包
npm install
```

### 3. 环境配置
1. 复制配置文件模板：
   ```bash
   cp .env.example .env
   ```
2. 编辑 `.env` 文件，根据需要填入内置的 `GEMINI_API_KEY`（非必填，若填入，则默认的内置 Gemini 模型立即可用）：
   ```env
   PORT=3000
   GEMINI_API_KEY=您的_GEMINI_API_KEY
   ```

### 4. 启动服务
```bash
# 启动本地服务器
npm run start
```
服务启动后，在浏览器中访问 **`http://localhost:3000`** 即可开启您的 3D 教育之旅！

---

## 📂 项目结构

```
3DforTeacher/
├── SKILL.md                  # AetherViz Master Skill 核心角色指令定义
├── README.md                 # 项目使用指南
├── package.json              # 项目依赖及启动脚本定义
├── server.js                 # 后端 Express API 转发与静态托管
├── .env.example              # 环境变量模板
└── public/                   # 前端静态资源目录
    ├── index.html            # 控制台主页 (响应式双栏布局)
    ├── style.css             # 玻璃拟态及原子 Loading 动效样式
    └── app.js                # 模型 LocalStorage 管理与 API 逻辑控制
```

---

## 🌐 线上部署指引

1. **托管服务部署 (推荐使用 Railway / Zeabur / Render)**：
   * 将代码提交到您的 GitHub 仓库。
   * 在托管平台上关联仓库并导入项目，平台会自动识别 `package.json` 中的启动命令 `npm run start` 并拉起 Node.js 环境。
2. **环境变量配置**：
   * 在部署平台的 Environment Variables (环境变量) 设置里添加 `GEMINI_API_KEY` 变量，以便使内置 Gemini 选项能供所有线上用户默认直接使用。
3. **前端多模型分发**：
   * 如果用户想使用他们自己的 API 密钥生成 3D 页面，只需在网页端点击「配置」按钮添加他们自己的 OpenAI/Anthropic/DeepSeek API 配置即可。所有自定义数据均完全保存在用户浏览器本地，部署端无任何存储负担，极其安全。
