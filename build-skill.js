import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const skillPath = path.join(__dirname, 'SKILL.md');
const outputPath = path.join(__dirname, 'functions', 'api', 'skill.js');

try {
  console.log('正在读取 SKILL.md...');
  const skillContent = fs.readFileSync(skillPath, 'utf8');

  // 确保输出目录存在
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('创建目录:', outputDir);
  }

  // 写入 skill.js 常量
  const jsContent = `// 自动构建生成的 AetherViz Master Skill 提示词，请勿手动修改\nexport const systemInstruction = ${JSON.stringify(skillContent)};\n`;
  fs.writeFileSync(outputPath, jsContent, 'utf8');

  console.log('构建成功！已在 functions/api/skill.js 导出 systemInstruction。');
} catch (error) {
  console.error('构建 SKILL.md 时发生错误:', error);
  process.exit(1);
}
