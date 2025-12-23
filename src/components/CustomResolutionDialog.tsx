import { Button } from "@/components/ui/button";
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
  const [width, setWidth] = useState(config.dimensions.width.toString());
  const [height, setHeight] = useState(config.dimensions.height.toString());

  // Reset inputs when dialog opens
  useEffect(() => {
    if (open) {
      // If we are currently in a scaled view (e.g. HD/4K), show the *export* dimensions
      const currentExportWidth = Math.round(
        config.dimensions.width * (config.dimensions.scale || 1)
      );
      const currentExportHeight = Math.round(
        config.dimensions.height * (config.dimensions.scale || 1)
      );

      setWidth(currentExportWidth.toString());
      setHeight(currentExportHeight.toString());
    }
  }, [open, config.dimensions]);

  const handleSave = () => {
    const w = parseInt(width);
    const h = parseInt(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      return;
    }

    // Calculate scale to maintain consistent UI size
    // We use 1080px as the reference height for UI scaling
    const referenceHeight = 1080;
    const newScale = h / referenceHeight;

    // The store width/height should be the "base" dimensions for the canvas
    // so that when multiplied by scale, it equals the target export dimensions.
    // storeWidth * scale = targetWidth => storeWidth = targetWidth / scale
    // Round to 4 decimal places to avoid precision issues
    const baseWidth = Math.round((w / newScale) * 10000) / 10000;
    const baseHeight = referenceHeight;

    setDimensionsConfig({
      width: baseWidth,
      height: baseHeight,
      scale: newScale,
      exportWidth: w,
      exportHeight: h,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Dimensions personnalisées</DialogTitle>
          <DialogDescription>
            Définissez la taille exacte de votre fond d'écran.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Appliquer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
