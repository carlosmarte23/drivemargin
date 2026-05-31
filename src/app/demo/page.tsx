import { Clock3, DollarSign, Fuel, Route, Wallet } from "lucide-react";

import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoMetricCard } from "@/components/demo/demo-metric-card";
import { ReportPeriodNavigator } from "@/components/demo/report-period-navigator";
import { AppShell } from "@/components/layout/app-shell";
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

  const primaryMetricCards = [
    {
      title: "Gross earnings",
      value: formatCurrencyFromCents(dashboardData.totalGrossEarningsCents),
      description: "Total earnings before estimated fuel cost and expenses.",
      icon: DollarSign,
      variant: "primary",
    },
    {
      title: "Net earnings",
      value: formatCurrencyFromCents(dashboardData.totalNetEarningsCents),
      description: "Estimated profit after fuel and non-fuel expenses.",
      icon: Wallet,
      variant: "primary",
    },
    {
      title: "Hours worked",
      value: formatHours(dashboardData.totalHoursWorked),
      description: "Total time tracked across work sessions.",
      icon: Clock3,
      variant: "muted",
    },
    {
      title: "Miles driven",
      value: formatMiles(dashboardData.totalMiles),
      description: "Business miles recorded during the active period.",
      icon: Route,
      variant: "secondary",
    },
  ] as const;

  const supportingMetricCards = [
    {
      title: "Estimated fuel cost",
      value: formatCurrencyFromCents(dashboardData.totalEstimatedFuelCostCents),
      description: "Estimated fuel cost based on gas price, MPG, and miles.",
      icon: Fuel,
      variant: "cost",
      density: "compact",
    },
    {
      title: "Expenses",
      value: formatCurrencyFromCents(dashboardData.totalOtherExpensesCents),
      description: "Non-fuel expenses.",
      icon: Wallet,
      variant: "cost",
      density: "compact",
    },
    {
      title: "Net per hour",
      value: formatCurrencyFromCents(dashboardData.averageNetCentsPerHour),
      description: "Average net per hour.",
      icon: Clock3,
      variant: "muted",
      density: "compact",
    },
    {
      title: "Net per mile",
      value: formatCurrencyFromCents(dashboardData.averageNetCentsPerMile),
      description: "Average net per mile.",
      icon: Route,
      variant: "muted",
      density: "compact",
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
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {primaryMetricCards.map((metric) => (
              <DemoMetricCard key={metric.title} {...metric} />
            ))}

            {supportingMetricCards.map((metric) => (
              <DemoMetricCard key={metric.title} {...metric} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
