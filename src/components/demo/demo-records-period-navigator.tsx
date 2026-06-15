"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { ReportPeriodNavigator } from "@/components/report-period/report-period-navigator";
import { formatDateToString } from "@/lib/date";
import { getDemoRecordDates } from "@/lib/demo/demo-records-period";
import { buildDemoRecordQuickRanges } from "@/lib/demo/demo-records-period-presets";
import { resolveRecordsPeriod } from "@/lib/reporting/recordsPeriod";
import {
  buildAllDataHref,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

type DemoRecordResource = "sessions" | "fuel" | "expenses";

type DemoRecordsPeriodNavigatorProps = {
  hrefBase: string;
  query: ReportPeriodInput;
  resource: DemoRecordResource;
};

export function DemoRecordsPeriodNavigator({
  hrefBase,
  query,
  resource,
}: DemoRecordsPeriodNavigatorProps) {
  const router = useRouter();
  const { demoData } = useDemoData();
  const recordDates = getDemoRecordDates(demoData, resource);

  const resolvedPeriod = resolveRecordsPeriod({
    dates: recordDates,
    input: query,
  });

  useEffect(() => {
    if (!resolvedPeriod.needsCanonicalAllDataUrl) {
      return;
    }

    router.replace(buildAllDataHref(hrefBase), { scroll: false });
  }, [hrefBase, resolvedPeriod.needsCanonicalAllDataUrl, router]);

  const hasPreviousData = recordDates.some(
    (date) => date < resolvedPeriod.period.startDate,
  );

  const hasNextData = recordDates.some(
    (date) => date > resolvedPeriod.period.endDate,
  );

  const quickRanges = buildDemoRecordQuickRanges({
    anchorDate: formatDateToString(new Date()),
    allDataHref: buildAllDataHref(hrefBase),
  });
  return (
    <ReportPeriodNavigator
      period={resolvedPeriod.period}
      hrefBase={hrefBase}
      defaultHref={buildAllDataHref(hrefBase)}
      isDefaultPeriod={resolvedPeriod.mode === "all"}
      canNavigatePrevious={hasPreviousData}
      canNavigateNext={hasNextData}
      mode={resolvedPeriod.mode}
      quickRanges={quickRanges}
    />
  );
}
