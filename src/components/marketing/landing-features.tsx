import {
  ChevronDown,
  Fuel,
  LineChart,
  MapPinned,
  ReceiptText,
} from "lucide-react";

const features = [
  {
    title: "Track multi-app shifts",
    description:
      "Log a complete shift with all the apps you drove for in one place.",
    icon: MapPinned,
  },
  {
    title: "Estimate fuel impact",
    description:
      "Calculate estimated fuel costs based on miles, MPG, and gas price.",
    icon: Fuel,
  },
  {
    title: "Understand net performance",
    description:
      "See net earnings, net per hour, and net per mile at a glance.",
    icon: LineChart,
  },
  {
    title: "Review expenses and insights",
    description:
      "Track costs and get simple insights to understand your real margin.",
    icon: ReceiptText,
  },
];

const revealRanges = [
  "motion-safe:animate-range-[entry_0%_cover_30%]",
  "motion-safe:animate-range-[entry_6%_cover_36%]",
  "motion-safe:animate-range-[entry_12%_cover_42%]",
  "motion-safe:animate-range-[entry_18%_cover_48%]",
];

export function LandingFeatures() {
  return (
    <section>
      <div>
        <header className="mx-auto max-w-2xl text-center motion-safe:animate-fade-in-up motion-safe:animate-range-[entry_0%_cover_30%] motion-safe:timeline-view">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to understand your real margin
          </h2>
          <p className="mt-3 text-muted-foreground">
            DriveMargin focuses on the metrics that actually explain whether a
            delivery shift was worth it.
          </p>
        </header>

        {/* Mobile  */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card/60 motion-safe:animate-fade-in-up motion-safe:animate-range-[entry_0%_cover_28%] motion-safe:timeline-view md:hidden">
          {features.map((feature) => (
            <details
              key={feature.title}
              className="group border-b border-border last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-4 [&::-webkit-details-marker]:hidden">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>

                <span className="flex-1 text-base font-semibold">
                  {feature.title}
                </span>

                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>

              <div className="px-4 pb-4 pl-18">
                <p className="text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Desktop */}
        <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`motion-safe:animate-fade-in-up motion-safe:timeline-view ${revealRanges[index]} rounded-4xl border border-border bg-card/60 p-5 lg:p-6`}
            >
              <div className="mb-4 inline-flex rounded-2xl border border-primary/30 bg-primary/10 p-3 text-primary">
                <feature.icon className="size-6" />
              </div>

              <h3 className="text-lg font-semibold">{feature.title}</h3>

              <p className="text-sm leading-5 text-muted-foreground lg:leading-6">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
