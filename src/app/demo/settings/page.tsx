import { AppShell } from "@/components/layout/app-shell";
import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoPlaceholderCard } from "@/components/demo/demo-placeholder-card";
import { Settings } from "lucide-react";

export default function DemoSettingsPage() {
  return (
    <AppShell basePath="/demo" pageLabel="Settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Preview where vehicle, goals, mileage rate, and preferences will
            live.
          </p>
        </div>

        <DemoBanner />

        <DemoPlaceholderCard
          icon={Settings}
          title="Demo settings coming next"
          description="Sample settings will control the demo vehicle, estimated MPG, income goals, mileage rate, theme, and basic preferences."
        />
      </div>
    </AppShell>
  );
}
