"use client";

import { Briefcase, CalendarCheck, ClipboardList, Users } from "lucide-react";
import { useMemo, useState } from "react";

import AssistantsFiltersBar from "@/app/(dashboard)/educators/assistants/_components/AssistantsFiltersBar";
import AssistantsHeader from "@/app/(dashboard)/educators/assistants/_components/AssistantsHeader";
import AssistantsStatsGrid from "@/app/(dashboard)/educators/assistants/_components/AssistantsStatsGrid";
import AssistantsTable from "@/app/(dashboard)/educators/assistants/_components/AssistantsTable";
import AssistantDetailModal from "@/app/(dashboard)/educators/assistants/_modals/AssistantDetailModal";
import ContractManageModal from "@/app/(dashboard)/educators/assistants/_modals/ContractManageModal";
import ContractSendModal from "@/app/(dashboard)/educators/assistants/_modals/ContractSendModal";
import ResourceLibraryModal from "@/app/(dashboard)/educators/assistants/_modals/ResourceLibraryModal";
import TaskCreateModal from "@/app/(dashboard)/educators/assistants/_modals/TaskCreateModal";
import {
  assistants,
  type Assistant,
  type AssistantDetailDraft,
  contractRecords,
  contractStatusClassMap,
  contractTemplateOptions,
  createAssistantDetailDraft,
  editableStatusOptions,
  PAGE_LIMIT,
  resourceCategoryOptions,
  resourceLibraryItems,
  statusColorMap,
  type AssistantsListView,
} from "@/app/(dashboard)/educators/assistants/_types/assistants";
import { useSetBreadcrumb } from "@/hooks/useBreadcrumb";

type AssistantsModalType =
  | "none"
  | "task"
  | "contractManage"
  | "sendContract"
  | "assistantDetail";

const stats: Array<{
  label: string;
  value: string;
  delta: string;
  icon: typeof Users;
  accent: string;
  href?: string;
  modal?: AssistantsModalType;
}> = [
  {
    label: "전체 배정 조교",
    value: "5",
    delta: "+1명",
    icon: Users,
    accent: "text-emerald-400",
  },
  {
    label: "현재 근무 중",
    value: "2",
    delta: "40%",
    icon: Briefcase,
    accent: "text-sky-400",
  },
  {
    label: "조교 계약서 관리",
    value: "3건",
    delta: "미제출 2건",
    icon: ClipboardList,
    accent: "text-amber-300",
    modal: "contractManage",
  },
  {
    label: "업무 지시 내역",
    value: "128건",
    delta: "이번 주 +12건",
    icon: CalendarCheck,
    accent: "text-emerald-300",
    href: "/educators/assistants/history",
  },
];

