import {
  dimensions,
  questions,
  tieBreakPriority,
  type DimensionKey,
} from "./quiz-data";
import {
  dimensionTypeMap,
  resultContents,
  type ResultContent,
} from "./result-content";

export type DimensionScore = {
  key: DimensionKey;
  name: string;
  shortName: string;
  score: number;
  percentage: number;
};

export type AssessmentResult = {
  dimensionScores: DimensionScore[];
  maturityScore: number;
  totalScore: number;
  qualifiedDimensionCount: number;
  highestDimensions: DimensionScore[];
  lowestDimension: DimensionScore;
  resultType: ResultContent;
};

function assertValidAnswers(answers: number[]) {
  if (answers.length !== questions.length) {
    throw new Error(`Expected ${questions.length} answers, received ${answers.length}.`);
  }

  answers.forEach((answer, index) => {
    if (!Number.isInteger(answer) || answer < 1 || answer > 5) {
      throw new Error(`Answer ${index + 1} must be an integer from 1 to 5.`);
    }
  });
}

export function calculateResult(answers: number[]): AssessmentResult {
  assertValidAnswers(answers);

  const dimensionScores = dimensions.map((dimension) => {
    const score = questions.reduce((sum, question, index) => {
      return question.dimension === dimension.key ? sum + answers[index] : sum;
    }, 0);

    return {
      ...dimension,
      score,
      percentage: Math.round((score / 15) * 100),
    };
  });

  const maturityScore = questions.reduce((sum, question, index) => {
    return question.dimension === "maturity" ? sum + answers[index] : sum;
  }, 0);

  const totalScore =
    maturityScore + dimensionScores.reduce((sum, item) => sum + item.score, 0);

  const qualifiedDimensionCount = dimensionScores.filter(
    (item) => item.percentage >= 75,
  ).length;

  const sortedByScore = [...dimensionScores].sort((a, b) => b.score - a.score);
  const highestDimensions = sortedByScore.slice(0, 2);
  const lowestScore = Math.min(...dimensionScores.map((item) => item.score));
  const lowestDimension =
    tieBreakPriority
      .map((key) => dimensionScores.find((item) => item.key === key))
      .find((item) => item?.score === lowestScore) ?? dimensionScores[0];

  let resultType: ResultContent;
  if (totalScore < 55) {
    resultType = resultContents["minimum-combination"];
  } else if (totalScore >= 78 && qualifiedDimensionCount >= 3) {
    resultType = resultContents["combined-barrier"];
  } else {
    resultType = resultContents[dimensionTypeMap[lowestDimension.key]];
  }

  return {
    dimensionScores,
    maturityScore,
    totalScore,
    qualifiedDimensionCount,
    highestDimensions,
    lowestDimension,
    resultType,
  };
}

export function parseStoredAnswers(value: string | null): number[] | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return null;

    const answers = parsed.map(Number);
    assertValidAnswers(answers);
    return answers;
  } catch {
    return null;
  }
}

export const ANSWERS_STORAGE_KEY = "ai-one-company-assessment-answers";
