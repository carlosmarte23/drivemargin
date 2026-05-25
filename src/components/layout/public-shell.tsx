import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { CurrentYear } from "@/components/current-year";
import { Button } from "@/components/ui/button";

type PublicShellProps = {
  children: React.ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="motion-safe:animate-fade-in-down motion-safe:animate-duration-700 border-b border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="DriveMargin home">
              <BrandLogo />
            </Link>

            <div className="sm:hidden">
              <ThemeToggle />
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/demo">Try demo</Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link
                href="https://github.com/carlosmarte23/drivemargin"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Link>
            </Button>

            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-background text-foreground">
        <div className="px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:gap-12 lg:gap-14">
            {children}
          </div>
        </div>
      </main>

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
    </div>
  );
}
