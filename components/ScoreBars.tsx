import type { DimensionScore } from "@/lib/score";

type ScoreBarsProps = {
  scores: DimensionScore[];
  lowestKey: string;
};

export function ScoreBars({ scores, lowestKey }: ScoreBarsProps) {
  return (
    <div className="space-y-4">
      {scores.map((item) => {
        const isLowest = item.key === lowestKey;

        return (
          <div key={item.key}>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-[#FFFFFF]">{item.name}</span>
              <span className={isLowest ? "text-[#E21B2D]" : "text-[#D6D6DD]"}>
                {item.percentage}%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[rgba(255,255,255,0.10)]">
              <div
                className={[
                  "h-full rounded-full",
                  isLowest
                    ? "bg-[linear-gradient(90deg,#8B0F1A,#E21B2D)]"
                    : "bg-[rgba(255,255,255,0.55)]",
                ].join(" ")}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
