"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import { getSessionAPI } from "@/services/auth.service";
import { Role } from "@/types/auth.type";

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  userType: Role;
  image?: string | null;
};

type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  /**
   * `undefined`: prop 미전달 → 클라이언트에서 세션 API 호출 (게스트 라우트 등)
   * 그 외: 서버에서 이미 검증된 초기 유저(또는 명시적 null) → 세션 API 재호출 금지
   */
  initialUser?: AuthUser | null;
};

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const serverProvided = initialUser !== undefined;
  const [user, setUser] = useState<AuthUser | null>(
    serverProvided ? initialUser : null
  );
  const [isLoading, setIsLoading] = useState(!serverProvided);
  const pathname = usePathname();
  const role = pathname.startsWith("/learners") ? "SVC" : "MGMT";

  useEffect(() => {
    if (serverProvided) {
      return;
    }

    let cancelled = false;

    const initAuth = async () => {
      try {
        const response = await getSessionAPI(role);

        if (cancelled) {
          return;
        }

        const userData = response.data?.data?.user;

        if (userData) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err: unknown) {
        if (cancelled) {
          return;
        }

        console.error("Failed to fetch session", err);
        setUser(null);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      cancelled = true;
    };
  }, [role, serverProvided]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider 내에서 사용해야 합니다.");
  return context;
};
