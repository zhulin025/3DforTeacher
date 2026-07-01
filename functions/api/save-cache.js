// 边缘接口：由前台生成成功后直接调用，极速将 HTML 内容和元数据存入 KV
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const { keyword, modelName, provider, html } = await request.json();
    
    if (!keyword || !modelName || !html) {
      return new Response(JSON.stringify({ error: '参数不完整。' }), {
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

    const cleanKeyword = keyword.trim();
    const cleanModelName = modelName.trim();
    const cleanProvider = provider ? provider.trim() : 'custom';
    
    // 拼装新版 cacheKey
    const cacheKey = `html:${cleanModelName}:${cleanKeyword}`;
    
    // 1. 写入 HTML 缓存
    await KV.put(cacheKey, html);

    // 2. 更新历史元数据列表
    const historyStr = await KV.get('history_list') || '[]';
    const history = JSON.parse(historyStr);
    
    const newHistoryItem = {
      id: `${cleanModelName}:${cleanKeyword}:${Date.now()}`,
      keyword: cleanKeyword,
      modelName: cleanModelName,
      provider: cleanProvider,
      createdAt: new Date().toISOString()
    };

    // 过滤掉同名模型同关键字的老历史
    const filtered = history.filter(item => !(item.keyword === newHistoryItem.keyword && item.modelName === newHistoryItem.modelName));
    filtered.unshift(newHistoryItem);

    if (filtered.length > 100) {
      filtered.pop();
    }

    await KV.put('history_list', JSON.stringify(filtered));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('[Save Cache Error]', error);
    return new Response(JSON.stringify({ error: '写入 KV 缓存或历史失败。', details: error.message }), {
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
