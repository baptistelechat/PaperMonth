import { CustomResolutionDialog } from "@/components/CustomResolutionDialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitialConfig, useWallpaperStore } from "@/hooks/useWallpaperStore";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  RotateCcw,
  Shuffle,
} from "lucide-react";
import React, { useMemo, useState } from "react";

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

interface GeneratorHeaderProps {
  isExporting: boolean;
  onExportMonth: () => void;
  onExportYear: () => void;
}

export const GeneratorHeader: React.FC<GeneratorHeaderProps> = ({
  isExporting,
  onExportMonth,
  onExportYear,
}) => {
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
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

  // Determine if config is default
  const isDefaultConfig = useMemo(() => {
    const initial = getInitialConfig();
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

  // Resolution handlers
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
      setDimensionsConfig({ width: 1920, height: 1080, scale: preset.scale });
    }
  };

  const displayWidth =
    dimensions.exportWidth ?? Math.round(dimensions.width * dimensions.scale);
  const displayHeight =
    dimensions.exportHeight ?? Math.round(dimensions.height * dimensions.scale);

  return (
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
          {new Date(calendar.year, calendar.month).toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
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
                  {displayWidth}x{displayHeight}
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={isExporting}
              className="min-w-36 transition-all duration-300"
            >
              {isExporting ? (
                <div className="animate-in fade-in zoom-in flex items-center gap-2 duration-300">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Génération...</span>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in flex items-center gap-2 duration-300">
                  <Download className="size-4" />
                  <span>Télécharger</span>
                  <ChevronDown className="ml-1 size-3.5 opacity-70" />
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onExportMonth}>
              <div className="flex flex-col text-left">
                <span className="font-medium">Mois actuel (PNG)</span>
                <span className="text-muted-foreground text-xs">
                  Export du mois en cours uniquement
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportYear}>
              <div className="flex flex-col text-left">
                <span className="font-medium">Année complète (ZIP)</span>
                <span className="text-muted-foreground text-xs">
                  Export des 12 mois de l'année
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CustomResolutionDialog
        open={isCustomDialogOpen}
        onOpenChange={setIsCustomDialogOpen}
      />
    </header>
  );
};
