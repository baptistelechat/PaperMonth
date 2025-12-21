import { useHolidays } from "@/hooks/useHolidays";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React from "react";
import { SectionHeader } from "../components/SectionHeader";
import { HolidaysControl } from "./components/HolidaysControl";
import { SchoolHolidaysControl } from "./components/SchoolHolidaysControl";
import { TitleFormatSelector } from "./components/TitleFormatSelector";
import { WeekendToggle } from "./components/WeekendToggle";
import { WeekStartSelector } from "./components/WeekStartSelector";
import { WorldDaysControl } from "./components/WorldDaysControl";

export const CalendarControl: React.FC = () => {
  const { config } = useWallpaperStore();
  const { calendar } = config;

  const { schoolHolidays, holidays } = useHolidays(
    calendar.year,
    "FR",
    calendar.schoolZone
  );

  const holidaysInMonth = React.useMemo(() => {
    if (!holidays) return [];
    const monthPrefix = `${calendar.year}-${String(calendar.month + 1).padStart(
      2,
      "0"
    )}`;
    return holidays.filter((h) => h.date.startsWith(monthPrefix));
  }, [holidays, calendar.month, calendar.year]);

  return (
    <section className="space-y-4">
      <SectionHeader title="Calendrier" />

      <div className="space-y-4">
        <TitleFormatSelector />
        <WeekStartSelector />
        <WeekendToggle />
        <HolidaysControl holidays={holidaysInMonth} />
        <WorldDaysControl />
        <SchoolHolidaysControl schoolHolidays={schoolHolidays} />
      </div>
    </section>
  );
};
