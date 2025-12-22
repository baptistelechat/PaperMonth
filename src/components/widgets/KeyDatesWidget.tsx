import { Holiday, SchoolHoliday } from "@/hooks/useHolidays";
import { formatEventLabel } from "@/utils/textFormatting";
import { WorldDay } from "@/utils/worldDays";
import React, { useMemo } from "react";
import { EventTooltip } from "../shared/EventTooltip";
import { WidgetTitle } from "./WidgetTitle";
import { cn } from "@/lib/utils";

interface KeyDatesWidgetProps {
  holidays: Holiday[];
  schoolHolidays: SchoolHoliday[];
  worldDays: WorldDay[];
  currentMonth: number;
  currentYear: number;
  fontFamily?: string;
  textColor?: "light" | "dark";
}

interface EventItem {
  date: string;
  day: number;
  label: string;
  originalLabel: string;
  type: "holiday" | "observance" | "world" | "school-holiday";
  isWeek: boolean;
}

export const KeyDatesWidget: React.FC<KeyDatesWidgetProps> = ({
  holidays,
  schoolHolidays,
  worldDays,
  currentMonth,
  currentYear,
  textColor = "light",
}) => {
  const events = useMemo(() => {
    const monthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}`;

    const items: EventItem[] = [];

    // Filter and add holidays
    holidays.forEach((h) => {
      if (h.date.startsWith(monthPrefix)) {
        const isObservance = h.types && h.types.includes("Observance");
        items.push({
          date: h.date,
          day: new Date(h.date).getDate(),
          label: formatEventLabel(h.localName),
          originalLabel: h.localName,
          type: isObservance ? "observance" : "holiday",
          isWeek: h.localName.toLowerCase().includes("semaine"),
        });
      }
    });

    // Filter and add school holidays
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0);
    const addedSchoolHolidays = new Set<string>();

    schoolHolidays.forEach((sh) => {
      const startDate = new Date(sh.start_date);
      // Adjust end date (dataset end date is return date, so holiday ends the day before)
      const endDate = new Date(sh.end_date);
      endDate.setDate(endDate.getDate() - 1);

      const uniqueKey = `${sh.start_date}-${sh.end_date}-${sh.description}`;

      // Check overlap and uniqueness
      if (
        startDate <= monthEnd &&
        endDate >= monthStart &&
        !addedSchoolHolidays.has(uniqueKey)
      ) {
        addedSchoolHolidays.add(uniqueKey);
        const startStr = startDate.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        });
        const endStr = endDate.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        });

        // Determine sorting day: start of holiday or 1st of month
        const sortDay = startDate < monthStart ? 1 : startDate.getDate();

        items.push({
          date: sh.start_date,
          day: sortDay,
          label: sh.description || "Vacances scolaires",
          originalLabel: `${
            sh.description || "Vacances scolaires"
          } du ${startStr} au ${endStr}`,
          type: "school-holiday",
          isWeek: false,
        });
      }
    });

    // Filter and add world days
    worldDays.forEach((w) => {
      if (w.date.startsWith(monthPrefix)) {
        items.push({
          date: w.date,
          day: new Date(w.date).getDate(),
          label: formatEventLabel(w.label),
          originalLabel: w.label,
          type: "world",
          isWeek: w.label.toLowerCase().includes("semaine"),
        });
      }
    });

    // Sort by date
    const sorted = items.sort((a, b) => a.day - b.day);

    // We keep all items, the grid will handle the overflow if necessary
    // or we can adjust the grid layout dynamically
    return { items: sorted, count: sorted.length };
  }, [holidays, schoolHolidays, worldDays, currentMonth, currentYear]);

  const textClass = textColor === "dark" ? "text-black" : "text-white";
  const mutedClass = textColor === "dark" ? "text-black/50" : "text-white/50";

  // Calculate optimal layout based on number of items
  // Max 9 rows per column to maximize vertical space usage
  const rows = 9;
  const cols = Math.ceil(events.count / rows);

  // We use inline style for grid-template-columns to ensure uniform width
  // because Tailwind's grid-cols-* only sets the template for explicit columns
  // and implicit columns (created by grid-flow-col) are auto-sized.

  return (
    <div className="h-full flex flex-col">
      <WidgetTitle title="Dates clés" textColor={textColor} />

      <div className="flex-1 w-full">
        <div
          className="grid gap-x-6 gap-y-1 grid-flow-col h-full content-start text-sm"
          style={{
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${Math.max(2, cols)}, minmax(0, 1fr))`,
          }}
        >
          {events.items.length > 0 ? (
            events.items.map((event, index) => (
              <EventTooltip
                key={`${event.date}-${index}`}
                align="start"
                events={[
                  {
                    label: event.originalLabel,
                    type: event.type,
                  },
                ]}
              >
                <div
                  className={cn(
                    "flex gap-2 items-baseline group cursor-help",
                    events.count > 9 ? "text-sm" : "text-lg"
                  )}
                >
                  <span
                    className={cn("font-mono font-bold shrink-0", textClass)}
                  >
                    {event.day.toString().padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "leading-snug transition-colors line-clamp-1",
                      event.type === "holiday"
                        ? cn("font-bold", textClass)
                        : event.type === "observance"
                        ? cn("font-medium italic", textClass)
                        : event.type === "school-holiday"
                        ? cn("font-medium opacity-90", textClass)
                        : mutedClass,
                      event.isWeek && "underline decoration-current",
                      `group-hover:${textClass}`
                    )}
                  >
                    {event.label}
                  </span>
                </div>
              </EventTooltip>
            ))
          ) : (
            <div className={cn("text-lg italic", mutedClass)}>
              Aucune date clé ce mois-ci
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
