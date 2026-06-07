import { calculateDashboardMetrics } from "@/lib/calculations/dashboardMetrics";
import { formatDateToString, parseDateString } from "@/lib/date";
import type { ReportPeriod } from "@/lib/reporting/reportPeriod";
import type {
  Expense,
  FuelPurchase,
  ISODateString,
  MoneyCents,
  SessionAppEarning,
  UserSettings,
  Vehicle,
  WorkApp,
  WorkSession,
} from "@/types/domain";

export type DashboardTrendPoint = {
  date: ISODateString;
  grossEarningsCents: MoneyCents;
  netEarningsCents: MoneyCents;
  hoursWorked: number;
  totalMiles: number;
  netPerHourCents: MoneyCents;
  netPerMileCents: MoneyCents;
  fuelCost: MoneyCents;
  otherExpenses: MoneyCents;
};

export type DashboardTrendSeries = DashboardTrendPoint[];

export type DashboardTrendMetric =
  | "grossEarnings"
  | "netEarnings"
  | "netPerHour"
  | "netPerMile"
  | "totalMiles"
  | "hoursWorked"
  | "fuelCost"
  | "otherExpenses";

type BuildDailyDashboardTrendSeriesParams = {
  period: ReportPeriod;
  sessions: WorkSession[];
  sessionAppEarnings: SessionAppEarning[];
  fuelPurchases: FuelPurchase[];
  expenses: Expense[];
  vehicles: Vehicle[];
  workApps: WorkApp[];
  settings: UserSettings;
};

function getDatesBetween(
  startDate: ISODateString,
  endDate: ISODateString,
): ISODateString[] {
  const dates: ISODateString[] = [];

  const current = parseDateString(startDate);
  const end = parseDateString(endDate);

  while (current <= end) {
    dates.push(formatDateToString(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function buildDailyDashboardTrendSeries({
  period,
  sessions,
  sessionAppEarnings,
  fuelPurchases,
  expenses,
  vehicles,
  workApps,
  settings,
}: BuildDailyDashboardTrendSeriesParams): DashboardTrendSeries {
  const dates = getDatesBetween(period.startDate, period.endDate);

  if (dates.length === 0) {
    return [];
  }

  return dates.map((date) => {
    const daySessions: WorkSession[] = sessions.filter(
      (session) => session.date === date,
    );

    const daySessionIds = daySessions.map((session) => session.id);
    const daySessionEarnings = sessionAppEarnings.filter((earning) => {
      return daySessionIds.includes(earning.sessionId);
    });

    const availableFuelPurchases = fuelPurchases.filter((purchase) => {
      return purchase.date <= date;
    });

    const dayFuelPurchases = fuelPurchases.filter((purchase) => {
      return purchase.date === date;
    });

    const dayExpenses = expenses.filter((expense) => {
      return expense.date === date;
    });

    const dayMetrics = calculateDashboardMetrics({
      sessions: daySessions,
      sessionAppEarnings: daySessionEarnings,
      fuelPurchases: dayFuelPurchases,
      fuelPriceHistory: availableFuelPurchases,
      expenses: dayExpenses,
      vehicles,
      workApps,
      settings,
    });

    return {
      date,
      grossEarningsCents: dayMetrics.totalGrossEarningsCents,
      netEarningsCents: dayMetrics.totalNetEarningsCents,
      hoursWorked: dayMetrics.totalHoursWorked,
      totalMiles: dayMetrics.totalMiles,
      netPerHourCents: dayMetrics.averageNetCentsPerHour,
      netPerMileCents: dayMetrics.averageNetCentsPerMile,
      fuelCost: dayMetrics.totalEstimatedFuelCostCents,
      otherExpenses: dayMetrics.totalOtherExpensesCents,
    };
  });
}

export function getDashboardTrendValues(
  series: DashboardTrendSeries,
  metric: DashboardTrendMetric,
): number[] {
  return series.map((point) => {
    switch (metric) {
      case "grossEarnings":
        return point.grossEarningsCents;
      case "netEarnings":
        return point.netEarningsCents;
      case "netPerHour":
        return point.netPerHourCents;
      case "netPerMile":
        return point.netPerMileCents;
      case "totalMiles":
        return point.totalMiles;
      case "hoursWorked":
        return point.hoursWorked;
      case "fuelCost":
        return point.fuelCost;
      case "otherExpenses":
        return point.otherExpenses;
    }
  });
}
