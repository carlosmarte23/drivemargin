import { Clock, Fuel, LayoutDashboard, Receipt, Settings } from "lucide-react";

export type AppNavBasePath = "/demo" | "/app";

export function getDashboardHref(basePath: AppNavBasePath) {
  return basePath === "/demo" ? "/demo" : "/app/dashboard";
}

export function getWorkspaceLabel(basePath: AppNavBasePath) {
  return basePath === "/demo" ? "Demo workspace" : "Driver dashboard";
}

export function getReturnToSiteLabel(basePath: AppNavBasePath) {
  return basePath === "/demo" ? "Back to site" : "Back to public site";
}

export function isNavItemActive(pathname: string, href: string) {
  return href === "/demo"
    ? pathname === "/demo"
    : pathname === href || pathname.startsWith(`${href}/`);
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
