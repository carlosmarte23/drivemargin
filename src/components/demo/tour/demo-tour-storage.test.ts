import { beforeEach, describe, expect, it } from "vitest";

import {
  DEMO_TOUR_STORAGE_KEY,
  hasSeenDemoTour,
  markDemoTourSeen,
  resetDemoTourSeen,
  type DemoTourStorage,
} from "./demo-tour-storage";

function createStorage(): DemoTourStorage {
  const values = new Map<string, string>();

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
    removeItem: (key) => {
      values.delete(key);
    },
  };
}

describe("demo tour storage", () => {
  let storage: DemoTourStorage;

  beforeEach(() => {
    storage = createStorage();
  });

  it("starts unseen", () => {
    expect(hasSeenDemoTour(storage)).toBe(false);
  });

  it("marks the tour as seen", () => {
    markDemoTourSeen(storage);

    expect(storage.getItem(DEMO_TOUR_STORAGE_KEY)).toBe("seen");
    expect(hasSeenDemoTour(storage)).toBe(true);
  });

  it("resets the tour marker", () => {
    markDemoTourSeen(storage);
    resetDemoTourSeen(storage);

    expect(hasSeenDemoTour(storage)).toBe(false);
  });
});
