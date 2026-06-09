import { describe, expect, test } from "vitest";

import type {
  FuelPurchase,
  SessionAppEarning,
  UserSettings,
  Vehicle,
  WorkSession,
} from "@/types/domain";

import { buildSessionSummary } from "./sessionSummary";

const settings: UserSettings = {
  currency: "USD",
  defaultVehicleId: "vehicle-1",
  targetNetCentsPerHour: 2500,
  targetNetCentsPerMile: 150,
  irsMileageRateCentsPerMile: 67,
  theme: "system",
  language: "en",
};

const vehicle: Vehicle = {
  id: "vehicle-1",
  name: "Toyota Camry",
  estimatedMpg: 25,
  isDefault: true,
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

function createFuelPurchase(
  overrides: Partial<FuelPurchase> = {},
): FuelPurchase {
  return {
    id: "fuel-1",
    vehicleId: "vehicle-1",
    date: "2026-05-24",
    totalPaidCents: 4200,
    pricePerGallonCents: 350,
    gallons: 12,
    ...overrides,
  };
}

describe("session created summary calculations", () => {
  test("buildSessionSummary returns the created session profitability summary", () => {
    const summary = buildSessionSummary({
      session: createSession(),
      appEarnings: [
        createAppEarning({
          id: "earning-1",
          amountCents: 10000,
        }),
        createAppEarning({
          id: "earning-2",
          amountCents: 5000,
        }),
      ],
      sessionVehicle: vehicle,
      settings,
      fuelPurchases: [
        createFuelPurchase({
          pricePerGallonCents: 350,
        }),
      ],
    });

    expect(summary).toMatchObject({
      sessionId: "session-1",
      grossEarningsCents: 15000,
      estimatedFuelCostCents: 1120,
      estimatedNetAfterFuelCents: 13880,
      hoursWorked: 4,
      totalMiles: 80,
      netPerHourCents: 3470,
      netPerMileCents: 174,
    });
  });

  test("buildSessionSummary only includes app earnings for the created session", () => {
    const summary = buildSessionSummary({
      session: createSession(),
      appEarnings: [
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
      ],
      sessionVehicle: vehicle,
      settings,
      fuelPurchases: [
        createFuelPurchase({
          pricePerGallonCents: 350,
        }),
      ],
    });

    expect(summary.grossEarningsCents).toBe(10000);
    expect(summary.estimatedNetAfterFuelCents).toBe(8880);
  });

  test("buildSessionSummary uses the latest fuel price for the same vehicle on or before the session date", () => {
    const summary = buildSessionSummary({
      session: createSession({
        date: "2026-05-25",
      }),
      appEarnings: [
        createAppEarning({
          amountCents: 15000,
        }),
      ],
      sessionVehicle: vehicle,
      settings,
      fuelPurchases: [
        createFuelPurchase({
          id: "older-same-vehicle",
          vehicleId: "vehicle-1",
          date: "2026-05-20",
          pricePerGallonCents: 300,
        }),
        createFuelPurchase({
          id: "latest-same-vehicle",
          vehicleId: "vehicle-1",
          date: "2026-05-24",
          pricePerGallonCents: 400,
        }),
        createFuelPurchase({
          id: "future-same-vehicle",
          vehicleId: "vehicle-1",
          date: "2026-05-26",
          pricePerGallonCents: 600,
        }),
        createFuelPurchase({
          id: "latest-other-vehicle",
          vehicleId: "vehicle-2",
          date: "2026-05-24",
          pricePerGallonCents: 700,
        }),
      ],
    });

    expect(summary.estimatedFuelCostCents).toBe(1280);
    expect(summary.estimatedNetAfterFuelCents).toBe(13720);
  });

  test("buildSessionSummary does not subtract global expenses from an individual session summary", () => {
    const summary = buildSessionSummary({
      session: createSession(),
      appEarnings: [
        createAppEarning({
          amountCents: 15000,
        }),
      ],
      sessionVehicle: vehicle,
      settings,
      fuelPurchases: [
        createFuelPurchase({
          pricePerGallonCents: 350,
        }),
      ],
    });

    expect(summary.estimatedNetAfterFuelCents).toBe(13880);
  });

  test("buildSessionSummary returns zero rate metrics when hours or miles are zero", () => {
    const summary = buildSessionSummary({
      session: createSession({
        startedAt: "2026-05-25T08:00:00.000Z",
        endedAt: "2026-05-25T08:00:00.000Z",
        totalMiles: 0,
      }),
      appEarnings: [
        createAppEarning({
          amountCents: 15000,
        }),
      ],
      sessionVehicle: vehicle,
      settings,
      fuelPurchases: [
        createFuelPurchase({
          pricePerGallonCents: 350,
        }),
      ],
    });

    expect(summary.hoursWorked).toBe(0);
    expect(summary.totalMiles).toBe(0);
    expect(summary.netPerHourCents).toBe(0);
    expect(summary.netPerMileCents).toBe(0);
  });

  test("buildSessionSummary returns target insights for net per hour and net per mile", () => {
    const summary = buildSessionSummary({
      session: createSession(),
      appEarnings: [
        createAppEarning({
          amountCents: 15000,
        }),
      ],
      sessionVehicle: vehicle,
      settings,
      fuelPurchases: [
        createFuelPurchase({
          pricePerGallonCents: 350,
        }),
      ],
    });

    expect(summary.insights).toEqual(
      expect.arrayContaining([
        {
          id: "above-hourly-goal",
          tone: "positive",
          title: "Above Hourly Goal",
          description: "Your net per hour exceeded your target.",
        },
        {
          id: "above-mileage-goal",
          tone: "positive",
          title: "Above Mileage Goal",
          description: "Your net per mile exceeded your target.",
        },
      ]),
    );
  });

  test("buildSessionSummary warns when session profitability is below the configured targets", () => {
    const summary = buildSessionSummary({
      session: createSession(),
      appEarnings: [
        createAppEarning({
          amountCents: 10000,
        }),
      ],
      sessionVehicle: vehicle,
      settings,
      fuelPurchases: [
        createFuelPurchase({
          pricePerGallonCents: 350,
        }),
      ],
    });

    expect(summary.insights).toEqual(
      expect.arrayContaining([
        {
          id: "below-hourly-goal",
          tone: "warning",
          title: "Below Hourly Goal",
          description: "Your net per hour was below your target.",
        },
        {
          id: "below-mileage-goal",
          tone: "warning",
          title: "Below Mileage Goal",
          description: "Your net per mile was below your target.",
        },
      ]),
    );
  });

  test("buildSessionSummary warns when estimated fuel cost is at least fifteen percent of gross earnings", () => {
    const summary = buildSessionSummary({
      session: createSession(),
      appEarnings: [
        createAppEarning({
          amountCents: 7000,
        }),
      ],
      sessionVehicle: vehicle,
      settings,
      fuelPurchases: [
        createFuelPurchase({
          pricePerGallonCents: 350,
        }),
      ],
    });

    expect(summary.insights).toContainEqual({
      id: "fuel-cost-high",
      tone: "warning",
      title: "High Fuel Cost",
      description:
        "Your estimated fuel cost is over 15% of your gross earnings.",
    });
  });

  test("buildSessionSummary returns a neutral fuel insight when no fuel price is available", () => {
    const summary = buildSessionSummary({
      session: createSession(),
      appEarnings: [
        createAppEarning({
          amountCents: 15000,
        }),
      ],
      sessionVehicle: vehicle,
      settings,
      fuelPurchases: [],
    });

    expect(summary.estimatedFuelCostCents).toBe(0);
    expect(summary.estimatedNetAfterFuelCents).toBe(15000);
    expect(summary.insights).toContainEqual({
      id: "fuel-estimate-incomplete",
      tone: "neutral",
      title: "No Fuel Estimate",
      description:
        "No fuel price was available, so this session does not include an estimated fuel cost.",
    });
  });

  test("buildSessionSummary limits messages to three insights", () => {
    const summary = buildSessionSummary({
      session: createSession(),
      appEarnings: [
        createAppEarning({
          amountCents: 7000,
        }),
      ],
      sessionVehicle: vehicle,
      settings,
      fuelPurchases: [
        createFuelPurchase({
          pricePerGallonCents: 350,
        }),
      ],
    });

    expect(summary.insights.length).toBeLessThanOrEqual(3);
  });
});
