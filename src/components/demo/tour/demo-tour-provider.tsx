"use client";

import dynamic from "next/dynamic";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  hasSeenDemoTour,
  markDemoTourSeen,
  resetDemoTourSeen,
} from "@/components/demo/tour/demo-tour-storage";

const DemoTourRuntime = dynamic(
  () =>
    import("@/components/demo/tour/demo-tour-runtime").then(
      (mod) => mod.DemoTourRuntime,
    ),
  { ssr: false },
);

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
  const [hasSeenTour, setHasSeenTour] = useState(hasSeenDemoTour());
  const [isTourRuntimeMounted, setIsTourRuntimeMounted] = useState(false);
  const [tourRunId, setTourRunId] = useState(0);

  const startTour = useCallback(() => {
    setIsTourRuntimeMounted(true);
    setTourRunId((current) => current + 1);
  }, []);

  const handleTourEnd = useCallback(() => {
    markDemoTourSeen();
    setHasSeenTour(true);
  }, []);

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
      {isTourRuntimeMounted ? (
        <DemoTourRuntime runId={tourRunId} onTourEnd={handleTourEnd} />
      ) : null}
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
