"use client";

import { useRouter } from "next/navigation";

import {
  useRef,
  useState,
  useTransition,
  type ComponentProps,
  type MouseEvent,
} from "react";

import { CalendarDays, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseDateString } from "@/lib/date";
import {
  buildPeriodHref,
  formatReportPeriodLabel,
  type ReportPeriod,
} from "@/lib/reporting/reportPeriod";

type ReportPeriodPickerDialogProps = {
  period: ReportPeriod;
  hrefBase: string;
  label: string;
  labelPrefix?: string;
};

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];

function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
  if (event.target === event.currentTarget) {
    event.currentTarget.close();
  }
}

function getSelectedRangePreview(startDate: string, endDate: string) {
  if (!isDateInputValue(startDate) || !isDateInputValue(endDate)) {
    return null;
  }

  if (startDate > endDate) {
    return null;
  }

  const start = parseDateString(startDate);
  const end = parseDateString(endDate);
  const dayCount =
    Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;

  return {
    dayCount,
    label: formatReportPeriodLabel({ startDate, endDate }),
  };
}

function isDateInputValue(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function ReportPeriodPickerDialog({
  period,
  hrefBase,
  label,
  labelPrefix,
}: ReportPeriodPickerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [startDate, setStartDate] = useState(period.startDate);
  const [endDate, setEndDate] = useState(period.endDate);
  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const selectedRangePreview = getSelectedRangePreview(startDate, endDate);

  function openDialog() {
    setStartDate(period.startDate);
    setEndDate(period.endDate);
    setError("");
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleSubmit(e: FormSubmitEvent) {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError("Start date and end date are required.");
      return;
    }

    if (startDate > endDate) {
      setError("Start date must be before end date.");

      return;
    }

    const href = buildPeriodHref(hrefBase, { startDate, endDate });

    startTransition(() => {
      setError("");
      router.push(href, { scroll: false });
    });

    closeDialog();
  }

  return (
    <div>
      <button
        type="button"
        onClick={openDialog}
        aria-label={labelPrefix ? `${labelPrefix} ${label}` : undefined}
        className="min-w-0 cursor-pointer px-3 text-center text-sm font-medium text-foreground transition-colors hover:text-primary sm:min-w-44"
      >
        {labelPrefix ? (
          <span className="inline-flex items-center sm:gap-1">
            <span className="sr-only sm:not-sr-only">{labelPrefix}</span>
            <span>{label}</span>
          </span>
        ) : (
          label
        )}
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        aria-describedby="period-picker-description"
        aria-labelledby="period-picker-title"
        className="period-range-dialog m-auto w-[min(430px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-start justify-between gap-4 border-b border-border/70 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                <CalendarDays className="size-5" aria-hidden="true" />
              </div>

              <div>
                <h2 id="period-picker-title" className="font-semibold">
                  Select period
                </h2>
                <p
                  id="period-picker-description"
                  className="mt-1 text-sm text-muted-foreground"
                >
                  Choose a custom date range.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={closeDialog}
              aria-label="Close period picker"
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-4 px-5 py-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="period-start-date"
                className="text-sm font-medium"
              >
                Start date
              </label>
              <Input
                id="period-start-date"
                name="start"
                type="date"
                autoComplete="off"
                value={startDate}
                max={endDate || undefined}
                onChange={(event) => {
                  setStartDate(event.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                className="h-10 dark:scheme-dark"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="period-end-date" className="text-sm font-medium">
                End date
              </label>
              <Input
                id="period-end-date"
                name="end"
                type="date"
                autoComplete="off"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) => {
                  setEndDate(event.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                className="h-10 dark:scheme-dark"
              />
            </div>

            {selectedRangePreview ? (
              <p className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
                Selected range:{" "}
                <span className="font-medium text-foreground">
                  {selectedRangePreview.label}
                </span>
                <span className="mt-1 block sm:mt-0 sm:ml-2 sm:inline">
                  {selectedRangePreview.dayCount}{" "}
                  {selectedRangePreview.dayCount === 1 ? "day" : "days"}
                </span>
              </p>
            ) : null}

            {error ? (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-border/70 bg-muted/20 px-5 py-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={closeDialog}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Apply period
            </Button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
