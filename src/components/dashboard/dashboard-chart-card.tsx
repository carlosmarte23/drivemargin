import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardChartCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function DashboardChartCard({
  title,
  description,
  children,
  className,
}: DashboardChartCardProps) {
  return (
    <Card className={cn("min-w-0", className)}>
      <CardContent className="min-w-0 p-3 sm:p-4">
        <div className="mb-2.5">
          <h2 className="text-base font-semibold text-card-foreground">
            {title}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        {children}
      </CardContent>
    </Card>
  );
}
