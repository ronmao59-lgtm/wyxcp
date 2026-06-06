import type { DimensionKey } from "./quiz-data";
import type { DimensionScore } from "./score";

type DimensionBand = "高分" | "中分" | "低分";

export type DimensionReport = {
  key: DimensionKey;
  name: string;
  percentage: number;
  status: DimensionBand;
  meaning: string;
  actions: string[];
};

export type DimensionShortCard = {
  key: DimensionKey;
  name: string;
  percentage: number;
  status: DimensionBand;
  judgment: string;
  action: string;
  example: string;
};

export type DimensionLayerItem = {
  key: DimensionKey;
  name: string;
  percentage: number;
  text: string;
};

export type DimensionLayerGroup = {
  title: string;
  description: string;
  fallback: string;
  items: DimensionLayerItem[];
};

export type DimensionLayerReport = {
  high: DimensionLayerGroup;
  middle: DimensionLayerGroup;
  low: DimensionLayerGroup;
};

export type CombinationDiagnosis = {
  advantageDimensions: DimensionScore[];
  amplifierDimensions: DimensionScore[];
  bottleneckDimension: DimensionScore;
  paragraphs: string[];
};

export type FortyEightHourAction = {
  notice: string;
  title: string;
  steps: string[];
  highestDimensions: DimensionScore[];
  lowestDimension: DimensionScore;
  requirement?: string;
};

export type UserBackground = {
  domain?: string;
  audience?: string;
  problem?: string;
  strength?: string;
};

type NormalizedBackground = {
  domain: string;
  audience: string;
  problem: string;
  strength: string;
  hasDomain: boolean;
  hasAudience: boolean;
  hasProblem: boolean;
  hasStrength: boolean;
};

export type PositionSentence = {
  lines: [string, string, string];
  text: string;
  note: string;
};

export type MinimumComboAdvice = {
  scene: string;
  ability: string;
  work: string;
};

export type NextPlaybook = {
  high: {
    title: string;
    dimensions: DimensionScore[];
    text: string;
  };
  middle: {
    title: string;
    dimensions: DimensionScore[];
    text: string;
  };
  low: {
    title: string;
    dimensions: DimensionScore[];
    text: string;
  };
};

type DimensionReportContent = {
  high: string;
  middle: string;
  low: string;
  actions: string[];
};

type DimensionShortCardContent = {
  high: Pick<DimensionShortCard, "judgment" | "action" | "example">;
  middle: Pick<DimensionShortCard, "judgment" | "action" | "example">;
  low: Pick<DimensionShortCard, "judgment" | "action" | "example">;
};

const lowRadarGuidance: Record<DimensionKey, string> = {
  work:
    "你的作品壁垒偏低，说明别人现在可能还看不见你能交付什么。接下来最重要的不是继续想定位，而是先做一个证明作品。作品可以很小，但必须能被截图、被转发、被别人一眼看懂。",
  scene:
    "你的场景壁垒偏低，说明你现在的表达可能还太泛。你需要缩小服务对象，不要说“我帮所有人”，而要说清楚“我最懂哪一类人在什么场景下的什么问题”。",
  method:
    "你的方法壁垒偏低，说明你的经验还没有被整理成稳定流程。你可能会解决问题，但别人感受不到你的体系。接下来要把经验变成步骤、表格、卡片或流程图。",
  relationship:
    "你的关系壁垒偏低，说明你还缺少第一批真实反馈。不要一开始就面对陌生市场，先找3—5个熟人、老客户、朋友或同频人验证方向。",
  style:
    "你的风格壁垒偏低，说明别人对你的印象还不够稳定。接下来要确定你更适合用什么方式表达：理性分析、热血行动、温和陪伴、犀利拆解、专业顾问，还是真实接地气。",
  experience:
    "你的经历壁垒偏低，不代表你没有经历，而是你还没有把经历整理成可信故事。你需要把过去做过的事、踩过的坑、服务过的人，变成可以表达的案例。",
};

