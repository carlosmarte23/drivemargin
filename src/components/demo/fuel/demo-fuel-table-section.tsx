"use client";

import { useState } from "react";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { DemoFuelCreateAction } from "@/components/demo/fuel/demo-fuel-create-action";
import {
  DemoFuelTableCard,
  type DemoFuelTableRow,
} from "@/components/demo/fuel/demo-fuel-table-card";
import { deleteDemoFuelPurchase } from "@/lib/demo/demo-fuel-mutations";
import { resolveDemoRecordsPeriod } from "@/lib/demo/demo-records-period";
import {
  formatReportPeriodLabel,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

import { DemoDeleteConfirmationDialog } from "../demo-delete-confirmation-dialog";
import { DemoFuelFormSheet } from "./demo-fuel-form-sheet";

type DemoFuelTableSectionProps = {
  query: ReportPeriodInput;
};

export function DemoFuelTableSection({ query }: DemoFuelTableSectionProps) {
  const { demoData, setDemoData } = useDemoData();
  const { period } = resolveDemoRecordsPeriod(demoData, "fuel", query);

  const fuelPurchases = demoData.fuelPurchases;

  const [editingFuelPurchaseId, setEditingFuelPurchaseId] = useState<
    string | null
  >(null);
  const [deletingFuelPurchaseId, setDeletingFuelPurchaseId] = useState<
    string | null
  >(null);

  const rows = fuelPurchases
    .filter((purchase) => {
      return (
        purchase.date >= period.startDate && purchase.date <= period.endDate
      );
    })
    .map((purchase): DemoFuelTableRow => {
      const vehicle = demoData.vehicles.find((item) => {
        return item.id === purchase.vehicleId;
      });
      return {
        id: purchase.id,
        vehicleName: vehicle?.name ?? "Unknown vehicle",
        date: purchase.date,
        totalPaidCents: purchase.totalPaidCents,
        gallons: purchase.gallons,
        stationName: purchase.stationName,
        odometer: purchase.odometer,
        notes: purchase.notes,
      };
    })
    .sort((firstPurchase, secondPurchase) => {
      return secondPurchase.date.localeCompare(firstPurchase.date);
    });

  return (
    <>
      <DemoFuelTableCard
        rows={rows}
        periodLabel={formatReportPeriodLabel(period)}
        onEditFuelPurchase={setEditingFuelPurchaseId}
        onDeleteFuelPurchase={setDeletingFuelPurchaseId}
      />

      <DemoFuelCreateAction />

      <DemoDeleteConfirmationDialog
        entityId={deletingFuelPurchaseId}
        open={deletingFuelPurchaseId !== null}
        title="Delete fuel purchase?"
        description="Are you sure you want to delete this fuel purchase?"
        onOpenChange={(open) => {
          if (!open) {
            setDeletingFuelPurchaseId(null);
          }
        }}
        onConfirmDelete={(fuelPurchaseId) => {
          setDemoData((currentData) => {
            return deleteDemoFuelPurchase(currentData, fuelPurchaseId);
          });
          setDeletingFuelPurchaseId(null);
        }}
      />

      <DemoFuelFormSheet
        mode="edit"
        fuelPurchaseId={editingFuelPurchaseId}
        open={editingFuelPurchaseId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingFuelPurchaseId(null);
          }
        }}
      />
    </>
  );
}
