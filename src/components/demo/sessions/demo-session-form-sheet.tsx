"use client";

import { useState, type FormEvent, type MouseEvent } from "react";

import { Trash2 } from "lucide-react";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { DemoFieldError } from "@/components/demo/demo-field-error";
import { DemoFormSheetFooter } from "@/components/demo/demo-form-sheet-footer";
import { Button } from "@/components/ui/button";
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
  getDefaultDemoSessionFormValues,
  getDemoSessionFormValues,
  type DemoSessionFormErrors,
  type DemoSessionFormValues,
} from "@/lib/demo/demo-session-form";
import {
  createDemoSession,
  deleteDemoSession,
  updateDemoSession,
} from "@/lib/demo/demo-session-mutations";

type DemoSessionFormSheetProps = {
  mode: "create" | "edit";
  sessionId?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DemoSessionFormSheet({
  mode,
  sessionId,
  open,
  onOpenChange,
}: DemoSessionFormSheetProps) {
  const title = mode === "create" ? "Add session" : "Edit session";
  const description =
    mode === "create"
      ? "Create a demo work session and app earnings."
      : "Update this demo work session or delete it.";
  const formKey = `${mode}:${sessionId ?? "new"}`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-hidden data-[side=right]:w-full data-[side=right]:sm:w-2xl data-[side=right]:sm:max-w-none">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <DemoSessionFormContent
          key={formKey}
          mode={mode}
          sessionId={sessionId}
          onOpenChange={onOpenChange}
        />
      </SheetContent>
    </Sheet>
  );
}

