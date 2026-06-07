"use client";

import { useState, type FormEvent, type MouseEvent } from "react";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { DemoFieldError } from "@/components/demo/demo-field-error";
import { DemoFormSheetFooter } from "@/components/demo/demo-form-sheet-footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  getDefaultDemoExpenseFormValues,
  getDemoExpenseFormValues,
  type DemoExpenseFormErrors,
  type DemoExpenseFormValues,
} from "@/lib/demo/demo-expense-form";
import {
  createDemoExpense,
  deleteDemoExpense,
  updateDemoExpense,
} from "@/lib/demo/demo-expense-mutations";
import {
  expenseCategories,
  expenseCategoryLabels,
} from "@/types/expense-category";

type DemoExpenseFormSheetProps = {
  mode: "create" | "edit";
  expenseId?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DemoExpenseFormSheet({
  mode,
  expenseId,
  open,
  onOpenChange,
}: DemoExpenseFormSheetProps) {
  const title = mode === "create" ? "Add new expense" : "Edit expense";
  const description =
    mode === "create" ? "Create a demo expense." : "Update this demo expense.";
  const formKey = `${mode}:${expenseId ?? "new"}`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-hidden data-[side=right]:w-full data-[side=right]:sm:w-2xl data-[side=right]:sm:max-w-none">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <DemoExpenseFormContent
          key={formKey}
          mode={mode}
          expenseId={expenseId}
          onOpenChange={onOpenChange}
        />
      </SheetContent>
    </Sheet>
  );
}

function DemoExpenseFormContent({
  mode,
  expenseId,
  onOpenChange,
}: Pick<DemoExpenseFormSheetProps, "mode" | "expenseId" | "onOpenChange">) {
  const { demoData, setDemoData } = useDemoData();
  const [values, setValues] = useState<DemoExpenseFormValues>(() => {
    if (mode === "edit" && expenseId) {
      return (
        getDemoExpenseFormValues(demoData, expenseId) ??
        getDefaultDemoExpenseFormValues()
      );
    }
    return getDefaultDemoExpenseFormValues();
  });
  const [errors, setErrors] = useState<DemoExpenseFormErrors>({});
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  function updateValue<Key extends keyof DemoExpenseFormValues>(
    key: Key,
    value: DemoExpenseFormValues[Key],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result =
      mode === "edit" && expenseId
        ? updateDemoExpense(demoData, expenseId, values)
        : createDemoExpense(demoData, values);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setDemoData(result.data);
    onOpenChange(false);
  }

  function handleDelete() {
    if (mode !== "edit" || !expenseId) {
      return;
    }

    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      return;
    }

    setDemoData((currentData) => {
      return deleteDemoExpense(currentData, expenseId);
    });
    onOpenChange(false);
  }

  function handleFormClick(event: MouseEvent<HTMLFormElement>) {
    if (!isConfirmingDelete) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest("[data-delete-expense-button]")) {
      return;
    }

    setIsConfirmingDelete(false);
  }

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onClick={handleFormClick}
      onSubmit={handleSubmit}
    >
      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
        <div className="grid gap-x-5 gap-y-4 rounded-lg border border-border/70 p-4">
          <div className="space-y-2">
            <Label htmlFor="expense-date">Date</Label>
            <Input
              id="expense-date"
              type="date"
              value={values.date}
              onChange={(event) => {
                updateValue("date", event.target.value);
              }}
            />
            <DemoFieldError message={errors.date} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-category">Category</Label>
            <Select
              value={values.category}
              name="category"
              onValueChange={(value) => {
                updateValue("category", value);
              }}
            >
              <SelectTrigger id="expense-category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {expenseCategoryLabels[category]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DemoFieldError message={errors.category} />
          </div>

          {values.category === "other" && (
            <div className="space-y-2">
              <Label htmlFor="expense-custom-category">Custom category</Label>

              <Input
                id="expense-custom-category"
                name="customCategoryName"
                value={values.customCategoryName}
                onChange={(event) => {
                  updateValue("customCategoryName", event.target.value);
                }}
                placeholder="Example: Platform supplies"
              />

              <DemoFieldError message={errors.customCategoryName} />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="expense-amount">Amount</Label>
            <Input
              id="expense-amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={values.amount}
              onChange={(event) => {
                updateValue("amount", event.target.value);
              }}
            />
            <DemoFieldError message={errors.amount} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-description">Description</Label>
            <Textarea
              id="expense-description"
              value={values.description}
              placeholder="Optional"
              onChange={(event) => {
                updateValue("description", event.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <DemoFormSheetFooter
        mode={mode}
        submitLabel={mode === "create" ? "Add expense" : "Save changes"}
        deleteLabel="Delete expense"
        isConfirmingDelete={isConfirmingDelete}
        deleteButtonClassName="sm:mr-auto"
        deleteButtonDataAttribute="data-delete-expense-button"
        onCancel={() => {
          onOpenChange(false);
        }}
        onDelete={handleDelete}
      />
    </form>
  );
}
