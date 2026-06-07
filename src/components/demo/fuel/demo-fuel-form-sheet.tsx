"use client";

import { useState, type ComponentProps, type MouseEvent } from "react";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { DemoFieldError } from "@/components/demo/demo-field-error";
import { DemoFormSheetFooter } from "@/components/demo/demo-form-sheet-footer";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  getDefaultDemoFuelFormValues,
  getDemoFuelFormValues,
  type DemoFuelFormErrors,
  type DemoFuelFormValues,
} from "@/lib/demo/demo-fuel-form";
import {
  createDemoFuelPurchase,
  deleteDemoFuelPurchase,
  updateDemoFuelPurchase,
} from "@/lib/demo/demo-fuel-mutations";

type DemoFuelFormSheetProps = {
  mode: "create" | "edit";
  fuelPurchaseId?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];

export function DemoFuelFormSheet({
  mode,
  fuelPurchaseId,
  open,
  onOpenChange,
}: DemoFuelFormSheetProps) {
  const title = mode === "create" ? "Add fuel purchase" : "Edit fuel purchase";
  const description =
    mode === "create"
      ? "Create a demo fuel purchase."
      : "Update this demo fuel purchase.";
  const formKey = `${mode}:${fuelPurchaseId ?? "new"}`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-hidden data-[side=right]:w-full data-[side=right]:sm:w-2xl data-[side=right]:sm:max-w-none">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <DemoFuelFormContent
          key={formKey}
          mode={mode}
          fuelPurchaseId={fuelPurchaseId}
          onOpenChange={onOpenChange}
        />
      </SheetContent>
    </Sheet>
  );
}

function DemoFuelFormContent({
  mode,
  fuelPurchaseId,
  onOpenChange,
}: Pick<DemoFuelFormSheetProps, "mode" | "fuelPurchaseId" | "onOpenChange">) {
  const { demoData, setDemoData } = useDemoData();
  const [values, setValues] = useState<DemoFuelFormValues>(() => {
    if (mode === "edit" && fuelPurchaseId) {
      return (
        getDemoFuelFormValues(demoData, fuelPurchaseId) ??
        getDefaultDemoFuelFormValues(demoData)
      );
    }

    return getDefaultDemoFuelFormValues(demoData);
  });
  const [errors, setErrors] = useState<DemoFuelFormErrors>({});
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  function updateValue<Key extends keyof DemoFuelFormValues>(
    key: Key,
    value: DemoFuelFormValues[Key],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();

    const result =
      mode === "edit" && fuelPurchaseId
        ? updateDemoFuelPurchase(demoData, fuelPurchaseId, values)
        : createDemoFuelPurchase(demoData, values);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setDemoData(result.data);
    onOpenChange(false);
  }

  function handleDelete() {
    if (mode !== "edit" || !fuelPurchaseId) {
      return;
    }

    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      return;
    }

    setDemoData((currentData) => {
      return deleteDemoFuelPurchase(currentData, fuelPurchaseId);
    });
    onOpenChange(false);
  }

  function handleFormClick(event: MouseEvent<HTMLFormElement>) {
    if (!isConfirmingDelete) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest("[data-delete-fuel-button]")) {
      return;
    }

    setIsConfirmingDelete(false);
  }

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onClick={handleFormClick}
      onSubmit={handleSubmit}
    >
      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
        <div className="grid gap-x-5 gap-y-4 rounded-lg border border-border/70 p-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fuel-date">Date</Label>
            <Input
              id="fuel-date"
              type="date"
              value={values.date}
              onChange={(event) => {
                updateValue("date", event.target.value);
              }}
            />
            <DemoFieldError message={errors.date} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuel-vehicle">Vehicle</Label>
            <Select
              value={values.vehicleId}
              onValueChange={(value) => {
                updateValue("vehicleId", value);
              }}
            >
              <SelectTrigger id="fuel-vehicle" className="w-full">
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
            <DemoFieldError message={errors.vehicleId} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuel-total-paid">Total paid</Label>
            <Input
              id="fuel-total-paid"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={values.totalPaid}
              onChange={(event) => {
                updateValue("totalPaid", event.target.value);
              }}
            />
            <DemoFieldError message={errors.totalPaid} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuel-gallons">Gallons</Label>
            <Input
              id="fuel-gallons"
              type="number"
              min="0"
              step="0.001"
              placeholder="0.000"
              value={values.gallons}
              onChange={(event) => {
                updateValue("gallons", event.target.value);
              }}
            />
            <DemoFieldError message={errors.gallons} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuel-odometer">Odometer</Label>
            <Input
              id="fuel-odometer"
              type="number"
              min="0"
              step="1"
              placeholder="Optional"
              value={values.odometer}
              onChange={(event) => {
                updateValue("odometer", event.target.value);
              }}
            />
            <DemoFieldError message={errors.odometer} />
          </div>
        </div>

        <div className="space-y-2 rounded-lg border border-border/70 p-4">
          <Label htmlFor="fuel-station-name">Station</Label>
          <Input
            id="fuel-station-name"
            value={values.stationName}
            placeholder="Optional"
            onChange={(event) => {
              updateValue("stationName", event.target.value);
            }}
          />
        </div>

        <div className="space-y-2 rounded-lg border border-border/70 p-4">
          <Label htmlFor="fuel-notes">Notes</Label>
          <Textarea
            id="fuel-notes"
            value={values.notes}
            placeholder="Optional"
            onChange={(event) => {
              updateValue("notes", event.target.value);
            }}
          />
        </div>
      </div>

      <DemoFormSheetFooter
        mode={mode}
        submitLabel={mode === "create" ? "Add fuel purchase" : "Save changes"}
        deleteLabel="Delete fuel purchase"
        isConfirmingDelete={isConfirmingDelete}
        deleteButtonClassName="sm:mr-auto"
        deleteButtonDataAttribute="data-delete-fuel-button"
        onCancel={() => {
          onOpenChange(false);
        }}
        onDelete={handleDelete}
      />
    </form>
  );
}