function DemoSessionFormContent({
  mode,
  sessionId,
  onOpenChange,
}: Pick<DemoSessionFormSheetProps, "mode" | "sessionId" | "onOpenChange">) {
  const { demoData, setDemoData } = useDemoData();
  const [values, setValues] = useState<DemoSessionFormValues>(() => {
    if (mode === "edit" && sessionId) {
      return (
        getDemoSessionFormValues(demoData, sessionId) ??
        getDefaultDemoSessionFormValues(demoData)
      );
    }

    return getDefaultDemoSessionFormValues(demoData);
  });
  const [errors, setErrors] = useState<DemoSessionFormErrors>({});
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  function updateValue<Key extends keyof DemoSessionFormValues>(
    key: Key,
    value: DemoSessionFormValues[Key],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateEarning(
    rowId: string,
    nextValue: Partial<DemoSessionFormValues["appEarnings"][number]>,
  ) {
    setValues((current) => ({
      ...current,
      appEarnings: current.appEarnings.map((earning) => {
        return earning.id === rowId ? { ...earning, ...nextValue } : earning;
      }),
    }));
  }

  function addEarningRow() {
    const firstWorkApp = demoData.workApps[0];

    if (!firstWorkApp) {
      return;
    }

    setValues((current) => ({
      ...current,
      appEarnings: [
        ...current.appEarnings,
        {
          id: `earning-row-${Date.now()}`,
          workAppId: firstWorkApp.id,
          amount: "",
        },
      ],
    }));
  }

  function removeEarningRow(rowId: string) {
    setValues((current) => ({
      ...current,
      appEarnings: current.appEarnings.filter((earning) => {
        return earning.id !== rowId;
      }),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result =
      mode === "edit" && sessionId
        ? updateDemoSession(demoData, sessionId, values)
        : createDemoSession(demoData, values);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setDemoData(result.data);
    onOpenChange(false);
  }

  function handleDelete() {
    if (mode !== "edit" || !sessionId) {
      return;
    }

    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      return;
    }

    setDemoData((currentData) => {
      return deleteDemoSession(currentData, sessionId);
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

    if (target.closest("[data-delete-session-button]")) {
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
            <Label htmlFor="session-date">Date</Label>
            <Input
              id="session-date"
              type="date"
              value={values.date}
              onChange={(event) => {
                updateValue("date", event.target.value);
              }}
            />
            <DemoFieldError message={errors.date} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-vehicle">Vehicle</Label>
            <Select
              value={values.vehicleId}
              onValueChange={(value) => {
                updateValue("vehicleId", value);
              }}
            >
              <SelectTrigger id="session-vehicle" className="w-full">
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
            <Label htmlFor="session-start-time">Start time</Label>
            <Input
              id="session-start-time"
              type="time"
              value={values.startTime}
              onChange={(event) => {
                updateValue("startTime", event.target.value);
              }}
            />
            <DemoFieldError message={errors.startTime} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-end-time">End time</Label>
            <Input
              id="session-end-time"
              type="time"
              value={values.endTime}
              onChange={(event) => {
                updateValue("endTime", event.target.value);
              }}
            />
            <DemoFieldError message={errors.endTime} />
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-border/70 p-4">
          <Label>Mileage entry</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button
              type="button"
              variant={
                values.mileageEntryMode === "manual" ? "default" : "outline"
              }
              onClick={() => {
                updateValue("mileageEntryMode", "manual");
              }}
            >
              Manual miles
            </Button>
            <Button
              type="button"
              variant={
                values.mileageEntryMode === "odometer" ? "default" : "outline"
              }
              onClick={() => {
                updateValue("mileageEntryMode", "odometer");
              }}
            >
              Odometer
            </Button>
          </div>

          {values.mileageEntryMode === "manual" ? (
            <div className="space-y-2">
              <Label htmlFor="session-total-miles">Total miles</Label>
              <Input
                id="session-total-miles"
                type="number"
                min="0"
                step="0.1"
                value={values.totalMiles}
                onChange={(event) => {
                  updateValue("totalMiles", event.target.value);
                }}
              />
              <DemoFieldError message={errors.totalMiles} />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="session-start-odometer">Start odometer</Label>
                <Input
                  id="session-start-odometer"
                  type="number"
                  min="0"
                  step="0.1"
                  value={values.startOdometer}
                  onChange={(event) => {
                    updateValue("startOdometer", event.target.value);
                  }}
                />
                <DemoFieldError message={errors.startOdometer} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-end-odometer">End odometer</Label>
                <Input
                  id="session-end-odometer"
                  type="number"
                  min="0"
                  step="0.1"
                  value={values.endOdometer}
                  onChange={(event) => {
                    updateValue("endOdometer", event.target.value);
                  }}
                />
                <DemoFieldError message={errors.endOdometer} />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border border-border/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <Label>App earnings</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addEarningRow}
            >
              Add app
            </Button>
          </div>

          <div className="space-y-3">
            {values.appEarnings.map((earning) => (
              <div
                key={earning.id}
                className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_9rem_auto]"
              >
                <Select
                  value={earning.workAppId}
                  onValueChange={(value) => {
                    updateEarning(earning.id, { workAppId: value });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select app" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoData.workApps.map((app) => (
                      <SelectItem key={app.id} value={app.id}>
                        {app.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={earning.amount}
                  onChange={(event) => {
                    updateEarning(earning.id, {
                      amount: event.target.value,
                    });
                  }}
                />

                <Button
                  type="button"
                  variant="ghost"
                  className="justify-self-start text-destructive hover:bg-destructive/10 hover:text-destructive sm:justify-self-end"
                  onClick={() => {
                    removeEarningRow(earning.id);
                  }}
                >
                  <Trash2 className="size-4" />
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <DemoFieldError message={errors.appEarnings} />
        </div>

        <div className="space-y-2 rounded-lg border border-border/70 p-4">
          <Label htmlFor="session-notes">Notes</Label>
          <Textarea
            id="session-notes"
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
        submitLabel={mode === "create" ? "Add session" : "Save changes"}
        deleteLabel="Delete session"
        isConfirmingDelete={isConfirmingDelete}
        deleteButtonClassName="sm:mr-auto"
        deleteButtonDataAttribute="data-delete-session-button"
        onCancel={() => {
          onOpenChange(false);
        }}
        onDelete={handleDelete}
      />
    </form>
  );
}
