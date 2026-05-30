import { ISODateTimeString } from "@/types/domain";

const MILLISECONDS_PER_HOUR = 1000 * 60 * 60;

function parseDateTime(value: ISODateTimeString): number {
  return new Date(value).getTime();
}

export function calculateHoursBetween(
  startedAt: ISODateTimeString,
  endedAt: ISODateTimeString,
): number {
  const startTime = parseDateTime(startedAt);
  const endTime = parseDateTime(endedAt);

  if (!Number.isFinite(startTime) || !Number.isFinite(endTime)) return 0;

  const durationMilliseconds = endTime - startTime;

  if (durationMilliseconds < 0) return 0;

  return durationMilliseconds / MILLISECONDS_PER_HOUR;
}
