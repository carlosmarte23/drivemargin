import { DemoRecordCreateAction } from "@/components/demo/demo-record-create-action";
import { DemoSessionFormSheet } from "@/components/demo/sessions/demo-session-form-sheet";

export function DemoSessionCreateAction() {
  return (
    <DemoRecordCreateAction
      label="Add session"
      renderSheet={({ open, onOpenChange }) => (
        <DemoSessionFormSheet
          mode="create"
          open={open}
          onOpenChange={onOpenChange}
        />
      )}
    />
  );
}
