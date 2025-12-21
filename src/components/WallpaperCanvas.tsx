import { useHolidays } from "@/hooks/useHolidays";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { cn } from "@/lib/utils";
import { getWorldDaysForYear } from "@/utils/worldDays";
import React, { forwardRef, useMemo } from "react";
import { CalendarGrid } from "./widgets/Calendar/CalendarGrid";
import { CalendarHeader } from "./widgets/Calendar/CalendarHeader";

interface WallpaperCanvasProps {
  width?: number;
  height?: number;
}

// We use forwardRef to allow the parent to capture the canvas for export
export const WallpaperCanvas = forwardRef<HTMLDivElement, WallpaperCanvasProps>(
  ({ width = 1920, height = 1080 }, ref) => {
    const { config } = useWallpaperStore();
    const { calendar, background, typography, widgets } = config;
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

    return (
      <div
        ref={ref}
        id="wallpaper-canvas"
        className={cn(
          "relative overflow-hidden flex flex-col p-16 select-none",
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
        <div className="relative z-10 grid grid-cols-12 grid-rows-12 h-full w-full gap-4">
          {/* Calendar Widget */}
          <div
            className={cn(
              "col-start-5 col-span-4 row-start-4 row-span-6 backdrop-blur-sm rounded-xl p-8 border flex flex-col shadow-2xl",
              themeClasses.container
            )}
          >
            <CalendarHeader
              config={calendar}
              fontFamily={typography.fontFamily}
              textColor={textColor}
            />
            <CalendarGrid
              config={calendar}
              holidays={holidays}
              schoolHolidays={schoolHolidays}
              worldDays={worldDays}
              textColor={textColor}
            />
          </div>

          {/* Other Widgets */}
          {widgets
            .filter((w) => w.visible)
            .map((widget) => (
              <div
                key={widget.id}
                className={cn(
                  "backdrop-blur-sm rounded-xl border flex items-center justify-center",
                  themeClasses.container,
                  themeClasses.text
                )}
                style={{
                  gridColumnStart: widget.colStart,
                  gridColumnEnd: `span ${widget.colSpan}`,
                  gridRowStart: widget.rowStart,
                  gridRowEnd: `span ${widget.rowSpan}`,
                  opacity: widget.opacity,
                }}
              >
                {/* Render widget content based on type */}
                <span>Widget: {widget.type}</span>
              </div>
            ))}
        </div>

        {/* Watermark / Branding (Optional) */}
        <div
          className={cn(
            "absolute bottom-8 right-8 font-light text-lg tracking-widest",
            themeClasses.watermark
          )}
        >
          PAPERMONTH
        </div>
      </div>
    );
  }
);

WallpaperCanvas.displayName = "WallpaperCanvas";
