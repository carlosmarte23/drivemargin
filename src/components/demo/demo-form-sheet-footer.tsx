import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type DemoFormSheetFooterProps = {
  mode: "create" | "edit";
  submitLabel: string;
  onCancel: () => void;
  onDelete?: () => void;
  deleteLabel?: string;
  confirmDeleteLabel?: string;
  isConfirmingDelete?: boolean;
  deleteButtonClassName?: string;
  deleteButtonDataAttribute?: string;
};

export function DemoFormSheetFooter({
  mode,
  submitLabel,
  onCancel,
  onDelete,
  deleteLabel = "Delete",
  confirmDeleteLabel = "Confirm delete",
  isConfirmingDelete = false,
  deleteButtonClassName,
  deleteButtonDataAttribute,
}: DemoFormSheetFooterProps) {
  const deleteButtonDataAttributes = deleteButtonDataAttribute
    ? { [deleteButtonDataAttribute]: true }
    : {};

  return (
    <SheetFooter className="gap-2 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
      {mode === "edit" && onDelete ? (
        <Button
          type="button"
          variant={isConfirmingDelete ? "destructive" : "outline"}
          className={cn(deleteButtonClassName)}
          onClick={onDelete}
          {...deleteButtonDataAttributes}
        >
          <Trash2 aria-hidden="true" className="size-4" />
          {isConfirmingDelete ? confirmDeleteLabel : deleteLabel}
        </Button>
      ) : null}

      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">{submitLabel}</Button>
    </SheetFooter>
  );
}
