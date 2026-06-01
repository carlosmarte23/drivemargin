import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DemoMetricCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "muted";
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
};

export function DemoMetricCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "muted",
  className,
}: DemoMetricCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card
      className={cn(
        "border-border bg-card hover:bg-accent/30 relative overflow-hidden rounded-2xl shadow-sm transition-colors",
        "before:absolute before:inset-y-0 before:left-0 before:w-1",
        styles.accent,
        className,
      )}
    >
      <CardContent className="p-5 pl-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">{title}</p>

            <p className="text-card-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              {value}
            </p>
          </div>

          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl ring-1",
              styles.icon,
            )}
          >
            <Icon className="size-4" />
          </div>
        </div>

        <p className="text-muted-foreground mt-4 text-sm leading-6">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
