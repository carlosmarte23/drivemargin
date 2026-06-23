"use server";

import { revalidatePath } from "next/cache";

import { saveDriverSetupForUser } from "@/features/driver-setup/lib/server/save-driver-setup";
import { parseDriverSettingsFormData } from "@/features/settings/lib/parse-driver-settings-form";
import { DriverSettingsFormState } from "@/features/settings/types";
import { requireUser } from "@/lib/auth/requireUser";

export async function updateDriverSettings(
  _prevState: DriverSettingsFormState,
  formData: FormData,
): Promise<DriverSettingsFormState> {
  const user = await requireUser();
  const parsed = await parseDriverSettingsFormData(formData);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the settings form and try again.",
      errors: parsed.errors,
    };
  }

  await saveDriverSetupForUser({
    userId: user.id,
    data: parsed.data,
    markOnboardingComplete: false,
  });

  revalidatePath("/app/settings");

  return { status: "success", message: "Settings updated.", errors: {} };
}
