import { describe, expect, it } from "vitest";

import { buildDemoRecordQuickRanges } from "./demo-records-period-presets";

describe("buildDemoRecordQuickRanges", () => {
  it("builds quick ranges from the provided anchor date", () => {
    const ranges = buildDemoRecordQuickRanges({
      anchorDate: "2026-06-14",
      allDataHref: "/demo/sessions?period=all",
    });

    expect(ranges).toEqual([
      {
        label: "Today",
        period: {
          startDate: "2026-06-14",
          endDate: "2026-06-14",
        },
      },
      {
        label: "This week",
        period: {
          startDate: "2026-06-08",
          endDate: "2026-06-14",
        },
      },
      {
        label: "This month",
        period: {
          startDate: "2026-06-01",
          endDate: "2026-06-14",
        },
      },
      {
        label: "Last 30 days",
        period: {
          startDate: "2026-05-16",
          endDate: "2026-06-14",
        },
      },
      {
        label: "All data",
        href: "/demo/sessions?period=all",
      },
    ]);
  });
});
