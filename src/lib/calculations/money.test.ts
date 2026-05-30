import { describe, expect, test } from "vitest";

import {
  sumMoneyCents,
  divideMoneyCents,
  multiplyMoneyCents,
  roundToMoneyCents,
} from "./money";

describe("money calculations", () => {
  test("roundToMoneyCents rounds decimal cents to the nearest integer cent", () => {
    expect(roundToMoneyCents(1120.4)).toBe(1120);
    expect(roundToMoneyCents(1120.5)).toBe(1121);
    expect(roundToMoneyCents(1120.6)).toBe(1121);
  });

  test("roundToMoneyCents returns 0 for invalid values", () => {
    expect(roundToMoneyCents(Number.NaN)).toBe(0);
    expect(roundToMoneyCents(Number.POSITIVE_INFINITY)).toBe(0);
    expect(roundToMoneyCents(Number.NEGATIVE_INFINITY)).toBe(0);
  });

  test("sumMoneyCents adds integer money amounts in cents", () => {
    expect(sumMoneyCents([10000, 5025, 475])).toBe(15500);
    expect(sumMoneyCents([1000, 50.5])).toBe(1051);
  });

  test("sumMoneyCents returns 0 for an empty list", () => {
    expect(sumMoneyCents([])).toBe(0);
  });

  test("multiplyMoneyCents multiplies cents by a quantity and rounds to cents", () => {
    expect(multiplyMoneyCents(350, 3.2)).toBe(1120);
    expect(multiplyMoneyCents(67, 80)).toBe(5360);
  });

  test("multiplyMoneyCents returns 0 for invalid values", () => {
    expect(multiplyMoneyCents(350, Number.NaN)).toBe(0);
    expect(multiplyMoneyCents(Number.NaN, 3.2)).toBe(0);
    expect(multiplyMoneyCents(Number.POSITIVE_INFINITY, 3.2)).toBe(0);
  });

  test("divideMoneyCents divides cents by a quantity and rounds to cents", () => {
    expect(divideMoneyCents(15000, 4)).toBe(3750);
    expect(divideMoneyCents(12880, 80)).toBe(161);
    expect(divideMoneyCents(15000, 80)).toBe(188);
  });

  test("divideMoneyCents returns 0 when the divisor is 0 or invalid", () => {
    expect(divideMoneyCents(15000, 0)).toBe(0);
    expect(divideMoneyCents(15000, Number.NaN)).toBe(0);
    expect(divideMoneyCents(Number.NaN, 4)).toBe(0);
    expect(divideMoneyCents(Number.POSITIVE_INFINITY, 4)).toBe(0);
  });
});
