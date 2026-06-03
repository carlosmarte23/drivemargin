"use client";

import { RotateCcw } from "lucide-react";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { Button } from "@/components/ui/button";

export function DemoResetButton() {
  const { resetDemoData } = useDemoData();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label="Reset demo data"
      className="gap-2 whitespace-nowrap"
      onClick={() => {
        resetDemoData();
      }}
    >
      <RotateCcw aria-hidden="true" className="size-4" />
      Reset demo data
    </Button>
  );
}
