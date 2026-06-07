import { DemoRecordCreateAction } from "@/components/demo/demo-record-create-action";
import { DemoFuelFormSheet } from "@/components/demo/fuel/demo-fuel-form-sheet";

export function DemoFuelCreateAction() {
  return (
    <DemoRecordCreateAction
      label="Add fuel purchase"
      renderSheet={({ open, onOpenChange }) => (
        <DemoFuelFormSheet
          mode="create"
          open={open}
          onOpenChange={onOpenChange}
        />
      )}
    />
  );
}
