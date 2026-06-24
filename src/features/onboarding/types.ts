import type { DriverSetupFormErrors } from "@/features/driver-setup/lib/parse-driver-setup-form";

export type OnboardingRawFormValues = {
  displayName: string;
  vehicleName: string;
  estimatedMpg: string;
  defaultMileageEntryMode: string;
  targetNetPerHour: string;
  targetNetPerMile: string;
};

export type OnboardingFormState = {
  status: "idle" | "success" | "error";
  message: string | null;
  errors: DriverSetupFormErrors;
  values: Partial<OnboardingRawFormValues>;
};

export const initialOnboardingFormState: OnboardingFormState = {
  status: "idle",
  message: null,
  errors: {},
  values: {},
};
