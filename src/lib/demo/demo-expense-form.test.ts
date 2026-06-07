import { describe, expect, test } from "vitest";

import { generateDemoData } from "@/data/demo/generateDemoData";
import type { DemoData } from "@/types/domain";

import {
  getDefaultDemoExpenseFormValues,
  getDemoExpenseFormValues,
  parseDemoExpenseFormValues,
  type DemoExpenseFormValues,
} from "./demo-expense-form";

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

describe("demo expense form", () => {
  test("getDefaultDemoExpenseFormValues returns blank input values", () => {
    const values = getDefaultDemoExpenseFormValues();

    expect(values).toMatchObject({
      category: "maintenance",
      customCategoryName: "",
      description: "",
      amount: "",
    });
    expect(values.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test("getDemoExpenseFormValues maps an existing expense to input values", () => {
    const data = buildData();
    const expense = data.expenses[0]!;

    const values = getDemoExpenseFormValues(data, expense.id);

    expect(values).toEqual({
      date: expense.date,
      category: expense.category,
      customCategoryName: expense.customCategoryName ?? "",
      description: expense.description ?? "",
      amount: (expense.amountCents / 100).toFixed(2),
    });
  });

  test("getDemoExpenseFormValues returns null for a missing expense", () => {
    const data = buildData();

    expect(getDemoExpenseFormValues(data, "missing-expense")).toBeNull();
  });

  test("parseDemoExpenseFormValues converts valid input values", () => {
    const result = parseDemoExpenseFormValues(buildValidValues());

    expect(result.success).toBe(true);

    if (!result.success) return;

    expect(result.values).toEqual({
      date: "2026-06-04",
      category: "parking",
      amountCents: 1250,
      description: "Downtown parking",
    });
  });

  test("parseDemoExpenseFormValues trims optional fields", () => {
    const values: DemoExpenseFormValues = {
      ...buildValidValues(),
      category: "other",
      customCategoryName: "  Platform supplies  ",
      description: "  Replacement bag divider  ",
      amount: "15.99",
    };

    const result = parseDemoExpenseFormValues(values);

    expect(result.success).toBe(true);

    if (!result.success) return;

    expect(result.values).toEqual({
      date: "2026-06-04",
      category: "other",
      customCategoryName: "Platform supplies",
      description: "Replacement bag divider",
      amountCents: 1599,
    });
  });

  test("parseDemoExpenseFormValues returns validation errors", () => {
    const values: DemoExpenseFormValues = {
      ...buildValidValues(),
      date: "",
      category: "",
      amount: "0",
    };

    const result = parseDemoExpenseFormValues(values);

    expect(result.success).toBe(false);

    if (result.success) return;

    expect(result.errors).toMatchObject({
      date: "Date is required",
      category: "Category is required",
      amount: "Enter an amount greater than $0.00.",
    });
  });

  test("parseDemoExpenseFormValues requires a custom category for other expenses", () => {
    const values: DemoExpenseFormValues = {
      ...buildValidValues(),
      category: "other",
      customCategoryName: "",
    };

    const result = parseDemoExpenseFormValues(values);

    expect(result.success).toBe(false);

    if (result.success) return;

    expect(result.errors).toEqual({
      customCategoryName: "Custom category is required",
    });
  });
});
