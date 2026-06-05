"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { ArrowLeft, Gauge, ShieldCheck, TrendingUp } from "lucide-react";
import { ActionButtons } from "@/components/ActionButtons";
import { RadarChartBlock } from "@/components/RadarChartBlock";
import { ResultCard } from "@/components/ResultCard";
import { ScoreBars } from "@/components/ScoreBars";
import { ShareCard } from "@/components/ShareCard";
import {
  ANSWERS_STORAGE_KEY,
  calculateResult,
  parseStoredAnswers,
  type AssessmentResult,
} from "@/lib/score";

function buildCopyText(result: AssessmentResult) {
  return [
    "我的AI一人公司不可替代性测评结果：",
    "",
    `类型：${result.resultType.title}`,
    `总分：${result.totalScore} / 100`,
    `组合成熟度：${result.maturityScore} / 10`,
    `最强壁垒：${result.highestDimensions.map((item) => item.name).join("、")}`,
    `最需要补强：${result.lowestDimension.name}`,
    `48小时行动：${result.resultType.action48h.join(" ")}`,
    "",
    "我的不可替代性表达句：",
    "我不是最懂____的人，但我可能是最懂____场景里，如何帮____做到____的人。",
  ].join("\n");
}

export default function ResultPage() {
  const router = useRouter();
  const captureRef = useRef<HTMLDivElement>(null);
  const [answers] = useState<number[] | null>(() => {
    if (typeof window === "undefined") return null;
    return parseStoredAnswers(localStorage.getItem(ANSWERS_STORAGE_KEY));
  });
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!answers) return null;
    return calculateResult(answers);
  }, [answers]);

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
    await navigator.clipboard.writeText(buildCopyText(result));
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

          <div className="grid gap-5 md:grid-cols-2">
            <ResultCard title="你的优势壁垒" eyebrow="strength">
              <div className="flex items-start gap-3">
                <TrendingUp className="mt-1 shrink-0 text-[#E21B2D]" size={20} />
                <p>
                  你当前最强的壁垒是：
                  <strong className="text-[#FFFFFF]">
                    {result.highestDimensions.map((item) => item.name).join("、")}
                  </strong>
                  。这说明你已经在这些方面具备一定优势，后续要把它们放进你的市场表达和产品设计里。
                </p>
              </div>
            </ResultCard>

            <ResultCard title="你的短板壁垒" eyebrow="focus">
              <div className="flex items-start gap-3">
                <Gauge className="mt-1 shrink-0 text-[#E21B2D]" size={20} />
                <p>
                  你当前最需要补强的是：
                  <strong className="text-[#FFFFFF]">{result.lowestDimension.name}</strong>
                  。这不是弱点，而是你下一步最值得投入的成长点。
                </p>
              </div>
            </ResultCard>
          </div>

          <ResultCard title="类型解读" eyebrow="diagnosis">
            <div className="space-y-4">
              {result.resultType.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="rounded-md bg-[rgba(0,0,0,0.20)] p-4">
                <p className="font-semibold text-[#FFFFFF]">核心建议</p>
                <p className="mt-2">{result.resultType.coreAdvice}</p>
              </div>
              <div className="rounded-md bg-[rgba(0,0,0,0.20)] p-4">
                <p className="font-semibold text-[#FFFFFF]">48小时行动</p>
                <div className="mt-2 space-y-2">
                  {result.resultType.action48h.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
              <p>
                <span className="font-semibold text-[#FFFFFF]">适合下一步：</span>
                {result.resultType.nextStep}
              </p>
            </div>
          </ResultCard>

          <div className="grid gap-5 md:grid-cols-2">
            <ResultCard title="你的不可替代性表达句" eyebrow="position sentence">
              <p className="rounded-md border border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.20)] p-4 text-[#FFFFFF]">
                我不是最懂【领域】的人，
                <br />
                但我可能是最懂【具体场景】里，
                <br />
                如何帮【具体人群】做到【具体结果】的人。
              </p>
              <p className="mt-4">
                这句话不是最终定位，而是帮你开始表达自己的市场位置。
              </p>
            </ResultCard>

            <ResultCard title="你的最小组合建议" eyebrow="minimum combo">
              <div className="space-y-3">
                <p>
                  <span className="font-semibold text-[#FFFFFF]">一个小场景：</span>
                  {result.resultType.minimumCombo.scene}
                </p>
                <p>
                  <span className="font-semibold text-[#FFFFFF]">一个新能力：</span>
                  {result.resultType.minimumCombo.ability}
                </p>
                <p>
                  <span className="font-semibold text-[#FFFFFF]">一个公开作品：</span>
                  {result.resultType.minimumCombo.work}
                </p>
              </div>
            </ResultCard>
          </div>

          <ResultCard title="48小时内，先做一个能被看见的动作" eyebrow="action">
            <div className="space-y-2">
              {result.resultType.action48h.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </ResultCard>

          <ResultCard title="分享卡" eyebrow="share">
            <ShareCard result={result} />
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
