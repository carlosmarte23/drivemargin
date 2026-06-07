import { describe, expect, test } from "vitest";

import { generateDemoData } from "@/data/demo/generateDemoData";

import { updateDemoSettings } from "./demo-settings-mutations";

describe("demo settings mutations", () => {
  test("updateDemoSettings replaces demo settings", () => {
    const data = generateDemoData();
    const vehicle = data.vehicles[0]!;

    const result = updateDemoSettings(data, {
      defaultVehicleId: vehicle.id,
      targetNetPerHour: "24.00",
      targetNetPerMile: "1.40",
      irsMileageRate: "0.67",
      theme: "dark",
    });

    expect(result).toEqual({
      success: true,
      data: {
        ...data,
        settings: {
          defaultVehicleId: vehicle.id,
          targetNetCentsPerHour: 2400,
          targetNetCentsPerMile: 140,
          irsMileageRateCentsPerMile: 67,
          theme: "dark",
          language: "en",
          currency: "USD",
        },
      },
    });
  });
});
