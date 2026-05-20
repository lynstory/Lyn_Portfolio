import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ROADMAP §7.3 — 카테고리는 5개 고정 enum
const PROJECTS_CATEGORIES = ["기획·디자인 씽킹", "사회혁신", "창업·사업", "AI/도구", "브랜딩"] as const;
const EXPERIENCE_CATEGORIES = ["학교/학술", "동아리/대외활동", "국제 활동", "인턴/실무", "교육과정"] as const;

// Projects 컬렉션 (ROADMAP §4.2, §7.1)
// 새 프로젝트 추가: src/content/projects/[slug].mdx 파일 생성 → 빌드 시 카드 + 상세 페이지 자동 생성
const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    period: z.string(),
    role: z.string().optional(),
    category: z.enum(PROJECTS_CATEGORIES),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(), // public/projects/ 하위 파일명 (예: "kimst.jpg")
    award: z.string().optional(), // 수상 내역 (예: "2020 창업 아이디어톤 최우수상")
    date: z.coerce.date(),
    featured: z.boolean().default(false), // ROADMAP §7.2 — 최대 3개
    highlight: z.boolean().default(false), // projects 페이지 대형 Featured 카드
    draft: z.boolean().default(false),
  }),
});

// Experience 컬렉션 (ROADMAP §2.2 Experience)
// date: ROADMAP에 명시된 연도가 있는 항목만 입력 (미상 항목은 비움 — CLAUDE.md §4 추측 금지)
// order: 정렬용 정수 (1=최신, 클수록 오래됨)
const experience = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/experience" }),
  schema: z.object({
    title: z.string(),
    period: z.string().optional(),
    org: z.string().optional(),
    description: z.string().optional(),
    category: z.enum(EXPERIENCE_CATEGORIES),
    date: z.coerce.date().optional(),
    order: z.number(),
    current: z.boolean().default(false),
  }),
});

export const collections = { projects, experience };
