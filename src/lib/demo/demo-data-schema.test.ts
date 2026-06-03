import { describe, expect, it } from "vitest";

import { generateDemoData } from "@/data/demo/generateDemoData";

import { demoDataSchema, storedDemoDataSchema } from "./demo-data-schema";

describe("demo data schema", () => {
  it("accepts generated demo data", () => {
    const data = generateDemoData(new Date("2026-05-29T12:00:00.000Z"));

    const result = demoDataSchema.safeParse(data);

    expect(result.success).toBe(true);
  });

  it("rejects invalid demo data", () => {
    const result = demoDataSchema.safeParse({
      vehicles: [],
      workApps: [],
      sessions: "not-an-array",
      sessionAppEarnings: [],
      fuelPurchases: [],
      expenses: [],
      settings: {},
    });

    expect(result.success).toBe(false);
  });

  it("accepts stored demo data with the current storage version", () => {
    const data = generateDemoData(new Date("2026-05-29T12:00:00.000Z"));

    const result = storedDemoDataSchema.safeParse({
      version: 1,
      savedAt: "2026-05-29T12:00:00.000Z",
      data,
    });

    expect(result.success).toBe(true);
  });

  it("rejects stored demo data with an unsupported version", () => {
    const data = generateDemoData(new Date("2026-05-29T12:00:00.000Z"));

    const result = storedDemoDataSchema.safeParse({
      version: 999,
      savedAt: "2026-05-29T12:00:00.000Z",
      data,
    });

    expect(result.success).toBe(false);
  });

  it("accepts generated demo data after JSON serialization", () => {
    const data = generateDemoData(new Date("2026-05-29T12:00:00.000Z"));

    const parsedValue: unknown = JSON.parse(
      JSON.stringify({
        version: 1,
        savedAt: "2026-05-29T12:00:00.000Z",
        data,
      }),
    );

    const result = storedDemoDataSchema.safeParse(parsedValue);

    if (!result.success) {
      console.dir(result.error.format(), { depth: null });
    }

    expect(result.success).toBe(true);
  });
});
