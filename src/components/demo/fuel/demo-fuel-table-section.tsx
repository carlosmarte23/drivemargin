"use client";

import { useDemoData } from "@/components/demo/demo-data-provider";
import {
  DemoFuelTableCard,
  type DemoFuelTableRow,
} from "@/components/demo/fuel/demo-fuel-table-card";
import { resolveDemoRecordsPeriod } from "@/lib/demo/demo-records-period";
import {
  formatReportPeriodLabel,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

type DemoFuelTableSectionProps = {
  query: ReportPeriodInput;
};

export function DemoFuelTableSection({ query }: DemoFuelTableSectionProps) {
  const { demoData } = useDemoData();
  const { period } = resolveDemoRecordsPeriod(demoData, "fuel", query);

  const fuelPurchases = demoData.fuelPurchases;

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
        pricePerGallonCents: purchase.pricePerGallonCents,
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
    <DemoFuelTableCard
      rows={rows}
      periodLabel={formatReportPeriodLabel(period)}
    />
  );
}
