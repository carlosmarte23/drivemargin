import { AppShell } from "@/components/layout/app-shell";

export default function AppDashboardPage() {
  return (
    <AppShell basePath="/app" pageLabel="Protected app placeholder">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

        <p className="text-muted-foreground">
          Protected dashboard placeholder. Auth and real data will be added in a
          later phase.
        </p>
      </div>
    </AppShell>
  );
}
