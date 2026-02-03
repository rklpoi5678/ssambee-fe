"use client";

import { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LectureFormInput } from "@/validation/lecture.validation";
import { formatPhoneNumber } from "@/utils/phone";

type ManualStudentFormProps = {
  form: UseFormReturn<LectureFormInput>;
  disabled: boolean;
};

const emptyStudent = {
  name: "",
  phone: "",
  school: "",
  studentGrade: "",
  parentPhone: "",
  registrationDate: "",
};

export function ManualStudentForm({ form, disabled }: ManualStudentFormProps) {
  const [lockedIds, setLockedIds] = useState<Set<string>>(new Set());

  const {
    control,
    register,
    formState: { errors },
    trigger,
    setValue,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "students",
  });

  const handlePhoneChange = (
    index: number,
    field: "phone" | "parentPhone",
    value: string
  ) => {
    setValue(`students.${index}.${field}`, formatPhoneNumber(value), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleRemove = (index: number, fieldId: string) => {
    if (disabled) return;
    setLockedIds((prev) => {
      const next = new Set(prev);
      next.delete(fieldId);
      return next;
    });
    remove(index);
  };

  const handleToggleLock = async (index: number, fieldId: string) => {
    if (disabled) return;

    const isLocked = lockedIds.has(fieldId);
    if (isLocked) {
      setLockedIds((prev) => {
        const next = new Set(prev);
        next.delete(fieldId);
        return next;
      });
      return;
    }

    const isValid = await trigger([
      `students.${index}.name`,
      `students.${index}.phone`,
      `students.${index}.school`,
      `students.${index}.studentGrade`,
      `students.${index}.parentPhone`,
      `students.${index}.registrationDate`,
    ]);

    if (!isValid) return;

    setLockedIds((prev) => new Set(prev).add(fieldId));
  };

  return (
    <>
      <div className="space-y-4">
        {fields.map((field, index) => {
          const fieldErrors = errors.students?.[index];
          const isLocked = lockedIds.has(field.id) || disabled;

          return (
            <div
              key={field.id}
              className={`border rounded-lg p-4 space-y-4 ${isLocked ? "bg-muted/40" : ""}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">학생 정보 {index + 1}</h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleLock(index, field.id)}
                    disabled={disabled}
                    className="text-blue-600 text-sm hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLocked ? "수정" : "확정"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index, field.id)}
                    disabled={disabled || isLocked}
                    className="text-red-500 text-sm hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    삭제
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`student-${index}-name`}
                    className="block text-sm font-medium mb-2"
                  >
                    학생 이름 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id={`student-${index}-name`}
                    {...register(`students.${index}.name`)}
                    placeholder="예: 김민준"
                    disabled={isLocked}
                  />
                  {fieldErrors?.name?.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.name.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`student-${index}-phone`}
                    className="block text-sm font-medium mb-2"
                  >
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id={`student-${index}-phone`}
                    {...register(`students.${index}.phone`, {
                      onChange: (event) =>
                        handlePhoneChange(index, "phone", event.target.value),
                    })}
                    placeholder="예: 010-1234-5678"
                    disabled={isLocked}
                  />
                  {fieldErrors?.phone?.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.phone.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`student-${index}-school`}
                    className="block text-sm font-medium mb-2"
                  >
                    학생 학교 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id={`student-${index}-school`}
                    {...register(`students.${index}.school`)}
                    placeholder="예: 서울고등학교"
                    disabled={isLocked}
                  />
                  {fieldErrors?.school?.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.school.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`student-${index}-studentGrade`}
                    className="block text-sm font-medium mb-2"
                  >
                    학생 학년 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id={`student-${index}-studentGrade`}
                    {...register(`students.${index}.studentGrade`)}
                    placeholder="예: 2학년"
                    disabled={isLocked}
                  />
                  {fieldErrors?.studentGrade?.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.studentGrade.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor={`student-${index}-parentPhone`}
                  className="block text-sm font-medium mb-2"
                >
                  학부모 번호 <span className="text-red-500">*</span>
                </label>
                <Input
                  id={`student-${index}-parentPhone`}
                  {...register(`students.${index}.parentPhone`, {
                    onChange: (event) =>
                      handlePhoneChange(
                        index,
                        "parentPhone",
                        event.target.value
                      ),
                  })}
                  placeholder="예: 010-9876-5432"
                  disabled={isLocked}
                />
                {fieldErrors?.parentPhone?.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldErrors.parentPhone.message as string}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`student-${index}-registrationDate`}
                  className="block text-sm font-medium mb-2"
                >
                  학생 등록날짜 <span className="text-red-500">*</span>
                </label>
                <Input
                  id={`student-${index}-registrationDate`}
                  type="date"
                  {...register(`students.${index}.registrationDate`)}
                  disabled={isLocked}
                />
                {fieldErrors?.registrationDate?.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldErrors.registrationDate.message as string}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        type="button"
        onClick={() => append({ ...emptyStudent })}
        variant="outline"
        className="w-full border-dashed"
        disabled={disabled}
      >
        + 학생 추가
      </Button>
    </>
  );
}
