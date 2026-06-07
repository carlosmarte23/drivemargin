import { Pencil, StickyNote, Trash2 } from "lucide-react";

import { DemoTableActionButton } from "@/components/demo/demo-table-action-button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableCard } from "@/components/ui/table-card";
import { TooltipProvider } from "@/components/ui/tooltip";
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
  onEditSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onViewSessionNotes: (sessionId: string) => void;
};

export function DemoSessionsTableCard({
  rows,
  periodLabel,
  onEditSession,
  onDeleteSession,
  onViewSessionNotes,
}: DemoSessionsTableCardProps) {
  return (
    <TableCard
      title="Sessions"
      description={<>Work sessions recorded for {periodLabel}.</>}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="hidden md:table-cell">Time</TableHead>
            <TableHead>Apps</TableHead>
            <TableHead className="hidden xl:table-cell">Vehicle</TableHead>
            <TableHead className="hidden text-right sm:table-cell">
              Miles
            </TableHead>
            <TableHead className="hidden text-right sm:table-cell">
              Hours
            </TableHead>
            <TableHead className="text-right">Gross</TableHead>
            <TableHead className="hidden 2xl:table-cell">Notes</TableHead>
            <TableHead className="w-12 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
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

                  <TableCell className="max-w-32">
                    <div className="flex items-center gap-1 overflow-hidden">
                      {session.appShortNames.length > 0 ? (
                        <>
                          {session.appShortNames
                            .slice(0, 3)
                            .map((appShortName) => (
                              <Badge
                                key={appShortName}
                                variant="secondary"
                                className="px-1.5"
                              >
                                {appShortName}
                              </Badge>
                            ))}

                          {session.appShortNames.length > 3 ? (
                            <Badge variant="secondary" className="px-1.5">
                              +{session.appShortNames.length - 3}
                            </Badge>
                          ) : null}
                        </>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="hidden text-muted-foreground xl:table-cell">
                    {session.vehicleName}
                  </TableCell>

                  <TableCell className="hidden text-right tabular-nums sm:table-cell">
                    {formatMiles(session.totalMiles)}
                  </TableCell>

                  <TableCell className="hidden text-right tabular-nums sm:table-cell">
                    {formatHours(session.hoursWorked)}
                  </TableCell>

                  <TableCell className="text-right font-medium tabular-nums">
                    {formatCurrencyFromCents(session.grossEarningsCents)}
                  </TableCell>

                  <TableCell className="hidden max-w-64 truncate text-muted-foreground 2xl:table-cell">
                    {session.notes ?? "-"}
                  </TableCell>

                  <TableCell className="w-28">
                    <div className="flex justify-end gap-1">
                      <TooltipProvider delayDuration={100}>
                        {session.notes?.trim() ? (
                          <DemoTableActionButton
                            label={`View notes for session ${date}`}
                            tooltip="View notes"
                            icon={StickyNote}
                            onClick={() => onViewSessionNotes(session.id)}
                          />
                        ) : null}

                        <DemoTableActionButton
                          label={`Edit session ${date}`}
                          tooltip="Edit session"
                          icon={Pencil}
                          onClick={() => onEditSession(session.id)}
                        />

                        <DemoTableActionButton
                          label={`Delete session ${date}`}
                          tooltip="Delete session"
                          icon={Trash2}
                          tone="destructive"
                          onClick={() => onDeleteSession(session.id)}
                        />
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableCard>
  );
}
