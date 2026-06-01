import { afterEach, describe, expect, it, vi } from "vitest";

import { getDemoDashboardData } from "./get-demo-dashboard-data";

describe("getDemoDashboardData", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("calculates dashboard metrics from demo records inside the period", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-29T12:00:00.000Z"));

    const data = getDemoDashboardData({
      startDate: "2026-05-25",
      endDate: "2026-05-31",
    });

    const { metrics } = data;

    expect(metrics.totalGrossEarningsCents).toBe(39835);
    expect(metrics.totalNetEarningsCents).toBe(36685);
    expect(metrics.totalHoursWorked).toBeCloseTo(19.5);
    expect(metrics.totalMiles).toBeCloseTo(234.9);
    expect(metrics.totalEstimatedFuelCostCents).toBe(902);
    expect(metrics.totalOtherExpensesCents).toBe(2248);
    expect(metrics.totalFuelPurchasedCents).toBe(3734);
    expect(metrics.totalSpendingCents).toBe(5982);
    expect(metrics.averageGrossCentsPerHour).toBe(2043);
    expect(metrics.averageNetCentsPerHour).toBe(1881);
    expect(metrics.averageGrossCentsPerMile).toBe(170);
    expect(metrics.averageNetCentsPerMile).toBe(156);
    expect(metrics.estimatedMileageDeductionCents).toBe(17619);
    expect(metrics.bestAppByGross).toEqual({
      workAppId: "demo-work-app-doordash",
      name: "DoorDash",
      grossEarningsCents: 24320,
    });
    expect(metrics.bestSession).toEqual({
      sessionId: "demo-session-014",
      date: "2026-05-27",
      netEarningsCents: 13298,
    });
  });

  it("calculates previous period metrics and comparisons", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-29T12:00:00.000Z"));

    const data = getDemoDashboardData({
      startDate: "2026-05-25",
      endDate: "2026-05-31",
    });

    expect(data.previousPeriod).toEqual({
      startDate: "2026-05-18",
      endDate: "2026-05-24",
    });
    expect(data.previousMetrics.totalGrossEarningsCents).toBe(31075);
    expect(data.previousMetrics.totalNetEarningsCents).toBe(26875);
    expect(data.previousMetrics.totalHoursWorked).toBeCloseTo(16.92);
    expect(data.previousMetrics.totalMiles).toBeCloseTo(205.6);

    expect(data.metricComparisons.totalGrossEarningsCents).toEqual({
      currentValue: 39835,
      previousValue: 31075,
      deltaValue: 8760,
      percentChange: 28.2,
    });
    expect(data.metricComparisons.averageNetCentsPerHour).toEqual({
      currentValue: 1881,
      previousValue: 1588,
      deltaValue: 293,
      percentChange: 18.5,
    });
    expect(data.metricComparisons.totalEstimatedFuelCostCents).toEqual({
      currentValue: 902,
      previousValue: 2090,
      deltaValue: -1188,
      percentChange: -56.8,
    });
  });

  it("returns IRS mileage deduction summary for the active period", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-29T12:00:00.000Z"));

    const data = getDemoDashboardData({
      startDate: "2026-05-25",
      endDate: "2026-05-31",
    });

    expect(data.irsMileageDeduction).toEqual({
      amountCents: 17619,
      rateCentsPerMile: 75,
      totalMiles: 234.9,
    });
  });

  it("returns daily metrics for trend visualizations", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-29T12:00:00.000Z"));

    const data = getDemoDashboardData({
      startDate: "2026-05-25",
      endDate: "2026-05-31",
    });

    expect(data.dailyMetrics.map((day) => day.date)).toEqual([
      "2026-05-25",
      "2026-05-26",
      "2026-05-27",
      "2026-05-28",
      "2026-05-29",
      "2026-05-30",
      "2026-05-31",
    ]);
    expect(data.dailyMetrics[2].metrics).toMatchObject({
      totalGrossEarningsCents: 14200,
      totalNetEarningsCents: 13298,
      totalEstimatedFuelCostCents: 902,
    });
    expect(data.dailyMetrics[5].metrics).toMatchObject({
      totalGrossEarningsCents: 0,
      totalNetEarningsCents: 0,
      totalHoursWorked: 0,
      totalMiles: 0,
    });
  });

  it("returns recent sessions for the active period in reverse chronological order", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-29T12:00:00.000Z"));

    const data = getDemoDashboardData({
      startDate: "2026-05-25",
      endDate: "2026-05-31",
    });

    expect(data.recentSessions.map((session) => session.sessionId)).toEqual([
      "demo-session-016",
      "demo-session-015",
      "demo-session-014",
      "demo-session-013",
      "demo-session-012",
    ]);
    expect(data.recentSessions[0]).toMatchObject({
      sessionId: "demo-session-016",
      date: "2026-05-29",
      appShortNames: ["DD", "UE"],
      grossEarningsCents: 8255,
      netEarningsCents: 8255,
      netCentsPerHour: 2416,
      netCentsPerMile: 194,
    });
    expect(data.recentSessions[0].hoursWorked).toBeCloseTo(3.42, 2);
    expect(data.recentSessions[0].totalMiles).toBeCloseTo(42.5);
    expect(data.recentSessions[2]).toMatchObject({
      sessionId: "demo-session-014",
      date: "2026-05-27",
      appShortNames: ["DD", "UE"],
      grossEarningsCents: 14200,
      netEarningsCents: 13298,
    });
  });

  it("returns empty metrics when the period has no demo records", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-29T12:00:00.000Z"));

    const data = getDemoDashboardData({
      startDate: "2026-04-01",
      endDate: "2026-04-07",
    });

    const { metrics } = data;

    expect(metrics.totalGrossEarningsCents).toBe(0);
    expect(metrics.totalNetEarningsCents).toBe(0);
    expect(metrics.totalHoursWorked).toBe(0);
    expect(metrics.totalMiles).toBe(0);
    expect(metrics.totalEstimatedFuelCostCents).toBe(0);
    expect(metrics.totalOtherExpensesCents).toBe(0);
    expect(metrics.totalFuelPurchasedCents).toBe(0);
    expect(metrics.totalSpendingCents).toBe(0);
    expect(metrics.averageGrossCentsPerHour).toBe(0);
    expect(metrics.averageNetCentsPerHour).toBe(0);
    expect(metrics.averageGrossCentsPerMile).toBe(0);
    expect(metrics.averageNetCentsPerMile).toBe(0);
    expect(metrics.estimatedMileageDeductionCents).toBe(0);
    expect(metrics.bestAppByGross).toBeNull();
    expect(metrics.bestSession).toBeNull();
    expect(data.dailyMetrics).toHaveLength(7);
    expect(data.recentSessions).toEqual([]);
  });
});
