import { TitleFormat } from "@/types/calendar";

export const MONTH_NAMES_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const MONTH_NAMES_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
export const DAYS_FR_SUNDAY_START = [
  "Dim",
  "Lun",
  "Mar",
  "Mer",
  "Jeu",
  "Ven",
  "Sam",
];

export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(
  month: number,
  year: number,
  weekStart: "monday" | "sunday"
): number {
  const date = new Date(year, month, 1);
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ...

  if (weekStart === "monday") {
    return day === 0 ? 6 : day - 1; // 0 = Monday, ... 6 = Sunday
  }
  return day; // 0 = Sunday, ...
}

export function formatMonthTitle(
  month: number,
  year: number,
  format: TitleFormat
): string {
  const date = new Date(year, month, 1);
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  });
  const parts = formatter.formatToParts(date);
  const monthName = parts.find((p) => p.type === "month")?.value || "";

  const mm = String(month + 1).padStart(2, "0");
  const yy = String(year).slice(-2);
  const MMM = monthName.substring(0, 3).toUpperCase();
  const Month = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  switch (format) {
    case "uppercase":
      return `${monthName.toUpperCase()} ${year}`;
    case "mm/yy":
      return `${mm} / ${yy}`;
    case "mm/yyyy":
      return `${mm} / ${year}`;
    case "MMM/YYYY":
      return `${MMM}. ${year}`;
    case "MMM/YY":
      return `${MMM}. ${yy}`;
    case "Month":
      return Month;
    case "full":
    default:
      return `${Month} ${year}`;
  }
}
