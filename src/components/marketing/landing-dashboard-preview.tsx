import Image from "next/image";

export function LandingDashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-3xl lg:max-w-176 xl:max-w-200 2xl:max-w-4xl">
      <div className="bg-primary/10 absolute inset-0 -z-10 rounded-[2rem] blur-3xl" />
      <div className="bg-primary/8 absolute inset-x-24 -bottom-2 -z-10 h-8 rounded-full blur-3xl" />

      <div className="border-primary/20 bg-card/80 shadow-primary/15 relative overflow-hidden rounded-4xl border p-2 shadow-2xl backdrop-blur">
        <div
          aria-hidden="true"
          className="from-primary/0 via-primary/45 to-primary/0 absolute inset-x-0 top-0 h-px bg-linear-to-r"
        />

        <div className="border-border bg-background overflow-hidden rounded-3xl border">
          <Image
            src="/images/landing-dashboard-preview.webp"
            alt="DriveMargin dashboard preview showing delivery earnings, fuel cost, miles, and net profit metrics."
            width={1280}
            height={640}
            priority
            sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 62vw, 58vw"
            className="h-auto w-full lg:max-h-[calc(100svh-10rem)] lg:object-contain"
          />
        </div>
      </div>
    </div>
  );
}
