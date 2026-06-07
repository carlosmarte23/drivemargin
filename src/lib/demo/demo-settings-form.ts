import type {
  DemoData,
  EntityId,
  MoneyCents,
  UserSettings,
} from "@/types/domain";

export type DemoSettingsFormValues = {
  defaultVehicleId: EntityId;
  targetNetPerHour: string;
  targetNetPerMile: string;
  irsMileageRate: string;
  theme: "light" | "dark" | "system";
};

export type ParsedDemoSettingsFormValues = UserSettings;

export type DemoSettingsFormErrors = Partial<
  Record<keyof DemoSettingsFormValues, string>
>;

export type DemoSettingsFormParseResult =
  | { success: true; values: ParsedDemoSettingsFormValues }
  | { success: false; errors: DemoSettingsFormErrors };

export function getDemoSettingsFormValues(
  data: DemoData,
): DemoSettingsFormValues {
  return {
    defaultVehicleId: data.settings.defaultVehicleId,
    targetNetPerHour: amountCentsToDollarInput(
      data.settings.targetNetCentsPerHour,
    ),
    targetNetPerMile: amountCentsToDollarInput(
      data.settings.targetNetCentsPerMile,
    ),
    irsMileageRate: amountCentsToDollarInput(
      data.settings.irsMileageRateCentsPerMile,
    ),
    theme: data.settings.theme,
  };
}

export function parseDemoSettingsFormValues(
  data: DemoData,
  values: DemoSettingsFormValues,
): DemoSettingsFormParseResult {
  const errors: DemoSettingsFormErrors = {};

  if (
    !data.vehicles.some((vehicle) => vehicle.id === values.defaultVehicleId)
  ) {
    errors.defaultVehicleId = "Default vehicle is required.";
  }

  if (Number(values.targetNetPerHour) <= 0) {
    errors.targetNetPerHour = "Enter an hourly goal greater than $0.00.";
  }

  if (Number(values.targetNetPerMile) <= 0) {
    errors.targetNetPerMile = "Enter a per-mile goal greater than $0.00.";
  }

  if (Number(values.irsMileageRate) <= 0) {
    errors.irsMileageRate = "Enter a valid IRS mileage rate.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    values: {
      defaultVehicleId: values.defaultVehicleId,
      targetNetCentsPerHour: dollarInputToCents(values.targetNetPerHour),
      targetNetCentsPerMile: dollarInputToCents(values.targetNetPerMile),
      irsMileageRateCentsPerMile: dollarInputToCents(values.irsMileageRate),
      theme: values.theme,
      currency: data.settings.currency,
      language: data.settings.language,
    },
  };
}

function amountCentsToDollarInput(amount: MoneyCents): string {
  return (amount / 100).toFixed(2);
}

function dollarInputToCents(value: string): MoneyCents {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return 0;
  }
  return Math.round(amount * 100);
}
