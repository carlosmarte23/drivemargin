import {
  calculateSessionMetrics,
  type SessionMetrics,
} from "@/lib/calculations/sessionMetrics";
import type {
  EntityId,
  FuelPurchase,
  MoneyCents,
  SessionAppEarning,
  UserSettings,
  Vehicle,
  WorkSession,
} from "@/types/domain";

export type SessionSummaryInsightTone = "positive" | "neutral" | "warning";

type SessionSummaryInsightId =
  | "above-hourly-goal"
  | "below-hourly-goal"
  | "above-mileage-goal"
  | "below-mileage-goal"
  | "fuel-cost-high"
  | "fuel-cost-controlled"
  | "fuel-estimate-incomplete";

export type SessionSummaryInsight = {
  id: SessionSummaryInsightId;
  tone: SessionSummaryInsightTone;
  title: string;
  description: string;
};

export type SessionSummary = {
  sessionId: EntityId;
  grossEarningsCents: MoneyCents;
  estimatedFuelCostCents: MoneyCents;
  estimatedNetAfterFuelCents: MoneyCents;
  hoursWorked: number;
  totalMiles: number;
  netPerHourCents: MoneyCents;
  netPerMileCents: MoneyCents;
  insights: SessionSummaryInsight[];
};

type BuildSessionCreatedSummaryInput = {
  session: WorkSession;
  appEarnings: SessionAppEarning[];
  sessionVehicle: Vehicle;
  settings: UserSettings;
  fuelPurchases: FuelPurchase[];
};

export function buildSessionSummary(
  input: BuildSessionCreatedSummaryInput,
): SessionSummary {
  const { session, appEarnings, sessionVehicle, settings, fuelPurchases } =
    input;

  const latestFuelPurchase = fuelPurchases
    .filter(
      (fuelPurchase) =>
        fuelPurchase.vehicleId === session.vehicleId &&
        fuelPurchase.date <= session.date,
    )
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  const latestFuelPricePerGallonCents =
    latestFuelPurchase?.pricePerGallonCents ?? 0;

  const metrics = calculateSessionMetrics({
    session,
    appEarnings,
    vehicle: sessionVehicle,
    settings,
    latestFuelPricePerGallonCents,
    otherExpensesTotalCents: 0,
  });

  const insights = generateSessionInsights({
    metrics,
    settings,
    hasFuelPrice: latestFuelPricePerGallonCents > 0,
  });

  return {
    sessionId: session.id,
    grossEarningsCents: metrics.grossEarningsCents,
    estimatedFuelCostCents: metrics.estimatedFuelCostCents,
    estimatedNetAfterFuelCents: metrics.netEarningsCents,
    hoursWorked: metrics.hoursWorked,
    totalMiles: metrics.totalMiles,
    netPerHourCents: metrics.netCentsPerHour,
    netPerMileCents: metrics.netCentsPerMile,
    insights,
  };
}

function generateSessionInsights({
  metrics,
  settings,
  hasFuelPrice,
}: {
  metrics: SessionMetrics;
  settings: UserSettings;
  hasFuelPrice: boolean;
}): SessionSummaryInsight[] {
  const summaryInsights: SessionSummaryInsight[] = [];

  if (!hasFuelPrice) {
    summaryInsights.push({
      id: "fuel-estimate-incomplete",
      tone: "neutral",
      title: "No Fuel Estimate",
      description:
        "No fuel price was available, so this session does not include an estimated fuel cost.",
    });
  }

  if (metrics.netCentsPerHour >= settings.targetNetCentsPerHour) {
    summaryInsights.push({
      id: "above-hourly-goal",
      tone: "positive",
      title: "Above Hourly Goal",
      description: "Your net per hour exceeded your target.",
    });
  } else {
    summaryInsights.push({
      id: "below-hourly-goal",
      tone: "warning",
      title: "Below Hourly Goal",
      description: "Your net per hour was below your target.",
    });
  }

  if (metrics.netCentsPerMile >= settings.targetNetCentsPerMile) {
    summaryInsights.push({
      id: "above-mileage-goal",
      tone: "positive",
      title: "Above Mileage Goal",
      description: "Your net per mile exceeded your target.",
    });
  } else {
    summaryInsights.push({
      id: "below-mileage-goal",
      tone: "warning",
      title: "Below Mileage Goal",
      description: "Your net per mile was below your target.",
    });
  }

  const fuelCostRatio =
    metrics.grossEarningsCents > 0
      ? metrics.estimatedFuelCostCents / metrics.grossEarningsCents
      : 0;

  if (hasFuelPrice && fuelCostRatio >= 0.15) {
    summaryInsights.push({
      id: "fuel-cost-high",
      tone: "warning",
      title: "High Fuel Cost",
      description:
        "Your estimated fuel cost is over 15% of your gross earnings.",
    });
  }

  if (hasFuelPrice && fuelCostRatio < 0.15) {
    summaryInsights.push({
      id: "fuel-cost-controlled",
      tone: "neutral",
      title: "Fuel stayed controlled",
      description:
        "Your estimated fuel cost stayed below 15% of your gross earnings.",
    });
  }
  return summaryInsights;
}
