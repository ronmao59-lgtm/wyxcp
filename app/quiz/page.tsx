"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { questions } from "@/lib/quiz-data";
import { ANSWERS_STORAGE_KEY, parseStoredAnswers } from "@/lib/score";

type AnswerState = Array<number | null>;

function createEmptyAnswers(): AnswerState {
  return Array(questions.length).fill(null);
}

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>(() => {
    if (typeof window === "undefined") return createEmptyAnswers();
    return parseStoredAnswers(localStorage.getItem(ANSWERS_STORAGE_KEY)) ?? createEmptyAnswers();
  });
  const [warning, setWarning] = useState("");

  const currentQuestion = questions[currentIndex];
  const selectedValue = answers[currentIndex];
  const progress = useMemo(
    () => ((currentIndex + 1) / questions.length) * 100,
    [currentIndex],
  );

  function updateAnswer(value: number) {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = value;
    setAnswers(nextAnswers);
    setWarning("");

    if (nextAnswers.every((item) => typeof item === "number")) {
      localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(nextAnswers));
    }
  }

  function goPrevious() {
    setWarning("");
    setCurrentIndex((index) => Math.max(0, index - 1));
  }

  function goNext() {
    if (!selectedValue) {
      setWarning("请先选择一个分数");
      return;
    }

    if (currentIndex === questions.length - 1) {
      const completedAnswers = answers.map((item) => item ?? 0);
      if (completedAnswers.some((item) => item < 1)) {
        setWarning("还有题目没有完成，请检查后再查看结果");
        return;
      }

      localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(completedAnswers));
      router.push("/result");
      return;
    }

    setWarning("");
    setCurrentIndex((index) => index + 1);
  }

  return (
    <main className="min-h-screen bg-[#08090D] px-4 py-6 text-white sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-[720px] flex-col justify-center">
        <div className="mb-5">
          <div className="mb-3 flex items-center justify-between text-sm text-[#D6D6DD]">
            <span>第 {currentIndex + 1} / {questions.length} 题</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedValue={selectedValue}
          onSelect={updateAnswer}
        />

        <div className="mt-5 min-h-6 text-sm text-[#E21B2D]">{warning}</div>

        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={goPrevious}
            disabled={currentIndex === 0}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/12 bg-[#171820] px-4 text-sm font-semibold text-white transition hover:border-white/24 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={18} />
            上一题
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!selectedValue}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#E21B2D] px-4 text-sm font-semibold text-white transition hover:bg-[#f03040] disabled:cursor-not-allowed disabled:bg-[#3A1A20] disabled:text-white/45"
          >
            {currentIndex === questions.length - 1 ? "查看结果" : "下一题"}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}
