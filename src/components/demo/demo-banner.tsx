import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

type DemoBannerProps = {
  className?: string;
};

export function DemoBanner({ className }: DemoBannerProps) {
  return (
    <aside
      aria-label="Demo information"
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card px-4 py-3 text-card-foreground shadow-sm",
        "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-secondary",
        className,
      )}
    >
      <div className="flex gap-3 pl-1">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/90 text-secondary-foreground">
          <Info className="size-4" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-sm font-medium">Public demo</p>

            <p className="max-w-3xl text-sm leading-5 text-muted-foreground">
              You are viewing sample data. Changes in demo mode are temporary
              and will reset when the demo session ends.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
