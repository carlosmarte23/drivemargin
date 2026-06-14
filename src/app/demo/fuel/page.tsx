import type { Metadata } from "next";

import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoRecordsPeriodNavigator } from "@/components/demo/demo-records-period-navigator";
import { DemoFuelTableSection } from "@/components/demo/fuel/demo-fuel-table-section";
import { AppShell } from "@/components/layout/app-shell";
import type { ReportPeriodInput } from "@/lib/reporting/reportPeriod";

type DemoFuelPageProps = {
  searchParams: Promise<ReportPeriodInput>;
};

export const metadata: Metadata = {
  title: "Demo fuel purchases",
  description:
    "Explore sample fuel purchases and see how DriveMargin separates actual gas spending from estimated trip fuel costs.",
  alternates: {
    canonical: "/demo/fuel",
  },
};

export default async function DemoFuelPage({
  searchParams,
}: DemoFuelPageProps) {
  const basePath = "/demo/fuel";

  const resolvedSearchParams = await searchParams;

  return (
    <AppShell
      basePath="/demo"
      pageLabel="Fuel"
      headerContent={
        <DemoRecordsPeriodNavigator
          hrefBase={basePath}
          query={resolvedSearchParams}
          resource="fuel"
        />
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Fuel</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Track gas purchases and estimate fuel cost per mile.
          </p>
        </div>

        <div className="space-y-5">
          <DemoBanner />
          <DemoFuelTableSection query={resolvedSearchParams} />
        </div>
      </div>
    </AppShell>
  );
}
