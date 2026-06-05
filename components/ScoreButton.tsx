type ScoreButtonProps = {
  value: number;
  selected: boolean;
  onSelect: (value: number) => void;
};

export function ScoreButton({ value, selected, onSelect }: ScoreButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(value)}
      className={[
        "flex h-14 min-w-12 flex-1 items-center justify-center rounded-md border text-lg font-semibold transition sm:h-16",
        selected
          ? "border-[#E21B2D] bg-[#E21B2D] text-white shadow-[0_0_24px_rgba(226,27,45,0.32)]"
          : "border-white/12 bg-[#171820] text-[#D6D6DD] hover:border-[#E21B2D]/70 hover:text-white",
      ].join(" ")}
    >
      {value}
    </button>
  );
}
