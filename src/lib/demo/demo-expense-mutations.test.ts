import { describe, expect, test } from "vitest";

import { generateDemoData } from "@/data/demo/generateDemoData";
import type { DemoData } from "@/types/domain";

import type { DemoExpenseFormValues } from "./demo-expense-form";
import {
  createDemoExpense,
  deleteDemoExpense,
  updateDemoExpense,
} from "./demo-expense-mutations";

const referenceDate = new Date("2026-06-04T12:00:00.000Z");

function buildData(): DemoData {
  return generateDemoData(referenceDate);
}

function buildValidValues(): DemoExpenseFormValues {
  return {
    date: "2026-06-04",
    category: "parking",
    customCategoryName: "",
    description: "Downtown parking",
    amount: "12.50",
  };
}

describe("demo expense mutations", () => {
  test("createDemoExpense adds an expense", () => {
    const data = buildData();

    const result = createDemoExpense(data, buildValidValues(), {
      expenseId: "demo-expense-new",
    });

    expect(result.success).toBe(true);

    if (!result.success) return;

    const expense = result.data.expenses.find((item) => {
      return item.id === "demo-expense-new";
    });

    expect(result.expenseId).toBe("demo-expense-new");
    expect(expense).toEqual({
      id: "demo-expense-new",
      date: "2026-06-04",
      category: "parking",
      amountCents: 1250,
      description: "Downtown parking",
    });
    expect(result.data.expenses).toHaveLength(data.expenses.length + 1);
  });

  test("updateDemoExpense replaces an existing expense", () => {
    const data = buildData();
    const existingExpense = data.expenses[0]!;
    const values: DemoExpenseFormValues = {
      ...buildValidValues(),
      category: "other",
      customCategoryName: "Platform supplies",
      description: "Edited expense",
      amount: "24.25",
    };

    const result = updateDemoExpense(data, existingExpense.id, values);

    expect(result.success).toBe(true);

    if (!result.success) return;

    const expense = result.data.expenses.find((item) => {
      return item.id === existingExpense.id;
    });

    expect(result.expenseId).toBe(existingExpense.id);
    expect(expense).toMatchObject({
      id: existingExpense.id,
      category: "other",
      customCategoryName: "Platform supplies",
      description: "Edited expense",
      amountCents: 2425,
    });
    expect(result.data.expenses).toHaveLength(data.expenses.length);
  });

  test("updateDemoExpense returns an error for a missing expense", () => {
    const data = buildData();

    const result = updateDemoExpense(
      data,
      "missing-expense",
      buildValidValues(),
    );

    expect(result.success).toBe(false);

    if (result.success) return;

    expect(result.errors).toEqual({
      date: "Expense not found",
    });
  });

  test("deleteDemoExpense removes an expense", () => {
    const data = buildData();
    const existingExpense = data.expenses[0]!;

    const result = deleteDemoExpense(data, existingExpense.id);

    expect(
      result.expenses.some((expense) => {
        return expense.id === existingExpense.id;
      }),
    ).toBe(false);
    expect(result.expenses).toHaveLength(data.expenses.length - 1);
  });

  test("createDemoExpense returns validation errors without changing data", () => {
    const data = buildData();
    const values: DemoExpenseFormValues = {
      ...buildValidValues(),
      amount: "0",
    };

    const result = createDemoExpense(data, values);

    expect(result.success).toBe(false);

    if (result.success) return;

    expect(result.errors).toMatchObject({
      amount: "Enter an amount greater than $0.00.",
    });
  });
});
