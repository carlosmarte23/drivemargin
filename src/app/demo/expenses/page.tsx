import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoRecordsPeriodNavigator } from "@/components/demo/demo-records-period-navigator";
import { DemoExpensesTableSection } from "@/components/demo/expenses/demo-expenses-table-section";
import { AppShell } from "@/components/layout/app-shell";
import type { ReportPeriodInput } from "@/lib/reporting/reportPeriod";

type DemoExpensesPageProps = {
  searchParams: Promise<ReportPeriodInput>;
};
export default async function DemoExpensesPage({
  searchParams,
}: DemoExpensesPageProps) {
  const basePath = "/demo/expenses";
  const resolvedSearchParams = await searchParams;

  return (
    <AppShell
      basePath="/demo"
      pageLabel="Expenses"
      headerContent={
        <DemoRecordsPeriodNavigator
          hrefBase={basePath}
          query={resolvedSearchParams}
          resource="expenses"
        />
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Expenses</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Track non-fuel costs that affect your real delivery profit.
          </p>
        </div>

        <div className="space-y-5">
          <DemoBanner />
          <DemoExpensesTableSection query={resolvedSearchParams} />
        </div>
      </div>
    </AppShell>
  );
}
