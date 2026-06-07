"use client";

import { useState } from "react";

export function useDemoRecordActions() {
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [deletingRecordId, setDeletingRecordId] = useState<string | null>(null);

  return {
    editingRecordId,
    deletingRecordId,
    startEditingRecord(recordId: string) {
      setEditingRecordId(recordId);
    },
    startDeletingRecord(recordId: string) {
      setDeletingRecordId(recordId);
    },
    closeEditingRecord() {
      setEditingRecordId(null);
    },
    closeDeletingRecord() {
      setDeletingRecordId(null);
    },
  };
}
