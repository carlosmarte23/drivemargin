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
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logout } from "@/features/auth/actions";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  basePath?: "/demo" | "/app";
};

export function MobileNav({ basePath = "/demo" }: MobileNavProps) {
  const pathname = usePathname();
  const navItems = getNavItems(basePath);
  const workspaceLabel = getWorkspaceLabel(basePath);
  const footerLabel = getReturnToSiteLabel(basePath);

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

      <SheetContent side="left" className="flex h-dvh flex-col p-0">
        <SheetHeader>
          <SheetTitle>
            <div className="flex flex-col gap-2 border-b p-4">
              <BrandLogo />

              <p className="truncate text-xs text-muted-foreground">
                {workspaceLabel}
              </p>
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

        <div className="mt-auto border-t border-border/70 p-3">
          <div className="flex flex-col gap-1">
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
              <form action={logout}>
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full justify-start gap-2 text-muted-foreground"
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </form>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
