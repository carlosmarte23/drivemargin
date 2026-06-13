import { DemoDashboard } from "@/components/demo/dashboard/demo-dashboard";
import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoTourAutoStart } from "@/components/demo/tour/demo-tour-auto-start";
import { AppShell } from "@/components/layout/app-shell";
import { ReportPeriodNavigator } from "@/components/report-period/report-period-navigator";
import {
  resolveReportPeriod,
  resolveReportPeriodQuery,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

type DemoPageProps = {
  searchParams: Promise<ReportPeriodInput>;
};

export default async function DemoPage({ searchParams }: DemoPageProps) {
  const basePath = "/demo";

  const resolvedSearchParams = await searchParams;
  const reportPeriod = resolveReportPeriod(resolvedSearchParams);
  const reportPeriodQuery = resolveReportPeriodQuery(resolvedSearchParams);
  const hasPeriodQuery = Boolean(
    resolvedSearchParams.period ||
    resolvedSearchParams.start ||
    resolvedSearchParams.end,
  );

  return (
    <AppShell
      basePath="/demo"
      pageLabel="Demo Dashboard"
      headerContent={
        <ReportPeriodNavigator
          period={reportPeriod}
          hrefBase={basePath}
          defaultHref={basePath}
          isDefaultPeriod={
            reportPeriodQuery.mode === "default" && !hasPeriodQuery
          }
        />
      }
    >
      <div className="space-y-5">
        <DemoTourAutoStart />

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Preview how DriveMargin tracks real profitability across multi-app
            delivery shifts.
          </p>
        </div>

        <DemoBanner />

        <DemoDashboard period={reportPeriod} basePath={basePath} />
      </div>
    </AppShell>
  );
}
