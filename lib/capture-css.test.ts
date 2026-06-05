import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const captureRelatedFiles = [
  "app/globals.css",
  "app/result/page.tsx",
  "components/ActionButtons.tsx",
  "components/RadarChartBlock.tsx",
  "components/ResultCard.tsx",
  "components/ScoreBars.tsx",
  "components/ShareCard.tsx",
];

const unsupportedColorFunctions =
  /\b(?:lab|oklch|color-mix)\(|\b(?:hsl|rgb)\(\s*from\b/i;

const tailwindDefaultColorClass =
  /(?:^|[\s"`'])(?:hover:|disabled:)?(?:text|bg|border|shadow)-(?:white|black|zinc|neutral|slate|gray)(?:\/\d+|-\d+)?(?=[\s"`'])/;

describe("capture-safe colors", () => {
  it("keeps result capture styles compatible with html2canvas", () => {
    const violations = captureRelatedFiles.flatMap((file) => {
      const content = readFileSync(join(process.cwd(), file), "utf8");
      const problems: string[] = [];

      if (unsupportedColorFunctions.test(content)) {
        problems.push("modern color function");
      }

      if (tailwindDefaultColorClass.test(content)) {
        problems.push("Tailwind default color class");
      }

      return problems.map((problem) => `${file}: ${problem}`);
    });

    expect(violations).toEqual([]);
  });
});
