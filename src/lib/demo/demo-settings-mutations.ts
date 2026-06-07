import type { DemoData } from "@/types/domain";

import {
  parseDemoSettingsFormValues,
  type DemoSettingsFormErrors,
  type DemoSettingsFormValues,
} from "./demo-settings-form";

export type DemoSettingsMutationResult =
  | { success: true; data: DemoData }
  | { success: false; errors: DemoSettingsFormErrors };

export function updateDemoSettings(
  data: DemoData,
  values: DemoSettingsFormValues,
): DemoSettingsMutationResult {
  const parsed = parseDemoSettingsFormValues(data, values);

  if (!parsed.success) {
    return parsed;
  }

  return {
    success: true,
    data: {
      ...data,
      settings: parsed.values,
    },
  };
}
