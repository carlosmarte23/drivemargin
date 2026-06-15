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
  icon = <Plus className="size-4 sm:size-5" />,
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
              "fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-40 size-10 rounded-full border border-primary/20 bg-primary text-primary-foreground hover:bg-primary-hover sm:right-6 sm:bottom-6 sm:size-12",
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
