import { Card, CardContent } from "@/components/ui/card";
import type { MetricTrendChartPoint } from "@/lib/charts/dashboardChartData";
import { cn } from "@/lib/utils";

import { MetricSparkline } from "./metric-sparkline";

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  variant?: "primary" | "secondary" | "muted" | "cost";
  density?: "default" | "compact";
  sparklineData?: MetricTrendChartPoint[];
  comparison?: {
    percentChange: number | null;
  };
  badge?: {
    label: string;
    value: string;
    tone: "positive" | "warning" | "negative";
  };
  tourTarget?: string;
  className?: string;
};

type MetricComparison = NonNullable<MetricCardProps["comparison"]>;

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

const badgeToneStyles = {
  positive:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  warning:
    "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  negative: "border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400",
};

export function MetricCard({
  title,
  value,
  description,
  variant = "muted",
  density = "default",
  sparklineData,
  comparison,
  badge,
  tourTarget,
  className,
}: MetricCardProps) {
  const styles = variantStyles[variant];
  const isCompact = density === "compact";

  return (
    <Card
      data-tour={tourTarget}
      size="sm"
      className={cn(
        "relative overflow-hidden rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-accent/30",
        "before:absolute before:inset-y-0 before:left-0 before:w-1",
        styles.accent,
        className,
      )}
    >
      <CardContent
        className={cn(
          "px-4 py-3 group-data-[size=sm]/card:px-6",
          isCompact && "px-3 py-2",
        )}
      >
        <div
          className={cn(
            "grid gap-3",
            sparklineData &&
              "sm:grid-cols-[minmax(0,44%)_minmax(7rem,1fr)] sm:items-end",
            badge && "grid-cols-[minmax(0,1fr)_auto] items-start",
          )}
        >
          <div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-muted-foreground">
                  {title}
                </p>
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
                "mt-2 text-sm leading-5 text-pretty text-muted-foreground",
                isCompact && "mt-2",
              )}
            >
              {description}
            </p>
          </div>

          {badge ? (
            <div
              className={cn(
                "w-fit rounded-md border px-2.5 py-1.5 text-right text-xs font-medium",
                badgeToneStyles[badge.tone],
              )}
            >
              <p>{badge.label}</p>
              <p className="mt-0.5 opacity-80">{badge.value}</p>
            </div>
          ) : null}

          {sparklineData && !badge ? (
            <div
              className={cn(
                "h-12 w-full overflow-hidden rounded-md text-current sm:h-14",
                styles.sparkline,
              )}
              aria-hidden="true"
            >
              <MetricSparkline data={sparklineData} />
            </div>
          ) : null}
        </div>

        {comparison ? <MetricComparisonText comparison={comparison} /> : null}
      </CardContent>
    </Card>
  );
}

function MetricComparisonText({
  comparison,
}: {
  comparison: MetricComparison;
}) {
  return (
    <p className="mt-0.5 text-xs text-muted-foreground">
      vs previous period{" "}
      {comparison.percentChange === null ? (
        <span>No previous data</span>
      ) : (
        <span
          className={cn(
            "font-medium",
            getPercentChangeClassName(comparison.percentChange),
          )}
        >
          {formatPercentChange(comparison.percentChange)}
        </span>
      )}
    </p>
  );
}

function formatPercentChange(percentChange: number) {
  return `${percentChange > 0 ? "+" : ""}${percentChange}%`;
}

function getPercentChangeClassName(percentChange: number) {
  if (percentChange > 0) return "text-emerald-500";
  if (percentChange < 0) return "text-red-500";

  return "text-muted-foreground";
}
