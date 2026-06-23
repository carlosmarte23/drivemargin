import { afterEach, describe, expect, test, vi } from "vitest";

import { loadDriverSettings } from "./load-driver-settings";

const queryMocks = vi.hoisted(() => ({
  getDefaultVehicleByUserId: vi.fn(),
  getProfileByUserId: vi.fn(),
  getUserSettingsByUserId: vi.fn(),
}));

vi.mock("@/db/queries/profiles", () => ({
  getProfileByUserId: queryMocks.getProfileByUserId,
}));

vi.mock("@/db/queries/settings", () => ({
  getUserSettingsByUserId: queryMocks.getUserSettingsByUserId,
}));

vi.mock("@/db/queries/vehicles", () => ({
  getDefaultVehicleByUserId: queryMocks.getDefaultVehicleByUserId,
}));

describe("loadDriverSettings", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("loads persisted driver settings as form values", async () => {
    queryMocks.getProfileByUserId.mockResolvedValue({
      displayName: "Alex",
    });
    queryMocks.getDefaultVehicleByUserId.mockResolvedValue({
      displayName: "Prius",
      estimatedMpg: 42.5,
      defaultMileageEntryMode: "odometer",
    });
    queryMocks.getUserSettingsByUserId.mockResolvedValue({
      targetNetCentsPerHour: 2475,
      targetNetCentsPerMile: 165,
      irsMileageDeductionRateCents: 72.5,
      theme: "dark",
    });

    await expect(loadDriverSettings("user-1")).resolves.toEqual({
      displayName: "Alex",
      vehicleName: "Prius",
      estimatedMpg: "42.5",
      defaultMileageEntryMode: "odometer",
      targetNetPerHour: "24.75",
      targetNetPerMile: "1.65",
      irsMileageRate: "0.725",
      theme: "dark",
    });

    expect(queryMocks.getProfileByUserId).toHaveBeenCalledWith("user-1");
    expect(queryMocks.getDefaultVehicleByUserId).toHaveBeenCalledWith("user-1");
    expect(queryMocks.getUserSettingsByUserId).toHaveBeenCalledWith("user-1");
  });

  test("returns nulls for missing setup records", async () => {
    queryMocks.getProfileByUserId.mockResolvedValue(null);
    queryMocks.getDefaultVehicleByUserId.mockResolvedValue(null);
    queryMocks.getUserSettingsByUserId.mockResolvedValue(null);

    await expect(loadDriverSettings("user-1")).resolves.toEqual({
      displayName: null,
      vehicleName: null,
      estimatedMpg: null,
      defaultMileageEntryMode: null,
      targetNetPerHour: null,
      targetNetPerMile: null,
      irsMileageRate: null,
      theme: null,
    });
  });
});
