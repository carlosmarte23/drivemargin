import { formatDate, parseDateString } from "@/lib/date";

export type ReportPeriod = {
  startDate: string;
  endDate: string;
};

export type ReportPeriodInput = {
  start?: string;
  end?: string;
};

export function getCurrentWeekPeriod(
  referenceDate: Date = new Date(),
): ReportPeriod {
  const date = new Date(referenceDate.getTime());
  const day = date.getDay();

  const diffToMonday = day === 0 ? 6 : day - 1;
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - diffToMonday);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}

export function resolveReportPeriod(
  input: ReportPeriodInput,
  referenceDate: Date = new Date(),
): ReportPeriod {
  const { start, end } = input;

  if (!start || !end) {
    return getCurrentWeekPeriod(referenceDate);
  }

  if (!isValidDateString(start) || !isValidDateString(end)) {
    return getCurrentWeekPeriod(referenceDate);
  }

  if (start > end) {
    return getCurrentWeekPeriod(referenceDate);
  }

  return {
    startDate: start,
    endDate: end,
  };
}

export function getPreviousWeekPeriod(period: ReportPeriod): ReportPeriod {
  const startDate = parseDateString(period.startDate);
  const endDate = parseDateString(period.endDate);

  startDate.setDate(startDate.getDate() - 7);
  endDate.setDate(endDate.getDate() - 7);

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}

export function getNextWeekPeriod(period: ReportPeriod): ReportPeriod {
  const startDate = parseDateString(period.startDate);
  const endDate = parseDateString(period.endDate);

  startDate.setDate(startDate.getDate() + 7);
  endDate.setDate(endDate.getDate() + 7);

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}

export function formatReportPeriodLabel(period: ReportPeriod): string {
  // TODO: example "May 25 - May 31, 2026"

  const startDate = parseDateString(period.startDate);
  const endDate = parseDateString(period.endDate);

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const startMonthDay = formatMonthDay(startDate);
  const endMonthDay = formatMonthDay(endDate);

  if (startYear === endYear) {
    return `${startMonthDay} - ${endMonthDay}, ${startYear}`;
  }

  return `${startMonthDay}, ${startYear} - ${endMonthDay}, ${endYear}`;
}

export function isSameReportPeriod(
  firstPeriod: ReportPeriod,
  secondPeriod: ReportPeriod,
): boolean {
  return (
    firstPeriod.startDate === secondPeriod.startDate &&
    firstPeriod.endDate === secondPeriod.endDate
  );
}

const isValidDateString = (dateString: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;

  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(5, 7));
  const day = Number(dateString.slice(8, 10));

  // const date = new Date(year, month - 1, day);

  const date = parseDateString(dateString);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const formatMonthDay = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};
