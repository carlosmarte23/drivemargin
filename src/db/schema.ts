import {
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const mileageEntryModeEnum = pgEnum("mileage_entry_mode", [
  "manual",
  "odometer",
]);

export const themePreferenceEnum = pgEnum("theme_preference", [
  "light",
  "dark",
  "system",
]);

export const languagePreferenceEnum = pgEnum("language_preference", [
  "en",
  "es",
]);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    displayName: text("display_name"),
    onboardingCompleted: boolean("onboarding_completed")
      .notNull()
      .default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("profiles_user_id_idx").on(table.userId)],
);

export const vehicles = pgTable(
  "vehicles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    displayName: text("display_name").notNull(),
    estimatedMpg: numeric("estimated_mpg", {
      precision: 5,
      scale: 2,
    }).notNull(),
    defaultMileageEntryMode: mileageEntryModeEnum("default_mileage_entry_mode"),
    isDefault: boolean("is_default").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("vehicles_user_default_idx").on(table.userId)],
);

export const userSettings = pgTable(
  "user_settings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    targetNetCentsPerHour: integer("target_net_per_hour_cents")
      .notNull()
      .default(2500),
    targetNetCentsPerMile: integer("target_net_per_mile_cents")
      .notNull()
      .default(150),
    theme: themePreferenceEnum("theme").notNull(),
    language: languagePreferenceEnum("language").notNull(),
    irsMileageDeductionRateCents: integer("irs_mileage_deduction_rate_cents")
      .notNull()
      .default(72),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return [uniqueIndex("user_settings_user_id_idx").on(table.userId)];
  },
);

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export type Vehicle = typeof vehicles.$inferSelect;
export type NewVehicle = typeof vehicles.$inferInsert;

export type UserSettings = typeof userSettings.$inferSelect;
export type NewUserSettings = typeof userSettings.$inferInsert;
