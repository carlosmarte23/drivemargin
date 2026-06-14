import type { Step } from "react-joyride";

import {
  getDemoTourSelector,
  getVisibleDemoTourTarget,
} from "@/components/demo/tour/demo-tour-target";

export const demoTourSteps = [
  {
    id: "welcome",
    target: "body",
    placement: "center",
    title: "Explore DriveMargin",
    content: (
      <>
        <strong>Explore DriveMargin</strong>
        <br />
        This short tour shows how the demo workspace tracks delivery profit,
        fuel cost, expenses, and work sessions.
      </>
    ),
  },
  {
    id: "demo-data",
    target: getDemoTourSelector("demo-banner"),
    title: "Temporary demo data",
    content:
      "The demo uses sample records. Any edits stay in this browser session and can be reset from here.",
  },
  {
    id: "period",
    target: getDemoTourSelector("demo-period-nav"),
    title: "Report period",
    content:
      "Use this control to move between weeks or choose a custom reporting range.",
    placement: "bottom",
  },
  {
    id: "metrics",
    target: getDemoTourSelector("dashboard-metrics"),
    title: "Profitability metrics",
    content:
      "These cards summarize gross earnings, estimated fuel cost, expenses, net earnings, hours, and miles for the active period.",
    placement: "bottom",
    scrollOffset: 120,
    spotlightPadding: 8,
  },
  {
    id: "charts",
    target: getDemoTourSelector("dashboard-charts"),
    title: "Trends and breakdowns",
    content:
      "Charts help compare earnings over time, gross versus costs, and which apps contributed revenue.",
    placement: "bottom",
    scrollOffset: 120,
    spotlightPadding: 8,
  },
  {
    id: "recent-sessions",
    target: getDemoTourSelector("recent-sessions"),
    title: "Work sessions",
    content:
      "DriveMargin treats a work session as the main unit of work. One session can include earnings from multiple delivery apps earned on the same period of time.",
  },
  {
    id: "add-session",
    target: getDemoTourSelector("add-session-action"),
    title: "Add a session",
    content:
      "Use this action to create a work session and review earnings, the estimated net per mile, hours after fuel and estimated fuel cost.",
    placement: "left",
  },
  {
    id: "navigation",
    target: () =>
      getVisibleDemoTourTarget("demo-sidebar-nav", "demo-mobile-nav-trigger"),
    title: "Demo sections",
    content:
      "Move between dashboard, sessions, fuel, expenses, and settings from the workspace navigation.",
    placement: "right",
  },
] satisfies Step[];
