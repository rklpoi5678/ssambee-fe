"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ScheduleEditor,
  ScheduleEditorRow,
} from "@/components/common/ScheduleEditor";
import { WEEKDAY_OPTIONS } from "@/constants/lectures.constants";
import { ScheduleData } from "@/types/lectures";

import { useScheduleData } from "../_hooks/useScheduleData";

type LectureScheduleSectionProps = {
  schedules: number[];
  scheduleData: Record<number, ScheduleData>;
  disabled: boolean;
  onAdd: () => void;
  onRemove: (id: number) => void;
  onScheduleDataChange: (nextData: Record<number, ScheduleData>) => void;
};

export function LectureScheduleSection({
  schedules,
  scheduleData,
  disabled,
  onAdd,
  onRemove,
  onScheduleDataChange,
}: LectureScheduleSectionProps) {
  const { updateScheduleField } = useScheduleData({
    scheduleData,
    onScheduleDataChange,
  });

  const rows: ScheduleEditorRow[] = schedules.map((scheduleId) => ({
    id: String(scheduleId),
    day: scheduleData[scheduleId]?.day || "",
    startTime: scheduleData[scheduleId]?.startTime || "",
    endTime: scheduleData[scheduleId]?.endTime || "",
  }));

  const dayOptions = [...WEEKDAY_OPTIONS];

  return (
    <Card>
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">📅 강의 시간표</h2>
        <Button
          onClick={onAdd}
          size="default"
          variant="outline"
          disabled={disabled}
        >
          + 시간 추가
        </Button>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-[1fr_1fr_1fr_48px] gap-4 mb-4 text-sm font-medium text-muted-foreground">
          <div>요일</div>
          <div>시작 시간</div>
          <div>종료 시간</div>
          <div></div>
        </div>
        <div
          className={disabled ? "pointer-events-none opacity-60" : ""}
          aria-disabled={disabled}
          inert={disabled ? true : undefined}
        >
          <ScheduleEditor
            rows={rows}
            dayOptions={dayOptions}
            onAdd={onAdd}
            onRemove={(id) => onRemove(Number(id))}
            onChange={(id, field, value) =>
              updateScheduleField(Number(id), field, value)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
