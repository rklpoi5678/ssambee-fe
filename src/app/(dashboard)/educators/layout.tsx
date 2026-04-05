import {
  mapServerSessionToAuthUser,
  requireAuthWithRole,
} from "@/shared/common/lib/auth/session";
import { DashboardLayoutContent } from "@/app/providers/DashboardLayoutContent";
import Providers from "@/app/providers/Providers";

export default async function EducatorsDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await requireAuthWithRole({
    loginPath: "/educators/login",
    allowedRoles: ["INSTRUCTOR", "ASSISTANT"],
    role: "MGMT",
    fallbackPath: "/learners",
  });

  return (
    <Providers initialUser={mapServerSessionToAuthUser(sessionUser)}>
      <DashboardLayoutContent>
        <div className="flex">
          <main className="flex-1">{children}</main>
        </div>
      </DashboardLayoutContent>
    </Providers>
  );
}
