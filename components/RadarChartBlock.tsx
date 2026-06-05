"use client";

import type { DimensionScore } from "@/lib/score";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

type RadarChartBlockProps = {
  scores: DimensionScore[];
};

export function RadarChartBlock({ scores }: RadarChartBlockProps) {
  const data = scores.map((item) => ({
    name: item.shortName,
    value: item.percentage,
  }));

  return (
    <div className="h-[300px] w-full sm:h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="rgba(255,255,255,0.16)" />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: "#D6D6DD", fontSize: 13 }}
          />
          <Radar
            dataKey="value"
            stroke="#E21B2D"
            fill="#E21B2D"
            fillOpacity={0.28}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
