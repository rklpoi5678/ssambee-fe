import { RouteGuard } from "@/components/guard/RouteGuard";

export default function LearnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard allowedRoles={["STUDENT", "PARENT"]}>{children}</RouteGuard>
  );
}
