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
