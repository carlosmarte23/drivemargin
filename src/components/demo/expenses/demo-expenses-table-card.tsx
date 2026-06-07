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
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label={`Edit expense ${date}`}
                                className="hover:bg-primary/10 hover:text-primary"
                                onClick={() => onEditExpense(expense.id)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit expense</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label={`Delete expense ${date}`}
                                className="hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => onDeleteExpense(expense.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete expense</TooltipContent>
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
