import type { SessionSummary } from "@/lib/calculations/sessionSummary";
import { formatCurrencyFromCents } from "@/lib/formatters/money";
import { formatHours, formatMiles } from "@/lib/formatters/number";

import { SummaryInsightItem } from "./summary-insight-item";
import { SummaryMetricItem } from "./summary-metric-item";
import type { SessionSummaryDialogMode } from "./types";

type SessionSummaryDialogBodyProps = {
  summary: SessionSummary;
  mode: SessionSummaryDialogMode;
};

function getCreatedResultMessage(summary: SessionSummary) {
  const hasHourlyTarget = summary.insights.some((insight) => {
    return insight.id === "above-hourly-goal";
  });

  const hasMileageTarget = summary.insights.some((insight) => {
    return insight.id === "above-mileage-goal";
  });

  if (hasHourlyTarget && hasMileageTarget) {
    return "Strong session. You beat both profitability targets.";
  }

  if (hasHourlyTarget || hasMileageTarget) {
    return "Good session. One profitability target cleared.";
  }

  return "Session saved. Profitability needs review.";
}

export function SessionSummaryDialogBody({
  summary,
  mode,
}: SessionSummaryDialogBodyProps) {
  const resultMessage =
    summary.netPerHourCents >= 0 && summary.netPerMileCents >= 0
      ? getCreatedResultMessage(summary)
      : undefined;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-8 py-4">
      <div className="mx-auto grid w-full max-w-4xl gap-3">
        <SummaryMetricItem
          label="Estimated net after fuel"
          value={formatCurrencyFromCents(summary.estimatedNetAfterFuelCents)}
          description={
            mode === "created"
              ? resultMessage
              : "Period-level expenses are not included."
          }
          footnote={
            mode === "created"
              ? "Period-level expenses are not included."
              : undefined
          }
          variant="primary"
          size="featured"
        />

        <section className="grid gap-4 sm:grid-cols-3">
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
  );
}
