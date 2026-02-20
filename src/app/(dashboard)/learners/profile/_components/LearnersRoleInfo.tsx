import { School } from "lucide-react";

import DataTable from "@/components/common/table/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import type { LearnerProfile } from "@/types/learners-profile.type";

import {
  childColumns,
  instructorColumns,
} from "./table/LearnersProfileTableColumns";

type LearnersRoleInfoProps = {
  profile: LearnerProfile;
};

export function LearnersRoleInfo({ profile }: LearnersRoleInfoProps) {
  const isStudent = profile.userType === "STUDENT";

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-6">
        <h3 className="text-lg font-semibold">
          {isStudent ? "담당 강사 정보" : "자녀 정보"}
        </h3>

        {isStudent && (
          <div className="mt-2 flex items-center justify-between rounded-lg bg-brand-25 p-3">
            <span className="flex items-center gap-3 font-semibold text-brand-600">
              <div className="rounded-sm bg-brand-100 p-2">
                <School className="h-4 w-4 text-neutral-400" />
              </div>
              {profile.school} / {profile.schoolYear}
            </span>
          </div>
        )}

        {isStudent ? (
          <DataTable
            data={profile.instructors}
            columns={instructorColumns}
            emptyMessage="연결된 강사 정보가 없습니다."
          />
        ) : (
          <DataTable
            data={profile.children}
            columns={childColumns}
            emptyMessage="연결된 자녀 정보가 없습니다."
          />
        )}
      </CardContent>
    </Card>
  );
}
