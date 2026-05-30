import type { UserSettings } from "@/types/domain";

import type { DashboardMetrics } from "./dashboardMetrics";

export type InsightTone = "positive" | "warning" | "neutral";

export interface Insight {
  id: string;
  tone: InsightTone;
  title: string;
  description: string;
}

interface GenerateDashboardInsightsInput {
  metrics: DashboardMetrics;
  settings: UserSettings;
}

const FUEL_COST_WARNING_THRESHOLD_RATIO = 0.15;

export function generateDashboardInsights({
  metrics,
  settings,
}: GenerateDashboardInsightsInput): Insight[] {
  if (metrics.totalGrossEarningsCents <= 0) {
    return [];
  }

  const insights: Insight[] = [];

  if (metrics.averageNetCentsPerHour >= settings.targetNetCentsPerHour) {
    insights.push({
      id: "net-per-hour-target-met",
      tone: "positive",
      title: "Net per hour is on target",
      description: "Your average net per hour met or exceeded your target.",
    });
  } else {
    insights.push({
      id: "net-per-hour-target-missed",
      tone: "warning",
      title: "Net per hour is below target",
      description:
        "Your average net per hour was below your configured target.",
    });
  }

  if (metrics.averageNetCentsPerMile >= settings.targetNetCentsPerMile) {
    insights.push({
      id: "net-per-mile-target-met",
      tone: "positive",
      title: "Net per mile is on target",
      description: "Your average net per mile met or exceeded your target.",
    });
  } else {
    insights.push({
      id: "net-per-mile-target-missed",
      tone: "warning",
      title: "Net per mile is below target",
      description:
        "Your average net per mile was below your configured target.",
    });
  }

  const fuelCostRatio =
    metrics.totalEstimatedFuelCostCents / metrics.totalGrossEarningsCents;

  if (fuelCostRatio > FUEL_COST_WARNING_THRESHOLD_RATIO) {
    insights.push({
      id: "high-fuel-cost-ratio",
      tone: "warning",
      title: "Fuel cost is taking a larger share",
      description:
        "Your estimated fuel cost was more than 15% of gross earnings.",
    });
  }

  if (metrics.bestAppByGross) {
    insights.push({
      id: "best-app-by-gross",
      tone: "neutral",
      title: "Top earning app",
      description: `${metrics.bestAppByGross.name} generated the highest gross earnings in this period.`,
    });
  }

  return insights;
}
