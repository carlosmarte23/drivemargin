import type {
  DemoData,
  EntityId,
  SessionAppEarning,
  WorkSession,
} from "@/types/domain";

import { createDemoEntityId } from "./demo-entity-id";
import {
  parseDemoSessionFormValues,
  type DemoSessionFormErrors,
  type DemoSessionFormValues,
  type ParsedDemoSessionFormValues,
} from "./demo-session-form";

type DemoSessionMutationOptions = {
  sessionId?: EntityId;
  earningIdFactory?: (index: number) => EntityId;
};

type DemoSessionMutationResult =
  | { success: true; data: DemoData; sessionId: EntityId }
  | { success: false; errors: DemoSessionFormErrors };

export function createDemoSession(
  data: DemoData,
  values: DemoSessionFormValues,
  options: DemoSessionMutationOptions = {},
): DemoSessionMutationResult {
  const parsed = parseDemoSessionFormValues(data, values);

  if (!parsed.success) {
    return parsed;
  }

  const sessionId = options.sessionId ?? createDemoEntityId("demo-session");
  const session = buildWorkSession(sessionId, parsed.values);
  const earnings = buildSessionAppEarnings(sessionId, parsed.values, options);

  return {
    success: true,
    sessionId,
    data: {
      ...data,
      sessions: [...data.sessions, session],
      sessionAppEarnings: [...data.sessionAppEarnings, ...earnings],
    },
  };
}

export function updateDemoSession(
  data: DemoData,
  sessionId: EntityId,
  values: DemoSessionFormValues,
  options: DemoSessionMutationOptions = {},
): DemoSessionMutationResult {
  const existingSession = data.sessions.find((session) => {
    return session.id === sessionId;
  });

  if (!existingSession) {
    return {
      success: false,
      errors: { date: "Session was not found." },
    };
  }

  const parsed = parseDemoSessionFormValues(data, values);

  if (!parsed.success) {
    return parsed;
  }

  const nextSession = buildWorkSession(existingSession.id, parsed.values);
  const nextEarnings = buildSessionAppEarnings(
    existingSession.id,
    parsed.values,
    options,
  );

  return {
    success: true,
    sessionId: existingSession.id,
    data: {
      ...data,
      sessions: data.sessions.map((session) => {
        return session.id === existingSession.id ? nextSession : session;
      }),
      sessionAppEarnings: [
        ...data.sessionAppEarnings.filter((earning) => {
          return earning.sessionId !== existingSession.id;
        }),
        ...nextEarnings,
      ],
    },
  };
}

export function deleteDemoSession(
  data: DemoData,
  sessionId: EntityId,
): DemoData {
  return {
    ...data,
    sessions: data.sessions.filter((session) => {
      return session.id !== sessionId;
    }),
    sessionAppEarnings: data.sessionAppEarnings.filter((earning) => {
      return earning.sessionId !== sessionId;
    }),
  };
}

function buildWorkSession(
  sessionId: EntityId,
  values: ParsedDemoSessionFormValues,
): WorkSession {
  return {
    id: sessionId,
    vehicleId: values.vehicleId,
    startedAt: values.startedAt,
    endedAt: values.endedAt,
    date: values.date,
    mileageEntryMode: values.mileageEntryMode,
    totalMiles: values.totalMiles,
    startOdometer: values.startOdometer,
    endOdometer: values.endOdometer,
    notes: values.notes,
  };
}

function buildSessionAppEarnings(
  sessionId: EntityId,
  values: ParsedDemoSessionFormValues,
  options: DemoSessionMutationOptions,
): SessionAppEarning[] {
  return values.appEarnings.map((earning, index) => ({
    id:
      options.earningIdFactory?.(index) ??
      createDemoEntityId(`demo-session-earning-${index + 1}`),
    sessionId,
    workAppId: earning.workAppId,
    amountCents: earning.amountCents,
  }));
}
