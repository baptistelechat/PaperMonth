import { CustomResolutionDialog } from "@/components/CustomResolutionDialog";
import { ConfigActions } from "@/components/generator/ConfigActions";
import { Button } from "@/components/ui/button";
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
import {
  getResolutionScale,
  RESOLUTION_PRESETS,
} from "@/constants/resolutions";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Expand,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";

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
  const { config, setDimensionsConfig, nextMonth, prevMonth } =
    useWallpaperStore();
  const { calendar, dimensions } = config;

  // Resolution handlers
  const hasMultipleResolutions =
    dimensions.exportResolutions && dimensions.exportResolutions.length > 0;

  const currentPreset = hasMultipleResolutions
    ? null
    : RESOLUTION_PRESETS.find((p) => {
        const currentExportWidth =
          dimensions.exportWidth ??
          Math.round(dimensions.width * dimensions.scale);
        const currentExportHeight =
          dimensions.exportHeight ??
          Math.round(dimensions.height * dimensions.scale);

        // Allow small rounding errors
        return (
          Math.abs(p.width - currentExportWidth) < 2 &&
          Math.abs(p.height - currentExportHeight) < 2
        );
      });

  const handlePresetChange = (value: string) => {
    if (value === "Custom") {
      setIsCustomDialogOpen(true);
      return;
    }
    const preset = RESOLUTION_PRESETS.find((p) => p.label === value);
    if (preset) {
      const scale = getResolutionScale(preset.height);
      const baseWidth = Math.round((preset.width / scale) * 10000) / 10000;

      setDimensionsConfig({
        width: baseWidth,
        height: 1080,
        scale: scale,
        exportWidth: preset.width,
        exportHeight: preset.height,
        exportResolutions: [],
      });
    }
  };

  const displayWidth =
    dimensions.exportWidth ?? Math.round(dimensions.width * dimensions.scale);
  const displayHeight =
    dimensions.exportHeight ?? Math.round(dimensions.height * dimensions.scale);

  return (
    <header className="flex h-auto flex-col gap-4 border-b border-white/10 bg-zinc-900/50 p-4 backdrop-blur-md lg:h-16 lg:flex-row lg:items-center lg:justify-end lg:gap-2 lg:px-6 lg:py-0">
      <div className="hidden w-full justify-center lg:flex">
        <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 p-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={prevMonth}
            title="Mois précédent (←, Q ou A)"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="w-32 text-center text-sm font-medium capitalize select-none">
            {new Date(calendar.year, calendar.month).toLocaleDateString(
              "fr-FR",
              {
                month: "long",
                year: "numeric",
              }
            )}
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={nextMonth}
            title="Mois suivant (→ ou D)"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center lg:gap-2">
        <div className="hidden justify-center lg:block">
          <ConfigActions />
        </div>

        <Select
          value={currentPreset ? currentPreset.label : "Custom"}
          onValueChange={handlePresetChange}
        >
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue>
              <span className="flex items-center gap-2">
                <span className="font-medium">
                  {currentPreset ? currentPreset.label : "Personnaliser"}
                </span>
                <span className="text-muted-foreground text-xs">
                  {hasMultipleResolutions
                    ? `(${dimensions.exportResolutions?.length})`
                    : `${displayWidth}x${displayHeight}`}
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
            <SelectItem
              value="Custom"
              onPointerUp={() => setIsCustomDialogOpen(true)}
            >
              <div className="flex flex-col text-left">
                <span className="font-medium">Personnaliser</span>
                <span className="text-muted-foreground text-xs">
                  Multi-écrans & sur mesure
                </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={isExporting}
              className="w-full transition-all duration-300 lg:w-auto lg:min-w-36"
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

        <div className=" text-muted-foreground flex w-full items-center justify-center gap-2 lg:hidden">
          <Expand className="size-3" />
          <p className="text-xs">Clique sur l'aperçu pour agrandir</p>
        </div>
      </div>

      <CustomResolutionDialog
        open={isCustomDialogOpen}
        onOpenChange={setIsCustomDialogOpen}
      />
    </header>
  );
};
