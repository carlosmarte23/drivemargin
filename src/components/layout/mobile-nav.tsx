import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function MobileNav() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="lg:hidden"
      aria-label="Open navigation menu"
      title="Mobile navigation placeholder"
    >
      {/* Mobile drawer will be wired in a later phase. */}
      <Menu className="size-4" />
    </Button>
  );
}
