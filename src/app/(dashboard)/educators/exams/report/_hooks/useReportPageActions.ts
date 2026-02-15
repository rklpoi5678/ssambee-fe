"use client";

import { useReportStore } from "@/stores/report.store";

export const useReportPageActions = () => {
  const {
    selectClass,
    selectExam,
    selectStudent,
    selectTemplate,
    setCommonMessage,
    saveExamCommonMessage,
    getSelectedStudent,
    clearSelection,
  } = useReportStore();

  return {
    selectClass,
    selectExam,
    selectStudent,
    selectTemplate,
    setCommonMessage,
    saveExamCommonMessage,
    getSelectedStudent,
    clearSelection,
  };
};
