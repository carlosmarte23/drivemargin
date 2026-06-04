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
import { formatSessionDate, formatSessionShortDate } from "@/lib/date";
import { formatCurrencyFromCents } from "@/lib/formatters/money";
import { formatMiles } from "@/lib/formatters/number";

export type DemoFuelTableRow = {
  id: string;
  vehicleName: string;
  date: string;
  totalPaidCents: number;
  pricePerGallonCents: number;
  gallons: number;
  stationName?: string;
  odometer?: number;
  notes?: string;
};

type DemoFuelTableCardProps = {
  rows: DemoFuelTableRow[];
  periodLabel: string;
};

export function DemoFuelTableCard({
  rows,
  periodLabel,
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
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
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
                  purchase.pricePerGallonCents,
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
