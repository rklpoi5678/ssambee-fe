"use client";

import { useReportStore } from "@/stores/report.store";

export const useReportPageState = () => {
  const {
    classes,
    exams,
    students,
    selectedClassId,
    selectedExamId,
    selectedStudentId,
    selectedTemplate,
    commonMessage,
    isCommonSaved,
    commonSaveResult,
  } = useReportStore();

  return {
    classes,
    exams,
    students,
    selectedClassId,
    selectedExamId,
    selectedStudentId,
    selectedTemplate,
    commonMessage,
    isCommonSaved,
    commonSaveResult,
  };
};
