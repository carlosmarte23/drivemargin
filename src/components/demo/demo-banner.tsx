import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

import { DemoResetButton } from "./demo-reset-button";

type DemoBannerProps = {
  className?: string;
};

export function DemoBanner({ className }: DemoBannerProps) {
  return (
    <aside
      aria-label="Demo information"
      data-tour="demo-banner"
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card px-4 py-3 text-card-foreground shadow-sm",
        "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-secondary",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/90 text-secondary-foreground">
            <Info aria-hidden="true" className="size-4" />
          </div>

          <div>
            <div className="min-w-0 space-y-1">
              <p className="text-sm leading-none font-semibold">Public demo</p>

              <p className="max-w-4xl text-sm leading-5 text-muted-foreground">
                You are viewing sample data. Changes in demo mode are temporary
                and will reset when the demo session ends.
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 pl-11 sm:pl-0">
          <DemoResetButton />
        </div>
      </div>
    </aside>
  );
}
