import { afterEach, describe, expect, test, vi } from "vitest";

import type { OnboardingFormState } from "@/features/onboarding/types";

import { completeOnboarding } from "./complete-onboarding";

const actionMocks = vi.hoisted(() => {
  return {
    parseDriverSetupFormData: vi.fn(),
    redirect: vi.fn(),
    requireUser: vi.fn(),
    saveDriverSetupForUser: vi.fn(),
  };
});

vi.mock("next/navigation", () => ({
  redirect: actionMocks.redirect,
}));

vi.mock("@/features/driver-setup/lib/parse-driver-setup-form", () => ({
  parseDriverSetupFormData: actionMocks.parseDriverSetupFormData,
}));

vi.mock("@/lib/auth/requireUser", () => ({
  requireUser: actionMocks.requireUser,
}));

vi.mock("@/features/driver-setup/lib/server/save-driver-setup", () => ({
  saveDriverSetupForUser: actionMocks.saveDriverSetupForUser,
}));

const previousState: OnboardingFormState = {
  status: "idle",
  message: null,
  errors: {},
  values: {},
};

describe("completeOnboarding", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("returns field errors and submitted values when parsing fails", async () => {
    const formData = new FormData();
    formData.set("displayName", "Alex");
    formData.set("vehicleName", "");
    formData.set("estimatedMpg", "42");
    formData.set("defaultMileageEntryMode", "odometer");
    formData.set("targetNetPerHour", "25");
    formData.set("targetNetPerMile", "2");

    actionMocks.requireUser.mockResolvedValue({ id: "user-1" });
    actionMocks.parseDriverSetupFormData.mockReturnValue({
      success: false,
      errors: {
        vehicleName: "Vehicle name is required",
      },
    });

    const result = await completeOnboarding(previousState, formData);

    expect(result).toEqual({
      status: "error",
      message: "Please check the onboarding form and try again.",
      errors: {
        vehicleName: "Vehicle name is required",
      },
      values: {
        displayName: "Alex",
        vehicleName: "",
        estimatedMpg: "42",
        defaultMileageEntryMode: "odometer",
        targetNetPerHour: "25",
        targetNetPerMile: "2",
      },
    });
    expect(actionMocks.saveDriverSetupForUser).not.toHaveBeenCalled();
    expect(actionMocks.redirect).not.toHaveBeenCalled();
  });

  test("saves parsed setup data and redirects to dashboard", async () => {
    const formData = new FormData();
    const parsedSetup = {
      displayName: "Alex",
      vehicleName: "Prius",
      estimatedMpg: 42,
      defaultMileageEntryMode: "odometer",
      targetNetCentsPerHour: 2500,
      targetNetCentsPerMile: 200,
    };

    actionMocks.requireUser.mockResolvedValue({ id: "user-1" });
    actionMocks.parseDriverSetupFormData.mockReturnValue({
      success: true,
      data: parsedSetup,
    });
    actionMocks.saveDriverSetupForUser.mockResolvedValue(undefined);

    await completeOnboarding(previousState, formData);

    expect(actionMocks.saveDriverSetupForUser).toHaveBeenCalledWith({
      userId: "user-1",
      data: parsedSetup,
      markOnboardingComplete: true,
    });
    expect(actionMocks.redirect).toHaveBeenCalledWith("/app/dashboard");
  });
});
