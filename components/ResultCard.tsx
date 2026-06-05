import type { ReactNode } from "react";

type ResultCardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export function ResultCard({
  title,
  eyebrow,
  children,
  className = "",
}: ResultCardProps) {
  return (
    <section
      className={`rounded-lg border border-[rgba(255,255,255,0.10)] bg-[rgba(23,24,32,0.92)] p-5 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.24),0_8px_10px_-6px_rgba(0,0,0,0.24)] sm:p-6 ${className}`}
    >
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#E21B2D]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-xl font-semibold text-[#FFFFFF]">{title}</h2>
      <div className="mt-4 text-[15px] leading-7 text-[#D6D6DD]">{children}</div>
    </section>
  );
}
