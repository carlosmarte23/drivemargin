export const expenseCategories = [
  "maintenance",
  "parking",
  "tolls",
  "supplies",
  "car_wash",
  "phone",
  "food",
  "tax_prep",
  "insurance",
  "other",
] as const;

export type ExpenseCategory = (typeof expenseCategories)[number];

export const defaultExpenseCategory: ExpenseCategory = expenseCategories[0];

export const expenseCategoryLabels = {
  maintenance: "Maintenance",
  parking: "Parking",
  tolls: "Tolls",
  supplies: "Supplies",
  car_wash: "Car wash",
  phone: "Phone",
  food: "Food",
  tax_prep: "Tax prep",
  insurance: "Insurance",
  other: "Other",
} satisfies Record<ExpenseCategory, string>;

export function isExpenseCategory(value: string): value is ExpenseCategory {
  return expenseCategories.includes(value as ExpenseCategory);
}
