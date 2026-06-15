import type { Metadata } from "next";

import { PublicShell } from "@/components/layout/public-shell";
import { LandingFeatures } from "@/components/marketing/landing-features";
import { LandingFinalCta } from "@/components/marketing/landing-final-cta";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingHowItWorks } from "@/components/marketing/landing-how-it-works";
import { LandingProblem } from "@/components/marketing/landing-problem";

const pageTitle = "Real profit tracking for independent drivers";
const pageDescription =
  "Track delivery earnings, mileage, fuel costs, and expenses in one profitability dashboard built for multi-app independent drivers.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${pageTitle} | DriveMargin`,
    description: pageDescription,
    url: "/",
    type: "website",
    siteName: "DriveMargin",
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | DriveMargin`,
    description: pageDescription,
  },
};

export default function HomePage() {
  return (
    <PublicShell>
      <LandingHero />
      <LandingProblem />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingFinalCta />
    </PublicShell>
  );
}
