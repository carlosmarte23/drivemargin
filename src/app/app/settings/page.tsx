import { AppShell } from "@/components/layout/app-shell";
import DriverSettingsForm from "@/components/settings/driver-settings-form";
import { getProfileByUserId } from "@/db/queries/profiles";
import { loadDriverSettings } from "@/features/settings/lib/load-driver-settings";
import { requireUser } from "@/lib/auth/requireUser";

export default async function AppSettingsPage() {
  const user = await requireUser();
  const profile = await getProfileByUserId(user.id);
  const initialValues = await loadDriverSettings(user.id);

  return (
    <AppShell
      basePath="/app"
      pageLabel="Settings"
      userDisplayName={profile?.displayName}
    >
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Modify your profile name, vehicle, goals, mileage rate, and other
            preferences.
          </p>
        </header>

        <DriverSettingsForm initialValues={initialValues} />
      </section>
    </AppShell>
  );
}
