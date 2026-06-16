import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SessionSummary } from "@/lib/calculations/sessionSummary";

import { SessionSummaryDialogActions } from "./session-summary-dialog/session-summary-dialog-actions";
import { SessionSummaryDialogBody } from "./session-summary-dialog/session-summary-dialog-body";
import type { SessionSummaryDialogMode } from "./session-summary-dialog/types";

type SessionSummaryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary: SessionSummary | null;
  mode: SessionSummaryDialogMode;
  onAddAnother?: () => void;
  onGoToDashboard?: () => void;
  onViewSessions?: () => void;
};

export function SessionSummaryDialog({
  open,
  onOpenChange,
  summary,
  mode,
  onAddAnother,
  onGoToDashboard,
  onViewSessions,
}: SessionSummaryDialogProps) {
  if (!summary) {
    return null;
  }

  const title = mode === "created" ? "Session logged" : "Session summary";
  const description =
    mode === "created"
      ? "Here’s how this shift performed after estimated fuel."
      : "Profitability estimate for this work session.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] max-w-3xl grid-rows-none flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="shrink-0 border-b px-6 py-3 pr-12">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <SessionSummaryDialogBody summary={summary} mode={mode} />

        <DialogFooter className="shrink-0 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-end">
          <SessionSummaryDialogActions
            mode={mode}
            onAddAnother={onAddAnother}
            onGoToDashboard={onGoToDashboard}
            onViewSessions={onViewSessions}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
