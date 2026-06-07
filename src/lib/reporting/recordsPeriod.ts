import { getDateRangeFromDateStrings } from "@/lib/date";
import {
  getCurrentWeekPeriod,
  resolveReportPeriodQuery,
  type ReportPeriod,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

export type RecordsPeriodMode = "all" | "range";

export type RecordsPeriod = {
  mode: RecordsPeriodMode;
  period: ReportPeriod;
  needsCanonicalAllDataUrl: boolean;
};

type ResolveRecordsPeriodInput = {
  dates: string[];
  input: ReportPeriodInput;
  referenceDate?: Date;
};

export function resolveRecordsPeriod({
  dates,
  input,
  referenceDate,
}: ResolveRecordsPeriodInput): RecordsPeriod {
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
    period: getAllRecordsPeriod(dates, referenceDate),
    needsCanonicalAllDataUrl: query.mode === "default",
  };
}

function getAllRecordsPeriod(
  dates: string[],
  referenceDate?: Date,
): ReportPeriod {
  const dateRange = getDateRangeFromDateStrings(dates);

  return dateRange ?? getCurrentWeekPeriod(referenceDate);
}
