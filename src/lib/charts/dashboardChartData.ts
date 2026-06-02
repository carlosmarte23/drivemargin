import type {
  DashboardTrendMetric,
  DashboardTrendPoint,
  DashboardTrendSeries,
} from "@/lib/calculations/dashboardTrendSeries";

export type MetricTrendChartPoint = {
  date: string;
  label: string;
  value: number;
};

export function buildMetricTrendChartData(
  series: DashboardTrendSeries,
  metric: DashboardTrendMetric,
): MetricTrendChartPoint[] {
  return series.map((point) => ({
    date: point.date,
    label: point.date,
    value: getMetricValue(point, metric),
  }));
}

function getMetricValue(
  point: DashboardTrendPoint,
  metric: DashboardTrendMetric,
) {
  switch (metric) {
    case "grossEarnings":
      return point.grossEarningsCents / 100;
    case "netEarnings":
      return point.netEarningsCents / 100;
    case "netPerHour":
      return point.netPerHourCents / 100;
    case "netPerMile":
      return point.netPerMileCents / 100;
    case "totalMiles":
      return point.totalMiles;
    case "hoursWorked":
      return point.hoursWorked;
    case "fuelCost":
      return point.fuelCost / 100;
    case "otherExpenses":
      return point.otherExpenses / 100;
  }
}
