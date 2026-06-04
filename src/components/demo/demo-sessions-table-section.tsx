"use client";

import { useMemo } from "react";

import { useDemoData } from "@/components/demo/demo-data-provider";
import {
  DemoSessionsTableCard,
  type DemoSessionsTableRow,
} from "@/components/demo/demo-sessions-table-card";
import { resolveDemoSessionsPeriod } from "@/lib/demo/demo-sessions-period";
import {
  formatReportPeriodLabel,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

type DemoSessionsTableSectionProps = {
  query: ReportPeriodInput;
};

export function DemoSessionsTableSection({
  query,
}: DemoSessionsTableSectionProps) {
  const { demoData } = useDemoData();
  const resolvedPeriod = resolveDemoSessionsPeriod(demoData, query);
  const { period } = resolvedPeriod;

  const rows = useMemo(() => {
    return demoData.sessions
      .filter((session) => {
        return (
          session.date >= period.startDate && session.date <= period.endDate
        );
      })
      .map((session): DemoSessionsTableRow => {
        const vehicle = demoData.vehicles.find((item) => {
          return item.id === session.vehicleId;
        });

        const earnings = demoData.sessionAppEarnings.filter((earning) => {
          return earning.sessionId === session.id;
        });

        const grossEarningsCents = earnings.reduce((total, earning) => {
          return total + earning.amountCents;
        }, 0);

        const appShortNames = earnings
          .map((earning) => {
            const workApp = demoData.workApps.find((app) => {
              return app.id === earning.workAppId;
            });

            return workApp?.shortName ?? workApp?.name;
          })
          .filter((appName): appName is string => {
            return Boolean(appName);
          });

        return {
          id: session.id,
          date: session.date,
          startedAt: session.startedAt,
          endedAt: session.endedAt,
          vehicleName: vehicle?.name ?? "Unknown vehicle",
          appShortNames,
          totalMiles: session.totalMiles,
          hoursWorked: calculateHoursWorked(session.startedAt, session.endedAt),
          grossEarningsCents,
          notes: session.notes,
        };
      })
      .sort((firstSession, secondSession) => {
        return secondSession.startedAt.localeCompare(firstSession.startedAt);
      });
  }, [demoData, period.endDate, period.startDate]);

  return (
    <DemoSessionsTableCard
      rows={rows}
      periodLabel={formatDemoSessionsPeriodLabel(resolvedPeriod)}
    />
  );
}

function calculateHoursWorked(startedAt: string, endedAt: string) {
  const startedAtTime = new Date(startedAt).getTime();
  const endedAtTime = new Date(endedAt).getTime();

  return Math.max((endedAtTime - startedAtTime) / 3_600_000, 0);
}

function formatDemoSessionsPeriodLabel(
  resolvedPeriod: ReturnType<typeof resolveDemoSessionsPeriod>,
): string {
  const formattedPeriod = formatReportPeriodLabel(resolvedPeriod.period);

  if (resolvedPeriod.mode === "all") {
    return `all demo sessions (${formattedPeriod})`;
  }

  return `this period (${formattedPeriod})`;
}
