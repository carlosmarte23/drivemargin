"use client";

import { Map } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDemoTour } from "./demo-tour-provider";

export function DemoTourLaunchButton() {
  const { hasSeenTour, startTour } = useDemoTour();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={startTour}
      className="gap-2 whitespace-nowrap"
    >
      <Map aria-hidden="true" className="size-4" />
      {hasSeenTour ? "Restart tour" : "Start tour"}
    </Button>
  );
}
