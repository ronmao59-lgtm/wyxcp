import type { AssessmentResult } from "@/lib/score";

type ShareCardProps = {
  result: AssessmentResult;
};

export function ShareCard({ result }: ShareCardProps) {
  return (
    <div className="rounded-lg border border-[rgba(226,27,45,0.35)] bg-[linear-gradient(135deg,rgba(226,27,45,0.16),rgba(23,24,32,0.98)_38%,rgba(8,9,13,1))] p-5 sm:p-6">
      <p className="text-sm font-semibold text-[#E21B2D]">我的测评结果</p>
      <h3 className="mt-3 text-2xl font-semibold text-[#FFFFFF]">
        {result.resultType.title}
      </h3>
      <div className="mt-5 grid gap-3 text-sm text-[#D6D6DD] sm:grid-cols-2">
        <p>不可替代性总分：{result.totalScore} / 100</p>
        <p>当前最强壁垒：{result.highestDimensions.map((item) => item.name).join("、")}</p>
        <p>当前最该补强：{result.lowestDimension.name}</p>
        <p>组合成熟度：{result.maturityScore} / 10</p>
      </div>
      <p className="mt-4 border-t border-[rgba(255,255,255,0.10)] pt-4 text-sm leading-6 text-[#FFFFFF]">
        48小时行动：{result.resultType.action48h.join(" ")}
      </p>
      <p className="mt-5 text-xs text-[#B8B8C2]">
        AI一人公司不可替代性测评
      </p>
    </div>
  );
}
