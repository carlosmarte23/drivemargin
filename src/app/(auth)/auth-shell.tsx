import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
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
        "mx-auto grid min-h-svh w-full items-center justify-center px-6 py-16 sm:py-20",
        showSidePanel
          ? "max-w-5xl gap-10 sm:grid-cols-[minmax(0,420px)_minmax(0,360px)] lg:gap-16"
          : "max-w-md grid-cols-1",
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-10 gap-2 sm:top-6 sm:left-6"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </Button>

      {showSidePanel ? (
        <aside className="hidden sm:block">
          <AuthSidePanel />
        </aside>
      ) : null}

      <section className="flex w-full justify-center">{children}</section>
    </main>
  );
}
