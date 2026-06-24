"use client";

import { Check, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const themeOptions = [
  {
    value: "system",
    label: "System",
    icon: Laptop,
  },
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
] as const;

type ThemeToggleProps = {
  triggerVariant?: "icon" | "menu-item";
};

export function ThemeToggle({ triggerVariant = "icon" }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();

  const currentTheme = theme ?? "system";
  const currentThemeOption =
    themeOptions.find((option) => option.value === currentTheme) ??
    themeOptions[0];
  const CurrentThemeIcon = currentThemeOption.icon;
  const isMenuItemTrigger = triggerVariant === "menu-item";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isMenuItemTrigger ? "ghost" : "outline"}
          size={isMenuItemTrigger ? "default" : "icon"}
          aria-label="Change theme"
          className={cn(
            isMenuItemTrigger
              ? "w-full justify-start gap-2 text-muted-foreground"
              : "relative overflow-hidden",
          )}
        >
          {isMenuItemTrigger ? (
            <>
              <CurrentThemeIcon className="size-4" />
              <span>Theme</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {currentThemeOption.label}
              </span>
            </>
          ) : (
            <>
              <Sun className="absolute size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={isMenuItemTrigger ? "start" : "end"}
        className="w-40"
      >
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = currentTheme === option.value;

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className="gap-2"
            >
              <Icon className="size-4" />
              <span>{option.label}</span>

              {isSelected ? <Check className="ml-auto size-4" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
