export function roundNumber(value: number, decimalPlaces: number = 2): number {
  if (!Number.isFinite(value)) return 0;

  const factor = 10 ** decimalPlaces;

  return Math.round((value + Number.EPSILON) * factor) / factor;
}
