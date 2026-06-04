import { Badge } from "@/components/ui/badge";
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
  formatSessionDate,
  formatSessionShortDate,
  formatSessionTimeRange,
} from "@/lib/date";
import { formatCurrencyFromCents } from "@/lib/formatters/money";
import { formatHours, formatMiles } from "@/lib/formatters/number";

export type DemoSessionsTableRow = {
  id: string;
  date: string;
  startedAt: string;
  endedAt: string;
  vehicleName: string;
  appShortNames: string[];
  totalMiles: number;
  hoursWorked: number;
  grossEarningsCents: number;
  notes?: string;
};

type DemoSessionsTableCardProps = {
  rows: DemoSessionsTableRow[];
  periodLabel: string;
};

export function DemoSessionsTableCard({
  rows,
  periodLabel,
}: DemoSessionsTableCardProps) {
  return (
    <Card className="gap-0">
      <CardHeader className="pb-4">
        <CardTitle>Sessions</CardTitle>
        <CardDescription>
          Work sessions recorded for {periodLabel}.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="hidden md:table-cell">Time</TableHead>
              <TableHead>Apps</TableHead>
              <TableHead className="hidden lg:table-cell">Vehicle</TableHead>
              <TableHead className="text-right">Miles</TableHead>
              <TableHead className="hidden text-right sm:table-cell">
                Hours
              </TableHead>
              <TableHead className="text-right">Gross</TableHead>
              <TableHead className="hidden md:table-cell">Notes</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground"
                >
                  No sessions recorded for this period yet.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((session) => {
                const date = formatSessionDate(session.date);
                const shortDate = formatSessionShortDate(session.date);
                const timeRange = formatSessionTimeRange(
                  session.startedAt,
                  session.endedAt,
                );

                return (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium text-primary">
                      <span className="sm:hidden">{shortDate}</span>
                      <span className="hidden sm:inline">{date}</span>
                    </TableCell>

                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {timeRange}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {session.appShortNames.length > 0 ? (
                          session.appShortNames.map((appShortName) => (
                            <Badge
                              key={appShortName}
                              variant="secondary"
                              className="px-1.5"
                            >
                              {appShortName}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {session.vehicleName}
                    </TableCell>

                    <TableCell className="text-right tabular-nums">
                      {formatMiles(session.totalMiles)}
                    </TableCell>

                    <TableCell className="hidden text-right tabular-nums sm:table-cell">
                      {formatHours(session.hoursWorked)}
                    </TableCell>

                    <TableCell className="text-right font-medium tabular-nums">
                      {formatCurrencyFromCents(session.grossEarningsCents)}
                    </TableCell>

                    <TableCell className="hidden max-w-64 truncate text-muted-foreground md:table-cell">
                      {session.notes ?? "-"}
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
