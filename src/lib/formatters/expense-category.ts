import type { ExpenseCategory } from "@/types/domain";
import { expenseCategoryLabels } from "@/types/expense-category";

export function formatExpenseCategoryLabel(
  category: ExpenseCategory,
  customCategoryName?: string,
) {
  if (customCategoryName) {
    return customCategoryName;
  }

  return expenseCategoryLabels[category] ?? category;
}
