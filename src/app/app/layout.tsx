import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getProfileByUserId } from "@/db/queries/profiles";
import { requireUser } from "@/lib/auth/requireUser";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireUser();
  const profile = await getProfileByUserId(user.id);

  if (!profile?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return children;
}
