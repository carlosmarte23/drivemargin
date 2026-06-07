import { CurrentYear } from "@/components/current-year";

export function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex min-h-14 max-w-6xl flex-col justify-center gap-2 px-4 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          &copy; <CurrentYear /> DriveMargin. All rights reserved.
        </p>

        <p className="text-sm">
          A portfolio project currently in active development.
        </p>
      </div>
    </footer>
  );
}