const dimensionReportContent: Record<DimensionKey, DimensionReportContent> = {
  experience: {
    high:
      "你的经历已经可以成为信任入口。别人不一定先买你的方法，但会先相信一个真正经历过的人。你接下来要做的，是把经历讲成案例，而不是把经历写成履历。",
    middle:
      "你有经历，但还没有变成稳定信任。你需要把经历从“我做过什么”改写成“这段经历能帮别人少走什么弯路”。",
    low:
      "你不是没有经历，而是还没有把经历变成信任资产。先从一个真实小案例开始，不要写人生传记。",
    actions: [
      "写出3段代表经历。",
      "每段经历都回答：我做过什么、遇到什么问题、得到什么经验。",
      "选一段经历写成小红书/朋友圈内容。",
      "把经历和你想服务的人群连接起来。",
    ],
  },
  scene: {
    high:
      "你对某类人或某个场景已经有感觉。你的市场入口不是“我什么都能做”，而是“我特别懂这类人在这个问题上的卡点”。",
    middle:
      "你大概知道自己服务谁，但还不够锋利。你需要继续缩小到一个具体人群、具体场景、具体问题。",
    low:
      "你现在说得太泛了。泛的结果是：谁都像客户，但谁都不会立刻找你。先只选一类人。",
    actions: [
      "不要写“普通人”，写具体人群。",
      "不要写“做AI”，写具体问题。",
      "用这句话练习：我最懂某一类人，在一个具体场景里遇到的一个具体问题。",
      "写出这个人群最常见的10个问题。",
    ],
  },
  method: {
    high:
      "你已经有结构化解决问题的能力。你的市场入口可以是一套方法、一张表、一张图、一个流程，甚至一个智能体。",
    middle:
      "你有一些解决问题的思路，但还没完全固定下来。你需要把经验拆成步骤，做成别人能看懂的流程。",
    low:
      "你现在可能每次都靠感觉解决问题。靠感觉不是不行，但别人很难为“感觉”付费。你要先拆出3步。",
    actions: [
      "选一个你经常解决的问题。",
      "把解决过程拆成3—5步。",
      "给这个流程起一个名字。",
      "做成一张方法图。",
      "后续可以把它做成智能体提示词。",
    ],
  },
  work: {
    high:
      "你已经有能被看见的证据。你的市场入口不是讲道理，而是让别人先看到作品，再理解你的能力。",
    middle:
      "你有一些作品，但作品还没有完全变成信任证据。你需要给作品补上目标、过程、结果和适合谁。",
    low:
      "你现在最缺的不是想法，是证据。别人不能只靠你说“我会”就相信你。先做一个能被看见的小作品。",
    actions: [
      "做一张方法图。",
      "做一条案例拆解。",
      "做一个小工具Demo。",
      "做一个智能体原型。",
      "做一个AIGC样片。",
      "做一份测评报告。",
      "做一篇小红书笔记。",
      "做一个前后对比案例。",
    ],
  },
  relationship: {
    high:
      "你已经有一批可以先启动的人。你的市场入口不一定是陌生流量，而是熟人反馈、老客户、老学员、社群和同城资源。",
    middle:
      "你身边有一些关系，但还没有被激活。你需要重新告诉他们：你现在在做什么，能帮谁解决什么问题。",
    low:
      "你现在缺第一批真实反馈。不要一开始就面对陌生市场，先找3个人问方向。",
    actions: [
      "找3个熟人问方向反馈。",
      "找1个朋友免费试做一次。",
      "发一条朋友圈说明你正在做的新方向。",
      "组织一个小范围线上/线下交流。",
      "给老客户或老学员发一条近况消息。",
    ],
  },
  style: {
    high:
      "你已经有一定个人味道。你的市场入口可以是表达风格、内容气质、审美方式或个人叙事。别人记住你的方式，可能不是知识点，而是你的味道。",
    middle:
      "你有一点特点，但还不稳定。你需要选择一种主表达风格，并连续输出，让别人形成印象。",
    low:
      "你的表达现在可能太安全了。安全不会出错，但也不容易被记住。你要让内容带一点你的性格。",
    actions: [
      "选一个主风格：理性分析、热血行动、温和陪伴、犀利拆解、专业顾问、真实接地气、江湖实战。",
      "用这个风格写3条内容。",
      "统一你的标题、封面、开头方式。",
      "找3个人问：你觉得我说话最明显的特点是什么？",
    ],
  },
};

