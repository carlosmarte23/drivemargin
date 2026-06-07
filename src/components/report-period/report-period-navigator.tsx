import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { ReportPeriodPickerDialog } from "@/components/report-period/report-period-picker-dialog";
import { Button } from "@/components/ui/button";
import {
  buildPeriodHref,
  formatReportPeriodLabel,
  getNextReportPeriod,
  getPreviousReportPeriod,
  type ReportPeriod,
} from "@/lib/reporting/reportPeriod";

type ReportPeriodNavigatorProps = {
  period: ReportPeriod;
  hrefBase: string;
  defaultHref?: string;
  isDefaultPeriod?: boolean;
  mode?: "all" | "range";
};

export function ReportPeriodNavigator({
  period,
  hrefBase,
  defaultHref = hrefBase,
  isDefaultPeriod = false,
  mode = "range",
}: ReportPeriodNavigatorProps) {
  const previousPeriod = getPreviousReportPeriod(period);
  const nextPeriod = getNextReportPeriod(period);

  const formattedPeriod = formatReportPeriodLabel(period);
  const periodLabel =
    mode === "all" ? `All data: ${formattedPeriod}` : formattedPeriod;
  const isAllData = mode === "all";

  return (
    <div className="flex w-full max-w-full items-center justify-center sm:w-fit">
      <div className="flex max-w-full items-center rounded-lg border border-border bg-card shadow-sm">
        {isAllData ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous period"
            disabled
          >
            <ChevronLeft className="size-5" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" asChild>
            <Link
              href={buildPeriodHref(hrefBase, previousPeriod)}
              aria-label="Previous period"
              scroll={false}
            >
              <ChevronLeft className="size-5" />
            </Link>
          </Button>
        )}

        <ReportPeriodPickerDialog
          period={period}
          hrefBase={hrefBase}
          label={periodLabel}
        />

        {isAllData ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next period"
            disabled
          >
            <ChevronRight className="size-5" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" asChild>
            <Link
              href={buildPeriodHref(hrefBase, nextPeriod)}
              aria-label="Next period"
              scroll={false}
            >
              <ChevronRight className="size-5" />
            </Link>
          </Button>
        )}

        {isDefaultPeriod ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-9 rounded-l-none border-l border-border px-3"
            disabled
          >
            Clear
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-9 rounded-l-none border-l border-border px-3"
            asChild
          >
            <Link href={defaultHref} scroll={false}>
              Clear
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
