import type { EntityId, MoneyCents } from "@/types/domain";

export interface DemoFuelPurchaseTemplate {
  id: EntityId;
  vehicleId: EntityId;
  dayOffset: number;
  totalPaidCents: MoneyCents;
  pricePerGallonCents: MoneyCents;
  gallons: number;
  stationName?: string;
  odometer?: number;
  notes?: string;
}

export const demoFuelPurchaseTemplates: DemoFuelPurchaseTemplate[] = [
  {
    id: "demo-fuel-purchase-template-001",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -26,
    totalPaidCents: 4187,
    pricePerGallonCents: 365,
    gallons: 11.47,
    stationName: "Shell",
    odometer: 84205,
  },
  {
    id: "demo-fuel-purchase-template-002",
    vehicleId: "demo-vehicle-secondary",
    dayOffset: -21,
    totalPaidCents: 3442,
    pricePerGallonCents: 359,
    gallons: 9.59,
    stationName: "Wawa",
    odometer: 61195,
  },
  {
    id: "demo-fuel-purchase-template-003",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -15,
    totalPaidCents: 4626,
    pricePerGallonCents: 379,
    gallons: 12.21,
    stationName: "Chevron",
    odometer: 84396,
  },
  {
    id: "demo-fuel-purchase-template-004",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -8,
    totalPaidCents: 3968,
    pricePerGallonCents: 369,
    gallons: 10.75,
    stationName: "RaceTrac",
    odometer: 84492,
  },
  {
    id: "demo-fuel-purchase-template-005",
    vehicleId: "demo-vehicle-secondary",
    dayOffset: -2,
    totalPaidCents: 3734,
    pricePerGallonCents: 364,
    gallons: 10.26,
    stationName: "Costco Gas",
    odometer: 61277,
    notes: "Filled up before evening shift",
  },
];
