import { AppShell } from "@/components/layout/app-shell";
import { getProfileByUserId } from "@/db/queries/profiles";
import { requireUser } from "@/lib/auth/requireUser";

export default async function AppDashboardPage() {
  const user = await requireUser();
  const profile = await getProfileByUserId(user.id);

  return (
    <AppShell
      basePath="/app"
      pageLabel="Protected app placeholder"
      userDisplayName={profile?.displayName}
    >
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
