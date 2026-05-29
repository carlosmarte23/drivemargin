import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DemoPlaceholderCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

export function DemoPlaceholderCard({
  title,
  description,
  icon: Icon,
  className,
}: DemoPlaceholderCardProps) {
  return (
    <Card
      className={cn("rounded-2xl border-border bg-card shadow-sm", className)}
    >
      <CardContent className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground ring-1 ring-border">
          <Icon className="size-5" />
        </div>

        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
