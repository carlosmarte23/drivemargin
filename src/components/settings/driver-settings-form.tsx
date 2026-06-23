"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateDriverSettings } from "@/features/settings/actions/update-driver-settings";
import type { DriverSettingsFormValues } from "@/features/settings/lib/load-driver-settings";
import { initialDriverSettingsFormState } from "@/features/settings/types";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type DriverSettingsFormProps = {
  initialValues: DriverSettingsFormValues;
};

export default function DriverSettingsForm({
  initialValues,
}: DriverSettingsFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateDriverSettings,
    initialDriverSettingsFormState,
  );

  const { setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(
    () => getFieldValue("theme") || "system",
  );

  const submittedThemeRef = useRef(selectedTheme);

  useEffect(() => {
    if (state.status === "success") {
      setTheme(submittedThemeRef.current);
    }
  }, [setTheme, state]);

  useEffect(() => {
    if (state.status === "success" && state.message) {
      toast.success(state.message, { position: "top-center" });
    }
  }, [state]);

  // get the value from the form or the initial value or submitted value if error
  function getFieldValue<Key extends keyof DriverSettingsFormValues>(
    key: Key,
  ): string {
    const submittedValues = state.values[key];
    const initialValue = initialValues[key];

    return String(submittedValues ?? initialValue ?? "");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adjust your driver settings</CardTitle>
      </CardHeader>
      <form
        action={formAction}
        onSubmit={() => {
          submittedThemeRef.current = selectedTheme;
        }}
      >
        <CardContent className="mb-4 space-y-4">
          <div className="grid gap-4 space-y-2 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="displayName"> User Display Name</Label>
              <Input
                id="displayName"
                type="text"
                name="displayName"
                defaultValue={getFieldValue("displayName")}
              />

              {state.errors.displayName && (
                <p className="mb-4 text-sm text-destructive">
                  {state.errors.displayName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleName">Vehicle Name</Label>
              <Input
                id="vehicleName"
                type="text"
                name="vehicleName"
                defaultValue={getFieldValue("vehicleName")}
              />

              {state.errors.vehicleName && (
                <p className="mb-4 text-sm text-destructive">
                  {state.errors.vehicleName}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 space-y-2 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="estimatedMpg">Estimated Vehicle MPG</Label>
              <Input
                id="estimatedMpg"
                name="estimatedMpg"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="5"
                placeholder="27.5"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                defaultValue={getFieldValue("estimatedMpg")}
              />

              {state.errors.estimatedMpg && (
                <p className="mb-4 text-sm text-destructive">
                  {state.errors.estimatedMpg}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="defaultMileageEntryMode"
                className="text-sm font-medium"
              >
                Default Mileage Entry
              </Label>

              <RadioGroup
                name="defaultMileageEntryMode"
                defaultValue={
                  getFieldValue("defaultMileageEntryMode") || "manual"
                }
                className="grid gap-3 sm:grid-cols-2"
              >
                <Label
                  htmlFor="mileage-manual"
                  className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-input bg-transparent px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <RadioGroupItem id="mileage-manual" value="manual" />
                  Manual
                </Label>

                <Label
                  htmlFor="mileage-odometer"
                  className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-input bg-transparent px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <RadioGroupItem id="mileage-odometer" value="odometer" />
                  Odometer
                </Label>
              </RadioGroup>

              {state.errors.defaultMileageEntryMode && (
                <p className="mb-4 text-sm text-destructive">
                  {state.errors.defaultMileageEntryMode}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="targetNetPerHour" className="text-sm font-medium">
                Target Net / Hour
              </Label>
              <Input
                id="targetNetPerHour"
                name="targetNetPerHour"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="1"
                defaultValue={getFieldValue("targetNetPerHour")}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />

              {state.errors.targetNetPerHour && (
                <p className="mb-4 text-sm text-destructive">
                  {state.errors.targetNetPerHour}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetNetPerMile" className="text-sm font-medium">
                Target Net / Mile
              </Label>
              <Input
                id="targetNetPerMile"
                name="targetNetPerMile"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="1"
                defaultValue={getFieldValue("targetNetPerMile")}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />

              {state.errors.targetNetPerMile && (
                <p className="mb-4 text-sm text-destructive">
                  {state.errors.targetNetPerMile}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="irsMileageRate" className="text-sm font-medium">
              IRS Deduction Rate
            </Label>
            <Input
              id="irsMileageRate"
              name="irsMileageRate"
              type="number"
              inputMode="decimal"
              step="0.001"
              min="0.01"
              defaultValue={getFieldValue("irsMileageRate")}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />

            {state.errors.irsMileageRate && (
              <p className="mb-4 text-sm text-destructive">
                {state.errors.irsMileageRate}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme" aria-label="Theme">
              Theme
            </Label>
            <Select
              value={selectedTheme}
              name="theme"
              onValueChange={(value) => {
                if (!isThemePreference(value)) {
                  return;
                }

                setSelectedTheme(value);
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

            {state.errors.theme && (
              <p className="mb-4 text-sm text-destructive">
                {state.errors.theme}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function isThemePreference(
  value: string | undefined,
): value is DriverSettingsFormValues["theme"] {
  return value === "light" || value === "dark" || value === "system";
}
