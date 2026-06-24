import type { DriverSettingsFormErrors } from "@/features/settings/lib/parse-driver-settings-form";

export type DriverSettingsRawFormValues = {
  displayName: string;
  vehicleName: string;
  estimatedMpg: string;
  defaultMileageEntryMode: string;
  targetNetPerHour: string;
  targetNetPerMile: string;
  irsMileageRate: string;
  theme: string;
};

export type DriverSettingsFormState = {
  status: "idle" | "success" | "error";
  message: string | null;
  errors: DriverSettingsFormErrors;
  values: Partial<DriverSettingsRawFormValues>;
};

export const initialDriverSettingsFormState: DriverSettingsFormState = {
  status: "idle",
  message: null,
  errors: {},
  values: {},
};
