import { Button } from "@/components/ui/button";

import type { SessionSummaryDialogMode } from "./types";

type SessionSummaryDialogActionsProps = {
  mode: SessionSummaryDialogMode;
  onAddAnother?: () => void;
  onGoToDashboard?: () => void;
  onViewSessions?: () => void;
};

export function SessionSummaryDialogActions({
  mode,
  onAddAnother,
  onGoToDashboard,
  onViewSessions,
}: SessionSummaryDialogActionsProps) {
  return (
    <>
      {mode === "created" && onAddAnother ? (
        <Button type="button" onClick={onAddAnother}>
          Add another session
        </Button>
      ) : null}

      {onGoToDashboard ? (
        <Button type="button" onClick={onGoToDashboard}>
          Go to dashboard
        </Button>
      ) : null}

      {onViewSessions ? (
        <Button type="button" variant="outline" onClick={onViewSessions}>
          {mode === "view" ? "Go back" : "View all sessions"}
        </Button>
      ) : null}
    </>
  );
}
