import { Holiday } from "@/hooks/useHolidays";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";
import { ControlSwitch } from "../../components/ControlSwitch";

interface HolidaysControlProps {
  holidays: Holiday[];
}

export const HolidaysControl: React.FC<HolidaysControlProps> = ({
  holidays,
}) => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  const { publicHolidays, observances } = useMemo(() => {
    if (!holidays) return { publicHolidays: [], observances: [] };
    const publicHolidays = holidays.filter(
      (h) => !h.types || !h.types.includes("Observance")
    );
    const observances = holidays.filter(
      (h) => h.types && h.types.includes("Observance")
    );
    return { publicHolidays, observances };
  }, [holidays]);

  const hasData = holidays && holidays.length > 0;

  const helpContent = (
    <div className="space-y-4">
      <h4 className="font-semibold text-sm">
        Jours fériés & Fêtes du mois{" "}
        <span className="text-muted-foreground font-mono shrink-0">
          ({holidays?.length || 0})
        </span>
      </h4>
      <div className="space-y-6">
        {publicHolidays.length > 0 && (
          <div className="grid gap-2">
            <h5 className="font-semibold text-xs text-muted-foreground mb-1">
              Jours fériés ({publicHolidays.length})
            </h5>
            {publicHolidays.map((day, index) => (
              <div
                key={`holiday-${day.date}-${index}`}
                className="flex gap-2 text-sm"
              >
                <span className="text-muted-foreground font-mono shrink-0">
                  {new Date(day.date).getDate().toString().padStart(2, "0")}
                </span>
                <span className="text-primary leading-snug">
                  {day.localName}
                </span>
              </div>
            ))}
          </div>
        )}

        {observances.length > 0 && (
          <div className="grid gap-2">
            <h5 className="font-semibold text-xs text-muted-foreground mb-1">
              Fêtes et Événements ({observances.length})
            </h5>
            {observances.map((day, index) => (
              <div
                key={`observance-${day.date}-${index}`}
                className="flex gap-2 text-sm"
              >
                <span className="text-muted-foreground font-mono shrink-0">
                  {new Date(day.date).getDate().toString().padStart(2, "0")}
                </span>
                <span className="text-primary leading-snug">
                  {day.localName}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
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
          <div className="space-y-4">
            <ControlSwitch
              label="Jours fériés & Fêtes"
              checked={calendar.showHolidays}
              onCheckedChange={(checked) =>
                setCalendarConfig({ showHolidays: checked })
              }
              id="show-holidays"
              helpContent={helpContent}
            />

            <AnimatePresence>
              {calendar.showHolidays && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <ControlSwitch
                    label="Afficher les noms"
                    checked={calendar.showHolidayNames}
                    onCheckedChange={(checked) =>
                      setCalendarConfig({ showHolidayNames: checked })
                    }
                    id="show-holiday-names"
                    indent={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
