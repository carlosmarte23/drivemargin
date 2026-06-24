import { z } from "zod";

const driverSetupFormSchema = z.object({
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
  targetNetCentsPerHour: z.coerce
    .number()
    .min(1, "Target net per hour must be greater than 0")
    .max(100, "Target net per hour is too high."),
  targetNetCentsPerMile: z.coerce
    .number()
    .min(1, "Target net per mile must be greater than 0")
    .max(100, "Target net per mile is too high."),
});

export type DriverSetupData = {
  displayName: string;
  vehicleName: string;
  estimatedMpg: number;
  defaultMileageEntryMode: "manual" | "odometer";
  targetNetCentsPerHour: number;
  targetNetCentsPerMile: number;
};

export type DriverSetupFields =
  | "displayName"
  | "vehicleName"
  | "estimatedMpg"
  | "defaultMileageEntryMode"
  | "targetNetCentsPerHour"
  | "targetNetCentsPerMile";

const DriverSetupFormFieldsNames = {
  displayName: true,
  vehicleName: true,
  estimatedMpg: true,
  defaultMileageEntryMode: true,
  targetNetCentsPerHour: true,
  targetNetCentsPerMile: true,
} satisfies Record<DriverSetupFields, true>;

export type DriverSetupFormErrors = Partial<Record<DriverSetupFields, string>>;

type ParsedDriverSetupFormData =
  | {
      success: true;
      data: DriverSetupData;
    }
  | {
      success: false;
      errors: DriverSetupFormErrors;
    };

export function parseDriverSetupFormData(
  formData: FormData,
): ParsedDriverSetupFormData {
  const result = driverSetupFormSchema.safeParse({
    displayName: formData.get("displayName"),
    vehicleName: formData.get("vehicleName"),
    estimatedMpg: formData.get("estimatedMpg"),
    defaultMileageEntryMode: formData.get("defaultMileageEntryMode"),
    targetNetCentsPerHour: formData.get("targetNetPerHour"),
    targetNetCentsPerMile: formData.get("targetNetPerMile"),
  });

  if (!result.success) {
    const errors: DriverSetupFormErrors = {};

    for (const issue of result.error.issues) {
      const field = issue.path[0];

      if (typeof field !== "string") {
        continue;
      }

      if (field in DriverSetupFormFieldsNames) {
        errors[field as DriverSetupFields] = issue.message;
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
      targetNetCentsPerHour: dollarsToCents(data.targetNetCentsPerHour),
      targetNetCentsPerMile: dollarsToCents(data.targetNetCentsPerMile),
    },
  };
}

function dollarsToCents(dollars: number) {
  return Math.round(dollars * 100);
}
