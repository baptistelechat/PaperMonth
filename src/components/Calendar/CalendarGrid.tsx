import { SchoolHoliday } from "@/hooks/useHolidays";
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

interface CalendarGridProps {
  config: CalendarConfig;
  holidays: Array<{ date: string; localName: string }>;
  schoolHolidays?: SchoolHoliday[];
  worldDays?: WorldDayEvent[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  config,
  holidays,
  schoolHolidays,
  worldDays = [],
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

  // Helper to get all events for a day
  const getEvents = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const events: Array<{ type: "holiday" | "worldDay"; label: string }> = [];

    // Public Holiday
    if (showHolidays) {
      const holiday = holidays.find((h) => h.date === dateStr);
      if (holiday) {
        events.push({ type: "holiday", label: holiday.localName });
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
    <div className="w-full">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium opacity-70">
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

          // Determine Background Class
          let bgClass = "";
          let textClass = "text-white";
          let shadowClass = "";

          if (hasPublicHoliday) {
            bgClass = "bg-white/20";
            textClass = "font-bold text-white";
            shadowClass = "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]";
          } else if (showWeekends && isWknd) {
            bgClass = "bg-white/5";
            textClass = "text-white/70";
          } else if (schoolHoliday) {
            bgClass = "bg-white/10";
            textClass = "text-white";
          }

          // Determine Content
          const showName = showHolidayNames && events.length === 1;
          const showDots = events.length > 0 && !showName;

          return (
            <div
              key={day}
              className={cn(
                "h-10 flex flex-col items-center justify-center relative rounded-md transition-colors",
                bgClass,
                textClass,
                shadowClass
              )}
            >
              <span
                className={cn("text-lg leading-none", showName && "mb-0.5")}
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
                  {events.map((e, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full shadow-sm",
                        e.type === "holiday" ? "bg-white" : "bg-white/50"
                      )}
                      title={e.label} // Tooltip on hover
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
