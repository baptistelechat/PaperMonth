import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import {
  formatKeyForDisplay,
  ShortcutCategory,
  SHORTCUTS_CONFIG,
} from "@/constants/shortcuts";
import { ShortcutsDialogProps } from "@/types/shortcuts";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Keyboard,
  RotateCcw,
  Shuffle,
} from "lucide-react";
import React, { useMemo } from "react";

// Map keys to icons for display in the dialog
const SHORTCUT_ICONS: Record<string, React.ReactNode> = {
  prevMonth: <ArrowLeft className="size-4" />,
  nextMonth: <ArrowRight className="size-4" />,
  currentMonth: <Calendar className="size-4" />,
  random: <Shuffle className="size-4" />,
  reset: <RotateCcw className="size-4" />,
};

export const ShortcutsDialog: React.FC<ShortcutsDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const groupedShortcuts = useMemo(() => {
    const groups: Record<
      ShortcutCategory,
      Array<{
        id: string;
        label: string;
        keys: string[];
        icon: React.ReactNode;
      }>
    > = {
      Navigation: [],
      Actions: [],
    };

    Object.entries(SHORTCUTS_CONFIG).forEach(([id, config]) => {
      if (groups[config.category]) {
        groups[config.category].push({
          id,
          label: config.label,
          keys: config.keys,
          icon: SHORTCUT_ICONS[id],
        });
      }
    });

    return groups;
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="size-5" />
            Raccourcis clavier
          </DialogTitle>
          <DialogDescription>
            Liste des raccourcis disponibles pour naviguer plus rapidement.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {Object.entries(groupedShortcuts).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-muted-foreground border-b pb-1 text-sm font-medium">
                {category}
              </h4>
              <div className="grid gap-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.keys.map((key, index) => (
                        <React.Fragment key={key}>
                          {index > 0 && (
                            <span className="text-muted-foreground text-xs">
                              ou
                            </span>
                          )}
                          <Kbd>{formatKeyForDisplay(key)}</Kbd>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
