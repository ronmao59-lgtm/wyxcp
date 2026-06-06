import type { UserBackground } from "./report-content";

export const BACKGROUND_STORAGE_KEY = "ai-one-company-assessment-background";

export function sanitizeBackground(input: UserBackground): UserBackground {
  return {
    domain: input.domain?.trim() ?? "",
    audience: input.audience?.trim() ?? "",
    problem: input.problem?.trim() ?? "",
    strength: input.strength?.trim() ?? "",
  };
}

export function parseStoredBackground(value: string | null): UserBackground {
  if (!value) return {};

  try {
    const parsed = JSON.parse(value) as Partial<UserBackground>;
    return sanitizeBackground({
      domain: typeof parsed.domain === "string" ? parsed.domain : "",
      audience: typeof parsed.audience === "string" ? parsed.audience : "",
      problem: typeof parsed.problem === "string" ? parsed.problem : "",
      strength: typeof parsed.strength === "string" ? parsed.strength : "",
    });
  } catch {
    return {};
  }
}
