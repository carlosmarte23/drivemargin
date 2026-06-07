import { formatDateToString } from "@/lib/date";
import {
  DemoData,
  EntityId,
  MoneyCents,
  type Expense,
  type ExpenseCategory,
} from "@/types/domain";
import {
  defaultExpenseCategory,
  isExpenseCategory,
} from "@/types/expense-category";

export type DemoExpenseFormValues = {
  date: string;
  category: string;
  customCategoryName: string;
  description: string;
  amount: string;
};

export type ParsedDemoExpenseFormValues = Omit<Expense, "id">;

export type DemoExpenseFormErrors = Partial<
  Record<keyof DemoExpenseFormValues, string>
>;

export type DemoExpenseFormParseResult =
  | { success: true; values: ParsedDemoExpenseFormValues }
  | { success: false; errors: DemoExpenseFormErrors };

export function getDefaultDemoExpenseFormValues(): DemoExpenseFormValues {
  const today = formatDateToString(new Date());

  return {
    date: today,
    category: defaultExpenseCategory,
    customCategoryName: "",
    description: "",
    amount: "",
  };
}
export function getDemoExpenseFormValues(
  data: DemoData,
  expenseId: EntityId,
): DemoExpenseFormValues | null {
  const expense = data.expenses.find((expense) => expense.id === expenseId);

  if (!expense) {
    return null;
  }

  return {
    date: expense.date,
    category: expense.category,
    customCategoryName: expense.customCategoryName ?? "",
    description: expense.description ?? "",
    amount: (expense.amountCents / 100).toFixed(2),
  };
}

export function parseDemoExpenseFormValues(
  values: DemoExpenseFormValues,
): DemoExpenseFormParseResult {
  const errors: DemoExpenseFormErrors = {};
  let parsedCategory: ExpenseCategory | null = null;

  const trimmedCustomCategoryName = values.customCategoryName.trim();
  const trimmedDescription = values.description.trim();

  const parsedCustomCategoryName =
    trimmedCustomCategoryName.length > 0
      ? trimmedCustomCategoryName
      : undefined;

  const parsedDescription =
    trimmedDescription.length > 0 ? trimmedDescription : undefined;

  if (isExpenseCategory(values.category)) {
    parsedCategory = values.category;
  } else {
    errors.category = "Category is required";
  }

  const amountCents = dollarInputToCents(values.amount);

  if (!isDateInputValue(values.date)) {
    errors.date = "Date is required";
  }

  if (values.category === "other") {
    if (!parsedCustomCategoryName || parsedCustomCategoryName.length === 0) {
      errors.customCategoryName = "Custom category is required";
    }
  }

  if (amountCents <= 0) {
    errors.amount = "Enter an amount greater than $0.00.";
  }

  if (Object.keys(errors).length > 0 || parsedCategory === null) {
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    values: {
      date: values.date,
      category: parsedCategory,
      customCategoryName: parsedCustomCategoryName,
      description: parsedDescription,
      amountCents: amountCents,
    },
  };
}

function dollarInputToCents(value: string): MoneyCents {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  return Math.round(amount * 100);
}

function isDateInputValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

// category: "maintenance",
// customCategoryName: "",
// description: "",
// amount: "",
