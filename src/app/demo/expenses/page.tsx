import { Receipt } from "lucide-react";

import { DemoBanner } from "@/components/demo/demo-banner";
import { DemoPlaceholderCard } from "@/components/demo/demo-placeholder-card";
import { AppShell } from "@/components/layout/app-shell";

export default function DemoExpensesPage() {
  return (
    <AppShell basePath="/demo" pageLabel="Expenses">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Expenses</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Track non-fuel costs that affect your real delivery profit.
          </p>
        </div>

        <DemoBanner />

        <DemoPlaceholderCard
          icon={Receipt}
          title="Expense tracking coming next"
          description="Sample expenses will show non-fuel costs like maintenance, parking, tolls, phone, supplies, and other work-related spending."
        />
      </div>
    </AppShell>
  );
}
