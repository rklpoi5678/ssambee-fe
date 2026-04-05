import {
  mapServerSessionToAuthUser,
  requireAuthWithRole,
} from "@/shared/common/lib/auth/session";
import { DashboardLayoutContent } from "@/app/providers/DashboardLayoutContent";
import Providers from "@/app/providers/Providers";

export default async function LearnersDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await requireAuthWithRole({
    loginPath: "/learners/login",
    allowedRoles: ["STUDENT", "PARENT"],
    role: "SVC",
    fallbackPath: "/educators",
  });

  return (
    <Providers initialUser={mapServerSessionToAuthUser(sessionUser)}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Providers>
  );
}
