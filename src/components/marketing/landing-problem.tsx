import { AlertTriangle } from "lucide-react";

export function LandingProblem() {
  return (
    <section className="motion-safe:timeline-view motion-safe:animate-fade-in-up motion-safe:animate-range-[entry_0%_cover_32%]">
      <div className="rounded-4xl border border-border bg-card/60 p-5 sm:p-6 lg:p-7">
        <div className="grid grid-cols-[auto_1fr] gap-x-5 lg:grid-cols-[auto_minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-x-6">
          <AlertTriangle className="mt-1 size-8 shrink-0 text-secondary sm:size-10 lg:mt-0 lg:size-14" />

          <div className="max-w-2xl lg:max-w-sm">
            <h2 className="text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Gross pay doesn&apos;t tell the full story.
            </h2>

            <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:hidden">
              Many drivers see a strong payout and think it was a good shift.
              But after miles, fuel, time, tolls, parking, and other expenses,{" "}
              <span className="font-medium text-secondary">
                the real number can be much lower.
              </span>
            </p>
          </div>

          <p className="hidden max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:block lg:justify-self-end">
            Many drivers see a strong payout and think it was a good shift. But
            after miles, fuel, time, tolls, parking, and other expenses,{" "}
            <span className="font-medium text-secondary">
              the real number can be much lower.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
