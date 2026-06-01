import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { ReportPeriodPickerDialog } from "@/components/demo/report-period-picker-dialog";
import { Button } from "@/components/ui/button";
import {
  buildPeriodHref,
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
    <div className="flex w-full max-w-full flex-row items-center justify-center gap-2 sm:w-fit">
      <div className="border-border bg-card flex max-w-full items-center rounded-lg border shadow-sm">
        <Button variant="ghost" size="icon" asChild>
          <Link
            href={buildPeriodHref(hrefBase, previousPeriod)}
            aria-label="Previous period"
          >
            <ChevronLeft className="size-5" />
          </Link>
        </Button>

        <ReportPeriodPickerDialog
          period={period}
          hrefBase={hrefBase}
          label={periodLabel}
        />

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
