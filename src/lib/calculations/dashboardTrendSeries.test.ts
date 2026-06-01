import { describe, expect, it } from "vitest";

import {
  buildDailyDashboardTrendSeries,
  getDashboardTrendValues,
} from "./dashboardTrendSeries";

describe("buildDailyDashboardTrendSeries", () => {
  it("returns one point per day in the selected period", () => {
    const result = buildDailyDashboardTrendSeries({
      period: {
        startDate: "2026-05-25",
        endDate: "2026-05-31",
      },
      sessions: [],
      sessionAppEarnings: [],
      fuelPurchases: [],
      expenses: [],
      workApps: [],
      vehicles: [],
      settings: {
        currency: "USD",
        defaultVehicleId: "vehicle-1",
        targetNetCentsPerHour: 2500,
        targetNetCentsPerMile: 150,
        irsMileageRateCentsPerMile: 67,
        theme: "system",
        language: "en",
      },
    });

    expect(result).toHaveLength(7);
    expect(result[0]?.date).toBe("2026-05-25");
    expect(result[6]?.date).toBe("2026-05-31");
  });

  it("supports custom ranges shorter than a week", () => {
    const result = buildDailyDashboardTrendSeries({
      period: {
        startDate: "2026-05-25",
        endDate: "2026-05-27",
      },
      sessions: [],
      sessionAppEarnings: [],
      fuelPurchases: [],
      expenses: [],
      workApps: [],
      vehicles: [],
      settings: {
        currency: "USD",
        defaultVehicleId: "vehicle-1",
        targetNetCentsPerHour: 2500,
        targetNetCentsPerMile: 150,
        irsMileageRateCentsPerMile: 67,
        theme: "system",
        language: "en",
      },
    });

    expect(result).toHaveLength(3);
    expect(result[0]?.date).toBe("2026-05-25");
    expect(result[1]?.date).toBe("2026-05-26");
    expect(result[2]?.date).toBe("2026-05-27");
  });

  it("supports a single-day range", () => {
    const result = buildDailyDashboardTrendSeries({
      period: {
        startDate: "2026-05-25",
        endDate: "2026-05-25",
      },
      sessions: [],
      sessionAppEarnings: [],
      fuelPurchases: [],
      expenses: [],
      workApps: [],
      vehicles: [],
      settings: {
        currency: "USD",
        defaultVehicleId: "vehicle-1",
        targetNetCentsPerHour: 2500,
        targetNetCentsPerMile: 150,
        irsMileageRateCentsPerMile: 67,
        theme: "system",
        language: "en",
      },
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.date).toBe("2026-05-25");
  });

  it("calculates daily dashboard metrics for each date", () => {
    const result = buildDailyDashboardTrendSeries({
      period: {
        startDate: "2026-05-25",
        endDate: "2026-05-27",
      },
      sessions: [
        {
          id: "session-1",
          vehicleId: "vehicle-1",
          date: "2026-05-25",
          startedAt: "2026-05-25T10:00:00",
          endedAt: "2026-05-25T12:00:00",
          totalMiles: 20,
          mileageEntryMode: "manual",
          notes: "",
        },
        {
          id: "session-2",
          vehicleId: "vehicle-1",
          date: "2026-05-25",
          startedAt: "2026-05-25T14:00:00",
          endedAt: "2026-05-25T17:30:00",
          totalMiles: 35,
          mileageEntryMode: "manual",
          notes: "",
        },
        {
          id: "session-3",
          vehicleId: "vehicle-2",
          date: "2026-05-26",
          startedAt: "2026-05-26T09:30:00",
          endedAt: "2026-05-26T12:00:00",
          totalMiles: 18,
          mileageEntryMode: "manual",
          notes: "",
        },
      ],
      sessionAppEarnings: [
        {
          id: "earning-1",
          sessionId: "session-1",
          workAppId: "doordash",
          amountCents: 5000,
        },
        {
          id: "earning-2",
          sessionId: "session-1",
          workAppId: "ubereats",
          amountCents: 2800,
        },
        {
          id: "earning-3",
          sessionId: "session-2",
          workAppId: "doordash",
          amountCents: 7200,
        },
        {
          id: "earning-4",
          sessionId: "session-3",
          workAppId: "grubhub",
          amountCents: 6400,
        },
      ],
      fuelPurchases: [
        {
          id: "fuel-1",
          vehicleId: "vehicle-1",
          date: "2026-05-25",
          totalPaidCents: 4200,
          pricePerGallonCents: 350,
          gallons: 12,
        },
        {
          id: "fuel-2",
          vehicleId: "vehicle-2",
          date: "2026-05-26",
          totalPaidCents: 3600,
          pricePerGallonCents: 360,
          gallons: 10,
        },
      ],
      expenses: [
        {
          id: "expense-1",
          date: "2026-05-25",
          category: "parking",
          amountCents: 600,
        },
        {
          id: "expense-2",
          date: "2026-05-26",
          category: "tolls",
          amountCents: 450,
        },
      ],
      workApps: [
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
        {
          id: "grubhub",
          name: "Grubhub",
          shortName: "GH",
        },
      ],
      vehicles: [
        {
          id: "vehicle-1",
          name: "Honda CR-V",
          estimatedMpg: 25,
          isDefault: true,
        },
        {
          id: "vehicle-2",
          name: "Toyota Prius",
          estimatedMpg: 50,
          isDefault: false,
        },
      ],
      settings: {
        currency: "USD",
        defaultVehicleId: "vehicle-1",
        targetNetCentsPerHour: 2500,
        targetNetCentsPerMile: 150,
        irsMileageRateCentsPerMile: 67,
        theme: "system",
        language: "en",
      },
    });

    expect(result[0]?.grossEarningsCents).toBe(15000);
    expect(result[0]?.totalMiles).toBe(55);
    expect(result[1]?.grossEarningsCents).toBe(6400);
    expect(result[1]?.totalMiles).toBe(18);
    expect(result[2]?.grossEarningsCents).toBe(0);
    expect(result[2]?.totalMiles).toBe(0);
  });
});

describe("getDashboardTrendValues", () => {
  it("returns values for the selected trend metric", () => {
    const series = [
      {
        date: "2026-05-25",
        grossEarningsCents: 6000,
        netEarningsCents: 5000,
        hoursWorked: 2,
        totalMiles: 20,
        netPerHourCents: 2500,
        netPerMileCents: 250,
      },
      {
        date: "2026-05-26",
        grossEarningsCents: 9000,
        netEarningsCents: 7200,
        hoursWorked: 3,
        totalMiles: 30,
        netPerHourCents: 2400,
        netPerMileCents: 240,
      },
    ];

    expect(getDashboardTrendValues(series, "grossEarnings")).toEqual([
      6000, 9000,
    ]);

    expect(getDashboardTrendValues(series, "netEarnings")).toEqual([
      5000, 7200,
    ]);

    expect(getDashboardTrendValues(series, "netPerHour")).toEqual([2500, 2400]);

    expect(getDashboardTrendValues(series, "netPerMile")).toEqual([250, 240]);

    expect(getDashboardTrendValues(series, "totalMiles")).toEqual([20, 30]);
    expect(getDashboardTrendValues(series, "hoursWorked")).toEqual([2, 3]);
  });
});
