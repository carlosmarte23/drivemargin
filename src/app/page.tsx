import { PublicShell } from "@/components/layout/public-shell";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingProblem } from "@/components/marketing/landing-problem";
import { LandingFeatures } from "@/components/marketing/landing-features";
import { LandingHowItWorks } from "@/components/marketing/landing-how-it-works";
import { LandingFinalCta } from "@/components/marketing/landing-final-cta";

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
