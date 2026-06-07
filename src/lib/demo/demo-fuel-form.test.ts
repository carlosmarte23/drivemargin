import { describe, expect, test } from "vitest";

import { generateDemoData } from "@/data/demo/generateDemoData";
import type { DemoData } from "@/types/domain";

import {
  getDefaultDemoFuelFormValues,
  getDemoFuelFormValues,
  parseDemoFuelFormValues,
  type DemoFuelFormValues,
} from "./demo-fuel-form";

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

describe("demo fuel form", () => {
  test("getDefaultDemoFuelFormValues uses the default vehicle", () => {
    const data = buildData();

    const values = getDefaultDemoFuelFormValues(data);

    expect(values).toMatchObject({
      vehicleId: data.vehicles.find((vehicle) => vehicle.isDefault)?.id,
      totalPaid: "",
      gallons: "",
      stationName: "",
      odometer: "",
      notes: "",
    });
    expect(values.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test("getDemoFuelFormValues maps an existing purchase to input values", () => {
    const data = buildData();
    const purchase = data.fuelPurchases[0]!;

    const values = getDemoFuelFormValues(data, purchase.id);

    expect(values).toEqual({
      date: purchase.date,
      vehicleId: purchase.vehicleId,
      totalPaid: (purchase.totalPaidCents / 100).toFixed(2),
      gallons: String(purchase.gallons),
      stationName: purchase.stationName ?? "",
      odometer:
        purchase.odometer === undefined ? "" : String(purchase.odometer),
      notes: purchase.notes ?? "",
    });
  });

  test("getDemoFuelFormValues returns null for a missing purchase", () => {
    const data = buildData();

    expect(getDemoFuelFormValues(data, "missing-purchase")).toBeNull();
  });

  test("parseDemoFuelFormValues converts valid input values", () => {
    const data = buildData();

    const result = parseDemoFuelFormValues(data, buildValidValues(data));

    expect(result.success).toBe(true);

    if (!result.success) return;

    expect(result.values).toEqual({
      date: "2026-06-04",
      vehicleId: data.vehicles[0]!.id,
      totalPaidCents: 5275,
      pricePerGallonCents: 350,
      gallons: 15.07,
      stationName: "Shell",
      odometer: 104500,
      notes: "Filled up before dinner shift",
    });
  });

  test("parseDemoFuelFormValues trims optional fields", () => {
    const data = buildData();
    const values: DemoFuelFormValues = {
      ...buildValidValues(data),
      stationName: "  Costco  ",
      notes: "  Receipt in glovebox  ",
      odometer: "",
    };

    const result = parseDemoFuelFormValues(data, values);

    expect(result.success).toBe(true);

    if (!result.success) return;

    expect(result.values.stationName).toBe("Costco");
    expect(result.values.notes).toBe("Receipt in glovebox");
    expect(result.values.odometer).toBeUndefined();
  });

  test("parseDemoFuelFormValues returns validation errors", () => {
    const data = buildData();
    const values: DemoFuelFormValues = {
      ...buildValidValues(data),
      date: "",
      vehicleId: "missing-vehicle",
      totalPaid: "0",
      gallons: "",
      odometer: "-10",
    };

    const result = parseDemoFuelFormValues(data, values);

    expect(result.success).toBe(false);

    if (result.success) return;

    expect(result.errors).toMatchObject({
      date: "Date is required",
      vehicleId: "Vehicle is required",
      totalPaid: "Enter an amount greater than $0.00.",
      gallons: "Enter gallons greater than 0.",
      odometer: "Enter a valid odometer value.",
    });
  });
});
