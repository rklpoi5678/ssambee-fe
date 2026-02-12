import type { LucideIcon } from "lucide-react";

import type { AssistantOrdersStatsApi } from "@/types/assistantOrders";

export type AssistantStatus = "근무전" | "근무중" | "퇴사";

export type Assistant = {
  id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
  className: string;
  task: string;
  memo: string;
  status: AssistantStatus;
  badge: string;
};

export type AssistantDetailDraft = {
  status: AssistantStatus;
  memo: string;
};

export type ContractStatus = "서명 완료" | "서명 대기" | "재전송 필요";

export type ContractRecord = {
  id: string;
  assistantId: string;
  updatedAt: string;
  fileName: string;
  status: ContractStatus;
};

export type ResourceLibraryCategory = "수업자료" | "평가자료" | "운영문서";

export type ResourceLibraryItem = {
  id: string;
  title: string;
  category: ResourceLibraryCategory;
  updatedAt: string;
  sizeLabel: string;
};

export type AssistantsListView = "active" | "retired";

export type AssistantsPagination = {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type AssistantsModalType =
  | "none"
  | "task"
  | "contractManage"
  | "sendContract"
  | "assistantDetail";

export type ActiveStatusFilter = "근무중" | "근무전" | "퇴사" | "전체";

export type AssistantsSummary = {
  totalAssignedCount: number;
  workingCount: number;
  pendingCount: number;
  submittedContractCount: number;
  missingContractCount: number;
};

export type AssistantsStatItem = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  accent: string;
  href?: string;
  modal?: AssistantsModalType;
};

export type AssistantsDashboardSummary = {
  summary: AssistantsSummary;
  ordersStats: AssistantOrdersStatsApi | null;
};
