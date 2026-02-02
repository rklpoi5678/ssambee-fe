"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SearchBarWithActionProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  actionLabel: string;
  onAction: () => void;
};

export function SearchBarWithAction({
  searchValue,
  onSearchChange,
  placeholder = "검색어를 입력하세요",
  actionLabel,
  onAction,
}: SearchBarWithActionProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          🔍
        </span>
      </div>
      <Button className="gap-2" onClick={onAction}>
        <span>＋</span>
        {actionLabel}
      </Button>
    </div>
  );
}
