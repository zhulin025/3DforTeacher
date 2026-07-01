import { systemInstruction } from './skill.js';

// 只读接口：向前台输出自动编译的最新的 AetherViz Master 系统提示词
export async function onRequestGet() {
  return new Response(JSON.stringify({ prompt: systemInstruction }), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

// 处理预检请求 (CORS Option)
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
