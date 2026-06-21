import { cn } from "@/lib/utils";

import AuthSidePanel from "./auth-side-panel";

export function AuthShell({
  showSidePanel = false,
  children,
}: {
  showSidePanel?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        "mx-auto grid min-h-svh w-full items-center justify-center px-6 py-6",
        showSidePanel
          ? "max-w-5xl gap-10 sm:grid-cols-[minmax(0,420px)_minmax(0,360px)] lg:gap-16"
          : "max-w-md grid-cols-1",
      )}
    >
      {showSidePanel ? (
        <aside className="hidden sm:block">
          <AuthSidePanel />
        </aside>
      ) : null}

      <section className="flex w-full justify-center">{children}</section>
    </main>
  );
}
