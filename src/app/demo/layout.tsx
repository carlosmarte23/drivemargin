import type { ReactNode } from "react";

import { DemoDataProvider } from "@/components/demo/demo-data-provider";
import { DemoTourProvider } from "@/components/demo/tour/demo-tour-provider";
import { generateDemoData } from "@/data/demo/generateDemoData";

type DemoLayoutProps = {
  children: ReactNode;
};

export default function DemoLayout({ children }: DemoLayoutProps) {
  return (
    <DemoDataProvider initialData={generateDemoData()}>
      <DemoTourProvider>{children}</DemoTourProvider>
    </DemoDataProvider>
  );
}
