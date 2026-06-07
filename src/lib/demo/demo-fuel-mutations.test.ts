import { describe, expect, test } from "vitest";

import { generateDemoData } from "@/data/demo/generateDemoData";
import type { DemoData } from "@/types/domain";

import type { DemoFuelFormValues } from "./demo-fuel-form";
import {
  createDemoFuelPurchase,
  deleteDemoFuelPurchase,
  updateDemoFuelPurchase,
} from "./demo-fuel-mutations";

const referenceDate = new Date("2026-06-04T12:00:00.000Z");

function buildData(): DemoData {
  return generateDemoData(referenceDate);
}

function buildValidValues(data: DemoData): DemoFuelFormValues {
  return {
    date: "2026-06-04",
    vehicleId: data.vehicles[0]!.id,
    totalPaid: "52.75",
    gallons: "15.07",
    stationName: "Shell",
    odometer: "104500",
    notes: "Filled up before dinner shift",
  };
}

describe("demo fuel mutations", () => {
  test("createDemoFuelPurchase adds a fuel purchase", () => {
    const data = buildData();
    const values = buildValidValues(data);

    const result = createDemoFuelPurchase(data, values, {
      fuelPurchaseId: "demo-fuel-new",
    });

    expect(result.success).toBe(true);

    if (!result.success) return;

    const purchase = result.data.fuelPurchases.find((item) => {
      return item.id === "demo-fuel-new";
    });

    expect(result.fuelPurchaseId).toBe("demo-fuel-new");
    expect(purchase).toEqual({
      id: "demo-fuel-new",
      date: "2026-06-04",
      vehicleId: data.vehicles[0]!.id,
      totalPaidCents: 5275,
      pricePerGallonCents: 350,
      gallons: 15.07,
      stationName: "Shell",
      odometer: 104500,
      notes: "Filled up before dinner shift",
    });
    expect(result.data.fuelPurchases).toHaveLength(
      data.fuelPurchases.length + 1,
    );
  });

  test("updateDemoFuelPurchase replaces an existing fuel purchase", () => {
    const data = buildData();
    const existingPurchase = data.fuelPurchases[0]!;
    const values: DemoFuelFormValues = {
      ...buildValidValues(data),
      totalPaid: "64.20",
      gallons: "16.05",
      stationName: "Costco",
      notes: "Edited fuel purchase",
    };

    const result = updateDemoFuelPurchase(data, existingPurchase.id, values);

    expect(result.success).toBe(true);

    if (!result.success) return;

    const purchase = result.data.fuelPurchases.find((item) => {
      return item.id === existingPurchase.id;
    });

    expect(result.fuelPurchaseId).toBe(existingPurchase.id);
    expect(purchase).toMatchObject({
      id: existingPurchase.id,
      totalPaidCents: 6420,
      pricePerGallonCents: 400,
      gallons: 16.05,
      stationName: "Costco",
      notes: "Edited fuel purchase",
    });
    expect(result.data.fuelPurchases).toHaveLength(data.fuelPurchases.length);
  });

  test("updateDemoFuelPurchase returns an error for a missing purchase", () => {
    const data = buildData();

    const result = updateDemoFuelPurchase(
      data,
      "missing-fuel",
      buildValidValues(data),
    );

    expect(result.success).toBe(false);

    if (result.success) return;

    expect(result.errors).toEqual({
      date: "Fuel purchase not found",
    });
  });

  test("deleteDemoFuelPurchase removes a fuel purchase", () => {
    const data = buildData();
    const existingPurchase = data.fuelPurchases[0]!;

    const result = deleteDemoFuelPurchase(data, existingPurchase.id);

    expect(
      result.fuelPurchases.some((purchase) => {
        return purchase.id === existingPurchase.id;
      }),
    ).toBe(false);
    expect(result.fuelPurchases).toHaveLength(data.fuelPurchases.length - 1);
  });

  test("createDemoFuelPurchase returns validation errors without changing data", () => {
    const data = buildData();
    const values: DemoFuelFormValues = {
      ...buildValidValues(data),
      totalPaid: "0",
      gallons: "-1",
    };

    const result = createDemoFuelPurchase(data, values);

    expect(result.success).toBe(false);

    if (result.success) return;

    expect(result.errors).toMatchObject({
      totalPaid: "Enter an amount greater than $0.00.",
      gallons: "Enter gallons greater than 0.",
    });
  });
});
