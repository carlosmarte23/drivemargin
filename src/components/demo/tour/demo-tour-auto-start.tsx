"use client";

import { useEffect, useRef } from "react";

import { useDemoTour } from "@/components/demo/tour/demo-tour-provider";
import { hasSeenDemoTour } from "@/components/demo/tour/demo-tour-storage";

export function DemoTourAutoStart() {
  const hasStartedTour = useRef(false);
  const { startTour } = useDemoTour();

  useEffect(() => {
    if (hasStartedTour.current) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const shouldStartFromQuery = searchParams.get("tour") === "1";
    const shouldStartFirstVisit = !hasSeenDemoTour();

    if (!shouldStartFromQuery && !shouldStartFirstVisit) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (hasStartedTour.current) {
        return;
      }

      hasStartedTour.current = true;
      startTour();
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [startTour]);

  return null;
}
