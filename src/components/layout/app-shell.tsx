import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

type AppShellProps = {
  children: React.ReactNode;
  basePath?: "/demo" | "/app";
  workspaceLabel?: string;
};

export function AppShell({
  children,
  basePath = "/demo",
  workspaceLabel = "Demo workspace",
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppSidebar basePath={basePath} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <MobileNav />

              <p className="text-sm font-medium text-muted-foreground">
                {workspaceLabel}
              </p>
            </div>

            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
