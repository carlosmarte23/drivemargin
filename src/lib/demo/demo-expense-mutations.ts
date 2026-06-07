import { createDemoEntityId } from "@/lib/demo/demo-entity-id";
import type { DemoData, EntityId } from "@/types/domain";

import {
  parseDemoExpenseFormValues,
  type DemoExpenseFormErrors,
  type DemoExpenseFormValues,
  type ParsedDemoExpenseFormValues,
} from "./demo-expense-form";

export type DemoExpenseMutationOptions = {
  expenseId?: EntityId;
};

export type DemoExpenseMutationResult =
  | { success: true; data: DemoData; expenseId: EntityId }
  | { success: false; errors: DemoExpenseFormErrors };

export function createDemoExpense(
  data: DemoData,
  values: DemoExpenseFormValues,
  options: DemoExpenseMutationOptions = {},
): DemoExpenseMutationResult {
  const parsed = parseDemoExpenseFormValues(values);

  if (!parsed.success) {
    return parsed;
  }

  const expenseId = options.expenseId ?? createDemoEntityId("expense");
  const expense = buildExpense(expenseId, parsed.values);

  return {
    success: true,
    data: {
      ...data,
      expenses: [...data.expenses, expense],
    },
    expenseId,
  };
}

export function updateDemoExpense(
  data: DemoData,
  expenseId: EntityId,
  values: DemoExpenseFormValues,
): DemoExpenseMutationResult {
  const existingExpense = data.expenses.find((expense) => {
    return expense.id === expenseId;
  });

  if (!existingExpense) {
    return {
      success: false,
      errors: {
        date: "Expense not found",
      },
    };
  }

  const parsed = parseDemoExpenseFormValues(values);

  if (!parsed.success) {
    return parsed;
  }

  const nextExpense = buildExpense(expenseId, parsed.values);

  return {
    success: true,
    expenseId,
    data: {
      ...data,
      expenses: data.expenses.map((expense) => {
        return expense.id === expenseId ? nextExpense : expense;
      }),
    },
  };
}

export function deleteDemoExpense(
  data: DemoData,
  expenseId: EntityId,
): DemoData {
  return {
    ...data,
    expenses: data.expenses.filter((expense) => expense.id !== expenseId),
  };
}

function buildExpense(
  expenseId: EntityId,
  values: ParsedDemoExpenseFormValues,
) {
  return {
    id: expenseId,
    ...values,
  };
}
