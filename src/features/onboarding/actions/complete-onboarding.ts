"use server";

import { redirect } from "next/navigation";

import { parseDriverSetupFormData } from "@/features/driver-setup/lib/parse-driver-setup-form";
import { saveDriverSetupForUser } from "@/features/driver-setup/lib/server/save-driver-setup";
import { requireUser } from "@/lib/auth/requireUser";

import type { OnboardingFormState } from "@/features/onboarding/types";

export async function completeOnboarding(
  _prevState: OnboardingFormState,
  formData: FormData,
): Promise<OnboardingFormState> {
  const user = await requireUser();

  const parsed = await parseDriverSetupFormData(formData);

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.message,
    };
  }

  await saveDriverSetupForUser({
    userId: user.id,
    data: parsed.data,
    markOnboardingComplete: true,
  });

  redirect("/app/dashboard");
}
