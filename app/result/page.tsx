"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { ActionButtons } from "@/components/ActionButtons";
import { RadarChartBlock } from "@/components/RadarChartBlock";
import { ResultCard } from "@/components/ResultCard";
import { ScoreBars } from "@/components/ScoreBars";
import { ShareCard } from "@/components/ShareCard";
import {
  BACKGROUND_STORAGE_KEY,
  parseStoredBackground,
} from "@/lib/background";
import {
  buildFortyEightHourAction,
  buildMinimumComboAdvice,
  buildNextPlaybook,
  buildPositionSentence,
  buildRadarInterpretation,
  buildSixDimensionCards,
} from "@/lib/report-content";
import {
  ANSWERS_STORAGE_KEY,
  calculateResult,
  parseStoredAnswers,
  type AssessmentResult,
} from "@/lib/score";

function buildCopyText(
  result: AssessmentResult,
  background: ReturnType<typeof parseStoredBackground>,
) {
  const action = buildFortyEightHourAction({
    totalScore: result.totalScore,
    scores: result.dimensionScores,
    background,
    resultTypeTitle: result.resultType.title,
  });
  const playbook = buildNextPlaybook(result.dimensionScores);
  const positionSentence = buildPositionSentence(background);
  const minimumCombo = buildMinimumComboAdvice(background, action.lowestDimension);

  return [
    "我的AI一人公司不可替代性测评结果：",
    "",
    `类型：${result.resultType.title}`,
    `总分：${result.totalScore} / 100`,
    `组合成熟度：${result.maturityScore} / 10`,
    `最强壁垒：${result.highestDimensions.map((item) => item.name).join("、")}`,
    `最需要补强：${result.lowestDimension.name}`,
    "",
    "下一步打法：",
    `${playbook.high.title}：${playbook.high.text}`,
    `${playbook.middle.title}：${playbook.middle.text}`,
    `${playbook.low.title}：${playbook.low.text}`,
    "",
    `48小时行动：${action.title}`,
    action.notice,
    ...action.steps.map((item, index) => `${index + 1}. ${item}`),
    action.requirement ? `要求：${action.requirement}` : "",
    "",
    "不可替代性表达句：",
    positionSentence.text,
    "",
    "最小组合建议：",
    `一个小场景：${minimumCombo.scene}`,
    `一个新能力：${minimumCombo.ability}`,
    `一个公开作品：${minimumCombo.work}`,
  ].filter(Boolean).join("\n");
}

