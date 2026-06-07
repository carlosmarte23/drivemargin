"use client";

import { useMemo } from "react";

import { Dashboard } from "@/components/dashboard/dashboard";
import { useDemoData } from "@/components/demo/demo-data-provider";
import { DemoSessionCreateAction } from "@/components/demo/sessions/demo-session-create-action";
import { buildDemoDashboardData } from "@/lib/demo/get-demo-dashboard-data";
import type { ReportPeriod } from "@/lib/reporting/reportPeriod";

type DemoDashboardProps = {
  period: ReportPeriod;
  basePath: "/demo";
};

export function DemoDashboard({ period, basePath }: DemoDashboardProps) {
  const { demoData } = useDemoData();

  const dashboardData = useMemo(() => {
    return buildDemoDashboardData(demoData, period);
  }, [demoData, period]);

  return (
    <>
      <Dashboard
        dashboardData={dashboardData}
        period={period}
        basePath={basePath}
      />

      <DemoSessionCreateAction />
    </>
  );
}
