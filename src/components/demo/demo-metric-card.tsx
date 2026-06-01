import { Info } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DemoMetricCardProps = {
  title: string;
  value: string;
  description: string;
  variant?: "primary" | "secondary" | "muted" | "cost";
  density?: "default" | "compact";
  showSparklineSlot?: boolean;
  comparison?: {
    percentChange: number | null;
  };
  className?: string;
};

const variantStyles = {
  primary: {
    accent: "before:bg-primary",
    sparkline: "text-primary",
  },
  secondary: {
    accent: "before:bg-secondary",
    sparkline: "text-secondary",
  },
  muted: {
    accent: "before:bg-muted-foreground/40",
    sparkline: "text-muted-foreground",
  },
  cost: {
    accent: "before:bg-red-500/80",
    sparkline: "text-red-500 dark:text-red-400",
  },
};

export function DemoMetricCard({
  title,
  value,
  description,
  variant = "muted",
  density = "default",
  showSparklineSlot = false,
  comparison,
  className,
}: DemoMetricCardProps) {
  const styles = variantStyles[variant];
  const isCompact = density === "compact";

  return (
    <Card
      size="sm"
      className={cn(
        "relative overflow-hidden rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-accent/30",
        "before:absolute before:inset-y-0 before:left-0 before:w-1",
        styles.accent,
        className,
      )}
    >
      <CardContent className={cn("p-4 pl-5", isCompact && "py-3.5")}>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <span
              aria-hidden="true"
              className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-full text-muted-foreground"
            >
              <Info className="size-3.5" />
            </span>
          </div>

          <p
            className={cn(
              "text-2xl font-semibold tracking-tight text-card-foreground",
              !isCompact && "xl:text-3xl",
            )}
          >
            {value}
          </p>
        </div>

        <p
          className={cn(
            "mt-3 text-sm leading-5 text-muted-foreground",
            isCompact && "mt-2",
          )}
        >
          {description}
        </p>

        {showSparklineSlot ? (
          <div
            className={cn(
              "mt-3 h-9 w-full overflow-hidden rounded-md text-current",
              styles.sparkline,
            )}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 160 36"
              className="size-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 28 L12 26 L20 30 L31 20 L42 25 L54 17 L66 22 L78 15 L90 19 L104 10 L116 13 L130 7 L144 11 L160 4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                opacity="0.9"
              />
            </svg>
          </div>
        ) : null}

        {comparison ? (
          <p className="mt-2 text-xs text-muted-foreground">
            vs previous period{" "}
            {comparison.percentChange === null ? (
              <span>No previous data</span>
            ) : (
              <span
                className={cn(
                  "font-medium",
                  comparison.percentChange > 0 && "text-emerald-500",
                  comparison.percentChange < 0 && "text-red-500",
                  comparison.percentChange === 0 && "text-muted-foreground",
                )}
              >
                {comparison.percentChange > 0 ? "+" : ""}
                {comparison.percentChange}%
              </span>
            )}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
