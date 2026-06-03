import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoDashboard } from "@/components/demo/demo-dashboard";
import { AppShell } from "@/components/layout/app-shell";
import { ReportPeriodNavigator } from "@/components/report-period/report-period-navigator";
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
