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

import type { MoneyCents } from "@/types/domain";

export type DemoExpensesTableRow = {
  id: string;
  date: string;
  categoryLabel: string;
  description?: string;
  amountCents: MoneyCents;
};

type DemoExpensesTableCardProps = {
  rows: DemoExpensesTableRow[];
  periodLabel: string;
};

export function DemoExpensesTableCard({
  rows,
  periodLabel,
}: DemoExpensesTableCardProps) {
  return (
    <Card className="gap-0">
      <CardHeader className="pb-4">
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Expenses made for {periodLabel}.</CardDescription>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground"
                >
                  No expenses recorded for this period.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((expense) => {
                const date = formatSessionDate(expense.date);
                const shortDate = formatSessionShortDate(expense.date);

                const totalPaid = formatCurrencyFromCents(expense.amountCents);

                return (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium text-primary">
                      <span className="sm:hidden">{shortDate}</span>
                      <span className="hidden sm:inline">{date}</span>
                    </TableCell>

                    <TableCell className="font-medium">
                      {expense.categoryLabel}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      {expense.description ?? "-"}
                    </TableCell>

                    <TableCell className="text-muted-foreground tabular-nums">
                      {totalPaid}
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
