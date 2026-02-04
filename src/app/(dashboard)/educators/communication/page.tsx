"use client";

import Link from "next/link";

import Title from "@/components/common/header/Title";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/common/pagination/Pagination";

import InquiryTable from "./_components/table/InquiryTable";
import InquiryFilter from "./_components/filter/InquiryFilter";

export default function CommunicationListPage() {
  return (
    <div className="container mx-auto px-8 py-8 space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between gap-4">
        <Title
          title="소통 총괄 대시보드"
          description="학생/학부모의 문의 내역과 강사/조교가 관리합니다."
        />

        <Button
          variant="outline"
          className="max-w-[180px] h-[50px]  w-full rounded-lg"
        >
          <Link href="/educators/communication/create">작성하기</Link>
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="pb-3">
              <p className="text-sm font-bold text-muted-foreground">
                누적 게시글
              </p>
            </div>
            <p className="text-3xl font-bold text-green-600">6</p>
            <div className="pt-3">
              <p className="text-xs font-bold text-muted-foreground">
                지난 달 기준 <span className="text-green-600">12.5%</span> 증가
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="pb-3">
              <p className="text-sm font-bold text-muted-foreground">미답변</p>
            </div>
            <p className="text-3xl font-bold text-red-600">4</p>
            <div className="pt-3">
              <p className="text-xs font-bold text-muted-foreground">
                <span className="text-red-600">4건 </span> 지연 중
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="pb-3">
              <p className="text-sm font-bold text-muted-foreground">
                이번 달 답변 완료
              </p>
            </div>
            <p className="text-3xl font-bold text-blue-600">8</p>
            <div className="pt-3">
              <p className="text-xs font-bold text-muted-foreground">
                <span className="text-blue-600">3건 </span> 응답 진행 중
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <InquiryFilter />

      <InquiryTable />

      <Pagination
        pagination={{
          totalCount: 10,
          totalPage: 1,
          currentPage: 1,
          limit: 10,
          hasNextPage: true,
          hasPrevPage: false,
        }}
        onPageChange={(page) => {
          console.log(page);
        }}
      />
    </div>
  );
}
