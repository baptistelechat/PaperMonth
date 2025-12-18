import { WidgetConfig } from "./widgets";

export interface CalendarConfig {
  month: number; // 0-11
  year: number;
  weekStart: "monday" | "sunday";
  titleFormat: "full" | "numeric" | "uppercase" | "abbreviated";
  showWeekends: boolean;
  showHolidays: boolean;
  accentColor: string;
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
