"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type LectureDetailHeaderProps = {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEditStart: () => void;
  onClose: () => void;
};

export function LectureDetailHeader({
  isEditing,
  onSave,
  onCancel,
  onEditStart,
  onClose,
}: LectureDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">수업 상세</DialogTitle>
      </DialogHeader>
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button onClick={onSave}>완료</Button>
            <Button variant="outline" onClick={onCancel}>
              취소
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onEditStart}>수정하기</Button>
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
