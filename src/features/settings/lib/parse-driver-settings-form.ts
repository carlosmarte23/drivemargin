import { z } from "zod";

const driverSettingsFormSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, "Display name is required")
    .max(60, "Display name is too long"),
  vehicleName: z
    .string()
    .trim()
    .min(1, "Vehicle name is required")
    .max(50, "Vehicle name is too long"),
  estimatedMpg: z.coerce
    .number()
    .min(5, "Estimated MPG must be at least 5")
    .max(100, "Estimated MPG must be realistic."),
  defaultMileageEntryMode: z.enum(
    ["manual", "odometer"],
    "Choose a valid mileage entry mode",
  ),
  targetNetPerHour: z.coerce
    .number()
    .min(1, "Target net per hour must be greater than 0")
    .max(100, "Target net per hour is too high."),
  targetNetPerMile: z.coerce
    .number()
    .min(1, "Target net per mile must be greater than 0")
    .max(100, "Target net per mile is too high."),
  irsMileageRate: z.coerce
    .number()
    .min(0.01, "IRS mileage rate must be greater than $0.00")
    .max(100, "IRS mileage deduction rate is too high."),
  theme: z.enum(["light", "dark", "system"], "Choose a valid theme preference"),
});

export type DriverSettingsData = {
  displayName: string;
  vehicleName: string;
  estimatedMpg: number;
  defaultMileageEntryMode: "manual" | "odometer";
  targetNetCentsPerHour: number;
  targetNetCentsPerMile: number;
  irsMileageDeductionRateCents: number;
  theme: "light" | "dark" | "system";
};

export type DriverSettingsField =
  | "displayName"
  | "vehicleName"
  | "estimatedMpg"
  | "defaultMileageEntryMode"
  | "targetNetPerHour"
  | "targetNetPerMile"
  | "irsMileageRate"
  | "theme";

const DriverSettingsFormFieldsNames = {
  displayName: true,
  vehicleName: true,
  estimatedMpg: true,
  defaultMileageEntryMode: true,
  targetNetPerHour: true,
  targetNetPerMile: true,
  irsMileageRate: true,
  theme: true,
} satisfies Record<DriverSettingsField, true>;

export type DriverSettingsFormErrors = Partial<
  Record<DriverSettingsField, string>
>;

export type ParsedDriverSettingsFormData =
  | {
      success: true;
      data: DriverSettingsData;
    }
  | {
      success: false;
      errors: DriverSettingsFormErrors;
    };

export function parseDriverSettingsFormData(
  formData: FormData,
): ParsedDriverSettingsFormData {
  const result = driverSettingsFormSchema.safeParse({
    displayName: formData.get("displayName"),
    vehicleName: formData.get("vehicleName"),
    estimatedMpg: formData.get("estimatedMpg"),
    defaultMileageEntryMode: formData.get("defaultMileageEntryMode"),
    targetNetPerHour: formData.get("targetNetPerHour"),
    targetNetPerMile: formData.get("targetNetPerMile"),
    irsMileageRate: formData.get("irsMileageRate"),
    theme: formData.get("theme"),
  });

  if (!result.success) {
    const errors: DriverSettingsFormErrors = {};

    for (const issue of result.error.issues) {
      const field = issue.path[0];

      if (typeof field !== "string") {
        continue;
      }

      if (field in DriverSettingsFormFieldsNames) {
        errors[field as DriverSettingsField] = issue.message;
      }
    }

    return {
      success: false as const,
      errors,
    };
  }

  const data = result.data;

  return {
    success: true as const,
    data: {
      displayName: data.displayName,
      vehicleName: data.vehicleName,
      estimatedMpg: data.estimatedMpg,
      defaultMileageEntryMode: data.defaultMileageEntryMode,
      targetNetCentsPerHour: dollarsToCents(data.targetNetPerHour),
      targetNetCentsPerMile: dollarsToCents(data.targetNetPerMile),
      irsMileageDeductionRateCents: dollarsToCentsPerMile(data.irsMileageRate),
      theme: data.theme,
    },
  };
}

function dollarsToCents(amount: number): number {
  return Math.round(amount * 100);
}

function dollarsToCentsPerMile(rate: number): number {
  return rate * 100;
}