export default function AssistantsPage() {
  useSetBreadcrumb([{ label: "조교 관리" }]);

  const [assistantRecords, setAssistantRecords] =
    useState<Assistant[]>(assistants);
  const [assistantsListView, setAssistantsListView] =
    useState<AssistantsListView>("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState<AssistantsModalType>("none");
  const [selectedAssistantId, setSelectedAssistantId] = useState(
    assistants[0]?.id ?? ""
  );
  const [assistantDetailDraft, setAssistantDetailDraft] =
    useState<AssistantDetailDraft>(() =>
      createAssistantDetailDraft(assistants[0])
    );
  const [isEditingAssistantDetail, setIsEditingAssistantDetail] =
    useState(false);
  const [sendTargetId, setSendTargetId] = useState(
    contractRecords[0]?.assistantId ?? assistants[0]?.id ?? ""
  );
  const [sendTemplate, setSendTemplate] = useState<
    (typeof contractTemplateOptions)[number]
  >(contractTemplateOptions[0]);
  const [uploadFileName, setUploadFileName] = useState("선택된 파일 없음");
  const [taskInstructionContent, setTaskInstructionContent] = useState("");
  const [isResourceLibraryModalOpen, setResourceLibraryModalOpen] =
    useState(false);
  const [attachedResourceIds, setAttachedResourceIds] = useState<string[]>([]);
  const [libraryDraftResourceIds, setLibraryDraftResourceIds] = useState<
    string[]
  >([]);
  const [resourceSearchKeyword, setResourceSearchKeyword] = useState("");
  const [resourceCategoryFilter, setResourceCategoryFilter] =
    useState<(typeof resourceCategoryOptions)[number]>("전체");
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const filteredAssistants = useMemo(
    () =>
      assistantRecords.filter((assistant) =>
        assistantsListView === "retired"
          ? assistant.status === "퇴사"
          : assistant.status !== "퇴사"
      ),
    [assistantRecords, assistantsListView]
  );

  const totalCount = filteredAssistants.length;
  const totalPage = Math.max(1, Math.ceil(totalCount / PAGE_LIMIT));
  const resolvedCurrentPage = Math.min(currentPage, totalPage);
  const hasNextPage = resolvedCurrentPage < totalPage;
  const hasPrevPage = resolvedCurrentPage > 1;
  const paginatedAssistants = useMemo(() => {
    const startIndex = (resolvedCurrentPage - 1) * PAGE_LIMIT;
    return filteredAssistants.slice(startIndex, startIndex + PAGE_LIMIT);
  }, [filteredAssistants, resolvedCurrentPage]);

  const pagination = {
    totalCount,
    totalPage,
    currentPage: resolvedCurrentPage,
    limit: PAGE_LIMIT,
    hasNextPage,
    hasPrevPage,
  };

  const selectedAssistant =
    assistantRecords.find(
      (assistant) => assistant.id === selectedAssistantId
    ) ?? assistantRecords[0];

  const selectedTargetAssistant =
    assistantRecords.find((assistant) => assistant.id === sendTargetId) ??
    assistantRecords[0];

  const attachedResources = useMemo(
    () =>
      resourceLibraryItems.filter((item) =>
        attachedResourceIds.includes(item.id)
      ),
    [attachedResourceIds]
  );

  const filteredResourceLibraryItems = useMemo(() => {
    const normalizedKeyword = resourceSearchKeyword.trim().toLowerCase();

    return resourceLibraryItems.filter((resource) => {
      const categoryMatched =
        resourceCategoryFilter === "전체" ||
        resource.category === resourceCategoryFilter;
      const keywordMatched =
        normalizedKeyword.length === 0 ||
        resource.title.toLowerCase().includes(normalizedKeyword) ||
        resource.category.toLowerCase().includes(normalizedKeyword);

      return categoryMatched && keywordMatched;
    });
  }, [resourceCategoryFilter, resourceSearchKeyword]);

  const openAssistantDetailModal = (assistantId: string) => {
    const assistant = assistantRecords.find((item) => item.id === assistantId);
    if (!assistant) {
      return;
    }

    setSelectedAssistantId(assistant.id);
    setAssistantDetailDraft(createAssistantDetailDraft(assistant));
    setIsEditingAssistantDetail(false);
    setActiveModal("assistantDetail");
  };

  const closeAssistantDetailModal = () => {
    setIsEditingAssistantDetail(false);
    setActiveModal("none");
  };

  const saveAssistantDetail = () => {
    setAssistantRecords((prev) =>
      prev.map((assistant) =>
        assistant.id === selectedAssistantId
          ? {
              ...assistant,
              status: assistantDetailDraft.status,
              memo: assistantDetailDraft.memo,
            }
          : assistant
      )
    );
    setIsEditingAssistantDetail(false);
    setPreviewNotice("조교 상세 정보가 저장되었습니다. (UI-only)");
  };

  const retireAssistant = () => {
    if (!selectedAssistant || selectedAssistant.status === "퇴사") {
      return;
    }

    setAssistantRecords((prev) =>
      prev.map((assistant) =>
        assistant.id === selectedAssistant.id
          ? {
              ...assistant,
              status: "퇴사",
            }
          : assistant
      )
    );
    setAssistantsListView("retired");
    setCurrentPage(1);
    setIsEditingAssistantDetail(false);
    setPreviewNotice(
      `${selectedAssistant.name} 조교가 퇴사자로 이동되었습니다. (UI-only)`
    );
    closeAssistantDetailModal();
  };

  const openContractSendModal = () => {
    setActiveModal("sendContract");
  };

  const openContractManageModal = () => {
    setActiveModal("contractManage");
  };

  const setPreviewNotice = (message: string) => {
    setActionNotice(message);
  };

  const openResourceLibraryModal = () => {
    setLibraryDraftResourceIds(attachedResourceIds);
    setResourceLibraryModalOpen(true);
  };

  const closeResourceLibraryModal = () => {
    setResourceLibraryModalOpen(false);
    setResourceSearchKeyword("");
    setResourceCategoryFilter("전체");
    setLibraryDraftResourceIds([]);
  };

  const toggleDraftResourceSelection = (resourceId: string) => {
    setLibraryDraftResourceIds((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const applyResourceSelection = () => {
    setAttachedResourceIds(libraryDraftResourceIds);
    setPreviewNotice(
      `자료실 첨부 항목 ${libraryDraftResourceIds.length}건이 반영되었습니다. (UI-only)`
    );
    closeResourceLibraryModal();
  };

  const removeAttachedResource = (resourceId: string) => {
    setAttachedResourceIds((prev) => prev.filter((id) => id !== resourceId));
  };

  const closeTaskModal = () => {
    setTaskInstructionContent("");
    setAttachedResourceIds([]);
    setLibraryDraftResourceIds([]);
    setResourceSearchKeyword("");
    setResourceCategoryFilter("전체");
    setResourceLibraryModalOpen(false);
    setActiveModal("none");
  };

  return (
    <div className="container mx-auto space-y-8 p-6">
      <AssistantsHeader
        activeTab={
          activeModal === "contractManage" || activeModal === "sendContract"
            ? "contracts"
            : "manage"
        }
        onTabClick={(tab) => {
          if (tab === "contracts") {
            openContractManageModal();
            return;
          }

          if (tab === "manage") {
            setActiveModal("none");
          }
        }}
        onOpenTaskModal={() => setActiveModal("task")}
        actionNotice={actionNotice}
      />

      <AssistantsStatsGrid
        stats={stats}
        onOpenContractManageModal={openContractManageModal}
      />

      <AssistantsFiltersBar
        listView={assistantsListView}
        onChangeListView={(view) => {
          setAssistantsListView(view);
          setCurrentPage(1);
        }}
      />

      <AssistantsTable
        listView={assistantsListView}
        totalCount={totalCount}
        assistants={paginatedAssistants}
        statusColorMap={statusColorMap}
        pagination={pagination}
        onOpenAssistantDetail={openAssistantDetailModal}
        onPageChange={setCurrentPage}
      />

      <ContractManageModal
        open={activeModal === "contractManage"}
        onOpenChange={(open) => {
          if (open) {
            openContractManageModal();
            return;
          }

          setActiveModal("none");
        }}
        contractRecords={contractRecords}
        assistantRecords={assistantRecords}
        contractStatusClassMap={contractStatusClassMap}
        onOpenContractSend={openContractSendModal}
        onPreviewNotice={setPreviewNotice}
      />

      <ContractSendModal
        open={activeModal === "sendContract"}
        onOpenChange={(open) => {
          if (open) {
            openContractSendModal();
            return;
          }

          setActiveModal("none");
        }}
        assistantRecords={assistantRecords}
        sendTargetId={sendTargetId}
        onChangeSendTargetId={setSendTargetId}
        selectedTargetAssistant={selectedTargetAssistant}
        sendTemplate={sendTemplate}
        contractTemplateOptions={contractTemplateOptions}
        onChangeSendTemplate={(template) =>
          setSendTemplate(template as (typeof contractTemplateOptions)[number])
        }
        uploadFileName={uploadFileName}
        onChangeUploadFileName={setUploadFileName}
        onOpenContractManage={openContractManageModal}
        onPreviewNotice={setPreviewNotice}
      />

      <AssistantDetailModal
        open={activeModal === "assistantDetail"}
        onOpenChange={(open) => {
          if (open) {
            setActiveModal("assistantDetail");
            return;
          }

          closeAssistantDetailModal();
        }}
        selectedAssistant={selectedAssistant}
        assistantDetailDraft={assistantDetailDraft}
        isEditingAssistantDetail={isEditingAssistantDetail}
        editableStatusOptions={editableStatusOptions}
        onChangeStatus={(status) =>
          setAssistantDetailDraft((prev) => ({
            ...prev,
            status,
          }))
        }
        onChangeMemo={(memo) =>
          setAssistantDetailDraft((prev) => ({
            ...prev,
            memo,
          }))
        }
        onRetireAssistant={retireAssistant}
        onCancelEdit={() => {
          setAssistantDetailDraft(
            createAssistantDetailDraft(selectedAssistant)
          );
          setIsEditingAssistantDetail(false);
        }}
        onSaveDetail={saveAssistantDetail}
        onCloseDetail={closeAssistantDetailModal}
        onStartEdit={() => {
          setAssistantDetailDraft(
            createAssistantDetailDraft(selectedAssistant)
          );
          setIsEditingAssistantDetail(true);
          setPreviewNotice("수정 모드가 활성화되었습니다.");
        }}
      />

      <TaskCreateModal
        open={activeModal === "task"}
        onOpenChange={(open) =>
          open ? setActiveModal("task") : closeTaskModal()
        }
        taskInstructionContent={taskInstructionContent}
        onChangeTaskInstructionContent={setTaskInstructionContent}
        attachedResources={attachedResources}
        onOpenResourceLibraryModal={openResourceLibraryModal}
        onRemoveAttachedResource={removeAttachedResource}
        onCancel={closeTaskModal}
        onSubmit={() => {
          setPreviewNotice("업무 지시 등록은 UI 미리보기 단계입니다.");
          closeTaskModal();
        }}
      />

      <ResourceLibraryModal
        open={isResourceLibraryModalOpen}
        onOpenChange={(open) => {
          if (open) {
            openResourceLibraryModal();
            return;
          }

          closeResourceLibraryModal();
        }}
        resourceSearchKeyword={resourceSearchKeyword}
        onChangeResourceSearchKeyword={setResourceSearchKeyword}
        resourceCategoryFilter={resourceCategoryFilter}
        resourceCategoryOptions={resourceCategoryOptions}
        onChangeResourceCategoryFilter={setResourceCategoryFilter}
        filteredResourceLibraryItems={filteredResourceLibraryItems}
        libraryDraftResourceIds={libraryDraftResourceIds}
        onToggleDraftResourceSelection={toggleDraftResourceSelection}
        onCancel={closeResourceLibraryModal}
        onApply={applyResourceSelection}
      />
    </div>
  );
}
