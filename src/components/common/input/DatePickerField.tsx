"use client";

import { useMemo, useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { DayPicker } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
};

const formatDisplayDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}. ${mm}. ${dd}`;
};

const formatValueDate = (date: Date) => date.toLocaleDateString("sv-SE");

export function DatePickerField<T extends FieldValues>({
  control,
  name,
  placeholder = "날짜 선택",
  disabled,
  className,
  onValueChange,
}: DatePickerFieldProps<T>) {
  const { field } = useController({ control, name });
  const [open, setOpen] = useState(false);
  const value = field.value as string | undefined;

  const selectedDate = useMemo(() => {
    if (!value) return undefined;
    const parsed = new Date(`${value}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }, [value]);

  const label = selectedDate ? formatDisplayDate(selectedDate) : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "relative flex h-14 w-full items-center rounded-[12px] border border-[#d6d9e0] bg-white px-4 text-[16px] text-[#8b90a3]",
            "disabled:cursor-not-allowed disabled:opacity-60",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-[#8b90a3]" />
          <span className="flex-1 text-left">{label}</span>
          <ChevronDown className="h-4 w-4 text-[#8b90a3]" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} className="w-auto p-0">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) return;
            const nextValue = formatValueDate(date);
            field.onChange(nextValue);
            onValueChange?.(nextValue);
            setOpen(false);
          }}
          className="eduops-date-picker"
          navLayout="around"
          showOutsideDays={false}
          weekStartsOn={0}
          formatters={{
            formatCaption: (date) =>
              new Intl.DateTimeFormat("ko-KR", {
                year: "numeric",
                month: "long",
              }).format(date),
            formatWeekdayName: (date) =>
              new Intl.DateTimeFormat("ko-KR", {
                weekday: "short",
              }).format(date),
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
