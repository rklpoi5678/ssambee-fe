"use client";

import { Button } from "@/components/ui/button";

type LectureDetailEnrollmentProps = {
  currentStudents: number;
  maxStudents?: number | null;
  onOpenExams: () => void;
};

export function LectureDetailEnrollment({
  currentStudents,
  maxStudents,
  onOpenExams,
}: LectureDetailEnrollmentProps) {
  const maxText =
    maxStudents && maxStudents > 0 ? `${maxStudents}명` : "정원 미정";

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">수강 인원</p>
        <p className="font-medium">
          {currentStudents} / {maxText}
        </p>
      </div>
      <Button
        variant="outline"
        className="h-9 px-4 text-sm"
        onClick={onOpenExams}
      >
        시험지목록
      </Button>
    </div>
  );
}
