export async function onRequestGet(context) {
  const { env } = context;
  const KV = env.AETHERVIZ_KV;
  
  try {
    let historyList = [];
    if (KV) {
      const historyStr = await KV.get('history_list') || '[]';
      historyList = JSON.parse(historyStr);
    }
    
    return new Response(JSON.stringify(historyList), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('[Edge History Error]', error);
    return new Response(JSON.stringify({ 
      error: '获取生成历史时发生错误。', 
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

export async function onRequestDelete(context) {
  const { request, env } = context;
  const KV = env.AETHERVIZ_KV;
  const url = new URL(request.url);
  const itemId = url.searchParams.get('id');

  if (!itemId) {
    return new Response(JSON.stringify({ error: '缺少 id 参数。' }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  if (!KV) {
    return new Response(JSON.stringify({ error: '边缘服务未配置 KV 数据库。' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    // 1. 获取并更新历史列表
    const historyStr = await KV.get('history_list') || '[]';
    const history = JSON.parse(historyStr);
    const filtered = history.filter(item => item.id !== itemId);
    
    await KV.put('history_list', JSON.stringify(filtered));

    // 2. 尝试解析 id 并同时清理对应的底层 HTML 缓存，防占存储
    const parts = itemId.split(':');
    if (parts.length >= 3) {
      parts.pop(); // 弹出时间戳
      const keyword = parts.pop();
      const modelName = parts.join(':');
      
      const cacheKey = `html:${modelName.trim()}:${keyword.trim()}`;
      await KV.delete(cacheKey);
      console.log(`[Edge Cache Delete] 已同步删除历史网页缓存: ${cacheKey}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('[Edge History Delete Error]', error);
    return new Response(JSON.stringify({ 
      error: '删除历史记录时发生错误。', 
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

// 处理预检请求 (CORS Option)
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
