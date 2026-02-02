"use client";

import { Lecture, LectureStatus } from "@/types/lectures";
import { InfoRow } from "@/components/common/InfoRow";

type LectureDetailReadOnlyProps = {
  lecture: Lecture;
  currentStudents: number;
  scheduleSummary: string;
  subjectOverride?: string;
  gradeOverride?: string;
  statusOverride?: LectureStatus | "";
  startDateOverride?: string;
  instructorOverride?: string;
};

export function LectureDetailReadOnly({
  lecture,
  currentStudents,
  scheduleSummary,
  subjectOverride,
  gradeOverride,
  statusOverride,
  startDateOverride,
  instructorOverride,
}: LectureDetailReadOnlyProps) {
  return (
    <div className="space-y-4">
      <InfoRow label="수업명">{lecture.name}</InfoRow>
      <InfoRow label="등록 학생">{currentStudents}명</InfoRow>
      <InfoRow label="과목">{subjectOverride || lecture.subject}</InfoRow>
      <InfoRow label="학년">{gradeOverride || lecture.grade}</InfoRow>
      <InfoRow label="수업 상태">
        {statusOverride ? statusOverride : (lecture.status ?? "-")}
      </InfoRow>
      <InfoRow label="개강일">
        {startDateOverride || lecture.startDate || "-"}
      </InfoRow>
      <InfoRow label="시간표">{scheduleSummary}</InfoRow>
      <InfoRow label="담당 강사">
        {instructorOverride || lecture.instructor}
      </InfoRow>
    </div>
  );
}
