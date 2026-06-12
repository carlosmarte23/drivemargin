import { useRouter } from "next/navigation";

import { useState } from "react";

import { DemoFloatingActionButton } from "@/components/demo/demo-floating-action-button";
import { DemoSessionFormSheet } from "@/components/demo/sessions/demo-session-form-sheet";
import type { SessionSummary } from "@/lib/calculations/sessionSummary";

import { SessionSummaryDialog } from "./session-summary-dialog";

export function DemoSessionCreateAction() {
  const router = useRouter();
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [createdSummary, setCreatedSummary] = useState<SessionSummary | null>(
    null,
  );

  function handleAddAnother() {
    setCreatedSummary(null);
    setIsCreateSheetOpen(true);
  }

  return (
    <>
      <DemoFloatingActionButton
        label="Add session"
        onClick={() => {
          setIsCreateSheetOpen(true);
        }}
      />

      <DemoSessionFormSheet
        mode="create"
        open={isCreateSheetOpen}
        onOpenChange={setIsCreateSheetOpen}
        onCreateSuccess={(summary) => {
          setCreatedSummary(summary);
          setIsCreateSheetOpen(false);
        }}
      />

      {createdSummary && (
        <SessionSummaryDialog
          open={createdSummary !== null}
          onOpenChange={(open) => {
            if (!open) {
              setCreatedSummary(null);
            }
          }}
          summary={createdSummary}
          mode="created"
          onAddAnother={handleAddAnother}
          onGoToDashboard={() => {
            setCreatedSummary(null);
            router.push("/demo");
          }}
          onViewSessions={() => {
            setCreatedSummary(null);
            router.push("/demo/sessions?period=all");
          }}
        />
      )}
    </>
  );
}
