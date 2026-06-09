import { CheckCircle2, Info, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  type SessionSummary,
  type SessionSummaryInsight,
} from "@/lib/calculations/sessionSummary";
import { formatCurrencyFromCents } from "@/lib/formatters/money";
import { formatHours, formatMiles } from "@/lib/formatters/number";
import { cn } from "@/lib/utils";

function getInsightToneStyles(tone: SessionSummaryInsight["tone"]) {
  if (tone === "positive") {
    return {
      label: "Good",
      icon: CheckCircle2,
      container:
        "border-teal-500/25 bg-teal-500/10 text-teal-950 dark:text-teal-100",
      iconWrap:
        "border-teal-500/25 bg-teal-500/15 text-teal-700 dark:text-teal-300",
      badge:
        "border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300",
      description: "text-teal-950/70 dark:text-teal-100/70",
    };
  }

  if (tone === "warning") {
    return {
      label: "Review",
      icon: TriangleAlert,
      container:
        "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100",
      iconWrap:
        "border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300",
      badge:
        "border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300",
      description: "text-amber-950/75 dark:text-amber-100/75",
    };
  }

  return {
    label: "Note",
    icon: Info,
    container: "border-sky-500/20 bg-sky-500/10 text-sky-950 dark:text-sky-100",
    iconWrap: "border-sky-500/25 bg-sky-500/15 text-sky-700 dark:text-sky-300",
    badge: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    description: "text-sky-950/70 dark:text-sky-100/70",
  };
}

type SummaryMetricVariant = "primary" | "secondary" | "muted" | "cost";

const metricVariantStyles: Record<SummaryMetricVariant, string> = {
  primary: "before:bg-primary",
  secondary: "before:bg-secondary",
  muted: "before:bg-muted-foreground/40",
  cost: "before:bg-red-500/80",
};

type SessionSummaryDialogMode = "created" | "view";

type SessionSummaryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary: SessionSummary | null;
  mode: SessionSummaryDialogMode;
  onAddAnother?: () => void;
  onGoToDashboard?: () => void;
  onViewSessions?: () => void;
};

export function SessionSummaryDialog({
  open,
  onOpenChange,
  summary,
  mode,
  onAddAnother,
  onGoToDashboard,
  onViewSessions,
}: SessionSummaryDialogProps) {
  if (!summary) {
    return null;
  }

  const title = mode === "created" ? "Session created" : "Session summary";
  const description =
    mode === "created"
      ? "Profitability estimate for the session you just added."
      : "Profitability estimate for this work session.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] max-w-3xl grid-rows-none flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="shrink-0 border-b px-6 py-3 pr-12">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-8 py-4">
          <div className="mx-auto grid w-full max-w-4xl gap-3">
            <section className="grid gap-4 sm:grid-cols-2">
              <SummaryMetricItem
                label="Estimated net after fuel"
                value={formatCurrencyFromCents(
                  summary.estimatedNetAfterFuelCents,
                )}
                description="Period-level expenses are not included."
                variant="primary"
                size="featured"
              />

              <SummaryMetricItem
                label="Net per hour"
                value={formatCurrencyFromCents(summary.netPerHourCents)}
                description="Estimated hourly profit"
                variant="muted"
                size="featured"
              />

              <SummaryMetricItem
                label="Net per mile"
                value={formatCurrencyFromCents(summary.netPerMileCents)}
                description="Estimated profit per mile"
                variant="secondary"
                size="featured"
              />

              <SummaryMetricItem
                label="Estimated fuel cost"
                value={formatCurrencyFromCents(summary.estimatedFuelCostCents)}
                description="MPG + latest fuel price"
                variant="cost"
                size="featured"
              />
            </section>

            <section className="rounded-lg border bg-card/40 p-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      Session insights
                    </h3>

                    <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {summary.insights.length} notes
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Quick notes based on your goals and estimated fuel cost.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {summary.insights.map((insight) => (
                  <SummaryInsightItem key={insight.id} insight={insight} />
                ))}
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-3">
              <SummaryMetricItem
                label="Gross earnings"
                value={formatCurrencyFromCents(summary.grossEarningsCents)}
                description="Before estimated fuel"
                variant="muted"
              />

              <SummaryMetricItem
                label="Hours worked"
                value={formatHours(summary.hoursWorked)}
                description="Session duration"
                variant="muted"
              />

              <SummaryMetricItem
                label="Miles driven"
                value={formatMiles(summary.totalMiles)}
                description="Session mileage"
                variant="secondary"
              />
            </section>
          </div>
        </div>

        <DialogFooter className="shrink-0 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-end">
          {mode === "created" && onAddAnother ? (
            <Button type="button" onClick={onAddAnother}>
              Add another session
            </Button>
          ) : null}

          {onGoToDashboard ? (
            <Button type="button" onClick={onGoToDashboard}>
              Go to dashboard
            </Button>
          ) : null}

          {onViewSessions ? (
            <Button type="button" variant="outline" onClick={onViewSessions}>
              {mode === "view" ? "Go back" : "View all sessions"}
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type SummaryInsightItemProps = {
  insight: SessionSummaryInsight;
};

function SummaryInsightItem({ insight }: SummaryInsightItemProps) {
  const tone = getInsightToneStyles(insight.tone);
  const Icon = tone.icon;

  return (
    <div className={cn("rounded-lg border p-3", tone.container)}>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border",
            tone.iconWrap,
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium">{insight.title}</p>

            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                tone.badge,
              )}
            >
              {tone.label}
            </span>
          </div>

          <p className={cn("wrap-break-words mt-1 text-sm", tone.description)}>
            {insight.description}
          </p>
        </div>
      </div>
    </div>
  );
}

type SummaryMetricItemProps = {
  label: string;
  value: string;
  description?: string;
  variant?: SummaryMetricVariant;
  size?: "default" | "featured";
};

function SummaryMetricItem({
  label,
  value,
  description,
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
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <span
              aria-hidden="true"
              className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-full text-muted-foreground"
            >
              <Info className="size-3.5" />
            </span>
          </div>

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
      </CardContent>
    </Card>
  );
}
