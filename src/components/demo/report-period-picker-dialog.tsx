"use client";

import { useRouter } from "next/navigation";

import {
  useRef,
  useState,
  useTransition,
  type FormEvent,
  type MouseEvent,
} from "react";

import { CalendarDays, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  buildPeriodHref,
  type ReportPeriod,
} from "@/lib/reporting/reportPeriod";

type ReportPeriodPickerDialogProps = {
  period: ReportPeriod;
  hrefBase: string;
  label: string;
};

function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
  if (event.target === event.currentTarget) {
    event.currentTarget.close();
  }
}

export function ReportPeriodPickerDialog({
  period,
  hrefBase,
  label,
}: ReportPeriodPickerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [startDate, setStartDate] = useState(period.startDate);
  const [endDate, setEndDate] = useState(period.endDate);
  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function openDialog() {
    setStartDate(period.startDate);
    setEndDate(period.endDate);
    setError("");
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
        className="text-foreground hover:text-primary min-w-0 cursor-pointer px-3 text-center text-sm font-medium transition-colors sm:min-w-44"
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        aria-describedby="period-picker-description"
        aria-labelledby="period-picker-title"
        className="period-range-dialog border-border bg-card text-card-foreground m-auto w-[min(430px,calc(100vw-2rem))] overflow-hidden rounded-2xl border p-0 shadow-2xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="border-border/70 flex items-start justify-between gap-4 border-b px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="border-primary/25 bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full border">
                <CalendarDays className="size-5" aria-hidden="true" />
              </div>

              <div>
                <h2 id="period-picker-title" className="font-semibold">
                  Select period
                </h2>
                <p
                  id="period-picker-description"
                  className="text-muted-foreground mt-1 text-sm"
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
                type="date"
                value={startDate}
                autoFocus
                onChange={(event) => {
                  setStartDate(event.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                className="h-10 dark:[color-scheme:dark]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="period-end-date" className="text-sm font-medium">
                End date
              </label>
              <Input
                id="period-end-date"
                type="date"
                value={endDate}
                onChange={(event) => {
                  setEndDate(event.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                className="h-10 dark:[color-scheme:dark]"
              />
            </div>

            {error ? (
              <p className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-sm">
                {error}
              </p>
            ) : null}
          </div>

          <div className="border-border/70 bg-muted/20 flex flex-col-reverse gap-2 border-t px-5 py-4 sm:flex-row sm:justify-end">
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
