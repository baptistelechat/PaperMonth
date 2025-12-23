import { ControlPanel } from "@/components/ControlPanel";
import { CustomResolutionDialog } from "@/components/CustomResolutionDialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WallpaperCanvas } from "@/components/WallpaperCanvas";
import { useExport } from "@/hooks/useExport";
import { getInitialConfig, useWallpaperStore } from "@/hooks/useWallpaperStore";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  RotateCcw,
  Shuffle,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

const RESOLUTION_PRESETS = [
  {
    label: "HD",
    desc: "1280x720",
    width: 1280,
    height: 720,
    scale: 1280 / 1920,
  },
  { label: "FHD", desc: "1920x1080", width: 1920, height: 1080, scale: 1 },
  { label: "4K", desc: "3840x2160", width: 3840, height: 2160, scale: 2 },
];

export const Generator: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [isExporting, setIsExporting] = useState(false);
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const { exportWallpaper } = useExport();
  const {
    config,
    setCalendarConfig,
    setDimensionsConfig,
    resetConfig,
    randomizeConfig,
  } = useWallpaperStore();
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

  const handleExport = async () => {
    setIsExporting(true);
    const fileName = `PaperMonth_${config.calendar.year}_${
      config.calendar.month + 1
    }`;

    // Always use store dimensions for now as we want to respect user selection
    // But if we wanted to support export-only scaling, we could pass overrideWidth/Height here
    // based on a different selection than the view dimensions.
    // For now, let's assume the user wants to export what they see (dimensions in store).
    await exportWallpaper(canvasRef, fileName);
    setIsExporting(false);
  };

  const currentPreset = RESOLUTION_PRESETS.find(
    (p) => Math.abs(p.scale - dimensions.scale) < 0.01
  );

  const handlePresetChange = (value: string) => {
    if (value === "Custom") {
      setIsCustomDialogOpen(true);
      return;
    }
    const preset = RESOLUTION_PRESETS.find((p) => p.label === value);
    if (preset) {
      // Keep dimensions at 1920x1080 (FHD) as base, but update scale for export
      // This ensures the preview always looks consistent
      setDimensionsConfig({ width: 1920, height: 1080, scale: preset.scale });
    }
  };

  const displayWidth =
    dimensions.exportWidth ?? Math.round(dimensions.width * dimensions.scale);
  const displayHeight =
    dimensions.exportHeight ?? Math.round(dimensions.height * dimensions.scale);

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

            <Select
              value={currentPreset ? currentPreset.label : "Custom"}
              onValueChange={handlePresetChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue>
                  <span className="flex items-center gap-2">
                    <span className="font-medium">
                      {currentPreset ? currentPreset.label : "Custom"}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      - {displayWidth}x{displayHeight}
                    </span>
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="end">
                {RESOLUTION_PRESETS.map((preset) => (
                  <SelectItem key={preset.label} value={preset.label}>
                    <div className="flex flex-col text-left">
                      <span className="font-medium">{preset.label}</span>
                      <span className="text-muted-foreground text-xs">
                        {preset.desc}
                      </span>
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value="Custom">
                  <div className="flex flex-col text-left">
                    <span className="font-medium">Custom</span>
                    <span className="text-muted-foreground text-xs">
                      Définir manuellement
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="min-w-36"
            >
              {isExporting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Génération...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download className="size-4" />
                  <span>Télécharger</span>
                </div>
              )}
            </Button>
          </div>

          <CustomResolutionDialog
            open={isCustomDialogOpen}
            onOpenChange={setIsCustomDialogOpen}
          />
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
          {Math.round(dimensions.width * dimensions.scale)}x
          {Math.round(dimensions.height * dimensions.scale)}px -{" "}
          {Math.round((scale / (dimensions.scale || 1)) * 100)}%
        </div>
      </div>
    </div>
  );
};
