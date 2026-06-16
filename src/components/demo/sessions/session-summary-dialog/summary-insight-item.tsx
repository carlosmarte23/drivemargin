import { CheckCircle2, Info, TriangleAlert } from "lucide-react";

import type { SessionSummaryInsight } from "@/lib/calculations/sessionSummary";
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

type SummaryInsightItemProps = {
  insight: SessionSummaryInsight;
};

export function SummaryInsightItem({ insight }: SummaryInsightItemProps) {
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
