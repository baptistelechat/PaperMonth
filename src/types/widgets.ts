export type WidgetSize = "sm" | "md" | "lg";

export interface WidgetConfig {
  id: string;
  type: "calendar" | "software" | "folder" | "keyDates" | "tip";
  visible: boolean;
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
  size: WidgetSize;
  opacity: number;
}
