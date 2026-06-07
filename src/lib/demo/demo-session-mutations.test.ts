import { describe, expect, test } from "vitest";

import { generateDemoData } from "@/data/demo/generateDemoData";
import type { DemoSessionFormValues } from "@/lib/demo/demo-session-form";
import {
  createDemoSession,
  deleteDemoSession,
  updateDemoSession,
} from "@/lib/demo/demo-session-mutations";
import type { DemoData } from "@/types/domain";

const referenceDate = new Date("2026-06-04T12:00:00.000Z");

function buildData(): DemoData {
  return generateDemoData(referenceDate);
}

function buildValidValues(data: DemoData): DemoSessionFormValues {
  return {
    date: "2026-06-04",
    startTime: "09:15",
    endTime: "12:45",
    vehicleId: data.vehicles[0]!.id,
    mileageEntryMode: "manual",
    totalMiles: "42.5",
    startOdometer: "",
    endOdometer: "",
    appEarnings: [
      {
        id: "row-1",
        workAppId: data.workApps[0]!.id,
        amount: "72.85",
      },
      {
        id: "row-2",
        workAppId: data.workApps[1]!.id,
        amount: "34.60",
      },
    ],
    notes: "Airport and lunch shift",
  };
}

function createSession(
  data: DemoData,
  values: DemoSessionFormValues,
  sessionId: string,
) {
  const result = createDemoSession(data, values, {
    sessionId,
    earningIdFactory: (index) => `${sessionId}-earning-${index + 1}`,
  });

  expect(result.success).toBe(true);

  if (!result.success) {
    throw new Error("Expected demo session creation to succeed.");
  }

  return {
    data: result.data,
    session: findSession(result.data, sessionId),
  };
}

function findSession(data: DemoData, sessionId: string) {
  return data.sessions.find((item) => {
    return item.id === sessionId;
  });
}

describe("demo session mutations", () => {
  test("createDemoSession adds a session and its app earnings", () => {
    const data = buildData();
    const values = buildValidValues(data);

    const result = createSession(data, values, "demo-session-new");

    expect(result.session).toMatchObject({
      id: "demo-session-new",
      date: "2026-06-04",
      vehicleId: values.vehicleId,
      mileageEntryMode: "manual",
      totalMiles: 42.5,
      notes: "Airport and lunch shift",
    });
    expect(result.session?.startedAt).toContain("T");
    expect(result.session?.endedAt).toContain("T");
    expect(new Date(result.session!.endedAt).getTime()).toBeGreaterThan(
      new Date(result.session!.startedAt).getTime(),
    );

    const earnings = result.data.sessionAppEarnings.filter((earning) => {
      return earning.sessionId === "demo-session-new";
    });

    expect(earnings).toEqual([
      {
        id: "demo-session-new-earning-1",
        sessionId: "demo-session-new",
        workAppId: data.workApps[0]!.id,
        amountCents: 7285,
      },
      {
        id: "demo-session-new-earning-2",
        sessionId: "demo-session-new",
        workAppId: data.workApps[1]!.id,
        amountCents: 3460,
      },
    ]);
  });

  test("updateDemoSession replaces a session and its old earnings", () => {
    const data = buildData();
    const existingSession = data.sessions[0]!;
    const values: DemoSessionFormValues = {
      ...buildValidValues(data),
      totalMiles: "18",
      appEarnings: [
        {
          id: "row-1",
          workAppId: data.workApps[2]!.id,
          amount: "51.25",
        },
      ],
      notes: "Edited session",
    };

    const result = updateDemoSession(data, existingSession.id, values, {
      earningIdFactory: (index) => {
        return `${existingSession.id}-edited-${index + 1}`;
      },
    });

    expect(result.success).toBe(true);

    if (!result.success) return;

    const session = result.data.sessions.find((item) => {
      return item.id === existingSession.id;
    });

    expect(session).toMatchObject({
      id: existingSession.id,
      totalMiles: 18,
      notes: "Edited session",
    });

    const earnings = result.data.sessionAppEarnings.filter((earning) => {
      return earning.sessionId === existingSession.id;
    });

    expect(earnings).toEqual([
      {
        id: `${existingSession.id}-edited-1`,
        sessionId: existingSession.id,
        workAppId: data.workApps[2]!.id,
        amountCents: 5125,
      },
    ]);
  });

  test("deleteDemoSession removes the session and related earnings", () => {
    const data = buildData();
    const existingSession = data.sessions[0]!;

    const result = deleteDemoSession(data, existingSession.id);

    expect(
      result.sessions.some((session) => session.id === existingSession.id),
    ).toBe(false);
    expect(
      result.sessionAppEarnings.some((earning) => {
        return earning.sessionId === existingSession.id;
      }),
    ).toBe(false);
  });

  test("createDemoSession derives miles from odometer values", () => {
    const data = buildData();
    const values: DemoSessionFormValues = {
      ...buildValidValues(data),
      mileageEntryMode: "odometer",
      totalMiles: "",
      startOdometer: "1000",
      endOdometer: "1042.5",
    };

    const result = createSession(data, values, "demo-session-odometer");

    expect(result.session).toMatchObject({
      mileageEntryMode: "odometer",
      totalMiles: 42.5,
      startOdometer: 1000,
      endOdometer: 1042.5,
    });
  });

  test("createDemoSession moves end time to next day for overnight sessions", () => {
    const data = buildData();
    const values: DemoSessionFormValues = {
      ...buildValidValues(data),
      date: "2026-06-04",
      startTime: "22:00",
      endTime: "01:30",
    };

    const result = createSession(data, values, "demo-session-overnight");

    expect(result.session?.date).toBe("2026-06-04");
    expect(result.session?.endedAt.slice(0, 10)).toBe("2026-06-05");
  });

  test("createDemoSession returns validation errors without changing data", () => {
    const data = buildData();
    const values: DemoSessionFormValues = {
      ...buildValidValues(data),
      totalMiles: "0",
      appEarnings: [],
    };

    const result = createDemoSession(data, values);

    expect(result.success).toBe(false);

    if (result.success) return;

    expect(result.errors).toMatchObject({
      totalMiles: "Enter miles greater than 0.",
      appEarnings: "Add at least one app earning.",
    });
  });
});
