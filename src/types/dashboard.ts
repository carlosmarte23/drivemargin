import type { DashboardMetrics } from "@/lib/calculations/dashboardMetrics";
import type { DashboardTrendSeries } from "@/lib/calculations/dashboardTrendSeries";
import type {
  EarningsByAppChartPoint,
  EarningsOverTimeChartPoint,
  GrossVsExpensesChartPoint,
} from "@/lib/charts/dashboardChartData";

export type DashboardMetricComparison = {
  currentValue: number;
  previousValue: number;
  deltaValue: number;
  percentChange: number | null;
};

export type DashboardMetricComparisons = {
  totalGrossEarningsCents: DashboardMetricComparison;
  totalNetEarningsCents: DashboardMetricComparison;
  totalHoursWorked: DashboardMetricComparison;
  totalMiles: DashboardMetricComparison;
  totalEstimatedFuelCostCents: DashboardMetricComparison;
  totalOtherExpensesCents: DashboardMetricComparison;
  averageNetCentsPerHour: DashboardMetricComparison;
  averageNetCentsPerMile: DashboardMetricComparison;
};

export type DashboardIrsMileageDeduction = {
  amountCents: number;
  rateCentsPerMile: number;
  totalMiles: number;
};

export type DashboardRecentSession = {
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
};

export type DashboardChartsData = {
  earningsOverTime: EarningsOverTimeChartPoint[];
  grossVsExpenses: GrossVsExpensesChartPoint[];
  earningsByApp: EarningsByAppChartPoint[];
};

export type DashboardData = {
  metrics: DashboardMetrics;
  metricComparisons: DashboardMetricComparisons;
  irsMileageDeduction: DashboardIrsMileageDeduction;
  charts: DashboardChartsData;
  dailyTrendSeries: DashboardTrendSeries;
  recentSessions: DashboardRecentSession[];
  efficiencyTargets: DashboardEfficiencyTargets;
};

export type DashboardTargetStatus = {
  targetCents: number;
  meetsTarget: boolean;
};

export type DashboardEfficiencyTargets = {
  netPerHour: DashboardTargetStatus;
  netPerMile: DashboardTargetStatus;
};
