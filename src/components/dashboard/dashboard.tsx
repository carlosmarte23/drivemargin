import { DashboardChartsSection } from "@/components/dashboard/dashboard-charts-section";
import { DashboardMetricsSection } from "@/components/dashboard/dashboard-metrics-section";
import { DashboardRecentSessions } from "@/components/dashboard/dashboard-recent-sessions";
import type { ReportPeriod } from "@/lib/reporting/reportPeriod";
import type { DashboardData } from "@/types/dashboard";

type DashboardProps = {
  dashboardData: DashboardData;
  period: ReportPeriod;
  basePath: "/demo" | "/app";
};

export function Dashboard({ dashboardData, period, basePath }: DashboardProps) {
  const {
    metrics,
    metricComparisons,
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
