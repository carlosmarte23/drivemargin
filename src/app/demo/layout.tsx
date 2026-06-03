import type { ReactNode } from "react";

import { DemoDataProvider } from "@/components/demo/demo-data-provider";
import { generateDemoData } from "@/data/demo/generateDemoData";

type DemoLayoutProps = {
  children: ReactNode;
};

export default function DemoLayout({ children }: DemoLayoutProps) {
  return (
    <DemoDataProvider initialData={generateDemoData()}>
      {children}
    </DemoDataProvider>
  );
}
