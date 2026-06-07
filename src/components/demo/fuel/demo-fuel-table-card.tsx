import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { calculateFuelPricePerGallonCents } from "@/lib/calculations/fuel";
import { formatSessionDate, formatSessionShortDate } from "@/lib/date";
import { formatCurrencyFromCents } from "@/lib/formatters/money";
import { formatMiles } from "@/lib/formatters/number";
import type { MoneyCents } from "@/types/domain";

export type DemoFuelTableRow = {
  id: string;
  vehicleName: string;
  date: string;
  totalPaidCents: MoneyCents;
  gallons: number;
  stationName?: string;
  odometer?: number;
  notes?: string;
};

type DemoFuelTableCardProps = {
  rows: DemoFuelTableRow[];
  periodLabel: string;
  onEditFuelPurchase: (fuelPurchaseId: string) => void;
  onDeleteFuelPurchase: (fuelPurchaseId: string) => void;
};

export function DemoFuelTableCard({
  rows,
  periodLabel,
  onEditFuelPurchase,
  onDeleteFuelPurchase,
}: DemoFuelTableCardProps) {
  return (
    <Card className="gap-0">
      <CardHeader className="pb-4">
        <CardTitle>Fuel purchases</CardTitle>
        <CardDescription>Fuel purchases for {periodLabel}.</CardDescription>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Paid</TableHead>
              <TableHead className="text-right">Gallons</TableHead>
              <TableHead className="hidden text-right md:table-cell">
                Price / gal
              </TableHead>
              <TableHead className="hidden md:table-cell">Station</TableHead>
              <TableHead className="hidden xl:table-cell">Vehicle</TableHead>
              <TableHead className="hidden text-right xl:table-cell">
                Odometer
              </TableHead>
              <TableHead className="hidden xl:table-cell">Notes</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-24 text-center text-muted-foreground"
                >
                  No fuel purchases recorded for this period yet.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((purchase) => {
                const date = formatSessionDate(purchase.date);
                const shortDate = formatSessionShortDate(purchase.date);
                const totalPaid = formatCurrencyFromCents(
                  purchase.totalPaidCents,
                );
                const pricePerGallon = formatCurrencyFromCents(
                  calculateFuelPricePerGallonCents(
                    purchase.totalPaidCents,
                    purchase.gallons,
                  ),
                );
                const odometer = purchase.odometer
                  ? formatMiles(purchase.odometer)
                  : "-";

                return (
                  <TableRow key={purchase.id}>
                    <TableCell className="font-medium text-primary">
                      <span className="sm:hidden">{shortDate}</span>
                      <span className="hidden sm:inline">{date}</span>
                    </TableCell>

                    <TableCell className="text-right font-medium tabular-nums">
                      {totalPaid}
                    </TableCell>

                    <TableCell className="text-right tabular-nums">
                      {purchase.gallons.toFixed(2)}
                    </TableCell>

                    <TableCell className="hidden text-right text-muted-foreground tabular-nums md:table-cell">
                      {pricePerGallon}
                    </TableCell>

                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {purchase.stationName ?? "-"}
                    </TableCell>

                    <TableCell className="hidden text-muted-foreground xl:table-cell">
                      {purchase.vehicleName}
                    </TableCell>

                    <TableCell className="hidden text-right text-muted-foreground tabular-nums xl:table-cell">
                      {odometer}
                    </TableCell>

                    <TableCell className="hidden max-w-64 truncate text-muted-foreground xl:table-cell">
                      {purchase.notes ?? "-"}
                    </TableCell>

                    <TableCell className="w-24 text-right">
                      <div className="flex justify-end gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label={`Edit purchase ${date}`}
                                className="hover:bg-primary/10 hover:text-primary"
                                onClick={() => onEditFuelPurchase(purchase.id)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit purchase</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label={`Delete purchase ${date}`}
                                className="hover:bg-destructive/10 hover:text-destructive"
                                onClick={() =>
                                  onDeleteFuelPurchase(purchase.id)
                                }
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete purchase</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
