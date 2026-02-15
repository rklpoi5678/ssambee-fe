"use client";

import { useReportPageActions } from "./useReportPageActions";
import { useReportPageResources } from "./useReportPageResources";
import { useReportPageState } from "./useReportPageState";

export const useReportPage = () => {
  const state = useReportPageState();
  const resources = useReportPageResources();
  const actions = useReportPageActions();

  return {
    ...state,
    ...resources,
    ...actions,
  };
};
