import { PublicShell } from "@/components/layout/public-shell";

export default function HomePage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">DriveMargin</h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Landing design will be defined in a later phase.
        </p>
      </div>
    </PublicShell>
  );
}
