import { formatDateToString } from "@/lib/date";

import type { DemoData, EntityId, MoneyCents } from "@/types/domain";

export type DemoFuelFormValues = {
  date: string;
  vehicleId: EntityId;
  totalPaid: string;
  pricePerGallon: string;
  gallons: string;
  stationName: string;
  odometer: string;
  notes: string;
};

export type ParsedDemoFuelFormValues = {
  date: string;
  vehicleId: EntityId;
  totalPaidCents: MoneyCents;
  pricePerGallonCents: MoneyCents;
  gallons: number;
  stationName?: string;
  odometer?: number;
  notes?: string;
};

export type DemoFuelFormErrors = Partial<
  Record<keyof DemoFuelFormValues, string>
>;

export type DemoFuelFormParseResult =
  | { success: true; values: ParsedDemoFuelFormValues }
  | { success: false; errors: DemoFuelFormErrors };

export function getDefaultDemoFuelFormValues(
  data: DemoData,
): DemoFuelFormValues {
  const defaultVehicle = data.vehicles.find((vehicle) => vehicle.isDefault);
  const today = formatDateToString(new Date());

  return {
    date: today,
    vehicleId: defaultVehicle?.id ?? "",
    totalPaid: "",
    pricePerGallon: "",
    gallons: "",
    stationName: "",
    odometer: "",
    notes: "",
  };
}

export function getDemoFuelFormValues(
  data: DemoData,
  fuelPurchaseId: EntityId,
): DemoFuelFormValues | null {
  const fuelPurchase = data.fuelPurchases.find(
    (item) => fuelPurchaseId === item.id,
  );

  if (!fuelPurchase) {
    return null;
  }

  return {
    date: fuelPurchase.date,
    vehicleId: fuelPurchase.vehicleId,
    totalPaid: (fuelPurchase.totalPaidCents / 100).toFixed(2),
    pricePerGallon: (fuelPurchase.pricePerGallonCents / 100).toFixed(2),
    gallons: fuelPurchase.gallons.toString(),
    stationName: fuelPurchase.stationName ?? "",
    odometer:
      fuelPurchase.odometer === undefined
        ? ""
        : fuelPurchase.odometer.toString(),
    notes: fuelPurchase.notes ?? "",
  };
}

export function parseDemoFuelFormValues(
  data: DemoData,
  values: DemoFuelFormValues,
): DemoFuelFormParseResult {
  const errors: DemoFuelFormErrors = {};

  if (!isDateInputValue(values.date)) {
    errors.date = "Date is required";
  }

  if (!data.vehicles.some((vehicle) => vehicle.id === values.vehicleId)) {
    errors.vehicleId = "Vehicle is required";
  }

  const totalPaidCents = dollarInputToCents(values.totalPaid);
  if (totalPaidCents <= 0) {
    errors.totalPaid = "Enter an amount greater than $0.00.";
  }

  const pricePerGallonCents = dollarInputToCents(values.pricePerGallon);
  if (pricePerGallonCents <= 0) {
    errors.pricePerGallon = "Enter a price greater than $0.00.";
  }

  const gallons = numberInputToNumber(values.gallons);
  if (gallons <= 0) {
    errors.gallons = "Enter gallons greater than 0.";
  }

  const odometer =
    values.odometer.trim().length > 0
      ? numberInputToNumber(values.odometer)
      : undefined;

  if (odometer !== undefined && odometer <= 0) {
    errors.odometer = "Enter a valid odometer value.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const stationName = values.stationName.trim();
  const notes = values.notes.trim();

  return {
    success: true,
    values: {
      date: values.date,
      vehicleId: values.vehicleId,
      totalPaidCents,
      pricePerGallonCents,
      gallons: gallons,
      stationName: stationName.length > 0 ? stationName : undefined,
      odometer,
      notes: notes.length > 0 ? notes : undefined,
    },
  };
}

function dollarInputToCents(value: string): MoneyCents {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  return Math.round(amount * 100);
}

function numberInputToNumber(value: string): number {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  return amount;
}

function isDateInputValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
