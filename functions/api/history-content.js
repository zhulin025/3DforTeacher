// 边缘接口：只读获取已生成历史网页的 HTML 内容
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const modelName = url.searchParams.get('modelName');
  const keyword = url.searchParams.get('keyword');

  if (!modelName || !keyword) {
    return new Response(JSON.stringify({ error: '缺少 modelName 或 keyword 参数。' }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  const KV = env.AETHERVIZ_KV;
  if (!KV) {
    return new Response(JSON.stringify({ error: '边缘服务未绑定 KV 数据库。' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    // 拼装 cacheKey。注意：我们在后端已经将 cacheKey 重构为 html:${modelName}:${keyword}
    const cacheKey = `html:${modelName.trim()}:${keyword.trim()}`;
    const cachedHtml = await KV.get(cacheKey);

    if (!cachedHtml) {
      return new Response(JSON.stringify({ error: '该历史网页的底层缓存内容已失效或被清理，您可以尝试在主界面重新输入并生成。' }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 成功命中，返回缓存内容
    return new Response(JSON.stringify({ html: cachedHtml }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('[History Content Fetch Error]', error);
    return new Response(JSON.stringify({ error: '从 KV 读取网页内容时出错。', details: error.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
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
