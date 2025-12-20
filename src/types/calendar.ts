import { WidgetConfig } from "./widgets";

export type TitleFormat =
  | "full"
  | "uppercase"
  | "mm/yy"
  | "mm/yyyy"
  | "MMM/YYYY"
  | "MMM/YY"
  | "Month";

export interface CalendarConfig {
  month: number; // 0-11
  year: number;
  weekStart: "monday" | "sunday";
  titleFormat: TitleFormat;
  showWeekends: boolean;
  showHolidays: boolean;
  showHolidayNames: boolean;
}

export interface BackgroundConfig {
  type: "gradient" | "image";
  gradient?: string; // Tailwind class or CSS gradient
  imageUrl?: string;
  overlayOpacity: number; // 0-1
}

export interface TypographyConfig {
  fontFamily: string;
  fontSize: "sm" | "md" | "lg";
}

export interface WallpaperConfig {
  calendar: CalendarConfig;
  background: BackgroundConfig;
  typography: TypographyConfig;
  widgets: WidgetConfig[];
}
