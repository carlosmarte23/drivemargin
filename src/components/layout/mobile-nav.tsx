"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowLeft, LogOut, Menu } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import {
  getNavItems,
  getReturnToSiteLabel,
  getWorkspaceLabel,
  isNavItemActive,
} from "@/components/layout/app-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logout } from "@/features/auth/actions";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  basePath?: "/demo" | "/app";
  userDisplayName?: string | null;
};

export function MobileNav({
  basePath = "/demo",
  userDisplayName,
}: MobileNavProps) {
  const pathname = usePathname();
  const navItems = getNavItems(basePath);
  const workspaceLabel = getWorkspaceLabel(basePath);
  const footerLabel = getReturnToSiteLabel(basePath);
  const displayName = userDisplayName?.trim();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          data-tour="demo-mobile-nav-trigger"
          aria-label="Open navigation menu"
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex h-dvh flex-col gap-0 p-0">
        <SheetHeader className="border-b border-border/70 p-4 pr-12">
          <SheetTitle asChild>
            <div className="space-y-4">
              <BrandLogo />

              <div className="rounded-lg border border-border/70 bg-muted/40 p-3">
                <p className="text-xs font-normal text-muted-foreground">
                  {workspaceLabel}
                </p>

                {displayName ? (
                  <p className="mt-1 truncate text-sm font-medium text-foreground">
                    {displayName}
                  </p>
                ) : null}
              </div>
            </div>
          </SheetTitle>

          <SheetDescription className="sr-only">
            Navigate between DriveMargin sections.
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive = isNavItemActive(pathname, item.href);

            return (
              <SheetClose
                asChild
                key={item.href}
                className={cn(
                  "flex flex-row items-center gap-3 rounded-lg px-3 py-2 text-sm",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Link key={item.href} href={item.href}>
                  <Icon className="size-4" />
                  {item.name}
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <SheetFooter className="border-t border-border/70 p-3">
          <div className="flex flex-col gap-1">
            <ThemeToggle triggerVariant="menu-item" />

            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-muted-foreground"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="size-4" />
                {footerLabel}
              </Link>
            </Button>

            {basePath === "/app" ? (
              <form action={logout} className="pt-2">
                <Button
                  type="submit"
                  variant="destructive"
                  className="w-full justify-center gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </form>
            ) : null}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
