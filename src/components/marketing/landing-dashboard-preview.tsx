import Image from "next/image";

export function LandingDashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-3xl lg:-mr-6 lg:w-[calc(100%+1.5rem)] lg:max-w-none lg:justify-self-end xl:-mr-10 xl:w-[calc(100%+2.5rem)]">
      <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-primary/10 blur-3xl lg:-inset-7" />

      <div className="rounded-4xl border border-border bg-card/80 p-2 shadow-2xl shadow-primary/10 backdrop-blur">
        <div className="overflow-hidden rounded-3xl border border-border bg-background">
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
