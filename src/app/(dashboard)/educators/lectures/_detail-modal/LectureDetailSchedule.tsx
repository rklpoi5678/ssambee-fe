"use client";

import { LectureSchedule } from "@/types/lectures";

type LectureDetailScheduleProps = {
  schedule: LectureSchedule;
};

export function LectureDetailSchedule({
  schedule,
}: LectureDetailScheduleProps) {
  const hasSchedule = schedule.days.length > 0;
  const scheduleDays = hasSchedule ? schedule.days.join(", ") : "일정 없음";
  const scheduleTime = hasSchedule ? schedule.time : "일정 없음";

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">수업 시간</p>
      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
        <span className="text-2xl">🕐</span>
        <div>
          <p className="font-medium">{scheduleDays}</p>
          <p className="text-sm text-muted-foreground">{scheduleTime}</p>
        </div>
      </div>
    </div>
  );
}
