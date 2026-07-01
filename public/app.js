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
      { name: '电磁感应', desc: '导体切割磁感线产生感应电动势与电流' },
      { name: '简谐运动', desc: '弹簧振子或单摆的周期性往复运动与能量转换' },
      { name: '光的折射', desc: '光从一种介质进入另一种介质时的传播方向改变' },
      { name: '机械波', desc: '波源振动在介质中的传播、干涉与衍射现象' },
      { name: '洛伦兹力', desc: '带电粒子在磁场中受到的力及其偏转轨迹' },
      { name: '万有引力', desc: '天体之间的引力作用与绕转轨道模拟' },
      { name: '热力学循环', desc: '气体的等温、等压、绝热变化与卡诺循环演示' },
      { name: '相对论时间膨胀', desc: '光钟在高速运动下的时间变慢效应' },
      { name: '量子隧穿效应', desc: '微观粒子穿过势垒的概率分布演示' }
    ]
  },
  {
    id: 'chemistry',
    name: '化学',
    icon: 'fa-flask',
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500/30',
    keywords: [
      { name: '分子结构', desc: '常见水、甲烷、二氧化碳等分子的3D球棍模型' },
      { name: '酸碱中和', desc: '氢离子与氢氧根离子结合及酸碱滴定曲线' },
      { name: '氧化还原', desc: '电子得失与化学价态变化的微观演示' },
      { name: '晶体结构', desc: '氯化钠、金刚石等晶胞的微观空间排列' },
      { name: '化学平衡', desc: '可逆反应在正逆速率相等时的动态平衡' },
      { name: '原电池', desc: '化学能转化为电能的微观电子流动与电极反应' },
      { name: '电解池', desc: '电能转化为化学能的电极电解反应过程' },
      { name: '反应速率', desc: '浓度、温度和催化剂对化学反应速率的影响' }
    ]
  },
  {
    id: 'biology',
    name: '生物',
    icon: 'fa-dna',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/30',
    keywords: [
      { name: 'DNA复制', desc: '解旋酶、聚合酶作用下的DNA双链半保留复制' },
      { name: '细胞分裂', desc: '有丝分裂与减数分裂染色体行为的3D模拟' },
      { name: '细胞呼吸', desc: '线粒体中三羧酸循环与电子传递链产生ATP' },
      { name: '光合作用', desc: '叶绿体中光反应与暗反应的微观循环与能量转换' },
      { name: '神经冲动', desc: '动作电位在神经元轴突上的产生与电信号传导' },
      { name: '血液循环', desc: '体循环与肺循环中血液流动与心脏瓣膜运动' },
      { name: '蛋白质合成', desc: '核糖体上以mRNA为模板的翻译与肽链折叠' }
    ]
  },
  {
    id: 'math',
    name: '数学',
    icon: 'fa-calculator',
    color: 'from-amber-500 to-yellow-500',
    borderColor: 'border-amber-500/30',
    keywords: [
      { name: '勾股定理', desc: '直角三角形三边关系的几何证明与正方形割补法' },
      { name: '三角函数', desc: '单位圆上点运动与正弦、余弦、正切波形对应' },
      { name: '立体几何', desc: '多面体与旋转体的三视图、截面与表面积展开' },
      { name: '圆锥曲线', desc: '椭圆、双曲线、抛物线的切面定义与焦点性质' },
      { name: '概率分布', desc: '高尔顿板下落过程与正态分布、二项分布模拟' },
      { name: '导数几何意义', desc: '切线斜率随着曲线上点移动的动态变化' },
      { name: '积分体积', desc: '微元法旋转体累加求体积的动态切片过程' }
    ]
  },
  {
    id: 'geography',
    name: '地理',
    icon: 'fa-earth-asia',
    color: 'from-emerald-600 to-sky-500',
    borderColor: 'border-emerald-500/30',
    keywords: [
      { name: '板块运动', desc: '大陆板块碰撞挤压形成褶皱山脉与海沟过程' },
      { name: '大气环流', desc: '三圈环流与风带、气压带的三维空间分布' },
      { name: '水循环', desc: '地表水蒸发、水汽输送、降水与径流的循环' },
      { name: '火山喷发', desc: '地慢岩浆沿通道喷出并冷却堆积成火山的过程' },
      { name: '地球公转与四季', desc: '日地相对位置变化、太阳直射点移动与四季交替' },
      { name: '温室效应', desc: '大气层温室气体反射红外线与地球升温模拟' }
    ]
  },
  {
    id: 'astronomy',
    name: '天文',
    icon: 'fa-user-astronaut',
    color: 'from-indigo-500 to-purple-500',
    borderColor: 'border-indigo-500/30',
    keywords: [
      { name: '日食月食', desc: '地日月的轨道遮挡、本影与半影区域演示' },
      { name: '行星轨道', desc: '太阳系行星的椭圆轨道、公转速度与引力场' },
      { name: '黑洞', desc: '黑洞周围光线弯曲、视界引力透镜与吸积盘' },
      { name: '潮汐', desc: '月球和太阳引潮力导致地球海水涨落的潮汐现象' },
      { name: '恒星演化', desc: '恒星从星云、主序星到红巨星、白矮星/中子星的历程' },
      { name: '宇宙膨胀', desc: '哈勃定律与星系远离的宇宙红移模拟' }
    ]
  },
  {
    id: 'programming',
    name: '编程',
    icon: 'fa-code',
    color: 'from-teal-500 to-cyan-500',
    borderColor: 'border-teal-500/30',
    keywords: [
      { name: '排序算法', desc: '冒泡、快速、归并排序的代码逻辑与柱状图演练' },
      { name: '二叉树', desc: '二叉树的插入、删除及前中后序遍历动画' },
      { name: '图搜索', desc: '广度优先(BFS)与深度优先(DFS)在迷宫中的搜索路径' },
      { name: '递归', desc: '汉诺塔或斐波那契数列执行栈帧变化的动态演示' },
      { name: '神经网络', desc: '多层感知机的向前传播与反向传播参数微调' },
      { name: '哈希表', desc: '哈希映射、哈希冲突及拉链法解决冲突过程' },
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
const stageTabs = document.getElementById('stage-tabs');
const gradeTabs = document.getElementById('grade-tabs');
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
const CURRICULUM_DATA = window.CURRICULUM_KEYWORDS || null;
let activeStageId = CURRICULUM_DATA?.stages?.[0]?.id || null;
let activeGradeId = CURRICULUM_DATA?.stages?.[0]?.grades?.[0]?.id || null;
let activeSubjectId = CURRICULUM_DATA?.stages?.[0]?.grades?.[0]?.subjects?.[0]?.id || 'physics';
let currentGeneratedHtml = '';
let currentBlobUrl = '';
let loadingInterval = null;
let currentKeyword = '';
let models = [];
let activeModelId = 'built-in-gemini';
let activeTasks = [];
let cachedHistoryList = [];
let focusedKeyword = '';

// 初始化函数
function init() {
  initModels();
  renderStageTabs();
  renderGradeTabs();
  renderSubjectTabs();
  renderKeywords();
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

function getActiveStage() {
  return CURRICULUM_DATA?.stages?.find(stage => stage.id === activeStageId) || null;
}

function getActiveGrade() {
  return getActiveStage()?.grades?.find(grade => grade.id === activeGradeId) || null;
}

function getActiveSubject() {
  if (CURRICULUM_DATA) {
    return getActiveGrade()?.subjects?.find(subject => subject.id === activeSubjectId) || null;
  }
  return SUBJECTS_DATA.find(subject => subject.id === activeSubjectId) || null;
}

function ensureActiveGradeAndSubject() {
  const stage = getActiveStage();
  if (!stage) return;

  if (!stage.grades.some(grade => grade.id === activeGradeId)) {
    activeGradeId = stage.grades[0]?.id || null;
  }

  const grade = getActiveGrade();
  if (!grade) return;

  if (!grade.subjects.some(subject => subject.id === activeSubjectId)) {
    activeSubjectId = grade.subjects[0]?.id || null;
  }
}

// 渲染学段切换 Tab
function renderStageTabs() {
  if (!stageTabs || !CURRICULUM_DATA) return;

  stageTabs.innerHTML = CURRICULUM_DATA.stages.map(stage => {
    const isActive = stage.id === activeStageId;
    return `
      <button
        data-id="${stage.id}"
        class="tab-btn py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer ${isActive ? 'active' : ''}"
      >
        <i class="fa-solid fa-layer-group text-brand-teal"></i>
        <span>${stage.name}</span>
      </button>
    `;
  }).join('');
}

// 渲染年级切换 Tab
function renderGradeTabs() {
  if (!gradeTabs || !CURRICULUM_DATA) return;

  ensureActiveGradeAndSubject();
  const stage = getActiveStage();
  if (!stage) {
    gradeTabs.innerHTML = '';
    return;
  }

  gradeTabs.innerHTML = stage.grades.map(grade => {
    const isActive = grade.id === activeGradeId;
    return `
      <button
        data-id="${grade.id}"
        class="tab-btn py-2 px-2 rounded-xl flex items-center justify-center gap-1 text-[11px] font-medium cursor-pointer ${isActive ? 'active' : ''}"
      >
        <span>${grade.name}</span>
      </button>
    `;
  }).join('');
}

// 渲染学科切换 Tab
function renderSubjectTabs() {
  ensureActiveGradeAndSubject();
  const subjects = CURRICULUM_DATA ? (getActiveGrade()?.subjects || []) : SUBJECTS_DATA;

  subjectTabs.innerHTML = subjects.map(subj => {
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
function renderKeywords() {
  const subject = getActiveSubject();
  if (!subject) return;

  keywordGrid.innerHTML = subject.keywords.map(kw => `
    <div 
      data-keyword="${kw.name}"
      class="keyword-card p-3 rounded-xl cursor-pointer text-left flex flex-col justify-between"
    >
      <div class="flex items-start justify-between gap-2">
        <div class="font-medium text-xs text-slate-800 dark:text-slate-200">${kw.name}</div>
        ${CURRICULUM_DATA ? `<span class="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-500 dark:text-cyan-300 shrink-0">${getActiveGrade()?.name || ''}</span>` : ''}
      </div>
      <div class="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">${kw.desc}</div>
    </div>
  `).join('');
}

// 载入并渲染生成历史
async function loadHistory() {
  try {
    const response = await fetch('/api/history');
    if (!response.ok) throw new Error('拉取历史记录失败');
    
    cachedHistoryList = await response.json();
    renderTasksAndHistoryMarkup();

  } catch (err) {
    console.error('加载历史记录错误:', err);
    renderTasksAndHistoryMarkup(true);
  }
}

// 统一融合渲染排队任务与历史记录
function renderTasksAndHistoryMarkup(hasFetchError = false) {
  const hasActive = activeTasks.length > 0;
  const hasHistory = cachedHistoryList.length > 0;
  
  historyCount.innerText = `${cachedHistoryList.length} 条记录`;
  
  if (!hasActive && !hasHistory) {
    if (hasFetchError) {
      historyList.innerHTML = `<div class="text-center text-rose-500/60 text-xs py-8">拉取历史记录失败</div>`;
    } else {
      historyList.innerHTML = `<div class="text-center text-slate-500 dark:text-slate-600 text-xs py-8 select-none">暂无生成历史</div>`;
    }
    return;
  }
  
  // 1. 先渲染 activeTasks 中的进行中或失败任务
  const activeMarkup = activeTasks.map(task => {
    let statusBadge = '';
    let statusClass = '';
    let titleAttr = '';
    
    if (task.status === 'pending') {
      statusBadge = `
        <div class="flex items-center gap-1 text-[9px] text-cyan-500 dark:text-cyan-400 font-medium">
          <i class="fa-solid fa-circle-notch animate-spin text-[8px]"></i>
          <span>排队中</span>
        </div>
      `;
      statusClass = 'bg-cyan-500/5 dark:bg-cyan-500/10 border-cyan-500/10 dark:border-cyan-500/20';
      titleAttr = '任务已进入后台排队队列，您可以继续在页面进行其他操作';
    } else if (task.status === 'processing') {
      statusBadge = `
        <div class="flex items-center gap-1 text-[9px] text-teal-500 dark:text-teal-400 font-medium">
          <div class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></div>
          <span>生成中</span>
        </div>
      `;
      statusClass = 'bg-teal-500/5 dark:bg-teal-500/10 border-teal-500/10 dark:border-teal-500/20';
      titleAttr = 'AI 正在分析并全力编写 3D 可视化代码...';
    } else if (task.status === 'failed') {
      statusBadge = `
        <div class="flex items-center gap-2">
          <span class="text-[9px] text-rose-500 font-semibold" title="${task.error || '未知错误'}">生成失败</span>
          <button 
            type="button" 
            class="retry-task-btn p-1 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition cursor-pointer flex items-center justify-center" 
            data-id="${task.id}" 
            title="点击此按钮立刻重试生成"
          >
            <i class="fa-solid fa-rotate-right text-[9px]"></i>
          </button>
        </div>
      `;
      statusClass = 'bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/10 dark:border-rose-500/20';
      titleAttr = `失败原因: ${task.error || '未知错误'}，点击右侧按钮可发起重试`;
    }
    
    return `
      <div 
        class="history-item p-2.5 rounded-xl border flex items-center justify-between gap-2 text-left select-none transition ${statusClass}"
        title="${titleAttr}"
      >
        <div class="flex-1 min-w-0 pr-1">
          <div class="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">${task.keyword}</div>
          <div class="text-[9px] text-slate-500 mt-0.5 truncate">
            <span>使用模型: ${task.modelName}</span>
          </div>
        </div>
        <div>
          ${statusBadge}
        </div>
      </div>
    `;
  }).join('');
  
  // 2. 再渲染已有的历史纪录
  const historyMarkup = cachedHistoryList.map(item => {
    const timeStr = formatRelativeTime(item.createdAt);
    const isBuiltIn = item.provider === 'built-in';
    const modelDisplay = isBuiltIn ? '内置 Gemini' : item.modelName;
    
    const expectedId = isBuiltIn ? 'built-in-gemini' : `${item.provider}:${item.modelName}`;
    const isCurrentModelMatch = expectedId === activeModelId;
    const isFocused = item.keyword === focusedKeyword;

    return `
      <div 
        data-keyword="${item.keyword}"
        data-provider="${item.provider}"
        data-model-id="${expectedId}"
        data-model-name="${item.modelName}"
        class="history-item p-2.5 rounded-xl cursor-pointer flex items-center justify-between gap-2 text-left border border-transparent transition ${isFocused ? 'bg-[var(--card-hover-bg)] border-[var(--card-hover-border)] active-history' : 'hover:bg-slate-500/5'}"
        title="点击载入该 3D 页面"
      >
        <div class="flex-1 min-w-0 pr-1">
          <div class="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate ${isFocused ? 'text-cyan-400 font-bold' : ''}">${item.keyword}</div>
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
  
  if (hasFetchError && !hasHistory) {
    historyList.innerHTML = activeMarkup + `<div class="text-center text-rose-500/60 text-xs py-8">拉取历史记录失败</div>`;
  } else {
    historyList.innerHTML = activeMarkup + historyMarkup;
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
  // 学段 Tab 点击事件
  if (stageTabs) {
    stageTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab-btn');
      if (!tab) return;

      activeStageId = tab.dataset.id;
      ensureActiveGradeAndSubject();
      renderStageTabs();
      renderGradeTabs();
      renderSubjectTabs();
      renderKeywords();
    });
  }

  // 年级 Tab 点击事件
  if (gradeTabs) {
    gradeTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab-btn');
      if (!tab) return;

      activeGradeId = tab.dataset.id;
      ensureActiveGradeAndSubject();
      renderGradeTabs();
      renderSubjectTabs();
      renderKeywords();
    });
  }

  // 学科 Tab 点击事件
  subjectTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab-btn');
    if (!tab) return;
    
    const subjectId = tab.dataset.id;
    activeSubjectId = subjectId;
    
    subjectTabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    tab.classList.add('active');
    
    renderKeywords();
  });

  // 关键词卡片点击事件
  keywordGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.keyword-card');
    if (!card) return;
    
    const keyword = card.dataset.keyword;
    searchInput.value = keyword;
    generate3DPage(keyword);
  });

  // 历史记录列表点击重载与队列重试事件
  historyList.addEventListener('click', (e) => {
    // A. 检测是否点击了重试按钮
    const retryBtn = e.target.closest('.retry-task-btn');
    if (retryBtn) {
      e.stopPropagation();
      const taskId = retryBtn.dataset.id;
      const task = activeTasks.find(t => t.id === taskId);
      if (task) {
        task.status = 'pending';
        task.error = null;
        renderTasksAndHistoryMarkup();
        triggerTaskGeneration(task);
      }
      return;
    }

    // B. 常规历史载入卡片点击
    const item = e.target.closest('.history-item');
    if (!item) return;
    
    const keyword = item.dataset.keyword;
    if (!keyword) {
      // 正在生成或已失败的任务，尚未具备预览内容，忽略其整体点击
      return;
    }
    
    // 设置当前预览聚焦词为该历史记录
    focusedKeyword = keyword;
    renderTasksAndHistoryMarkup(); // 刷新高亮状态

    const historyProvider = item.dataset.provider;
    const historyModelName = item.dataset.modelName;

    // 优先根据 provider + modelName 来精确寻找本地的配置
    const matchedModel = models.find(m => m.provider === historyProvider && m.modelName === historyModelName);
    
    let activeConfigPayload = null;

    if (matchedModel) {
      activeModelId = matchedModel.id;
      localStorage.setItem('aetherviz_active_model_id', activeModelId);
      renderModelSelect();
      
      searchInput.value = keyword;
      generate3DPage(keyword);
    } else {
      // 如果没有在本地配置里找到这个模型（比如用户把它彻底删除了）
      // 我们直接构造一个临时的 override payload 发给后端，仅用于后端拼装出原本正确的 cacheKey 来命中缓存！
      // 从而实现即使删除了模型或密钥，点击历史也绝对能秒速秒出，不重新生成！
      activeConfigPayload = {
        provider: historyProvider,
        modelName: historyModelName,
        apiKey: 'DUMMY_KEY_JUST_FOR_CACHE_HIT',
        baseURL: historyProvider === 'anthropic' ? 'https://api.anthropic.com' : 'https://api.openai.com/v1'
      };
      
      searchInput.value = keyword;
      generate3DPage(keyword, activeConfigPayload);
    }
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

  // 主题切换事件
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
}


// 核心生成逻辑（非阻塞，支持多任务并行生成）
async function generate3DPage(keyword, overrideModelConfig = null) {
  const cleanKeyword = keyword.trim();
  if (!cleanKeyword) return;
  
  // 1. 设置当前正处于聚焦关注 the 词
  focusedKeyword = cleanKeyword;

  // 2. 决定要发送的模型配置与显示别名
  const activeModel = models.find(m => m.id === activeModelId);
  const isBuiltIn = activeModelId === 'built-in-gemini';
  
  let modelConfigToSend = null;
  let modelNameDisplay = '内置 Gemini';
  
  if (overrideModelConfig) {
    modelConfigToSend = overrideModelConfig;
    modelNameDisplay = overrideModelConfig.modelName;
  } else if (activeModel && activeModel.id !== 'built-in-gemini') {
    modelConfigToSend = {
      provider: activeModel.provider,
      apiKey: activeModel.apiKey,
      baseURL: activeModel.baseURL,
      modelName: activeModel.modelName
    };
    modelNameDisplay = activeModel.alias.substring(0, 15);
  }
  
  const task = {
    id: 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    keyword: cleanKeyword,
    modelName: modelNameDisplay,
    modelConfig: modelConfigToSend,
    status: 'pending',
    error: null,
    taskId: null
  };

  // 3. 将任务压入前端待处理队列顶部，并即时渲染列表
  activeTasks.unshift(task);
  renderTasksAndHistoryMarkup();

  // 4. 触发此任务在后台的生成和轮询
  triggerTaskGeneration(task);
}

// 触发单个任务的后端生成请求
async function triggerTaskGeneration(task) {
  const payload = { keyword: task.keyword };
  if (task.modelConfig) {
    payload.modelConfig = task.modelConfig;
  }

  // 仅在当前聚焦的词是该任务，且 iframe 预览为空时，才显示大原子 Loading
  if (focusedKeyword === task.keyword && !currentBlobUrl) {
    welcomeOverlay.classList.add('hidden');
    loadingOverlay.classList.remove('hidden');
    loadingOverlay.style.opacity = '1';
    startLoadingSimulation(task.keyword);
    loadingTitle.innerText = `[队列排队中...] 正在生成: ${task.keyword}`;
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
      throw new Error(data.error || '提交任务失败。');
    }
    
    // 情况 A：如果命中了缓存，直接同步处理结果，并从活动任务移除
    if (data.fromCache) {
      activeTasks = activeTasks.filter(t => t.id !== task.id);
      handleGenerationSuccess(task.keyword, data.html, true);
      await loadHistory();
      return;
    }

    // 情况 B：获取到了边缘端创建的异步任务 ID，开启轮询
    if (data.taskId) {
      task.taskId = data.taskId;
      task.status = 'pending';
      renderTasksAndHistoryMarkup();
      await pollTaskStatus(task);
    } else {
      throw new Error('未获取到边缘生成任务的有效 ID。');
    }
    
  } catch (error) {
    task.status = 'failed';
    task.error = error.message;
    renderTasksAndHistoryMarkup();
    
    // 若当前聚焦的依然是该词，则反馈错误至主页面蒙层
    if (focusedKeyword === task.keyword) {
      handleGenerationError(error);
    }
  }
}

// 轮询边缘端任务状态
async function pollTaskStatus(task) {
  let attempts = 0;
  const maxAttempts = 80; // 80 * 2.5s = 200 秒上限 (约3分20秒)
  
  const interval = setInterval(async () => {
    // 如果任务由于某种原因已不在活动列表（例如被重置），则停止轮询
    if (!activeTasks.some(t => t.id === task.id)) {
      clearInterval(interval);
      return;
    }
    
    attempts++;
    if (attempts > maxAttempts) {
      clearInterval(interval);
      task.status = 'failed';
      task.error = '生成任务在边缘端执行超时。';
      renderTasksAndHistoryMarkup();
      if (focusedKeyword === task.keyword) {
        handleGenerationError(new Error(task.error));
      }
      return;
    }
    
    try {
      const response = await fetch(`/api/generate?taskId=${encodeURIComponent(task.taskId)}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'pending') {
        task.status = 'pending';
        renderTasksAndHistoryMarkup();
        if (focusedKeyword === task.keyword) {
          loadingTitle.innerText = `[队列排队中...] 正在生成: ${task.keyword}`;
        }
      } else if (data.status === 'processing') {
        task.status = 'processing';
        renderTasksAndHistoryMarkup();
        if (focusedKeyword === task.keyword) {
          loadingTitle.innerText = `[AI 正在构建...] 正在生成: ${task.keyword}`;
        }
      } else if (data.status === 'success') {
        clearInterval(interval);
        
        // 生成成功，移出队列，装载到历史，并触发显示
        activeTasks = activeTasks.filter(t => t.id !== task.id);
        handleGenerationSuccess(task.keyword, data.html, false);
        await loadHistory();
      } else if (data.status === 'failed') {
        clearInterval(interval);
        task.status = 'failed';
        task.error = data.error || '边缘服务生成失败。';
        renderTasksAndHistoryMarkup();
        
        if (focusedKeyword === task.keyword) {
          handleGenerationError(new Error(task.error));
        }
      }
    } catch (err) {
      console.warn(`[Poll Task Fail] #${attempts} 轮询失败:`, err);
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        task.status = 'failed';
        task.error = `轮询出错: ${err.message}`;
        renderTasksAndHistoryMarkup();
        if (focusedKeyword === task.keyword) {
          handleGenerationError(new Error(task.error));
        }
      }
    }
  }, 2500);
}

// 成功处理逻辑 (仅在 keyword 匹配 focusedKeyword 时才自动载入预览)
function handleGenerationSuccess(keyword, htmlContent, fromCache) {
  if (keyword !== focusedKeyword) {
    console.log(`[Background Task Success] 后台主题 "${keyword}" 生成完成，因用户切换未自动展示`);
    return;
  }

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
  
  if (fromCache) {
    statusText.innerText = `已展示(缓存): ${keyword}`;
  } else {
    statusText.innerText = `已生成: ${keyword}`;
  }
  
  // 启用操作按钮
  btnCopy.disabled = false;
  btnFullscreen.disabled = false;
  btnDownload.disabled = false;
  
  // 隐藏 Loading 动画并刷新高亮
  finishLoadingSimulation();
  renderTasksAndHistoryMarkup();
}

// 失败处理逻辑 (仅在 focusedKeyword 匹配时提示错误)
function handleGenerationError(error) {
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
