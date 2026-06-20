import { redirect } from "next/navigation";

import { OnboardingForm } from "@/app/onboarding/onboarding-form";
import { BrandLogo } from "@/components/brand-logo";
import { getProfileByUserId } from "@/db/queries/profiles";
import { requireUser } from "@/lib/auth/requireUser";

export default async function OnboardingPage() {
  const user = await requireUser();

  const profile = await getProfileByUserId(user.id);

  if (profile?.onboardingCompleted) {
    redirect("/app/dashboard");
  }

  return (
    <main className="flex min-h-svh bg-background px-4 py-6 text-foreground">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
        <BrandLogo />

        <OnboardingForm />
      </div>
    </main>
  );
}