const dimensionShortCardContent: Record<DimensionKey, DimensionShortCardContent> = {
  experience: {
    high: {
      judgment: "你有故事，但别把它写成简历。",
      action:
        "选一段最能证明你的经历，写成“我踩过什么坑，后来怎么解决，它能帮谁少走弯路”。",
      example: "《我以前做线下课踩过的一个坑，现在看，它能帮培训老师少走弯路》",
    },
    middle: {
      judgment: "你有经历，但还没讲到别人心里。",
      action:
        "别只写“我做过什么”，加一句“这件事能帮别人避开什么问题”。",
      example: "从“我做过很多活动”改成“我知道线下活动最容易死在哪一步”。",
    },
    low: {
      judgment: "你不是没经历，是没把经历拎出来。",
      action: "先写一个100字小案例：背景、问题、动作、结果、提醒。",
      example: "《我最近解决过的一个小问题》",
    },
  },
  scene: {
    high: {
      judgment: "你已经知道自己更懂哪类人了。",
      action:
        "继续往下切，不要只说人群，要说“这个人群在什么场景里卡住”。",
      example: "不是“我帮创业者”，而是“我帮线下课老师把课程变成AI产品”。",
    },
    middle: {
      judgment: "你有方向，但还不够窄。",
      action: "把“普通人、老板、创业者”换成一个具体人群。",
      example:
        "把“我帮普通人用AI”改成“我帮有经验但不会产品化的人用AI做第一个产品”。",
    },
    low: {
      judgment: "你现在说得太大了，所以没人觉得你在说他。",
      action: "今天只选一类人，不许写“所有人”。",
      example: "只写“线下培训老师”，不要写“所有想赚钱的人”。",
    },
  },
  method: {
    high: {
      judgment: "你已经有方法感了，别只放在嘴里。",
      action: "把一个方法做成图、表、卡片或智能体。",
      example: "《3步把经验变成产品》",
    },
    middle: {
      judgment: "你能讲出思路，但还不够像一个可交付的流程。",
      action: "选一个问题，写成第一步、第二步、第三步。",
      example: "“找方向 → 做作品 → 找3个人反馈”。",
    },
    low: {
      judgment: "你现在可能每次都靠感觉，别人很难为感觉付费。",
      action: "把你最常给别人的建议整理成3条。",
      example: "《如果你不知道自己适合做什么，先问这3个问题》",
    },
  },
  work: {
    high: {
      judgment: "你已经有证据了，别让作品散着。",
      action: "挑3个最能代表你的作品，做成作品墙。",
      example: "测评工具、课程PPT、AIGC样片。",
    },
    middle: {
      judgment: "你有作品，但别人不一定知道它证明了什么。",
      action: "给每个作品补上：目标、过程、结果、适合谁。",
      example: "这不是一张图，这是我帮客户梳理方向的方法。",
    },
    low: {
      judgment: "你现在最缺的不是想法，是证据。",
      action: "48小时内做一个能被截图、能被转发的小作品。",
      example: "一张方法图、一条案例拆解、一个小工具Demo、一篇小红书笔记。",
    },
  },
  relationship: {
    high: {
      judgment: "你身边已经有人信你，别一上来就追陌生流量。",
      action: "先找5个熟人看你的新方向。",
      example: "“我最近在做这个方向，你觉得像不像我？”",
    },
    middle: {
      judgment: "你有人脉，但别人不知道你现在在做什么。",
      action: "发一条朋友圈，重新介绍你的新方向。",
      example: "“我最近开始做AI一人公司测评，想找3个人聊聊。”",
    },
    low: {
      judgment: "你现在缺第一批真实反馈。",
      action: "找3个人问，不要自己闷头想。",
      example: "“如果你遇到这个问题，会不会想到我？”",
    },
  },
  style: {
    high: {
      judgment: "你已经有味道了，别今天学这个，明天学那个。",
      action: "固定一种语气，连续写7条。",
      example: "热血行动型、真实接地气型、专业顾问型。",
    },
    middle: {
      judgment: "你有特点，但还不够稳定。",
      action: "选一个主风格，接下来10条内容都用这个风格。",
      example: "都用“实战拆解”的口吻写。",
    },
    low: {
      judgment: "你的表达太安全了，安全就不容易被记住。",
      action: "用你平时真实说话的方式写一条，不要写得像通知。",
      example:
        "“我发现很多人不是没能力，是一直没拿出一个能被看见的东西。”",
    },
  },
};

function getBand(percentage: number): DimensionBand {
  if (percentage >= 75) return "高分";
  if (percentage >= 60) return "中分";
  return "低分";
}

