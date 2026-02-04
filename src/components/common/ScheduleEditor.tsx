"use client";

import { ReactNode } from "react";

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
  showAddButton?: boolean;
  layoutVariant?: "default" | "compact";
  inputClassName?: string;
  selectClassName?: string;
  selectVariant?: "default" | "figma";
  renderRemoveButton?: (id: string) => ReactNode;
};

export function ScheduleEditor({
  rows,
  dayOptions,
  onChange,
  onAdd,
  onRemove,
  showAddButton = true,
  layoutVariant = "default",
  inputClassName,
  selectClassName,
  selectVariant = "default",
  renderRemoveButton,
}: ScheduleEditorProps) {
  const rowClassName =
    layoutVariant === "compact"
      ? "grid grid-cols-[1fr_1fr_1fr_48px] gap-3 items-center"
      : "grid grid-cols-12 gap-2 items-center";

  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div key={row.id} className={rowClassName}>
          <div className={layoutVariant === "compact" ? "" : "col-span-4"}>
            <SelectBtn
              value={row.day}
              placeholder="요일"
              options={dayOptions}
              onChange={(value) => onChange(row.id, "day", value)}
              className={selectClassName}
              variant={selectVariant}
            />
          </div>
          <div className={layoutVariant === "compact" ? "" : "col-span-3"}>
            <Input
              type="time"
              value={row.startTime}
              aria-label="시작 시간"
              onChange={(event) =>
                onChange(row.id, "startTime", event.target.value)
              }
              className={inputClassName}
            />
          </div>
          <div className={layoutVariant === "compact" ? "" : "col-span-3"}>
            <Input
              type="time"
              value={row.endTime}
              aria-label="종료 시간"
              onChange={(event) =>
                onChange(row.id, "endTime", event.target.value)
              }
              className={inputClassName}
            />
          </div>
          <div
            className={
              layoutVariant === "compact" ? "" : "col-span-2 text-right"
            }
          >
            {renderRemoveButton ? (
              renderRemoveButton(row.id)
            ) : (
              <Button
                variant="outline"
                size="default"
                onClick={() => onRemove(row.id)}
              >
                삭제
              </Button>
            )}
          </div>
        </div>
      ))}
      {showAddButton ? (
        <Button variant="outline" size="default" onClick={onAdd}>
          + 시간 추가
        </Button>
      ) : null}
    </div>
  );
}
