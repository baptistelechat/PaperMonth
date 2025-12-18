export const MONTH_NAMES_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

export const MONTH_NAMES_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
export const DAYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(month: number, year: number, weekStart: "monday" | "sunday"): number {
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
  format: "full" | "numeric" | "uppercase" | "abbreviated"
): string {
  const date = new Date(year, month, 1);
  const formatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });
  const parts = formatter.formatToParts(date);
  const monthName = parts.find(p => p.type === 'month')?.value || '';
  const yearStr = parts.find(p => p.type === 'year')?.value || '';

  switch (format) {
    case "numeric":
      return `${String(month + 1).padStart(2, '0')} / ${year}`;
    case "uppercase":
      return `${monthName.toUpperCase()} ${year}`;
    case "abbreviated":
      return `${monthName.substring(0, 3).toUpperCase()}. ${year}`;
    case "full":
    default:
      return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
  }
}
