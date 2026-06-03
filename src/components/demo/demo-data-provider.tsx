"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  clearDemoDataFromSessionStorage,
  readDemoDataFromSessionStorage,
  writeDemoDataToSessionStorage,
} from "@/lib/demo/demo-session-storage";
import type { DemoData } from "@/types/domain";

type DemoDataUpdater = DemoData | ((currentData: DemoData) => DemoData);

type DemoDataContextValue = {
  demoData: DemoData;
  isDemoDataReady: boolean;
  setDemoData: (nextData: DemoDataUpdater) => void;
  resetDemoData: () => void;
};

type DemoDataStore = {
  getSnapshot: () => DemoData;
  getServerSnapshot: () => DemoData;
  subscribe: (listener: () => void) => () => void;
  initializeStorage: () => void;
  setDemoData: (nextData: DemoDataUpdater) => void;
  resetDemoData: () => void;
};

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

type DemoDataProviderProps = {
  initialData: DemoData;
  children: ReactNode;
};

function createDemoDataStore(initialData: DemoData): DemoDataStore {
  const listeners = new Set<() => void>();

  let currentData = initialData;
  let hasLoadedSessionStorageData = false;

  function loadSessionStorageData() {
    if (hasLoadedSessionStorageData) {
      return;
    }

    hasLoadedSessionStorageData = true;

    const storedData = readDemoDataFromSessionStorage();

    if (storedData) {
      currentData = storedData;
    }
  }

  function emitChange() {
    listeners.forEach((listener) => {
      listener();
    });
  }

  return {
    getSnapshot() {
      loadSessionStorageData();
      return currentData;
    },

    getServerSnapshot() {
      return initialData;
    },

    subscribe(listener) {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },

    initializeStorage() {
      loadSessionStorageData();

      const storedData = readDemoDataFromSessionStorage();

      if (!storedData) {
        writeDemoDataToSessionStorage(currentData);
      }
    },

    setDemoData(nextData) {
      loadSessionStorageData();

      const resolvedData =
        typeof nextData === "function" ? nextData(currentData) : nextData;

      currentData = resolvedData;

      writeDemoDataToSessionStorage(resolvedData);
      emitChange();
    },

    resetDemoData() {
      currentData = initialData;
      hasLoadedSessionStorageData = true;

      clearDemoDataFromSessionStorage();
      writeDemoDataToSessionStorage(currentData);

      emitChange();
    },
  };
}

export function DemoDataProvider({
  initialData,
  children,
}: DemoDataProviderProps) {
  const demoDataStore = useMemo(() => {
    return createDemoDataStore(initialData);
  }, [initialData]);

  useEffect(() => {
    demoDataStore.initializeStorage();
  }, [demoDataStore]);

  const demoData = useSyncExternalStore(
    demoDataStore.subscribe,
    demoDataStore.getSnapshot,
    demoDataStore.getServerSnapshot,
  );

  const value = useMemo(
    () => ({
      demoData,
      isDemoDataReady: true,
      setDemoData: demoDataStore.setDemoData,
      resetDemoData: demoDataStore.resetDemoData,
    }),
    [demoData, demoDataStore],
  );

  return (
    <DemoDataContext.Provider value={value}>
      {children}
    </DemoDataContext.Provider>
  );
}

export function useDemoData() {
  const context = useContext(DemoDataContext);

  if (!context) {
    throw new Error(
      "useDemoData must be used within a DemoDataProvider component",
    );
  }

  return context;
}
