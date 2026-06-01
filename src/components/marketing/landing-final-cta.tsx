import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LandingFinalCta() {
  return (
    <section className="motion-safe:timeline-view motion-safe:animate-zoom-in motion-safe:animate-range-[entry_4%_cover_38%]">
      <div className="border-primary/35 bg-card/80 shadow-primary/10 relative overflow-hidden rounded-3xl border p-5 shadow-2xl sm:p-6 lg:p-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_16%_25%,--alpha(var(--primary)/22%),transparent_30%),radial-gradient(circle_at_86%_20%,--alpha(var(--primary)/14%),transparent_32%)]"
        />

        <div className="relative grid gap-6 text-center lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:text-left">
          <div
            aria-hidden="true"
            className="text-primary relative mx-auto h-28 w-36 shrink-0 lg:mx-0 lg:h-24 lg:w-[8.5rem]"
          >
            <div className="border-primary/30 bg-background/55 shadow-primary/10 absolute inset-0 rounded-3xl border shadow-lg backdrop-blur" />
            <div className="from-primary/0 via-primary to-primary/0 absolute inset-x-0 top-0 h-px bg-gradient-to-r" />

            <div className="absolute inset-3 flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-primary text-[0.62rem] leading-none font-medium">
                  Net margin
                </span>
                <span className="border-primary/25 bg-primary/10 text-primary rounded-full border px-1.5 py-0.5 text-[0.5rem] leading-none font-semibold">
                  +22%
                </span>
              </div>

              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <span className="text-foreground block text-xl leading-none font-semibold tracking-tight lg:text-lg">
                    $786
                  </span>
                  <span className="text-muted-foreground mt-1 block text-[0.52rem] leading-none">
                    after expenses
                  </span>
                </div>

                <div className="flex h-10 items-end gap-1">
                  <span className="bg-primary/30 h-4 w-1.5 rounded-full" />
                  <span className="bg-primary/55 h-6 w-1.5 rounded-full" />
                  <span className="bg-primary/45 h-5 w-1.5 rounded-full" />
                  <span className="bg-primary h-8 w-1.5 rounded-full" />
                </div>
              </div>

              <div className="mt-auto flex items-center gap-2">
                <span className="bg-primary shadow-primary/50 size-1.5 rounded-full shadow-md" />
                <span className="from-primary/80 to-primary/10 h-px flex-1 bg-linear-to-r" />
                <span className="border-primary/20 bg-primary/10 text-primary rounded-full border px-1.5 py-0.5 text-[0.5rem] leading-none font-medium">
                  $2.70/mi
                </span>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-xl lg:mx-0">
            <h2 className="text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl lg:text-2xl">
              Ready to see the real margin behind every delivery shift?
            </h2>

            <p className="text-muted-foreground mt-3 text-sm leading-6 sm:text-base lg:text-sm">
              Try the demo and explore DriveMargin with sample data.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:mx-auto sm:w-full sm:max-w-md sm:flex-row lg:mx-0 lg:w-auto lg:min-w-82 lg:justify-end">
            <Button
              className="w-full sm:flex-1 lg:min-w-40"
              size="lg"
              asChild
              aria-label="Try the app demo"
              title="App demo"
            >
              <Link href="/demo">
                Try demo
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button
              className="border-primary/35 bg-background/40 w-full sm:flex-1 lg:min-w-40"
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
