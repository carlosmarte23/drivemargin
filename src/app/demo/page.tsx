import { AppShell } from "@/components/layout/app-shell";

export default function DemoPage() {
  return (
    <AppShell basePath="/demo" workspaceLabel="Demo workspace">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Demo</h1>

        <p className="text-muted-foreground">
          Demo dashboard design will be defined in a later phase.
        </p>
      </div>
    </AppShell>
  );
}
