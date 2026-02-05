"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateLecture } from "@/hooks/lectures/useCreateLecture";
import { useLectureCreateStore } from "@/stores/lectures";
import {
  lectureFormSchema,
  LectureFormInput,
} from "@/validation/lecture.validation";
import { useSetBreadcrumb } from "@/hooks/useBreadcrumb";

import { CreatePageHeader } from "./_components/CreatePageHeader";
import { LectureInfoSection } from "./_components/LectureInfoSection";
import { LectureScheduleSection } from "./_components/LectureScheduleSection";
import { ManualStudentForm } from "./_components/ManualStudentForm";
import { StudentRegistrationSection } from "./_components/StudentRegistrationSection";
import { useLectureCreateForm } from "./_hooks/useLectureCreateForm";

export default function LectureCreatePage() {
  const router = useRouter();

  useSetBreadcrumb([
    { label: "수업 관리", href: "/educators/lectures" },
    { label: "수업 개설" },
  ]);

  const schedules = useLectureCreateStore((state) => state.schedules);
  const scheduleData = useLectureCreateStore((state) => state.scheduleData);
  const isSaved = useLectureCreateStore((state) => state.isSaved);
  const addSchedule = useLectureCreateStore((state) => state.addSchedule);
  const removeSchedule = useLectureCreateStore((state) => state.removeSchedule);
  const setScheduleData = useLectureCreateStore(
    (state) => state.setScheduleData
  );
  const setIsSaved = useLectureCreateStore((state) => state.setIsSaved);
  const resetCreateState = useLectureCreateStore((state) => state.reset);

  // React Hook Form 적용
  const lectureForm = useForm<LectureFormInput>({
    resolver: zodResolver(lectureFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      subject: "",
      schoolYear: "",
      startDate: "",
      status: "개강전",
      students: [
        {
          name: "",
          phone: "",
          school: "",
          studentGrade: "",
          parentPhone: "",
          registrationDate: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: lectureForm.control,
    name: "students",
  });

  useEffect(() => {
    return () => {
      resetCreateState();
    };
  }, [resetCreateState]);

  const createLectureMutation = useCreateLecture();

  const handleAddSchedule = () => {
    if (isSaved) return;
    addSchedule();
  };

  const handleRemoveSchedule = (id: number) => {
    if (isSaved) return;
    removeSchedule(id);
  };

  const { handleSave, handleCancel } = useLectureCreateForm({
    lectureForm,
    schedules,
    scheduleData,
    createLecture: createLectureMutation,
    setIsSaved,
    resetCreateState,
    onSuccess: () => {
      setIsSaved(true);
      router.push("/educators/lectures");
    },
  });

  const onCancel = () => handleCancel(isSaved, () => router.back());

  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      <CreatePageHeader
        isSaved={isSaved}
        onSave={handleSave}
        onCancel={onCancel}
      />
      <div className="py-20">
        <div className="mx-auto flex max-w-[1440px] gap-10 px-[140px]">
          <div className="flex flex-1 flex-col gap-10">
            <LectureInfoSection form={lectureForm} disabled={isSaved} />

            <LectureScheduleSection
              schedules={schedules}
              scheduleData={scheduleData}
              disabled={isSaved}
              onAdd={handleAddSchedule}
              onRemove={handleRemoveSchedule}
              onScheduleDataChange={setScheduleData}
            />
          </div>

          <div className="flex flex-1 flex-col">
            <StudentRegistrationSection
              disabled={isSaved}
              actionLabel="+ 학생 추가"
              onAction={() =>
                append({
                  name: "",
                  phone: "",
                  school: "",
                  studentGrade: "",
                  parentPhone: "",
                  registrationDate: "",
                })
              }
            >
              <ManualStudentForm
                form={lectureForm}
                fields={fields}
                onRemove={remove}
                disabled={isSaved}
              />
            </StudentRegistrationSection>
          </div>
        </div>
      </div>
    </div>
  );
}
