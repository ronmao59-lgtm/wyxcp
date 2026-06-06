import type { DimensionKey } from "./quiz-data";

export type ResultTypeId =
  | "combined-barrier"
  | "work-driven"
  | "scene-focus"
  | "method-settled"
  | "relationship-start"
  | "style-recognition"
  | "experience-settled"
  | "minimum-combination";

export type ResultContent = {
  id: ResultTypeId;
  title: string;
  description: string[];
  coreAdvice: string;
  action48h: string[];
  nextStep: string;
  minimumCombo: {
    scene: string;
    ability: string;
    work: string;
  };
};

export const dimensionTypeMap: Record<DimensionKey, ResultTypeId> = {
  experience: "experience-settled",
  scene: "scene-focus",
  method: "method-settled",
  work: "work-driven",
  relationship: "relationship-start",
  style: "style-recognition",
};

export const resultContents: Record<ResultTypeId, ResultContent> = {
  "combined-barrier": {
    id: "combined-barrier",
    title: "已有组合壁垒型",
    description: [
      "你已经不是从0开始的人。",
      "你的经历、作品、关系、方法或风格中，已经有比较明显的市场壁垒。",
      "你现在最重要的不是继续泛泛学习，而是把这些优势组合成一个清晰的市场位置。",
    ],
    coreAdvice: "整理你的不可替代性地图，把经历、场景、方法、作品、关系和风格打包成一个别人容易理解的位置。",
    action48h: ["写出一句内容：", "“我不是最懂这个方向的人，但我可能是更懂这类人在这个具体问题上，如何用你的经验和方法帮他们走出第一步的人。”"],
    nextStep: "个人品牌主页、线下课招募页、案例页、课程页、咨询产品。",
    minimumCombo: {
      scene: "选择你最容易拿出案例的客户场景。",
      ability: "把你已有能力用AI放大。",
      work: "做一张《我的不可替代性地图》或一条案例拆解。",
    },
  },
  "work-driven": {
    id: "work-driven",
    title: "作品驱动型",
    description: [
      "你可能有能力、有经验、有想法，但市场还没有真正看见你。",
      "你现在最大的问题不是不会，而是缺少能证明自己的作品。",
      "没有作品，别人只能听你说；有了作品，别人才能相信你真的做得到。",
    ],
    coreAdvice: "不要继续空想定位，先做一个证明作品。",
    action48h: ["从下面选一个：一张方法图、一条案例拆解、一个智能体原型、一个小工具、一个AIGC样片、一份测评报告、一篇小红书笔记。"],
    nextStep: "作品墙、案例库、样片合集、工具Demo、公开挑战。",
    minimumCombo: {
      scene: "选择一个你最想服务的人群。",
      ability: "把你的经验做成可展示内容。",
      work: "48小时内发布一个案例拆解或方法图。",
    },
  },
  "scene-focus": {
    id: "scene-focus",
    title: "场景聚焦型",
    description: [
      "你可能会很多东西，但现在讲得还太大。",
      "当你的服务对象太模糊，客户就很难知道为什么要找你。",
      "你现在最需要做的，是缩小场景，把“我能帮很多人”改成“我最懂这一类人的这个具体问题”。",
    ],
    coreAdvice: "先不要说“我帮所有人做AI”。请缩小到一个具体场景。",
    action48h: ["补全这句话：", "“我最懂某一类人，在一个具体场景里遇到的一个具体问题。”"],
    nextStep: "细分人群内容系列、场景型小课、行业案例拆解、垂直服务包。",
    minimumCombo: {
      scene: "缩小到一类具体人群。",
      ability: "练习观察他们的真实问题。",
      work: "写一篇《这类人最容易卡住的3个问题》。",
    },
  },
  "method-settled": {
    id: "method-settled",
    title: "方法沉淀型",
    description: [
      "你可能有经验，也能解决问题，但你的经验还没有被整理成可复用的方法。",
      "如果你每次都靠临场发挥，客户就很难感受到你的专业体系。",
      "你现在要把经验沉淀成表格、卡片、流程或模型。",
    ],
    coreAdvice: "给你的方法起一个名字。",
    action48h: ["把你反复解决的一个问题，整理成：3个步骤、5个问题、1张表格，或者1张流程图。"],
    nextStep: "方法卡、流程表、训练营作业表、诊断模型、智能体提示词。",
    minimumCombo: {
      scene: "选择一个你经常被问到的问题。",
      ability: "把经验拆成步骤。",
      work: "做一张3步解决流程图。",
    },
  },
  "relationship-start": {
    id: "relationship-start",
    title: "关系启动型",
    description: [
      "你现在不一定缺能力，可能缺的是第一批反馈和信任关系。",
      "一人公司最早的生意，往往不是来自陌生流量，而是来自已经认识你、信任你的人。",
      "你需要重新激活你的朋友圈、老客户、老同学、老学员或身边资源。",
    ],
    coreAdvice: "先找3-5个熟人做真实反馈，而不是直接面对陌生市场。",
    action48h: ["给3个人发消息：", "“我最近在做一个具体方向的小产品/服务，想请你帮我看一下，你觉得这个方向像不像我？”"],
    nextStep: "种子用户访谈、熟人反馈、老客户回访、线下小局、社群测试。",
    minimumCombo: {
      scene: "选择身边最容易接触的一类人。",
      ability: "练习收集反馈和提炼问题。",
      work: "做一次小范围访谈或反馈记录。",
    },
  },
  "style-recognition": {
    id: "style-recognition",
    title: "风格识别型",
    description: [
      "你可能有内容、有能力，但别人对你的印象还不够清晰。",
      "风格不是装饰，风格是别人识别你的方式。",
      "如果你的表达总是变来变去，用户就很难记住你。",
    ],
    coreAdvice: "确定你的表达风格，并在内容、海报、课程、朋友圈里持续出现。",
    action48h: ["从理性分析型、热血行动型、温和陪伴型、犀利拆解型、专业顾问型、真实接地气型、江湖实战型里选一个主风格，然后写一条符合这个风格的内容。"],
    nextStep: "个人IP内容、口播风格、主页介绍、视觉系统、课程表达方式。",
    minimumCombo: {
      scene: "选择一个你愿意持续表达的话题。",
      ability: "练习稳定输出同一种表达风格。",
      work: "写一条能体现你风格的内容。",
    },
  },
  "experience-settled": {
    id: "experience-settled",
    title: "经历沉淀型",
    description: [
      "你不是没有经历，而是还没有把经历整理成别人能理解的信任资产。",
      "你需要把过去做过的事、踩过的坑、服务过的人、得到过的结果，整理成可表达、可展示、可复用的故事和案例。",
    ],
    coreAdvice: "把经历讲成“我帮别人少走弯路”的资产，而不是流水账。",
    action48h: ["写出你的3段经历：我做过什么？我踩过什么坑？这段经历能帮别人少走什么弯路？"],
    nextStep: "个人故事页、案例复盘、信任背书、课程开场、内容选题。",
    minimumCombo: {
      scene: "选择一段最能证明你的经历。",
      ability: "把经历整理成案例。",
      work: "写一篇《我踩过的一个坑，以及它能帮你少走什么弯路》。",
    },
  },
  "minimum-combination": {
    id: "minimum-combination",
    title: "最小组合养成型",
    description: [
      "你现在可能还没有明显的市场壁垒，但这不是问题。",
      "不可替代性不是一开始就有的，是被作品和反馈养出来的。",
      "你现在最重要的不是包装自己，而是开始做一个最小组合。",
      "最小组合公式：一个小场景 + 一个新能力 + 一个公开作品。",
    ],
    coreAdvice: "先别急着成为专家，先成为某个小问题上最认真记录和解决的人。",
    action48h: ["写下你的最小组合：一个小场景、一个新能力、一个公开作品。"],
    nextStep: "7天公开记录、10个案例挑战、30天作品打卡、学习复盘、最小作品挑战。",
    minimumCombo: {
      scene: "选择一个足够小、你愿意持续记录的问题。",
      ability: "选择一个正在学习的AI能力。",
      work: "做一个7天公开记录或一个小作品挑战。",
    },
  },
};
