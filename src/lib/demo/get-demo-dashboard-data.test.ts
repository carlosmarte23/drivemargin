import { afterEach, describe, expect, it, vi } from "vitest";

import { getDemoDashboardData } from "./get-demo-dashboard-data";

describe("getDemoDashboardData", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("calculates dashboard metrics from demo records inside the period", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-29T12:00:00.000Z"));

    const metrics = getDemoDashboardData({
      startDate: "2026-05-25",
      endDate: "2026-05-31",
    });

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

  it("returns empty metrics when the period has no demo records", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-29T12:00:00.000Z"));

    const metrics = getDemoDashboardData({
      startDate: "2026-04-01",
      endDate: "2026-04-07",
    });

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
  });
});
