"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { completeOnboarding } from "@/features/onboarding/actions/complete-onboarding";
import { initialOnboardingFormState } from "@/features/onboarding/types";

export function OnboardingForm() {
  const [state, formAction, isPending] = useActionState(
    completeOnboarding,
    initialOnboardingFormState,
  );

  return (
    <form action={formAction} className="w-full">
      <Card className="w-full">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-2xl font-semibold">
            Let&apos;s set up your profile
          </CardTitle>
          <CardDescription className="max-w-sm text-sm text-pretty text-muted-foreground">
            Help us calculate your true margin by providing a few details about
            your work.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-sm font-medium">
              User Display Name
            </Label>
            <Input
              id="displayName"
              type="text"
              name="displayName"
              placeholder="e.g. Alex"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vehicleName" className="text-sm font-medium">
                Vehicle Name
              </Label>
              <Input
                id="vehicleName"
                type="text"
                name="vehicleName"
                placeholder="e.g. Prius"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedMpg" className="text-sm font-medium">
                Estimated MPG
              </Label>
              <Input
                id="estimatedMpg"
                name="estimatedMpg"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="5"
                placeholder="27.5"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
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
              defaultValue="manual"
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
                placeholder="$ 20.00"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
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
                placeholder="$ 1.50"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          {state.message ? <p>{state.message}</p> : null}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Finishing..." : "Finish setup"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
