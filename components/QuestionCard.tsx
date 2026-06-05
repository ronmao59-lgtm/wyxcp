"use client";

import type { Question } from "@/lib/quiz-data";
import { ScoreButton } from "./ScoreButton";

type QuestionCardProps = {
  question: Question;
  selectedValue: number | null;
  onSelect: (value: number) => void;
};

export function QuestionCard({
  question,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#171820]/88 p-5 shadow-2xl shadow-black/30 sm:p-7">
      <p className="text-sm font-medium text-[#E21B2D]">
        诊断项 {String(question.id).padStart(2, "0")}
      </p>
      <h1 className="mt-4 text-left text-2xl font-semibold leading-snug text-white sm:text-3xl">
        {question.text}
      </h1>

      <div className="mt-8">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <ScoreButton
              key={value}
              value={value}
              selected={selectedValue === value}
              onSelect={onSelect}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-sm text-[#B8B8C2]">
          <span>不像我</span>
          <span>很像我</span>
        </div>
      </div>
    </section>
  );
}
