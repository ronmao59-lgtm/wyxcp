import { describe, expect, it } from "vitest";
import type { DimensionScore } from "./score";
import {
  buildCombinationDiagnosis,
  buildDimensionLayerReport,
  buildFortyEightHourAction,
  buildMinimumComboAdvice,
  buildNextPlaybook,
  buildPositionSentence,
  buildRadarInterpretation,
  buildSixDimensionCards,
  buildSixDimensionReports,
} from "./report-content";

function score(
  key: DimensionScore["key"],
  name: string,
  shortName: string,
  percentage: number,
): DimensionScore {
  return {
    key,
    name,
    shortName,
    score: Math.round((percentage / 100) * 15),
    percentage,
  };
}

const baseScores: DimensionScore[] = [
  score("experience", "经历壁垒", "经历", 70),
  score("scene", "场景壁垒", "场景", 68),
  score("method", "方法壁垒", "方法", 66),
  score("work", "作品壁垒", "作品", 58),
  score("relationship", "关系壁垒", "关系", 63),
  score("style", "风格壁垒", "风格", 61),
];

describe("report content library", () => {
  it("explains balanced radar charts and appends low-dimension guidance", () => {
    const paragraphs = buildRadarInterpretation(baseScores);

    expect(paragraphs[0]).toContain("六项壁垒相对均衡");
    expect(paragraphs.join("\n")).toContain("作品壁垒偏低");
  });

  it("explains obvious advantage angles on radar charts", () => {
    const paragraphs = buildRadarInterpretation([
      score("experience", "经历壁垒", "经历", 88),
      score("scene", "场景壁垒", "场景", 54),
      score("method", "方法壁垒", "方法", 62),
      score("work", "作品壁垒", "作品", 66),
      score("relationship", "关系壁垒", "关系", 64),
      score("style", "风格壁垒", "风格", 61),
    ]);

    expect(paragraphs[0]).toContain("明显优势角");
    expect(paragraphs.join("\n")).toContain("场景壁垒偏低");
  });

  it("returns high, middle, and low dimension reports with concrete actions", () => {
    const reports = buildSixDimensionReports([
      score("experience", "经历壁垒", "经历", 82),
      score("scene", "场景壁垒", "场景", 67),
      score("method", "方法壁垒", "方法", 46),
      score("work", "作品壁垒", "作品", 76),
      score("relationship", "关系壁垒", "关系", 60),
      score("style", "风格壁垒", "风格", 59),
    ]);

    expect(reports.find((item) => item.key === "experience")?.status).toBe("高分");
    expect(reports.find((item) => item.key === "scene")?.status).toBe("中分");
    expect(reports.find((item) => item.key === "method")?.status).toBe("低分");
    expect(reports.find((item) => item.key === "work")?.actions).toContain("做一个小工具Demo。");
  });

  it("builds short dimension cards with judgment, action, and example", () => {
    const cards = buildSixDimensionCards([
      score("experience", "经历壁垒", "经历", 82),
      score("scene", "场景壁垒", "场景", 67),
      score("method", "方法壁垒", "方法", 46),
      score("work", "作品壁垒", "作品", 76),
      score("relationship", "关系壁垒", "关系", 60),
      score("style", "风格壁垒", "风格", 59),
    ]);

    const experience = cards.find((item) => item.key === "experience");
    const method = cards.find((item) => item.key === "method");

    expect(experience?.judgment).toBe("你有故事，但别把它写成简历。");
    expect(experience?.action).toContain("我踩过什么坑");
    expect(experience?.example).toContain("线下课");
    expect(method?.judgment).toContain("每次都靠感觉");
    expect(method?.example).toContain("先问这3个问题");
  });

  it("still builds a dimension-based 48-hour action when total score is below 55", () => {
    const action = buildFortyEightHourAction({
      totalScore: 48,
      scores: baseScores,
    });

    expect(action.notice).toBe("不要再想一周，先做一个别人能看见的小动作。");
    expect(action.highestDimensions[0].key).toBe("experience");
    expect(action.lowestDimension.key).toBe("work");
    expect(action.steps).toHaveLength(4);
  });

  it("groups high, middle, and low dimensions with fallback copy", () => {
    const report = buildDimensionLayerReport([
      score("experience", "经历壁垒", "经历", 82),
      score("scene", "场景壁垒", "场景", 68),
      score("method", "方法壁垒", "方法", 46),
      score("work", "作品壁垒", "作品", 78),
      score("relationship", "关系壁垒", "关系", 61),
      score("style", "风格壁垒", "风格", 55),
    ]);

    expect(report.high.items.map((item) => item.name)).toEqual([
      "经历壁垒",
      "作品壁垒",
    ]);
    expect(report.middle.items.map((item) => item.name)).toEqual([
      "场景壁垒",
      "关系壁垒",
    ]);
    expect(report.low.items.map((item) => item.name)).toEqual([
      "方法壁垒",
      "风格壁垒",
    ]);
    expect(report.high.fallback).toContain("还没有特别突出的单项优势");
    expect(report.low.fallback).toContain("目前没有明显短板");
  });

  it("builds a combination diagnosis from high, middle, and low dimensions", () => {
    const diagnosis = buildCombinationDiagnosis([
      score("style", "风格壁垒", "风格", 86),
      score("relationship", "关系壁垒", "关系", 80),
      score("scene", "场景壁垒", "场景", 68),
      score("experience", "经历壁垒", "经历", 62),
      score("method", "方法壁垒", "方法", 61),
      score("work", "作品壁垒", "作品", 42),
    ]);

    const text = diagnosis.paragraphs.join("\n");

    expect(text).toContain("你的优势入口是：风格壁垒、关系壁垒");
    expect(text).toContain("你的放大区是：场景壁垒、经历壁垒");
    expect(text).toContain("你当前最容易卡住的是：作品壁垒");
    expect(text).toContain("发布一个具体场景下的小作品");
  });

  it("builds 48-hour action from the highest dimension and lowest dimension", () => {
    const action = buildFortyEightHourAction({
      totalScore: 76,
      background: {
        audience: "线下培训老师",
        problem: "不知道怎么把课程产品化",
        strength: "讲课经验和AI工具",
      },
      scores: [
        score("relationship", "关系壁垒", "关系", 84),
        score("work", "作品壁垒", "作品", 40),
        score("scene", "场景壁垒", "场景", 66),
        score("method", "方法壁垒", "方法", 64),
        score("experience", "经历壁垒", "经历", 62),
        score("style", "风格壁垒", "风格", 61),
      ],
    });

    expect(action.notice).toBe("不要再想一周，先做一个别人能看见的小动作。");
    expect(action.title).toBe("先别发大平台，拿一个作品草稿给3个熟人看。");
    expect(action.steps.join("\n")).toContain("先找3个信任你的人");
    expect(action.steps.join("\n")).toContain("把它做成一个能被截图、能被转发的小作品");
    expect(action.steps.join("\n")).toContain("这次只写给线下培训老师看");
    expect(action.steps.join("\n")).toContain("这次只围绕不知道怎么把课程产品化这个问题");
    expect(action.steps).toHaveLength(4);
  });

  it("builds the position sentence from background with natural fallbacks", () => {
    const filled = buildPositionSentence({
      domain: "AI课程",
      audience: "线下培训老师",
      problem: "不知道怎么把课程产品化",
      strength: "讲课经验和AI工具",
    });
    const fallback = buildPositionSentence({});

    expect(filled.lines).toEqual([
      "我不是最懂AI课程的人，",
      "但我可能是更懂线下培训老师在不知道怎么把课程产品化这件事上，",
      "如何用讲课经验和AI工具帮他们走出第一步的人。",
    ]);
    expect(fallback.text).toContain("我不是最懂这个方向的人");
    expect(fallback.text).toContain("但我可能是更懂这类人在这个具体问题上");
    expect(fallback.text).toContain("如何用你的经验和方法帮他们走出第一步的人");
    expect(`${filled.text}\n${fallback.text}`).not.toContain("【");
    expect(`${filled.text}\n${fallback.text}`).not.toContain("____");
  });

  it("builds minimum combo advice from background and the lowest dimension", () => {
    const combo = buildMinimumComboAdvice(
      {
        domain: "AI课程",
        audience: "线下培训老师",
        problem: "不知道怎么把课程产品化",
        strength: "讲课经验和AI工具",
      },
      score("method", "方法壁垒", "方法", 42),
    );

    expect(combo.scene).toBe("先聚焦线下培训老师在不知道怎么把课程产品化上的真实困境。");
    expect(combo.ability).toBe("把你的讲课经验和AI工具和AI课程结合起来，做成一个别人能看懂的解决方案。");
    expect(combo.work).toBe("做一张《3步解决流程图》。");
  });

  it("keeps highest and lowest dimensions separate when every score is tied", () => {
    const action = buildFortyEightHourAction({
      totalScore: 76,
      scores: [
        score("experience", "经历壁垒", "经历", 66),
        score("scene", "场景壁垒", "场景", 66),
        score("method", "方法壁垒", "方法", 66),
        score("work", "作品壁垒", "作品", 66),
        score("relationship", "关系壁垒", "关系", 66),
        score("style", "风格壁垒", "风格", 66),
      ],
    });

    expect(action.highestDimensions.map((item) => item.key)).toEqual([
      "experience",
      "scene",
    ]);
    expect(action.lowestDimension.key).toBe("style");
    expect(action.title).not.toContain("用经历启动，补经历短板");
  });

  it("builds next playbook without mechanical score targets", () => {
    const playbook = buildNextPlaybook([
      score("experience", "经历壁垒", "经历", 82),
      score("work", "作品壁垒", "作品", 79),
      score("scene", "场景壁垒", "场景", 68),
      score("method", "方法壁垒", "方法", 47),
      score("relationship", "关系壁垒", "关系", 58),
      score("style", "风格壁垒", "风格", 62),
    ]);
    const text = [
      playbook.high.text,
      playbook.middle.text,
      playbook.low.text,
    ].join("\n");

    expect(playbook.high.title).toBe("先从这里被看见");
    expect(playbook.high.dimensions.map((item) => item.name)).toEqual([
      "经历壁垒",
      "作品壁垒",
    ]);
    expect(playbook.middle.title).toBe("再把这里说清楚");
    expect(playbook.low.title).toBe("最后先补这个洞");
    expect(text).not.toContain("80% → 85%");
    expect(text).not.toContain("补到85");
    expect(text).not.toContain("高分项");
    expect(text).not.toContain("中分项");
    expect(text).not.toContain("低分项");
    expect(text).toContain("不是完全从0开始");
    expect(text).toContain("拆出一个3步流程");
  });

  it("does not use the same dimension as both market entry and bottleneck", () => {
    const playbook = buildNextPlaybook([
      score("experience", "经历壁垒", "经历", 66),
      score("scene", "场景壁垒", "场景", 66),
      score("method", "方法壁垒", "方法", 66),
      score("work", "作品壁垒", "作品", 66),
      score("relationship", "关系壁垒", "关系", 66),
      score("style", "风格壁垒", "风格", 66),
    ]);
    const entryKeys = playbook.high.dimensions.map((item) => item.key);
    const bottleneckKeys = playbook.low.dimensions.map((item) => item.key);

    expect(entryKeys.some((key) => bottleneckKeys.includes(key))).toBe(false);
  });
});
