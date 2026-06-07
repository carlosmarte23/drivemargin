const decimalNumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});

function formatDecimalNumber(value: number): string {
  return decimalNumberFormatter.format(value);
}

export function formatHours(value: number): string {
  return `${formatDecimalNumber(value)}h`;
}

export function formatMiles(value: number): string {
  return `${formatDecimalNumber(value)}mi`;
}
