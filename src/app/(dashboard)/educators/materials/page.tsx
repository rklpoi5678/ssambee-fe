import Link from "next/link";

import { Button } from "@/components/ui/button";
import Title from "@/components/common/header/Title";

import MaterialsFilter from "./_components/filter/MaterialsFilter";
import MaterialsTable from "./_components/table/MaterialsTable";

export default function MaterialsPage() {
  return (
    <div className="container mx-auto px-8 py-8 space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between gap-4">
        <Title
          title="학습 자료실"
          description="수업 보조 자료와 심화 학습 콘텐츠를 검색하고 다운로드하세요."
        />

        <Button
          variant="outline"
          className="max-w-[180px] h-[50px] w-full rounded-lg text-base cursor-pointer"
          asChild
        >
          <Link href="/educators/communication/create">등록하기</Link>
        </Button>
      </div>

      <MaterialsFilter />

      <MaterialsTable />
    </div>
  );
}
