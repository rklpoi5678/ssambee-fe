"use client";

import { SummaryMetricCard } from "@/components/common/SummaryMetricCard";
import { Lecture } from "@/types/lectures";

type LecturesStatsProps = {
  lectures: Lecture[];
  totalCount?: number;
  todayCount: number;
};

export function LecturesStats({
  lectures,
  totalCount,
  todayCount,
}: LecturesStatsProps) {
  const totalLectures = totalCount ?? lectures.length;

  const totalStudents = lectures.reduce(
    (sum, lecture) => sum + lecture.currentStudents,
    0
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryMetricCard
        title="전체 클래스"
        subtitle="캠퍼스 전체"
        value={totalLectures}
        unit="개"
        tone="primary"
      />

      <SummaryMetricCard
        title="등록 인원"
        subtitle="캠퍼스 전체"
        value={totalStudents}
        unit="명"
        tone="secondary"
      />

      <SummaryMetricCard
        title="오늘 일정"
        subtitle="캠퍼스 전체"
        value={todayCount}
        unit="개"
        tone="neutral"
      />
    </div>
  );
}
