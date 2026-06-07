import { describe, expect, test } from "vitest";

import type { MoneyCents } from "@/types/domain";

import { calculateMileageDeductionCents } from "./irsEstimate";

describe("IRS mileage estimate calculations", () => {
  test("calculateMileageDeductionCents returns miles multiplied by mileage rate cents per mile", () => {
    const irsMileageRateCentsPerMile: MoneyCents = 67;

    expect(
      calculateMileageDeductionCents({
        totalMiles: 80,
        irsMileageRateCentsPerMile,
      }),
    ).toBe(5360);
  });

  test("calculateMileageDeductionCents rounds fractional cents", () => {
    const irsMileageRateCentsPerMile: MoneyCents = 67;

    expect(
      calculateMileageDeductionCents({
        totalMiles: 80.5,
        irsMileageRateCentsPerMile,
      }),
    ).toBe(5394);
  });

  test("calculateMileageDeductionCents returns 0 when miles is 0", () => {
    expect(
      calculateMileageDeductionCents({
        totalMiles: 0,
        irsMileageRateCentsPerMile: 67,
      }),
    ).toBe(0);
  });

  test("calculateMileageDeductionCents returns 0 when mileage rate is 0", () => {
    expect(
      calculateMileageDeductionCents({
        totalMiles: 80,
        irsMileageRateCentsPerMile: 0,
      }),
    ).toBe(0);
  });

  test("calculateMileageDeductionCents returns 0 for invalid or negative inputs", () => {
    expect(
      calculateMileageDeductionCents({
        totalMiles: Number.NaN,
        irsMileageRateCentsPerMile: 67,
      }),
    ).toBe(0);

    expect(
      calculateMileageDeductionCents({
        totalMiles: 80,
        irsMileageRateCentsPerMile: Number.NaN,
      }),
    ).toBe(0);

    expect(
      calculateMileageDeductionCents({
        totalMiles: -80,
        irsMileageRateCentsPerMile: 67,
      }),
    ).toBe(0);

    expect(
      calculateMileageDeductionCents({
        totalMiles: 80,
        irsMileageRateCentsPerMile: -67,
      }),
    ).toBe(0);
  });
});
