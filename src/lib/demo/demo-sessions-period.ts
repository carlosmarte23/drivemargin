import type { DemoData } from "@/types/domain";

import { resolveRecordsPeriod } from "../reporting/recordsPeriod";
import type { ReportPeriodInput } from "../reporting/reportPeriod";

export type DemoSessionsPeriodMode = "all" | "range";

export function resolveDemoSessionsPeriod(
  data: DemoData,
  input: ReportPeriodInput,
) {
  return resolveRecordsPeriod({
    dates: data.sessions.map((session) => session.date),
    input,
  });
}
