import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ViewSessionNotesDialogProps = {
  notes?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ViewSessionNotesDialog({
  notes,
  open,
  onOpenChange,
}: ViewSessionNotesDialogProps) {
  if (!notes?.trim()) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notes</DialogTitle>
          <DialogDescription className="whitespace-pre-wrap">
            {notes}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
