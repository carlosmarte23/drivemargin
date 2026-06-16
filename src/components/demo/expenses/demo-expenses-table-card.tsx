import { Pencil, Trash2 } from "lucide-react";

import { DemoTableActionButton } from "@/components/demo/demo-table-action-button";
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
  onEditExpense: (expenseId: string) => void;
  onDeleteExpense: (expenseId: string) => void;
};

export function DemoExpensesTableCard({
  rows,
  periodLabel,
  onEditExpense,
  onDeleteExpense,
}: DemoExpensesTableCardProps) {
  return (
    <TableCard
      title="Expenses"
      description={<>Expenses made for {periodLabel}.</>}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
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

                  <TableCell className="w-24 text-right">
                    <div className="flex justify-end gap-1">
                      <TooltipProvider>
                        <DemoTableActionButton
                          label={`Edit expense ${date}`}
                          tooltip="Edit expense"
                          icon={Pencil}
                          onClick={() => onEditExpense(expense.id)}
                        />

                        <DemoTableActionButton
                          label={`Delete expense ${date}`}
                          tooltip="Delete expense"
                          icon={Trash2}
                          tone="destructive"
                          onClick={() => onDeleteExpense(expense.id)}
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
