import { z } from "zod";

import type { DemoData } from "@/types/domain";

export const DEMO_DATA_STORAGE_VERSION = 1;

const entityIdSchema = z.string().min(1);
const moneyCentsSchema = z.number().int().nonnegative();
const mileageSchema = z.number().nonnegative();
const gallonsSchema = z.number().positive();
const mpgSchema = z.number().positive();
const odometerSchema = z.number().nonnegative();
const isoDateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const isoDateTimeStringSchema = z.string().min(1);

const expenseCategorySchema = z.enum([
  "maintenance",
  "parking",
  "tolls",
  "supplies",
  "car_wash",
  "phone",
  "food",
  "tax_prep",
  "insurance",
  "other",
]);

const mileageEntryModeSchema = z.enum(["manual", "odometer"]);
const themePreferenceSchema = z.enum(["light", "dark", "system"]);
const languagePreferenceSchema = z.enum(["en", "es"]);
const currencyCodeSchema = z.literal("USD");

const vehicleSchema = z.object({
  id: entityIdSchema,
  name: z.string().min(1),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.number().int().optional(),
  estimatedMpg: mpgSchema,
  isDefault: z.boolean(),
});

const workAppSchema = z.object({
  id: entityIdSchema,
  name: z.string().min(1),
  shortName: z.string().optional(),
  iconName: z.string().optional(),
  color: z.string().optional(),
});

const sessionAppEarningSchema = z.object({
  id: entityIdSchema,
  sessionId: entityIdSchema,
  workAppId: entityIdSchema,
  amountCents: moneyCentsSchema,
});

const workSessionSchema = z.object({
  id: entityIdSchema,
  vehicleId: entityIdSchema,
  startedAt: isoDateTimeStringSchema,
  endedAt: isoDateTimeStringSchema,
  date: isoDateStringSchema,
  mileageEntryMode: mileageEntryModeSchema,
  totalMiles: mileageSchema,
  startOdometer: odometerSchema.optional(),
  endOdometer: odometerSchema.optional(),
  notes: z.string().optional(),
});

const fuelPurchaseSchema = z.object({
  id: entityIdSchema,
  vehicleId: entityIdSchema,
  date: isoDateStringSchema,
  totalPaidCents: moneyCentsSchema,
  pricePerGallonCents: moneyCentsSchema,
  gallons: gallonsSchema,
  stationName: z.string().optional(),
  odometer: odometerSchema.optional(),
  notes: z.string().optional(),
});

const expenseSchema = z.object({
  id: entityIdSchema,
  date: isoDateStringSchema,
  category: expenseCategorySchema,
  customCategoryName: z.string().optional(),
  description: z.string().optional(),
  amountCents: moneyCentsSchema,
});

const userSettingsSchema = z.object({
  currency: currencyCodeSchema,
  defaultVehicleId: entityIdSchema,
  targetNetCentsPerHour: moneyCentsSchema,
  targetNetCentsPerMile: moneyCentsSchema,
  irsMileageRateCentsPerMile: moneyCentsSchema,
  theme: themePreferenceSchema,
  language: languagePreferenceSchema,
});

export const demoDataSchema = z.object({
  vehicles: z.array(vehicleSchema),
  workApps: z.array(workAppSchema),
  sessions: z.array(workSessionSchema),
  sessionAppEarnings: z.array(sessionAppEarningSchema),
  fuelPurchases: z.array(fuelPurchaseSchema),
  expenses: z.array(expenseSchema),
  settings: userSettingsSchema,
}) satisfies z.ZodType<DemoData>;

export const storedDemoDataSchema = z.object({
  version: z.literal(DEMO_DATA_STORAGE_VERSION),
  savedAt: z.string().min(1),
  data: demoDataSchema,
});
