"use client";

import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium">전체 클래스</p>
              <p className="text-xs text-primary-foreground/80">캠퍼스 전체</p>
            </div>
            <p className="text-3xl font-bold">{totalLectures}개</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-600 text-white">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium">등록 인원</p>
              <p className="text-xs text-white/80">캠퍼스 전체</p>
            </div>
            <p className="text-3xl font-bold">{totalStudents}명</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium">오늘 일정</p>
              <p className="text-xs text-muted-foreground">캠퍼스 전체</p>
            </div>
            <p className="text-3xl font-bold">{todayCount}개</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
