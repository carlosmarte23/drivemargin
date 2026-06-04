import { describe, expect, test } from "vitest";

import { resolveRecordsPeriod } from "@/lib/reporting/recordsPeriod";

describe("recordsPeriod", () => {
  test("resolves empty input to all records period", () => {
    const result = resolveRecordsPeriod({
      dates: ["2026-05-28", "2026-05-01", "2026-05-15"],
      input: {},
      referenceDate: new Date(2026, 4, 31, 12),
    });

    expect(result).toEqual({
      mode: "all",
      period: {
        startDate: "2026-05-01",
        endDate: "2026-05-28",
      },
      needsCanonicalAllDataUrl: true,
    });
  });

  test("resolves valid start and end input to range period", () => {
    const result = resolveRecordsPeriod({
      dates: ["2026-05-29", "2026-05-01", "2026-05-15"],
      input: { start: "2026-05-10", end: "2026-05-20" },
      referenceDate: new Date(2026, 4, 31, 12),
    });

    expect(result).toEqual({
      mode: "range",
      period: {
        startDate: "2026-05-10",
        endDate: "2026-05-20",
      },
      needsCanonicalAllDataUrl: false,
    });
  });
});
