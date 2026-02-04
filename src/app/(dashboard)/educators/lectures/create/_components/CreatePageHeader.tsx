"use client";

import { Button } from "@/components/ui/button";

type CreatePageHeaderProps = {
  isSaved: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export function CreatePageHeader({
  isSaved,
  onSave,
  onCancel,
}: CreatePageHeaderProps) {
  return (
    <div className="bg-white border-b border-[#e9ebf0] px-16 py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[28px] font-bold leading-[38px] tracking-[-0.28px] text-[#040405]">
            수업 개설하기
          </h1>
          <p className="text-[20px] font-medium leading-[28px] tracking-[-0.2px] text-[rgba(22,22,27,0.4)]">
            새로운 강의를 개설하고 수강생을 모집해보세요.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={onSave}
            disabled={isSaved}
            className="h-14 rounded-xl bg-[#3863f6] px-10 text-[16px] font-semibold leading-[24px] tracking-[-0.16px] text-white shadow-[0_0_14px_rgba(138,138,138,0.08)]"
          >
            개설하기
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="h-14 rounded-xl border border-[#ced9fd] bg-[#f4f6fe] px-10 text-[16px] font-semibold leading-[24px] tracking-[-0.16px] text-[#3863f6] shadow-[0_0_14px_rgba(138,138,138,0.08)]"
          >
            나가기
          </Button>
        </div>
      </div>
    </div>
  );
}
