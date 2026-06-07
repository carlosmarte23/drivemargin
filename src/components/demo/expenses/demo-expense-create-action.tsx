import { DemoRecordCreateAction } from "@/components/demo/demo-record-create-action";
import { DemoExpenseFormSheet } from "@/components/demo/expenses/demo-expense-form-sheet";

export function DemoExpenseCreateAction() {
  return (
    <DemoRecordCreateAction
      label="Add expense"
      renderSheet={({ open, onOpenChange }) => (
        <DemoExpenseFormSheet
          mode="create"
          open={open}
          onOpenChange={onOpenChange}
        />
      )}
    />
  );
}
