import type { ReportPeriod } from "@/lib/reporting/reportPeriod";

import { generateDemoData } from "@/data/demo/generateDemoData";
import { calculateDashboardMetrics } from "@/lib/calculations/index";

function isDateInPeriod(date: string, period: ReportPeriod) {
  return date >= period.startDate && date <= period.endDate;
}

export function getDemoDashboardData(period: ReportPeriod) {
  const data = generateDemoData();

  const periodSessions = data.sessions.filter((session) => {
    return isDateInPeriod(session.date, period);
  });

  const periodSessionsIds = new Set(
    periodSessions.map((session) => session.id),
  );

  const periodSessionAppEarnings = data.sessionAppEarnings.filter((earning) => {
    return periodSessionsIds.has(earning.sessionId);
  });

  const periodExpenses = data.expenses.filter((expense) => {
    return isDateInPeriod(expense.date, period);
  });

  const periodFuelPurchases = data.fuelPurchases.filter((purchase) => {
    return isDateInPeriod(purchase.date, period);
  });

  const metrics = calculateDashboardMetrics({
    sessions: periodSessions,
    sessionAppEarnings: periodSessionAppEarnings,
    fuelPurchases: periodFuelPurchases,
    expenses: periodExpenses,
    workApps: data.workApps,
    vehicles: data.vehicles,
    settings: data.settings,
  });

  return metrics;
}
