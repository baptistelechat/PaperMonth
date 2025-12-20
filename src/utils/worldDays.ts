import worldDaysData from "@/data/world-days.json";

export interface WorldDayEvent {
  date: string; // YYYY-MM-DD
  label: string;
  source: "ONU" | "Wikipedia";
  type: "fixed" | "weekday-of-month";
}

type WorldDayRule =
  | { type: "fixed"; month: number; day: number }
  | {
      type: "weekday-of-month";
      month: number;
      weekday: number;
      occurrence: number;
    };

type WorldDayEntry = {
  label: string;
  rule: WorldDayRule;
  source: "ONU" | "Wikipedia";
};

// Helper to get date string YYYY-MM-DD
const formatDate = (year: number, month: number, day: number) => {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};

export const getWorldDaysForYear = (year: number): WorldDayEvent[] => {
  const events: WorldDayEvent[] = [];

  // Iterate over all entries in the JSON
  Object.values(worldDaysData).forEach((entries) => {
    (entries as WorldDayEntry[]).forEach((entry) => {
      let dateStr: string | null = null;

      if (entry.rule.type === "fixed") {
        dateStr = formatDate(year, entry.rule.month, entry.rule.day);
      } else if (entry.rule.type === "weekday-of-month") {
        const { month, weekday, occurrence } = entry.rule;
        // Calculate the date
        // weekday: 1 (Monday) ... 7 (Sunday)
        // occurrence: 1, 2, 3, 4, -1 (last)

        const date = calculateWeekdayOfMonth(year, month, weekday, occurrence);
        if (date) {
          dateStr = formatDate(year, month, date.getDate());
        }
      }

      if (dateStr) {
        events.push({
          date: dateStr,
          label: entry.label,
          source: entry.source,
          type: entry.rule.type,
        });
      }
    });
  });

  return events;
};

// Helper function to calculate Nth weekday of month
function calculateWeekdayOfMonth(
  year: number,
  month: number,
  targetWeekday: number, // 1=Mon, 7=Sun
  occurrence: number
): Date | null {
  // JS Date: month is 0-indexed (0=Jan, 11=Dec)
  // JS Date: day is 0=Sun, 1=Mon, ..., 6=Sat
  const jsMonth = month - 1;

  // Convert ISO weekday (1-7) to JS weekday (0-6) where 0=Sun
  // target: 1(Mon)->1, ..., 6(Sat)->6, 7(Sun)->0
  const jsTargetDay = targetWeekday === 7 ? 0 : targetWeekday;

  if (occurrence > 0) {
    // Find Nth occurrence
    let count = 0;
    // Start from day 1
    for (let d = 1; d <= 31; d++) {
      const date = new Date(year, jsMonth, d);
      if (date.getMonth() !== jsMonth) break; // Overflow to next month

      if (date.getDay() === jsTargetDay) {
        count++;
        if (count === occurrence) {
          return date;
        }
      }
    }
  } else {
    // Find last occurrence (assume -1)
    // Start from last day of month
    const lastDay = new Date(year, jsMonth + 1, 0); // Day 0 of next month = last day of current
    const totalDays = lastDay.getDate();

    for (let d = totalDays; d >= 1; d--) {
      const date = new Date(year, jsMonth, d);
      if (date.getDay() === jsTargetDay) {
        return date;
      }
    }
  }

  return null;
}