function sortByPercentageDesc(scores: DimensionScore[]): DimensionScore[] {
  return [...scores].sort((a, b) => b.percentage - a.percentage);
}

function getLowestScore(scores: DimensionScore[]): DimensionScore {
  return [...scores].sort((a, b) => a.percentage - b.percentage)[0];
}

function cleanBackgroundValue(value: string | undefined): string {
  return value?.trim().replace(/\s+/g, " ") ?? "";
}

function normalizeBackground(background: UserBackground = {}): NormalizedBackground {
  const domain = cleanBackgroundValue(background.domain);
  const audience = cleanBackgroundValue(background.audience);
  const problem = cleanBackgroundValue(background.problem);
  const strength = cleanBackgroundValue(background.strength);

  return {
    domain: domain || "这个方向",
    audience: audience || "这类人",
    problem: problem || "这个具体问题",
    strength: strength || "你的经验和方法",
    hasDomain: Boolean(domain),
    hasAudience: Boolean(audience),
    hasProblem: Boolean(problem),
    hasStrength: Boolean(strength),
  };
}

function selectActionDimensions(scores: DimensionScore[]): {
  highestDimensions: DimensionScore[];
  lowestDimension: DimensionScore;
} {
  const sortedDesc = sortByPercentageDesc(scores);
  const percentages = scores.map((score) => score.percentage);
  const allTied = percentages.every((percentage) => percentage === percentages[0]);

  if (allTied) {
    return {
      highestDimensions: sortedDesc.slice(0, 2),
      lowestDimension: sortedDesc[sortedDesc.length - 1],
    };
  }

  const lowestDimension = getLowestScore(scores);
  const highestDimensions = sortedDesc
    .filter((score) => score.key !== lowestDimension.key)
    .slice(0, 2);

  return {
    highestDimensions,
    lowestDimension,
  };
}

function getActionStartText(score: DimensionScore): string {
  const map: Record<DimensionKey, string> = {
    experience: "先从你最真实的一段经历切入。",
    scene: "先从你最懂的那类人和那个场景切入。",
    method: "先从你已经有感觉的一套方法切入。",
    work: "先从你已有的一个作品切入。",
    relationship: "先找3个信任你的人切入。",
    style: "先从你最自然的表达风格切入。",
  };

  return map[score.key];
}

function getActionRepairText(score: DimensionScore): string {
  const map: Record<DimensionKey, string> = {
    experience: "把这个动作写成一个100字小案例，让别人知道你真的处理过问题。",
    scene: "把服务对象缩小到一类人，不要写给所有人。",
    method: "把解决过程拆成3步，让别人看到你不是靠感觉。",
    work: "把它做成一个能被截图、能被转发的小作品。",
    relationship: "发给3个熟人，问他们看不看得懂、像不像你、有没有人会需要。",
    style: "用你平时真实说话的方式写出来，不要写得像报告。",
  };

  return map[score.key];
}

function buildBackgroundActionStep(background: NormalizedBackground): string {
  const parts: string[] = [];

  if (background.hasAudience) {
    parts.push(`这次只写给${background.audience}看。`);
  }
  if (background.hasProblem) {
    parts.push(`这次只围绕${background.problem}这个问题。`);
  }
  if (background.hasStrength) {
    parts.push(`尽量用${background.strength}作为你的切入点。`);
  }

  return parts.length > 0
    ? parts.join("")
    : "这次先选一个你最容易接触的人群和一个具体问题，别写给所有人。";
}

