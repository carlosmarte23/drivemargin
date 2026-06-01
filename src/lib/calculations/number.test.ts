import { describe, expect, test } from "vitest";

import { roundNumber } from "./number";

describe("number calculations", () => {
  test("roundNumber trims floating point precision noise", () => {
    expect(roundNumber(0.1 + 0.2)).toBe(0.3);
    expect(roundNumber(234.89999999999998)).toBe(234.9);
  });

  test("roundNumber supports custom decimal places", () => {
    expect(roundNumber(64.672, 1)).toBe(64.7);
    expect(roundNumber(3.425, 2)).toBe(3.43);
  });

  test("roundNumber returns 0 for non-finite values", () => {
    expect(roundNumber(Number.NaN)).toBe(0);
    expect(roundNumber(Number.POSITIVE_INFINITY)).toBe(0);
  });
});
