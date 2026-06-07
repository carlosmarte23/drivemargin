import { describe, expect, it } from "vitest";

import {
  formatDateToString,
  formatSessionDate,
  formatSessionShortDate,
  formatSessionTimeRange,
  getDateRangeFromDateStrings,
  isDateInRange,
  parseDateString,
} from "./date";

describe("date helpers", () => {
  it("formats a date as an ISO date string", () => {
    const date = new Date(2026, 4, 29, 12);

    expect(formatDateToString(date)).toBe("2026-05-29");
  });

  it("parses an ISO date string as a local date", () => {
    const date = parseDateString("2026-05-29");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(4);
    expect(date.getDate()).toBe(29);
    expect(date.getHours()).toBe(12);
  });

  it("formats session dates for table displays", () => {
    expect(formatSessionDate("2026-05-29")).toBe("May 29, 2026");
    expect(formatSessionShortDate("2026-05-29")).toBe("May 29");
  });

  it("formats session time ranges", () => {
    expect(
      formatSessionTimeRange("2026-05-29T09:05:00", "2026-05-29T13:30:00"),
    ).toBe("9:05 AM - 1:30 PM");
  });

  it("returns null when building a date range from an empty list", () => {
    expect(getDateRangeFromDateStrings([])).toBeNull();
  });

  it("builds a date range from unordered ISO date strings", () => {
    expect(
      getDateRangeFromDateStrings(["2026-05-29", "2026-05-01", "2026-05-15"]),
    ).toEqual({
      startDate: "2026-05-01",
      endDate: "2026-05-29",
    });
  });

  it("builds a date range from a single ISO date string", () => {
    expect(getDateRangeFromDateStrings(["2026-05-29"])).toEqual({
      startDate: "2026-05-29",
      endDate: "2026-05-29",
    });
  });

  it("checks whether a date is inside an inclusive date range", () => {
    const dateRange = {
      startDate: "2026-05-01",
      endDate: "2026-05-29",
    };

    expect(isDateInRange("2026-05-01", dateRange)).toBe(true);
    expect(isDateInRange("2026-05-15", dateRange)).toBe(true);
    expect(isDateInRange("2026-05-29", dateRange)).toBe(true);

    expect(isDateInRange("2026-04-30", dateRange)).toBe(false);
    expect(isDateInRange("2026-05-30", dateRange)).toBe(false);
  });
});
