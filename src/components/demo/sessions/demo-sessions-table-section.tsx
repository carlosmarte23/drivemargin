"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { useDemoData } from "@/components/demo/demo-data-provider";
import { DemoDeleteConfirmationDialog } from "@/components/demo/demo-delete-confirmation-dialog";
import { DemoSessionCreateAction } from "@/components/demo/sessions/demo-session-create-action";
import { DemoSessionFormSheet } from "@/components/demo/sessions/demo-session-form-sheet";
import {
  DemoSessionsTableCard,
  type DemoSessionsTableRow,
} from "@/components/demo/sessions/demo-sessions-table-card";
import { SessionSummaryDialog } from "@/components/demo/sessions/session-summary-dialog";
import { ViewSessionNotesDialog } from "@/components/demo/sessions/view-session-notes-dialog";
import { useDemoRecordActions } from "@/components/demo/use-demo-record-actions";
import {
  buildSessionSummary,
  type SessionSummary,
} from "@/lib/calculations/sessionSummary";
import { resolveDemoRecordsPeriod } from "@/lib/demo/demo-records-period";
import { deleteDemoSession } from "@/lib/demo/demo-session-mutations";
import {
  formatReportPeriodLabel,
  type ReportPeriodInput,
} from "@/lib/reporting/reportPeriod";
import type { EntityId } from "@/types/domain";

type DemoSessionsTableSectionProps = {
  query: ReportPeriodInput;
};

export function DemoSessionsTableSection({
  query,
}: DemoSessionsTableSectionProps) {
  const router = useRouter();
  const { demoData, setDemoData } = useDemoData();
  const resolvedPeriod = resolveDemoRecordsPeriod(demoData, "sessions", query);
  const { period } = resolvedPeriod;

  const {
    editingRecordId: editingSessionId,
    deletingRecordId: deletingSessionId,
    startEditingRecord: startEditingSession,
    startDeletingRecord: startDeletingSession,
    closeEditingRecord: closeEditingSession,
    closeDeletingRecord: closeDeletingSession,
  } = useDemoRecordActions();

  const [viewingNotesSessionId, setViewingNotesSessionId] = useState<
    string | null
  >(null);
  const [sessionSummary, setSessionSummary] = useState<SessionSummary | null>(
    null,
  );
  const [viewingSummarySessionId, setViewingSummarySessionId] = useState<
    string | null
  >(null);

  function calculateHoursWorked(startedAt: string, endedAt: string) {
    const startedAtTime = new Date(startedAt).getTime();
    const endedAtTime = new Date(endedAt).getTime();

    return Math.max((endedAtTime - startedAtTime) / 3_600_000, 0);
  }

  function formatDemoSessionsPeriodLabel(
    resolvedPeriod: ReturnType<typeof resolveDemoRecordsPeriod>,
  ): string {
    const formattedPeriod = formatReportPeriodLabel(resolvedPeriod.period);

    if (resolvedPeriod.mode === "all") {
      return `all demo sessions (${formattedPeriod})`;
    }

    return `this period (${formattedPeriod})`;
  }

  function handleOpenSessionSummary(sessionId: EntityId) {
    const session = demoData.sessions.find((item) => item.id === sessionId);
    const appEarnings = demoData.sessionAppEarnings.filter(
      (earning) => earning.sessionId === sessionId,
    );
    const sessionVehicle = demoData.vehicles.find((vehicle) => {
      return vehicle.id === session?.vehicleId;
    });

    if (!session || !sessionVehicle) {
      return;
    }

    const sessionSummary = buildSessionSummary({
      session,
      appEarnings,
      sessionVehicle,
      settings: demoData.settings,
      fuelPurchases: demoData.fuelPurchases,
    });

    setSessionSummary(sessionSummary);

    setViewingSummarySessionId(sessionId);
  }

  const rows = demoData.sessions
    .filter((session) => {
      return session.date >= period.startDate && session.date <= period.endDate;
    })
    .map((session): DemoSessionsTableRow => {
      const vehicle = demoData.vehicles.find((item) => {
        return item.id === session.vehicleId;
      });

      const earnings = demoData.sessionAppEarnings.filter((earning) => {
        return earning.sessionId === session.id;
      });

      const grossEarningsCents = earnings.reduce((total, earning) => {
        return total + earning.amountCents;
      }, 0);

      const appShortNames = earnings
        .map((earning) => {
          const workApp = demoData.workApps.find((app) => {
            return app.id === earning.workAppId;
          });

          return workApp?.shortName ?? workApp?.name;
        })
        .filter((appName): appName is string => {
          return Boolean(appName);
        });

      return {
        id: session.id,
        date: session.date,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        vehicleName: vehicle?.name ?? "Unknown vehicle",
        appShortNames,
        totalMiles: session.totalMiles,
        hoursWorked: calculateHoursWorked(session.startedAt, session.endedAt),
        grossEarningsCents,
        notes: session.notes,
      };
    })
    .sort((firstSession, secondSession) => {
      return secondSession.startedAt.localeCompare(firstSession.startedAt);
    });

  const notesSession = rows.find((session) => {
    return session.id === viewingNotesSessionId;
  });

  return (
    <>
      <DemoSessionsTableCard
        rows={rows}
        periodLabel={formatDemoSessionsPeriodLabel(resolvedPeriod)}
        onEditSession={startEditingSession}
        onDeleteSession={startDeletingSession}
        onViewSessionNotes={setViewingNotesSessionId}
        onViewSessionSummary={handleOpenSessionSummary}
      />

      <DemoSessionCreateAction />

      <ViewSessionNotesDialog
        notes={notesSession?.notes}
        open={viewingNotesSessionId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setViewingNotesSessionId(null);
          }
        }}
      />

      <DemoDeleteConfirmationDialog
        entityId={deletingSessionId}
        open={deletingSessionId !== null}
        title="Delete session?"
        description="This will remove the work session and its app earnings."
        onConfirmDelete={(sessionId) => {
          setDemoData((currentData) => {
            return deleteDemoSession(currentData, sessionId);
          });
          closeDeletingSession();
        }}
        onOpenChange={(open) => {
          if (!open) {
            closeDeletingSession();
          }
        }}
      />

      <DemoSessionFormSheet
        mode="edit"
        sessionId={editingSessionId}
        open={editingSessionId !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeEditingSession();
          }
        }}
      />

      <SessionSummaryDialog
        open={viewingSummarySessionId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setViewingSummarySessionId(null);
          }
        }}
        summary={sessionSummary}
        mode="view"
        onGoToDashboard={() => {
          router.push("/demo");
        }}
        onViewSessions={() => {
          setViewingSummarySessionId(null);
        }}
      />
    </>
  );
}
