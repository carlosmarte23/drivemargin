"use client";

import { useState } from "react";

import { DemoFloatingActionButton } from "@/components/demo/demo-floating-action-button";
import { DemoFuelFormSheet } from "@/components/demo/fuel/demo-fuel-form-sheet";

export function DemoFuelCreateAction() {
  const [isCreatingFuelPurchase, setIsCreatingFuelPurchase] = useState(false);

  return (
    <>
      <DemoFloatingActionButton
        label="Add fuel purchase"
        onClick={() => setIsCreatingFuelPurchase(true)}
      />

      <DemoFuelFormSheet
        mode="create"
        open={isCreatingFuelPurchase}
        onOpenChange={setIsCreatingFuelPurchase}
      />
    </>
  );
}