function getActionTitle(highest: DimensionScore, lowest: DimensionScore): string {
  const titleMap: Partial<Record<string, string>> = {
    experience_method: "把一段真实经历，拆成一个3步方法。",
    experience_work: "把一段经历做成一个能被看见的小案例。",
    experience_scene: "把你的经历写给一类具体的人看。",
    experience_relationship: "把你的经历发给3个熟人，看他们是否能理解你的新方向。",
    experience_style: "用你自己的语气，把一段经历讲得像你本人。",
    scene_work: "围绕你最懂的那类人，做一个最小证明作品。",
    scene_method: "把这个场景里的一个问题，拆成3步解决法。",
    scene_relationship: "找3个符合这个场景的人聊一聊。",
    scene_style: "用你的真实语气，写给这个具体人群。",
    method_work: "把你的方法做成一张图或一个小工具。",
    method_scene: "给你的方法找一个更具体的使用人群。",
    method_relationship: "把你的方法图发给3个人看反馈。",
    method_style: "用更像你的语言解释这个方法，不要写得像教材。",
    work_scene: "拿一个作品，重新写清楚它适合谁。",
    work_method: "从一个作品里拆出你的固定步骤。",
    work_relationship: "拿一个作品发给3个熟人，看他们是否理解价值。",
    work_style: "给作品补一段你的个人解释，告诉别人你为什么这样做。",
    relationship_work: "先别发大平台，拿一个作品草稿给3个熟人看。",
    relationship_scene: "问3个熟人：我最适合帮哪类人解决什么问题？",
    relationship_method: "把你常给熟人的建议整理成3步。",
    relationship_style: "给熟人发一段真实表达，问他们像不像你。",
    style_work: "用你最自然的表达，做一个可见的小作品。",
    style_scene: "用你的风格，只写给一类具体人。",
    style_method: "把你的表达拆成一个简单方法。",
    style_relationship: "发一条最像你的内容，找3个人反馈。",
  };

  return (
    titleMap[`${highest.key}_${lowest.key}`] ??
    "先用你最容易被看见的入口，做一个最小验证动作。"
  );
}

function getPublicWorkAdvice(score: DimensionScore): string {
  const map: Record<DimensionKey, string> = {
    experience: "写一篇《我踩过的一个坑，以及它能帮谁少走弯路》。",
    scene: "写一篇《我最想服务的这类人，最常卡住的5个问题》。",
    method: "做一张《3步解决流程图》。",
    work: "做一个能被截图、能被转发的小作品，比如方法图、案例拆解、小工具Demo、AIGC样片、测评报告或小红书笔记。",
    relationship: "找3个熟人看你的方向和作品草稿，并记录他们的反馈。",
    style: "用你最真实的说话方式写一条内容，不要写得像通知。",
  };

  return map[score.key];
}

export function buildPositionSentence(
  background: UserBackground = {},
): PositionSentence {
  const normalized = normalizeBackground(background);
  const problemPhrase = normalized.hasProblem
    ? `${normalized.problem}这件事上`
    : `${normalized.problem}上`;
  const lines: [string, string, string] = [
    `我不是最懂${normalized.domain}的人，`,
    `但我可能是更懂${normalized.audience}在${problemPhrase}，`,
    `如何用${normalized.strength}帮他们走出第一步的人。`,
  ];

  return {
    lines,
    text: lines.join("\n"),
    note: "如果你想让这句话更准，可以回到开头补充你的领域、人群、问题和能力。",
  };
}

export function buildMinimumComboAdvice(
  background: UserBackground = {},
  lowestDimension: DimensionScore,
): MinimumComboAdvice {
  const normalized = normalizeBackground(background);
  const scene =
    normalized.hasAudience && normalized.hasProblem
      ? `先聚焦${normalized.audience}在${normalized.problem}上的真实困境。`
      : normalized.hasAudience
        ? `先聚焦${normalized.audience}最常遇到的一个具体问题。`
        : normalized.hasProblem
          ? `先聚焦正在被${normalized.problem}卡住的那类人。`
          : "先选择一个你最容易观察、最容易接触、最容易拿到反馈的小场景。";

  const ability =
    normalized.hasStrength && normalized.hasDomain
      ? `把你的${normalized.strength}和${normalized.domain}结合起来，做成一个别人能看懂的解决方案。`
      : normalized.hasStrength
        ? `先把你的${normalized.strength}整理成一个可重复的小方法。`
        : normalized.hasDomain
          ? `围绕${normalized.domain}练习一个可展示的小能力。`
          : "先选择一个你正在学习、并愿意连续公开记录的新能力。";

  return {
    scene,
    ability,
    work: getPublicWorkAdvice(lowestDimension),
  };
}

function getLayerText(score: DimensionScore): string {
  const content = dimensionReportContent[score.key];
  const band = getBand(score.percentage);
  if (band === "高分") return content.high;
  if (band === "中分") return content.middle;
  return content.low;
}

