import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  formatReportPeriodLabel,
  getCurrentWeekPeriod,
  getNextWeekPeriod,
  getPreviousWeekPeriod,
  isSameReportPeriod,
  type ReportPeriod,
} from "@/lib/reporting/reportPeriod";

type ReportPeriodNavigatorProps = {
  period: ReportPeriod;
  hrefBase: string;
};

function buildPeriodHref(hrefBase: string, period: ReportPeriod): string {
  const params = new URLSearchParams({
    start: period.startDate,
    end: period.endDate,
  });

  return `${hrefBase}?${params.toString()}`;
}

export function ReportPeriodNavigator({
  period,
  hrefBase,
}: ReportPeriodNavigatorProps) {
  const previousPeriod = getPreviousWeekPeriod(period);
  const nextPeriod = getNextWeekPeriod(period);
  const currentPeriod = getCurrentWeekPeriod();

  const periodLabel = formatReportPeriodLabel(period);
  const isCurrentPeriod = isSameReportPeriod(period, currentPeriod);

  return (
    <div className="flex w-fit max-w-full flex-col items-center gap-2 sm:flex-row sm:items-center">
      <div className="flex items-center rounded-lg border border-border bg-card shadow-sm">
        <Button variant="ghost" size="icon" asChild>
          <Link
            href={buildPeriodHref(hrefBase, previousPeriod)}
            aria-label="Previous period"
          >
            <ChevronLeft className="size-5" />
          </Link>
        </Button>

        <div className="min-w-44 px-3 text-center">
          <p className="text-sm font-medium text-foreground">{periodLabel}</p>
        </div>

        <Button variant="ghost" size="icon" asChild>
          <Link
            href={buildPeriodHref(hrefBase, nextPeriod)}
            aria-label="Next period"
          >
            <ChevronRight className="size-5" />
          </Link>
        </Button>
      </div>

      {isCurrentPeriod ? (
        <Button variant="outline" size="sm" className="h-9 px-3" disabled>
          Current week
        </Button>
      ) : (
        <Button variant="outline" size="sm" className="h-9 px-3" asChild>
          <Link href={buildPeriodHref(hrefBase, currentPeriod)}>
            Current week
          </Link>
        </Button>
      )}
    </div>
  );
}
