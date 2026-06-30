// AetherViz AI Dashboard Client Script

// 学科及其精选关键词数据
const SUBJECTS_DATA = [
  {
    id: 'physics',
    name: '物理',
    icon: 'fa-atom',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/30',
    keywords: [
      { name: '牛顿第二定律', desc: '物体加速度与合外力及质量的关系' },
      { name: '匀速与匀变速运动', desc: '小球在力与初速度下的运动轨迹' },
      { name: '电磁感应', desc: '导体切割磁感线产生感应电动势' },
      { name: '相对论时间膨胀', desc: '光钟在高速运动下的变慢效应' },
      { name: '量子隧穿效应', desc: '微观粒子穿过势垒的概率分布' },
      { name: '波动与振动', desc: '横波与纵波在介质中的传播与叠加' }
    ]
  },
  {
    id: 'chemistry',
    name: '化学',
    icon: 'fa-flask',
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500/30',
    keywords: [
      { name: '分子结构', desc: '常见水、甲烷、二氧化碳等分子的3D模型' },
      { name: '光合作用', desc: '叶绿体中光反应与暗反应的微观循环' },
      { name: '酸碱中和', desc: '氢离子与氢氧根离子的结合与滴定曲线' },
      { name: '氧化还原反应', desc: '电子转移过程与原电池模型演示' }
    ]
  },
  {
    id: 'biology',
    name: '生物',
    icon: 'fa-dna',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/30',
    keywords: [
      { name: 'DNA复制', desc: '解旋酶、聚合酶作用下的DNA双链合成' },
      { name: '细胞呼吸', desc: '线粒体中三羧酸循环与电子传递链' },
      { name: '有丝分裂', desc: '前期、中期、后期、末期的染色体变化' },
      { name: '遗传规律', desc: '孟德尔豌豆杂交实验的概率分布网格' }
    ]
  },
  {
    id: 'math',
    name: '数学',
    icon: 'fa-calculator',
    color: 'from-amber-500 to-yellow-500',
    borderColor: 'border-amber-500/30',
    keywords: [
      { name: '勾股定理', desc: '直角三角形三边关系的几何证明与割补' },
      { name: '三角函数', desc: '单位圆上点运动与正弦、余弦波形对应' },
      { name: '概率分布', desc: '高尔顿板下落过程与正态分布曲线' },
      { name: '正弦函数图像', desc: '频率、振幅对正弦波形变化的实时调控' }
    ]
  },
  {
    id: 'astronomy',
    name: '天文',
    icon: 'fa-user-astronaut',
    color: 'from-indigo-500 to-purple-500',
    borderColor: 'border-indigo-500/30',
    keywords: [
      { name: '行星运动定律', desc: '开普勒三定律及引力场下轨道运动' },
      { name: '宇宙膨胀', desc: '哈勃定律与星系远离的红移模拟' },
      { name: '黑洞', desc: '黑洞周围光线弯曲与视界吸积盘' },
      { name: '日食月食', desc: '地日月的轨道遮挡与阴影区域演示' }
    ]
  },
  {
    id: 'programming',
    name: '编程',
    icon: 'fa-code',
    color: 'from-teal-500 to-cyan-500',
    borderColor: 'border-teal-500/30',
    keywords: [
      { name: '数据结构', desc: '二叉树的插入、删除及深度优先遍历' },
      { name: '排序算法', desc: '冒泡、快速、归并排序的代码与3D堆叠柱状图' },
      { name: '算法复杂度', desc: 'O(1), O(log n), O(n), O(n²) 图像比较' }
    ]
  }
];

// 快捷模版配置
const TEMPLATES_DATA = {
  openai: {
    alias: 'OpenAI GPT-4o',
    provider: 'openai',
    baseURL: 'https://api.openai.com/v1',
    modelName: 'gpt-4o'
  },
  anthropic: {
    alias: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    baseURL: 'https://api.anthropic.com',
    modelName: 'claude-3-5-sonnet-20241022'
  },
  deepseek: {
    alias: 'DeepSeek V3',
    provider: 'openai',
    baseURL: 'https://api.deepseek.com/v1',
    modelName: 'deepseek-chat'
  }
};

