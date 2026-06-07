import { Fragment } from "react";

import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  ClipboardList,
  Coins,
} from "lucide-react";

const steps = [
  {
    step: "1",
    title: "Log your shift",
    description:
      "Add date, start and end time, miles, and the apps you worked with.",
    icon: ClipboardList,
  },
  {
    step: "2",
    title: "Add earnings, fuel & expenses",
    description:
      "Enter earnings by app, fuel purchases, and any other work-related expenses.",
    icon: Coins,
  },
  {
    step: "3",
    title: "Review your real margin",
    description:
      "Get clear metrics, charts, and insights to understand your true profit.",
    icon: BarChart3,
  },
];

const revealRanges = [
  "motion-safe:animate-range-[entry_0%_cover_30%]",
  "motion-safe:animate-range-[entry_8%_cover_38%]",
  "motion-safe:animate-range-[entry_16%_cover_46%]",
];

export function LandingHowItWorks() {
  return (
    <section className="motion-safe:animate-fade-in-up motion-safe:animate-range-[entry_0%_cover_38%] motion-safe:timeline-view">
      <div className="rounded-4xl border border-border bg-card/40 p-5 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>

          <p className="mt-3 text-muted-foreground lg:hidden">
            A simple workflow for turning shift data into real profitability
            metrics.
          </p>
        </div>

        {/* Mobile / tablet accordion */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card/60 motion-safe:animate-fade-in-up motion-safe:animate-range-[entry_0%_cover_28%] motion-safe:timeline-view lg:hidden">
          {steps.map((item) => (
            <details
              key={item.step}
              className="group border-b border-border last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-4 [&::-webkit-details-marker]:hidden">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {item.step}
                </span>

                <span className="flex-1 text-base font-semibold">
                  {item.title}
                </span>

                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>

              <div className="px-4 pb-4 pl-18">
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Desktop timeline */}
        <div className="mt-8 hidden lg:flex lg:items-start lg:gap-6">
          {steps.map((item, index) => (
            <Fragment key={item.step}>
              <article
                className={`motion-safe:animate-fade-in-up motion-safe:timeline-view ${revealRanges[index]} flex min-w-0 flex-1 items-start gap-5`}
              >
                <div className="relative shrink-0">
                  <span className="absolute -top-4 -left-4 z-10 flex size-10 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20">
                    {item.step}
                  </span>

                  <div className="flex size-20 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10 text-primary shadow-lg shadow-primary/10">
                    <item.icon className="size-9" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg leading-tight font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-52 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </article>

              {index < steps.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="mt-8 flex w-16 shrink-0 items-center text-primary/40 xl:w-20"
                >
                  <span className="h-px flex-1 border-t border-dashed border-primary/30" />
                  <ArrowRight className="-ml-1 size-4" />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
