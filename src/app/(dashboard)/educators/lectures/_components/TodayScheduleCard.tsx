"use client";

import { Card, CardContent } from "@/components/ui/card";

type TodayScheduleItem = {
  id: string;
  time: string;
  title: string;
  isActive?: boolean;
};

type TodayScheduleCardProps = {
  dateLabel: string;
  items: TodayScheduleItem[];
  onMoreClick?: () => void;
};

export function TodayScheduleCard({
  dateLabel,
  items,
  onMoreClick,
}: TodayScheduleCardProps) {
  return (
    <Card className="w-full max-w-[360px]">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">오늘 일정</p>
            <p className="text-xs text-muted-foreground">{dateLabel}</p>
          </div>
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={onMoreClick}
            disabled={!onMoreClick}
          >
            더보기 &gt;
          </button>
        </div>

        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-xs text-muted-foreground">
              오늘 예정된 수업이 없습니다.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${
                    item.isActive ? "bg-primary" : "bg-muted-foreground/40"
                  }`}
                />
                <div className="text-xs">
                  <span className="font-semibold">{item.time}</span>
                  <span className="text-muted-foreground"> {item.title}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
