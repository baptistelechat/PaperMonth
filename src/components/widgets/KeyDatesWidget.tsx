import { Holiday } from "@/hooks/useHolidays";
import { formatEventLabel } from "@/utils/textFormatting";
import { WorldDay } from "@/utils/worldDays";
import React, { useMemo } from "react";
import { EventTooltip } from "../shared/EventTooltip";
import { WidgetTitle } from "./WidgetTitle";

interface KeyDatesWidgetProps {
  holidays: Holiday[];
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
  type: "holiday" | "observance" | "world";
  isWeek: boolean;
}

export const KeyDatesWidget: React.FC<KeyDatesWidgetProps> = ({
  holidays,
  worldDays,
  currentMonth,
  currentYear,
  fontFamily,
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
  }, [holidays, worldDays, currentMonth, currentYear]);

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
      <WidgetTitle
        title="Dates clés"
        fontFamily={fontFamily}
        textColor={textColor}
      />

      <div className="flex-1 w-full">
        <div
          className={`grid gap-x-6 gap-y-1 grid-flow-col h-full content-start text-sm`}
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
                <div className="flex gap-2 items-baseline group cursor-help">
                  <span
                    className={`font-mono font-bold shrink-0 ${textClass} ${
                      events.count > 18 ? "text-sm" : "text-lg"
                    }`}
                  >
                    {event.day.toString().padStart(2, "0")}
                  </span>
                  <span
                    className={`leading-snug ${
                      event.type === "holiday"
                        ? `font-bold ${textClass}`
                        : event.type === "observance"
                        ? `font-medium italic ${textClass}`
                        : mutedClass
                    } ${
                      event.isWeek ? "underline decoration-current" : ""
                    } group-hover:${textClass} transition-colors line-clamp-1`}
                  >
                    {event.label}
                  </span>
                </div>
              </EventTooltip>
            ))
          ) : (
            <div className={`text-sm italic ${mutedClass}`}>
              Aucune date clé ce mois-ci
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
