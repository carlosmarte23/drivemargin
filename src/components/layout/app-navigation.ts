import { Clock, Fuel, LayoutDashboard, Receipt, Settings } from "lucide-react";

type AppNavBasePath = "/demo" | "/app";

function getDashboardHref(basePath: "/demo" | "/app") {
  return basePath === "/demo" ? "/demo" : "/app/dashboard";
}

export function getNavItems(basePath: AppNavBasePath) {
  return [
    {
      name: "Dashboard",
      href: getDashboardHref(basePath),
      icon: LayoutDashboard,
    },
    {
      name: "Sessions",
      href: `${basePath}/sessions`,
      icon: Clock,
    },
    {
      name: "Fuel",
      href: `${basePath}/fuel`,
      icon: Fuel,
    },
    {
      name: "Expenses",
      href: `${basePath}/expenses`,
      icon: Receipt,
    },
    {
      name: "Settings",
      href: `${basePath}/settings`,
      icon: Settings,
    },
  ];
}
