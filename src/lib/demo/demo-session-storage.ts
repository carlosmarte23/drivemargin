import {
  DEMO_DATA_STORAGE_VERSION,
  storedDemoDataSchema,
} from "@/lib/demo/demo-data-schema";
import type { DemoData } from "@/types/domain";

const DEMO_DATA_STORAGE_KEY = `drivemargin:demo-data:v${DEMO_DATA_STORAGE_VERSION}`;

function canUseSessionStorage() {
  return (
    typeof window !== "undefined" &&
    typeof window.sessionStorage !== "undefined"
  );
}

export function readDemoDataFromSessionStorage(): DemoData | null {
  if (!canUseSessionStorage()) {
    return null;
  }

  try {
    const rawValue = window.sessionStorage.getItem(DEMO_DATA_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    const result = storedDemoDataSchema.safeParse(parsedValue);

    if (!result.success) {
      window.sessionStorage.removeItem(DEMO_DATA_STORAGE_KEY);
      return null;
    }

    return result.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function writeDemoDataToSessionStorage(data: DemoData): boolean {
  if (!canUseSessionStorage()) {
    return false;
  }

  try {
    window.sessionStorage.setItem(
      DEMO_DATA_STORAGE_KEY,
      JSON.stringify({
        version: DEMO_DATA_STORAGE_VERSION,
        savedAt: new Date().toISOString(),
        data,
      }),
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function clearDemoDataFromSessionStorage(): boolean {
  if (!canUseSessionStorage()) {
    return false;
  }

  try {
    window.sessionStorage.removeItem(DEMO_DATA_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
