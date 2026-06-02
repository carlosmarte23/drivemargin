import { describe, expect, it } from "vitest";

import { buildMetricTrendChartData } from "./dashboardChartData";

const dailyTrendSeries = [
  {
    date: "2026-05-25",
    grossEarningsCents: 6000,
    netEarningsCents: 5000,
    hoursWorked: 2,
    totalMiles: 20,
    netPerHourCents: 2500,
    netPerMileCents: 250,
    fuelCost: 800,
    otherExpenses: 1200,
  },
  {
    date: "2026-05-26",
    grossEarningsCents: 9000,
    netEarningsCents: 7200,
    hoursWorked: 3,
    totalMiles: 30,
    netPerHourCents: 2400,
    netPerMileCents: 240,
    fuelCost: 900,
    otherExpenses: 450,
  },
  {
    date: "2026-05-27",
    grossEarningsCents: 0,
    netEarningsCents: 0,
    hoursWorked: 0,
    totalMiles: 0,
    netPerHourCents: 0,
    netPerMileCents: 0,
    fuelCost: 0,
    otherExpenses: 0,
  },
];

describe("buildMetricTrendChartData", () => {
  it("maps cents-based earnings into dollar chart values", () => {
    const result = buildMetricTrendChartData(dailyTrendSeries, "netEarnings");

    expect(result).toEqual([
      {
        date: "2026-05-25",
        label: "2026-05-25",
        value: 50,
      },
      {
        date: "2026-05-26",
        label: "2026-05-26",
        value: 72,
      },
      {
        date: "2026-05-27",
        label: "2026-05-27",
        value: 0,
      },
    ]);
  });

  it("maps cents-based rate metrics into dollar chart values", () => {
    expect(buildMetricTrendChartData(dailyTrendSeries, "netPerHour")).toEqual([
      {
        date: "2026-05-25",
        label: "2026-05-25",
        value: 25,
      },
      {
        date: "2026-05-26",
        label: "2026-05-26",
        value: 24,
      },
      {
        date: "2026-05-27",
        label: "2026-05-27",
        value: 0,
      },
    ]);

    expect(buildMetricTrendChartData(dailyTrendSeries, "netPerMile")).toEqual([
      {
        date: "2026-05-25",
        label: "2026-05-25",
        value: 2.5,
      },
      {
        date: "2026-05-26",
        label: "2026-05-26",
        value: 2.4,
      },
      {
        date: "2026-05-27",
        label: "2026-05-27",
        value: 0,
      },
    ]);
  });

  it("keeps non-money metrics as raw chart values", () => {
    expect(buildMetricTrendChartData(dailyTrendSeries, "hoursWorked")).toEqual([
      {
        date: "2026-05-25",
        label: "2026-05-25",
        value: 2,
      },
      {
        date: "2026-05-26",
        label: "2026-05-26",
        value: 3,
      },
      {
        date: "2026-05-27",
        label: "2026-05-27",
        value: 0,
      },
    ]);

    expect(buildMetricTrendChartData(dailyTrendSeries, "totalMiles")).toEqual([
      {
        date: "2026-05-25",
        label: "2026-05-25",
        value: 20,
      },
      {
        date: "2026-05-26",
        label: "2026-05-26",
        value: 30,
      },
      {
        date: "2026-05-27",
        label: "2026-05-27",
        value: 0,
      },
    ]);
  });

  it("maps cost metrics into dollar chart values", () => {
    expect(buildMetricTrendChartData(dailyTrendSeries, "fuelCost")).toEqual([
      {
        date: "2026-05-25",
        label: "2026-05-25",
        value: 8,
      },
      {
        date: "2026-05-26",
        label: "2026-05-26",
        value: 9,
      },
      {
        date: "2026-05-27",
        label: "2026-05-27",
        value: 0,
      },
    ]);

    expect(buildMetricTrendChartData(dailyTrendSeries, "otherExpenses")).toEqual(
      [
        {
          date: "2026-05-25",
          label: "2026-05-25",
          value: 12,
        },
        {
          date: "2026-05-26",
          label: "2026-05-26",
          value: 4.5,
        },
        {
          date: "2026-05-27",
          label: "2026-05-27",
          value: 0,
        },
      ],
    );
  });
});
