import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ReportHeader() {
  return (
    <section className="-mx-6 -mt-6 border-b border-[#e9ebf0] bg-white px-6 py-6 sm:px-8 sm:py-7">
      <div className="flex items-start gap-4">
        <Button
          variant="outline"
          className="h-11 w-11 rounded-full border-[#d6d9e0] bg-white p-0 text-[#6b6f80] hover:bg-[#fcfcfd] hover:text-[#5e6275]"
          asChild
        >
          <Link href="/educators/exams" aria-label="시험 관리로 이동">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="space-y-1.5">
          <h1 className="text-[30px] font-bold leading-[1.2] tracking-[-0.03em] text-[#040405] sm:text-[36px] sm:leading-[48px]">
            학생 성적표 발송
          </h1>
          <p className="text-[16px] font-medium leading-6 tracking-[-0.01em] text-[rgba(22,22,27,0.4)] sm:text-[20px] sm:leading-7 sm:tracking-[-0.02em]">
            시험별 성적표를 생성하고 학생/학부모에게 발송합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
