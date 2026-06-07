import { afterEach, describe, expect, it, vi } from "vitest";

import { generateDemoData } from "@/data/demo/generateDemoData";
import {
  clearDemoDataFromSessionStorage,
  readDemoDataFromSessionStorage,
  writeDemoDataToSessionStorage,
} from "@/lib/demo/demo-session-storage";

class FakeSessionStorage implements Pick<
  Storage,
  "getItem" | "setItem" | "removeItem"
> {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  getStoredKey() {
    return Array.from(this.values.keys())[0] ?? null;
  }

  setRawValue(key: string, value: string) {
    this.values.set(key, value);
  }
}

function stubSessionStorage(sessionStorage: FakeSessionStorage) {
  vi.stubGlobal("window", {
    sessionStorage,
  });
}

describe("demo session storage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns null when sessionStorage is not available", () => {
    expect(readDemoDataFromSessionStorage()).toBeNull();
    expect(writeDemoDataToSessionStorage(generateDemoData())).toBe(false);
    expect(clearDemoDataFromSessionStorage()).toBe(false);
  });

  it("writes and reads demo data from sessionStorage", () => {
    const sessionStorage = new FakeSessionStorage();
    const data = generateDemoData(new Date("2026-05-29T12:00:00.000Z"));

    stubSessionStorage(sessionStorage);

    expect(writeDemoDataToSessionStorage(data)).toBe(true);

    const storedData = readDemoDataFromSessionStorage();

    expect(storedData).toEqual(data);
  });

  it("clears stored demo data", () => {
    const sessionStorage = new FakeSessionStorage();
    const data = generateDemoData(new Date("2026-05-29T12:00:00.000Z"));

    stubSessionStorage(sessionStorage);

    writeDemoDataToSessionStorage(data);

    expect(readDemoDataFromSessionStorage()).toEqual(data);
    expect(clearDemoDataFromSessionStorage()).toBe(true);
    expect(readDemoDataFromSessionStorage()).toBeNull();
  });

  it("returns null and removes invalid stored demo data", () => {
    const sessionStorage = new FakeSessionStorage();

    stubSessionStorage(sessionStorage);

    writeDemoDataToSessionStorage(generateDemoData());

    const storedKey = sessionStorage.getStoredKey();

    expect(storedKey).not.toBeNull();

    sessionStorage.setRawValue(storedKey!, JSON.stringify({ invalid: true }));

    expect(readDemoDataFromSessionStorage()).toBeNull();
    expect(sessionStorage.getItem(storedKey!)).toBeNull();
  });

  it("returns false when sessionStorage write fails", () => {
    const data = generateDemoData();

    vi.stubGlobal("window", {
      sessionStorage: {
        setItem() {
          throw new Error("Storage is unavailable");
        },
      },
    });

    expect(writeDemoDataToSessionStorage(data)).toBe(false);
  });
});
