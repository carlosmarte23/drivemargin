import { Clock3, DollarSign, Route, Wallet } from "lucide-react";

import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoMetricCard } from "@/components/demo/demo-metric-card";
import { AppShell } from "@/components/layout/app-shell";

export default function DemoPage() {
  const demoMetricCards = [
    {
      title: "Gross earnings",
      value: "--",
      description: "Total earnings before estimated fuel cost and expenses.",
      icon: DollarSign,
      variant: "primary",
    },
    {
      title: "Net earnings",
      value: "--",
      description: "Estimated profit after fuel and non-fuel expenses.",
      icon: Wallet,
      variant: "primary",
    },
    {
      title: "Hours worked",
      value: "--",
      description: "Total time tracked across work sessions.",
      icon: Clock3,
      variant: "muted",
    },
    {
      title: "Miles driven",
      value: "--",
      description: "Business miles recorded during the active period.",
      icon: Route,
      variant: "secondary",
    },
  ] as const;

  return (
    <AppShell basePath="/demo" pageLabel="Demo Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Preview how DriveMargin tracks real profitability across multi-app
            delivery shifts.
          </p>
        </div>

        <DemoBanner />

        <section aria-label="Dashboard metrics">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {demoMetricCards.map((metric) => (
              <DemoMetricCard key={metric.title} {...metric} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
