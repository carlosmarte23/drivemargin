import { describe, expect, test } from "vitest";

import type { FuelPurchase, MoneyCents } from "@/types/domain";

import {
  calculateEstimatedFuelCostCents,
  calculateGallonsPurchased,
  calculateGallonsUsed,
  getLatestFuelPricePerGallonCents,
} from "./fuel";

describe("fuel calculations", () => {
  test("calculateGallonsUsed returns miles divided by estimated MPG", () => {
    expect(calculateGallonsUsed(80, 25)).toBe(3.2);
  });

  test("calculateGallonsUsed returns 0 when miles or MPG are invalid", () => {
    expect(calculateGallonsUsed(80, 0)).toBe(0);
    expect(calculateGallonsUsed(80, Number.NaN)).toBe(0);
    expect(calculateGallonsUsed(Number.NaN, 25)).toBe(0);
    expect(calculateGallonsUsed(-80, 25)).toBe(0);
    expect(calculateGallonsUsed(80, -25)).toBe(0);
  });

  test("calculateEstimatedFuelCostCents returns gallons used multiplied by price per gallon", () => {
    const pricePerGallonCents: MoneyCents = 350;

    expect(
      calculateEstimatedFuelCostCents({
        totalMiles: 80,
        estimatedMpg: 25,
        pricePerGallonCents,
      }),
    ).toBe(1120);
  });

  test("calculateEstimatedFuelCostCents rounds fractional cents", () => {
    const pricePerGallonCents: MoneyCents = 333;

    expect(
      calculateEstimatedFuelCostCents({
        totalMiles: 80,
        estimatedMpg: 25,
        pricePerGallonCents,
      }),
    ).toBe(1066);
  });

  test("calculateEstimatedFuelCostCents returns 0 when inputs are invalid", () => {
    expect(
      calculateEstimatedFuelCostCents({
        totalMiles: 80,
        estimatedMpg: 0,
        pricePerGallonCents: 350,
      }),
    ).toBe(0);

    expect(
      calculateEstimatedFuelCostCents({
        totalMiles: 80,
        estimatedMpg: 25,
        pricePerGallonCents: 0,
      }),
    ).toBe(0);

    expect(
      calculateEstimatedFuelCostCents({
        totalMiles: Number.NaN,
        estimatedMpg: 25,
        pricePerGallonCents: 350,
      }),
    ).toBe(0);
  });

  test("calculateGallonsPurchased returns total paid divided by price per gallon", () => {
    expect(calculateGallonsPurchased(5250, 350)).toBe(15);
  });

  test("calculateGallonsPurchased returns 0 when total paid or price per gallon are invalid", () => {
    expect(calculateGallonsPurchased(5250, 0)).toBe(0);
    expect(calculateGallonsPurchased(Number.NaN, 350)).toBe(0);
    expect(calculateGallonsPurchased(5250, Number.NaN)).toBe(0);
    expect(calculateGallonsPurchased(-5250, 350)).toBe(0);
    expect(calculateGallonsPurchased(5250, -350)).toBe(0);
  });

  test("getLatestFuelPricePerGallonCents returns the price from the most recent fuel purchase", () => {
    const fuelPurchases: FuelPurchase[] = [
      {
        id: "fuel-1",
        vehicleId: "vehicle-1",
        date: "2026-05-20",
        totalPaidCents: 4500,
        pricePerGallonCents: 325,
        gallons: 13.85,
      },
      {
        id: "fuel-2",
        vehicleId: "vehicle-1",
        date: "2026-05-27",
        totalPaidCents: 5250,
        pricePerGallonCents: 350,
        gallons: 15,
      },
      {
        id: "fuel-3",
        vehicleId: "vehicle-1",
        date: "2026-05-24",
        totalPaidCents: 4800,
        pricePerGallonCents: 340,
        gallons: 14.12,
      },
    ];

    expect(getLatestFuelPricePerGallonCents(fuelPurchases)).toBe(350);
  });

  test("getLatestFuelPricePerGallonCents returns 0 when there are no fuel purchases", () => {
    expect(getLatestFuelPricePerGallonCents([])).toBe(0);
  });
});
