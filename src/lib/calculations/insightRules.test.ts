import { describe, expect, test } from "vitest";

import type { UserSettings } from "@/types/domain";

import type { DashboardMetrics } from "./dashboardMetrics";
import { generateDashboardInsights } from "./insightRules";

const settings: UserSettings = {
  currency: "USD",
  defaultVehicleId: "vehicle-1",
  targetNetCentsPerHour: 2500,
  targetNetCentsPerMile: 150,
  irsMileageRateCentsPerMile: 67,
  theme: "system",
  language: "en",
};

const baseMetrics: DashboardMetrics = {
  totalGrossEarningsCents: 25000,
  totalNetEarningsCents: 21840,
  totalHoursWorked: 7,
  totalMiles: 140,
  totalEstimatedFuelCostCents: 1960,
  totalOtherExpensesCents: 1200,
  totalFuelPurchasedCents: 9250,
  totalSpendingCents: 10450,
  averageGrossCentsPerHour: 3571,
  averageNetCentsPerHour: 3120,
  averageGrossCentsPerMile: 179,
  averageNetCentsPerMile: 156,
  estimatedMileageDeductionCents: 9380,
  bestAppByGross: {
    workAppId: "spark",
    name: "Walmart Spark",
    grossEarningsCents: 18000,
  },
  bestSession: {
    sessionId: "session-1",
    date: "2026-05-25",
    netEarningsCents: 13880,
  },
};

describe("insight rules", () => {
  test("generateDashboardInsights returns a positive insight when net per hour meets the target", () => {
    const insights = generateDashboardInsights({
      metrics: baseMetrics,
      settings,
    });

    expect(insights).toContainEqual({
      id: "net-per-hour-target-met",
      tone: "positive",
      title: "Net per hour is on target",
      description: "Your average net per hour met or exceeded your target.",
    });
  });

  test("generateDashboardInsights returns a warning insight when net per hour is below the target", () => {
    const insights = generateDashboardInsights({
      metrics: {
        ...baseMetrics,
        averageNetCentsPerHour: 2200,
      },
      settings,
    });

    expect(insights).toContainEqual({
      id: "net-per-hour-target-missed",
      tone: "warning",
      title: "Net per hour is below target",
      description:
        "Your average net per hour was below your configured target.",
    });
  });

  test("generateDashboardInsights returns a positive insight when net per mile meets the target", () => {
    const insights = generateDashboardInsights({
      metrics: baseMetrics,
      settings,
    });

    expect(insights).toContainEqual({
      id: "net-per-mile-target-met",
      tone: "positive",
      title: "Net per mile is on target",
      description: "Your average net per mile met or exceeded your target.",
    });
  });

  test("generateDashboardInsights returns a warning insight when net per mile is below the target", () => {
    const insights = generateDashboardInsights({
      metrics: {
        ...baseMetrics,
        averageNetCentsPerMile: 120,
      },
      settings,
    });

    expect(insights).toContainEqual({
      id: "net-per-mile-target-missed",
      tone: "warning",
      title: "Net per mile is below target",
      description:
        "Your average net per mile was below your configured target.",
    });
  });

  test("generateDashboardInsights warns when estimated fuel cost is more than 15 percent of gross earnings", () => {
    const insights = generateDashboardInsights({
      metrics: {
        ...baseMetrics,
        totalEstimatedFuelCostCents: 5000,
      },
      settings,
    });

    expect(insights).toContainEqual({
      id: "high-fuel-cost-ratio",
      tone: "warning",
      title: "Fuel cost is taking a larger share",
      description:
        "Your estimated fuel cost was more than 15% of gross earnings.",
    });
  });

  test("generateDashboardInsights returns a neutral insight for the best app by gross earnings", () => {
    const insights = generateDashboardInsights({
      metrics: baseMetrics,
      settings,
    });

    expect(insights).toContainEqual({
      id: "best-app-by-gross",
      tone: "neutral",
      title: "Top earning app",
      description:
        "Walmart Spark generated the highest gross earnings in this period.",
    });
  });

  test("generateDashboardInsights returns an empty array when there is no gross earnings data", () => {
    const insights = generateDashboardInsights({
      metrics: {
        ...baseMetrics,
        totalGrossEarningsCents: 0,
        totalNetEarningsCents: 0,
        totalHoursWorked: 0,
        totalMiles: 0,
        totalEstimatedFuelCostCents: 0,
        totalOtherExpensesCents: 0,
        totalFuelPurchasedCents: 0,
        totalSpendingCents: 0,
        averageGrossCentsPerHour: 0,
        averageNetCentsPerHour: 0,
        averageGrossCentsPerMile: 0,
        averageNetCentsPerMile: 0,
        estimatedMileageDeductionCents: 0,
        bestAppByGross: null,
        bestSession: null,
      },
      settings,
    });

    expect(insights).toEqual([]);
  });
});
