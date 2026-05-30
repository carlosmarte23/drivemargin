import type {
  MoneyCents,
  SessionAppEarning,
  UserSettings,
  Vehicle,
  WorkSession,
} from "@/types/domain";

import { calculateEstimatedFuelCostCents } from "./fuel";
import { calculateMileageDeductionCents } from "./irsEstimate";
import { divideMoneyCents, sumMoneyCents } from "./money";
import { calculateHoursBetween } from "./time";

export interface SessionMetrics {
  sessionId: WorkSession["id"];
  grossEarningsCents: MoneyCents;
  hoursWorked: number;
  totalMiles: number;
  estimatedFuelCostCents: MoneyCents;
  otherExpensesTotalCents: MoneyCents;
  netEarningsCents: MoneyCents;
  grossCentsPerHour: MoneyCents;
  netCentsPerHour: MoneyCents;
  grossCentsPerMile: MoneyCents;
  netCentsPerMile: MoneyCents;
  estimatedMileageDeductionCents: MoneyCents;
}

interface CalculateSessionMetricsInput {
  session: WorkSession;
  appEarnings: SessionAppEarning[];
  vehicle: Vehicle;
  settings: UserSettings;
  latestFuelPricePerGallonCents: MoneyCents;
  otherExpensesTotalCents?: MoneyCents;
}

export function calculateSessionMetrics({
  session,
  appEarnings,
  vehicle,
  settings,
  latestFuelPricePerGallonCents,
  otherExpensesTotalCents = 0,
}: CalculateSessionMetricsInput): SessionMetrics {
  const sessionAppEarnings = appEarnings.filter(
    (earning) => earning.sessionId === session.id,
  );

  const grossEarningsCents = sumMoneyCents(
    sessionAppEarnings.map((earning) => earning.amountCents),
  );

  const hoursWorked = calculateHoursBetween(session.startedAt, session.endedAt);

  const estimatedFuelCostCents = calculateEstimatedFuelCostCents({
    totalMiles: session.totalMiles,
    estimatedMpg: vehicle.estimatedMpg,
    pricePerGallonCents: latestFuelPricePerGallonCents,
  });

  const netEarningsCents = sumMoneyCents([
    grossEarningsCents,
    -estimatedFuelCostCents,
    -otherExpensesTotalCents!,
  ]);

  return {
    sessionId: session.id,
    grossEarningsCents,
    hoursWorked,
    totalMiles: session.totalMiles,
    estimatedFuelCostCents,
    otherExpensesTotalCents,
    netEarningsCents,
    grossCentsPerHour: divideMoneyCents(grossEarningsCents, hoursWorked),
    netCentsPerHour: divideMoneyCents(netEarningsCents, hoursWorked),
    grossCentsPerMile: divideMoneyCents(grossEarningsCents, session.totalMiles),
    netCentsPerMile: divideMoneyCents(netEarningsCents, session.totalMiles),
    estimatedMileageDeductionCents: calculateMileageDeductionCents({
      totalMiles: session.totalMiles,
      irsMileageRateCentsPerMile: settings.irsMileageRateCentsPerMile,
    }),
  };
}
