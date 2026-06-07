import { describe, expect, it } from "vitest";

import {
  buildEarningsByAppChartData,
  buildEarningsOverTimeChartData,
  buildGrossVsExpensesChartData,
  buildMetricTrendChartData,
} from "./dashboardChartData";

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

    expect(
      buildMetricTrendChartData(dailyTrendSeries, "otherExpenses"),
    ).toEqual([
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
    ]);
  });
});

describe("buildEarningsOverTimeChartData", () => {
  it("maps net earnings into chart data", () => {
    const result = buildEarningsOverTimeChartData(dailyTrendSeries);

    expect(result).toEqual([
      {
        date: "2026-05-25",
        label: "May 25",
        net: 50,
        previousDate: null,
        previousLabel: null,
        previousNet: null,
      },
      {
        date: "2026-05-26",
        label: "May 26",
        net: 72,
        previousDate: null,
        previousLabel: null,
        previousNet: null,
      },
      {
        date: "2026-05-27",
        label: "May 27",
        net: 0,
        previousDate: null,
        previousLabel: null,
        previousNet: null,
      },
    ]);
  });

  it("maps previous period net earnings by matching day position", () => {
    const previousSeries = [
      {
        date: "2026-05-22",
        grossEarningsCents: 4000,
        netEarningsCents: 3500,
        hoursWorked: 2,
        totalMiles: 15,
        netPerHourCents: 1750,
        netPerMileCents: 233,
        fuelCost: 500,
        otherExpenses: 0,
      },
      {
        date: "2026-05-23",
        grossEarningsCents: 7000,
        netEarningsCents: 6200,
        hoursWorked: 3,
        totalMiles: 28,
        netPerHourCents: 2067,
        netPerMileCents: 221,
        fuelCost: 800,
        otherExpenses: 0,
      },
    ];

    const result = buildEarningsOverTimeChartData(
      dailyTrendSeries.slice(0, 2),
      previousSeries,
    );

    expect(result).toEqual([
      {
        date: "2026-05-25",
        label: "May 25",
        net: 50,
        previousDate: "2026-05-22",
        previousLabel: "May 22",
        previousNet: 35,
      },
      {
        date: "2026-05-26",
        label: "May 26",
        net: 72,
        previousDate: "2026-05-23",
        previousLabel: "May 23",
        previousNet: 62,
      },
    ]);
  });
});

describe("buildGrossVsExpensesChartData", () => {
  it("maps dashboard metrics into gross vs expenses chart data", () => {
    const periodLabel = "Selected period";

    const result = buildGrossVsExpensesChartData(
      {
        totalGrossEarningsCents: 46725,
        totalEstimatedFuelCostCents: 1200,
        totalOtherExpensesCents: 3450,
      },
      periodLabel,
    );

    expect(result).toEqual([
      {
        label: "Selected period",
        gross: 467.25,
        expenses: 46.5,
      },
    ]);
  });
});

describe("buildEarningsByAppChartData", () => {
  it("groups earnings by app", () => {
    const result = buildEarningsByAppChartData({
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
          workAppId: "uber-eats",
          amountCents: 3000,
        },
        {
          id: "earning-3",
          sessionId: "session-2",
          workAppId: "doordash",
          amountCents: 2500,
        },
      ],
      workApps: [
        {
          id: "doordash",
          name: "DoorDash",
          shortName: "DD",
          color: "#ff3008",
        },
        {
          id: "uber-eats",
          name: "Uber Eats",
          shortName: "UE",
          color: "#06c167",
        },
      ],
    });

    expect(result).toEqual([
      {
        appName: "DoorDash",
        appShortName: "DD",
        color: "#ff3008",
        earnings: 75,
      },
      {
        appName: "Uber Eats",
        appShortName: "UE",
        color: "#06c167",
        earnings: 30,
      },
    ]);
  });
});
