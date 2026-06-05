"use client";

import { ClipboardCopy, Download, RotateCcw } from "lucide-react";

type ActionButtonsProps = {
  onSave: () => void;
  onCopy: () => void;
  onRestart: () => void;
  saving?: boolean;
  copied?: boolean;
};

export function ActionButtons({
  onSave,
  onCopy,
  onRestart,
  saving = false,
  copied = false,
}: ActionButtonsProps) {
  return (
    <section className="rounded-lg border border-[rgba(255,255,255,0.10)] bg-[#171820] p-5 sm:p-6">
      <p className="text-sm leading-6 text-[#D6D6DD]">
        保存你的测评结果，后续可以继续对照它，拆出你的市场位置和48小时行动。
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#E21B2D] px-5 text-sm font-semibold text-[#FFFFFF] transition hover:bg-[#f03040] disabled:cursor-wait disabled:opacity-70"
        >
          <Download size={18} />
          {saving ? "正在生成" : "保存结果图"}
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[rgba(255,255,255,0.14)] bg-[#1E1E27] px-5 text-sm font-semibold text-[#FFFFFF] transition hover:border-[rgba(226,27,45,0.70)]"
        >
          <ClipboardCopy size={18} />
          {copied ? "已复制到剪贴板" : "复制结果"}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[rgba(255,255,255,0.05)] px-5 text-sm font-medium text-[#B8B8C2] transition hover:text-[#FFFFFF]"
        >
          <RotateCcw size={17} />
          重新测评
        </button>
      </div>
    </section>
  );
}
