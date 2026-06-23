import type { DriverSettingsFormErrors } from "@/features/settings/lib/parse-driver-settings-form";

export type DriverSettingsFormState = {
  status: "idle" | "success" | "error";
  message: string | null;
  errors: DriverSettingsFormErrors;
};

export const initialDriverSettingsFormState: DriverSettingsFormState = {
  status: "idle",
  message: null,
  errors: {},
};
