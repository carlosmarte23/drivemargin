import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type DemoTableActionButtonProps = {
  label: string;
  tooltip: string;
  icon: LucideIcon;
  tone?: "primary" | "destructive";
  size?: "icon" | "icon-sm";
  onClick: () => void;
};

const toneClassNames = {
  primary: "hover:bg-primary/10 hover:text-primary",
  destructive: "hover:bg-destructive/10 hover:text-destructive",
};

export function DemoTableActionButton({
  label,
  tooltip,
  icon: Icon,
  tone = "primary",
  size = "icon",
  onClick,
}: DemoTableActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size={size}
          aria-label={label}
          className={cn(toneClassNames[tone])}
          onClick={onClick}
        >
          <Icon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
