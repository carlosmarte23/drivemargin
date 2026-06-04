import type { ExpenseCategory } from "@/types/domain";

export function formatExpenseCategoryLabel(
  category: ExpenseCategory,
  customCategoryName?: string,
) {
  if (customCategoryName) {
    return customCategoryName;
  }

  const labels: Record<ExpenseCategory, string> = {
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
  };

  return labels[category] ?? category;
}
