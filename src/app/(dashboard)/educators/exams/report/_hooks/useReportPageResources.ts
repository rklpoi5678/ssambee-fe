"use client";

import { useReportStore } from "@/stores/report.store";

export const useReportPageResources = () => {
  const {
    isLoadingClasses,
    isLoadingExams,
    isLoadingStudents,
    isCommonSaving,
    loadClasses,
    loadExamCommonMessage,
  } = useReportStore();

  return {
    isLoadingClasses,
    isLoadingExams,
    isLoadingStudents,
    isCommonSaving,
    loadClasses,
    loadExamCommonMessage,
  };
};
