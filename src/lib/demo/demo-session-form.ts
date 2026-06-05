import { formatDateToString, formatTimeToString } from "@/lib/date";
import type {
  DemoData,
  EntityId,
  MileageEntryMode,
  MoneyCents,
  WorkSession,
} from "@/types/domain";

export type DemoSessionEarningFormValue = {
  id: EntityId;
  workAppId: EntityId;
  amount: string;
};

export type DemoSessionFormValues = {
  date: string;
  startTime: string;
  endTime: string;
  vehicleId: EntityId;
  mileageEntryMode: MileageEntryMode;
  totalMiles: string;
  startOdometer?: string;
  endOdometer?: string;
  appEarnings: DemoSessionEarningFormValue[];
  notes?: string;
};

export type ParsedDemoSessionEarning = {
  workAppId: EntityId;
  amountCents: MoneyCents;
};

export type ParsedDemoSessionFormValues = {
  date: string;
  startedAt: string;
  endedAt: string;
  vehicleId: EntityId;
  mileageEntryMode: MileageEntryMode;
  totalMiles: number;
  startOdometer?: number;
  endOdometer?: number;
  appEarnings: ParsedDemoSessionEarning[];
  notes?: string;
};

export type DemoSessionFormErrors = Partial<
  Record<
    | "date"
    | "startTime"
    | "endTime"
    | "vehicleId"
    | "mileageEntryMode"
    | "totalMiles"
    | "startOdometer"
    | "endOdometer"
    | "appEarnings"
    | "notes",
    string
  >
>;

export type DemoSessionFormParseResult =
  | { success: true; values: ParsedDemoSessionFormValues }
  | { success: false; errors: DemoSessionFormErrors };

export function getDefaultDemoSessionFormValues(
  data: DemoData,
): DemoSessionFormValues {
  const defaultVehicle = data.vehicles.find((vehicle) => vehicle.isDefault);
  const firstWorkApp = data.workApps[0];
  const today = formatDateToString(new Date());

  return {
    date: today,
    startTime: "09:00",
    endTime: "12:00",
    vehicleId: defaultVehicle?.id ?? "",
    mileageEntryMode: "manual",
    totalMiles: "",
    startOdometer: "",
    endOdometer: "",
    appEarnings: firstWorkApp
      ? [
          {
            id: firstWorkApp.id,
            workAppId: firstWorkApp.id,
            amount: "",
          },
        ]
      : [],
    notes: "",
  };
}

export function getDemoSessionFormValues(
  data: DemoData,
  sessionId: EntityId,
): DemoSessionFormValues | null {
  const session = data.sessions.find((item) => item.id === sessionId);

  if (!session) {
    return null;
  }

  const earnings = data.sessionAppEarnings.filter((earning) => {
    return earning.sessionId === session.id;
  });

  return {
    date: session.date,
    startTime: formatTimeToString(session.startedAt),
    endTime: formatTimeToString(session.endedAt),
    vehicleId: session.vehicleId,
    mileageEntryMode: session.mileageEntryMode,
    totalMiles:
      session.mileageEntryMode === "manual" ? String(session.totalMiles) : "",
    startOdometer:
      session.startOdometer === undefined ? "" : String(session.startOdometer),
    endOdometer:
      session.endOdometer === undefined ? "" : String(session.endOdometer),
    appEarnings: earnings.map((earning, index) => ({
      id: earning.id || `earning-row-${index + 1}`,
      workAppId: earning.workAppId,
      amount: (earning.amountCents / 100).toFixed(2),
    })),
    notes: session.notes ?? "",
  };
}

