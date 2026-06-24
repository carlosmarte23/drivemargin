import { describe, expect, test } from "vitest";

import { parseDriverSetupFormData } from "./parse-driver-setup-form";

function createFormData(values: Record<string, string>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }

  return formData;
}

describe("parseDriverSetupFormData", () => {
  test("parses valid onboarding values into persistence-ready data", () => {
    const result = parseDriverSetupFormData(
      createFormData({
        displayName: "  Alex Driver  ",
        vehicleName: "  Prius  ",
        estimatedMpg: "42.5",
        defaultMileageEntryMode: "odometer",
        targetNetPerHour: "24.75",
        targetNetPerMile: "1.65",
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
      },
    });
  });

  test("returns field errors for every invalid onboarding field", () => {
    const result = parseDriverSetupFormData(
      createFormData({
        displayName: "",
        vehicleName: "   ",
        estimatedMpg: "4.99",
        defaultMileageEntryMode: "manual",
        targetNetPerHour: "0",
        targetNetPerMile: "-1",
      }),
    );

    expect(result).toEqual({
      success: false,
      errors: {
        displayName: "Display name is required",
        vehicleName: "Vehicle name is required",
        estimatedMpg: "Estimated MPG must be at least 5",
        targetNetCentsPerHour:
          "Target net per hour must be greater than 0",
        targetNetCentsPerMile:
          "Target net per mile must be greater than 0",
      },
    });
  });

  test("returns a field error for unsupported mileage entry mode", () => {
    const result = parseDriverSetupFormData(
      createFormData({
        displayName: "Alex",
        vehicleName: "Prius",
        estimatedMpg: "42",
        defaultMileageEntryMode: "gps",
        targetNetPerHour: "24",
        targetNetPerMile: "1.65",
      }),
    );

    expect(result).toEqual({
      success: false,
      errors: {
        defaultMileageEntryMode: "Choose a valid mileage entry mode",
      },
    });
  });
});
