import { describe, expect, test } from "vitest";

import { generateDemoData } from "@/data/demo/generateDemoData";

import {
  getDemoSettingsFormValues,
  parseDemoSettingsFormValues,
} from "./demo-settings-form";

describe("demo settings form", () => {
  test("gets form values from demo settings", () => {
    const data = generateDemoData();

    expect(getDemoSettingsFormValues(data)).toEqual({
      defaultVehicleId: data.settings.defaultVehicleId,
      targetNetPerHour: (data.settings.targetNetCentsPerHour / 100).toFixed(2),
      targetNetPerMile: (data.settings.targetNetCentsPerMile / 100).toFixed(2),
      irsMileageRate: (data.settings.irsMileageRateCentsPerMile / 100).toFixed(
        2,
      ),
      theme: data.settings.theme,
    });
  });

  test("parses valid settings form values", () => {
    const data = generateDemoData();
    const vehicle = data.vehicles.find((vehicle) => vehicle.isDefault)!;

    const result = parseDemoSettingsFormValues(data, {
      defaultVehicleId: vehicle.id,
      targetNetPerHour: "25.00",
      targetNetPerMile: "1.50",
      irsMileageRate: "0.67",
      theme: "dark",
    });

    expect(result).toEqual({
      success: true,
      values: {
        currency: "USD",
        defaultVehicleId: vehicle.id,
        targetNetCentsPerHour: 2500,
        targetNetCentsPerMile: 150,
        irsMileageRateCentsPerMile: 67,
        theme: "dark",
        language: "en",
      },
    });
  });

  test("requires an existing default vehicle", () => {
    const data = generateDemoData();

    const result = parseDemoSettingsFormValues(data, {
      ...getDemoSettingsFormValues(data),
      defaultVehicleId: "missing-vehicle",
    });

    expect(result).toEqual({
      success: false,
      errors: {
        defaultVehicleId: "Default vehicle is required.",
      },
    });
  });

  test("rejects invalid numeric values", () => {
    const data = generateDemoData();

    const result = parseDemoSettingsFormValues(data, {
      ...getDemoSettingsFormValues(data),
      targetNetPerHour: "0",
      targetNetPerMile: "-1",
      irsMileageRate: "-0.01",
    });

    expect(result).toEqual({
      success: false,
      errors: {
        targetNetPerHour: "Enter an hourly goal greater than $0.00.",
        targetNetPerMile: "Enter a per-mile goal greater than $0.00.",
        irsMileageRate: "Enter a valid IRS mileage rate.",
      },
    });
  });
});
