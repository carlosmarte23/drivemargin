import { EarningsByAppChart } from "@/components/dashboard/charts/earnings-by-app";
import { EarningsOverTimeChart } from "@/components/dashboard/charts/earnings-over-time-chart";
import { GrossVsExpensesChart } from "@/components/dashboard/charts/gross-vs-expenses-chart";
import type { DashboardChartsData } from "@/types/dashboard";

type DashboardChartsSectionProps = {
  charts: DashboardChartsData;
};

export function DashboardChartsSection({
  charts,
}: DashboardChartsSectionProps) {
  return (
    <section aria-label="Dashboard charts" className="min-w-0 space-y-4">
      <EarningsOverTimeChart data={charts.earningsOverTime} />

      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <GrossVsExpensesChart data={charts.grossVsExpenses} />
        <EarningsByAppChart data={charts.earningsByApp} />
      </div>
    </section>
  );
}
