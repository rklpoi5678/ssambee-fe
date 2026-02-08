import { Search } from "lucide-react";

import { type AssistantsListView } from "@/app/(dashboard)/educators/assistants/_types/assistants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AssistantsFiltersBarProps = {
  listView: AssistantsListView;
  onChangeListView: (view: AssistantsListView) => void;
};

export default function AssistantsFiltersBar({
  listView,
  onChangeListView,
}: AssistantsFiltersBarProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="조교 이름 또는 연락처 검색" className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={listView === "active" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => onChangeListView("active")}
            >
              재직
            </Button>
            <Button
              type="button"
              variant={listView === "retired" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => onChangeListView("retired")}
            >
              퇴사
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
