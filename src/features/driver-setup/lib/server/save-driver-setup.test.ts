import { afterEach, describe, expect, test, vi } from "vitest";

import { saveDriverSetupForUser } from "./save-driver-setup";

const dbMock = vi.hoisted(() => {
  type Operation = {
    tableName: string;
    values: unknown;
    conflict: unknown;
  };

  type MockTx = {
    insert: ReturnType<typeof vi.fn>;
  };

  const operations: Operation[] = [];

  const tx: MockTx = {
    insert: vi.fn((table: { [key: symbol]: { name?: string } }) => {
      const tableName = table[Symbol.for("drizzle:Name")]?.name ?? "unknown";
      const operation: Operation = {
        tableName,
        values: null,
        conflict: null,
      };

      operations.push(operation);

      return {
        values: vi.fn((values: unknown) => {
          operation.values = values;

          return {
            onConflictDoUpdate: vi.fn((conflict: unknown) => {
              operation.conflict = conflict;
            }),
          };
        }),
      };
    }),
  };

  return {
    operations,
    transaction: vi.fn(async (callback: (tx: MockTx) => Promise<void>) => {
      await callback(tx);
    }),
    tx,
  };
});

vi.mock("server-only", () => ({}));

vi.mock("@/db", () => ({
  db: {
    transaction: dbMock.transaction,
  },
}));

describe("saveDriverSetupForUser", () => {
  const now = new Date("2026-06-21T15:00:00.000Z");

  afterEach(() => {
    dbMock.operations.length = 0;
    dbMock.transaction.mockClear();
    dbMock.tx.insert.mockClear();
    vi.useRealTimers();
  });

  test("keeps onboarding completion controlled by markOnboardingComplete", async () => {
    vi.setSystemTime(now);

    await saveDriverSetupForUser({
      userId: "user-1",
      markOnboardingComplete: true,
      data: {
        displayName: "Alex",
        vehicleName: "Prius",
        estimatedMpg: 42,
        defaultMileageEntryMode: "manual",
        targetNetCentsPerHour: 2500,
        targetNetCentsPerMile: 150,
      },
    });

    expect(dbMock.operations[0]?.values).toMatchObject({
      userId: "user-1",
      displayName: "Alex",
      onboardingCompleted: true,
    });

    expect(dbMock.operations[0]?.conflict).toMatchObject({
      set: {
        displayName: "Alex",
        onboardingCompleted: true,
        updatedAt: now,
      },
    });
  });

  test("persists editable settings fields without forcing onboarding complete", async () => {
    vi.setSystemTime(now);

    // Refactor guide:
    // Keep this saver as the single transaction boundary for profile, default
    // vehicle, and user settings. Add a settings-oriented input shape that can
    // carry theme and IRS rate, then make the onboarding action call it with
    // defaults instead of duplicating another transaction elsewhere.
    await saveDriverSetupForUser({
      userId: "user-1",
      markOnboardingComplete: false,
      data: {
        displayName: "Alex",
        vehicleName: "Prius",
        estimatedMpg: 42,
        defaultMileageEntryMode: "odometer",
        targetNetCentsPerHour: 2600,
        targetNetCentsPerMile: 175,
        theme: "dark",
        irsMileageDeductionRateCents: 67,
      },
    });

    expect(dbMock.operations[0]?.conflict).toMatchObject({
      set: {
        displayName: "Alex",
        updatedAt: now,
      },
    });

    expect(dbMock.operations[2]?.values).toMatchObject({
      userId: "user-1",
      targetNetCentsPerHour: 2600,
      targetNetCentsPerMile: 175,
      theme: "dark",
      language: "en",
      irsMileageDeductionRateCents: 67,
    });

    expect(dbMock.operations[2]?.conflict).toMatchObject({
      set: {
        targetNetCentsPerHour: 2600,
        targetNetCentsPerMile: 175,
        theme: "dark",
        irsMileageDeductionRateCents: 67,
        updatedAt: now,
      },
    });
  });
});
