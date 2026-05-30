import { describe, expect, test } from "vitest";

import type { ISODateTimeString } from "@/types/domain";

import { calculateHoursBetween } from "./time";

describe("time calculations", () => {
  test("calculateHoursBetween returns whole hours between two valid datetimes", () => {
    const startedAt: ISODateTimeString = "2026-05-25T08:00:00.000Z";
    const endedAt: ISODateTimeString = "2026-05-25T12:00:00.000Z";

    expect(calculateHoursBetween(startedAt, endedAt)).toBe(4);
  });

  test("calculateHoursBetween returns decimal hours between two valid datetimes", () => {
    const startedAt: ISODateTimeString = "2026-05-25T08:15:00.000Z";
    const endedAt: ISODateTimeString = "2026-05-25T11:45:00.000Z";

    expect(calculateHoursBetween(startedAt, endedAt)).toBe(3.5);
  });

  test("calculateHoursBetween returns 0 when the end datetime is before the start datetime", () => {
    const startedAt: ISODateTimeString = "2026-05-25T12:00:00.000Z";
    const endedAt: ISODateTimeString = "2026-05-25T08:00:00.000Z";

    expect(calculateHoursBetween(startedAt, endedAt)).toBe(0);
  });

  test("calculateHoursBetween returns 0 when the datetimes are the same", () => {
    const startedAt: ISODateTimeString = "2026-05-25T08:00:00.000Z";
    const endedAt: ISODateTimeString = "2026-05-25T08:00:00.000Z";

    expect(calculateHoursBetween(startedAt, endedAt)).toBe(0);
  });

  test("calculateHoursBetween returns 0 when a datetime is invalid", () => {
    expect(
      calculateHoursBetween("invalid-date", "2026-05-25T12:00:00.000Z"),
    ).toBe(0);

    expect(
      calculateHoursBetween("2026-05-25T08:00:00.000Z", "invalid-date"),
    ).toBe(0);
  });
});
