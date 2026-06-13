"use client";

import { useRouter } from "next/navigation";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { EVENTS, useJoyride } from "react-joyride";

import { demoTourSteps } from "@/components/demo/tour/demo-tour-steps";
import {
  hasSeenDemoTour,
  markDemoTourSeen,
  resetDemoTourSeen,
} from "@/components/demo/tour/demo-tour-storage";

type DemoTourContextValue = {
  hasSeenTour: boolean;
  startTour: () => void;
  resetTourSeen: () => void;
};

const DemoTourContext = createContext<DemoTourContextValue | null>(null);

type DemoTourProviderProps = {
  children: ReactNode;
};

export function DemoTourProvider({ children }: DemoTourProviderProps) {
  const [hasSeenTour, setHasSeenTour] = useState(() => {
    return hasSeenDemoTour();
  });
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

  const startTour = useCallback(() => {
    controls.start(0);
  }, [controls]);

  useEffect(() => {
    return on(EVENTS.TOUR_END, () => {
      markDemoTourSeen();
      setHasSeenTour(true);

      window.setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        router.replace("/demo", { scroll: false });
      }, 150);
    });
  }, [on, router]);

  const resetTourSeen = useCallback(() => {
    resetDemoTourSeen();
    setHasSeenTour(false);
  }, []);

  const value = useMemo(
    () => ({
      hasSeenTour,
      startTour,
      resetTourSeen,
    }),
    [hasSeenTour, resetTourSeen, startTour],
  );

  return (
    <DemoTourContext.Provider value={value}>
      {children}
      {Tour}
    </DemoTourContext.Provider>
  );
}

export function useDemoTour() {
  const context = useContext(DemoTourContext);

  if (!context) {
    throw new Error("useDemoTour must be used within a DemoTourProvider");
  }

  return context;
}