function buildLayerGroup(
  scores: DimensionScore[],
  band: DimensionBand,
  title: string,
  description: string,
  fallback: string,
): DimensionLayerGroup {
  const items = scores
    .filter((score) => getBand(score.percentage) === band)
    .map((score) => ({
      key: score.key,
      name: score.name,
      percentage: score.percentage,
      text: getLayerText(score),
    }));

  return {
    title,
    description,
    fallback,
    items,
  };
}

function joinDimensionNames(scores: Array<Pick<DimensionScore, "name">>): string {
  return scores.length > 0
    ? scores.map((score) => score.name).join("、")
    : "暂时没有明显维度";
}

function buildAdvantageEntryText(scores: DimensionScore[]): string {
  const keys = scores.map((score) => score.key).sort().join("_");
  if (keys === "relationship_style") {
    return "熟人圈和内容表达开始，让别人重新知道你在做什么";
  }

  const first = scores[0];
  if (!first) return "一个最小作品开始，而不是从零包装自己";

  const map: Record<DimensionKey, string> = {
    experience: "真实经历和案例故事",
    scene: "你最懂的具体人群和具体场景",
    method: "可展示的方法、流程或工具",
    work: "已经能被别人看见的作品证据",
    relationship: "熟人反馈、老客户和种子用户",
    style: "你的表达风格和个人味道",
  };

  return map[first.key];
}

function buildBottleneckText(score: DimensionScore): string {
  const map: Record<DimensionKey, string> = {
    experience: "别人还不知道为什么该信你，你需要把经历变成案例，而不是只说自己做过什么",
    scene: "你说得太泛，别人很难判断自己是不是你的客户",
    method: "别人听得到你的想法，但看不到稳定流程，很难判断你能不能持续交付",
    work: "问题不是你不会，而是别人还没看到证据",
    relationship: "你缺少第一批真实反馈，容易一个人在脑子里打磨太久",
    style: "别人可能看懂了内容，但记不住这是你说的",
  };

  return map[score.key];
}

function getShortCardContent(
  key: DimensionKey,
  status: DimensionBand,
): Pick<DimensionShortCard, "judgment" | "action" | "example"> {
  const content = dimensionShortCardContent[key];
  if (status === "高分") return content.high;
  if (status === "中分") return content.middle;
  return content.low;
}

function buildHighPlaybookText(dimensions: DimensionScore[]): string {
  if (dimensions.length === 0) {
    return "现在还没有特别突出的入口。别急着包装自己，先用一个最小作品把能力露出来。";
  }

  const names = dimensions.map((item) => item.shortName).join("、");
  const entryCopy: Record<DimensionKey, string> = {
    experience: "你的真实经历可以先拿来建立信任。",
    scene: "你对某类人或某个场景的理解，可以先拿来做内容入口。",
    method: "你的方法感可以先做成一张图、一张表或一个小工具。",
    work: "你已有的作品可以先作为最直接的证据。",
    relationship: "你身边已经信任你的人，可以先成为第一批反馈来源。",
    style: "你的表达味道可以先成为别人记住你的理由。",
  };
  const detail = dimensions.map((item) => entryCopy[item.key]).join(" ");

  return `你现在最容易被市场看见的入口是：${names}。这说明你不是完全从0开始。${detail} 接下来要把它放到你的主页、内容、作品和自我介绍里，而不是藏在测评报告里。`;
}

function buildMiddlePlaybookText(dimensions: DimensionScore[]): string {
  if (dimensions.length === 0) {
    return "你现在没有特别明显的过渡区。先不用纠结，直接用最强的入口启动，再补最短的那块。";
  }

  const names = dimensions.map((item) => item.shortName).join("、");
  const pushCopy: Record<DimensionKey, string> = {
    experience: "你有经历，但还要把它讲到别人心里：别只说做过什么，要说它能帮别人避开什么问题。",
    scene: "你已经有方向感，但还要说得更窄。不要说“我帮普通人”，要说“我帮哪类人在什么场景里解决什么问题”。",
    method: "你已经有思路，但还要变成别人看得懂的步骤。",
    work: "你已经做过一些东西，但要让别人看懂它到底证明了什么。",
    relationship: "你身边有人，但还要重新告诉他们：你现在在做什么，能帮谁解决什么问题。",
    style: "你有一点特点，但还要固定一种语气，连续输出，让别人形成印象。",
  };
  const detail = dimensions.map((item) => pushCopy[item.key]).join(" ");

  return `你已经有一点基础，但还不够清楚的是：${names}。这部分不是问题，只是还需要往前推一把。${detail}`;
}