// DOM 元素引用
const searchInput = document.getElementById('search-input');
const generateBtn = document.getElementById('generate-btn');
const subjectTabs = document.getElementById('subject-tabs');
const keywordGrid = document.getElementById('keyword-grid');
const reloadIframeBtn = document.getElementById('reload-iframe-btn');
const previewUrl = document.getElementById('preview-url');
const welcomeOverlay = document.getElementById('welcome-overlay');
const loadingOverlay = document.getElementById('loading-overlay');
const loadingTitle = document.getElementById('loading-title');
const loadingDesc = document.getElementById('loading-desc');
const progressBar = document.querySelector('.progress-bar');
const previewIframe = document.getElementById('preview-iframe');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const btnCopy = document.getElementById('btn-copy');
const btnFullscreen = document.getElementById('btn-fullscreen');
const btnDownload = document.getElementById('btn-download');

// 模型相关 DOM 引用
const modelSelect = document.getElementById('model-select');
const btnConfigModels = document.getElementById('btn-config-models');
const modelModal = document.getElementById('model-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const btnCancelForm = document.getElementById('btn-cancel-form');
const savedModelsList = document.getElementById('saved-models-list');
const btnAddNewModel = document.getElementById('btn-add-new-model');
const modelForm = document.getElementById('model-form');
const formTitle = document.getElementById('form-title');

// 表单项引用
const formModelId = document.getElementById('model-id');
const formAlias = document.getElementById('model-alias');
const formProvider = document.getElementById('model-provider');
const formBaseUrl = document.getElementById('model-baseurl');
const formModelName = document.getElementById('model-name');
const formApiKey = document.getElementById('model-apikey');

// 历史记录相关 DOM 引用
const historyCount = document.getElementById('history-count');
const historyList = document.getElementById('history-list');

// 全局变量缓存
let activeSubjectId = 'physics';
let currentGeneratedHtml = '';
let currentBlobUrl = '';
let loadingInterval = null;
let currentKeyword = '';
let models = [];
let activeModelId = 'built-in-gemini';

// 初始化函数
function init() {
  initModels();
  renderSubjectTabs();
  renderKeywords(activeSubjectId);
  setupEventListeners();
  loadHistory();
}

// 初始化自定义模型数据
function initModels() {
  const defaultGeminiModel = {
    id: 'built-in-gemini',
    alias: '内置 Gemini 2.5 Flash (后端提供)',
    provider: 'openai',
    baseURL: '',
    modelName: 'gemini-2.5-flash',
    apiKey: ''
  };

  const stored = localStorage.getItem('aetherviz_models');
  if (stored) {
    try {
      models = JSON.parse(stored);
    } catch (e) {
      console.error('解析已保存的模型列表出错:', e);
      models = [defaultGeminiModel];
    }
  } else {
    models = [defaultGeminiModel];
    localStorage.setItem('aetherviz_models', JSON.stringify(models));
  }

  if (!models.some(m => m.id === 'built-in-gemini')) {
    models.unshift(defaultGeminiModel);
  }

  const storedActiveId = localStorage.getItem('aetherviz_active_model_id');
  if (storedActiveId && models.some(m => m.id === storedActiveId)) {
    activeModelId = storedActiveId;
  } else {
    activeModelId = 'built-in-gemini';
  }

  renderModelSelect();
}

// 渲染下拉选择框
function renderModelSelect() {
  modelSelect.innerHTML = models.map(m => `
    <option value="${m.id}" ${m.id === activeModelId ? 'selected' : ''}>
      ${m.alias}
    </option>
  `).join('');
}

// 渲染 Modal 左侧的已保存模型列表
function renderSavedModelsList() {
  savedModelsList.innerHTML = models.map(m => {
    const isBuiltIn = m.id === 'built-in-gemini';
    const isActive = m.id === activeModelId;
    return `
      <div 
        data-id="${m.id}"
        class="model-item-card p-2.5 rounded-xl flex items-center justify-between gap-2 border cursor-pointer text-left relative ${isActive ? 'active' : ''}"
      >
        <div class="flex-1 min-w-0 pr-1 select-none">
          <div class="text-xs font-semibold text-slate-200 truncate">${m.alias}</div>
          <div class="text-[9px] text-slate-400 truncate mt-0.5">${m.provider.toUpperCase()} | ${m.modelName}</div>
        </div>
        ${!isBuiltIn ? `
          <button 
            type="button" 
            data-delete-id="${m.id}" 
            class="text-slate-500 hover:text-rose-400 p-1 rounded transition cursor-pointer"
            title="删除此模型"
          >
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        ` : ''}
      </div>
    `;
  }).join('');
}

// 渲染学科切换 Tab
function renderSubjectTabs() {
  subjectTabs.innerHTML = SUBJECTS_DATA.map(subj => {
    const isActive = subj.id === activeSubjectId;
    return `
      <button 
        data-id="${subj.id}"
        class="tab-btn py-2.5 px-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-xs font-medium cursor-pointer ${isActive ? 'active' : ''}"
      >
        <i class="fa-solid ${subj.icon} text-lg bg-gradient-to-r ${subj.color} bg-clip-text text-transparent"></i>
        <span>${subj.name}</span>
      </button>
    `;
  }).join('');
}

// 渲染指定学科的关键词
function renderKeywords(subjectId) {
  const subject = SUBJECTS_DATA.find(s => s.id === subjectId);
  if (!subject) return;

  keywordGrid.innerHTML = subject.keywords.map(kw => `
    <div 
      data-keyword="${kw.name}"
      class="keyword-card p-3 rounded-xl cursor-pointer text-left flex flex-col justify-between"
    >
      <div class="font-medium text-xs text-slate-200">${kw.name}</div>
      <div class="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">${kw.desc}</div>
    </div>
  `).join('');
}

// 载入并渲染生成历史
async function loadHistory() {
  try {
    const response = await fetch('/api/history');
    if (!response.ok) throw new Error('拉取历史记录失败');
    
    const list = await response.json();
    historyCount.innerText = `${list.length} 条记录`;

    if (list.length === 0) {
      historyList.innerHTML = `<div class="text-center text-slate-600 text-xs py-8 select-none">暂无生成历史</div>`;
      return;
    }

    historyList.innerHTML = list.map(item => {
      // 提取相对时间或格式化日期
      const timeStr = formatRelativeTime(item.createdAt);
      const isBuiltIn = item.provider === 'built-in';
      const modelDisplay = isBuiltIn ? '内置 Gemini' : item.modelName;
      
      // 判断该项目是否匹配当前下拉框选中的模型
      const expectedId = isBuiltIn ? 'built-in-gemini' : `${item.provider}:${item.modelName}`;
      const isCurrentModelMatch = expectedId === activeModelId;

      return `
        <div 
          data-keyword="${item.keyword}"
          data-model-id="${expectedId}"
          data-model-name="${item.modelName}"
          class="history-item p-2.5 rounded-xl cursor-pointer flex items-center justify-between gap-2 text-left"
          title="点击瞬间重新载入并渲染该页面"
        >
          <div class="flex-1 min-w-0 pr-1">
            <div class="text-xs font-semibold text-slate-300 truncate">${item.keyword}</div>
            <div class="text-[9px] text-slate-500 mt-0.5 truncate flex items-center gap-1.5">
              <span>${modelDisplay}</span>
              <span>•</span>
              <span>${timeStr}</span>
            </div>
          </div>
          ${isCurrentModelMatch ? `
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50" title="当前模型与此历史匹配"></span>
          ` : ''}
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error('加载历史记录错误:', err);
    historyList.innerHTML = `<div class="text-center text-rose-500/60 text-xs py-8">拉取历史记录失败</div>`;
  }
}

// 格式化时间为相对时间
function formatRelativeTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);

  if (diffMin < 1) return '刚刚';
  if (diffMin < 60) return `${diffMin}分钟前`;
  if (diffHr < 24) return `${diffHr}小时前`;
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 打开配置 Modal
function openModelModal() {
  modelModal.classList.remove('hidden');
  setTimeout(() => {
    modelModal.classList.add('active');
  }, 50);
  renderSavedModelsList();
  resetForm();
}

// 关闭配置 Modal
function closeModelModal() {
  modelModal.classList.remove('active');
  setTimeout(() => {
    modelModal.classList.add('hidden');
  }, 300);
}

// 重置编辑表单
function resetForm() {
  formModelId.value = '';
  formAlias.value = '';
  formProvider.value = 'openai';
  formBaseUrl.value = '';
  formModelName.value = '';
  formApiKey.value = '';
  formTitle.innerText = '添加新模型';
  formAlias.disabled = false;
  formProvider.disabled = false;
  formBaseUrl.disabled = false;
  formModelName.disabled = false;
  formApiKey.disabled = false;
}

// 加载指定模型到表单以供编辑
function loadModelToForm(modelId) {
  const model = models.find(m => m.id === modelId);
  if (!model) return;

  resetForm();
  
  formModelId.value = model.id;
  formAlias.value = model.alias;
  formProvider.value = model.provider;
  formBaseUrl.value = model.baseURL;
  formModelName.value = model.modelName;
  formApiKey.value = model.apiKey;
  formTitle.innerText = `编辑模型: ${model.alias}`;

  if (modelId === 'built-in-gemini') {
    formAlias.disabled = true;
    formProvider.disabled = true;
    formBaseUrl.disabled = true;
    formModelName.disabled = true;
    formApiKey.disabled = true;
    formTitle.innerText = '内置模型 (配置由后端托管)';
  }
}

// 绑定事件监听
function setupEventListeners() {
  // 学科 Tab 点击事件
  subjectTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab-btn');
    if (!tab) return;
    
    const subjectId = tab.dataset.id;
    activeSubjectId = subjectId;
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    tab.classList.add('active');
    
    renderKeywords(subjectId);
  });

  // 关键词卡片点击事件
  keywordGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.keyword-card');
    if (!card) return;
    
    const keyword = card.dataset.keyword;
    searchInput.value = keyword;
    generate3DPage(keyword);
  });

  // 历史记录列表点击重载事件
  historyList.addEventListener('click', (e) => {
    const item = e.target.closest('.history-item');
    if (!item) return;
    
    const keyword = item.dataset.keyword;
    const historyModelId = item.dataset.modelId;
    const historyModelName = item.dataset.modelName;

    // 尝试匹配本地是否依然拥有该模型的 API Key
    const matchedModel = models.find(m => m.id === historyModelId);
    if (matchedModel) {
      // 找到了，切换为此模型并更新选择框
      activeModelId = historyModelId;
      localStorage.setItem('aetherviz_active_model_id', activeModelId);
      renderModelSelect();
    } else {
      // 没找到，说明用户后来把该自定义模型配置删掉了。使用当前下拉选择的模型，并进行 Toast 警示
      alert(`提示：生成该历史网页所用的模型 [${historyModelName}] 的本地密钥配置已被修改或删除，将使用当前下拉框选中的模型尝试渲染。`);
    }

    searchInput.value = keyword;
    generate3DPage(keyword);
  });

  // 输入框回车生成
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = searchInput.value.trim();
      if (val) {
        generate3DPage(val);
      }
    }
  });

  // 生成按钮点击
  generateBtn.addEventListener('click', () => {
    const val = searchInput.value.trim();
    if (val) {
      generate3DPage(val);
    }
  });

  // 下拉选择框切换
  modelSelect.addEventListener('change', (e) => {
    activeModelId = e.target.value;
    localStorage.setItem('aetherviz_active_model_id', activeModelId);
  });

  // 重新加载 iframe
  reloadIframeBtn.addEventListener('click', () => {
    if (currentBlobUrl) {
      previewIframe.src = currentBlobUrl;
    }
  });

  // 复制代码按钮
  btnCopy.addEventListener('click', () => {
    if (!currentGeneratedHtml) return;
    navigator.clipboard.writeText(currentGeneratedHtml)
      .then(() => {
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = `<i class="fa-solid fa-check text-green-400"></i><span>已复制!</span>`;
        setTimeout(() => {
          btnCopy.innerHTML = originalText;
        }, 2000);
      })
      .catch(err => {
        console.error('无法复制代码: ', err);
        alert('复制代码失败，请手动在浏览器控制台查看。');
      });
  });

  // 全屏打开按钮
  btnFullscreen.addEventListener('click', () => {
    if (currentBlobUrl) {
      window.open(currentBlobUrl, '_blank');
    }
  });

  // 下载 HTML 按钮
  btnDownload.addEventListener('click', () => {
    if (!currentGeneratedHtml) return;
    
    const blob = new Blob([currentGeneratedHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentKeyword || 'lesson'}.html`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  });

  // Modal 开启与关闭
  btnConfigModels.addEventListener('click', openModelModal);
  closeModalBtn.addEventListener('click', closeModelModal);
  btnCancelForm.addEventListener('click', closeModelModal);

  // 模板快捷键点击事件
  document.querySelectorAll('.tmpl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const templateId = btn.dataset.template;
      const tpl = TEMPLATES_DATA[templateId];
      if (tpl && formModelId.value !== 'built-in-gemini') {
        formAlias.value = tpl.alias;
        formProvider.value = tpl.provider;
        formBaseUrl.value = tpl.baseURL;
        formModelName.value = tpl.modelName;
      }
    });
  });

  // 左侧已保存模型列表交互（点击编辑、点击删除）
  savedModelsList.addEventListener('click', (e) => {
    const trashBtn = e.target.closest('[data-delete-id]');
    if (trashBtn) {
      e.stopPropagation();
      const deleteId = trashBtn.dataset.deleteId;
      if (confirm('确认删除此模型配置吗？')) {
        models = models.filter(m => m.id !== deleteId);
        localStorage.setItem('aetherviz_models', JSON.stringify(models));
        
        if (activeModelId === deleteId) {
          activeModelId = 'built-in-gemini';
          localStorage.setItem('aetherviz_active_model_id', activeModelId);
        }
        
        renderSavedModelsList();
        renderModelSelect();
        resetForm();
      }
      return;
    }

    const card = e.target.closest('.model-item-card');
    if (card) {
      const modelId = card.dataset.id;
      activeModelId = modelId;
      localStorage.setItem('aetherviz_active_model_id', activeModelId);
      
      document.querySelectorAll('.model-item-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      renderModelSelect();
      loadModelToForm(modelId);
    }
  });

  // 添加新模型按钮
  btnAddNewModel.addEventListener('click', resetForm);

  // 保存模型表单提交
  modelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const modelId = formModelId.value;

    const newConfig = {
      alias: formAlias.value.trim(),
      provider: formProvider.value,
      baseURL: formBaseUrl.value.trim(),
      modelName: formModelName.value.trim(),
      apiKey: formApiKey.value.trim()
    };

    if (modelId) {
      const idx = models.findIndex(m => m.id === modelId);
      if (idx !== -1) {
        models[idx] = { ...models[idx], ...newConfig };
      }
    } else {
      const newId = 'custom-' + Date.now();
      newConfig.id = newId;
      models.push(newConfig);
      activeModelId = newId;
      localStorage.setItem('aetherviz_active_model_id', activeModelId);
    }

    localStorage.setItem('aetherviz_models', JSON.stringify(models));
    
    renderSavedModelsList();
    renderModelSelect();
    resetForm();
    
    alert('配置已成功保存！');
    closeModelModal();
  });
}

