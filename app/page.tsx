"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Radar, ShieldCheck } from "lucide-react";
import {
  BACKGROUND_STORAGE_KEY,
  parseStoredBackground,
  sanitizeBackground,
} from "@/lib/background";
import type { UserBackground } from "@/lib/report-content";

const dimensions = ["经历壁垒", "场景壁垒", "方法壁垒", "作品壁垒", "关系壁垒", "风格壁垒"];

export default function Home() {
  const [background, setBackground] = useState<UserBackground>(() => {
    if (typeof window === "undefined") return {};
    return parseStoredBackground(localStorage.getItem(BACKGROUND_STORAGE_KEY));
  });

  function updateBackground(key: keyof UserBackground, value: string) {
    setBackground((current) => ({ ...current, [key]: value }));
  }

  function saveBackground() {
    localStorage.setItem(
      BACKGROUND_STORAGE_KEY,
      JSON.stringify(sanitizeBackground(background)),
    );
  }

  return (
    <main className="min-h-screen bg-[#08090D] px-4 py-6 text-white sm:px-6 lg:px-10">
      <section className="mx-auto grid min-h-[calc(100vh-48px)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.03fr_0.97fr]">
        <div className="py-8 sm:py-12">
          <div className="inline-flex items-center gap-2 rounded-md border border-[#E21B2D]/35 bg-[#E21B2D]/10 px-3 py-2 text-sm font-medium text-[#F4D2D6]">
            <ShieldCheck size={16} />
            AI一人公司商业诊断
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            AI一人公司不可替代性测评
          </h1>
          <p className="mt-5 text-xl font-medium text-[#E21B2D] sm:text-2xl">
            测出你在市场里最难被替代的优势
          </p>
          <div className="mt-8 max-w-2xl space-y-4 text-lg leading-8 text-[#D6D6DD]">
            <p>
              你不是要成为所有人的选择，而是要在一个具体问题里，成为别人最先想到的人。
            </p>
            <p>
              这个测评将从6个维度，帮你看清自己的不可替代性，并找到下一步最值得补强的市场壁垒。
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {dimensions.map((item) => (
              <div
                key={item}
                className="rounded-md border border-white/10 bg-[#171820] px-4 py-3 text-sm text-[#D6D6DD]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-lg border border-white/10 bg-[#171820]/72 p-4 sm:p-5">
            <p className="text-sm font-semibold text-white">先补一点背景信息</p>
            <p className="mt-2 text-sm leading-6 text-[#B8B8C2]">
              可选填写。填得越具体，结果页底部的行动建议越像你的真实情况。
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm text-[#D6D6DD]">
                想做的方向/领域
                <input
                  value={background.domain ?? ""}
                  onChange={(event) => updateBackground("domain", event.target.value)}
                  placeholder="例如：AI课程"
                  className="min-h-11 rounded-md border border-white/10 bg-[#08090D] px-3 text-white outline-none transition placeholder:text-[#686B76] focus:border-[#E21B2D]"
                />
              </label>
              <label className="grid gap-1.5 text-sm text-[#D6D6DD]">
                最想服务的人群
                <input
                  value={background.audience ?? ""}
                  onChange={(event) => updateBackground("audience", event.target.value)}
                  placeholder="例如：线下培训老师"
                  className="min-h-11 rounded-md border border-white/10 bg-[#08090D] px-3 text-white outline-none transition placeholder:text-[#686B76] focus:border-[#E21B2D]"
                />
              </label>
              <label className="grid gap-1.5 text-sm text-[#D6D6DD]">
                这个人群常遇到的问题
                <input
                  value={background.problem ?? ""}
                  onChange={(event) => updateBackground("problem", event.target.value)}
                  placeholder="例如：不知道怎么把课程产品化"
                  className="min-h-11 rounded-md border border-white/10 bg-[#08090D] px-3 text-white outline-none transition placeholder:text-[#686B76] focus:border-[#E21B2D]"
                />
              </label>
              <label className="grid gap-1.5 text-sm text-[#D6D6DD]">
                最能拿出来的能力/经验
                <input
                  value={background.strength ?? ""}
                  onChange={(event) => updateBackground("strength", event.target.value)}
                  placeholder="例如：讲课经验和AI工具"
                  className="min-h-11 rounded-md border border-white/10 bg-[#08090D] px-3 text-white outline-none transition placeholder:text-[#686B76] focus:border-[#E21B2D]"
                />
              </label>
            </div>
          </div>

          <Link
            href="/quiz"
            onClick={saveBackground}
            className="mt-9 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-md bg-[#E21B2D] px-6 py-4 text-base font-semibold text-white shadow-[0_0_30px_rgba(226,27,45,0.28)] transition hover:bg-[#f03040] sm:w-auto"
          >
            开始测评
            <ArrowRight size={19} />
          </Link>
          <p className="mt-5 text-sm text-[#B8B8C2]">
            用3分钟，看清你的市场壁垒和48小时行动方向。
          </p>
        </div>

        <div className="pb-8 lg:pb-0">
          <div className="rounded-lg border border-white/10 bg-[#171820]/88 p-5 shadow-2xl shadow-black/40 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-[#B8B8C2]">六维诊断模型</p>
                <h2 className="mt-1 text-2xl font-semibold">不可替代性雷达</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#E21B2D]/14 text-[#E21B2D]">
                <Radar size={24} />
              </div>
            </div>
            <div className="relative mx-auto mt-8 aspect-square max-w-[440px] rounded-full border border-[#E21B2D]/25 bg-[radial-gradient(circle,rgba(226,27,45,0.20)_0%,rgba(226,27,45,0.07)_35%,rgba(255,255,255,0.03)_36%,rgba(255,255,255,0.02)_100%)]">
              <div className="absolute inset-[15%] rounded-full border border-white/10" />
              <div className="absolute inset-[30%] rounded-full border border-white/10" />
              <div className="absolute inset-1/2 h-[1px] w-1/2 origin-left bg-[#E21B2D]/50" />
              <div className="absolute inset-1/2 h-[1px] w-1/2 origin-left rotate-60 bg-[#E21B2D]/45" />
              <div className="absolute inset-1/2 h-[1px] w-1/2 origin-left rotate-120 bg-[#E21B2D]/45" />
              <div className="absolute left-[18%] top-[22%] h-3 w-3 rounded-full bg-[#E21B2D] shadow-[0_0_18px_rgba(226,27,45,0.9)]" />
              <div className="absolute right-[20%] top-[34%] h-3 w-3 rounded-full bg-white" />
              <div className="absolute bottom-[24%] left-[32%] h-3 w-3 rounded-full bg-[#E21B2D]" />
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 rounded-md border border-[#E21B2D]/35 bg-[#08090D]/84 p-4 text-center backdrop-blur">
                <p className="text-sm text-[#B8B8C2]">核心问题</p>
                <p className="mt-2 text-lg font-semibold">
                  为什么这个市场非你不可？
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-6 text-[#B8B8C2]">
              普通定位告诉别人你做什么，不可替代性告诉别人为什么非你不可。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
