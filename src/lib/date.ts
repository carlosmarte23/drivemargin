export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatSessionDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatSessionShortDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatSessionTimeRange(
  startedAt: string,
  endedAt: string,
): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formatter.format(new Date(startedAt))} - ${formatter.format(
    new Date(endedAt),
  )}`;
}

export function parseDateString(dateString: string): Date {
  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(5, 7));
  const day = Number(dateString.slice(8, 10));

  return new Date(year, month - 1, day, 12);
}

export type DateRange = { startDate: string; endDate: string };

export function getDateRangeFromDateStrings(dates: string[]): DateRange | null {
  if (dates.length === 0) return null;

  const sortedDates = [...dates].sort();

  return {
    startDate: sortedDates[0]!,
    endDate: sortedDates[sortedDates.length - 1]!,
  };
}

export function isDateInRange(date: string, dateRange: DateRange): boolean {
  return date >= dateRange.startDate && date <= dateRange.endDate;
}
