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
  defaultMileageEntryMode: z.enum(["manual", "odometer"]),
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

type ParsedDriverSetupFormData =
  | {
      success: true;
      data: DriverSetupData;
    }
  | {
      success: false;
      message: string;
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
    return {
      success: false as const,
      message:
        result.error.issues[0]?.message ??
        "Please check the onboarding form and try again.",
    };
  }

  return {
    success: true as const,
    data: {
      displayName: result.data.displayName,
      vehicleName: result.data.vehicleName,
      estimatedMpg: result.data.estimatedMpg,
      defaultMileageEntryMode: result.data.defaultMileageEntryMode,
      targetNetCentsPerHour: dollarsToCents(result.data.targetNetCentsPerHour),
      targetNetCentsPerMile: dollarsToCents(result.data.targetNetCentsPerMile),
    },
  };
}

function dollarsToCents(dollars: number) {
  return Math.round(dollars * 100);
}
