import { PublicShell } from "@/components/layout/public-shell";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingProblem } from "@/components/marketing/landing-problem";

export default function HomePage() {
  return (
    <PublicShell>
      <div className="overflow-hidden">
        <LandingHero />
        <LandingProblem />
        {/* Features Section */}
        {/* How it works Section */}
        {/* Final CTA Section */}
      </div>
    </PublicShell>
  );
}
