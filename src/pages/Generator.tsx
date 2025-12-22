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
  const { calendar, dimensions } = config;

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

    // Create copies of configs excluding the random tips to compare
    // We exclude currentTips because they are randomized on every initialization
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentTips: _c, ...configTipsWithoutCurrent } = config.tips;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentTips: _i, ...initialTipsWithoutCurrent } = initial.tips;

    const configToCompare = { ...config, tips: configTipsWithoutCurrent };
    const initialToCompare = { ...initial, tips: initialTipsWithoutCurrent };

    return JSON.stringify(configToCompare) === JSON.stringify(initialToCompare);
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

      const scaleX = availableWidth / dimensions.width;
      const scaleY = availableHeight / dimensions.height;

      // Use the smaller scale to fit entirely, with a max of 1
      setScale(Math.min(scaleX, scaleY, 1));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dimensions]);

  const handleExport = () => {
    const fileName = `PaperMonth_${config.calendar.year}_${
      config.calendar.month + 1
    }`;
    exportWallpaper(canvasRef, fileName);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black font-sans text-white">
      {/* Sidebar */}
      <ControlPanel />

      {/* Main Content */}
      <div className="relative flex min-w-0 flex-1 flex-col bg-zinc-950">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-zinc-900/50 px-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <img
              src="/icon.svg"
              alt="PaperMonth Logo"
              className="h-8 w-8 rounded-md"
            />
            <h1 className="text-lg font-semibold tracking-tight">PaperMonth</h1>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 p-1">
            <Button variant="ghost" size="icon-sm" onClick={handlePrevMonth}>
              <ChevronLeft className="size-4" />
            </Button>
            <div className="w-32 text-center text-sm font-medium capitalize select-none">
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
              <Download className="h-4 w-4" />
              Exporter PNG
            </Button>
          </div>
        </header>

        {/* Canvas Preview Area */}
        <div
          ref={containerRef}
          className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-950 bg-[url('/grid-pattern.svg')]"
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
            <WallpaperCanvas ref={canvasRef} />
          </div>
        </div>

        {/* Zoom Info */}
        <div className="absolute right-6 bottom-4 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-400 backdrop-blur">
          {dimensions.width}x{dimensions.height}px - {Math.round(scale * 100)}%
        </div>
      </div>
    </div>
  );
};
