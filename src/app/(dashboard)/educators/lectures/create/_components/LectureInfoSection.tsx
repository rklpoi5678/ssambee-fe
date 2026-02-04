"use client";

import { UseFormReturn, useFormState, useWatch } from "react-hook-form";
import { ChevronDown } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SelectBtn from "@/components/common/button/SelectBtn";
import { DatePickerField } from "@/components/common/input/DatePickerField";
import { LectureFormInput } from "@/validation/lecture.validation";
import {
  LECTURE_GRADES,
  LECTURE_STATUS_OPTIONS,
} from "@/constants/lectures.constants";

type LectureInfoSectionProps = {
  form: UseFormReturn<LectureFormInput>;
  disabled: boolean;
};

export function LectureInfoSection({
  form,
  disabled,
}: LectureInfoSectionProps) {
  const { register, setValue } = form;
  const { errors } = useFormState({ control: form.control });

  const schoolYearValue =
    useWatch({ control: form.control, name: "schoolYear" }) ?? "";
  const schoolYearOptions = LECTURE_GRADES.map((grade) => ({
    label: grade,
    value: grade,
  }));

  return (
    <Card className="rounded-[24px] border-0 shadow-[0_0_14px_rgba(138,138,138,0.08)]">
      <CardContent className="p-8">
        <h2 className="text-[24px] font-bold leading-[32px] tracking-[-0.24px] text-[#040405]">
          강의 기본정보
        </h2>
        <div className="mt-8 flex flex-col gap-8">
          <input type="hidden" {...register("schoolYear")} />
          <div>
            <label htmlFor="lecture-name" className="sr-only">
              수업명
            </label>
            <Input
              id="lecture-name"
              {...register("name")}
              placeholder="수업명"
              disabled={disabled}
              className="h-14 rounded-[12px] border-[#d6d9e0] text-[16px] placeholder:text-[#8b90a3]"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="lecture-subject" className="sr-only">
                과목
              </label>
              <Input
                id="lecture-subject"
                {...register("subject")}
                placeholder="과목"
                disabled={disabled}
                className="h-14 rounded-[12px] border-[#d6d9e0] text-[16px] placeholder:text-[#8b90a3]"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lecture-grade" className="sr-only">
                학년
              </label>
              <SelectBtn
                id="lecture-grade"
                value={schoolYearValue}
                placeholder="학년 선택"
                options={schoolYearOptions}
                onChange={(value) =>
                  setValue("schoolYear", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                variant="figma"
                className="text-[#8b90a3]"
                isError={Boolean(errors.schoolYear)}
                disabled={disabled}
              />
              {errors.schoolYear && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.schoolYear.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="lecture-start-date" className="sr-only">
                개강일
              </label>
              <DatePickerField
                control={form.control}
                name="startDate"
                placeholder="개강일"
                disabled={disabled}
              />
              {errors.startDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lecture-status" className="sr-only">
                수업 상태
              </label>
              <div className="relative">
                <select
                  id="lecture-status"
                  {...register("status")}
                  disabled={disabled}
                  className="flex h-14 w-full appearance-none rounded-[12px] border border-[#d6d9e0] bg-white px-4 pr-10 text-[16px] text-[#8b90a3] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {LECTURE_STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b90a3]" />
              </div>
              {errors.status && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
