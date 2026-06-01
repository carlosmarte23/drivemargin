import { describe, expect, test } from "vitest";

import type {
  Expense,
  FuelPurchase,
  SessionAppEarning,
  UserSettings,
  Vehicle,
  WorkApp,
  WorkSession,
} from "@/types/domain";

import { calculateDashboardMetrics } from "./dashboardMetrics";

const vehicles: Vehicle[] = [
  {
    id: "vehicle-1",
    name: "Toyota Camry",
    estimatedMpg: 25,
    isDefault: true,
  },
  {
    id: "vehicle-2",
    name: "Honda Civic",
    estimatedMpg: 32,
    isDefault: false,
  },
];

const settings: UserSettings = {
  currency: "USD",
  defaultVehicleId: "vehicle-1",
  targetNetCentsPerHour: 2500,
  targetNetCentsPerMile: 150,
  irsMileageRateCentsPerMile: 67,
  theme: "system",
  language: "en",
};

const workApps: WorkApp[] = [
  {
    id: "spark",
    name: "Walmart Spark",
    shortName: "Spark",
  },
  {
    id: "doordash",
    name: "DoorDash",
    shortName: "DD",
  },
  {
    id: "ubereats",
    name: "Uber Eats",
    shortName: "UE",
  },
];

const sessions: WorkSession[] = [
  {
    id: "session-1",
    vehicleId: "vehicle-1",
    startedAt: "2026-05-25T08:00:00.000Z",
    endedAt: "2026-05-25T12:00:00.000Z",
    date: "2026-05-25",
    mileageEntryMode: "manual",
    totalMiles: 80,
  },
  {
    id: "session-2",
    vehicleId: "vehicle-2",
    startedAt: "2026-05-26T09:00:00.000Z",
    endedAt: "2026-05-26T12:00:00.000Z",
    date: "2026-05-26",
    mileageEntryMode: "manual",
    totalMiles: 60,
  },
];

const sessionAppEarnings: SessionAppEarning[] = [
  {
    id: "earning-1",
    sessionId: "session-1",
    workAppId: "spark",
    amountCents: 10000,
  },
  {
    id: "earning-2",
    sessionId: "session-1",
    workAppId: "doordash",
    amountCents: 5000,
  },
  {
    id: "earning-3",
    sessionId: "session-2",
    workAppId: "spark",
    amountCents: 8000,
  },
  {
    id: "earning-4",
    sessionId: "session-2",
    workAppId: "ubereats",
    amountCents: 2000,
  },
];

const fuelPurchases: FuelPurchase[] = [
  {
    id: "fuel-1",
    vehicleId: "vehicle-1",
    date: "2026-05-24",
    totalPaidCents: 4000,
    pricePerGallonCents: 350,
    gallons: 11.43,
  },
  {
    id: "fuel-2",
    vehicleId: "vehicle-2",
    date: "2026-05-27",
    totalPaidCents: 5250,
    pricePerGallonCents: 350,
    gallons: 15,
  },
];

const expenses: Expense[] = [
  {
    id: "expense-1",
    date: "2026-05-25",
    category: "parking",
    amountCents: 500,
  },
  {
    id: "expense-2",
    date: "2026-05-26",
    category: "supplies",
    amountCents: 700,
  },
];

describe("dashboard metrics calculations", () => {
  test("calculateDashboardMetrics calculates period profitability totals", () => {
    const metrics = calculateDashboardMetrics({
      sessions,
      sessionAppEarnings,
      fuelPurchases,
      expenses,
      workApps,
      vehicles,
      settings,
    });

    expect(metrics.totalGrossEarningsCents).toBe(25000);
    expect(metrics.totalHoursWorked).toBe(7);
    expect(metrics.totalMiles).toBe(140);
    expect(metrics.totalEstimatedFuelCostCents).toBe(1776);
    expect(metrics.totalOtherExpensesCents).toBe(1200);
    expect(metrics.totalNetEarningsCents).toBe(22024);

    expect(metrics.averageGrossCentsPerHour).toBe(3571);
    expect(metrics.averageNetCentsPerHour).toBe(3146);
    expect(metrics.averageGrossCentsPerMile).toBe(179);
    expect(metrics.averageNetCentsPerMile).toBe(157);
    expect(metrics.estimatedMileageDeductionCents).toBe(9380);
  });

  test("calculateDashboardMetrics rounds fractional hour and mile totals", () => {
    const metrics = calculateDashboardMetrics({
      sessions: [
        {
          id: "session-fraction-1",
          vehicleId: "vehicle-1",
          startedAt: "2026-05-25T08:00:00.000Z",
          endedAt: "2026-05-25T08:06:00.000Z",
          date: "2026-05-25",
          mileageEntryMode: "manual",
          totalMiles: 0.1,
        },
        {
          id: "session-fraction-2",
          vehicleId: "vehicle-1",
          startedAt: "2026-05-25T09:00:00.000Z",
          endedAt: "2026-05-25T09:12:00.000Z",
          date: "2026-05-25",
          mileageEntryMode: "manual",
          totalMiles: 0.2,
        },
        {
          id: "session-fraction-3",
          vehicleId: "vehicle-1",
          startedAt: "2026-05-25T10:00:00.000Z",
          endedAt: "2026-05-25T10:18:00.000Z",
          date: "2026-05-25",
          mileageEntryMode: "manual",
          totalMiles: 0.3,
        },
      ],
      sessionAppEarnings: [],
      fuelPurchases: [],
      expenses: [],
      workApps,
      vehicles,
      settings,
    });

    expect(metrics.totalHoursWorked).toBe(0.6);
    expect(metrics.totalMiles).toBe(0.6);
  });

  test("calculateDashboardMetrics keeps fuel purchased separate from net earnings", () => {
    const metrics = calculateDashboardMetrics({
      sessions,
      sessionAppEarnings,
      fuelPurchases,
      expenses,
      workApps,
      vehicles,
      settings,
    });

    expect(metrics.totalFuelPurchasedCents).toBe(9250);
    expect(metrics.totalSpendingCents).toBe(10450);

    // Net earnings should subtract estimated fuel cost and non-fuel expenses,
    // not actual fuel purchased.
    expect(metrics.totalNetEarningsCents).toBe(22024);
    expect(metrics.totalNetEarningsCents).not.toBe(14550);
  });

  test("calculateDashboardMetrics finds the best app by gross earnings", () => {
    const metrics = calculateDashboardMetrics({
      sessions,
      sessionAppEarnings,
      fuelPurchases,
      expenses,
      workApps,
      vehicles,
      settings,
    });

    expect(metrics.bestAppByGross).toEqual({
      workAppId: "spark",
      name: "Walmart Spark",
      grossEarningsCents: 18000,
    });
  });

  test("calculateDashboardMetrics finds the best session by net earnings", () => {
    const metrics = calculateDashboardMetrics({
      sessions,
      sessionAppEarnings,
      fuelPurchases,
      expenses,
      workApps,
      vehicles,
      settings,
    });

    expect(metrics.bestSession).toEqual({
      sessionId: "session-1",
      date: "2026-05-25",
      netEarningsCents: 13880,
    });
  });

  test("calculateDashboardMetrics returns safe empty metrics when there is no data", () => {
    const metrics = calculateDashboardMetrics({
      sessions: [],
      sessionAppEarnings: [],
      fuelPurchases: [],
      expenses: [],
      workApps,
      vehicles,
      settings,
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
