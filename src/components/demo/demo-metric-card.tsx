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
        "border-border bg-card hover:bg-accent/30 relative overflow-hidden rounded-xl shadow-sm transition-colors",
        "before:absolute before:inset-y-0 before:left-0 before:w-1",
        styles.accent,
        className,
      )}
    >
      <CardContent className={cn("p-4 pl-5", isCompact && "py-3.5")}>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <span
              aria-hidden="true"
              className="text-muted-foreground inline-flex size-3.5 shrink-0 items-center justify-center rounded-full"
            >
              <Info className="size-3.5" />
            </span>
          </div>

          <p
            className={cn(
              "text-card-foreground text-2xl font-semibold tracking-tight",
              !isCompact && "xl:text-3xl",
            )}
          >
            {value}
          </p>
        </div>

        <p
          className={cn(
            "text-muted-foreground mt-3 text-sm leading-5",
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
          <p className="text-muted-foreground mt-2 text-xs">
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
