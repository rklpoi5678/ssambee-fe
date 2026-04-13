"use client";

import Link from "next/link";
import { Clock } from "lucide-react";

export default function EntitlementPendingPage() {
  const handleCancelPayment = () => {
    // TODO: API 연결
    console.log("결제 신청 취소");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
          <Clock className="h-10 w-10 text-yellow-600" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          입금 확인 중입니다
        </h1>
        <p className="mb-8 text-gray-600">
          확인이 완료되면 알림 이메일과 함께 서비스를 이용하실 수 있습니다.
          <br />
          조금만 기다려 주세요!
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[14px] bg-[#4B72F7] py-4 text-[17px] font-bold text-white transition-all hover:bg-[#3859D4] active:scale-[0.98] cursor-pointer"
          >
            홈으로 돌아가기
          </Link>
          <button
            onClick={handleCancelPayment}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[14px] border border-gray-300 bg-white py-4 text-[17px] font-bold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
          >
            결제 신청 취소
          </button>
        </div>
      </div>
    </div>
  );
}
