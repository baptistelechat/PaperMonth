import { WidgetConfig } from "./widgets";

export type TitleFormat =
  | "full"
  | "uppercase"
  | "mm/yy"
  | "mm/yyyy"
  | "MMM/YYYY"
  | "MMM/YY"
  | "Month";

export type SchoolZone =
  | "Zone A"
  | "Zone B"
  | "Zone C"
  | "Corse"
  | "Guadeloupe"
  | "Guyane"
  | "Martinique"
  | "Mayotte"
  | "Nouvelle Calédonie"
  | "Polynésie"
  | "Réunion"
  | "Saint Pierre et Miquelon"
  | "Wallis et Futuna";

export interface CalendarConfig {
  month: number; // 0-11
  year: number;
  weekStart: "monday" | "sunday";
  titleFormat: TitleFormat;
  showWeekends: boolean;
  showHolidays: boolean;
  showHolidayNames: boolean;
  showSchoolHolidays: boolean;
  showWorldDays: boolean; // Add this
  schoolZone: SchoolZone;
}

export interface BackgroundConfig {
  type: "gradient" | "image";
  gradient?: string; // Tailwind class or CSS gradient
  imageUrl?: string;
  overlayOpacity: number; // 0-1
  textColor: "light" | "dark";
}

export interface TypographyConfig {
  fontFamily: string;
  fontSize: "sm" | "md" | "lg";
  applyToAll: boolean;
}

import { Tip, TipCategory } from "@/data/tips";

export interface TipsConfig {
  currentTips: Tip[];
  selectedCategories: TipCategory[];
}

export interface WallpaperConfig {
  calendar: CalendarConfig;
  background: BackgroundConfig;
  typography: TypographyConfig;
  tips: TipsConfig;
  widgets: WidgetConfig[];
}
