// Curated China K-12 textbook/curriculum keywords for 3D lesson generation.
// Scope: topic-level keywords derived from national curriculum standards and common textbook units.
// Do not store textbook body text here.
window.CURRICULUM_KEYWORDS = {
  version: "2026-07-01",
  sources: [
    "教育部《义务教育课程方案和课程标准（2022年版）》",
    "教育部《普通高中课程方案和语文等学科课程标准（2017年版2020年修订）》",
    "人民教育出版社等主流教材公开目录"
  ],
  stages: [
    {
      id: "primary",
      name: "小学",
      grades: [
        {
          id: "g1",
          name: "一年级",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "认识立体图形", desc: "长方体、正方体、圆柱、球的3D观察与分类" },
                { name: "位置与方向", desc: "上下、前后、左右的空间方位演示" },
                { name: "20以内加减法数轴", desc: "数轴跳跃展示加减运算过程" },
                { name: "钟表认识", desc: "时针、分针转动与整时半时关系" }
              ]
            },
            {
              id: "science",
              name: "科学",
              icon: "fa-seedling",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "植物的根茎叶", desc: "植物器官结构和水分运输路径" },
                { name: "动物身体结构", desc: "昆虫、鱼、鸟的身体部位对比" },
                { name: "磁铁的两极", desc: "磁铁吸引、排斥和磁感线可视化" },
                { name: "水的三态变化", desc: "冰、水、水蒸气之间的状态变化" }
              ]
            }
          ]
        },
        {
          id: "g2",
          name: "二年级",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "乘法阵列模型", desc: "用方阵和堆叠方块理解乘法意义" },
                { name: "角的初步认识", desc: "角的开口大小与旋转形成过程" },
                { name: "平移与旋转", desc: "图形平移、旋转的动态变化" },
                { name: "长度单位换算", desc: "厘米、米与真实物体尺度对比" }
              ]
            },
            {
              id: "science",
              name: "科学",
              icon: "fa-seedling",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "太阳位置变化", desc: "一天中太阳高度和影子长度变化" },
                { name: "月相变化", desc: "月球绕地球运动与月相形成" },
                { name: "材料的性质", desc: "金属、塑料、木材的硬度和导热对比" },
                { name: "简单电路", desc: "电池、导线、灯泡构成闭合回路" }
              ]
            }
          ]
        },
        {
          id: "g3",
          name: "三年级",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "长方形和正方形周长", desc: "边长变化对周长的影响" },
                { name: "分数的初步认识", desc: "圆饼、长方形面积分割理解几分之一" },
                { name: "面积的意义", desc: "单位小方格铺满平面图形" },
                { name: "质量单位", desc: "克、千克和天平称量可视化" }
              ]
            },
            {
              id: "science",
              name: "科学",
              icon: "fa-seedling",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "水循环", desc: "蒸发、凝结、降水、径流的循环系统" },
                { name: "空气占据空间", desc: "空气压缩、流动和压力实验" },
                { name: "声音的产生", desc: "物体振动形成声波的过程" },
                { name: "植物生命周期", desc: "种子萌发、生长、开花、结果" }
              ]
            }
          ]
        },
        {
          id: "g4",
          name: "四年级",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "平行与垂直", desc: "直线位置关系和垂线距离演示" },
                { name: "三角形稳定性", desc: "三角形与四边形结构受力对比" },
                { name: "小数的意义", desc: "数轴和面积模型解释小数" },
                { name: "复式条形统计图", desc: "多组数据柱状图对比" }
              ]
            },
            {
              id: "science",
              name: "科学",
              icon: "fa-seedling",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "电路串联并联", desc: "串联和并联电路中电流路径对比" },
                { name: "食物链和食物网", desc: "生态系统能量传递网络" },
                { name: "岩石和矿物", desc: "岩石结构、矿物晶体和风化过程" },
                { name: "人体消化系统", desc: "食物经过消化道的运动路径" }
              ]
            }
          ]
        },
        {
          id: "g5",
          name: "五年级",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "多边形面积公式", desc: "平行四边形、三角形、梯形割补推导" },
                { name: "长方体和正方体体积", desc: "单位立方体堆叠理解体积公式" },
                { name: "长方体体积精确课件", desc: "EduLab精确引擎：长宽高与体积公式同源演示" },
                { name: "因数与倍数", desc: "数轴和网格展示公因数、公倍数" },
                { name: "可能性实验", desc: "随机抽取与概率频率变化" }
              ]
            },
            {
              id: "science",
              name: "科学",
              icon: "fa-seedling",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "光的反射", desc: "入射角、反射角与镜面成像" },
                { name: "地球内部结构", desc: "地壳、地幔、地核剖面模型" },
                { name: "热传递方式", desc: "传导、对流、辐射的动态演示" },
                { name: "简单机械杠杆", desc: "支点、力臂和省力关系" }
              ]
            }
          ]
        },
        {
          id: "g6",
          name: "六年级",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "圆的面积推导", desc: "圆形切拼成长方形理解面积公式" },
                { name: "圆柱和圆锥体积", desc: "等底等高圆柱与圆锥容量关系" },
                { name: "比例尺", desc: "地图比例和真实距离缩放模型" },
                { name: "扇形统计图", desc: "整体与部分比例的圆形图示" }
              ]
            },
            {
              id: "science",
              name: "科学",
              icon: "fa-seedling",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "太阳系模型", desc: "八大行星绕太阳公转和尺度对比" },
                { name: "月食和日食", desc: "日地月位置关系与影区变化" },
                { name: "显微镜下的细胞", desc: "细胞膜、细胞核、叶绿体结构" },
                { name: "能量转换", desc: "电能、光能、热能、动能之间转换" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "junior",
      name: "初中",
      grades: [
        {
          id: "g7",
          name: "七年级",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "有理数数轴", desc: "正负数在数轴上的位置和运算" },
                { name: "立体图形展开图", desc: "棱柱、圆柱、圆锥的展开与还原" },
                { name: "相交线与平行线", desc: "同位角、内错角、同旁内角关系" },
                { name: "变量之间的关系", desc: "表格、图像和解析式联动展示" }
              ]
            },
            {
              id: "biology",
              name: "生物",
              icon: "fa-dna",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "显微镜结构和成像", desc: "目镜、物镜、载物台与放大成像路径" },
                { name: "动植物细胞结构", desc: "细胞膜、细胞质、细胞核、叶绿体对比" },
                { name: "生态系统结构", desc: "生产者、消费者、分解者和物质循环" },
                { name: "种子萌发条件", desc: "水分、空气、温度对萌发的影响" }
              ]
            },
            {
              id: "geography",
              name: "地理",
              icon: "fa-earth-asia",
              color: "from-sky-500 to-indigo-500",
              keywords: [
                { name: "地球自转和昼夜", desc: "自转导致昼夜交替和时差" },
                { name: "经纬网定位", desc: "经线、纬线、经纬度定位系统" },
                { name: "等高线地形图", desc: "山峰、山谷、鞍部、陡崖的3D地形还原" },
                { name: "世界气候类型", desc: "纬度、海陆和地形对气候的影响" }
              ]
            },
            {
              id: "information",
              name: "信息科技",
              icon: "fa-code",
              color: "from-teal-500 to-cyan-500",
              keywords: [
                { name: "数据编码", desc: "二进制编码和图像像素表示" },
                { name: "流程图算法", desc: "顺序、分支、循环结构动态执行" },
                { name: "网络数据传输", desc: "数据包在网络节点间传输过程" },
                { name: "传感器数据采集", desc: "温度、光照等传感器数据实时曲线" }
              ]
            }
          ]
        },
        {
          id: "g8",
          name: "八年级",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "全等三角形判定", desc: "SSS、SAS、ASA、AAS动态重合演示" },
                { name: "轴对称图形", desc: "图形关于对称轴翻折重合" },
                { name: "一次函数图像", desc: "斜率和截距变化对直线的影响" },
                { name: "勾股定理", desc: "直角三角形三边平方关系的几何证明" }
              ]
            },
            {
              id: "physics",
              name: "物理",
              icon: "fa-atom",
              color: "from-blue-500 to-cyan-500",
              keywords: [
                { name: "机械运动", desc: "位置、路程、速度和运动图像" },
                { name: "声音的传播", desc: "声波在不同介质中的传播和反射" },
                { name: "光的反射和折射", desc: "光线在镜面和介质边界的路径变化" },
                { name: "凸透镜成像", desc: "物距、像距和成像大小关系" },
                { name: "物态变化", desc: "熔化、凝固、汽化、液化、升华、凝华" }
              ]
            },
            {
              id: "biology",
              name: "生物",
              icon: "fa-dna",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "人体消化和吸收", desc: "食物在消化系统中的分解和吸收路径" },
                { name: "人体血液循环", desc: "心脏、血管和体循环肺循环" },
                { name: "呼吸系统气体交换", desc: "肺泡与毛细血管间氧气二氧化碳交换" },
                { name: "神经调节反射弧", desc: "感受器、神经中枢、效应器的信息传递" }
              ]
            },
            {
              id: "geography",
              name: "地理",
              icon: "fa-earth-asia",
              color: "from-sky-500 to-indigo-500",
              keywords: [
                { name: "中国地形阶梯", desc: "三级阶梯地形剖面和河流流向" },
                { name: "季风气候", desc: "冬夏季风路径和降水分布" },
                { name: "长江黄河流域", desc: "流域、支流、上中下游特征" },
                { name: "人口迁移和城市化", desc: "人口流动与城市空间扩张" }
              ]
            }
          ]
        },
        {
          id: "g9",
          name: "九年级",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "二次函数图像", desc: "开口、顶点、对称轴与参数变化" },
                { name: "圆的性质", desc: "弦、切线、圆周角和圆心角关系" },
                { name: "相似三角形", desc: "比例缩放和相似判定动态演示" },
                { name: "锐角三角函数", desc: "单位圆、直角三角形和正弦余弦正切" }
              ]
            },
            {
              id: "physics",
              name: "物理",
              icon: "fa-atom",
              color: "from-blue-500 to-cyan-500",
              keywords: [
                { name: "力和运动", desc: "合力、摩擦力和牛顿运动状态变化" },
                { name: "压强和浮力", desc: "液体压强、阿基米德原理和物体浮沉" },
                { name: "简单机械", desc: "杠杆、滑轮、斜面和机械效率" },
                { name: "电路欧姆定律", desc: "电压、电流、电阻关系和电路图" },
                { name: "电功率和焦耳定律", desc: "用电器功率、热效应和能量转化" }
              ]
            },
            {
              id: "chemistry",
              name: "化学",
              icon: "fa-flask",
              color: "from-orange-500 to-red-500",
              keywords: [
                { name: "原子结构", desc: "原子核、电子层和元素周期变化" },
                { name: "分子和化学反应", desc: "分子重组解释化学变化" },
                { name: "甲烷燃烧", desc: "EduLab精确引擎：甲烷与氧气断键成键微观演示" },
                { name: "氢气燃烧", desc: "EduLab精确引擎：氢气与氧气生成水的原子守恒" },
                { name: "电解水", desc: "EduLab精确引擎：水通电分解为氢气和氧气" },
                { name: "质量守恒定律", desc: "反应前后原子种类和数目不变" },
                { name: "溶液和溶解度", desc: "溶质、溶剂、饱和溶液和溶解度曲线" },
                { name: "酸碱盐反应", desc: "离子反应、中和反应和沉淀生成" }
              ]
            },
            {
              id: "biology",
              name: "生物",
              icon: "fa-dna",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "遗传规律", desc: "基因、性状和孟德尔分离规律" },
                { name: "生殖和发育", desc: "受精、胚胎发育和个体生长" },
                { name: "免疫系统", desc: "非特异性免疫和特异性免疫过程" },
                { name: "生物进化", desc: "自然选择和适应形成过程" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "senior",
      name: "高中",
      grades: [
        {
          id: "g10",
          name: "高一",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "函数图像变换", desc: "平移、伸缩、翻折对函数图像的影响" },
                { name: "三角函数单位圆", desc: "角度、弧度、正弦余弦和周期变化" },
                { name: "向量的线性运算", desc: "向量加法、数乘和几何表示" },
                { name: "空间几何体", desc: "棱柱、棱锥、圆柱、圆锥和球的结构" },
                { name: "正四棱锥线面角", desc: "EduLab精确引擎：建系与空间向量求线面角" },
                { name: "正方体线面角", desc: "EduLab精确引擎：A₁C与底面夹角的3D向量解法" }
              ]
            },
            {
              id: "physics",
              name: "物理",
              icon: "fa-atom",
              color: "from-blue-500 to-cyan-500",
              keywords: [
                { name: "匀变速直线运动", desc: "位移、速度、加速度和v-t图像" },
                { name: "牛顿第二定律", desc: "力、质量、加速度关系和受力分析" },
                { name: "平抛运动", desc: "水平匀速与竖直自由落体合成" },
                { name: "圆周运动", desc: "向心力、角速度和线速度关系" },
                { name: "机械能守恒", desc: "动能、势能之间的转换" }
              ]
            },
            {
              id: "chemistry",
              name: "化学",
              icon: "fa-flask",
              color: "from-orange-500 to-red-500",
              keywords: [
                { name: "物质的量", desc: "微粒数、摩尔质量和气体摩尔体积" },
                { name: "离子反应", desc: "电解质电离和离子方程式" },
                { name: "氧化还原反应", desc: "电子转移、化合价变化和氧化还原对" },
                { name: "钠与氯气氧化还原", desc: "EduLab精确引擎：电子转移与NaCl形成过程" },
                { name: "元素周期律", desc: "原子半径、电负性和周期性变化" }
              ]
            },
            {
              id: "biology",
              name: "生物",
              icon: "fa-dna",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "细胞膜流动镶嵌模型", desc: "磷脂双分子层和膜蛋白运动" },
                { name: "酶促反应", desc: "酶降低活化能和温度pH影响" },
                { name: "有氧呼吸", desc: "糖酵解、三羧酸循环和电子传递链" },
                { name: "葡萄糖有氧氧化", desc: "EduLab精确引擎：葡萄糖与氧气生成二氧化碳和水" },
                { name: "光合作用", desc: "光反应、暗反应和叶绿体结构" }
              ]
            },
            {
              id: "geography",
              name: "地理",
              icon: "fa-earth-asia",
              color: "from-sky-500 to-indigo-500",
              keywords: [
                { name: "地球公转和四季", desc: "黄赤交角、太阳直射点移动和昼夜长短" },
                { name: "大气受热过程", desc: "太阳辐射、地面辐射和大气逆辐射" },
                { name: "热力环流", desc: "近地面冷热不均产生空气环流" },
                { name: "水循环", desc: "海陆间循环、陆地内循环和海上内循环" }
              ]
            },
            {
              id: "information",
              name: "信息技术",
              icon: "fa-code",
              color: "from-teal-500 to-cyan-500",
              keywords: [
                { name: "数据结构栈和队列", desc: "后进先出与先进先出的动态过程" },
                { name: "排序算法", desc: "冒泡、选择、插入排序的可视化比较" },
                { name: "二分查找", desc: "有序数组折半查找过程" },
                { name: "计算机网络分层", desc: "应用层到物理层的数据封装与传输" }
              ]
            }
          ]
        },
        {
          id: "g11",
          name: "高二",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "椭圆双曲线抛物线", desc: "圆锥曲线定义、焦点和准线" },
                { name: "椭圆向量数量积范围", desc: "EduLab精确引擎：焦点弦与向量数量积范围" },
                { name: "椭圆焦点弦长范围", desc: "EduLab精确引擎：过焦点动弦长度实时读数" },
                { name: "椭圆三角形面积最大值", desc: "EduLab精确引擎：过焦点弦与原点构成面积最值" },
                { name: "椭圆斜率之积定值", desc: "EduLab精确引擎：中心对称弦中的斜率定值" },
                { name: "抛物线焦点弦定值", desc: "EduLab精确引擎：焦点弦向量数量积定值" },
                { name: "双曲线离心率范围", desc: "EduLab精确引擎：参数变化下的离心率范围" },
                { name: "空间向量", desc: "三维坐标、点线面位置关系和夹角" },
                { name: "导数几何意义", desc: "切线斜率与函数变化率" },
                { name: "排列组合", desc: "分类计数、分步计数和组合模型" }
              ]
            },
            {
              id: "physics",
              name: "物理",
              icon: "fa-atom",
              color: "from-blue-500 to-cyan-500",
              keywords: [
                { name: "电场线和等势面", desc: "点电荷电场、场强方向和电势分布" },
                { name: "带电粒子在电场中运动", desc: "加速、偏转和轨迹变化" },
                { name: "磁场和洛伦兹力", desc: "带电粒子在磁场中的圆周运动" },
                { name: "电磁感应", desc: "磁通量变化、感应电流和楞次定律" },
                { name: "交流电和变压器", desc: "正弦交流电、有效值和电压变换" }
              ]
            },
            {
              id: "chemistry",
              name: "化学",
              icon: "fa-flask",
              color: "from-orange-500 to-red-500",
              keywords: [
                { name: "化学反应速率", desc: "浓度、温度、催化剂对反应速率影响" },
                { name: "化学平衡移动", desc: "勒夏特列原理和动态平衡" },
                { name: "弱电解质电离平衡", desc: "电离度、pH和离子浓度变化" },
                { name: "原电池", desc: "氧化还原反应转化为电能" },
                { name: "电解池", desc: "外加电流驱动非自发反应" }
              ]
            },
            {
              id: "biology",
              name: "生物",
              icon: "fa-dna",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "DNA复制", desc: "半保留复制、解旋酶和DNA聚合酶" },
                { name: "基因表达", desc: "转录、翻译和蛋白质合成" },
                { name: "减数分裂", desc: "同源染色体分离和配子形成" },
                { name: "神经冲动传导", desc: "动作电位和突触传递" },
                { name: "体液调节", desc: "激素分泌、反馈调节和稳态维持" }
              ]
            },
            {
              id: "geography",
              name: "地理",
              icon: "fa-earth-asia",
              color: "from-sky-500 to-indigo-500",
              keywords: [
                { name: "板块构造运动", desc: "板块张裂、碰撞和地震火山分布" },
                { name: "河流地貌", desc: "侵蚀、搬运、堆积和河谷演化" },
                { name: "洋流系统", desc: "全球洋流环流和气候影响" },
                { name: "城市空间结构", desc: "商业区、住宅区、工业区空间分布" }
              ]
            },
            {
              id: "information",
              name: "信息技术",
              icon: "fa-code",
              color: "from-teal-500 to-cyan-500",
              keywords: [
                { name: "二叉树遍历", desc: "前序、中序、后序和层序遍历" },
                { name: "图搜索算法", desc: "广度优先搜索和深度优先搜索" },
                { name: "数据库关系模型", desc: "表、主键、外键和查询关系" },
                { name: "机器学习分类", desc: "特征空间、训练样本和分类边界" }
              ]
            }
          ]
        },
        {
          id: "g12",
          name: "高三",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "函数零点和方程", desc: "函数图像与方程根的对应关系" },
                { name: "定积分几何意义", desc: "曲边梯形面积和体积近似累加" },
                { name: "概率分布", desc: "二项分布、正态分布和随机变量" },
                { name: "复数几何意义", desc: "复平面、模、幅角和旋转变换" }
              ]
            },
            {
              id: "physics",
              name: "物理",
              icon: "fa-atom",
              color: "from-blue-500 to-cyan-500",
              keywords: [
                { name: "机械振动", desc: "弹簧振子、单摆和简谐运动图像" },
                { name: "机械波", desc: "横波传播、干涉、衍射和驻波" },
                { name: "光的干涉和衍射", desc: "双缝干涉条纹和光栅衍射" },
                { name: "光电效应", desc: "光子能量、逸出功和截止频率" },
                { name: "原子核衰变", desc: "α、β、γ衰变和半衰期" }
              ]
            },
            {
              id: "chemistry",
              name: "化学",
              icon: "fa-flask",
              color: "from-orange-500 to-red-500",
              keywords: [
                { name: "有机物结构和同分异构", desc: "碳骨架、官能团和空间构型" },
                { name: "烃的反应", desc: "加成、取代、氧化和聚合反应" },
                { name: "酯化反应", desc: "羧酸和醇生成酯的可逆反应" },
                { name: "乙酸乙酯酯化机理", desc: "EduLab精确引擎：羧酸与醇生成酯和水的机理动画" },
                { name: "晶体结构", desc: "离子晶体、分子晶体和金属晶体模型" }
              ]
            },
            {
              id: "biology",
              name: "生物",
              icon: "fa-dna",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "基因工程", desc: "限制酶、载体、目的基因和转化过程" },
                { name: "PCR扩增", desc: "变性、退火、延伸的循环过程" },
                { name: "生态系统能量流动", desc: "营养级、能量金字塔和物质循环" },
                { name: "种群数量变化", desc: "J型增长、S型增长和环境容纳量" }
              ]
            },
            {
              id: "geography",
              name: "地理",
              icon: "fa-earth-asia",
              color: "from-sky-500 to-indigo-500",
              keywords: [
                { name: "区域产业转移", desc: "产业链、区位因素和空间转移路径" },
                { name: "资源跨区域调配", desc: "南水北调、西气东输等线路影响" },
                { name: "遥感和GIS", desc: "遥感影像、图层叠加和空间分析" },
                { name: "自然灾害监测", desc: "台风、洪涝、滑坡的风险模型" }
              ]
            },
            {
              id: "information",
              name: "信息技术",
              icon: "fa-code",
              color: "from-teal-500 to-cyan-500",
              keywords: [
                { name: "动态规划", desc: "状态转移、最优子结构和路径问题" },
                { name: "哈希表", desc: "哈希函数、冲突和查找效率" },
                { name: "神经网络结构", desc: "输入层、隐藏层、权重和激活函数" },
                { name: "信息安全加密", desc: "对称加密、非对称加密和数字签名" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "university",
      name: "大学",
      grades: [
        {
          id: "u1",
          name: "公共基础课",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "微积分极限定义", desc: "用ε-δ定义动态演示极限逼近与收敛过程" },
                { name: "泰勒展开逼近", desc: "动态展示多项式对正弦、指数等超越函数的逼近过程" },
                { name: "多元函数偏导与鞍点", desc: "3D绘制马鞍面，演示偏导数、梯度及鞍点位置" },
                { name: "空间曲面积分", desc: "3D展示曲面积分的微元分割与物理意义" }
              ]
            },
            {
              id: "physics",
              name: "物理",
              icon: "fa-atom",
              color: "from-blue-500 to-cyan-500",
              keywords: [
                { name: "阻尼与受迫振动", desc: "斜面滑块、阻尼振动与相空间轨迹模拟" },
                { name: "电场线与等势面", desc: "动态展示点电荷、电偶极子的3D电场分布与等势面变化" },
                { name: "麦克斯韦速率分布", desc: "演示理想气体分子在不同温度下的速率分布与碰撞过程" },
                { name: "刚体定轴转动与陀螺进动", desc: "演示转动惯量、角动量守恒与陀螺进动效应" }
              ]
            }
          ]
        },
        {
          id: "u2",
          name: "专业基础课",
          subjects: [
            {
              id: "math",
              name: "数学",
              icon: "fa-calculator",
              color: "from-amber-500 to-yellow-500",
              keywords: [
                { name: "矩阵线性变换", desc: "3D空间中向量网格在矩阵乘法下的剪切、拉伸与旋转" },
                { name: "特征值与特征向量", desc: "3D演示变换中方向保持不变的向量及空间缩放" },
                { name: "施密特正交化", desc: "动态展示基向量投影、逐步正交化与单位化的几何过程" }
              ]
            },
            {
              id: "physics",
              name: "物理",
              icon: "fa-atom",
              color: "from-blue-500 to-cyan-500",
              keywords: [
                { name: "电磁波传播与极化", desc: "3D演示线极化、圆极化电磁波在介质中的传播与电场矢量旋转" },
                { name: "LC振荡与电磁辐射", desc: "电容电感电荷交替变化与电磁波发射微观过程" }
              ]
            },
            {
              id: "biology",
              name: "生物",
              icon: "fa-dna",
              color: "from-emerald-500 to-teal-500",
              keywords: [
                { name: "蛋白质三级结构", desc: "3D演示α螺旋、β折叠及其疏水键维持的折叠结构" },
                { name: "酶的诱导契合学说", desc: "底物与酶活性中心结合时的构象改变与催化机制" }
              ]
            },
            {
              id: "information",
              name: "信息技术",
              icon: "fa-code",
              color: "from-teal-500 to-cyan-500",
              keywords: [
                { name: "红黑树旋转与平衡", desc: "红黑树插入节点后的变色、左旋和右旋调整过程" },
                { name: "Dijkstra最短路径算法", desc: "图结构中松弛操作与最短路径树生成的动态过程" }
              ]
            }
          ]
        },
        {
          id: "u3",
          name: "专业前沿与应用",
          subjects: [
            {
              id: "information",
              name: "信息技术",
              icon: "fa-code",
              color: "from-teal-500 to-cyan-500",
              keywords: [
                { name: "光线追踪算法", desc: "动态展示光线从相机发出，经过反射、折射与阴影光线击中光源的追踪路径" },
                { name: "卷积神经网络特征图", desc: "3D展示图像经过卷积核滑动、激活、池化后多通道特征图的提取过程" }
              ]
            },
            {
              id: "physics",
              name: "物理",
              icon: "fa-atom",
              color: "from-blue-500 to-cyan-500",
              keywords: [
                { name: "氢原子电子云轨道", desc: "3D绘制s, p, d轨道的概率密度分布与波函数角度部分" },
                { name: "布洛赫球面与量子比特", desc: "演示超导或自旋量子比特在布洛赫球面上的自旋进动与测量坍缩" }
              ]
            },
            {
              id: "geography",
              name: "地理",
              icon: "fa-earth-asia",
              color: "from-sky-500 to-indigo-500",
              keywords: [
                { name: "多源GIS图层叠加", desc: "3D展示地形、路网、水系、人口密度图层的层叠分析与空间查询" },
                { name: "厄尔尼诺与拉尼娜现象", desc: "太平洋赤道海温异常、沃克环流异动及其全球气候效应模拟" }
              ]
            }
          ]
        }
      ]
    }
  ]
};
