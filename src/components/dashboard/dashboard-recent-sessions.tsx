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
import {
  formatSessionDate,
  formatSessionShortDate,
  formatSessionTimeRange,
} from "@/lib/date";
import { formatCurrencyFromCents } from "@/lib/formatters/money";
import { formatHours, formatMiles } from "@/lib/formatters/number";
import {
  buildPeriodHref,
  formatReportPeriodLabel,
  type ReportPeriod,
} from "@/lib/reporting/reportPeriod";
import type { DashboardRecentSession } from "@/types/dashboard";

type DashboardRecentSessionsProps = {
  sessions: DashboardRecentSession[];
  period: ReportPeriod;
  basePath: "/demo" | "/app";
};

export function DashboardRecentSessions({
  sessions,
  period,
  basePath,
}: DashboardRecentSessionsProps) {
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
              <TableHead className="hidden text-right sm:table-cell">
                Hours
              </TableHead>
              <TableHead className="hidden text-right md:table-cell">
                Gross
              </TableHead>
              <TableHead className="text-right">Net</TableHead>
              <TableHead className="hidden text-right lg:table-cell">
                Net / hour
              </TableHead>
              <TableHead className="hidden text-right lg:table-cell">
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

                  <TableCell className="hidden text-muted-foreground md:table-cell">
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

                  <TableCell className="hidden text-right tabular-nums sm:table-cell">
                    {hours}
                  </TableCell>

                  <TableCell className="hidden text-right text-muted-foreground tabular-nums md:table-cell">
                    {grossEarnings}
                  </TableCell>

                  <TableCell className="text-right font-medium text-emerald-400 tabular-nums">
                    {netEarnings}
                  </TableCell>

                  <TableCell className="hidden text-right text-emerald-400 tabular-nums lg:table-cell">
                    {netEarningsPerHour}
                  </TableCell>

                  <TableCell className="hidden text-right text-emerald-400 tabular-nums lg:table-cell">
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
