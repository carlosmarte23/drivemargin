import "server-only";

import { cache } from "react";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { profiles } from "@/db/schema";

export const getProfileByUserId = cache(async function getProfileByUserId(
  userId: string,
) {
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1);

  return profile ?? null;
});

export async function upsertProfileForUser(input: {
  userId: string;
  displayName?: string | null;
}) {
  const [profile] = await db
    .insert(profiles)
    .values({
      userId: input.userId,
      displayName: input.displayName ?? null,
      onboardingCompleted: false,
    })
    .onConflictDoUpdate({
      target: profiles.userId,
      set: {
        displayName: input.displayName ?? null,
        updatedAt: new Date(),
      },
    })
    .returning();

  return profile;
}

export async function markOnboardingCompleted(userId: string) {
  const [profile] = await db
    .update(profiles)
    .set({ onboardingCompleted: true, updatedAt: new Date() })
    .where(eq(profiles.userId, userId))
    .returning();

  return profile ?? null;
}
