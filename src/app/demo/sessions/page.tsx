import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoRecordsPeriodNavigator } from "@/components/demo/demo-records-period-navigator";
import { DemoSessionsTableSection } from "@/components/demo/demo-sessions-table-section";
import { AppShell } from "@/components/layout/app-shell";
import type { ReportPeriodInput } from "@/lib/reporting/reportPeriod";

type DemoSessionsPageProps = {
  searchParams: Promise<ReportPeriodInput>;
};

export default async function DemoSessionsPage({
  searchParams,
}: DemoSessionsPageProps) {
  const basePath = "/demo/sessions";

  const resolvedSearchParams = await searchParams;

  return (
    <AppShell
      basePath="/demo"
      pageLabel="Sessions"
      headerContent={
        <DemoRecordsPeriodNavigator
          hrefBase={basePath}
          query={resolvedSearchParams}
          resource="sessions"
        />
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sessions</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Track multi-app work sessions and review profitability by shift.
          </p>
        </div>

        <div className="space-y-5">
          <DemoBanner />
          <DemoSessionsTableSection query={resolvedSearchParams} />
        </div>
      </div>
    </AppShell>
  );
}
