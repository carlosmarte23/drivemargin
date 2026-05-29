import { Timer } from "lucide-react";

import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoPlaceholderCard } from "@/components/demo/demo-placeholder-card";
import { AppShell } from "@/components/layout/app-shell";

export default function DemoSessionsPage() {
  return (
    <AppShell basePath="/demo" pageLabel="Sessions">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sessions</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Track multi-app work sessions and review profitability by shift.
          </p>
        </div>

        <DemoBanner />

        <DemoPlaceholderCard
          icon={Timer}
          title="Session list coming next"
          description="Sample work sessions will be connected in the next phase."
        />
      </div>
    </AppShell>
  );
}
