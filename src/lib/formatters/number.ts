export function formatDecimalNumber(
  value: number,
  maximumFractionDigits: number = 1,
): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(value);
}

export function formatHours(value: number): string {
  return `${formatDecimalNumber(value, 1)}h`;
}

export function formatMiles(value: number): string {
  return `${formatDecimalNumber(value, 1)}mi`;
}
