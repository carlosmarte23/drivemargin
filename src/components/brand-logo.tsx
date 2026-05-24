import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

export function BrandLogo({
  className,
  iconClassName,
  textClassName,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className={cn("size-7 bg-primary", iconClassName)}
        style={{
          WebkitMask: "url(/icons/brand-mark.svg) center / contain no-repeat",
          mask: "url(/icons/brand-mark.svg) center / contain no-repeat",
        }}
      />

      <span
        className={cn(
          "font-heading text-lg leading-none font-semibold tracking-tight",
          textClassName,
        )}
      >
        <span className="text-foreground">Drive</span>
        <span className="text-primary">Margin</span>
      </span>
    </span>
  );
}