// 核心生成逻辑
async function generate3DPage(keyword) {
  currentKeyword = keyword;
  
  // 1. UI 切换到 Loading 状态
  welcomeOverlay.style.opacity = '0';
  setTimeout(() => {
    welcomeOverlay.classList.add('hidden');
  }, 300);
  
  loadingOverlay.classList.remove('hidden');
  setTimeout(() => {
    loadingOverlay.style.opacity = '1';
  }, 50);

  // 禁用控制组件
  searchInput.disabled = true;
  generateBtn.disabled = true;
  modelSelect.disabled = true;
  btnConfigModels.disabled = true;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.disabled = true);
  document.querySelectorAll('.keyword-card').forEach(card => card.style.pointerEvents = 'none');
  
  // 禁用操作按钮
  btnCopy.disabled = true;
  btnFullscreen.disabled = true;
  btnDownload.disabled = true;
  
  // 2. 模拟加载进度
  startLoadingSimulation(keyword);

  // 获取当前选中的模型配置
  const activeModel = models.find(m => m.id === activeModelId);
  const payload = { keyword };

  if (activeModel && activeModel.id !== 'built-in-gemini') {
    payload.modelConfig = {
      provider: activeModel.provider,
      apiKey: activeModel.apiKey,
      baseURL: activeModel.baseURL,
      modelName: activeModel.modelName
    };
  }
  
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || '生成失败，请重试');
    }
    
    const htmlContent = data.html;
    if (!htmlContent) {
      throw new Error('生成的网页内容为空');
    }
    
    // 3. 生成成功，处理响应
    currentGeneratedHtml = htmlContent;
    
    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
    }
    
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    currentBlobUrl = URL.createObjectURL(blob);
    
    previewIframe.src = currentBlobUrl;
    previewIframe.classList.remove('opacity-0');
    
    // 更新界面状态
    previewUrl.innerText = `aetherviz://lesson/${encodeURIComponent(keyword)}`;
    statusDot.className = 'inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50';
    
    // 如果是命中缓存，给予相应提示状态
    if (data.fromCache) {
      statusText.innerText = `已展示(缓存): ${keyword}`;
    } else {
      statusText.innerText = `已生成: ${keyword}`;
    }
    
    // 启用操作按钮
    btnCopy.disabled = false;
    btnFullscreen.disabled = false;
    btnDownload.disabled = false;
    
    // 隐藏 Loading 并重载历史记录
    finishLoadingSimulation();
    
  } catch (error) {
    console.error('API Error:', error);
    
    // 显示错误提示
    loadingTitle.innerText = '生成页面失败';
    loadingTitle.className = 'text-sm font-semibold text-rose-500 tracking-wide font-outfit';
    loadingDesc.innerText = error.message || '网络连接或模型响应错误';
    progressBar.parentElement.classList.add('hidden');
    
    statusDot.className = 'inline-block w-2 h-2 rounded-full bg-rose-500 shadow-md shadow-rose-500/50';
    statusText.innerText = `生成失败: ${error.message.substring(0, 30)}`;
    
    setTimeout(() => {
      resetLoadingState();
    }, 4500);
  }
}

