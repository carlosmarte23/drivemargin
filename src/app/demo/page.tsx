import { Car } from "lucide-react";

import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoMetricCard } from "@/components/demo/demo-metric-card";
import { RecentSessionsTable } from "@/components/demo/recent-sessions-table";
import { ReportPeriodNavigator } from "@/components/demo/report-period-navigator";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";

import { buildMetricTrendChartData } from "@/lib/charts/dashboardChartData";
import { getDemoDashboardData } from "@/lib/demo/get-demo-dashboard-data";
import { formatCurrencyFromCents } from "@/lib/formatters/money";
import { formatHours, formatMiles } from "@/lib/formatters/number";
import {
  resolveReportPeriod,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

type DemoPageProps = {
  searchParams: Promise<ReportPeriodInput>;
};

export default async function DemoPage({ searchParams }: DemoPageProps) {
  const basePath = "/demo";

  const resolvedSearchParams = await searchParams;

  const reportPeriod = resolveReportPeriod(resolvedSearchParams);
  const dashboardData = getDemoDashboardData(reportPeriod);

  const {
    metrics,
    metricComparisons,
    irsMileageDeduction,
    recentSessions,
    dailyTrendSeries,
  } = dashboardData;

  const topMetricCards = [
    {
      title: "Net earnings",
      value: formatCurrencyFromCents(metrics.totalNetEarningsCents),
      description: "After fuel & expenses",
      variant: "primary",
      sparklineData: buildMetricTrendChartData(dailyTrendSeries, "netEarnings"),
    },
    {
      title: "Gross earnings",
      value: formatCurrencyFromCents(metrics.totalGrossEarningsCents),
      description: "Before expenses",
      variant: "muted",
      sparklineData: buildMetricTrendChartData(
        dailyTrendSeries,
        "grossEarnings",
      ),
    },
    {
      title: "Hours worked",
      value: formatHours(metrics.totalHoursWorked),
      description: "Total this period",
      variant: "muted",
      sparklineData: buildMetricTrendChartData(dailyTrendSeries, "hoursWorked"),
    },
    {
      title: "Miles driven",
      value: formatMiles(metrics.totalMiles),
      description: "Total this period",
      variant: "secondary",
      sparklineData: buildMetricTrendChartData(dailyTrendSeries, "totalMiles"),
    },
    {
      title: "Estimated fuel cost",
      value: formatCurrencyFromCents(metrics.totalEstimatedFuelCostCents),
      description: "MPG + fuel price",
      variant: "cost",
      sparklineData: buildMetricTrendChartData(dailyTrendSeries, "fuelCost"),
    },
    {
      title: "Expenses",
      value: formatCurrencyFromCents(metrics.totalOtherExpensesCents),
      description: "Other expenses",
      variant: "cost",
      sparklineData: buildMetricTrendChartData(
        dailyTrendSeries,
        "otherExpenses",
      ),
    },
  ] as const;

  const efficiencyMetricCards = [
    {
      title: "Net per hour",
      value: formatCurrencyFromCents(metrics.averageNetCentsPerHour),
      description: "Average hourly profit",
      variant: "muted",
      density: "compact",
      comparison: metricComparisons.averageNetCentsPerHour,
    },
    {
      title: "Net per mile",
      value: formatCurrencyFromCents(metrics.averageNetCentsPerMile),
      description: "Average profit per mile",
      variant: "muted",
      density: "compact",
      comparison: metricComparisons.averageNetCentsPerMile,
    },
  ] as const;

  return (
    <AppShell
      basePath="/demo"
      pageLabel="Demo Dashboard"
      headerContent={
        <ReportPeriodNavigator period={reportPeriod} hrefBase={basePath} />
      }
    >
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Preview how DriveMargin tracks real profitability across multi-app
            delivery shifts.
          </p>
        </div>

        <DemoBanner />

        <section aria-label="Dashboard metrics">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {topMetricCards.map((metric) => (
              <DemoMetricCard key={metric.title} {...metric} />
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {efficiencyMetricCards.map((metric) => (
              <DemoMetricCard key={metric.title} {...metric} />
            ))}

            <div className="sm:col-span-2 xl:col-span-2">
              <Card
                size="sm"
                className="border-secondary/30 bg-card h-full min-h-40 rounded-xl shadow-sm"
              >
                <CardContent className="flex h-full p-4">
                  <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary/10 text-secondary ring-secondary/35 flex size-16 shrink-0 items-center justify-center rounded-full ring-1">
                        <Car className="size-8" />
                      </div>

                      <div>
                        <p className="text-card-foreground text-sm font-medium">
                          IRS mileage deduction estimate
                        </p>

                        <p className="text-secondary mt-1 text-2xl font-semibold tracking-tight">
                          {formatCurrencyFromCents(
                            irsMileageDeduction.amountCents,
                          )}
                        </p>

                        <p className="text-muted-foreground mt-1 text-sm">
                          {formatMiles(irsMileageDeduction.totalMiles)} x{" "}
                          {formatCurrencyFromCents(
                            irsMileageDeduction.rateCentsPerMile,
                          )}
                          /mi
                        </p>
                      </div>
                    </div>

                    <div className="border-secondary/40 text-secondary w-full rounded-lg border px-3 py-2 text-center text-sm font-medium sm:w-fit">
                      Configured rate:{" "}
                      {formatCurrencyFromCents(
                        irsMileageDeduction.rateCentsPerMile,
                      )}
                      /mi
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <RecentSessionsTable
          sessions={recentSessions}
          period={reportPeriod}
          basePath={basePath}
        />
      </div>
    </AppShell>
  );
}
