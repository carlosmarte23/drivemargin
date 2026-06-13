import type { ReactNode } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type DemoFloatingActionButtonProps = {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  tourTarget?: string;
  className?: string;
};

export function DemoFloatingActionButton({
  label,
  onClick,
  icon = <Plus className="size-5" />,
  tourTarget,
  className,
}: DemoFloatingActionButtonProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon-lg"
            className={cn(
              "fixed right-6 bottom-6 z-40 size-12 rounded-full border border-primary/20 bg-primary text-primary-foreground hover:bg-primary-hover",
              className,
            )}
            data-tour={tourTarget}
            aria-label={label}
            onClick={onClick}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
