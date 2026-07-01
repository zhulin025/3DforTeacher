// 边缘接口：只读获取已生成历史网页的 HTML 内容（包含新老 cacheKey 格式向前兼容）
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const modelName = url.searchParams.get('modelName');
  const keyword = url.searchParams.get('keyword');
  const provider = url.searchParams.get('provider') || '';

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
    const cleanModelName = modelName.trim();
    const cleanKeyword = keyword.trim();
    const cleanProvider = provider.trim();

    // 1. 尝试使用新版无 provider 的 cacheKey 格式
    const newCacheKey = `html:${cleanModelName}:${cleanKeyword}`;
    let cachedHtml = await KV.get(newCacheKey);

    // 2. 向前兼容处理：若新格式未命中，且传了 provider，尝试老格式 cacheKey: html:provider:modelName:keyword
    if (!cachedHtml && cleanProvider) {
      const oldCacheKey = `html:${cleanProvider}:${cleanModelName}:${cleanKeyword}`;
      console.log(`[Cache Compatibility] 新格式未命中，尝试读取老格式 Key: ${oldCacheKey}`);
      cachedHtml = await KV.get(oldCacheKey);
      
      // 如果老格式命中了，顺手做个“平滑迁移”升级为新格式，以便之后能更高效读取！
      if (cachedHtml) {
        console.log(`[Cache Migration] 自动将老格式缓存升级至新格式 Key: ${newCacheKey}`);
        context.waitUntil(KV.put(newCacheKey, cachedHtml));
      }
    }

    // 3. 向前兼容处理：如果依然未命中，针对内置模型尝试老格式 cacheKey: html:built-in:modelName:keyword
    if (!cachedHtml) {
      const oldBuiltInKey = `html:built-in:${cleanModelName}:${cleanKeyword}`;
      console.log(`[Cache Compatibility] 尝试读取内置老格式 Key: ${oldBuiltInKey}`);
      cachedHtml = await KV.get(oldBuiltInKey);
      
      if (cachedHtml) {
        console.log(`[Cache Migration] 自动将内置老格式缓存升级至新格式 Key: ${newCacheKey}`);
        context.waitUntil(KV.put(newCacheKey, cachedHtml));
      }
    }

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
