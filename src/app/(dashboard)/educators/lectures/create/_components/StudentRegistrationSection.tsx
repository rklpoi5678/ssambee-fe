"use client";

import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type StudentRegistrationSectionProps = {
  disabled: boolean;
  children: ReactNode;
};

export function StudentRegistrationSection({
  disabled,
  children,
}: StudentRegistrationSectionProps) {
  return (
    <Card>
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">👥 수기입력 학생 등록</h2>
      </div>
      <CardContent className="p-6 space-y-6">
        {disabled ? (
          <div className="text-sm text-muted-foreground">
            저장 완료 후에는 수정할 수 없습니다.
          </div>
        ) : null}
        {children}
      </CardContent>
    </Card>
  );
}
