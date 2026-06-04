"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { ReportPeriodNavigator } from "@/components/report-period/report-period-navigator";
import { resolveDemoSessionsPeriod } from "@/lib/demo/demo-sessions-period";
import {
  buildAllDataHref,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

type DemoSessionsPeriodNavigatorProps = {
  hrefBase: string;
  query: ReportPeriodInput;
};

export function DemoSessionsPeriodNavigator({
  hrefBase,
  query,
}: DemoSessionsPeriodNavigatorProps) {
  const router = useRouter();
  const { demoData } = useDemoData();
  const resolvedPeriod = resolveDemoSessionsPeriod(demoData, query);

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
