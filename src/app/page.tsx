import { PublicShell } from "@/components/layout/public-shell";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingProblem } from "@/components/marketing/landing-problem";
import { LandingFeatures } from "@/components/marketing/landing-features";
import { LandingHowItWorks } from "@/components/marketing/landing-how-it-works";

export default function HomePage() {
  return (
    <PublicShell>
      <div className="overflow-hidden">
        <LandingHero />
        <LandingProblem />
        <LandingFeatures />
        <LandingHowItWorks />
        {/* Final CTA Section */}
      </div>
    </PublicShell>
  );
}
