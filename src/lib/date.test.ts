import { describe, expect, it } from "vitest";

import { formatDate, parseDateString } from "./date";

describe("date helpers", () => {
  it("formats a date as an ISO date string", () => {
    const date = new Date(2026, 4, 29, 12);

    expect(formatDate(date)).toBe("2026-05-29");
  });

  it("parses an ISO date string as a local date", () => {
    const date = parseDateString("2026-05-29");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(4);
    expect(date.getDate()).toBe(29);
    expect(date.getHours()).toBe(12);
  });
});
