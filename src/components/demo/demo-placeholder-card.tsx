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
      className={cn("border-border bg-card rounded-2xl shadow-sm", className)}
    >
      <CardContent className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
        <div className="bg-muted text-muted-foreground ring-border mb-4 flex size-12 items-center justify-center rounded-2xl ring-1">
          <Icon className="size-5" />
        </div>

        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

        <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
