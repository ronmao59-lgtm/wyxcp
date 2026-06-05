import { describe, expect, it } from "vitest";
import { calculateResult } from "./score";

describe("calculateResult", () => {
  it("uses the minimum-combination type when total score is below 55", () => {
    const result = calculateResult(Array(20).fill(2));

    expect(result.totalScore).toBe(40);
    expect(result.resultType.id).toBe("minimum-combination");
  });

  it("uses the combined-barrier type when total is high and at least three dimensions are above 75%", () => {
    const answers = [
      5, 5, 5,
      5, 5, 4,
      5, 4, 5,
      3, 3, 3,
      4, 4, 4,
      4, 4, 4,
      5, 5,
    ];

    const result = calculateResult(answers);

    expect(result.totalScore).toBe(86);
    expect(result.qualifiedDimensionCount).toBeGreaterThanOrEqual(3);
    expect(result.resultType.id).toBe("combined-barrier");
  });

  it("breaks lowest-dimension ties by commercialization impact priority", () => {
    const answers = [
      4, 4, 4,
      3, 3, 3,
      4, 4, 4,
      3, 3, 3,
      4, 4, 3,
      4, 4, 3,
      5, 5,
    ];

    const result = calculateResult(answers);

    expect(result.lowestDimension.key).toBe("work");
    expect(result.resultType.id).toBe("work-driven");
  });
});
