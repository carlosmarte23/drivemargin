"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getNavItems } from "@/components/layout/app-navigation";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  basePath?: "/demo" | "/app";
};

import { ArrowLeft } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";

export function AppSidebar({ basePath = "/demo" }: AppSidebarProps) {
  const pathname = usePathname();
  const navItems = getNavItems(basePath);

  const isDemo = basePath === "/demo";

  const footerLabel = isDemo ? "Back to site" : "Back to public site";

  return (
    <aside className="fixed hidden inset-y-0 left-0 w-64 border-r border-border/70 bg-card lg:flex lg:flex-col">
      <div className="flex flex-col gap-2 border-b p-4">
        <BrandLogo />

        <p className="truncate text-xs text-muted-foreground">
          {isDemo ? "Demo workspace" : "Driver dashboard"}
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/demo"
              ? pathname === "/demo"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.name}
              className={cn(
                "flex flex-row items-center gap-3 rounded-lg px-3 py-2 text-sm",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/70 p-3">
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
      </div>
    </aside>
  );
}
