import { CheckSquare, ClipboardCheck, FileText } from "lucide-react";

import { type ResourceLibraryItem } from "@/app/(dashboard)/educators/assistants/_types/assistants";
import TiptapEditor from "@/components/common/editor/TiptapEditor";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type TaskCreateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskInstructionContent: string;
  onChangeTaskInstructionContent: (content: string) => void;
  attachedResources: ResourceLibraryItem[];
  onOpenResourceLibraryModal: () => void;
  onRemoveAttachedResource: (resourceId: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function TaskCreateModal({
  open,
  onOpenChange,
  taskInstructionContent,
  onChangeTaskInstructionContent,
  attachedResources,
  onOpenResourceLibraryModal,
  onRemoveAttachedResource,
  onCancel,
  onSubmit,
}: TaskCreateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                새 업무 지시 등록
              </DialogTitle>
              <DialogDescription className="mt-1">
                김민수 조교에게 업무를 전달합니다.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
          업무 지시는 상세 모달 기준으로 저장되어 조교에게 즉시 전달됩니다.
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">대상 조교</p>
          <div className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>김</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">김민수</p>
              <p className="text-xs text-muted-foreground">010-1234-5678</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">지시자</label>
            <Input placeholder="강사 담당자" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">업무명</label>
            <Input placeholder="예: 중등 2학년 1학기 기말고사 채점" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">우선순위</label>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" className="rounded-full">
                높음
              </Button>
              <Button className="rounded-full">보통</Button>
              <Button variant="secondary" className="rounded-full">
                낮음
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">업무 내용</label>
          <TiptapEditor
            content={taskInstructionContent}
            onChange={onChangeTaskInstructionContent}
            placeholder="업무에 대한 상세한 내용을 입력해주세요."
            className="min-h-[240px]"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">첨부 자료</label>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={onOpenResourceLibraryModal}
            >
              자료실에서 선택
            </Button>
          </div>

          {attachedResources.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-5 text-sm text-muted-foreground">
              선택된 자료가 없습니다. 자료실에서 검색 후 선택해 첨부하세요.
            </div>
          ) : (
            <div className="space-y-2">
              {attachedResources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between rounded-lg border bg-muted/20 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {resource.category} · {resource.updatedAt} ·{" "}
                        {resource.sizeLabel}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-8 px-3 text-xs"
                    onClick={() => onRemoveAttachedResource(resource.id)}
                  >
                    제거
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" className="rounded-full" onClick={onCancel}>
            취소
          </Button>
          <Button className="rounded-full" onClick={onSubmit}>
            <CheckSquare className="h-4 w-4" />
            지시 등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
