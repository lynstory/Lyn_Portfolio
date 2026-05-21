export const projectOrder = [
  "apye-korea",
  "kakao-ansan-impact",
  "ai-pm-experiment",
  "moojigaeng",
  "zero-to-one",
  "creative-convergence-camp",
  "chinmance",
] as const;

export type ProjectSlug = typeof projectOrder[number];
