import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoSettingsForm } from "@/components/demo/settings/demo-settings-form";
import { AppShell } from "@/components/layout/app-shell";

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

        <DemoSettingsForm />
      </div>
    </AppShell>
  );
}
