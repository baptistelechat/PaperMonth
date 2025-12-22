import { ScrollArea } from "@/components/ui/scroll-area";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { getWorldDaysForYear } from "@/utils/worldDays";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";
import { ControlSwitch } from "../../components/ControlSwitch";

export const WorldDaysControl: React.FC = () => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  const worldDaysInMonth = useMemo(() => {
    const allWorldDays = getWorldDaysForYear(calendar.year);
    const monthPrefix = `${calendar.year}-${String(calendar.month + 1).padStart(
      2,
      "0"
    )}`;

    return allWorldDays
      .filter((day) => day.date.startsWith(monthPrefix))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [calendar.month, calendar.year]);

  const hasData = worldDaysInMonth.length > 0;

  const helpContent = (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">
        Journées Mondiales du mois{" "}
        <span className="text-muted-foreground shrink-0 font-mono">
          ({worldDaysInMonth.length})
        </span>
      </h4>
      <ScrollArea className="h-72 w-full pr-4">
        <div className="grid gap-2">
          {worldDaysInMonth.map((day, index) => (
            <div
              key={`${day.date}-${index}`}
              className="flex gap-2 text-sm"
            >
              <span className="text-muted-foreground shrink-0 font-mono">
                {new Date(day.date)
                  .getDate()
                  .toString()
                  .padStart(2, "0")}
              </span>
              <span className="text-primary leading-snug">
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <AnimatePresence>
      {hasData && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <ControlSwitch
            label="Journées Mondiales"
            checked={calendar.showWorldDays}
            onCheckedChange={(checked) =>
              setCalendarConfig({ showWorldDays: checked })
            }
            id="show-world-days"
            helpContent={helpContent}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
