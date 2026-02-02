"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectBtn from "@/components/common/button/SelectBtn";

type ScheduleOption = { label: string; value: string };

export type ScheduleEditorRow = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
};

type ScheduleEditorProps = {
  rows: ScheduleEditorRow[];
  dayOptions: ScheduleOption[];
  onChange: (
    id: string,
    field: "day" | "startTime" | "endTime",
    value: string
  ) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
};

export function ScheduleEditor({
  rows,
  dayOptions,
  onChange,
  onAdd,
  onRemove,
}: ScheduleEditorProps) {
  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div key={row.id} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-4">
            <SelectBtn
              value={row.day}
              placeholder="요일"
              options={dayOptions}
              onChange={(value) => onChange(row.id, "day", value)}
            />
          </div>
          <div className="col-span-3">
            <Input
              type="time"
              value={row.startTime}
              onChange={(event) =>
                onChange(row.id, "startTime", event.target.value)
              }
            />
          </div>
          <div className="col-span-3">
            <Input
              type="time"
              value={row.endTime}
              onChange={(event) =>
                onChange(row.id, "endTime", event.target.value)
              }
            />
          </div>
          <div className="col-span-2 text-right">
            <Button
              variant="outline"
              size="default"
              onClick={() => onRemove(row.id)}
            >
              삭제
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" size="default" onClick={onAdd}>
        + 시간 추가
      </Button>
    </div>
  );
}
