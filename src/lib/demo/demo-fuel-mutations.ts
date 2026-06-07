import { createDemoEntityId } from "@/lib/demo/demo-entity-id";
import {
  parseDemoFuelFormValues,
  type DemoFuelFormErrors,
  type DemoFuelFormValues,
  type ParsedDemoFuelFormValues,
} from "@/lib/demo/demo-fuel-form";
import type { DemoData, EntityId, FuelPurchase } from "@/types/domain";

export type DemoFuelMutationOptions = {
  fuelPurchaseId?: EntityId;
};

export type DemoFuelMutationResult =
  | { success: true; data: DemoData; fuelPurchaseId: EntityId }
  | { success: false; errors: DemoFuelFormErrors };

export function createDemoFuelPurchase(
  data: DemoData,
  values: DemoFuelFormValues,
  options: DemoFuelMutationOptions = {},
): DemoFuelMutationResult {
  const parsed = parseDemoFuelFormValues(data, values);

  if (!parsed.success) {
    return parsed;
  }

  const fuelPurchaseId =
    options.fuelPurchaseId ?? createDemoEntityId("fuel-purchase");
  const fuelPurchase = buildFuelPurchase(fuelPurchaseId, parsed.values);

  return {
    success: true,
    data: {
      ...data,
      fuelPurchases: [...data.fuelPurchases, fuelPurchase],
    },
    fuelPurchaseId,
  };
}

export function updateDemoFuelPurchase(
  data: DemoData,
  fuelPurchaseId: EntityId,
  values: DemoFuelFormValues,
): DemoFuelMutationResult {
  const existingPurchase = data.fuelPurchases.find((purchase) => {
    return purchase.id === fuelPurchaseId;
  });

  if (!existingPurchase) {
    return {
      success: false,
      errors: {
        date: "Fuel purchase not found",
      },
    };
  }

  const parsed = parseDemoFuelFormValues(data, values);

  if (!parsed.success) {
    return parsed;
  }

  const nextPurchase = buildFuelPurchase(fuelPurchaseId, parsed.values);

  return {
    success: true,
    fuelPurchaseId: existingPurchase.id,
    data: {
      ...data,
      fuelPurchases: data.fuelPurchases.map((purchase) => {
        return purchase.id === fuelPurchaseId ? nextPurchase : purchase;
      }),
    },
  };
}

export function deleteDemoFuelPurchase(
  data: DemoData,
  fuelPurchaseId: EntityId,
): DemoData {
  return {
    ...data,
    fuelPurchases: data.fuelPurchases.filter(
      (purchase) => purchase.id !== fuelPurchaseId,
    ),
  };
}

function buildFuelPurchase(
  id: EntityId,
  values: ParsedDemoFuelFormValues,
): FuelPurchase {
  return {
    id,
    ...values,
  };
}
