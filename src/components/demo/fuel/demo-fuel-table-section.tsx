"use client";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { DemoDeleteConfirmationDialog } from "@/components/demo/demo-delete-confirmation-dialog";
import { DemoFuelCreateAction } from "@/components/demo/fuel/demo-fuel-create-action";
import { DemoFuelFormSheet } from "@/components/demo/fuel/demo-fuel-form-sheet";
import {
  DemoFuelTableCard,
  type DemoFuelTableRow,
} from "@/components/demo/fuel/demo-fuel-table-card";
import { useDemoRecordActions } from "@/components/demo/use-demo-record-actions";
import { deleteDemoFuelPurchase } from "@/lib/demo/demo-fuel-mutations";
import { resolveDemoRecordsPeriod } from "@/lib/demo/demo-records-period";
import {
  formatReportPeriodLabel,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

type DemoFuelTableSectionProps = {
  query: ReportPeriodInput;
};

export function DemoFuelTableSection({ query }: DemoFuelTableSectionProps) {
  const { demoData, setDemoData } = useDemoData();
  const { period } = resolveDemoRecordsPeriod(demoData, "fuel", query);

  const fuelPurchases = demoData.fuelPurchases;

  const {
    editingRecordId: editingFuelPurchaseId,
    deletingRecordId: deletingFuelPurchaseId,
    startEditingRecord: startEditingFuelPurchase,
    startDeletingRecord: startDeletingFuelPurchase,
    closeEditingRecord: closeEditingFuelPurchase,
    closeDeletingRecord: closeDeletingFuelPurchase,
  } = useDemoRecordActions();

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
        onEditFuelPurchase={startEditingFuelPurchase}
        onDeleteFuelPurchase={startDeletingFuelPurchase}
      />

      <DemoFuelCreateAction />

      <DemoDeleteConfirmationDialog
        entityId={deletingFuelPurchaseId}
        open={deletingFuelPurchaseId !== null}
        title="Delete fuel purchase?"
        description="Are you sure you want to delete this fuel purchase?"
        onOpenChange={(open) => {
          if (!open) {
            closeDeletingFuelPurchase();
          }
        }}
        onConfirmDelete={(fuelPurchaseId) => {
          setDemoData((currentData) => {
            return deleteDemoFuelPurchase(currentData, fuelPurchaseId);
          });
          closeDeletingFuelPurchase();
        }}
      />

      <DemoFuelFormSheet
        mode="edit"
        fuelPurchaseId={editingFuelPurchaseId}
        open={editingFuelPurchaseId !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeEditingFuelPurchase();
          }
        }}
      />
    </>
  );
}
