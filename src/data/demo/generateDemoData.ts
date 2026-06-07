import type {
  DemoData,
  Expense,
  FuelPurchase,
  SessionAppEarning,
  WorkSession,
} from "@/types/domain";

import { demoSettings } from "./demoSettings";
import { demoVehicles } from "./demoVehicles";
import { demoWorkApps } from "./demoWorkApps";
import { demoExpenseTemplates } from "./templates/demoExpenseTemplates";
import { demoFuelPurchaseTemplates } from "./templates/demoFuelPurchaseTemplates";
import {
  demoSessionAppEarningTemplates,
  demoSessionTemplates,
} from "./templates/demoSessionTemplates";

function getRelativeDate(referenceDate: Date, dayOffset: number): Date {
  const date = new Date(referenceDate);

  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  return date;
}

function toISODateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function buildDateTime(
  referenceDate: Date,
  dayOffset: number,
  time: string,
): string {
  const date = getRelativeDate(referenceDate, dayOffset);
  const [hours, minutes] = time.split(":").map(Number);
  date.setHours(hours, minutes, 0, 0);

  return date.toISOString();
}

function buildSessionEndDateTime(
  referenceDate: Date,
  dayOffset: number,
  startTime: string,
  endTime: string,
): string {
  const startedAt = new Date(
    buildDateTime(referenceDate, dayOffset, startTime),
  );
  const endedAt = new Date(buildDateTime(referenceDate, dayOffset, endTime));

  if (endedAt <= startedAt) {
    endedAt.setDate(endedAt.getDate() + 1);
  }

  return endedAt.toISOString();
}

export function generateDemoData(referenceDate = new Date()): DemoData {
  const sessions: WorkSession[] = demoSessionTemplates.map((template) => ({
    id: template.id.replace("-template", ""),
    vehicleId: template.vehicleId,
    startedAt: buildDateTime(
      referenceDate,
      template.dayOffset,
      template.startTime,
    ),
    endedAt: buildSessionEndDateTime(
      referenceDate,
      template.dayOffset,
      template.startTime,
      template.endTime,
    ),
    date: toISODateString(getRelativeDate(referenceDate, template.dayOffset)),
    mileageEntryMode: template.mileageEntryMode,
    totalMiles: template.totalMiles,
    startOdometer: template.startOdometer,
    endOdometer: template.endOdometer,
    notes: template.notes,
  }));

  const fuelPurchases: FuelPurchase[] = demoFuelPurchaseTemplates.map(
    (template) => ({
      id: template.id.replace("-template", ""),
      vehicleId: template.vehicleId,
      date: toISODateString(getRelativeDate(referenceDate, template.dayOffset)),
      totalPaidCents: template.totalPaidCents,
      pricePerGallonCents: template.pricePerGallonCents,
      gallons: template.gallons,
      stationName: template.stationName,
      odometer: template.odometer,
      notes: template.notes,
    }),
  );

  const expenses: Expense[] = demoExpenseTemplates.map((template) => ({
    id: template.id.replace("-template", ""),
    date: toISODateString(getRelativeDate(referenceDate, template.dayOffset)),
    category: template.category,
    customCategoryName: template.customCategoryName,
    description: template.description,
    amountCents: template.amountCents,
  }));

  const sessionAppEarnings: SessionAppEarning[] =
    demoSessionAppEarningTemplates.map((template) => ({
      id: template.id.replace("-template", ""),
      sessionId: template.sessionTemplateId.replace("-template", ""),
      workAppId: template.workAppId,
      amountCents: template.amountCents,
    }));

  return {
    vehicles: demoVehicles,
    settings: demoSettings,
    workApps: demoWorkApps,
    sessions,
    fuelPurchases,
    expenses,
    sessionAppEarnings,
  };
}
