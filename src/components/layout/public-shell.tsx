import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { Footer } from "@/components/layout/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

type PublicShellProps = {
  children: React.ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <header className="motion-safe:animate-fade-in-down motion-safe:animate-duration-700 border-border/70 border-b">
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
            <Button
              variant="ghost"
              size="sm"
              asChild
              aria-label="Try the app demo"
              title="App demo"
            >
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

      <main className="bg-background text-foreground min-h-screen">
        <div className="px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:gap-12 lg:gap-14">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
