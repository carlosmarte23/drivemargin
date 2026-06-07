"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { ReportPeriodNavigator } from "@/components/report-period/report-period-navigator";
import { resolveRecordsPeriod } from "@/lib/reporting/recordsPeriod";
import {
  buildAllDataHref,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";
import { getDemoRecordDates } from "@/lib/demo/demo-records-period";

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

  const resolvedPeriod = resolveRecordsPeriod({
    dates: getDemoRecordDates(demoData, resource),
    input: query,
  });

  useEffect(() => {
    if (!resolvedPeriod.needsCanonicalAllDataUrl) {
      return;
    }

    router.replace(buildAllDataHref(hrefBase), { scroll: false });
  }, [hrefBase, resolvedPeriod.needsCanonicalAllDataUrl, router]);

  return (
    <ReportPeriodNavigator
      period={resolvedPeriod.period}
      hrefBase={hrefBase}
      defaultHref={buildAllDataHref(hrefBase)}
      isDefaultPeriod={resolvedPeriod.mode === "all"}
      mode={resolvedPeriod.mode}
    />
  );
}
