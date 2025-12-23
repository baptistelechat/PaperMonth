import worldDaysData from "@/data/world-days.json";

export interface WorldDay {
  date: string;
  label: string;
  source?: string;
}

export type WorldDayEvent = WorldDay;

interface WorldDayRule {
  type: string;
  month: number;
  day?: number;
  weekday?: number;
  occurrence?: number;
}

interface WorldDayEntry {
  label: string;
  rule: WorldDayRule;
  source?: string;
}

function calculateWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  occurrence: number
): string {
  // month is 1-based in JSON
  const date = new Date(year, month - 1, 1);

  // JSON: 1=Mon...7=Sun
  // JS: 0=Sun, 1=Mon...6=Sat
  const targetDay = weekday === 7 ? 0 : weekday;

  // Find first occurrence
  while (date.getDay() !== targetDay) {
    date.setDate(date.getDate() + 1);
  }

  // Add weeks
  date.setDate(date.getDate() + (occurrence - 1) * 7);

  // Check if we are still in the same month
  if (date.getMonth() !== month - 1) {
    return "";
  }

  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export const getWorldDaysForYear = (year: number): WorldDay[] => {
  const days: WorldDay[] = [];

  Object.values(worldDaysData).forEach((events) => {
    (events as WorldDayEntry[]).forEach((event) => {
      let dateStr = "";

      if (event.rule.type === "fixed" && event.rule.day) {
        const m = String(event.rule.month).padStart(2, "0");
        const d = String(event.rule.day).padStart(2, "0");
        dateStr = `${year}-${m}-${d}`;
      } else if (
        event.rule.type === "weekday-of-month" &&
        event.rule.weekday &&
        event.rule.occurrence
      ) {
        dateStr = calculateWeekdayOfMonth(
          year,
          event.rule.month,
          event.rule.weekday,
          event.rule.occurrence
        );
      }

      if (dateStr) {
        days.push({
          date: dateStr,
          label: event.label,
          source: event.source,
        });
      }
    });
  });

  return days.sort((a, b) => a.date.localeCompare(b.date));
};
