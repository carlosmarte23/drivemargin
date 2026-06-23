import { describe, expect, test } from "vitest";

import { parseDriverSettingsFormData } from "./parse-driver-settings-form";

function createFormData(values: Record<string, string>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }

  return formData;
}

describe("parseDriverSettingsFormData", () => {
  test("parses valid driver settings into persistence-ready values", () => {
    const result = parseDriverSettingsFormData(
      createFormData({
        displayName: "  Alex Driver  ",
        vehicleName: "  Prius  ",
        estimatedMpg: "42.5",
        defaultMileageEntryMode: "odometer",
        targetNetPerHour: "24.75",
        targetNetPerMile: "1.65",
        irsMileageRate: "0.725",
        theme: "dark",
      }),
    );

    expect(result).toEqual({
      success: true,
      data: {
        displayName: "Alex Driver",
        vehicleName: "Prius",
        estimatedMpg: 42.5,
        defaultMileageEntryMode: "odometer",
        targetNetCentsPerHour: 2475,
        targetNetCentsPerMile: 165,
        irsMileageDeductionRateCents: 72.5,
        theme: "dark",
      },
    });
  });

  test("keeps manual mileage entry and system theme as valid defaults", () => {
    const result = parseDriverSettingsFormData(
      createFormData({
        displayName: "Alex",
        vehicleName: "Civic",
        estimatedMpg: "31",
        defaultMileageEntryMode: "manual",
        targetNetPerHour: "20",
        targetNetPerMile: "1.5",
        irsMileageRate: "0.70",
        theme: "system",
      }),
    );

    expect(result).toMatchObject({
      success: true,
      data: {
        defaultMileageEntryMode: "manual",
        theme: "system",
      },
    });
  });

  test("returns field errors for missing names and invalid numeric values", () => {
    const result = parseDriverSettingsFormData(
      createFormData({
        displayName: "",
        vehicleName: "   ",
        estimatedMpg: "4.99",
        defaultMileageEntryMode: "manual",
        targetNetPerHour: "0",
        targetNetPerMile: "-1",
        irsMileageRate: "0",
        theme: "system",
      }),
    );

    expect(result).toEqual({
      success: false,
      errors: {
        displayName: "Display name is required",
        vehicleName: "Vehicle name is required",
        estimatedMpg: "Estimated MPG must be at least 5",
        targetNetPerHour: "Target net per hour must be greater than 0",
        targetNetPerMile: "Target net per mile must be greater than 0",
        irsMileageRate: "IRS mileage rate must be greater than $0.00",
      },
    });
  });

  test("returns field errors for unsupported select values", () => {
    const result = parseDriverSettingsFormData(
      createFormData({
        displayName: "Alex",
        vehicleName: "Prius",
        estimatedMpg: "42",
        defaultMileageEntryMode: "gps",
        targetNetPerHour: "24",
        targetNetPerMile: "1.65",
        irsMileageRate: "0.725",
        theme: "sepia",
      }),
    );

    expect(result).toEqual({
      success: false,
      errors: {
        defaultMileageEntryMode: "Choose a valid mileage entry mode",
        theme: "Choose a valid theme preference",
      },
    });
  });
});
