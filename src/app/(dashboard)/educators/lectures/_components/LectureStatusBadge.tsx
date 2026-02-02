"use client";

import { LECTURE_STATUS_BADGE_CLASSES } from "@/constants/lectures.constants";
import { LectureStatus } from "@/types/lectures";

type LectureStatusBadgeProps = {
  status: LectureStatus;
};

export function LectureStatusBadge({ status }: LectureStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${LECTURE_STATUS_BADGE_CLASSES[status]}`}
    >
      {status}
    </span>
  );
}
