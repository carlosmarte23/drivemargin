import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LandingFinalCta() {
  return (
    <section className="motion-safe:timeline-view motion-safe:animate-zoom-in motion-safe:animate-range-[entry_4%_cover_38%]">
      <div className="relative overflow-hidden rounded-3xl border border-primary/35 bg-card/80 p-5 shadow-2xl shadow-primary/10 sm:p-6 lg:p-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_16%_25%,--alpha(var(--primary)/22%),transparent_30%),radial-gradient(circle_at_86%_20%,--alpha(var(--primary)/14%),transparent_32%)]"
        />

        <div className="relative grid gap-6 text-center lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:text-left">
          <div
            aria-hidden="true"
            className="relative mx-auto h-28 w-36 shrink-0 text-primary lg:mx-0 lg:h-24 lg:w-[8.5rem]"
          >
            <div className="absolute inset-0 rounded-3xl border border-primary/30 bg-background/55 shadow-lg shadow-primary/10 backdrop-blur" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

            <div className="absolute inset-3 flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[0.62rem] leading-none font-medium text-primary">
                  Net margin
                </span>
                <span className="rounded-full border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[0.5rem] leading-none font-semibold text-primary">
                  +22%
                </span>
              </div>

              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <span className="block text-xl leading-none font-semibold tracking-tight text-foreground lg:text-lg">
                    $786
                  </span>
                  <span className="mt-1 block text-[0.52rem] leading-none text-muted-foreground">
                    after expenses
                  </span>
                </div>

                <div className="flex h-10 items-end gap-1">
                  <span className="h-4 w-1.5 rounded-full bg-primary/30" />
                  <span className="h-6 w-1.5 rounded-full bg-primary/55" />
                  <span className="h-5 w-1.5 rounded-full bg-primary/45" />
                  <span className="h-8 w-1.5 rounded-full bg-primary" />
                </div>
              </div>

              <div className="mt-auto flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary shadow-md shadow-primary/50" />
                <span className="h-px flex-1 bg-linear-to-r from-primary/80 to-primary/10" />
                <span className="rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[0.5rem] leading-none font-medium text-primary">
                  $2.70/mi
                </span>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-xl lg:mx-0">
            <h2 className="text-balance text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-2xl">
              Ready to see the real margin behind every delivery shift?
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base lg:text-sm">
              Try the demo and explore DriveMargin with sample data.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:mx-auto sm:w-full sm:max-w-md sm:flex-row lg:mx-0 lg:w-auto lg:min-w-82 lg:justify-end">
            <Button className="w-full sm:flex-1 lg:min-w-40" size="lg" asChild>
              <Link href="/demo">
                Try demo
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button
              className="w-full border-primary/35 bg-background/40 sm:flex-1 lg:min-w-40"
              variant="outline"
              size="lg"
              asChild
            >
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
        </div>
      </div>
    </section>
  );
}
