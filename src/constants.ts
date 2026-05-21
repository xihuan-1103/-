export const REPORT_DATA = {
  title: "数智养护总体规划",
  date: "2026年05月",
  company: "数字化事业部",
  menu: [
    { id: "vision", label: "一. 愿景" },
    { id: "architecture", label: "二. 总体架构" },
    { id: "action-plan", label: "三. 行动安排" }
  ],
  vision: {
    title: "从“养护数字化”到“数智养护产业化”",
    stages: [
      {
        id: 1,
        name: "第一阶段：筑基",
        goal: "夯实业务底座，构建数据资产。",
        action: "以搭平台、采数据、治数据为核心，全面搭建养护基础业务平台，启动数据平台建设并系统性开展数据治理工作。实现养护业务核心流程线上化、全要素数据自动化归集，构建标准统一、规范可用的养护数据资产，为后续数智化升级筑牢底层根基。",
        highlight: "搭平台、采数据、治数据",
        highlight2: "筑牢底层根基"
      },
      {
        id: 2,
        name: "第二阶段：破界",
        goal: "激活数据要素，突破传统养护边界。",
        action: "以用数据、转模式、提效能为核心，深度运用 AI、大数据分析等数智技术开展数据挖掘与应用。推动传统施工养护向数智养护转型，实现养护管理从被动响应向主动预测、智能决策转变，全面突破传统养护效率与管理瓶颈。",
        highlight: "用数据、转模式、提效能",
        highlight2: "模式由“被动响应”向“主动预测、智能决策”"
      },
      {
        id: 3,
        name: "第三阶段：领航",
        goal: "精塑业务模型，引领产业数智升级。",
        action: "以数智赋能、产业升级、品牌化为核心，搭建数据分析、BI+AI 智能分析平台，以数据能力赋能业务承接与业主服务升级。打造标准化数智养护产品、构建专业场景模型，最终推动养护业务从数字化应用向数智养护产业化跨越发展，打造交工养护新品牌。",
        highlight: "数智赋能、产业升级、品牌化",
        highlight2: "数智养护产业化"
      }
    ],
    change: {
      text: "整体规划的转变：从为支撑业务开展搭建数字化平台，升级为在满足业务核心需求的基础上，深挖数据核心价值，通过数字化平台建设归集构建养护专属数据资产，依托数据复用开展深度价值挖掘，落地系列 AI 智能体及养护专业场景智能应用。",
      highlights: ["支撑业务", "深挖数据核心价值", "构建养护专属数据资产"],
      subText: "摒弃以往被动跟随需求、业务方要什么就开发什么的传统模式，转变为先立足数智养护发展大局制定清晰顶层规划，再深度融合业务一线实战经验统筹开展平台整体搭建。依托数字化事业部产品化沉淀与养护专业领域能力完成体系设计，以各项目部作为实际应用运行阵地持续迭代打磨，最终打造出适配集团内部使用、同时可对外市场化推广的数智养护平台产品。",
      staircase: ["精细化专项场景模型", "挖掘数据资产潜在价值", "建强业务平台夯实数据基础"]
    }
  },
  architecture: {
    title: "打造“11N+AI”的总体架构",
    components: [
      {
        id: "net",
        title: "1网：构建养护板块专属局域网",
        content: "打造贯通集团“大养护”全业务、全要素、全流程的一张专属局域网。"
      },
      {
        id: "platform",
        title: "1平台：养护管理平台建设",
        content: "搭建一个核心业务管理平台即“养护管理平台”，作为数智养护建设的核心载体，形成“多端联动、指令互通、数据同步、闭环管理”的数字化业务体系"
      },
      {
        id: "scenes",
        title: "N场景：聚焦养护专业场景",
        content: "聚焦养护业务高频、高专业要求的核心场景，打造“标准化作业流程+智能化管控工具+专业化知识体系”三位一体的专属数字模块，形成养护板块特色鲜明、专业领先的核心数字化能力"
      }
    ],
    ai: "AI赋能：系统性布局、渐进式落地的推动人工智能技术与养护业务的深度融合。整体遵循“以点连线、以线成面”的推进逻辑，推动初期分散的AI能力节点逐步串联为协同高效的智能链路，最终织就覆盖养护全场景的协同智能网络。"
  },
  actionPlan: [
    {
      year: "2026",
      tagline: "启动之年·平台搭建、试点见效",
      position: "数智养护启动之年，以养护管理平台基础搭建为核心，同步落地AI工具试点，专业场景应用建设，以验证数智化对养护业务的提效价值。",
      achievements: [
        { label: "养护管理平台建设", desc: "核心业务模块搭建，实现产值数据采集，业务主线闭环。" },
        { label: "养护专业场景应用建设", desc: "搭建桥梁、路面、隧道、边坡、沥青拌合站在内的养护专属场景建设。" },
        { label: "施工养护+无人机", desc: "打造飞控平台。" },
        { label: "施工养护+AI", desc: "AI排班助手试点落地。" }
      ]
    },
    {
      year: "2027",
      tagline: "建成之年·平台贯通、数据积累",
      position: "养护管理平台全面建成与数据资产建设之年，实现平台功能闭环与业务数据全量治理，推动AI能力从单点工具向平台化服务升级。",
      achievements: [
        { label: "养护管理平台", desc: "平台全面建成，实现单合同成本闭环，支撑业务流程线上化运转。" },
        { label: "数据资产体系启动建设", desc: "建立养护基础数据库，将历史施工记录，工料机等全要素业务数据，每年养护方案、过程数据等采集，形成关联，为养护指导决策和后评估提供支持。" },
        { label: "养护专业场景应用", desc: "持续建设专业场景，新增隧道养护场景，推动场景应用平台化集成。" },
        { label: "施工养护+AI", desc: "优化 AI 排班助手并与平台深度融合，搭建 AI 知识库，实现知识问答、业务咨询。" }
      ]
    },
    {
      year: "2028",
      tagline: "深化之年·数据应用、智能升级",
      position: "作为数据深化应用与智能养护之年，基于已积累的数据资产，开展深度分析与模型应用，推动养护模式向预防性、精准化、智能化转型。",
      achievements: [
        { label: "BI数据平台", desc: "基于数据资产开展深度分析与建模，融合AI实现高质量数据引用与可视化决策。" },
        { label: "养护专业场景应用", desc: "专业场景持续迭代，完成路桥隧坡、拌合站等场景标准化，形成可复用产品模块。" },
        { label: "施工养护+AI", desc: "打造经营透视 AI 助手、专项养护场景模型，形成 AI 智能应用矩阵。" }
      ]
    }
  ],
  year2026: {
    categories: [
      {
        id: "platform",
        title: "养护管理平台建设",
        label: "合作开发",
        hint: "与交工设计院共同开发",
        statusNote: "目前系统持续开发中",
        description: "2026年总体目标为核心业务模块搭建，实现产值数据采集，业务主线闭环。",
        timeline: [
          { month: "1月", goal: "框架与组织设计", tasks: ["完成平台基础框架搭建", "养护组织架构设计"], status: "completed" },
          { month: "2月", goal: "班组与实名制", tasks: ["班组管理模块开发", "实现集团劳务实名制系统对接"], status: "completed" },
          { month: "3月", goal: "项目立项开发", tasks: ["项目立项开发工作"], status: "completed" },
          { month: "4月", goal: "项目变更开发", tasks: ["项目变更审批流开发"], status: "completed" },
          { month: "5月", goal: "收入合同开发", tasks: ["合同开发", "打通集团合同管理系统"], status: "completed" },
          { month: "6月", goal: "工程量清单开发", tasks: ["材料管理开发", "设备管理开发", "工程量清单开发"], status: "pending", isMilestone: true },
          { month: "7月", goal: "产值数据采集", tasks: ["产值提取开发项目部试点", "产值数据采集"], status: "pending", isMilestone: true },
          { month: "8月", goal: "施工管理开发", tasks: ["施工流程数字化开发"], status: "pending" },
          { month: "10月", goal: "计量管理开发", tasks: ["计量流程开发"], status: "pending" },
          { month: "11月", goal: "质安管理开发", tasks: ["质量管理开发", "安全管理开发"], status: "pending" },
          { month: "12月", goal: "业务主线闭环", tasks: ["试点项目部跑通业务主线闭环"], status: "pending", isMilestone: true }
        ]
      },
      {
        id: "scenes",
        title: "路桥隧坡应用平台建设",
        label: "合作开发",
        hint: "与交工设计院共同开发",
        statusNote: "目前系统启动，搭建基础框架中",
        description: "2026年总体目标为完成特桥特养、路面养护、边坡养护三个专业场景应用建设，服务缙云、奉化、金华三个项目部。",
        timeline: [
          { month: "4月", goal: "项目启动", tasks: ["项目正式启动", "组建开发团队"], status: "completed" },
          { month: "5月", goal: "需求与代码承接", tasks: ["确认业务需求", "承接原平台代码"], status: "completed" },
          { month: "6月", goal: "系统基础开发", tasks: ["启动开发工作", "搭建管理工作台"], status: "pending", specialEvent: "满足缙云现场会需求" },
          { month: "7月", goal: "基础模块完成", tasks: ["实现路桥坡基础能力模块搭建"], status: "pending", specialEvent: "满足奉化现场会需求" },
          { month: "8月", goal: "特桥特养建设", tasks: ["特桥特养场景模块化"], status: "pending" },
          { month: "9月", goal: "路面养护建设", tasks: ["路面养护场景数字化"], status: "pending" },
          { month: "10月", goal: "边坡养护建设", tasks: ["边坡养护场景智能化"], status: "pending" },
          { month: "11月", goal: "系统联调测试", tasks: ["三地项目部服务联调"], status: "pending" },
          { month: "12月", goal: "业务主线闭环", tasks: ["试点项目部跑通业务主线闭环"], status: "pending", specialEvent: "满足金华现场会需求" }
        ]
      },
      {
        id: "asphalt",
        title: "沥青拌合站平台建设",
        label: "自研开发",
        statusNote: "系统调研阶段",
        description: "截止年底完成主要业务模块搭建，包含原材料、配合比、拌合、运输等业务能力开发。并启动项目部试点工作。",
        timeline: [
          { month: "5月", goal: "需求调研", tasks: ["进行上虞分公司、湖州分公司现场调研"], status: "completed" },
          { month: "6月", goal: "调研设计", tasks: ["现场调研", "PRD评审"], status: "pending" },
          { month: "7月", goal: "原型确认", tasks: ["原型确认", "设计定稿"], status: "pending" },
          { month: "8月", goal: "开发联调", tasks: ["核心模块开发", "设备对接"], status: "pending" },
          { month: "9月", goal: "集成测试", tasks: ["气电表改造", "模块集成测试"], status: "pending" },
          { month: "10月", goal: "试点准备", tasks: ["系统功能打磨"], status: "pending" },
          { month: "11月", goal: "双基上线", tasks: ["2个基地初始化", "培训", "试运行"], status: "pending", isMilestone: true },
          { month: "12月", goal: "验收试点", tasks: ["系统验收", "启动项目部试点工作"], status: "pending", isMilestone: true }
        ]
      },
      {
        id: "drone",
        title: "施工养护+无人机",
        statusNote: "目前研发对接中",
        description: "2026年总体目标为通过养护专项飞控平台建设，实现巡检任务全流程闭环及病害自动识别，显著提升巡视效率。",
        timeline: [
          { month: "6月", goal: "基础飞控平台建设", tasks: ["航线展示(BIM、倾斜摄影、点云)", "航点跳过与跳转功能"], status: "pending" },
          { month: "7月", goal: "病害识别算法集成", tasks: ["集成病害识别算法", "病害识别平台建设", "航点关联构件"], status: "pending" },
          { month: "8月", goal: "接口与媒体库开发", tasks: ["完成识别平台接口对接", "建设媒体文件库"], status: "pending" },
          { month: "9月", goal: "业务与报告闭环", tasks: ["接收养护系统巡查任务并关联航线", "根据模板自动生成病害报告并对接养护平台"], status: "pending", isMilestone: true }
        ]
      },
      {
        id: "ai",
        title: "施工养护+AI",
        label: "纯自研",
        statusNote: "当前杭州北区域中心已在试用中",
        description: "养护AI排班助手：聚焦日常与专项养护的集约化排班需求，优先优化模型算法，提升资源配置效率与利用率，缩短规划时间并降低成本。",
        timeline: [
          { month: "1月", goal: "MVP试点内测", tasks: ["核心工作流跑通", "用例测试验证", "空间聚合算法梳理"], status: "completed" },
          { month: "2月", goal: "算法模型初建", tasks: ["车道方向约束完善", "Dify封装准备", "算法稳定性测试"], status: "completed" },
          { month: "3月", goal: "产品化评审", tasks: ["3月底原型及PRD评审", "开发排期确认"], status: "completed" },
          { month: "4月", goal: "正式上线", tasks: ["开发收尾", "4月底正式环境发布", "用户操作手册编制"], status: "completed", isMilestone: true },
          { month: "5月", goal: "运维稳定", tasks: ["算法冲突修复", "上虞调研", "参赛/课题材料提交", "全集团封道调研启动"], status: "completed" },
          { month: "6月", goal: "阶段二调研", tasks: ["杭州北连续段落类业务调研", "单点位运行效果评估"], status: "pending" },
          { month: "7月", goal: "方案设计", tasks: ["区间段技术方案评审", "多日滚动约束数学模型建立"], status: "pending" },
          { month: "8月", goal: "系统升级", tasks: ["混合排班引擎开发", "Dify工作流适配", "区间段落类前端设计"], status: "pending" },
          { month: "9月", goal: "内测验证", tasks: ["杭州北阶段二内测", "混合排班稳定性验证", "问题修复"], status: "pending" },
          { month: "10月", goal: "复制筹备", tasks: ["阶段二功能冻结", "选定新增2个项目部", "路段台账与规则初始化"], status: "pending" },
          { month: "11月", goal: "复制部署", tasks: ["新增2个项目部环境部署与试运行", "规则快速配置", "用户培训"], status: "pending" },
          { month: "12月", goal: "复盘优化", tasks: ["新增项目部运行评估", "复制标准化手册编制", "2027规划"], status: "pending" }
        ]
      }
    ]
  }
};
