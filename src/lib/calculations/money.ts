import type { MoneyCents } from "@/types/domain";

export function roundToMoneyCents(value: MoneyCents): MoneyCents {
  if (!Number.isFinite(value)) return 0;

  return Math.round(value);
}

export function sumMoneyCents(values: MoneyCents[]): MoneyCents {
  return roundToMoneyCents(values.reduce((total, value) => total + value, 0));
}

export function multiplyMoneyCents(
  amountCents: MoneyCents,
  multiplier: number,
): MoneyCents {
  if (!Number.isFinite(amountCents) || !Number.isFinite(multiplier)) return 0;

  return roundToMoneyCents(amountCents * multiplier);
}

export function divideMoneyCents(
  amountCents: MoneyCents,
  divisor: number,
): MoneyCents {
  if (
    !Number.isFinite(amountCents) ||
    !Number.isFinite(divisor) ||
    divisor === 0
  )
    return 0;

  return roundToMoneyCents(amountCents / divisor);
}
