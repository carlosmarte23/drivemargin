"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { EVENTS, useJoyride } from "react-joyride";

import { demoTourSteps } from "@/components/demo/tour/demo-tour-steps";

type DemoTourRuntimeProps = {
  runId: number;
  onTourEnd: () => void;
};

export function DemoTourRuntime({ runId, onTourEnd }: DemoTourRuntimeProps) {
  const router = useRouter();

  const { controls, on, Tour } = useJoyride({
    continuous: true,
    scrollToFirstStep: true,
    steps: demoTourSteps,
    locale: {
      back: "Back",
      close: "Close",
      last: "Done",
      next: "Next",
      nextWithProgress: "Next ({current} of {total})",
      skip: "Skip",
    },
    options: {
      backgroundColor: "var(--popover)",
      arrowColor: "var(--popover)",
      overlayColor: "oklch(0 0 0 / 0.55)",
      primaryColor: "var(--primary)",
      textColor: "var(--popover-foreground)",
      showProgress: true,
      skipBeacon: true,
      scrollOffset: 88,
      targetWaitTimeout: 2500,
      width: 380,
      zIndex: 80,
    },
    styles: {
      tooltip: {
        borderRadius: 12,
        boxShadow: "0 20px 60px oklch(0 0 0 / 0.28)",
        padding: "16px",
      },
      tooltipTitle: {
        color: "var(--popover-foreground)",
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.35,
        textAlign: "left",
      },
      tooltipContent: {
        color: "var(--muted-foreground)",
        fontSize: 14,
        lineHeight: 1.5,
        paddingBottom: 12,
        paddingTop: 8,
        textAlign: "left",
      },
      buttonPrimary: {
        backgroundColor: "var(--primary)",
        borderRadius: 8,
        color: "var(--primary-foreground)",
        fontWeight: 600,
      },
      buttonBack: {
        color: "var(--primary)",
      },
      buttonClose: {
        color: "var(--muted-foreground)",
      },
    },
  });

  useEffect(() => {
    if (runId === 0) {
      return;
    }
    controls.start(0);
  }, [controls, runId]);

  useEffect(() => {
    return on(EVENTS.TOUR_END, () => {
      onTourEnd();

      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        router.replace("/demo", { scroll: false });
      }, 150);
    });
  }, [on, onTourEnd, router]);

  return Tour;
}
