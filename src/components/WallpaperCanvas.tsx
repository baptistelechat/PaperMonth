import { useHolidays } from "@/hooks/useHolidays";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { CalendarGrid } from "./Calendar/CalendarGrid";
import { CalendarHeader } from "./Calendar/CalendarHeader";

// We use forwardRef to allow the parent to capture the canvas for export
export const WallpaperCanvas = forwardRef<HTMLDivElement>((_, ref) => {
  const { config } = useWallpaperStore();
  const { calendar, background, typography, widgets } = config;

  // Fetch holidays based on current config
  const { holidays } = useHolidays(calendar.year);

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

  return (
    <div
      ref={ref}
      id="wallpaper-canvas"
      className={cn(
        "relative overflow-hidden flex flex-col p-16 select-none",
        "w-[1920px] h-[1080px]", // Fixed dimensions
        backgroundClass
      )}
      style={{
        ...backgroundStyle,
        fontFamily: typography.fontFamily,
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: background.overlayOpacity }}
      />

      {/* Content Layer */}
      <div className="relative z-10 grid grid-cols-12 grid-rows-12 h-full w-full gap-4">
        {/* Calendar Widget - Hardcoded position for MVP or dynamic based on widget config?
            The spec says "Calendar Widget (Core)" and "Widgets (Cards)".
            It implies Calendar is the main thing, but also listed in "Widgets available".
            For now, I'll treat the main calendar as a fixed or configurable widget.
            If it's in the `widgets` array, I render it there. 
            But the PRD says "Calendar Widget (Core)" separate from "Widgets (Cards)".
            And "Position du calendrier" in Control Panel.
            
            Let's assume the Calendar is ALWAYS present and its position is configurable 
            (or it's just a widget with special status).
            
            I'll render the Calendar directly here for now, or wrap it in a "Widget" container.
            Let's place it in a default location (e.g., col-start-9 col-span-4).
        */}

        <div className="col-start-5 col-span-4 row-start-4 row-span-6 bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 flex flex-col shadow-2xl">
          <CalendarHeader config={calendar} />
          <CalendarGrid config={calendar} holidays={holidays} />
        </div>

        {/* Other Widgets */}
        {widgets
          .filter((w) => w.visible)
          .map((widget) => (
            <div
              key={widget.id}
              className={cn(
                "bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center text-white"
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
      <div className="absolute bottom-8 right-8 text-white/30 font-light text-lg tracking-widest">
        PAPERMONTH
      </div>
    </div>
  );
});

WallpaperCanvas.displayName = "WallpaperCanvas";
