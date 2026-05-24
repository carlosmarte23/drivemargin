import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-primary">Demo</p>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            App shell placeholder for the DriveMargin demo dashboard.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard content placeholder</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Metrics, charts, sessions, fuel, and expenses will be added in
              later phases.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
