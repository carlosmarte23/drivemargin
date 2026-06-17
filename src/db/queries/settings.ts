import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { userSettings } from "@/db/schema";

export type UpsertUserSettingsInput = {
  userId: string;
  targetNetCentsPerHour: number;
  targetNetCentsPerMile: number;
  theme: "light" | "dark" | "system";
  language: "en" | "es";
  irsMileageDeductionRateCents: number;
};

export async function getUserSettingsByUserId(userId: string) {
  const [settings] = await db
    .select()
    .from(userSettings)
    .where(eq(userSettings.userId, userId))
    .limit(1);

  return settings ?? null;
}

export async function upsertUserSettingsForUser(
  input: UpsertUserSettingsInput,
) {
  const [settings] = await db
    .insert(userSettings)
    .values({
      userId: input.userId,
      targetNetCentsPerHour: input.targetNetCentsPerHour,
      targetNetCentsPerMile: input.targetNetCentsPerMile,
      theme: input.theme,
      language: input.language,
      irsMileageDeductionRateCents: input.irsMileageDeductionRateCents,
    })
    .onConflictDoUpdate({
      target: [userSettings.userId],
      set: {
        targetNetCentsPerHour: input.targetNetCentsPerHour,
        targetNetCentsPerMile: input.targetNetCentsPerMile,
        theme: input.theme,
        language: input.language,
        irsMileageDeductionRateCents: input.irsMileageDeductionRateCents,
      },
    })
    .returning();

  return settings;
}
