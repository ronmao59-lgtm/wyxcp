export type DimensionKey =
  | "experience"
  | "scene"
  | "method"
  | "work"
  | "relationship"
  | "style";

export type Question = {
  id: number;
  text: string;
  dimension: DimensionKey | "maturity";
};

export type Dimension = {
  key: DimensionKey;
  name: string;
  shortName: string;
};

export const dimensions: Dimension[] = [
  { key: "experience", name: "经历壁垒", shortName: "经历" },
  { key: "scene", name: "场景壁垒", shortName: "场景" },
  { key: "method", name: "方法壁垒", shortName: "方法" },
  { key: "work", name: "作品壁垒", shortName: "作品" },
  { key: "relationship", name: "关系壁垒", shortName: "关系" },
  { key: "style", name: "风格壁垒", shortName: "风格" },
];

export const tieBreakPriority: DimensionKey[] = [
  "work",
  "scene",
  "method",
  "relationship",
  "style",
  "experience",
];

export const questions: Question[] = [
  { id: 1, dimension: "experience", text: "我过去有一些真实经历，可以让别人相信我懂这个领域。" },
  { id: 2, dimension: "experience", text: "我踩过一些坑，并能把这些坑讲成对别人有帮助的经验。" },
  { id: 3, dimension: "experience", text: "我能说出自己过去3个比较有代表性的案例。" },
  { id: 4, dimension: "scene", text: "我能具体说出一类我最懂的人，并描述他们正在遇到的3个真实问题。" },
  { id: 5, dimension: "scene", text: "我能说出这个人群正在遇到的具体问题。" },
  { id: 6, dimension: "scene", text: "我知道这个人群为什么会需要我。" },
  { id: 7, dimension: "method", text: "我能把自己解决问题的过程拆成3-5个固定步骤。" },
  { id: 8, dimension: "method", text: "我能把自己的经验整理成表格、卡片、步骤或模型。" },
  { id: 9, dimension: "method", text: "我的方法不是临时发挥，而是可以重复使用。" },
  { id: 10, dimension: "work", text: "我已经有能展示自己能力的作品。" },
  { id: 11, dimension: "work", text: "别人看完我的作品，能大致知道我能帮他做什么。" },
  { id: 12, dimension: "work", text: "我能在48小时内做出一个新的证明作品。" },
  { id: 13, dimension: "relationship", text: "我身边有一批人已经信任我。" },
  { id: 14, dimension: "relationship", text: "我可以找到3-5个人帮我反馈新方向。" },
  { id: 15, dimension: "relationship", text: "我过去的客户、朋友或学员愿意听我介绍新项目。" },
  { id: 16, dimension: "style", text: "如果问身边3个人，他们能说出我内容或表达上的一个明显特点。" },
  { id: 17, dimension: "style", text: "我的内容或表达里，有别人不容易模仿的味道。" },
  { id: 18, dimension: "style", text: "我知道自己更适合用什么方式表达：理性、热血、陪伴、犀利、专业或接地气。" },
  { id: 19, dimension: "maturity", text: "我已经能说出“为什么这个事情由我来做最合适”。" },
  { id: 20, dimension: "maturity", text: "如果别人遇到某个具体问题，有可能第一时间想到我。" },
];