// 模拟加载动画
function startLoadingSimulation(keyword) {
  let progress = 0;
  progressBar.parentElement.classList.remove('hidden');
  progressBar.style.width = '0%';
  
  loadingTitle.className = 'text-sm font-semibold text-cyan-400 tracking-wide font-outfit';
  loadingTitle.innerText = `正在生成: ${keyword}`;
  
  const hints = [
    '分析学科领域及最佳配色系统...',
    '智能适配 Three.js + SVG 渲染架构...',
    'AI 正在编写 3D 可视化代码...',
    '正在为 3D 元素绑定实时交互滑块...',
    '渲染侧边栏的 KaTeX 数学公式与精美图例...',
    '正在设计测验题目并整合交互面板...',
    '正在整理单文件 HTML 代码包...',
    '做最后的性能与流畅度优化...'
  ];
  
  let hintIdx = 0;
  loadingDesc.innerText = hints[0];
  
  if (loadingInterval) clearInterval(loadingInterval);
  
  loadingInterval = setInterval(() => {
    if (progress < 40) {
      progress += Math.random() * 8 + 2;
    } else if (progress < 75) {
      progress += Math.random() * 4 + 1;
    } else if (progress < 95) {
      progress += Math.random() * 1.5 + 0.3;
    }
    
    progressBar.style.width = `${Math.min(progress, 95)}%`;
    
    if (Math.random() > 0.7) {
      hintIdx = (hintIdx + 1) % hints.length;
      loadingDesc.innerText = hints[hintIdx];
    }
  }, 600);
}

