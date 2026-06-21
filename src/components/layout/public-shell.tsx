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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <header className="border-b border-border/70 motion-safe:animate-fade-in-down motion-safe:animate-duration-700">
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
              <Link href="/login">Log in</Link>
            </Button>

            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main
        id="main-content"
        className="min-h-screen bg-background text-foreground"
      >
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
