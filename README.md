# AetherViz AI - 3D 教学可视化生成器网站

<p align="center">
  <img src="https://img.shields.io/badge/version-0.4.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/Node.js-20+-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.19-lightgrey.svg" alt="Express">
  <img src="https://img.shields.io/badge/Cloudflare-Pages-orange.svg" alt="Cloudflare Pages">
  <img src="https://img.shields.io/badge/Three.js-r134-orange.svg" alt="Three.js">
  <img src="https://img.shields.io/badge/Tailwind-v3.4-cyan.svg" alt="Tailwind">
</p>

AetherViz AI 是一个面向教师的 3D 互动教学网页生成器。它把 `SKILL.md` 中的 AetherViz Master 教育可视化生成规范包装成网站：老师输入一个知识点关键词，或从中国 K12 教材关键词库中选择主题，系统会调用大语言模型生成一个可预览、可复制、可下载的单文件 HTML 互动课件。

当前版本为 `0.4.0`，重点优化了高负荷生成场景下的稳定性、历史缓存检索兼容性、多任务并行体验，并大幅升级了 3D 课件防卡死防报错的健壮性。

---

## 0.4.0 更新内容 (重大架构升级)

### 🚀 稳定性与架构优化
- **双通道大模型生成管线**：重构大模型请求架构。自定义模型改由前端浏览器发起 fetch 直连，完全绕过 Cloudflare 边缘端 30 秒执行时长限制与 waitUntil 扼杀，保障超长 3D 代码生成绝不超时；内置模型继续由后端轻量代理。
- **历史预览与生成物理割裂**：引入只读 `GET /api/history-content` 接口。点击历史记录直接拉取 KV 缓存进行展示，彻底割裂生成管线，不再匹配任何本地模型或 API 密钥配置，即使配置被删也 100% 秒速无感载入。
- **新老缓存 Key 兼容与平滑迁移**：缓存 Key 脱离 provider 限制（由 `modelName` 唯一决定以在多代理间共用缓存），并支持对老格式 `cacheKey` 进行向前兼容检索，且在命中的瞬间**自动无感在后台升级为新格式**，彻底复活所有老旧历史记录。
- **GitHub 自动部署集成**：完成了云端 Pages 与 GitHub 自动集成的绑定，本地仅需 `git push` 到 `main` 分支即可自动激活 CI/CD 云端构建上线。

### 🎨 体验与健壮性升级
- **防卡死 Loading 强制关闭兜底 (Critical Expirer)**：在 `SKILL.md` 核心规范中注入强制退场铁律。大模型生成任何遮罩层时必须附加 3s 自动淡出隐藏定时器，确保即便 Three.js 在初始化时因为某些 WebGL 异常报错，也能在 3 秒后强制隐藏 Loading 展示 UI。
- **3D 地形几何精度上限约束**：限制大模型生成地形的分段数（geometry segments）上限为 128，从根本上防止因过度多重循环导致的浏览器卡死挂起。
- **2D/SVG 可视化课件兼容**：拓宽了后端的网页质量体检规则，兼容检查 D3.js 2D 依赖库与 SVG 交互元素，保障数学几何等非 3D 页面顺利通过校验，免遭打回。
- **多任务并行生成与融合队列**：支持在后台进行多通道非阻塞生成，可在生成期间继续进行页面操作、预设词选择等；在左侧历史卡片中感知并融合呈现排队中/生成中进度，支持失败任务一键重试。
- **白天模式高对比度微调**：为白天模式下的预设关键词卡片调配高对比度字色（纯黑色），极大地提升了日光环境下的可读性。

---

## 核心能力

- **AetherViz Master Skill 驱动**：后端读取 `SKILL.md` 作为系统提示词，要求模型生成包含 Three.js、SVG、KaTeX、控制面板和测验面板的完整教学网页。
- **中国 K12 教材关键词库**：`public/curriculum-keywords.js` 内置小学、初中、高中共 12 个年级的 3D 可视化候选知识点，覆盖数学、科学、物理、化学、生物、地理、信息科技/信息技术等学科。
- **三级筛选体验**：首页支持按学段、年级、学科筛选关键词，点击关键词即可填入搜索框并开始生成。
- **多模型配置**：前端支持在浏览器本地配置 OpenAI 兼容协议、Anthropic 协议和 DeepSeek 等自定义模型。API Key 仅保存在用户浏览器 `LocalStorage`。
- **内置 Gemini 回退**：未配置前端模型时，后端可使用 `.env` 或部署环境中的 `GEMINI_API_KEY` 调用 Gemini 2.5 Flash。
- **生成预览与导出**：生成结果在 sandbox iframe 中预览，支持复制 HTML、下载 HTML、新窗口全屏打开。
- **EduLab 精确课件引擎**：内置一组来自 `wy51ai/edulab` 的预生成静态课件。命中立体几何、圆锥曲线、燃烧/电解/氧化还原/酯化等固定题型时，优先加载确定性课件；未命中时再回退到 AetherViz 大模型生成。
- **本地与边缘部署兼容**：本地开发使用 Express `server.js`；Cloudflare Pages 部署使用 `functions/api/generate.js`、KV 缓存、异步任务和历史接口。