function buildLowPlaybookText(dimensions: DimensionScore[]): string {
  if (dimensions.length === 0) {
    return "你现在没有明显短板。重点不是补短板，而是选一个最容易被看见的入口，把它变成作品证据和市场表达。";
  }

  const lowest = dimensions[0];
  const map: Record<DimensionKey, string> = {
    experience: "先别写大故事，写一个100字小案例，让别人知道你真的处理过问题。",
    scene: "先别说服务所有人，只选一类人，写清楚他们最常卡住的问题。",
    method: "先别靠感觉讲，拆出一个3步流程，让别人看到你怎么解决问题。",
    work: "先别继续讲想法，做一个能被截图、能被转发的小作品。",
    relationship: "先别追陌生流量，找3个熟人问方向反馈。",
    style: "先别写得太安全，用你真实说话的方式写一条内容。",
  };

  return `你现在最容易卡住的是：${lowest.shortName}。这不是让你焦虑，而是告诉你下一步最值得先补哪里。${map[lowest.key]}`;
}

function buildEntryDimensions(scores: DimensionScore[]): DimensionScore[] {
  const sorted = sortByPercentageDesc(scores);
  const lowest = getLowestScore(scores);
  const withoutLowest = sorted.filter((score) => score.key !== lowest.key);
  const candidates = withoutLowest.length > 0 ? withoutLowest : sorted;

  return candidates.slice(0, 2);
}

export function buildRadarInterpretation(scores: DimensionScore[]): string[] {
  const percentages = scores.map((item) => item.percentage);
  const max = Math.max(...percentages);
  const min = Math.min(...percentages);
  const spread = max - min;

  const paragraphs = [
    spread < 20
      ? "你的六项壁垒相对均衡，说明你不是单点特别突出，而是各方面都有一定基础。接下来不要平均用力，而要选一个最容易被市场看见的维度先打穿。通常建议优先做作品壁垒，因为作品最容易让别人快速理解你的价值。"
      : spread >= 25
        ? "你的雷达图已经出现明显优势角，说明你有一个可以优先放大的壁垒。接下来不要先补所有短板，而是先把最高维度变成市场表达。比如最高是经历，就把经历写成案例；最高是风格，就把风格变成稳定内容；最高是关系，就先从熟人反馈和种子用户启动。"
        : "你的雷达图有一定起伏，但还没有形成绝对单点优势。现在要做的是一边保住高分维度，一边优先补最影响市场看见度的低分维度。",
  ];

  scores
    .filter((item) => item.percentage < 60)
    .forEach((item) => {
      paragraphs.push(lowRadarGuidance[item.key]);
    });

  return paragraphs;
}

export function buildDimensionLayerReport(
  scores: DimensionScore[],
): DimensionLayerReport {
  return {
    high: buildLayerGroup(
      scores,
      "高分",
      "高分维度",
      "你现在最容易被市场看见的入口",
      "你现在还没有特别突出的单项优势，这不是坏事。说明你还在积累期，先不要急着包装自己，先选一个最小组合开始做作品。",
    ),
    middle: buildLayerGroup(
      scores,
      "中分",
      "中分维度",
      "你最容易继续放大的能力区",
      "你的能力分布比较两极，要么已经很强，要么还明显不足。接下来不要平均用力，先用高分维度启动，再补最低的那一项。",
    ),
    low: buildLayerGroup(
      scores,
      "低分",
      "你当前最容易卡住的位置",
      "需要优先看见但不必被它定义的卡点",
      "你目前没有明显短板，说明基础比较均衡。接下来重点不是补短板，而是选择一个高分维度，把它变成市场表达和作品证据。",
    ),
  };
}

export function buildSixDimensionReports(
  scores: DimensionScore[],
): DimensionReport[] {
  return scores.map((score) => {
    const status = getBand(score.percentage);
    const content = dimensionReportContent[score.key];
    const meaning =
      status === "高分" ? content.high : status === "中分" ? content.middle : content.low;

    return {
      key: score.key,
      name: score.name,
      percentage: score.percentage,
      status,
      meaning,
      actions: content.actions,
    };
  });
}

