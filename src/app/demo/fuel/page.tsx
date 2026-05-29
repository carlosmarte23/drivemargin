import { Fuel } from "lucide-react";

import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoPlaceholderCard } from "@/components/demo/demo-placeholder-card";
import { AppShell } from "@/components/layout/app-shell";

export default function DemoFuelPage() {
  return (
    <AppShell basePath="/demo" pageLabel="Fuel">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Fuel</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Track gas purchases and estimate fuel cost per mile.
          </p>
        </div>

        <DemoBanner />

        <DemoPlaceholderCard
          icon={Fuel}
          title="Fuel purchases coming next"
          description="Sample fuel purchases will be added soon to estimate fuel cost using gas price, vehicle MPG, and miles driven."
        />
      </div>
    </AppShell>
  );
}
