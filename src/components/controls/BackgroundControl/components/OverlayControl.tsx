import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React from "react";

export const OverlayControl: React.FC = () => {
  const { config, setBackgroundConfig } = useWallpaperStore();
  const { background } = config;

  return (
    <div className="space-y-3 pt-2">
      <div className="flex justify-between">
        <Label className="text-xs text-zinc-500">Opacité Overlay</Label>
        <span className="text-xs text-zinc-400">
          {Math.round(background.overlayOpacity * 100)}%
        </span>
      </div>
      <Slider
        min={0}
        max={1}
        step={0.05}
        value={[background.overlayOpacity]}
        onValueChange={(vals) =>
          setBackgroundConfig({ overlayOpacity: vals[0] })
        }
        className="py-2"
      />
    </div>
  );
};
