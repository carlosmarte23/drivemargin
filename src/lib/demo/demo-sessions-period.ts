import { getDateRangeFromDateStrings } from "@/lib/date";
import {
  getCurrentWeekPeriod,
  resolveReportPeriodQuery,
  type ReportPeriod,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";
import type { DemoData } from "@/types/domain";

export type DemoSessionsPeriodMode = "all" | "range";

export type DemoSessionsPeriod = {
  mode: DemoSessionsPeriodMode;
  period: ReportPeriod;
  needsCanonicalAllDataUrl: boolean;
};

export function resolveDemoSessionsPeriod(
  data: DemoData,
  input: ReportPeriodInput,
): DemoSessionsPeriod {
  const query = resolveReportPeriodQuery(input);

  if (query.mode === "range") {
    return {
      mode: "range",
      period: query.period,
      needsCanonicalAllDataUrl: false,
    };
  }

  return {
    mode: "all",
    period: getAllSessionsPeriod(data),
    needsCanonicalAllDataUrl: query.mode === "default",
  };
}

function getAllSessionsPeriod(data: DemoData): ReportPeriod {
  const dateRange = getDateRangeFromDateStrings(
    data.sessions.map((session) => session.date),
  );

  return dateRange ?? getCurrentWeekPeriod();
}
