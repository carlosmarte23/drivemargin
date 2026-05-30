import type { MoneyCents } from "@/types/domain";

import { multiplyMoneyCents } from "./money";

interface calculateMileageDeductionCentsInput {
  totalMiles: number;
  irsMileageRateCentsPerMile: MoneyCents;
}

export function calculateMileageDeductionCents({
  totalMiles,
  irsMileageRateCentsPerMile,
}: calculateMileageDeductionCentsInput): MoneyCents {
  if (
    !Number.isFinite(totalMiles) ||
    !Number.isFinite(irsMileageRateCentsPerMile) ||
    totalMiles <= 0 ||
    irsMileageRateCentsPerMile <= 0
  ) {
    return 0;
  }

  return multiplyMoneyCents(totalMiles, irsMileageRateCentsPerMile);
}
