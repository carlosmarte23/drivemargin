import "server-only";

import { db } from "@/db";
import { profiles, vehicles, userSettings } from "@/db/schema";

import { DriverSetupData } from "@/features/driver-setup/lib/parse-driver-setup-form";

type SaveDriverSetupForUserInput = {
  userId: string;
  data: DriverSetupData;
  markOnboardingComplete: boolean;
};

export async function saveDriverSetupForUser({
  userId,
  data,
  markOnboardingComplete,
}: SaveDriverSetupForUserInput) {
  const now = new Date();

  await db.transaction(async (tx) => {
    await tx
      .insert(profiles)
      .values({
        userId,
        displayName: data.displayName,
        onboardingCompleted: markOnboardingComplete,
      })
      .onConflictDoUpdate({
        target: profiles.userId,
        set: markOnboardingComplete
          ? {
              displayName: data.displayName,
              onboardingCompleted: true,
              updatedAt: now,
            }
          : {
              displayName: data.displayName,
              updatedAt: now,
            },
      });

    await tx
      .insert(vehicles)
      .values({
        userId,
        displayName: data.vehicleName,
        estimatedMpg: data.estimatedMpg,
        defaultMileageEntryMode: data.defaultMileageEntryMode,
        isDefault: true,
      })
      .onConflictDoUpdate({
        target: vehicles.userId,
        set: {
          displayName: data.vehicleName,
          estimatedMpg: data.estimatedMpg,
          defaultMileageEntryMode: data.defaultMileageEntryMode,
          isDefault: true,
          updatedAt: now,
        },
      });

    await tx
      .insert(userSettings)
      .values({
        userId,
        targetNetCentsPerHour: data.targetNetCentsPerHour,
        targetNetCentsPerMile: data.targetNetCentsPerMile,
        theme: "system",
        language: "en",
        irsMileageDeductionRateCents: 72.5,
      })
      .onConflictDoUpdate({
        target: userSettings.userId,
        set: {
          targetNetCentsPerHour: data.targetNetCentsPerHour,
          targetNetCentsPerMile: data.targetNetCentsPerMile,
          updatedAt: now,
        },
      });
  });
}
