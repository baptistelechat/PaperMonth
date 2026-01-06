import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  getResolutionScale,
  RESOLUTION_PRESETS,
} from "@/constants/resolutions";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React, { useEffect, useState } from "react";

interface CustomResolutionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomResolutionDialog: React.FC<CustomResolutionDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { config, setDimensionsConfig } = useWallpaperStore();
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const [useCustom, setUseCustom] = useState(false);

  // Reset inputs when dialog opens
  useEffect(() => {
    if (open) {
      // Load current export resolutions
      const currentResolutions = config.dimensions.exportResolutions || [];
      const presets = currentResolutions
        .map((r) => r.label)
        .filter((l) => RESOLUTION_PRESETS.some((p) => p.label === l));

      // If we have explicit multi-resolutions, use them
      if (presets.length > 0) {
        setSelectedPresets(presets);
      } else {
        // Otherwise, check if the current single resolution matches a preset
        const currentWidth =
          config.dimensions.exportWidth ||
          Math.round(config.dimensions.width * config.dimensions.scale);
        const currentHeight =
          config.dimensions.exportHeight ||
          Math.round(config.dimensions.height * config.dimensions.scale);

        const matchingPreset = RESOLUTION_PRESETS.find(
          (p) =>
            Math.abs(p.width - currentWidth) < 2 &&
            Math.abs(p.height - currentHeight) < 2
        );

        if (matchingPreset) {
          setSelectedPresets([matchingPreset.label]);
        } else {
          // No match, default to FHD just as a fallback if nothing else
          setSelectedPresets(["FHD"]);
        }
      }

      // Check if there is a custom resolution
      const customRes = currentResolutions.find(
        (r) => !RESOLUTION_PRESETS.some((p) => p.label === r.label)
      );

      if (customRes) {
        setWidth(customRes.width.toString());
        setHeight(customRes.height.toString());
        setUseCustom(true);
      } else {
        // Default to current dimensions if they are not a preset
        const isStandard = RESOLUTION_PRESETS.some(
          (p) =>
            Math.abs(p.width - (config.dimensions.exportWidth || config.dimensions.width)) < 2 &&
            Math.abs(p.height - (config.dimensions.exportHeight || config.dimensions.height)) < 2
        );

        if (!isStandard) {
           const w = config.dimensions.exportWidth || Math.round(config.dimensions.width * config.dimensions.scale);
           const h = config.dimensions.exportHeight || Math.round(config.dimensions.height * config.dimensions.scale);
           setWidth(w.toString());
           setHeight(h.toString());
           // Don't auto-enable custom if we just defaulted from current view, 
           // unless the user explicitly wants to add it. 
           // But for now let's leave it unchecked to encourage using presets.
        }
      }
    }
  }, [open, config.dimensions]);

  const handleTogglePreset = (label: string) => {
    setSelectedPresets((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleSave = () => {
    const newExportResolutions = [];

    // Add selected presets
    RESOLUTION_PRESETS.forEach((preset) => {
      if (selectedPresets.includes(preset.label)) {
        newExportResolutions.push({
          width: preset.width,
          height: preset.height,
          label: preset.label,
        });
      }
    });

    // Add custom if enabled and valid
    if (useCustom) {
      const w = parseInt(width);
      const h = parseInt(height);

      if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
        newExportResolutions.push({
          width: w,
          height: h,
          label: "Custom",
        });

        // Also update the current preview to this custom resolution
        const referenceHeight = 1080;
        const newScale = getResolutionScale(h);
        const baseWidth = Math.round((w / newScale) * 10000) / 10000;
        const baseHeight = referenceHeight;

        setDimensionsConfig({
          width: baseWidth,
          height: baseHeight,
          scale: newScale,
          exportWidth: w,
          exportHeight: h,
          exportResolutions: newExportResolutions,
        });
        
        onOpenChange(false);
        return;
      }
    }

    // Just update export list
    setDimensionsConfig({
      exportResolutions: newExportResolutions,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Gestion des résolutions</DialogTitle>
          <DialogDescription>
            Sélectionnez les résolutions à générer lors de l'export.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <Label className="text-base font-medium">Résolutions standards</Label>
            <div className="grid gap-2">
              {RESOLUTION_PRESETS.map((preset) => (
                <div key={preset.label} className="flex items-center space-x-2">
                  <Checkbox
                    id={`preset-${preset.label}`}
                    checked={selectedPresets.includes(preset.label)}
                    onCheckedChange={() => handleTogglePreset(preset.label)}
                  />
                  <Label
                    htmlFor={`preset-${preset.label}`}
                    className="flex flex-1 cursor-pointer items-center justify-between font-normal"
                  >
                    <span>{preset.label}</span>
                    <span className="text-muted-foreground text-xs">
                      {preset.desc}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="use-custom"
                checked={useCustom}
                onCheckedChange={(checked) => setUseCustom(checked as boolean)}
              />
              <Label htmlFor="use-custom" className="cursor-pointer text-base font-medium">
                Résolution personnalisée
              </Label>
            </div>
            
            {useCustom && (
              <div className="grid gap-4 pl-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="width" className="text-right">
                    Largeur
                  </Label>
                  <Input
                    id="width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="col-span-3"
                    type="number"
                    placeholder="1920"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="height" className="text-right">
                    Hauteur
                  </Label>
                  <Input
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="col-span-3"
                    type="number"
                    placeholder="1080"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Appliquer ({selectedPresets.length + (useCustom ? 1 : 0)})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
