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

type AuthUser = {
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // 앱이 처음 로드될 때 세션 정보 가져오기
    const initAuth = async () => {
      try {
        const role = pathname.startsWith("/learners") ? "SVC" : "MGMT";
        const response = await getSessionAPI(role);

        const userData = response.data?.data?.user;

        if (userData) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err: unknown) {
        console.error("Failed to fetch session", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [pathname]);

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
