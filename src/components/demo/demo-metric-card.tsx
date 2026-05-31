import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DemoMetricCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "muted" | "cost";
  density?: "default" | "compact";
  className?: string;
};

const variantStyles = {
  primary: {
    accent: "before:bg-primary",
    icon: "bg-primary/10 text-primary ring-primary/20",
  },
  secondary: {
    accent: "before:bg-secondary",
    icon: "bg-secondary text-secondary-foreground ring-secondary/30",
  },
  muted: {
    accent: "before:bg-muted-foreground/40",
    icon: "bg-muted text-muted-foreground ring-border",
  },
  cost: {
    accent: "before:bg-red-500/80",
    icon: "bg-red-500/10 text-red-500 ring-red-500/20 dark:text-red-400 dark:ring-red-400/20",
  },
};

export function DemoMetricCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "muted",
  density = "default",
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
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <p
              className={cn(
                "text-2xl font-semibold tracking-tight text-card-foreground",
                !isCompact && "xl:text-3xl",
              )}
            >
              {value}
            </p>
          </div>

          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg ring-1",
              styles.icon,
            )}
          >
            <Icon className="size-4" />
          </div>
        </div>

        <p
          className={cn(
            "mt-3 text-sm leading-5 text-muted-foreground",
            isCompact && "mt-2",
          )}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
