import { useHolidays } from "@/hooks/useHolidays";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { cn } from "@/lib/utils";
import { formatMonthTitle } from "@/utils/dates";
import { getWorldDaysForYear } from "@/utils/worldDays";
import { Sparkles } from "lucide-react";
import React, { forwardRef, useMemo } from "react";
import { CalendarGrid } from "./widgets/Calendar/CalendarGrid";
import { KeyDatesWidget } from "./widgets/KeyDatesWidget";
import { TipWidget } from "./widgets/TipWidget";
import { WidgetContainer } from "./widgets/WidgetContainer";
import { WidgetTitle } from "./widgets/WidgetTitle";
import { ZoneWidget } from "./widgets/ZoneWidget";

// We use forwardRef to allow the parent to capture the canvas for export
export const WallpaperCanvas = forwardRef<HTMLDivElement>((_, ref) => {
  const { config } = useWallpaperStore();
  const { calendar, background, typography, widgets, dimensions } = config;
  const { width, height } = dimensions;
  const { textColor } = background;

  // Fetch holidays based on current config
  const { holidays, schoolHolidays } = useHolidays(
    calendar.year,
    "FR",
    calendar.schoolZone
  );

  // Get World Days
  const worldDays = useMemo(
    () => getWorldDaysForYear(calendar.year),
    [calendar.year]
  );

  // Background style
  const backgroundStyle: React.CSSProperties =
    background.type === "image" && background.imageUrl
      ? {
          backgroundImage: `url(${background.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {};

  const backgroundClass =
    background.type === "gradient" ? background.gradient : "bg-black";

  // Theme logic
  const isDarkText = textColor === "dark";
  const themeClasses = isDarkText
    ? {
        container: "bg-white/30 border-black/10",
        text: "text-black",
        watermark: "text-black/30",
        overlay: "bg-white",
      }
    : {
        container: "bg-black/20 border-white/10",
        text: "text-white",
        watermark: "text-white/30",
        overlay: "bg-black",
      };

  // Determine content max width (16:9 ratio) if container is wider
  const contentStyle: React.CSSProperties = useMemo(() => {
    // If we have explicit export dimensions, use those to determine ratio
    // Otherwise use current dimensions
    const currentWidth = dimensions.exportWidth ?? width;
    const currentHeight = dimensions.exportHeight ?? height;

    const ratio = currentWidth / currentHeight;
    const standardRatio = 16 / 9;

    // Allow a small epsilon for floating point differences
    if (ratio > standardRatio + 0.01) {
      // It's wider (Ultrawide), constrain width to match 16:9 height
      // We calculate the max-width based on the current canvas height
      // The canvas height in the DOM is `height` (px).
      const maxWidth = height * standardRatio;
      return {
        maxWidth: `${maxWidth}px`,
        margin: "0 auto",
      };
    }

    return {};
  }, [width, height, dimensions.exportWidth, dimensions.exportHeight]);

  return (
    <div
      ref={ref}
      id="wallpaper-canvas"
      className={cn(
        "relative overflow-hidden flex flex-col p-16 pb-28 select-none justify-center",
        backgroundClass
      )}
      style={{
        ...backgroundStyle,
        width: `${width}px`,
        height: `${height}px`,
        fontFamily: typography.applyToAll ? typography.fontFamily : undefined,
      }}
    >
      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          themeClasses.overlay
        )}
        style={{ opacity: background.overlayOpacity }}
      />

      {/* Content Layer */}
      <div
        className="relative z-10 grid h-full w-full grid-cols-12 grid-rows-12 gap-4"
        style={contentStyle}
      >
        {/* Calendar Widget */}
        <WidgetContainer
          colStart={1}
          colSpan={4}
          rowStart={1}
          rowSpan={6}
          themeClasses={themeClasses}
        >
          <WidgetTitle
            title={formatMonthTitle(
              calendar.month,
              calendar.year,
              calendar.titleFormat
            )}
            textColor={textColor}
            level="h1"
          />
          <CalendarGrid
            config={calendar}
            holidays={holidays}
            schoolHolidays={schoolHolidays}
            worldDays={worldDays}
            textColor={textColor}
          />
        </WidgetContainer>

        {/* Other Widgets */}
        {widgets
          .filter((w) => w.visible)
          .map((widget) => (
            <WidgetContainer
              key={widget.id}
              colStart={widget.colStart}
              colSpan={widget.colSpan}
              rowStart={widget.rowStart}
              rowSpan={widget.rowSpan}
              opacity={widget.opacity}
              themeClasses={themeClasses}
            >
              {/* Render widget content based on type */}
              {widget.type === "software" || widget.type === "folder" ? (
                <ZoneWidget
                  title={widget.type === "software" ? "Logiciels" : "Dossiers"}
                  fontFamily={
                    typography.applyToAll ? typography.fontFamily : undefined
                  }
                  textColor={textColor}
                />
              ) : widget.type === "keyDates" ? (
                <KeyDatesWidget
                  holidays={calendar.showHolidays ? holidays : []}
                  schoolHolidays={
                    calendar.showSchoolHolidays ? schoolHolidays : []
                  }
                  worldDays={calendar.showWorldDays ? worldDays : []}
                  currentMonth={calendar.month}
                  currentYear={calendar.year}
                  textColor={textColor}
                />
              ) : widget.type === "tip" ? (
                <TipWidget
                  fontFamily={
                    typography.applyToAll ? typography.fontFamily : undefined
                  }
                  textColor={textColor}
                />
              ) : (
                <span>Widget: {widget.type}</span>
              )}
            </WidgetContainer>
          ))}

        {/* Watermark / Branding (Inside Content Layer for correct alignment) */}
        <div
          className={cn(
            "absolute -bottom-12 right-0 font-light text-lg tracking-widest flex gap-2 items-center",
            themeClasses.watermark
          )}
        >
          <Sparkles className="size-6" />
          PAPERMONTH
        </div>
      </div>
    </div>
  );
});

WallpaperCanvas.displayName = "WallpaperCanvas";