export function buildSixDimensionCards(
  scores: DimensionScore[],
): DimensionShortCard[] {
  return scores.map((score) => {
    const status = getBand(score.percentage);
    const content = getShortCardContent(score.key, status);

    return {
      key: score.key,
      name: score.name,
      percentage: score.percentage,
      status,
      ...content,
    };
  });
}

export function buildNextPlaybook(scores: DimensionScore[]): NextPlaybook {
  const entryDimensions = buildEntryDimensions(scores);
  const middleDimensions = sortByPercentageDesc(
    scores.filter(
      (score) =>
        getBand(score.percentage) === "中分" &&
        !entryDimensions.some((entry) => entry.key === score.key),
    ),
  ).slice(0, 2);
  const lowDimensions = [getLowestScore(scores)];

  return {
    high: {
      title: "先从这里被看见",
      dimensions: entryDimensions,
      text: buildHighPlaybookText(entryDimensions),
    },
    middle: {
      title: "再把这里说清楚",
      dimensions: middleDimensions,
      text: buildMiddlePlaybookText(middleDimensions),
    },
    low: {
      title: "最后先补这个洞",
      dimensions: lowDimensions,
      text: buildLowPlaybookText(lowDimensions),
    },
  };
}

export function buildCombinationDiagnosis(
  scores: DimensionScore[],
): CombinationDiagnosis {
  const sortedScores = sortByPercentageDesc(scores);
  const advantageDimensions = sortedScores.slice(0, 2);
  const amplifierDimensions = scores
    .filter((score) => getBand(score.percentage) === "中分")
    .slice(0, 2);
  const bottleneckDimension = getLowestScore(scores);
  const firstAdvantage = advantageDimensions[0] ?? bottleneckDimension;
  const firstAmplifier = amplifierDimensions[0] ?? sortedScores[2] ?? firstAdvantage;

  const paragraphs = [
    `你的优势入口是：${joinDimensionNames(advantageDimensions)}。这说明你现在最适合先从${buildAdvantageEntryText(advantageDimensions)}切入，而不是从零开始包装自己。`,
    amplifierDimensions.length > 0
      ? `你的放大区是：${joinDimensionNames(amplifierDimensions)}。这些不是短板，而是可以通过作品、内容或反馈快速补上的部分。`
      : "你现在没有明显中分维度，能力分布比较两极。接下来不要平均用力，先用高分维度启动，再补最低的那一项。",
    `你当前最容易卡住的是：${bottleneckDimension.name}。这会导致${buildBottleneckText(bottleneckDimension)}。`,
    `所以你的下一步不是平均补六项，而是：先用${firstAdvantage.name}打开市场感知，再用${firstAmplifier.name}放大可信度，最后集中补${bottleneckDimension.name}。`,
  ];

  if (
    advantageDimensions.some((item) => item.key === "style") &&
    advantageDimensions.some((item) => item.key === "relationship") &&
    amplifierDimensions.some((item) => item.key === "scene") &&
    bottleneckDimension.key === "work"
  ) {
    paragraphs.push(
      "换成人话说：你不是没有吸引力，也不是完全没人信任你。你现在适合先从熟人圈和内容表达开始，让别人重新知道你在做什么；再把场景说得更具体；最后发布一个具体场景下的小作品。",
    );
  }

  return {
    advantageDimensions,
    amplifierDimensions,
    bottleneckDimension,
    paragraphs,
  };
}

export function buildFortyEightHourAction(input: {
  totalScore: number;
  scores: DimensionScore[];
  background?: UserBackground;
  resultTypeTitle?: string;
}): FortyEightHourAction {
  const { highestDimensions, lowestDimension } = selectActionDimensions(input.scores);
  const highest = highestDimensions[0] ?? input.scores[0];
  const normalized = normalizeBackground(input.background);

  return {
    notice: "不要再想一周，先做一个别人能看见的小动作。",
    title: getActionTitle(highest, lowestDimension),
    highestDimensions,
    lowestDimension,
    steps: [
      getActionStartText(highest),
      getActionRepairText(lowestDimension),
      buildBackgroundActionStep(normalized),
      "发出去后，不要问“好不好”，只问三个问题：1. 你看得懂我在解决什么问题吗？2. 这像不像我适合做的事？3. 你觉得谁会需要这个？",
    ],
    requirement: input.resultTypeTitle
      ? `按你现在的「${input.resultTypeTitle}」状态，先完成这个最小动作，再根据反馈调整。`
      : undefined,
  };
}
