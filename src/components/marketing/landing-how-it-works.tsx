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
    <section className="motion-safe:timeline-view motion-safe:animate-fade-in-up motion-safe:animate-range-[entry_0%_cover_38%]">
      <div className="border-border bg-card/40 rounded-4xl border p-5 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>

          <p className="text-muted-foreground mt-3 lg:hidden">
            A simple workflow for turning shift data into real profitability
            metrics.
          </p>
        </div>

        {/* Mobile / tablet accordion */}
        <div className="motion-safe:timeline-view motion-safe:animate-fade-in-up motion-safe:animate-range-[entry_0%_cover_28%] border-border bg-card/60 mt-6 overflow-hidden rounded-3xl border lg:hidden">
          {steps.map((item) => (
            <details
              key={item.step}
              className="group border-border border-b last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-4 [&::-webkit-details-marker]:hidden">
                <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                  {item.step}
                </span>

                <span className="flex-1 text-base font-semibold">
                  {item.title}
                </span>

                <ChevronDown className="text-muted-foreground size-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>

              <div className="px-4 pb-4 pl-18">
                <p className="text-muted-foreground text-sm leading-6">
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
                className={`motion-safe:timeline-view motion-safe:animate-fade-in-up ${revealRanges[index]} flex min-w-0 flex-1 items-start gap-5`}
              >
                <div className="relative shrink-0">
                  <span className="bg-primary text-primary-foreground shadow-primary/20 absolute -top-4 -left-4 z-10 flex size-10 items-center justify-center rounded-full text-base font-semibold shadow-lg">
                    {item.step}
                  </span>

                  <div className="border-primary/30 bg-primary/10 text-primary shadow-primary/10 flex size-20 items-center justify-center rounded-3xl border shadow-lg">
                    <item.icon className="size-9" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg leading-tight font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground mt-2 max-w-52 text-sm leading-6">
                    {item.description}
                  </p>
                </div>
              </article>

              {index < steps.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="text-primary/40 mt-8 flex w-16 shrink-0 items-center xl:w-20"
                >
                  <span className="border-primary/30 h-px flex-1 border-t border-dashed" />
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
