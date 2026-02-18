import { Lock } from "lucide-react";
import Link from "next/link";

export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
          <Lock className="h-10 w-10 text-yellow-600" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          가입 승인 대기 중
        </h1>
        <p className="mb-8 text-gray-600">
          강사님의 승인이 완료된 후 모든 서비스를 이용하실 수 있습니다.
          <br />
          조금만 기다려 주세요!
        </p>
        <Link
          href="/educators"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          대시보드로 돌아가기
        </Link>
      </div>
    </div>
  );
}
