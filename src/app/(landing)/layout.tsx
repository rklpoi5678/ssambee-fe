import { LandingHeader } from "@/components/Landing/LandingHeader/LandingHeader";

import { LandingFooterSection } from "../_components/landing/sections/LandingFooterSection";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <LandingHeader />
      {children}
      <LandingFooterSection />
    </div>
  );
}
