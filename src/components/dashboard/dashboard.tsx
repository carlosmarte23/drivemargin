import dynamic from "next/dynamic";

import { DashboardMetricsSection } from "@/components/dashboard/dashboard-metrics-section";
import { DashboardRecentSessions } from "@/components/dashboard/dashboard-recent-sessions";
import type { ReportPeriod } from "@/lib/reporting/reportPeriod";
import type { DashboardData } from "@/types/dashboard";

const DashboardChartsSection = dynamic(
  () =>
    import("@/components/dashboard/dashboard-charts-section").then(
      (mod) => mod.DashboardChartsSection,
    ),
  {
    loading: () => <DashboardChartsSkeleton />,
  },
);

type DashboardProps = {
  dashboardData: DashboardData;
  period: ReportPeriod;
  basePath: "/demo" | "/app";
};

export function Dashboard({ dashboardData, period, basePath }: DashboardProps) {
  const {
    metrics,
    metricComparisons,
    efficiencyTargets,
    irsMileageDeduction,
    recentSessions,
    dailyTrendSeries,
    charts,
  } = dashboardData;

  return (
    <div className="flex flex-col gap-4">
      <DashboardMetricsSection
        metrics={metrics}
        metricComparisons={metricComparisons}
        efficiencyTargets={efficiencyTargets}
        irsMileageDeduction={irsMileageDeduction}
        dailyTrendSeries={dailyTrendSeries}
      />

      <DashboardChartsSection charts={charts} />

      <DashboardRecentSessions
        sessions={recentSessions}
        period={period}
        basePath={basePath}
      />
    </div>
  );
}

function DashboardChartsSkeleton() {
  return (
    <section aria-label="Dashboard charts" className="min-w-0 space-y-4">
      <div className="h-80 rounded-xl border border-border bg-card" />
      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <div className="h-72 rounded-xl border border-border bg-card" />
        <div className="h-72 rounded-xl border border-border bg-card" />
      </div>
    </section>
  );
}
