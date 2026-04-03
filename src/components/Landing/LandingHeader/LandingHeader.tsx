import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <div className="relative overflow-hidden bg-[#f8f9ff]">
      <header className="relative z-10">
        <div className="mx-auto flex h-[110px] w-full max-w-[1920px] items-center justify-between px-6 lg:px-[210px]">
          <Link href="/">
            <Image
              src="/brand/ssam-b.svg"
              alt="SSam B"
              width={160}
              height={52}
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="h-12 rounded-xl bg-brand-700 px-7 text-sm font-semibold text-white shadow-[0px_0px_14px_0px_rgba(138,138,138,0.08)] hover:bg-brand-800"
            >
              <Link href="/educators/login">로그인</Link>
            </Button>
            <Button
              asChild
              className="h-12 rounded-xl border border-brand-100 bg-brand-25 px-7 text-sm font-semibold text-brand-700 shadow-[0px_0px_14px_0px_rgba(138,138,138,0.08)] hover:bg-brand-50"
            >
              <Link href="/learners/login">학생 로그인</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
