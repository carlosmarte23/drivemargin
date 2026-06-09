"use client";

import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { Button } from "@/components/ui/button";

export function DemoResetButton() {
  const { resetDemoData } = useDemoData();

  const handleClick = () => {
    resetDemoData();
    toast.success("Demo data has been reset.", { position: "top-center" });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label="Reset demo data"
      className="gap-2 whitespace-nowrap"
      onClick={() => {
        handleClick();
      }}
    >
      <RotateCcw aria-hidden="true" className="size-4" />
      Reset demo data
    </Button>
  );
}
