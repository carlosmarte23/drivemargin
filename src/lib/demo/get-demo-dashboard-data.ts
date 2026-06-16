import { generateDemoData } from "@/data/demo/generateDemoData";
import { buildDailyDashboardTrendSeries } from "@/lib/calculations/dashboardTrendSeries";
import {
  calculateDashboardMetrics,
  calculateSessionMetrics,
  getLatestFuelPricePerGallonCents,
} from "@/lib/calculations/index";
import {
  buildEarningsByAppChartData,
  buildEarningsOverTimeChartData,
  buildGrossVsExpensesChartData,
} from "@/lib/charts/dashboardChartData";
import { formatDateToString, parseDateString } from "@/lib/date";
import {
  formatReportPeriodLabel,
  getPreviousReportPeriod,
  type ReportPeriod,
} from "@/lib/reporting/reportPeriod";
import type { DemoData } from "@/types/domain";

interface RecentSession {
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
  const fuelPriceHistory = data.fuelPurchases.filter((purchase) => {
    return purchase.date <= period.endDate;
  });

  return calculateDashboardMetrics({
    sessions: periodData.sessions,
    sessionAppEarnings: periodData.sessionAppEarnings,
    fuelPurchases: periodData.fuelPurchases,
    fuelPriceHistory,
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
    dates.push(formatDateToString(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function buildDemoDashboardData(data: DemoData, period: ReportPeriod) {
  const metrics = calculateMetricsForPeriod(data, period);

  const previousPeriod = getPreviousReportPeriod(period);
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

  const efficiencyTargets = {
    netPerHour: {
      targetCents: data.settings.targetNetCentsPerHour,
      meetsTarget:
        metrics.averageNetCentsPerHour >= data.settings.targetNetCentsPerHour,
    },
    netPerMile: {
      targetCents: data.settings.targetNetCentsPerMile,
      meetsTarget:
        metrics.averageNetCentsPerMile >= data.settings.targetNetCentsPerMile,
    },
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

      const sessionFuelPurchases = data.fuelPurchases.filter((fuelPurchase) => {
        return (
          fuelPurchase.vehicleId === session.vehicleId &&
          fuelPurchase.date <= session.date
        );
      });

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

  const dailyTrendSeries = buildDailyDashboardTrendSeries({
    period,
    sessions: periodData.sessions,
    sessionAppEarnings: periodData.sessionAppEarnings,
    vehicles: data.vehicles,
    settings: data.settings,
    fuelPurchases: data.fuelPurchases,
    expenses: periodData.expenses,
    workApps: data.workApps,
  });

  const previousPeriodData = getPeriodData(data, previousPeriod);
  const previousDailyTrendSeries = buildDailyDashboardTrendSeries({
    period: previousPeriod,
    sessions: previousPeriodData.sessions,
    sessionAppEarnings: previousPeriodData.sessionAppEarnings,
    vehicles: data.vehicles,
    settings: data.settings,
    fuelPurchases: data.fuelPurchases,
    expenses: previousPeriodData.expenses,
    workApps: data.workApps,
  });

  const charts = {
    earningsOverTime: buildEarningsOverTimeChartData(
      dailyTrendSeries,
      previousDailyTrendSeries,
    ),
    grossVsExpenses: buildGrossVsExpensesChartData(
      metrics,
      formatReportPeriodLabel(period),
    ),
    earningsByApp: buildEarningsByAppChartData({
      sessionAppEarnings: periodData.sessionAppEarnings,
      workApps: data.workApps,
    }),
  };

  return {
    metrics,
    previousPeriod,
    previousMetrics,
    metricComparisons,
    efficiencyTargets,
    irsMileageDeduction,
    dailyMetrics,
    recentSessions,
    dailyTrendSeries,
    charts,
  };
}

export function getDemoDashboardData(period: ReportPeriod) {
  return buildDemoDashboardData(generateDemoData(), period);
}
