import type {
  Expense,
  FuelPurchase,
  MoneyCents,
  SessionAppEarning,
  UserSettings,
  Vehicle,
  WorkApp,
  WorkSession,
} from "@/types/domain";

import { getLatestFuelPricePerGallonCents } from "./fuel";
import { divideMoneyCents, sumMoneyCents } from "./money";
import { roundNumber } from "./number";
import { calculateSessionMetrics, type SessionMetrics } from "./sessionMetrics";

interface CalculateDashboardMetricsInput {
  sessions: WorkSession[];
  sessionAppEarnings: SessionAppEarning[];
  fuelPurchases: FuelPurchase[];
  expenses: Expense[];
  workApps: WorkApp[];
  vehicles: Vehicle[];
  settings: UserSettings;
}

interface BestAppByGross {
  workAppId: WorkApp["id"];
  name: WorkApp["name"];
  grossEarningsCents: MoneyCents;
}

interface BestSession {
  sessionId: WorkSession["id"];
  date: WorkSession["date"];
  netEarningsCents: MoneyCents;
}

export interface DashboardMetrics {
  totalGrossEarningsCents: MoneyCents;
  totalNetEarningsCents: MoneyCents;
  totalHoursWorked: number;
  totalMiles: number;
  totalEstimatedFuelCostCents: MoneyCents;
  totalOtherExpensesCents: MoneyCents;
  totalFuelPurchasedCents: MoneyCents;
  totalSpendingCents: MoneyCents;
  averageGrossCentsPerHour: MoneyCents;
  averageNetCentsPerHour: MoneyCents;
  averageGrossCentsPerMile: MoneyCents;
  averageNetCentsPerMile: MoneyCents;
  estimatedMileageDeductionCents: MoneyCents;
  bestAppByGross: BestAppByGross | null;
  bestSession: BestSession | null;
}

export function calculateDashboardMetrics({
  sessions,
  sessionAppEarnings,
  fuelPurchases,
  expenses,
  workApps,
  vehicles,
  settings,
}: CalculateDashboardMetricsInput): DashboardMetrics {
  const sessionMetrics: SessionMetrics[] = sessions
    .map((session) => {
      const vehicle = vehicles.find((item) => {
        return item.id === session.vehicleId;
      });

      if (!vehicle) {
        return null;
      }

      const sessionFuelPurchases = fuelPurchases.filter((fuelPurchase) => {
        return fuelPurchase.vehicleId === session.vehicleId;
      });

      const latestFuelPricePerGallonCents =
        getLatestFuelPricePerGallonCents(sessionFuelPurchases);

      return calculateSessionMetrics({
        session,
        appEarnings: sessionAppEarnings,
        vehicle,
        settings,
        latestFuelPricePerGallonCents,
      });
    })
    .filter((metric): metric is SessionMetrics => {
      return metric !== null;
    });

  const totalGrossEarningsCents = sumMoneyCents(
    sessionMetrics.map((metric) => metric.grossEarningsCents),
  );

  const totalHoursWorked = roundNumber(
    sessionMetrics.reduce((total, metric) => {
      return total + metric.hoursWorked;
    }, 0),
  );

  const totalMiles = roundNumber(
    sessionMetrics.reduce((total, metric) => {
      return total + metric.totalMiles;
    }, 0),
  );

  const totalEstimatedFuelCostCents = sumMoneyCents(
    sessionMetrics.map((metric) => metric.estimatedFuelCostCents),
  );

  const totalOtherExpensesCents = sumMoneyCents(
    expenses.map((expense) => expense.amountCents),
  );

  const totalFuelPurchasedCents = sumMoneyCents(
    fuelPurchases.map((fuelPurchase) => fuelPurchase.totalPaidCents),
  );

  const totalNetEarningsCents = sumMoneyCents([
    totalGrossEarningsCents,
    -totalEstimatedFuelCostCents,
    -totalOtherExpensesCents,
  ]);

  const totalSpendingCents = sumMoneyCents([
    totalFuelPurchasedCents,
    totalOtherExpensesCents,
  ]);

  const estimatedMileageDeductionCents = sumMoneyCents(
    sessionMetrics.map((metric) => metric.estimatedMileageDeductionCents),
  );

  return {
    totalGrossEarningsCents,
    totalNetEarningsCents,
    totalHoursWorked,
    totalMiles,
    totalEstimatedFuelCostCents,
    totalOtherExpensesCents,
    totalFuelPurchasedCents,
    totalSpendingCents,
    averageGrossCentsPerHour: divideMoneyCents(
      totalGrossEarningsCents,
      totalHoursWorked,
    ),
    averageNetCentsPerHour: divideMoneyCents(
      totalNetEarningsCents,
      totalHoursWorked,
    ),
    averageGrossCentsPerMile: divideMoneyCents(
      totalGrossEarningsCents,
      totalMiles,
    ),
    averageNetCentsPerMile: divideMoneyCents(totalNetEarningsCents, totalMiles),
    estimatedMileageDeductionCents,
    bestAppByGross: getBestAppByGross({
      sessionAppEarnings,
      workApps,
    }),
    bestSession: getBestSessionByNetEarnings({
      sessions,
      sessionMetrics,
    }),
  };
}

function getBestAppByGross({
  sessionAppEarnings,
  workApps,
}: {
  sessionAppEarnings: SessionAppEarning[];
  workApps: WorkApp[];
}): BestAppByGross | null {
  if (sessionAppEarnings.length === 0) {
    return null;
  }

  const earningsByApp = new Map<WorkApp["id"], MoneyCents>();

  for (const earning of sessionAppEarnings) {
    const currentTotal = earningsByApp.get(earning.workAppId) ?? 0;

    earningsByApp.set(
      earning.workAppId,
      sumMoneyCents([currentTotal, earning.amountCents]),
    );
  }

  let bestApp: BestAppByGross | null = null;

  for (const [workAppId, grossEarningsCents] of earningsByApp.entries()) {
    const workApp = workApps.find((app) => app.id === workAppId);

    const candidate: BestAppByGross = {
      workAppId,
      name: workApp?.name ?? workAppId,
      grossEarningsCents,
    };

    if (
      bestApp === null ||
      candidate.grossEarningsCents > bestApp.grossEarningsCents
    ) {
      bestApp = candidate;
    }
  }

  return bestApp;
}

function getBestSessionByNetEarnings({
  sessions,
  sessionMetrics,
}: {
  sessions: WorkSession[];
  sessionMetrics: SessionMetrics[];
}): BestSession | null {
  let bestSessionMetric: SessionMetrics | null = null;

  for (const metric of sessionMetrics) {
    if (
      bestSessionMetric === null ||
      metric.netEarningsCents > bestSessionMetric.netEarningsCents
    ) {
      bestSessionMetric = metric;
    }
  }

  if (bestSessionMetric === null) {
    return null;
  }

  const session = sessions.find((item) => {
    return item.id === bestSessionMetric.sessionId;
  });

  if (!session) {
    return null;
  }

  return {
    sessionId: session.id,
    date: session.date,
    netEarningsCents: bestSessionMetric.netEarningsCents,
  };
}
