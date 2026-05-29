import type { EntityId, ExpenseCategory, MoneyCents } from "@/types/domain";

export interface DemoExpenseTemplate {
  id: EntityId;
  dayOffset: number;
  category: ExpenseCategory;
  customCategoryName?: string;
  description?: string;
  amountCents: MoneyCents;
}

export const demoExpenseTemplates: DemoExpenseTemplate[] = [
  {
    id: "demo-expense-template-001",
    dayOffset: -24,
    category: "car_wash",
    description: "Exterior wash before weekend shifts",
    amountCents: 1200,
  },
  {
    id: "demo-expense-template-002",
    dayOffset: -19,
    category: "parking",
    description: "Downtown parking during lunch shift",
    amountCents: 850,
  },
  {
    id: "demo-expense-template-003",
    dayOffset: -16,
    category: "supplies",
    description: "Insulated drink carrier",
    amountCents: 1899,
  },
  {
    id: "demo-expense-template-004",
    dayOffset: -12,
    category: "phone",
    description: "Monthly phone plan work share",
    amountCents: 4500,
  },
  {
    id: "demo-expense-template-005",
    dayOffset: -9,
    category: "tolls",
    description: "Airport route tolls",
    amountCents: 675,
  },
  {
    id: "demo-expense-template-006",
    dayOffset: -6,
    category: "food",
    description: "Meal break during long shift",
    amountCents: 1435,
  },
  {
    id: "demo-expense-template-007",
    dayOffset: -3,
    category: "maintenance",
    description: "Windshield washer fluid",
    amountCents: 649,
  },
  {
    id: "demo-expense-template-008",
    dayOffset: -1,
    category: "other",
    customCategoryName: "Platform supplies",
    description: "Replacement delivery bag divider",
    amountCents: 1599,
  },
];
