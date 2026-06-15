"use client";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { ReportPeriodNavigator } from "@/components/report-period/report-period-navigator";
import { getDemoRecordDates } from "@/lib/demo/demo-records-period";
import type { ReportPeriod } from "@/lib/reporting/reportPeriod";

type DemoDashboardPeriodNavigatorProps = {
  period: ReportPeriod;
  hrefBase: string;
  defaultHref?: string;
  isDefaultPeriod: boolean;
};

export function DemoDashboardPeriodNavigator(
  props: DemoDashboardPeriodNavigatorProps,
) {
  const { demoData } = useDemoData();
  const recordDates = getDemoRecordDates(demoData, "sessions");

  const canNavigatePrevious = recordDates.some(
    (date) => date < props.period.startDate,
  );

  const canNavigateNext = recordDates.some(
    (date) => date > props.period.endDate,
  );

  return (
    <ReportPeriodNavigator
      {...props}
      canNavigatePrevious={canNavigatePrevious}
      canNavigateNext={canNavigateNext}
    />
  );
}
