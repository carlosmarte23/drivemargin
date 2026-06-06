"use client";

import { useState } from "react";

import { DemoFloatingActionButton } from "@/components/demo/demo-floating-action-button";
import { DemoSessionFormSheet } from "@/components/demo/sessions/demo-session-form-sheet";

export function DemoSessionCreateAction() {
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  return (
    <>
      <DemoFloatingActionButton
        label="Add session"
        onClick={() => setIsCreatingSession(true)}
      />

      <DemoSessionFormSheet
        mode="create"
        open={isCreatingSession}
        onOpenChange={setIsCreatingSession}
      />
    </>
  );
}
