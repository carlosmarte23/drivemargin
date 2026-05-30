import { describe, expect, test } from "vitest";

import type {
  MoneyCents,
  SessionAppEarning,
  UserSettings,
  Vehicle,
  WorkSession,
} from "@/types/domain";

import { calculateSessionMetrics } from "./sessionMetrics";

const vehicle: Vehicle = {
  id: "vehicle-1",
  name: "Toyota Camry",
  estimatedMpg: 25,
  isDefault: true,
};

const settings: UserSettings = {
  currency: "USD",
  defaultVehicleId: "vehicle-1",
  targetNetCentsPerHour: 2500,
  targetNetCentsPerMile: 150,
  irsMileageRateCentsPerMile: 67,
  theme: "system",
  language: "en",
};

function createSession(overrides: Partial<WorkSession> = {}): WorkSession {
  return {
    id: "session-1",
    vehicleId: "vehicle-1",
    startedAt: "2026-05-25T08:00:00.000Z",
    endedAt: "2026-05-25T12:00:00.000Z",
    date: "2026-05-25",
    mileageEntryMode: "manual",
    totalMiles: 80,
    ...overrides,
  };
}

function createAppEarning(
  overrides: Partial<SessionAppEarning> = {},
): SessionAppEarning {
  return {
    id: "earning-1",
    sessionId: "session-1",
    workAppId: "spark",
    amountCents: 1000,
    ...overrides,
  };
}

describe("session metrics calculations", () => {
  test("calculateSessionMetrics calculates profitability metrics for one session", () => {
    const session = createSession();
    const appEarnings: SessionAppEarning[] = [
      createAppEarning({
        id: "earning-1",
        workAppId: "spark",
        amountCents: 10000,
      }),
      createAppEarning({
        id: "earning-2",
        workAppId: "doordash",
        amountCents: 5000,
      }),
    ];

    const latestFuelPricePerGallonCents: MoneyCents = 350;
    const otherExpensesTotalCents: MoneyCents = 1000;

    const metrics = calculateSessionMetrics({
      session,
      appEarnings,
      vehicle,
      settings,
      latestFuelPricePerGallonCents,
      otherExpensesTotalCents,
    });

    expect(metrics).toEqual({
      sessionId: "session-1",
      grossEarningsCents: 15000,
      hoursWorked: 4,
      totalMiles: 80,
      estimatedFuelCostCents: 1120,
      otherExpensesTotalCents: 1000,
      netEarningsCents: 12880,
      grossCentsPerHour: 3750,
      netCentsPerHour: 3220,
      grossCentsPerMile: 188,
      netCentsPerMile: 161,
      estimatedMileageDeductionCents: 5360,
    });
  });

  test("calculateSessionMetrics only includes earnings that belong to the session", () => {
    const session = createSession();

    const appEarnings: SessionAppEarning[] = [
      createAppEarning({
        id: "earning-1",
        sessionId: "session-1",
        amountCents: 10000,
      }),
      createAppEarning({
        id: "earning-2",
        sessionId: "another-session",
        amountCents: 5000,
      }),
    ];

    const metrics = calculateSessionMetrics({
      session,
      appEarnings,
      vehicle,
      settings,
      latestFuelPricePerGallonCents: 350,
    });

    expect(metrics.grossEarningsCents).toBe(10000);
  });

  test("calculateSessionMetrics returns 0 for per-hour metrics when hours worked is 0", () => {
    const session = createSession({
      startedAt: "2026-05-25T08:00:00.000Z",
      endedAt: "2026-05-25T08:00:00.000Z",
    });

    const metrics = calculateSessionMetrics({
      session,
      appEarnings: [
        createAppEarning({
          amountCents: 15000,
        }),
      ],
      vehicle,
      settings,
      latestFuelPricePerGallonCents: 350,
    });

    expect(metrics.hoursWorked).toBe(0);
    expect(metrics.grossCentsPerHour).toBe(0);
    expect(metrics.netCentsPerHour).toBe(0);
  });

  test("calculateSessionMetrics returns 0 for per-mile metrics when total miles is 0", () => {
    const session = createSession({
      totalMiles: 0,
    });

    const metrics = calculateSessionMetrics({
      session,
      appEarnings: [
        createAppEarning({
          amountCents: 15000,
        }),
      ],
      vehicle,
      settings,
      latestFuelPricePerGallonCents: 350,
    });

    expect(metrics.totalMiles).toBe(0);
    expect(metrics.grossCentsPerMile).toBe(0);
    expect(metrics.netCentsPerMile).toBe(0);
  });

  test("calculateSessionMetrics uses 0 as the default other expenses total", () => {
    const session = createSession();

    const metrics = calculateSessionMetrics({
      session,
      appEarnings: [
        createAppEarning({
          amountCents: 15000,
        }),
      ],
      vehicle,
      settings,
      latestFuelPricePerGallonCents: 350,
    });

    expect(metrics.otherExpensesTotalCents).toBe(0);
    expect(metrics.netEarningsCents).toBe(13880);
  });
});
