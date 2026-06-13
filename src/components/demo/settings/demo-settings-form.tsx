"use client";

import { useState, type ComponentProps } from "react";

import { useTheme } from "next-themes";
import { toast } from "sonner";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { DemoTourReplayButton } from "@/components/demo/tour/demo-tour-replay-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getDemoSettingsFormValues,
  type DemoSettingsFormErrors,
  type DemoSettingsFormValues,
} from "@/lib/demo/demo-settings-form";
import { updateDemoSettings } from "@/lib/demo/demo-settings-mutations";
import type { DemoData } from "@/types/domain";

import { DemoFieldError } from "../demo-field-error";

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];

export function DemoSettingsForm() {
  const { demoData, setDemoData } = useDemoData();

  return (
    <div className="space-y-4">
      <DemoSettingsFormContent
        key={getDemoSettingsFormKey(demoData)}
        demoData={demoData}
        setDemoData={setDemoData}
      />

      <section className="rounded-xl border border-border bg-card p-4">
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-card-foreground">
            Guided tour
          </h2>
          <p className="text-sm text-muted-foreground">
            Replay the demo walkthrough from the dashboard.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <DemoTourReplayButton />
        </div>
      </section>
    </div>
  );
}

function DemoSettingsFormContent({
  demoData,
  setDemoData,
}: Pick<ReturnType<typeof useDemoData>, "demoData" | "setDemoData">) {
  const [errors, setErrors] = useState<DemoSettingsFormErrors>({});

  const [values, setValues] = useState(() =>
    getDemoSettingsFormValues(demoData),
  );

  const { theme, setTheme } = useTheme();
  const selectedTheme = isThemePreference(theme) ? theme : values.theme;

  function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();

    const result = updateDemoSettings(demoData, {
      ...values,
      theme: selectedTheme,
    });

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setDemoData(result.data);
    setTheme(result.data.settings.theme);
    setErrors({});
    toast.success("Demo settings updated", { position: "top-center" });
  }

  function updateValue<Key extends keyof DemoSettingsFormValues>(
    key: Key,
    value: DemoSettingsFormValues[Key],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo settings</CardTitle>
        <CardDescription>
          Adjust demo defaults used by reports and profitability calculations.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="default-vehicle">Default vehicle</Label>
              <Select
                value={values.defaultVehicleId}
                name="defaultVehicleId"
                onValueChange={(value) => {
                  updateValue("defaultVehicleId", value);
                }}
              >
                <SelectTrigger id="default-vehicle" className="w-full">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {demoData.vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-net-per-hour">Target per hour</Label>
              <Input
                id="target-net-per-hour"
                name="target-net-per-hour"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={values.targetNetPerHour}
                onChange={(event) => {
                  updateValue("targetNetPerHour", event.target.value);
                }}
              />
              <DemoFieldError message={errors.targetNetPerHour} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-net-per-mile">Target per mile</Label>
              <Input
                id="target-net-per-mile"
                name="target-net-per-mile"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={values.targetNetPerMile}
                onChange={(event) => {
                  updateValue("targetNetPerMile", event.target.value);
                }}
              />
              <DemoFieldError message={errors.targetNetPerMile} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="irs-rate">IRS rate</Label>
              <Input
                id="irs-rate"
                name="irs-rate"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={values.irsMileageRate}
                onChange={(event) => {
                  updateValue("irsMileageRate", event.target.value);
                }}
              />
              <DemoFieldError message={errors.irsMileageRate} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select
                value={selectedTheme}
                name="theme"
                onValueChange={(value) => {
                  if (!isThemePreference(value)) {
                    return;
                  }

                  setTheme(value);
                }}
              >
                <SelectTrigger id="theme" className="w-full">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <DemoFieldError message={errors.theme} />
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-end border-t px-6 py-4">
          <Button type="submit" variant="outline">
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function getDemoSettingsFormKey(data: DemoData) {
  const settings = data.settings;

  return [
    settings.defaultVehicleId,
    settings.targetNetCentsPerHour,
    settings.targetNetCentsPerMile,
    settings.irsMileageRateCentsPerMile,
    settings.theme,
  ].join(":");
}

function isThemePreference(
  value: string | undefined,
): value is DemoSettingsFormValues["theme"] {
  return value === "light" || value === "dark" || value === "system";
}
