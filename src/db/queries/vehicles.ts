import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { vehicles } from "@/db/schema";

type UpsertDefaultVehicleInput = {
  userId: string;
  displayName: string;
  estimatedMpg: number;
  defaultMileageEntryMode: "manual" | "odometer";
};

export async function getDefaultVehicleByUserId(userId: string) {
  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(and(eq(vehicles.userId, userId), eq(vehicles.isDefault, true)))
    .limit(1);

  return vehicle ?? null;
}
export async function upsertDefaultVehicleForUser(
  input: UpsertDefaultVehicleInput,
) {
  const [vehicle] = await db
    .insert(vehicles)
    .values({
      userId: input.userId,
      displayName: input.displayName,
      estimatedMpg: input.estimatedMpg,
      defaultMileageEntryMode: input.defaultMileageEntryMode,
      isDefault: true,
    })
    .onConflictDoUpdate({
      target: [vehicles.userId],
      set: {
        displayName: input.displayName,
        estimatedMpg: input.estimatedMpg,
        defaultMileageEntryMode: input.defaultMileageEntryMode,
        isDefault: true,
      },
    })
    .returning();

  return vehicle;
}
