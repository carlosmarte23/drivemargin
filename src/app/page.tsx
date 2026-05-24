import { PublicShell } from "@/components/layout/public-shell";

export default function Home() {
  return (
    <PublicShell>
      <section className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-16 sm:px-6">
        <p className="text-sm font-medium text-primary">DriveMargin</p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Know what you really earn after miles, fuel, and expenses.
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground">
          A fullstack profitability dashboard for multi-app delivery workers.
        </p>
      </section>
    </PublicShell>
  );
}
