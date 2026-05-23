import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto flex max-w-5xl justify-end">
        <ThemeToggle />
      </div>
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <p className="text-sm font-medium text-primary">DriveMargin</p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Know what you really earn after miles, fuel, and expenses.
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground">
          A fullstack profitability dashboard for multi-app delivery workers.
        </p>
      </section>
    </main>
  );
}
