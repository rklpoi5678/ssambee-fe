"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lecture } from "@/types/lectures";
import { useLectureDetailModalStore } from "@/stores/lectures";

import { LectureStatusBadge } from "./LectureStatusBadge";

type LectureCardProps = {
  lecture: Lecture;
};

export function LectureCard({ lecture }: LectureCardProps) {
  const openModal = useLectureDetailModalStore((state) => state.open);
  const hasSchedule = lecture.schedule.days.length > 0;
  const scheduleText = hasSchedule
    ? `${lecture.schedule.days.join(", ")} · ${lecture.schedule.time}`
    : "일정 없음";

  return (
    <>
      <Card className="relative overflow-hidden">
        <CardContent className="pt-6">
          <div className="mb-3 flex items-center gap-2">
            {lecture.status && <LectureStatusBadge status={lecture.status} />}
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {lecture.grade}
            </span>
          </div>

          <h3 className="text-lg font-semibold">{lecture.name}</h3>
          <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span>🕐</span>
            {scheduleText}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>👥 등록 {lecture.currentStudents}명</span>
            <span>담당 강사 {lecture.instructor}</span>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => openModal(lecture.id)}
          >
            상세 보기
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
