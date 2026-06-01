import { formatDate, parseDateString } from "@/lib/date";

const REPORT_PERIOD_TIME_ZONE = "America/New_York";

const reportPeriodDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: REPORT_PERIOD_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

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
  const date = getReportPeriodDate(referenceDate);
  const day = date.getDay();

  const diffToMonday = day === 0 ? 6 : day - 1;
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - diffToMonday);
  startDate.setHours(12, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(12, 0, 0, 0);

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

function getReportPeriodDate(referenceDate: Date): Date {
  const dateParts = reportPeriodDateFormatter.formatToParts(referenceDate);
  const year = Number(getDatePart(dateParts, "year"));
  const month = Number(getDatePart(dateParts, "month"));
  const day = Number(getDatePart(dateParts, "day"));

  return new Date(year, month - 1, day, 12);
}

function getDatePart(
  dateParts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
): string {
  return (
    dateParts.find((datePart) => {
      return datePart.type === type;
    })?.value ?? ""
  );
}

const formatMonthDay = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};
