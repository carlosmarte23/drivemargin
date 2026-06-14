import { formatDateToString, parseDateString } from "@/lib/date";
import type { ReportPeriod } from "@/lib/reporting/reportPeriod";

type DemoRecordQuickRangeLabel =
  | "All data"
  | "Today"
  | "This week"
  | "This month"
  | "Last 30 days";

export type DemoRecordQuickRange = {
  label: DemoRecordQuickRangeLabel;
  period?: ReportPeriod;
  href?: string;
};

type BuildDemoRecordQuickRangesInput = {
  anchorDate: string;
  allDataHref: string;
};

export function buildDemoRecordQuickRanges({
  anchorDate,
  allDataHref,
}: BuildDemoRecordQuickRangesInput): DemoRecordQuickRange[] {
  const allDataRange: DemoRecordQuickRange = {
    label: "All data",
    href: allDataHref,
  };

  const parsedAnchorDate = parseDateString(anchorDate);

  return [
    {
      label: "Today",
      period: {
        startDate: formatDateToString(parsedAnchorDate),
        endDate: formatDateToString(parsedAnchorDate),
      },
    },
    {
      label: "This week",
      period: getWeekPeriod(anchorDate),
    },
    {
      label: "This month",
      period: getMonthPeriod(anchorDate),
    },
    {
      label: "Last 30 days",
      period: getLastThirtyDaysPeriod(anchorDate),
    },
    allDataRange,
  ];
}

function getWeekPeriod(date: string): ReportPeriod {
  const start = parseDateString(date);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  start.setDate(start.getDate() + mondayOffset);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    startDate: formatDateToString(start),
    endDate: formatDateToString(end),
  };
}

function getMonthPeriod(date: string): ReportPeriod {
  const parsed = parseDateString(date);
  const start = new Date(parsed.getFullYear(), parsed.getMonth(), 1, 12);

  return {
    startDate: formatDateToString(start),
    endDate: date,
  };
}

function getLastThirtyDaysPeriod(date: string): ReportPeriod {
  const start = parseDateString(date);

  start.setDate(start.getDate() - 29);

  return {
    startDate: formatDateToString(start),
    endDate: date,
  };
}
