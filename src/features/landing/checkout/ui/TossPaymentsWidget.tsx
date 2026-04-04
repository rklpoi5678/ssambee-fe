export function TossPaymentsWidget({ amount }: { amount: number }) {
  return (
    <div className="space-y-4">
      <div
        id="payment-method"
        className="min-h-[220px] border border-gray-200 rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-center h-[220px] bg-gray-50 text-sm text-gray-400">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-blue-50">
              <svg
                className="w-5 h-5 text-brand-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <p className="font-medium text-gray-600">토스페이먼츠 결제 위젯</p>
            <p className="text-xs text-gray-400"></p>
          </div>
        </div>
      </div>

      <div
        id="agreement"
        className="min-h-[80px] border border-gray-200 rounded-xl overflow-hidden"
      >
        <div className="flex items-center h-[80px] px-4 bg-gray-50 text-sm text-gray-400">
          약관 동의 영역
        </div>
      </div>

      <button className="w-full py-4 bg-brand-700 hover:bg-[#2952e0] text-white rounded-xl font-bold text-base transition-all duration-200 cursor-pointer active:scale-[0.99] shadow-lg shadow-blue-100">
        {amount.toLocaleString("ko-KR")}원 결제하기
      </button>

      <p className="text-xs text-center text-gray-400">
        결제 시 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.
      </p>
    </div>
  );
}
