import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SummaryMetricVariant = "primary" | "secondary" | "muted" | "cost";

const metricVariantStyles: Record<SummaryMetricVariant, string> = {
  primary: "before:bg-primary",
  secondary: "before:bg-secondary",
  muted: "before:bg-muted-foreground/40",
  cost: "before:bg-red-500/80",
};

type SummaryMetricItemProps = {
  label: string;
  value: string;
  description?: string;
  footnote?: string;
  variant?: SummaryMetricVariant;
  size?: "default" | "featured";
};

export function SummaryMetricItem({
  label,
  value,
  description,
  footnote,
  variant = "muted",
  size = "default",
}: SummaryMetricItemProps) {
  const isFeatured = size === "featured";

  return (
    <Card
      size="sm"
      className={cn(
        "relative rounded-xl border-border bg-card shadow-sm transition-colors hover:bg-accent/30",
        "before:absolute before:inset-y-0 before:left-0 before:w-1",
        metricVariantStyles[variant],
      )}
    >
      <CardContent
        className={cn(
          "px-5 py-2 group-data-[size=sm]/card:px-5",
          isFeatured && "px-4 py-2 group-data-[size=sm]/card:px-6",
        )}
      >
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>

          <p
            className={cn(
              "wrap-break-words font-semibold tracking-tight text-card-foreground tabular-nums",
              isFeatured ? "text-3xl" : "text-2xl",
            )}
          >
            {value}
          </p>
        </div>

        {description ? (
          <p className="mt-3 text-sm leading-5 text-muted-foreground">
            {description}
          </p>
        ) : null}

        {footnote ? (
          <p className="mt-1 text-xs text-muted-foreground">{footnote}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
