"use client";

import { Button } from "@/components/ui/button";
import { Lecture } from "@/types/lectures";
import { useLectureDetailModalStore } from "@/stores/lectures";

import { LectureDetailModal } from "../_detail-modal/LectureDetailModal";

import { LectureCard } from "./LectureCard";

type LecturesListProps = {
  lectures: Lecture[];
  totalCount: number;
  limit: number;
  isLoading: boolean;
  onLoadMore: () => void;
  onReset: () => void;
};

export function LecturesList({
  lectures,
  totalCount,
  limit,
  isLoading,
  onLoadMore,
  onReset,
}: LecturesListProps) {
  const selectedLectureId = useLectureDetailModalStore(
    (state) => state.selectedLectureId
  );
  const isModalOpen = useLectureDetailModalStore((state) => state.isOpen);
  const closeModal = useLectureDetailModalStore((state) => state.close);
  const selectedLecture =
    lectures.find((lecture) => lecture.id === selectedLectureId) ?? null;
  const hasMore = totalCount > limit;
  const isExpanded = limit > 4;
  const remaining = Math.max(totalCount - limit, 0);

  return (
    <div className="space-y-6">
      {/* 카드 그리드 - 2x2 형태 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {isLoading && (
          <div className="col-span-2 text-center text-sm text-muted-foreground">
            로딩 중...
          </div>
        )}
        {!isLoading && lectures.length === 0 && (
          <div className="col-span-2 text-center text-sm text-muted-foreground">
            등록된 수업이 없습니다.
          </div>
        )}
        {!isLoading &&
          lectures.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
      </div>

      {/* 더보기/접기 버튼 */}
      <div className="flex justify-center gap-3">
        {hasMore && (
          <Button
            onClick={onLoadMore}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            더보기 ({remaining})
          </Button>
        )}
        {isExpanded && (
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            접기
          </Button>
        )}
      </div>

      <LectureDetailModal
        lecture={selectedLecture}
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      />
    </div>
  );
}
