import type { LecturesListQuery } from "@/types/lectures";

/**
 * Lecture Query Keys Factory
 * - 일관된 쿼리 키 관리
 * - 타입 안전성 보장
 * - 캐시 무효화 용이
 */
export const lectureKeys = {
  all: ["lectures"] as const,
  lists: () => [...lectureKeys.all, "list"] as const,
  list: (query: LecturesListQuery) => [...lectureKeys.lists(), query] as const,
  details: () => [...lectureKeys.all, "detail"] as const,
  detail: (id: string) => [...lectureKeys.details(), id] as const,
  todays: () => [...lectureKeys.all, "today"] as const,
  today: (day: number) => [...lectureKeys.todays(), day] as const,
};