export function parseDemoSessionFormValues(
  data: DemoData,
  values: DemoSessionFormValues,
): DemoSessionFormParseResult {
  const errors: DemoSessionFormErrors = {};

  if (!isDateInputValue(values.date)) {
    errors.date = "Date is required";
  }

  if (!isTimeInputValue(values.startTime)) {
    errors.startTime = "Start time is required";
  }

  if (!isTimeInputValue(values.endTime)) {
    errors.endTime = "End time is required";
  }

  if (!data.vehicles.some((vehicle) => vehicle.id === values.vehicleId)) {
    errors.vehicleId = "Vehicle is required";
  }

  const appEarnings = parseAppEarnings(data, values.appEarnings);

  const mileage = parseMileage(values);

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const startedAt = buildDateTime(values.date, values.startTime);
  const endedAt = buildEndDateTime(
    values.date,
    values.startTime,
    values.endTime,
  );
  const notes = values.notes?.trim();

  if (
    !appEarnings.success ||
    !mileage.success ||
    Object.keys(errors).length > 0
  ) {
    return {
      success: false,
      errors: {
        ...errors,
        ...(!mileage.success ? mileage.errors : {}),
        ...(!appEarnings.success ? { appEarnings: appEarnings.error } : {}),
      },
    };
  }

  return {
    success: true,
    values: {
      date: values.date,
      startedAt,
      endedAt,
      vehicleId: values.vehicleId,
      mileageEntryMode: values.mileageEntryMode,
      totalMiles: mileage.totalMiles,
      startOdometer: mileage.startOdometer,
      endOdometer: mileage.endOdometer,
      appEarnings: appEarnings.values,
      notes: notes && notes?.length > 0 ? notes : undefined,
    },
  };
}

function parseAppEarnings(
  data: DemoData,
  earnings: DemoSessionEarningFormValue[],
):
  | { success: true; values: ParsedDemoSessionEarning[] }
  | { success: false; error: string } {
  const parsed = earnings
    .map((earning) => ({
      workAppId: earning.workAppId,
      amountCents: dollarInputToCents(earning.amount),
    }))
    .filter((earning) => {
      return earning.workAppId.length > 0 || earning.amountCents > 0;
    });

  if (parsed.length === 0) {
    return { success: false, error: "Add at least one app earning." };
  }

  const hasInvalidApp = parsed.some((earning) => {
    return !data.workApps.some((app) => app.id === earning.workAppId);
  });

  if (hasInvalidApp) {
    return { success: false, error: "Select an app for each earning." };
  }

  const hasInvalidAmount = parsed.some((earning) => {
    return earning.amountCents <= 0;
  });

  if (hasInvalidAmount) {
    return { success: false, error: "Enter an amount greater than $0.00." };
  }

  return { success: true, values: parsed };
}

function dollarInputToCents(value: string): MoneyCents {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  return Math.round(amount * 100);
}

function isDateInputValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isTimeInputValue(value: string) {
  return /^\d{2}:\d{2}$/.test(value);
}

function buildDateTime(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes, 0, 0).toISOString();
}

function buildEndDateTime(date: string, startTime: string, endTime: string) {
  const startedAt = new Date(buildDateTime(date, startTime));
  const endedAt = new Date(buildDateTime(date, endTime));

  if (endedAt <= startedAt) {
    endedAt.setDate(endedAt.getDate() + 1);
  }

  return endedAt.toISOString();
}

function parseMileage(values: DemoSessionFormValues):
  | {
      success: true;
      totalMiles: number;
      startOdometer?: number;
      endOdometer?: number;
    }
  | { success: false; errors: DemoSessionFormErrors } {
  if (values.mileageEntryMode === "manual") {
    const totalMiles = Number(values.totalMiles);

    if (!Number.isFinite(totalMiles) || totalMiles <= 0) {
      return {
        success: false,
        errors: { totalMiles: "Enter miles greater than 0." },
      };
    }

    return { success: true, totalMiles };
  }

  const startOdometer = Number(values.startOdometer);
  const endOdometer = Number(values.endOdometer);

  if (!Number.isFinite(startOdometer) || startOdometer < 0) {
    return {
      success: false,
      errors: { startOdometer: "Enter a valid start odometer." },
    };
  }

  if (!Number.isFinite(endOdometer) || endOdometer <= startOdometer) {
    return {
      success: false,
      errors: { endOdometer: "End odometer must be greater than start." },
    };
  }

  return {
    success: true,
    totalMiles: endOdometer - startOdometer,
    startOdometer,
    endOdometer,
  };
}
