import { PublicShell } from "@/components/layout/public-shell";
import { LandingHero } from "@/components/marketing/landing-hero";

export default function HomePage() {
  return (
    <PublicShell>
      <div className="overflow-hidden">
        <LandingHero />
        {/* Problem Section */}
        {/* Features Section */}
        {/* How it works Section */}
        {/* Final CTA Section */}
      </div>
    </PublicShell>
  );
}
