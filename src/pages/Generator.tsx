import { ControlPanel } from "@/components/ControlPanel";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { WallpaperCanvas } from "@/components/WallpaperCanvas";
import { useExport } from "@/hooks/useExport";
import { getInitialConfig, useWallpaperStore } from "@/hooks/useWallpaperStore";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCcw,
  Shuffle,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

export const Generator: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const { exportWallpaper } = useExport();
  const { config, setCalendarConfig, resetConfig, randomizeConfig } =
    useWallpaperStore();
  const { calendar } = config;

  // Determine if current view is current date
  const isCurrentDate = useMemo(() => {
    const now = new Date();
    return (
      calendar.month === now.getMonth() && calendar.year === now.getFullYear()
    );
  }, [calendar.month, calendar.year]);

  // Determine if config is default (excluding widgets potentially, but here checking full equality)
  const isDefaultConfig = useMemo(() => {
    // We compare with a fresh initial config, but we need to match the date logic of getInitialConfig
    // which uses new Date(). So if we are on current date + default styles, it should be true.
    const initial = getInitialConfig();

    // Since getInitialConfig() calls new Date() inside, it matches the "current date" logic.
    // However, we need to ensure we are comparing values correctly.
    // JSON.stringify is a simple way to compare deep objects for this size.
    return JSON.stringify(config) === JSON.stringify(initial);
  }, [config]);

  // Navigation handlers
  const handlePrevMonth = () => {
    let newMonth = calendar.month - 1;
    let newYear = calendar.year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setCalendarConfig({ month: newMonth, year: newYear });
  };

  const handleNextMonth = () => {
    let newMonth = calendar.month + 1;
    let newYear = calendar.year;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCalendarConfig({ month: newMonth, year: newYear });
  };

  const handleCurrentMonth = () => {
    const now = new Date();
    setCalendarConfig({ month: now.getMonth(), year: now.getFullYear() });
  };

  // Auto-scale logic
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const padding = 64; // 32px padding on each side
      const availableWidth = containerRef.current.clientWidth - padding;
      const availableHeight = containerRef.current.clientHeight - padding;

      const scaleX = availableWidth / 1920;
      const scaleY = availableHeight / 1080;

      // Use the smaller scale to fit entirely, with a max of 1
      setScale(Math.min(scaleX, scaleY, 1));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleExport = () => {
    const fileName = `PaperMonth_${config.calendar.year}_${
      config.calendar.month + 1
    }`;
    exportWallpaper(canvasRef, fileName);
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <ControlPanel />

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col relative bg-zinc-950">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-zinc-900/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-black font-bold">
              P
            </div>
            <span className="font-semibold tracking-tight text-lg">
              PaperMonth
            </span>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900 rounded-md border border-zinc-800 p-1">
            <Button variant="ghost" size="icon-sm" onClick={handlePrevMonth}>
              <ChevronLeft className="size-4" />
            </Button>
            <div className="text-sm font-medium w-32 text-center select-none capitalize">
              {new Date(calendar.year, calendar.month).toLocaleDateString(
                "fr-FR",
                { month: "long", year: "numeric" }
              )}
            </div>
            <Button variant="ghost" size="icon-sm" onClick={handleNextMonth}>
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <ButtonGroup>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCurrentMonth}
                title="Date courante"
                disabled={isCurrentDate}
              >
                <CalendarIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={randomizeConfig}
                title="Aléatoire"
              >
                <Shuffle className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={resetConfig}
                title="Réinitialiser"
                disabled={isDefaultConfig}
              >
                <RotateCcw className="size-4" />
              </Button>
            </ButtonGroup>

            <Button
              onClick={handleExport}
              className="flex items-center gap-2"
              variant="secondary"
            >
              <Download className="w-4 h-4" />
              Exporter PNG
            </Button>
          </div>
        </header>

        {/* Canvas Preview Area */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center justify-center overflow-hidden bg-[url('/grid-pattern.svg')] bg-zinc-950 relative"
        >
          {/* Dotted Background (Simulated with CSS) */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
              boxShadow: "0 0 100px rgba(0,0,0,0.5)",
            }}
            className="transition-transform duration-200 ease-out"
          >
            <WallpaperCanvas ref={canvasRef} width={1920} height={1080} />
          </div>
        </div>

        {/* Zoom Info */}
        <div className="absolute bottom-4 right-6 bg-zinc-900/80 backdrop-blur text-xs px-3 py-1.5 rounded-full border border-white/10 text-zinc-400">
          Zoom: {Math.round(scale * 100)}%
        </div>
      </div>
    </div>
  );
};
