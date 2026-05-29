import { describe, expect, it } from "vitest";
import { generateDemoData } from "./generateDemoData";

const referenceDate = new Date("2026-05-29T12:00:00.000Z");
describe("generateDemoData", () => {
  it("returns all demo data collections", () => {
    const data = generateDemoData(referenceDate);

    expect(data.vehicles.length).toBeGreaterThan(0);
    expect(data.workApps.length).toBeGreaterThan(0);
    expect(data.expenses.length).toBeGreaterThan(0);
    expect(data.fuelPurchases.length).toBeGreaterThan(0);
    expect(data.sessions.length).toBeGreaterThan(0);
    expect(data.sessionAppEarnings.length).toBeGreaterThan(0);
    expect(data.settings).toBeTruthy();
  });

  it("generates sessions dates relative to the reference date", () => {
    const data = generateDemoData(referenceDate);

    const session = data.sessions.find((s) => s.id === "demo-session-015");

    expect(session).toBeDefined();
    expect(session?.date).toBe("2026-05-28");
  });

  it("generates full datetimes for session start and end", () => {
    const data = generateDemoData(referenceDate);

    const session = data.sessions.find((s) => s.id === "demo-session-015");

    expect(session).toBeDefined();
    expect(session?.startedAt).toContain("T");
    expect(session?.endedAt).toContain("T");
    expect(Date.parse(session!.startedAt)).not.toBeNaN();
    expect(Date.parse(session!.endedAt)).not.toBeNaN();
    expect(new Date(session!.endedAt).getTime()).toBeGreaterThan(
      new Date(session!.startedAt).getTime(),
    );
  });

  it("sets session dates relative to the provided reference date", () => {
    const mayData = generateDemoData(new Date("2026-05-29T12:00:00.000Z"));
    const juneData = generateDemoData(new Date("2026-06-29T12:00:00.000Z"));

    const maySession = mayData.sessions.find(
      (session) => session.id === "demo-session-015",
    );
    const juneSession = juneData.sessions.find(
      (session) => session.id === "demo-session-015",
    );

    expect(maySession?.date).toBe("2026-05-28");
    expect(juneSession?.date).toBe("2026-06-28");
  });

  it("moves session end to next day when the shift crosses midnight", () => {
    const data = generateDemoData(referenceDate);

    const session = data.sessions.find((s) => s.id === "demo-session-007");

    expect(session).toBeDefined();
    expect(new Date(session!.endedAt).getTime()).toBeGreaterThan(
      new Date(session!.startedAt).getTime(),
    );
    expect(session?.date).toBe("2026-05-16");
    expect(session?.endedAt.slice(0, 10)).toBe("2026-05-17");
  });

  it("connects session app earnings to generated sessions", () => {
    const data = generateDemoData(referenceDate);

    const earning = data.sessionAppEarnings.find(
      (e) => e.id === "demo-session-earning-001",
    );

    expect(earning).toBeDefined();
    expect(earning?.sessionId).toBe("demo-session-001");
  });

  it("connects every session app earning to an existing session", () => {
    const data = generateDemoData(referenceDate);
    const sessionIds = new Set(data.sessions.map((session) => session.id));

    for (const earning of data.sessionAppEarnings) {
      expect(sessionIds.has(earning.sessionId)).toBe(true);
      expect(earning.amountCents).toBeGreaterThan(0);
    }
  });

  it("keeps fuel purchases separate from non-fuel expenses", () => {
    const data = generateDemoData(referenceDate);

    expect(data.fuelPurchases.length).toBeGreaterThan(0);
    expect(data.expenses.length).toBeGreaterThan(0);

    expect(data.expenses.map((e) => e.category)).not.toContain("fuel");
    expect(data.expenses.map((expense) => expense.category)).not.toContain(
      "gas",
    );
  });
});
