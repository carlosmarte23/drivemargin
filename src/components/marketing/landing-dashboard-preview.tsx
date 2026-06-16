import Image from "next/image";

export function LandingDashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-3xl lg:max-w-176 xl:max-w-200 2xl:max-w-4xl">
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />
      <div className="absolute inset-x-24 -bottom-2 -z-10 h-8 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative rounded-4xl border border-primary/20 bg-card/80 p-2 shadow-2xl shadow-primary/15 backdrop-blur">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-primary/0 via-primary/45 to-primary/0"
        />

        <div className="rounded-xl border border-border bg-background">
          <Image
            src="/images/landing-dashboard-hero-preview.webp"
            alt="DriveMargin dashboard preview showing delivery earnings, fuel cost, miles, and net profit metrics."
            width={1280}
            height={999}
            priority
            sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 62vw, 58vw"
            className="block h-auto w-full rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
