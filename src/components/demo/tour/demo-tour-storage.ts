export const DEMO_TOUR_STORAGE_KEY = "drivemargin:demo-tour:v1";
const DEMO_TOUR_SEEN_VALUE = "seen";

export type DemoTourStorage = Pick<
  Storage,
  "getItem" | "setItem" | "removeItem"
>;

function getBrowserStorage(): DemoTourStorage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

export function hasSeenDemoTour(storage = getBrowserStorage()): boolean {
  return storage?.getItem(DEMO_TOUR_STORAGE_KEY) === DEMO_TOUR_SEEN_VALUE;
}

export function markDemoTourSeen(storage = getBrowserStorage()): void {
  storage?.setItem(DEMO_TOUR_STORAGE_KEY, DEMO_TOUR_SEEN_VALUE);
}

export function resetDemoTourSeen(storage = getBrowserStorage()): void {
  storage?.removeItem(DEMO_TOUR_STORAGE_KEY);
}
