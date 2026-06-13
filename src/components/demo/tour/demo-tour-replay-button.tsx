"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useDemoTour } from "./demo-tour-provider";

export function DemoTourReplayButton() {
  const router = useRouter();
  const { resetTourSeen } = useDemoTour();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => {
        resetTourSeen();
        router.push("/demo?tour=1");
      }}
      className="gap-2 whitespace-nowrap"
    >
      Replay guided tour
    </Button>
  );
}
