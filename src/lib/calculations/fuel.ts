// calculateEstimatedFuelCostCents,
//   calculateGallonsPurchased,
//   calculateGallonsUsed,
//   getLatestFuelPricePerGallonCents,

import type { FuelPurchase, MoneyCents } from "@/types/domain";

import { multiplyMoneyCents } from "./money";

interface CalculateEstimatedFuelCostInput {
  totalMiles: number;
  estimatedMpg: number;
  pricePerGallonCents: MoneyCents;
}

export function calculateGallonsUsed(
  totalMiles: number,
  estimatedMpg: number,
): number {
  if (
    !Number.isFinite(estimatedMpg) ||
    !Number.isFinite(totalMiles) ||
    totalMiles <= 0 ||
    estimatedMpg <= 0
  ) {
    return 0;
  }

  return totalMiles / estimatedMpg;
}

export function calculateEstimatedFuelCostCents({
  totalMiles,
  estimatedMpg,
  pricePerGallonCents,
}: CalculateEstimatedFuelCostInput): MoneyCents {
  if (
    !Number.isFinite(estimatedMpg) ||
    !Number.isFinite(totalMiles) ||
    !Number.isFinite(pricePerGallonCents) ||
    totalMiles <= 0 ||
    estimatedMpg <= 0 ||
    pricePerGallonCents <= 0
  ) {
    return 0;
  }

  return multiplyMoneyCents(
    calculateGallonsUsed(totalMiles, estimatedMpg),
    pricePerGallonCents,
  );
}

export function calculateGallonsPurchased(
  totalPaidCents: MoneyCents,
  pricePerGallonCents: MoneyCents,
): number {
  if (
    !Number.isFinite(totalPaidCents) ||
    !Number.isFinite(pricePerGallonCents) ||
    totalPaidCents <= 0 ||
    pricePerGallonCents <= 0
  ) {
    return 0;
  }

  return totalPaidCents / pricePerGallonCents;
}

export function getLatestFuelPricePerGallonCents(
  fuelPurchases: FuelPurchase[],
): MoneyCents {
  if (fuelPurchases.length === 0) return 0;

  const latestFuelPurchase = fuelPurchases.toSorted((a, b) => {
    return b.date.localeCompare(a.date);
  })[0];

  return latestFuelPurchase?.pricePerGallonCents;
}
