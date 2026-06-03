import { describe, expect, it } from "vitest";

import {
  formatReportPeriodLabel,
  getCurrentWeekPeriod,
  getNextWeekPeriod,
  getPreviousReportPeriod,
  getPreviousWeekPeriod,
  isSameReportPeriod,
  resolveReportPeriod,
} from "./reportPeriod";

describe("reportPeriod", () => {
  describe("getCurrentWeekPeriod", () => {
    it("returns Monday to Sunday when the reference date is a Monday", () => {
      const referenceDate = new Date(2026, 4, 25, 12);

      const period = getCurrentWeekPeriod(referenceDate);

      expect(period).toEqual({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });
    });

    it("returns Monday to Sunday when the reference date is a Wednesday", () => {
      const referenceDate = new Date(2026, 4, 27, 12);

      const period = getCurrentWeekPeriod(referenceDate);

      expect(period).toEqual({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });
    });

    it("returns Monday to Sunday when the reference date is a Sunday", () => {
      const referenceDate = new Date(2026, 4, 31, 12);

      const period = getCurrentWeekPeriod(referenceDate);

      expect(period).toEqual({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });
    });

    it("uses the report timezone near the UTC week boundary", () => {
      const referenceDate = new Date("2026-06-01T00:30:00.000Z");

      const period = getCurrentWeekPeriod(referenceDate);

      expect(period).toEqual({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });
    });

    it("moves to the next week after midnight in the report timezone", () => {
      const referenceDate = new Date("2026-06-01T04:30:00.000Z");

      const period = getCurrentWeekPeriod(referenceDate);

      expect(period).toEqual({
        startDate: "2026-06-01",
        endDate: "2026-06-07",
      });
    });

    it("handles a week that crosses into the next month", () => {
      const referenceDate = new Date(2026, 5, 1, 12);

      const period = getCurrentWeekPeriod(referenceDate);

      expect(period).toEqual({
        startDate: "2026-06-01",
        endDate: "2026-06-07",
      });
    });

    it("handles a week that crosses into the next year", () => {
      const referenceDate = new Date(2025, 11, 31, 12);

      const period = getCurrentWeekPeriod(referenceDate);

      expect(period).toEqual({
        startDate: "2025-12-29",
        endDate: "2026-01-04",
      });
    });

    it("does not mutate the reference date", () => {
      const referenceDate = new Date(2026, 4, 27, 12);
      const originalTime = referenceDate.getTime();

      getCurrentWeekPeriod(referenceDate);

      expect(referenceDate.getTime()).toBe(originalTime);
    });
  });

  describe("resolveReportPeriod", () => {
    it("returns the period from valid search params", () => {
      const period = resolveReportPeriod(
        {
          start: "2026-05-18",
          end: "2026-05-24",
        },
        new Date(2026, 4, 31, 12),
      );

      expect(period).toEqual({
        startDate: "2026-05-18",
        endDate: "2026-05-24",
      });
    });

    it("falls back to the current week when start is missing", () => {
      const period = resolveReportPeriod(
        {
          end: "2026-05-24",
        },
        new Date(2026, 4, 31, 12),
      );

      expect(period).toEqual({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });
    });

    it("falls back to the current week when end is missing", () => {
      const period = resolveReportPeriod(
        {
          start: "2026-05-18",
        },
        new Date(2026, 4, 31, 12),
      );

      expect(period).toEqual({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });
    });

    it("falls back to the current week when start has an invalid format", () => {
      const period = resolveReportPeriod(
        {
          start: "05-18-2026",
          end: "2026-05-24",
        },
        new Date(2026, 4, 31, 12),
      );

      expect(period).toEqual({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });
    });

    it("falls back to the current week when end has an invalid format", () => {
      const period = resolveReportPeriod(
        {
          start: "2026-05-18",
          end: "May 24, 2026",
        },
        new Date(2026, 4, 31, 12),
      );

      expect(period).toEqual({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });
    });

    it("falls back to the current week when start is after end", () => {
      const period = resolveReportPeriod(
        {
          start: "2026-05-31",
          end: "2026-05-25",
        },
        new Date(2026, 4, 31, 12),
      );

      expect(period).toEqual({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });
    });
  });

  describe("getPreviousWeekPeriod", () => {
    it("returns the previous Monday to Sunday period", () => {
      const period = getPreviousWeekPeriod({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });

      expect(period).toEqual({
        startDate: "2026-05-18",
        endDate: "2026-05-24",
      });
    });

    it("handles previous week across month boundaries", () => {
      const period = getPreviousWeekPeriod({
        startDate: "2026-06-01",
        endDate: "2026-06-07",
      });

      expect(period).toEqual({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });
    });
  });

  describe("getPreviousReportPeriod", () => {
    it("returns the previous period with the same number of days", () => {
      const period = getPreviousReportPeriod({
        startDate: "2026-05-25",
        endDate: "2026-05-26",
      });

      expect(period).toEqual({
        startDate: "2026-05-23",
        endDate: "2026-05-24",
      });
    });

    it("matches the previous week for a seven day week period", () => {
      const period = getPreviousReportPeriod({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });

      expect(period).toEqual({
        startDate: "2026-05-18",
        endDate: "2026-05-24",
      });
    });
  });

  describe("getNextWeekPeriod", () => {
    it("returns the next Monday to Sunday period", () => {
      const period = getNextWeekPeriod({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });

      expect(period).toEqual({
        startDate: "2026-06-01",
        endDate: "2026-06-07",
      });
    });

    it("handles next week across year boundaries", () => {
      const period = getNextWeekPeriod({
        startDate: "2025-12-29",
        endDate: "2026-01-04",
      });

      expect(period).toEqual({
        startDate: "2026-01-05",
        endDate: "2026-01-11",
      });
    });
  });

  describe("formatReportPeriodLabel", () => {
    it("formats a period within the same month", () => {
      const label = formatReportPeriodLabel({
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      });

      expect(label).toBe("May 25 - May 31, 2026");
    });

    it("formats a period across different months", () => {
      const label = formatReportPeriodLabel({
        startDate: "2026-05-25",
        endDate: "2026-06-07",
      });

      expect(label).toBe("May 25 - Jun 7, 2026");
    });

    it("formats a period across different years", () => {
      const label = formatReportPeriodLabel({
        startDate: "2025-12-29",
        endDate: "2026-01-04",
      });

      expect(label).toBe("Dec 29, 2025 - Jan 4, 2026");
    });
  });

  describe("isSameReportPeriod", () => {
    it("returns true when both boundaries match", () => {
      const isSamePeriod = isSameReportPeriod(
        {
          startDate: "2026-05-25",
          endDate: "2026-05-31",
        },
        {
          startDate: "2026-05-25",
          endDate: "2026-05-31",
        },
      );

      expect(isSamePeriod).toBe(true);
    });

    it("returns false when either boundary is different", () => {
      const isSamePeriod = isSameReportPeriod(
        {
          startDate: "2026-05-25",
          endDate: "2026-05-31",
        },
        {
          startDate: "2026-06-01",
          endDate: "2026-06-07",
        },
      );

      expect(isSamePeriod).toBe(false);
    });
  });
});
