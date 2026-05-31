import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

type AppShellProps = {
  children: React.ReactNode;
  basePath?: "/demo" | "/app";
  pageLabel?: string;
  headerContent?: React.ReactNode;
};

export function AppShell({
  children,
  basePath = "/demo",
  pageLabel = "Dashboard",
  headerContent,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppSidebar basePath={basePath} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
          <div className="flex min-h-16 flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <MobileNav basePath={basePath} />

                <p className="text-sm font-medium text-muted-foreground">
                  {pageLabel}
                </p>
              </div>

              <div className="lg:hidden">
                <ThemeToggle />
              </div>
            </div>

            {headerContent ? (
              <div className="flex w-full justify-center lg:w-auto lg:flex-1 lg:justify-center">
                {headerContent}
              </div>
            ) : null}

            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
