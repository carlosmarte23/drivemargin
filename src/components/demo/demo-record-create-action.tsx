"use client";

import { useState, type ReactNode } from "react";

import { DemoFloatingActionButton } from "@/components/demo/demo-floating-action-button";

type DemoRecordCreateActionProps = {
  label: string;
  renderSheet: (props: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => ReactNode;
};

export function DemoRecordCreateAction({
  label,
  renderSheet,
}: DemoRecordCreateActionProps) {
  const [isCreatingRecord, setIsCreatingRecord] = useState(false);

  return (
    <>
      <DemoFloatingActionButton
        label={label}
        onClick={() => {
          setIsCreatingRecord(true);
        }}
      />

      {renderSheet({
        open: isCreatingRecord,
        onOpenChange: setIsCreatingRecord,
      })}
    </>
  );
}
