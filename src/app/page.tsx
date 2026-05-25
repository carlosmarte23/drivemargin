import { PublicShell } from "@/components/layout/public-shell";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingProblem } from "@/components/marketing/landing-problem";
import { LandingFeatures } from "@/components/marketing/landing-features";
import { LandingHowItWorks } from "@/components/marketing/landing-how-it-works";
import { LandingFinalCta } from "@/components/marketing/landing-final-cta";

import type { Metadata } from "next";

const pageTitle = "Real profit tracking for independent drivers";
const pageDescription =
  "A profitability dashboard for multi-app independent drivers.";

export const metadata: Metadata = {
  title: `${pageTitle} | DriveMargin`,
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
