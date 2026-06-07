import { describe, expect, it } from "vitest";

import {
  getDashboardHref,
  getReturnToSiteLabel,
  getWorkspaceLabel,
  isNavItemActive,
} from "@/components/layout/app-navigation";

describe("app-navigation", () => {
  it("returns the dashboard href for demo and app contexts", () => {
    expect(getDashboardHref("/demo")).toBe("/demo");
    expect(getDashboardHref("/app")).toBe("/app/dashboard");
  });

  it("returns context labels for shared navigation chrome", () => {
    expect(getWorkspaceLabel("/demo")).toBe("Demo workspace");
    expect(getWorkspaceLabel("/app")).toBe("Driver dashboard");
    expect(getReturnToSiteLabel("/demo")).toBe("Back to site");
    expect(getReturnToSiteLabel("/app")).toBe("Back to public site");
  });

  it("matches exact and nested nav item routes", () => {
    expect(isNavItemActive("/demo", "/demo")).toBe(true);
    expect(isNavItemActive("/demo/sessions", "/demo")).toBe(false);
    expect(isNavItemActive("/demo/sessions", "/demo/sessions")).toBe(true);
    expect(isNavItemActive("/demo/sessions/new", "/demo/sessions")).toBe(true);
    expect(isNavItemActive("/demo/fuel", "/demo/sessions")).toBe(false);
  });
});
