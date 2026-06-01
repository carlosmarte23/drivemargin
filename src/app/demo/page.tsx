import { Car } from "lucide-react";

import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoMetricCard } from "@/components/demo/demo-metric-card";
import { ReportPeriodNavigator } from "@/components/demo/report-period-navigator";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { getDemoDashboardData } from "@/lib/demo/get-demo-dashboard-data";
import { formatCurrencyFromCents } from "@/lib/formatters/money";
import { formatHours, formatMiles } from "@/lib/formatters/number";
import {
  type ReportPeriodInput,
  resolveReportPeriod,
} from "@/lib/reporting/reportPeriod";

type DemoPageProps = {
  searchParams: Promise<ReportPeriodInput>;
};

export default async function DemoPage({ searchParams }: DemoPageProps) {
  const resolvedSearchParams = await searchParams;

  const reportPeriod = resolveReportPeriod(resolvedSearchParams);
  const dashboardData = getDemoDashboardData(reportPeriod);

  const { metrics, metricComparisons, irsMileageDeduction } = dashboardData;

  const topMetricCards = [
    {
      title: "Net earnings",
      value: formatCurrencyFromCents(metrics.totalNetEarningsCents),
      description: "After fuel & expenses",
      variant: "primary",
      showSparklineSlot: true,
    },
    {
      title: "Gross earnings",
      value: formatCurrencyFromCents(metrics.totalGrossEarningsCents),
      description: "Before expenses",
      variant: "muted",
      showSparklineSlot: true,
    },
    {
      title: "Hours worked",
      value: formatHours(metrics.totalHoursWorked),
      description: "Total this period",
      variant: "muted",
      showSparklineSlot: true,
    },
    {
      title: "Miles driven",
      value: formatMiles(metrics.totalMiles),
      description: "Total this period",
      variant: "secondary",
      showSparklineSlot: true,
    },
    {
      title: "Estimated fuel cost",
      value: formatCurrencyFromCents(metrics.totalEstimatedFuelCostCents),
      description: "Based on MPG + fuel price",
      variant: "cost",
      showSparklineSlot: true,
    },
    {
      title: "Expenses",
      value: formatCurrencyFromCents(metrics.totalOtherExpensesCents),
      description: "Other expenses",
      variant: "cost",
      showSparklineSlot: true,
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
        <ReportPeriodNavigator period={reportPeriod} hrefBase="/demo" />
      }
    >
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
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
                className="h-full min-h-40 rounded-xl border-secondary/30 bg-card shadow-sm"
              >
                <CardContent className="flex h-full p-4">
                  <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary ring-1 ring-secondary/35">
                        <Car className="size-8" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          IRS mileage deduction estimate
                        </p>

                        <p className="mt-1 text-2xl font-semibold tracking-tight text-secondary">
                          {formatCurrencyFromCents(
                            irsMileageDeduction.amountCents,
                          )}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatMiles(irsMileageDeduction.totalMiles)} x{" "}
                          {formatCurrencyFromCents(
                            irsMileageDeduction.rateCentsPerMile,
                          )}
                          /mi
                        </p>
                      </div>
                    </div>

                    <div className="w-full rounded-lg border border-secondary/40 px-3 py-2 text-center text-sm font-medium text-secondary sm:w-fit">
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
      </div>
    </AppShell>
  );
}
