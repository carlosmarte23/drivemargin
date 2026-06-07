"use client";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { DemoDeleteConfirmationDialog } from "@/components/demo/demo-delete-confirmation-dialog";
import { DemoExpenseCreateAction } from "@/components/demo/expenses/demo-expense-create-action";
import {
  DemoExpensesTableCard,
  type DemoExpensesTableRow,
} from "@/components/demo/expenses/demo-expenses-table-card";
import { useDemoRecordActions } from "@/components/demo/use-demo-record-actions";
import { deleteDemoExpense } from "@/lib/demo/demo-expense-mutations";
import { resolveDemoRecordsPeriod } from "@/lib/demo/demo-records-period";
import { formatExpenseCategoryLabel } from "@/lib/formatters/expense-category";
import {
  formatReportPeriodLabel,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

import { DemoExpenseFormSheet } from "./demo-expense-form-sheet";

type DemoExpensesTableSectionProps = {
  query: ReportPeriodInput;
};

export function DemoExpensesTableSection({
  query,
}: DemoExpensesTableSectionProps) {
  const { demoData, setDemoData } = useDemoData();
  const { period } = resolveDemoRecordsPeriod(demoData, "expenses", query);

  const expenses = demoData.expenses;

  const {
    editingRecordId: editingExpenseId,
    deletingRecordId: deletingExpenseId,
    startEditingRecord: startEditingExpense,
    startDeletingRecord: startDeletingExpense,
    closeEditingRecord: closeEditingExpense,
    closeDeletingRecord: closeDeletingExpense,
  } = useDemoRecordActions();

  const rows = expenses
    .filter((expenses) => {
      return (
        expenses.date >= period.startDate && expenses.date <= period.endDate
      );
    })
    .map((expense): DemoExpensesTableRow => {
      return {
        id: expense.id,
        date: expense.date,
        categoryLabel: formatExpenseCategoryLabel(
          expense.category,
          expense.customCategoryName,
        ),
        description: expense.description,
        amountCents: expense.amountCents,
      };
    })
    .sort((firstPurchase, secondPurchase) => {
      return secondPurchase.date.localeCompare(firstPurchase.date);
    });

  return (
    <>
      <DemoExpensesTableCard
        rows={rows}
        periodLabel={formatReportPeriodLabel(period)}
        onEditExpense={startEditingExpense}
        onDeleteExpense={startDeletingExpense}
      />

      <DemoExpenseCreateAction />

      <DemoDeleteConfirmationDialog
        entityId={deletingExpenseId}
        open={deletingExpenseId !== null}
        title="Delete expense?"
        description="Are you sure you want to delete this expense?"
        onOpenChange={(open) => {
          if (!open) {
            closeDeletingExpense();
          }
        }}
        onConfirmDelete={(expenseId) => {
          setDemoData((currentData) => {
            return deleteDemoExpense(currentData, expenseId);
          });
          closeDeletingExpense();
        }}
      />

      <DemoExpenseFormSheet
        mode="edit"
        expenseId={editingExpenseId}
        open={editingExpenseId !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeEditingExpense();
          }
        }}
      />
    </>
  );
}
