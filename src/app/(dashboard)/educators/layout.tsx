import { RouteGuard } from "@/components/guard/RouteGuard";

export default function EducatorsAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard allowedRoles={["INSTRUCTOR", "ASSISTANT"]}>
      {children}
    </RouteGuard>
  );
}
