import type {
  DashboardTrendMetric,
  DashboardTrendPoint,
  DashboardTrendSeries,
} from "@/lib/calculations/dashboardTrendSeries";
import type { SessionAppEarning, WorkApp } from "@/types/domain";

const APP_CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

function centsToDollars(cents: number): number {
  return Math.round((cents / 100) * 100) / 100;
}

function formatChartDateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

function getMetricValue(
  point: DashboardTrendPoint,
  metric: DashboardTrendMetric,
) {
  switch (metric) {
    case "grossEarnings":
      return centsToDollars(point.grossEarningsCents);
    case "netEarnings":
      return centsToDollars(point.netEarningsCents);
    case "netPerHour":
      return centsToDollars(point.netPerHourCents);
    case "netPerMile":
      return centsToDollars(point.netPerMileCents);
    case "totalMiles":
      return point.totalMiles;
    case "hoursWorked":
      return point.hoursWorked;
    case "fuelCost":
      return centsToDollars(point.fuelCost);
    case "otherExpenses":
      return centsToDollars(point.otherExpenses);
  }
}

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

export type EarningsOverTimeChartPoint = {
  date: string;
  label: string;
  net: number;
  previousDate: string | null;
  previousLabel: string | null;
  previousNet: number | null;
};

export function buildEarningsOverTimeChartData(
  series: DashboardTrendSeries,
  previousSeries: DashboardTrendSeries = [],
): EarningsOverTimeChartPoint[] {
  return series.map((point, index) => {
    const previousPoint = previousSeries[index];

    return {
      date: point.date,
      label: formatChartDateLabel(point.date),
      net: centsToDollars(point.netEarningsCents),
      previousDate: previousPoint?.date ?? null,
      previousLabel: previousPoint
        ? formatChartDateLabel(previousPoint.date)
        : null,
      previousNet: previousPoint
        ? centsToDollars(previousPoint.netEarningsCents)
        : null,
    };
  });
}

export type GrossVsExpensesChartPoint = {
  label: string;
  gross: number;
  expenses: number;
};

export function buildGrossVsExpensesChartData(
  metrics: {
    totalGrossEarningsCents: number;
    totalEstimatedFuelCostCents: number;
    totalOtherExpensesCents: number;
  },
  periodLabel: string,
): GrossVsExpensesChartPoint[] {
  const expensesCents =
    metrics.totalEstimatedFuelCostCents + metrics.totalOtherExpensesCents;

  return [
    {
      label: periodLabel,
      gross: centsToDollars(metrics.totalGrossEarningsCents),
      expenses: centsToDollars(expensesCents),
    },
  ];
}

export type EarningsByAppChartPoint = {
  appName: string;
  appShortName: string;
  color: string;
  earnings: number;
};

type BuildEarningsByAppChartDataParams = {
  sessionAppEarnings: SessionAppEarning[];
  workApps: WorkApp[];
};

export function buildEarningsByAppChartData({
  sessionAppEarnings,
  workApps,
}: BuildEarningsByAppChartDataParams): EarningsByAppChartPoint[] {
  const totalsByAppId = new Map<string, number>();

  for (const earning of sessionAppEarnings) {
    const currentTotal = totalsByAppId.get(earning.workAppId) ?? 0;

    totalsByAppId.set(earning.workAppId, currentTotal + earning.amountCents);
  }

  return Array.from(totalsByAppId.entries())
    .map(([workAppId, earningsCents]) => {
      const app = workApps.find((item) => item.id === workAppId);

      return {
        appName: app?.name ?? workAppId,
        appShortName: app?.shortName ?? app?.name ?? workAppId,
        color: app?.color,
        earnings: centsToDollars(earningsCents),
      };
    })
    .sort((a, b) => b.earnings - a.earnings)
    .map((point, index) => ({
      ...point,
      color: point.color ?? APP_CHART_COLORS[index % APP_CHART_COLORS.length],
    }));
}
