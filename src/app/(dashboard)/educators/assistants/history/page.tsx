"use client";

import {
  CalendarClock,
  ClipboardCheck,
  CheckCircle2,
  ClipboardList,
  ListFilter,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

import AssistantsTabs from "@/app/(dashboard)/educators/assistants/_components/AssistantsTabs";
import Title from "@/components/common/header/Title";
import StatusLabel from "@/components/common/label/StatusLabel";
import { Pagination } from "@/components/common/pagination/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSetBreadcrumb } from "@/hooks/useBreadcrumb";

type TaskStatus = "진행 중" | "완료" | "보류";
type TaskPriority = "높음" | "보통" | "낮음";

type InstructionTask = {
  id: string;
  title: string;
  subtitle: string;
  assistantName: string;
  instructorName: string;
  issuedAt: string;
  dueAt: string;
  priority: TaskPriority;
  status: TaskStatus;
  description: string;
  attachmentCount: number;
};

const mockTasks: InstructionTask[] = [
  {
    id: "task-1",
    title: "고2 수학 A반 업무 점검",
    subtitle: "리포트용 영어 모의평가 채점",
    assistantName: "김민수",
    instructorName: "김지훈",
    issuedAt: "2026-02-06 09:00",
    dueAt: "2026-02-09 18:00",
    priority: "높음",
    status: "진행 중",
    description:
      "A반 모의평가 주관식 채점을 우선 진행하고, 오답률 상위 5문항에 대한 코멘트를 정리해주세요.",
    attachmentCount: 2,
  },
  {
    id: "task-2",
    title: "고3 파이널 대비반 업무 점검",
    subtitle: "영어 독해 기본 평가 채점",
    assistantName: "이지은",
    instructorName: "김지훈",
    issuedAt: "2026-02-05 13:30",
    dueAt: "2026-02-08 22:00",
    priority: "보통",
    status: "완료",
    description:
      "독해 기본 평가지 채점 완료 후 평균 점수와 오답 유형 3가지를 요약해 전달해주세요.",
    attachmentCount: 1,
  },
  {
    id: "task-3",
    title: "고1 수학 B반 업무 점검",
    subtitle: "영어 문법+듣기 종합 채점",
    assistantName: "박성호",
    instructorName: "최서연",
    issuedAt: "2026-02-03 15:00",
    dueAt: "2026-02-07 20:00",
    priority: "낮음",
    status: "진행 중",
    description:
      "종합 평가 채점 후 문법 파트 오답률 기준으로 보충 설명이 필요한 학생 목록을 정리해주세요.",
    attachmentCount: 0,
  },
  {
    id: "task-4",
    title: "중3 국어 문법 특강 업무 정리",
    subtitle: "과제 제출 현황 정리",
    assistantName: "최유리",
    instructorName: "최서연",
    issuedAt: "2026-01-28 10:00",
    dueAt: "2026-02-02 21:00",
    priority: "보통",
    status: "완료",
    description:
      "과제 제출 누락자 명단 및 피드백 필요 학생을 분류해서 전달해주세요.",
    attachmentCount: 1,
  },
  {
    id: "task-5",
    title: "고2 물리 개념완성 업무 확인",
    subtitle: "주간 실험 리포트 검수",
    assistantName: "정우성",
    instructorName: "김지훈",
    issuedAt: "2026-01-23 11:00",
    dueAt: "2026-01-29 18:00",
    priority: "높음",
    status: "보류",
    description:
      "실험 리포트 형식 오류 항목을 정리하고 재제출이 필요한 학생에게 가이드를 안내해주세요.",
    attachmentCount: 3,
  },
  {
    id: "task-6",
    title: "중2 수학 심화반 학습 리포트",
    subtitle: "오답 노트 업데이트",
    assistantName: "김민수",
    instructorName: "최서연",
    issuedAt: "2026-01-18 16:30",
    dueAt: "2026-01-24 20:00",
    priority: "낮음",
    status: "완료",
    description:
      "오답 노트 템플릿 기준으로 개별 학생 업데이트 내역을 정리해주세요.",
    attachmentCount: 0,
  },
];

const PAGE_LIMIT = 5;

const statusOptions: Array<TaskStatus | "전체"> = [
  "전체",
  "진행 중",
  "완료",
  "보류",
];
const priorityOptions: Array<TaskPriority | "전체"> = [
  "전체",
  "높음",
  "보통",
  "낮음",
];
const periodOptions = ["최근 1개월", "최근 3개월", "전체"] as const;

const statusColorMap: Record<TaskStatus, "blue" | "green" | "gray"> = {
  "진행 중": "blue",
  완료: "green",
  보류: "gray",
};

const priorityClassMap: Record<TaskPriority, string> = {
  높음: "bg-red-50 text-red-600",
  보통: "bg-blue-50 text-blue-600",
  낮음: "bg-gray-100 text-gray-600",
};

const priorityDetailLabelMap: Record<TaskPriority, string> = {
  높음: "긴급",
  보통: "보통",
  낮음: "일반",
};

const priorityDetailClassMap: Record<TaskPriority, string> = {
  높음: "bg-red-100 text-red-600",
  보통: "bg-blue-100 text-blue-700",
  낮음: "bg-slate-100 text-slate-600",
};

const now = new Date("2026-02-08T23:59:59");

function getDateByPeriod(period: (typeof periodOptions)[number]) {
  if (period === "전체") {
    return null;
  }

  const base = new Date(now);
  if (period === "최근 1개월") {
    base.setMonth(base.getMonth() - 1);
    return base;
  }

  base.setMonth(base.getMonth() - 3);
  return base;
}

export default function AssistantsTaskHistoryPage() {
  useSetBreadcrumb([{ label: "업무 지시 내역" }]);

  const taskRecords = mockTasks;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>("전체");
  const [priorityFilter, setPriorityFilter] =
    useState<(typeof priorityOptions)[number]>("전체");
  const [periodFilter, setPeriodFilter] =
    useState<(typeof periodOptions)[number]>("최근 1개월");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    const lowerKeyword = searchKeyword.trim().toLowerCase();
    const periodStartDate = getDateByPeriod(periodFilter);

    return taskRecords.filter((task) => {
      const keywordMatched =
        lowerKeyword.length === 0 ||
        task.title.toLowerCase().includes(lowerKeyword) ||
        task.subtitle.toLowerCase().includes(lowerKeyword) ||
        task.assistantName.toLowerCase().includes(lowerKeyword);

      const statusMatched =
        statusFilter === "전체" || task.status === statusFilter;
      const priorityMatched =
        priorityFilter === "전체" || task.priority === priorityFilter;

      const issuedDate = new Date(task.issuedAt.replace(" ", "T"));
      const periodMatched =
        periodStartDate === null ||
        (issuedDate >= periodStartDate && issuedDate <= now);

      return (
        keywordMatched && statusMatched && priorityMatched && periodMatched
      );
    });
  }, [periodFilter, priorityFilter, searchKeyword, statusFilter, taskRecords]);

  const totalCount = filteredTasks.length;
  const totalPage = Math.max(1, Math.ceil(totalCount / PAGE_LIMIT));
  const safeCurrentPage = Math.min(currentPage, totalPage);
  const hasNextPage = safeCurrentPage < totalPage;
  const hasPrevPage = safeCurrentPage > 1;

  const paginatedTasks = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PAGE_LIMIT;
    return filteredTasks.slice(startIndex, startIndex + PAGE_LIMIT);
  }, [filteredTasks, safeCurrentPage]);

  const selectedTask =
    selectedTaskId === null
      ? null
      : (taskRecords.find((task) => task.id === selectedTaskId) ?? null);

  const progressCount = taskRecords.filter(
    (task) => task.status === "진행 중"
  ).length;
  const completedCount = taskRecords.filter(
    (task) => task.status === "완료"
  ).length;

  const pagination = {
    totalCount,
    totalPage,
    currentPage: safeCurrentPage,
    limit: PAGE_LIMIT,
    hasNextPage,
    hasPrevPage,
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Title
            title="업무 지시 내역 관리"
            description="조교에게 배정된 업무를 모니터링하고 진행 현황을 관리합니다."
          />
        </div>

        <AssistantsTabs active="history" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">전체 업무</p>
                <p className="mt-2 text-3xl font-bold">{taskRecords.length}</p>
                <p className="mt-2 text-xs text-emerald-500">+12%</p>
              </div>
              <div className="rounded-xl bg-muted p-3 text-muted-foreground">
                <CalendarClock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">진행 중</p>
                <p className="mt-2 text-3xl font-bold">{progressCount}</p>
                <p className="mt-2 text-xs text-blue-500">+5%</p>
              </div>
              <div className="rounded-xl bg-muted p-3 text-muted-foreground">
                <ClipboardList className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">완료</p>
                <p className="mt-2 text-3xl font-bold">{completedCount}</p>
                <p className="mt-2 text-xs text-emerald-500">-2%</p>
              </div>
              <div className="rounded-xl bg-muted p-3 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchKeyword}
                onChange={(event) => {
                  setSearchKeyword(event.target.value);
                  resetPagination();
                }}
                placeholder="업무 제목 또는 조교 이름으로 검색"
                className="pl-9"
              />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:flex xl:flex-wrap">
              <Select
                value={statusFilter}
                onValueChange={(value: (typeof statusOptions)[number]) => {
                  setStatusFilter(value);
                  resetPagination();
                }}
              >
                <SelectTrigger className="w-full xl:w-[130px]">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      상태: {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={priorityFilter}
                onValueChange={(value: (typeof priorityOptions)[number]) => {
                  setPriorityFilter(value);
                  resetPagination();
                }}
              >
                <SelectTrigger className="w-full xl:w-[140px]">
                  <SelectValue placeholder="우선순위" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      우선순위: {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={periodFilter}
                onValueChange={(value: (typeof periodOptions)[number]) => {
                  setPeriodFilter(value);
                  resetPagination();
                }}
              >
                <SelectTrigger className="w-full xl:w-[150px]">
                  <SelectValue placeholder="기간" />
                </SelectTrigger>
                <SelectContent>
                  {periodOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      기간: {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-xs text-muted-foreground">
              읽기 전용 미리보기 화면입니다.
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <ListFilter className="h-4 w-4" />
            <span>총 {totalCount}건의 업무 내역</span>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>업무 제목</TableHead>
                  <TableHead>담당 조교</TableHead>
                  <TableHead>지시자</TableHead>
                  <TableHead>지시 일자</TableHead>
                  <TableHead>우선순위</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTasks.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-muted-foreground"
                    >
                      조건에 맞는 업무 내역이 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <button
                            type="button"
                            className="text-left text-sm font-semibold text-primary underline-offset-2 hover:underline"
                            onClick={() => setSelectedTaskId(task.id)}
                          >
                            {task.title}
                          </button>
                          <p className="text-xs text-muted-foreground">
                            {task.subtitle}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {task.assistantName}
                      </TableCell>
                      <TableCell>{task.instructorName}</TableCell>
                      <TableCell>{task.issuedAt}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${priorityClassMap[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusLabel color={statusColorMap[task.status]}>
                          {task.status}
                        </StatusLabel>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <Pagination pagination={pagination} onPageChange={setCurrentPage} />
        </CardContent>
      </Card>

      <Dialog
        open={selectedTask !== null}
        onOpenChange={(open) => !open && setSelectedTaskId(null)}
      >
        {selectedTask ? (
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            <DialogHeader className="text-left">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/10 p-2 text-primary">
                  <ClipboardCheck className="h-5 w-5" />
                </span>
                <div>
                  <DialogTitle className="text-xl font-bold">
                    업무 상세 정보
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    지시 일자 · {selectedTask.issuedAt}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="rounded-lg border bg-muted/40 px-4 py-4 text-sm">
              <div className="mb-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${priorityDetailClassMap[selectedTask.priority]}`}
                >
                  {priorityDetailLabelMap[selectedTask.priority]}
                </span>
              </div>
              <p className="text-lg font-bold leading-tight">
                {selectedTask.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedTask.subtitle}
              </p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="grid gap-4 rounded-lg border bg-background px-4 py-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    담당 조교
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {selectedTask.assistantName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    지시 일자
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {selectedTask.issuedAt}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">업무 내용</p>
                <div className="rounded-lg border bg-background px-4 py-3 text-sm leading-relaxed">
                  {selectedTask.description}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">첨부파일</p>
                <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 px-4 py-5 text-center text-sm text-muted-foreground">
                  {selectedTask.attachmentCount > 0
                    ? `연결된 첨부파일 ${selectedTask.attachmentCount}개`
                    : "연결된 첨부파일이 없습니다."}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">상태</p>
                <StatusLabel color={statusColorMap[selectedTask.status]}>
                  {selectedTask.status}
                </StatusLabel>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setSelectedTaskId(null)}
              >
                닫기
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}
