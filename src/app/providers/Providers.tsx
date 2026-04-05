"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import type { AuthUser } from "./AuthProvider";
import { AuthProvider } from "./AuthProvider";
import { ModalProvider } from "./ModalProvider";

const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then(
      (mod) => mod.ReactQueryDevtools
    ),
  { ssr: false }
);

type ProvidersProps = {
  children: React.ReactNode;
  /** 서버 레이아웃에서 검증된 유저. 미전달 시 게스트 구간과 동일하게 클라이언트에서 세션 조회 */
  initialUser?: AuthUser | null;
};

export default function Providers({ children, initialUser }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
      <AuthProvider initialUser={initialUser}>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