---

## 0.3.0 更新内容

- 新增 `public/curriculum-keywords.js` 教材关键词库。
- 首页关键词区域从单层学科分类升级为“学段 -> 年级 -> 学科 -> 关键词”。
- 关键词库当前包含 3 个学段、12 个年级、42 个年级内学科分组、176 个可生成关键词。
- 前端兼容同步生成结果和 Cloudflare 异步任务结果。
- 本地 Express 后端新增 `/api/history`，避免历史记录请求失败。
- 修复 `public/app.js` 中一个多余大括号导致的脚本语法错误。
- 统一项目版本号为 `0.3.0`。

关键词库来源口径为教育部课程标准和主流教材公开目录的主题级归纳，只收录知识点标题和适合 3D 生成的简短说明，不复制教材正文。

---

## 快速启动

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量模板：

```bash
cp .env.example .env
```

按需填写：

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
```

`GEMINI_API_KEY` 不是必填。如果不配置，用户仍可在网页端添加自己的 OpenAI/Anthropic 兼容模型配置。

### 3. 本地运行

```bash
npm start
```

访问：

```text
http://localhost:3000
```

开发模式：

```bash
npm run dev
```

---

## Cloudflare Pages 部署

项目也包含 Cloudflare Pages Functions 版本。

### 构建 Skill 注入文件

Cloudflare Functions 不能直接读取根目录 `SKILL.md`，需要先构建生成 `functions/api/skill.js`：

```bash
npm run build
```

`functions/api/skill.js` 是生成文件，已被 `.gitignore` 忽略。

### 本地 Pages 调试

```bash
npm run pages:dev
```

### KV 绑定

`wrangler.jsonc` 中使用 `AETHERVIZ_KV` 作为 KV 绑定名。线上部署前需要在 Cloudflare Pages 项目中配置：

- `AETHERVIZ_KV`
- `GEMINI_API_KEY`，可选

Cloudflare 版本会优先读 KV 缓存；未命中时创建异步生成任务，前端轮询 `/api/generate?taskId=...` 获取状态。

---

## 项目结构

```text
3DforTeacher/
├── SKILL.md                         # AetherViz Master 生成规范
├── README.md                        # 项目说明文档
├── package.json                     # 依赖、版本和脚本
├── package-lock.json                # 依赖锁定文件
├── server.js                        # 本地 Express API 与静态资源服务
├── build-skill.js                   # 将 SKILL.md 构建为 Cloudflare Functions 可导入模块
├── wrangler.jsonc                   # Cloudflare Pages/KV 配置
├── functions/
│   └── api/
│       ├── generate.js              # Cloudflare 生成接口、任务轮询、缓存逻辑
│       └── history.js               # Cloudflare 历史记录接口
└── public/
    ├── index.html                   # Web 控制台页面
    ├── style.css                    # 主题、玻璃拟态、加载动效样式
    ├── app.js                       # 前端交互、模型配置、生成调用、历史记录
    ├── curriculum-keywords.js       # 中国 K12 教材关键词库
    └── edulab/                      # EduLab 预生成精确课件与 Apache-2.0 许可证文件
```

---

## 生成流程

1. 老师输入关键词，或从教材关键词库中选择知识点。
2. 前端先匹配 EduLab 精确课件路由；若命中，直接读取 `public/edulab/lessons/` 下的静态 HTML，并写入现有 KV 历史缓存。
3. 若未命中 EduLab，前端读取当前选中的模型配置。
4. 后端把关键词、模型配置和 `SKILL.md` 规范组合成生成请求。
5. 模型返回完整 HTML。
6. 后端清洗模型输出，提取 `<!DOCTYPE html>` 到 `</html>` 的页面源码。
7. 前端将 HTML 注入 sandbox iframe 预览。
8. 老师可以复制源码、下载 HTML 或新窗口全屏演示。

---

## 常用脚本

```bash
npm start       # 启动 Express 服务
npm run dev     # Node watch 开发模式
npm run build   # 生成 functions/api/skill.js
npm run pages:dev
```

---

## 安全与数据说明

- `.env`、`node_modules`、`.wrangler` 和 Cloudflare 生成的 `functions/api/skill.js` 不进入 Git。
- 自定义模型 API Key 存在浏览器本地，不会写入仓库。
- 本地 Express 历史记录为内存数据，重启后清空。
- Cloudflare 版本历史和缓存依赖 KV。
- 生成的课件 HTML 来自大模型输出，生产环境建议继续使用 sandbox iframe、限流、缓存和 HTML 质量检测。
- `public/edulab/` 中的预生成课件来自 `wy51ai/edulab`，上游许可证为 Apache-2.0；对应 `LICENSE` 与 `NOTICE` 保留在 `public/edulab/vendor/`。
