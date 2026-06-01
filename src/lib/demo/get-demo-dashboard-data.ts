import { generateDemoData } from "@/data/demo/generateDemoData";
import {
  calculateDashboardMetrics,
  calculateSessionMetrics,
  getLatestFuelPricePerGallonCents,
} from "@/lib/calculations/index";
import { formatDate, parseDateString } from "@/lib/date";
import { getPreviousWeekPeriod } from "@/lib/reporting/reportPeriod";

import type { ReportPeriod } from "@/lib/reporting/reportPeriod";
import type { DemoData } from "@/types/domain";

export interface RecentSession {
  sessionId: string;
  date: string;
  startedAt: string;
  endedAt: string;
  appShortNames: string[];
  grossEarningsCents: number;
  netEarningsCents: number;
  hoursWorked: number;
  totalMiles: number;
  netCentsPerHour: number;
  netCentsPerMile: number;
}

function isDateInPeriod(date: string, period: ReportPeriod) {
  return date >= period.startDate && date <= period.endDate;
}

function getPeriodData(data: DemoData, period: ReportPeriod) {
  const sessions = data.sessions.filter((session) => {
    return isDateInPeriod(session.date, period);
  });

  const periodSessionsIds = new Set(sessions.map((session) => session.id));

  const sessionAppEarnings = data.sessionAppEarnings.filter((earning) => {
    return periodSessionsIds.has(earning.sessionId);
  });

  const expenses = data.expenses.filter((expense) => {
    return isDateInPeriod(expense.date, period);
  });

  const fuelPurchases = data.fuelPurchases.filter((purchase) => {
    return isDateInPeriod(purchase.date, period);
  });

  return {
    sessions,
    sessionAppEarnings,
    expenses,
    fuelPurchases,
  };
}

function calculateMetricsForPeriod(data: DemoData, period: ReportPeriod) {
  const periodData = getPeriodData(data, period);

  return calculateDashboardMetrics({
    sessions: periodData.sessions,
    sessionAppEarnings: periodData.sessionAppEarnings,
    fuelPurchases: periodData.fuelPurchases,
    expenses: periodData.expenses,
    workApps: data.workApps,
    vehicles: data.vehicles,
    settings: data.settings,
  });
}

function getMetricComparison(currentValue: number, previousValue: number) {
  const deltaValue = currentValue - previousValue;
  const percentChange =
    previousValue === 0
      ? null
      : Math.round((deltaValue / previousValue) * 1000) / 10;

  return {
    currentValue,
    previousValue,
    deltaValue,
    percentChange,
  };
}

function getDatesInPeriod(period: ReportPeriod): string[] {
  const dates: string[] = [];
  const current = parseDateString(period.startDate);
  const end = parseDateString(period.endDate);

  while (current <= end) {
    dates.push(formatDate(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function getDemoDashboardData(period: ReportPeriod) {
  const data = generateDemoData();
  const metrics = calculateMetricsForPeriod(data, period);

  const previousPeriod = getPreviousWeekPeriod(period);
  const previousMetrics = calculateMetricsForPeriod(data, previousPeriod);

  const metricComparisons = {
    totalGrossEarningsCents: getMetricComparison(
      metrics.totalGrossEarningsCents,
      previousMetrics.totalGrossEarningsCents,
    ),
    totalNetEarningsCents: getMetricComparison(
      metrics.totalNetEarningsCents,
      previousMetrics.totalNetEarningsCents,
    ),
    totalHoursWorked: getMetricComparison(
      metrics.totalHoursWorked,
      previousMetrics.totalHoursWorked,
    ),
    totalMiles: getMetricComparison(
      metrics.totalMiles,
      previousMetrics.totalMiles,
    ),
    totalEstimatedFuelCostCents: getMetricComparison(
      metrics.totalEstimatedFuelCostCents,
      previousMetrics.totalEstimatedFuelCostCents,
    ),
    totalOtherExpensesCents: getMetricComparison(
      metrics.totalOtherExpensesCents,
      previousMetrics.totalOtherExpensesCents,
    ),
    averageNetCentsPerHour: getMetricComparison(
      metrics.averageNetCentsPerHour,
      previousMetrics.averageNetCentsPerHour,
    ),
    averageNetCentsPerMile: getMetricComparison(
      metrics.averageNetCentsPerMile,
      previousMetrics.averageNetCentsPerMile,
    ),
  };

  const irsMileageDeduction = {
    amountCents: metrics.estimatedMileageDeductionCents,
    rateCentsPerMile: data.settings.irsMileageRateCentsPerMile,
    totalMiles: metrics.totalMiles,
  };

  const dailyMetrics = getDatesInPeriod(period).map((date) => {
    return {
      date,
      metrics: calculateMetricsForPeriod(data, {
        startDate: date,
        endDate: date,
      }),
    };
  });

  const periodData = getPeriodData(data, period);
  const recentSessions = periodData.sessions
    .toSorted((a, b) => b.startedAt.localeCompare(a.startedAt))
    .slice(0, 5)
    .map((session) => {
      const sessionEarnings = periodData.sessionAppEarnings.filter(
        (earning) => earning.sessionId === session.id,
      );

      const appShortNames = sessionEarnings.map((earning) => {
        const app = data.workApps.find((app) => app.id === earning.workAppId);
        return app?.shortName ?? app?.name ?? earning.workAppId;
      });

      const vehicle = data.vehicles.find((vehicle) => {
        return vehicle.id === session.vehicleId;
      });

      if (!vehicle) {
        return null;
      }

      const sessionFuelPurchases = periodData.fuelPurchases.filter(
        (fuelPurchase) => {
          return fuelPurchase.vehicleId === session.vehicleId;
        },
      );

      const sessionMetrics = calculateSessionMetrics({
        session,
        appEarnings: sessionEarnings,
        vehicle,
        settings: data.settings,
        latestFuelPricePerGallonCents:
          getLatestFuelPricePerGallonCents(sessionFuelPurchases),
      });

      return {
        sessionId: session.id,
        date: session.date,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        appShortNames,
        grossEarningsCents: sessionMetrics.grossEarningsCents,
        netEarningsCents: sessionMetrics.netEarningsCents,
        hoursWorked: sessionMetrics.hoursWorked,
        totalMiles: sessionMetrics.totalMiles,
        netCentsPerHour: sessionMetrics.netCentsPerHour,
        netCentsPerMile: sessionMetrics.netCentsPerMile,
      };
    })
    .filter((session): session is RecentSession => {
      return session !== null;
    });

  return {
    metrics,
    previousPeriod,
    previousMetrics,
    metricComparisons,
    irsMileageDeduction,
    dailyMetrics,
    recentSessions,
  };
}
