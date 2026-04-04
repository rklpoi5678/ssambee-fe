"use client";

import { useRouter } from "next/navigation";

import { Plan, PLANS } from "@/features/landing/pricing/lib/types";

import { PlanCard } from "./PlanCard";

export function PlanCardList() {
  const router = useRouter();

  const handleSelect = (plan: Plan) => {
    const params = new URLSearchParams({ planId: plan.id });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div
      className={`grid gap-6 ${
        PLANS.length === 1
          ? "grid-cols-1 max-w-sm mx-auto"
          : PLANS.length === 2
            ? "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto"
            : "grid-cols-1 md:grid-cols-3"
      }`}
    >
      {PLANS.map((plan) => (
        <PlanCard key={plan.id} plan={plan} onSelect={handleSelect} />
      ))}
    </div>
  );
}