export default function ResultPage() {
  const router = useRouter();
  const captureRef = useRef<HTMLDivElement>(null);
  const [answers] = useState<number[] | null>(() => {
    if (typeof window === "undefined") return null;
    return parseStoredAnswers(localStorage.getItem(ANSWERS_STORAGE_KEY));
  });
  const [background] = useState(() => {
    if (typeof window === "undefined") return {};
    return parseStoredBackground(localStorage.getItem(BACKGROUND_STORAGE_KEY));
  });
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!answers) return null;
    return calculateResult(answers);
  }, [answers]);

  const report = useMemo(() => {
    if (!result) return null;
    const action48h = buildFortyEightHourAction({
      totalScore: result.totalScore,
      scores: result.dimensionScores,
      background,
      resultTypeTitle: result.resultType.title,
    });

    return {
      radarInterpretation: buildRadarInterpretation(result.dimensionScores),
      nextPlaybook: buildNextPlaybook(result.dimensionScores),
      dimensionCards: buildSixDimensionCards(result.dimensionScores),
      action48h,
      positionSentence: buildPositionSentence(background),
      minimumCombo: buildMinimumComboAdvice(background, action48h.lowestDimension),
    };
  }, [result, background]);

  async function saveImage() {
    if (!captureRef.current) return;
    setSaving(true);

    try {
      const element = captureRef.current;
      const canvas = await html2canvas(element, {
        backgroundColor: "#08090D",
        scale: Math.min(window.devicePixelRatio || 1, 2),
        useCORS: true,
        allowTaint: false,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      const link = document.createElement("a");
      link.download = "不可替代性测评结果.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setSaving(false);
    }
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(buildCopyText(result, background));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function restart() {
    localStorage.removeItem(ANSWERS_STORAGE_KEY);
    router.push("/");
  }

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#08090D] px-4 py-10 text-[#FFFFFF]">
        <section className="w-full max-w-xl rounded-lg border border-[rgba(255,255,255,0.10)] bg-[#171820] p-6 text-center">
          <h1 className="text-2xl font-semibold">还没有测评结果</h1>
          <p className="mt-4 leading-7 text-[#D6D6DD]">
            请先完成20道题，再查看你的不可替代性诊断结果。
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#E21B2D] px-5 text-sm font-semibold text-[#FFFFFF]"
          >
            <ArrowLeft size={18} />
            返回首页
          </Link>
        </section>
      </main>
    );
  }

  if (!report) return null;

  return (
    <main className="min-h-screen bg-[#08090D] px-4 py-6 text-[#FFFFFF] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1060px]">
        <div ref={captureRef} className="capture-safe space-y-5 bg-[#08090D] pb-5">
          <section className="rounded-lg border border-[rgba(226,27,45,0.35)] bg-[linear-gradient(135deg,rgba(226,27,45,0.18),rgba(23,24,32,0.96)_42%,rgba(8,9,13,1))] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#E21B2D]">
                  AI一人公司不可替代性测评
                </p>
                <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
                  {result.resultType.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#D6D6DD]">
                  你的市场位置，不是靠一句定位写出来的，而是由经历、场景、方法、作品、关系和风格共同叠出来的。
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
                <div className="rounded-md border border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.24)] p-4">
                  <p className="text-xs text-[#B8B8C2]">不可替代性总分</p>
                  <p className="mt-2 text-3xl font-semibold text-[#E21B2D]">
                    {result.totalScore}
                    <span className="text-base text-[#D6D6DD]"> / 100</span>
                  </p>
                </div>
                <div className="rounded-md border border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.24)] p-4">
                  <p className="text-xs text-[#B8B8C2]">组合成熟度</p>
                  <p className="mt-2 text-3xl font-semibold text-[#FFFFFF]">
                    {result.maturityScore}
                    <span className="text-base text-[#D6D6DD]"> / 10</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <ResultCard title="六维雷达图" eyebrow="market radar">
              <RadarChartBlock scores={result.dimensionScores} />
            </ResultCard>

            <ResultCard title="六维得分条" eyebrow="score bars">
              <ScoreBars
                scores={result.dimensionScores}
                lowestKey={result.lowestDimension.key}
              />
              <div className="mt-5 rounded-md border border-[rgba(226,27,45,0.30)] bg-[rgba(226,27,45,0.10)] p-4 text-sm text-[#FFFFFF]">
                当前最需要补强：{result.lowestDimension.name}
              </div>
            </ResultCard>
          </div>

          <ResultCard title="这张雷达图真正说明什么" eyebrow="radar reading">
            <div className="space-y-3">
              {report.radarInterpretation.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </ResultCard>

          <ResultCard title="你的下一步打法" eyebrow="next move">
            <p className="mb-4 text-[#B8B8C2]">
              别平均用力。先用最容易被看见的入口启动，再把最容易卡住的地方补上。
            </p>
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                report.nextPlaybook.high,
                report.nextPlaybook.middle,
                report.nextPlaybook.low,
              ].map((item) => (
                <section
                  key={item.title}
                  className="min-w-0 rounded-md border border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.20)] p-4"
                >
                  <h3 className="text-base font-semibold text-[#FFFFFF]">
                    {item.title}
                  </h3>
                  {item.dimensions.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.dimensions.map((dimension) => (
                        <span
                          key={dimension.key}
                          className="rounded-md bg-[rgba(226,27,45,0.12)] px-2 py-1 text-xs font-semibold text-[#F1C4C9]"
                        >
                          {dimension.shortName} {dimension.percentage}%
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p className="mt-3 break-words">{item.text}</p>
                </section>
              ))}
            </div>
          </ResultCard>

          <ResultCard title="六维短卡片解读" eyebrow="dimension cards">
            <div className="grid gap-4 lg:grid-cols-2">
              {report.dimensionCards.map((item) => (
                <article
                  key={item.key}
                  className="min-w-0 rounded-md border border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.20)] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-[#FFFFFF]">
                      {item.name}
                    </h3>
                    <span className="rounded-md border border-[rgba(226,27,45,0.32)] bg-[rgba(226,27,45,0.10)] px-2.5 py-1 text-xs font-semibold text-[#F1C4C9]">
                      {item.percentage}% · {item.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="break-words text-[#FFFFFF]">{item.judgment}</p>
                    <p className="break-words">
                      <span className="font-semibold text-[#FFFFFF]">动作：</span>
                      {item.action}
                    </p>
                    <p className="break-words text-[#B8B8C2]">
                      <span className="font-semibold text-[#D6D6DD]">示例：</span>
                      {item.example}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </ResultCard>

          <ResultCard title="类型解读" eyebrow="diagnosis">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-md bg-[rgba(0,0,0,0.20)] p-4">
                <p className="font-semibold text-[#FFFFFF]">你现在真正的问题</p>
                <p className="mt-2">{result.resultType.description[0]}</p>
              </div>
              <div className="rounded-md bg-[rgba(0,0,0,0.20)] p-4">
                <p className="font-semibold text-[#FFFFFF]">为什么会这样</p>
                <p className="mt-2">
                  {result.resultType.description[1] ?? result.resultType.description[0]}
                </p>
              </div>
              <div className="rounded-md bg-[rgba(0,0,0,0.20)] p-4">
                <p className="font-semibold text-[#FFFFFF]">下一步该干什么</p>
                <p className="mt-2">{result.resultType.coreAdvice}</p>
              </div>
            </div>
          </ResultCard>

          <ResultCard title="48小时具体行动" eyebrow="action">
            <div className="space-y-4">
              <p className="rounded-md border border-[rgba(226,27,45,0.30)] bg-[rgba(226,27,45,0.10)] p-4 font-semibold text-[#FFFFFF]">
                {report.action48h.notice}
              </p>
              <h3 className="text-xl font-semibold text-[#FFFFFF]">
                {report.action48h.title}
              </h3>
              <ol className="space-y-2 pl-5">
                {report.action48h.steps.map((item) => (
                  <li key={item} className="list-decimal break-words">
                    {item}
                  </li>
                ))}
              </ol>
              {report.action48h.requirement ? (
                <p className="rounded-md bg-[rgba(0,0,0,0.20)] p-4 text-[#FFFFFF]">
                  要求：{report.action48h.requirement}
                </p>
              ) : null}
            </div>
          </ResultCard>

          <div className="grid gap-5 md:grid-cols-2">
            <ResultCard title="你的不可替代性表达句" eyebrow="position sentence">
              <p className="rounded-md border border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.20)] p-4 text-[#FFFFFF]">
                {report.positionSentence.lines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <p className="mt-4">
                这不是最终定位，而是帮你先把市场位置说清楚。
              </p>
              <p className="mt-3 text-sm text-[#B8B8C2]">
                {report.positionSentence.note}
              </p>
            </ResultCard>

            <ResultCard title="你的最小组合建议" eyebrow="minimum combo">
              <div className="space-y-3">
                <p>
                  <span className="font-semibold text-[#FFFFFF]">一个小场景：</span>
                  {report.minimumCombo.scene}
                </p>
                <p>
                  <span className="font-semibold text-[#FFFFFF]">一个新能力：</span>
                  {report.minimumCombo.ability}
                </p>
                <p>
                  <span className="font-semibold text-[#FFFFFF]">一个公开作品：</span>
                  {report.minimumCombo.work}
                </p>
              </div>
            </ResultCard>
          </div>

          <ResultCard title="分享卡" eyebrow="share">
            <ShareCard
              result={result}
              action48h={report.action48h}
              minimumCombo={report.minimumCombo}
              positionSentence={report.positionSentence}
            />
          </ResultCard>

          <div className="flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.10)] bg-[rgba(23,24,32,0.80)] p-4 text-sm text-[#B8B8C2]">
            <ShieldCheck size={17} className="text-[#E21B2D]" />
            AI一人公司不可替代性测评
          </div>
        </div>

        <div className="mt-5">
          <ActionButtons
            onSave={saveImage}
            onCopy={copyResult}
            onRestart={restart}
            saving={saving}
            copied={copied}
          />
        </div>
      </div>
    </main>
  );
}
