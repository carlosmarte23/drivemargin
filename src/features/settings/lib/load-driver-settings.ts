import { getProfileByUserId } from "@/db/queries/profiles";
import { getUserSettingsByUserId } from "@/db/queries/settings";
import { getDefaultVehicleByUserId } from "@/db/queries/vehicles";

export async function loadDriverSettings(userId: string) {
  const profile = await getProfileByUserId(userId);
  const settings = await getUserSettingsByUserId(userId);
  const vehicle = await getDefaultVehicleByUserId(userId);

  return {
    displayName: profile?.displayName ?? null,
    vehicleName: vehicle?.displayName ?? null,
    estimatedMpg:
      vehicle?.estimatedMpg == null ? null : String(vehicle.estimatedMpg),
    defaultMileageEntryMode: vehicle?.defaultMileageEntryMode ?? null,
    targetNetPerHour: centsToDollar(settings?.targetNetCentsPerHour),
    targetNetPerMile: centsToDollar(settings?.targetNetCentsPerMile),
    irsMileageRate: centsPerMileToDollarInput(
      settings?.irsMileageDeductionRateCents,
    ),
    theme: settings?.theme ?? null,
  };
}

export type DriverSettingsFormValues = Awaited<
  ReturnType<typeof loadDriverSettings>
>;

function centsToDollar(amount: number | null | undefined) {
  return amount == null ? null : (amount / 100).toFixed(2);
}

function centsPerMileToDollarInput(rate: number | null | undefined) {
  return rate == null ? null : String(rate / 100);
}
