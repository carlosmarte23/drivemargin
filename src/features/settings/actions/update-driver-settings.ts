"use server";

import { revalidatePath } from "next/cache";

import { saveDriverSetupForUser } from "@/features/driver-setup/lib/server/save-driver-setup";
import { parseDriverSettingsFormData } from "@/features/settings/lib/parse-driver-settings-form";
import type {
  DriverSettingsFormState,
  DriverSettingsRawFormValues,
} from "@/features/settings/types";
import { requireUser } from "@/lib/auth/requireUser";

export async function updateDriverSettings(
  _prevState: DriverSettingsFormState,
  formData: FormData,
): Promise<DriverSettingsFormState> {
  const user = await requireUser();
  const parsed = await parseDriverSettingsFormData(formData);

  if (!parsed.success) {
    const rawFormData = getDriverSettingsRawFormValues(formData);

    return {
      status: "error",
      message: "Please check the settings form and try again.",
      errors: parsed.errors,
      values: rawFormData,
    };
  }

  await saveDriverSetupForUser({
    userId: user.id,
    data: parsed.data,
    markOnboardingComplete: false,
  });

  revalidatePath("/app/settings");

  return {
    status: "success",
    message: "Settings updated.",
    errors: {},
    values: {},
  };
}

function getDriverSettingsRawFormValues(
  formData: FormData,
): DriverSettingsRawFormValues {
  return {
    displayName: String(formData.get("displayName") ?? ""),
    vehicleName: String(formData.get("vehicleName") ?? ""),
    estimatedMpg: String(formData.get("estimatedMpg") ?? ""),
    defaultMileageEntryMode: String(
      formData.get("defaultMileageEntryMode") ?? "",
    ),
    targetNetPerHour: String(formData.get("targetNetPerHour") ?? ""),
    targetNetPerMile: String(formData.get("targetNetPerMile") ?? ""),
    irsMileageRate: String(formData.get("irsMileageRate") ?? ""),
    theme: String(formData.get("theme") ?? ""),
  };
}
