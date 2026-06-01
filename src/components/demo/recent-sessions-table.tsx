import Link from "next/link";

import { ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import type { RecentSession } from "@/lib/demo/get-demo-dashboard-data";
import { formatCurrencyFromCents } from "@/lib/formatters/money";
import { formatHours, formatMiles } from "@/lib/formatters/number";
import {
  buildPeriodHref,
  formatReportPeriodLabel,
} from "@/lib/reporting/reportPeriod";

type AppBasePath = "/demo" | "/app";

type RecentSessionsTableProps = {
  sessions: RecentSession[];
  period: { startDate: string; endDate: string };
  basePath: AppBasePath;
};

function formatSessionDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatSessionShortDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatSessionTimeRange(startedAt: string, endedAt: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formatter.format(new Date(startedAt))} - ${formatter.format(new Date(endedAt))}`;
}

export function RecentSessionsTable({
  sessions,
  period,
  basePath,
}: RecentSessionsTableProps) {
  const periodLabel = formatReportPeriodLabel(period);
  const sessionsHref = buildPeriodHref(`${basePath}/sessions`, period);

  return (
    <Card className="gap-0">
      <CardHeader className="pb-4">
        <CardTitle>Recent sessions</CardTitle>
        <CardDescription>
          Latest work sessions on this period: {periodLabel}.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="hidden md:table-cell">Time</TableHead>
              <TableHead>Apps</TableHead>
              <TableHead className="text-right">Miles</TableHead>
              <TableHead className="hidden sm:table-cell text-right">
                Hours
              </TableHead>
              <TableHead className="hidden md:table-cell text-right">
                Gross
              </TableHead>
              <TableHead className="text-right">Net</TableHead>
              <TableHead className="hidden lg:table-cell text-right">
                Net / hour
              </TableHead>
              <TableHead className="hidden lg:table-cell text-right">
                Net / mile
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sessions.map((session) => {
              const date = formatSessionDate(session.date);
              const shortDate = formatSessionShortDate(session.date);
              const timeRange = formatSessionTimeRange(
                session.startedAt,
                session.endedAt,
              );

              const netEarnings = formatCurrencyFromCents(
                session.netEarningsCents,
              );
              const miles = formatMiles(session.totalMiles);
              const hours = formatHours(session.hoursWorked);
              const grossEarnings = formatCurrencyFromCents(
                session.grossEarningsCents,
              );

              const netEarningsPerHour = formatCurrencyFromCents(
                session.netCentsPerHour,
              );
              const netEarningsPerMile = formatCurrencyFromCents(
                session.netCentsPerMile,
              );

              return (
                <TableRow key={session.sessionId}>
                  <TableCell className="font-medium text-primary">
                    <span className="sm:hidden">{shortDate}</span>
                    <span className="hidden sm:inline">{date}</span>
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {timeRange}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-1">
                      {session.appShortNames.map((appShortName) => (
                        <Badge
                          key={appShortName}
                          variant="secondary"
                          className="px-1.5"
                        >
                          {appShortName}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className="text-right tabular-nums">
                    {miles}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell text-right tabular-nums">
                    {hours}
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-right tabular-nums text-muted-foreground">
                    {grossEarnings}
                  </TableCell>

                  <TableCell className="text-right font-medium text-emerald-400 tabular-nums">
                    {netEarnings}
                  </TableCell>

                  <TableCell className="hidden lg:table-cell text-right text-emerald-400 tabular-nums">
                    {netEarningsPerHour}
                  </TableCell>

                  <TableCell className="hidden lg:table-cell text-right text-emerald-400 tabular-nums">
                    {netEarningsPerMile}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="justify-center border-t bg-transparent px-4 py-1">
        <Button asChild variant="ghost" size="sm">
          <Link href={sessionsHref}>
            View sessions for this period
            <ChevronDown className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
