import { Holiday, SchoolHoliday } from "@/hooks/useHolidays";
import { cn } from "@/lib/utils";
import { CalendarConfig } from "@/types/calendar";
import {
  DAYS_FR,
  DAYS_FR_SUNDAY_START,
  getDaysInMonth,
  getFirstDayOfMonth,
} from "@/utils/dates";
import { WorldDayEvent } from "@/utils/worldDays";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface CalendarGridProps {
  config: CalendarConfig;
  holidays: Holiday[];
  schoolHolidays?: SchoolHoliday[];
  worldDays?: WorldDayEvent[];
  textColor?: "light" | "dark";
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  config,
  holidays,
  schoolHolidays,
  worldDays = [],
  textColor = "light",
}) => {
  const {
    month,
    year,
    weekStart,
    showWeekends,
    showHolidays,
    showHolidayNames,
    showSchoolHolidays,
    showWorldDays,
  } = config;

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year, weekStart);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const weekDays = weekStart === "monday" ? DAYS_FR : DAYS_FR_SUNDAY_START;
  const isDark = textColor === "dark";

  // Helper to get all events for a day
  const getEvents = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const events: Array<{
      type: "holiday" | "observance" | "worldDay";
      label: string;
    }> = [];

    // Public Holiday
    if (showHolidays) {
      const holiday = holidays.find((h) => h.date === dateStr);
      if (holiday) {
        const isObservance =
          holiday.types && holiday.types.includes("Observance");
        events.push({
          type: isObservance ? "observance" : "holiday",
          label: holiday.localName,
        });
      }
    }

    // World Days
    if (showWorldDays) {
      const days = worldDays.filter((wd) => wd.date === dateStr);
      days.forEach((wd) => {
        events.push({ type: "worldDay", label: wd.label });
      });
    }

    return events;
  };

  // Helper to check if a day is a school holiday
  const getSchoolHoliday = (day: number) => {
    if (!showSchoolHolidays || !schoolHolidays) return null;

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return schoolHolidays.find((h) => {
      const start = h.start_date.split("T")[0];
      const end = h.end_date.split("T")[0];
      return dateStr > start && dateStr < end;
    });
  };

  // Helper to check if day is weekend
  const isWeekend = (index: number) => {
    const dayOfWeek = index % 7;
    if (weekStart === "monday") {
      return dayOfWeek === 5 || dayOfWeek === 6;
    } else {
      return dayOfWeek === 0 || dayOfWeek === 6;
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className={cn(
                "text-center text-sm font-medium opacity-70",
                isDark ? "text-black" : "text-white"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-y-2 gap-x-1">
          {blanks.map((_, i) => (
            <div key={`blank-${i}`} className="h-10" />
          ))}

          {days.map((day, i) => {
            const absoluteIndex = i + firstDay;
            const isWknd = isWeekend(absoluteIndex);
            const events = getEvents(day);
            const schoolHoliday = getSchoolHoliday(day);

            const hasPublicHoliday = events.some((e) => e.type === "holiday");
            const hasObservance = events.some((e) => e.type === "observance");
            const hasWorldDay = events.some((e) => e.type === "worldDay");

            // Determine Background Class and Text Class
            let bgClass = "";
            let textColorClass = isDark ? "text-black" : "text-white";
            let textWeightClass = "";
            let shadowClass = "";

            // Base states (Weekend / School Holiday)
            if (showWeekends && isWknd) {
              bgClass = isDark ? "bg-black/5" : "bg-white/5";
              textColorClass = isDark ? "text-black/70" : "text-white/70";
            } else if (schoolHoliday) {
              bgClass = isDark ? "bg-black/10" : "bg-white/10";
              textColorClass = isDark ? "text-black" : "text-white";
            }

            // Overrides for Events
            if (hasPublicHoliday) {
              bgClass = isDark ? "bg-black/20" : "bg-white/20";
              textColorClass = isDark ? "text-black" : "text-white";
              textWeightClass = "font-bold";
              shadowClass = isDark
                ? "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]"
                : "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]";
            } else if (hasObservance) {
              textWeightClass = "font-medium";
            }

            const textClass = cn(textColorClass, textWeightClass);

            // Determine Content
            const showName =
              showHolidayNames &&
              events.length === 1 &&
              (events[0].type === "holiday" || events[0].type === "observance");

            const dotEvents = events.filter((e) => e.type !== "worldDay");
            const showDots = dotEvents.length > 0 && !showName;

            const cellContent = (
              <div
                className={cn(
                  "h-10 flex flex-col items-center justify-center relative rounded-md transition-colors",
                  bgClass,
                  textClass,
                  shadowClass,
                  events.length > 0 && "cursor-help"
                )}
              >
                <span
                  className={cn(
                    "text-lg leading-none",
                    showName && "mb-0.5",
                    hasWorldDay &&
                      "underline decoration-2 underline-offset-8 decoration-current"
                  )}
                >
                  {day}
                </span>

                {showName && (
                  <span className="text-[0.6rem] leading-none opacity-80 truncate w-full text-center px-1">
                    {events[0].label}
                  </span>
                )}

                {showDots && (
                  <div className="absolute top-1 right-1 flex gap-0.5">
                    {dotEvents.map((e, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full shadow-sm",
                          e.type === "holiday"
                            ? isDark
                              ? "bg-black"
                              : "bg-white"
                            : isDark
                            ? "bg-black/50"
                            : "bg-white/50"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            );

            if (events.length > 0) {
              return (
                <Tooltip key={day}>
                  <TooltipTrigger asChild>{cellContent}</TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col gap-1 text-xs">
                      {events.map((e, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            e.type === "holiday" && "text-red-400",
                            e.type === "observance" && "text-violet-400"
                          )}
                        >
                          {e.label}
                        </div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <React.Fragment key={day}>{cellContent}</React.Fragment>;
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
