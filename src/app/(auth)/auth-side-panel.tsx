import { BarChart3, ShieldCheck, Zap } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";

const benefits = [
  {
    icon: BarChart3,
    title: "Know what each shift is worth",
    description: "Compare earnings, miles, fuel, and expenses in one place.",
  },
  {
    icon: Zap,
    title: "Built around your real costs",
    description:
      "Track margin after fuel and operating expenses, not just gross pay.",
  },
  {
    icon: ShieldCheck,
    title: "Your data stays private",
    description: "Protected with Supabase Auth and row-level security.",
  },
];

export default function AuthSidePanel() {
  return (
    <aside className="flex w-full max-w-md flex-col items-start justify-center gap-5 p-2">
      <BrandLogo />

      <div className="flex flex-col gap-3">
        <h1 className="max-w-lg text-3xl leading-tight font-semibold">
          Know your <span className="text-primary">real margin</span> behind
          every delivery.
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          Track sessions, miles, fuel, and expenses so you can see what you
          actually keep after costs.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-card text-primary">
              <Icon className="size-4" />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-base leading-tight font-semibold">{title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        ))}

        <div className="relative grid w-full max-w-xs grid-cols-[1fr_auto] items-end gap-4 overflow-hidden rounded-xl border bg-card p-4">
          <div className="relative z-10 flex flex-col gap-1.5">
            <p className="text-xs text-muted-foreground">
              Estimated net earnings
            </p>
            <p className="text-3xl font-bold tracking-tight">$447.77</p>
            <p className="max-w-28 text-sm text-muted-foreground">
              After fuel and expenses
            </p>
          </div>

          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 180 56"
            preserveAspectRatio="none"
            className="h-14 w-28 text-primary"
            fill="none"
          >
            <line
              x1="0"
              x2="180"
              y1="42"
              y2="42"
              stroke="currentColor"
              strokeDasharray="2 2"
              opacity="0.2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M4 39 C17 39 17 34 30 34 C43 34 43 38 56 38 C69 38 69 26 82 26 C95 26 95 30 108 30 C121 30 121 16 134 16 C147 16 147 48 160 48 C173 48 173 31 176 31"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <ShieldCheck className="size-4" />
          Secure. Private. Built for your numbers.
        </p>
      </div>
    </aside>
  );
}
