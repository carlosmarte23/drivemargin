import { afterEach, describe, expect, test, vi } from "vitest";

import type { DriverSettingsFormState } from "@/features/settings/types";

import { updateDriverSettings } from "./update-driver-settings";

const actionMocks = vi.hoisted(() => {
  return {
    parseDriverSettingsFormData: vi.fn(),
    revalidatePath: vi.fn(),
    requireUser: vi.fn(),
    saveDriverSetupForUser: vi.fn(),
  };
});

vi.mock("next/cache", () => ({
  revalidatePath: actionMocks.revalidatePath,
}));

vi.mock("@/features/settings/lib/parse-driver-settings-form", () => ({
  parseDriverSettingsFormData: actionMocks.parseDriverSettingsFormData,
}));

vi.mock("@/lib/auth/requireUser", () => ({
  requireUser: actionMocks.requireUser,
}));

vi.mock("@/features/driver-setup/lib/server/save-driver-setup", () => ({
  saveDriverSetupForUser: actionMocks.saveDriverSetupForUser,
}));

const previousState: DriverSettingsFormState = {
  status: "idle",
  message: null,
  errors: {},
};

describe("updateDriverSettings", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("returns field errors when settings form parsing fails", async () => {
    const formData = new FormData();

    actionMocks.requireUser.mockResolvedValue({ id: "user-1" });
    actionMocks.parseDriverSettingsFormData.mockReturnValue({
      success: false,
      errors: {
        targetNetPerHour: "Target net per hour must be greater than 0",
      },
    });

    const result = await updateDriverSettings(previousState, formData);

    expect(result).toEqual({
      status: "error",
      message: "Please check the settings form and try again.",
      errors: {
        targetNetPerHour: "Target net per hour must be greater than 0",
      },
    });
    expect(actionMocks.saveDriverSetupForUser).not.toHaveBeenCalled();
    expect(actionMocks.revalidatePath).not.toHaveBeenCalled();
  });

  test("saves parsed settings for the current user without completing onboarding", async () => {
    const formData = new FormData();
    const parsedSettings = {
      displayName: "Alex",
      vehicleName: "Prius",
      estimatedMpg: 42,
      defaultMileageEntryMode: "odometer",
      targetNetCentsPerHour: 2600,
      targetNetCentsPerMile: 175,
      theme: "dark",
      irsMileageDeductionRateCents: 67,
    };

    actionMocks.requireUser.mockResolvedValue({ id: "user-1" });
    actionMocks.parseDriverSettingsFormData.mockReturnValue({
      success: true,
      data: parsedSettings,
    });
    actionMocks.saveDriverSetupForUser.mockResolvedValue(undefined);

    const result = await updateDriverSettings(previousState, formData);

    expect(actionMocks.saveDriverSetupForUser).toHaveBeenCalledWith({
      userId: "user-1",
      data: parsedSettings,
      markOnboardingComplete: false,
    });
    expect(actionMocks.revalidatePath).toHaveBeenCalledWith("/app/settings");
    expect(result).toEqual({
      status: "success",
      message: "Settings updated.",
      errors: {},
    });
  });
});