// 加载完成
function finishLoadingSimulation() {
  if (loadingInterval) clearInterval(loadingInterval);
  progressBar.style.width = '100%';
  
  loadingTitle.innerText = '生成完成！';
  loadingDesc.innerText = '3D 交互页面已渲染完成，快来预览一下吧！';
  
  setTimeout(() => {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
      resetUIControls();
      loadHistory(); // 重新加载历史列表
    }, 500);
  }, 800);
}

// 复原控制状态
function resetUIControls() {
  searchInput.disabled = false;
  generateBtn.disabled = false;
  modelSelect.disabled = false;
  btnConfigModels.disabled = false;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.disabled = false);
  document.querySelectorAll('.keyword-card').forEach(card => card.style.pointerEvents = 'auto');
}

// 重置 Loading 到欢迎状态
function resetLoadingState() {
  if (loadingInterval) clearInterval(loadingInterval);
  loadingOverlay.style.opacity = '0';
  setTimeout(() => {
    loadingOverlay.classList.add('hidden');
    welcomeOverlay.classList.remove('hidden');
    setTimeout(() => {
      welcomeOverlay.style.opacity = '1';
    }, 50);
    resetUIControls();
  }, 500);
}

// 页面加载完成后启动
window.addEventListener('DOMContentLoaded', init);
