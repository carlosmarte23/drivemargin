import type { DemoData } from "@/types/domain";

import { resolveRecordsPeriod } from "@/lib/reporting/recordsPeriod";
import type { ReportPeriodInput } from "@/lib/reporting/reportPeriod";

export type DemoRecordResource = "sessions" | "fuel" | "expenses";

export function resolveDemoRecordsPeriod(
  data: DemoData,
  resource: DemoRecordResource,
  input: ReportPeriodInput,
) {
  return resolveRecordsPeriod({
    dates: getDemoRecordDates(data, resource),
    input,
  });
}

export function getDemoRecordDates(
  data: DemoData,
  resource: DemoRecordResource,
) {
  if (resource === "fuel") {
    return data.fuelPurchases.map((purchase) => purchase.date);
  }

  if (resource === "expenses") {
    return data.expenses.map((expense) => expense.date);
  }

  return data.sessions.map((session) => session.date);
}
