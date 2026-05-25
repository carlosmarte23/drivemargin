import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LandingDashboardPreview } from "@/components/marketing/landing-dashboard-preview";

const appIcons = [
  { name: "Spark", icon: "/icons/spark.svg", color: "#0071dc" },
  { name: "DoorDash", icon: "/icons/doordash.svg", color: "#ff3008" },
  { name: "Uber Eats", icon: "/icons/uber-eats.svg", color: "#06c167" },
  { name: "Instacart", icon: "/icons/instacart.svg", color: "#43b02a" },
  { name: "Amazon Flex", icon: "/icons/amazon-flex.svg", color: "#00c2ff" },
];
export function LandingHero() {
  return (
    <section className="relative lg:h-[calc(100svh-4.4rem)] lg:overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-8 sm:px-6 lg:h-full lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-12 lg:py-[clamp(1.25rem,3svh,2rem)] xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="max-w-xl lg:pt-1">
          <div className="mb-5 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            In active development
          </div>

          <h1 className="text-balance text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-[clamp(3rem,3.1vw,3.35rem)]">
            Know what you <span className="text-primary">really earn</span>{" "}
            after miles, fuel, and expenses.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground lg:mt-[clamp(1rem,2svh,1.25rem)] xl:text-lg">
            DriveMargin helps multi-app delivery workers track shifts, split
            earnings by platform, estimate fuel costs, log expenses, and
            understand real profit per hour and per mile.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-[clamp(1.5rem,3svh,2rem)]">
            <Button asChild size="lg">
              <Link href="/demo">
                Try demo
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link
                href="https://github.com/carlosmarte23/drivemargin"
                target="_blank"
                rel="noreferrer"
              >
                <span
                  aria-hidden="true"
                  className="size-4 bg-current"
                  style={{
                    WebkitMask:
                      "url(/icons/github.svg) center / contain no-repeat",
                    mask: "url(/icons/github.svg) center / contain no-repeat",
                  }}
                />
                View on GitHub
              </Link>
            </Button>
          </div>

          <div className="mt-8 lg:mt-[clamp(1.25rem,3svh,2rem)]">
            <p className="text-sm text-muted-foreground">
              Built for multi-app delivery drivers
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              {appIcons.map((appIcon) => (
                <span
                  aria-label={appIcon.name}
                  className="group relative flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm shadow-primary/5 transition-transform duration-200 hover:scale-110"
                  key={appIcon.name}
                  role="img"
                  style={
                    {
                      "--app-icon-color": appIcon.color,
                    } as CSSProperties
                  }
                  title={appIcon.name}
                >
                  <span
                    aria-hidden="true"
                    className="size-5 bg-current transition-colors group-hover:bg-(--app-icon-color)"
                    style={{
                      WebkitMask: `url(${appIcon.icon}) center / contain no-repeat`,
                      mask: `url(${appIcon.icon}) center / contain no-repeat`,
                    }}
                  />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 scale-95 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
                  >
                    {appIcon.name}
                  </span>
                </span>
              ))}

              <span
                aria-label="More delivery apps"
                className="group relative inline-flex h-10 items-center rounded-xl border border-border bg-card px-3 text-sm text-muted-foreground shadow-sm shadow-primary/5 transition-all duration-200 hover:scale-110 hover:text-primary"
                role="img"
                title="More delivery apps"
              >
                + more
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 scale-95 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
                >
                  More delivery apps
                </span>
              </span>
            </div>
          </div>
        </div>

        <LandingDashboardPreview />
      </div>
    </section>
  );
}
