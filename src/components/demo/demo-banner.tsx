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
        "border-border bg-card text-card-foreground relative overflow-hidden rounded-2xl border p-4 shadow-sm",
        "before:bg-secondary before:absolute before:inset-y-0 before:left-0 before:w-1",
        className,
      )}
    >
      <div className="flex gap-3 pl-1">
        <div className="bg-secondary/90 text-secondary-foreground flex size-9 shrink-0 items-center justify-center rounded-xl">
          <Info className="size-4" />
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium">Public demo</p>

            <p className="text-muted-foreground max-w-3xl text-sm leading-6">
              You are viewing sample data. Changes in demo mode are temporary
              and will reset when the demo session ends.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
