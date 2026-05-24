import {
  Clock,
  Fuel,
  LayoutDashboard,
  Receipt,
  Settings,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    name: "Dashboard",
    href: "/demo",
    icon: LayoutDashboard,
  },
  {
    name: "Sessions",
    href: "/demo/sessions",
    icon: Clock,
  },
  {
    name: "Fuel",
    href: "/demo/fuel",
    icon: Fuel,
  },
  {
    name: "Expenses",
    href: "/demo/expenses",
    icon: Receipt,
  },
  {
    name: "Settings",
    href: "/demo/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <aside className="fixed hidden inset-y-0 left-0 w-64 border-r border-border/70 bg-card lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b border-border/70 px-5">
        <Link href="/demo" className="text-lg font-semibold tracking-tight">
          DriveMargin
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              variant="ghost"
              className="justify-start gap-2"
              asChild
            >
              <Link href={item.href}>
                <Icon className="size-4" />
                {item.name}
              </Link>
            </Button>
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
            Back to site
          </Link>
        </Button>
      </div>
    </aside>
  );
}
