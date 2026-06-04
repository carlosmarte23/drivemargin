"use client";

import { useDemoData } from "@/components/demo/demo-data-provider";
import {
  DemoExpensesTableCard,
  type DemoExpensesTableRow,
} from "@/components/demo/demo-expenses-table-card";
import { resolveDemoRecordsPeriod } from "@/lib/demo/demo-records-period";
import {
  formatReportPeriodLabel,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";

import { formatExpenseCategoryLabel } from "@/lib/formatters/expense-category";

type DemoExpensesTableSectionProps = {
  query: ReportPeriodInput;
};

export function DemoExpensesTableSection({
  query,
}: DemoExpensesTableSectionProps) {
  const { demoData } = useDemoData();
  const { period } = resolveDemoRecordsPeriod(demoData, "expenses", query);

  const expenses = demoData.expenses;

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
    <DemoExpensesTableCard
      rows={rows}
      periodLabel={formatReportPeriodLabel(period)}
    />
  );
}
