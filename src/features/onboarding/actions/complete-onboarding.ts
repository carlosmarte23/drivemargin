"use server";

import { redirect } from "next/navigation";

import { saveDriverSetupForUser } from "@/features/driver-setup/lib/server/save-driver-setup";
import { parseDriverSetupFormData } from "@/features/driver-setup/lib/parse-driver-setup-form";
import type {
  OnboardingFormState,
  OnboardingRawFormValues,
} from "@/features/onboarding/types";
import { requireUser } from "@/lib/auth/requireUser";

export async function completeOnboarding(
  _prevState: OnboardingFormState,
  formData: FormData,
): Promise<OnboardingFormState> {
  const user = await requireUser();
  const parsed = await parseDriverSetupFormData(formData);

  if (!parsed.success) {
    const rawFormData = getOnboardingRawFormValues(formData);

    return {
      status: "error",
      message: "Please check the onboarding form and try again.",
      errors: parsed.errors,
      values: rawFormData,
    };
  }

  await saveDriverSetupForUser({
    userId: user.id,
    data: parsed.data,
    markOnboardingComplete: true,
  });

  redirect("/app/dashboard");
}

function getOnboardingRawFormValues(
  formData: FormData,
): OnboardingRawFormValues {
  return {
    displayName: String(formData.get("displayName") ?? ""),
    vehicleName: String(formData.get("vehicleName") ?? ""),
    estimatedMpg: String(formData.get("estimatedMpg") ?? ""),
    defaultMileageEntryMode: String(
      formData.get("defaultMileageEntryMode") ?? "",
    ),
    targetNetPerHour: String(formData.get("targetNetPerHour") ?? ""),
    targetNetPerMile: String(formData.get("targetNetPerMile") ?? ""),
  };
}
