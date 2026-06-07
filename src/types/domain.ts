import type { ExpenseCategory } from "@/types/expense-category";

export type { ExpenseCategory } from "@/types/expense-category";

export type EntityId = string;
export type MoneyCents = number;
export type ISODateString = string;
export type ISODateTimeString = string;
export type CurrencyCode = "USD";
export type ThemePreference = "light" | "dark" | "system";
export type LanguagePreference = "en" | "es";
export type MileageEntryMode = "manual" | "odometer";

export interface Vehicle {
  id: EntityId;
  name: string;
  make?: string;
  model?: string;
  year?: number;
  estimatedMpg: number;
  isDefault: boolean;
}

export interface WorkApp {
  id: EntityId;
  name: string;
  shortName?: string;
  iconName?: string;
  color?: string;
}

export interface SessionAppEarning {
  id: EntityId;
  sessionId: EntityId;
  workAppId: EntityId;
  amountCents: MoneyCents;
}

export interface WorkSession {
  id: EntityId;
  vehicleId: EntityId;
  startedAt: ISODateTimeString;
  endedAt: ISODateTimeString;
  date: ISODateString; // derived from startedAt
  mileageEntryMode: MileageEntryMode;
  totalMiles: number;
  startOdometer?: number;
  endOdometer?: number;
  notes?: string;
}

export interface FuelPurchase {
  id: EntityId;
  vehicleId: EntityId;
  date: ISODateString;
  totalPaidCents: MoneyCents;
  pricePerGallonCents: MoneyCents;
  gallons: number;
  stationName?: string;
  odometer?: number;
  notes?: string;
}

export interface Expense {
  id: EntityId;
  date: ISODateString;
  category: ExpenseCategory;
  customCategoryName?: string;
  description?: string;
  amountCents: MoneyCents;
}

export interface UserSettings {
  currency: CurrencyCode;
  defaultVehicleId: EntityId;
  targetNetCentsPerHour: MoneyCents;
  targetNetCentsPerMile: MoneyCents;
  irsMileageRateCentsPerMile: MoneyCents;
  theme: ThemePreference;
  language: LanguagePreference;
}

export interface DemoData {
  vehicles: Vehicle[];
  workApps: WorkApp[];
  sessions: WorkSession[];
  sessionAppEarnings: SessionAppEarning[];
  fuelPurchases: FuelPurchase[];
  expenses: Expense[];
  settings: UserSettings;
}
