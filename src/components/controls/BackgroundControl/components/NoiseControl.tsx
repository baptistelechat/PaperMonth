import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React from "react";

export const NoiseControl: React.FC = () => {
  const { config, setBackgroundConfig } = useWallpaperStore();
  const { background } = config;
  const currentNoise = background.noise ?? 0;

  return (
    <div className="space-y-3 pt-2">
      <div className="flex justify-between">
        <Label className="text-xs text-zinc-500">Grain (Bruit)</Label>
        <span className="text-xs text-zinc-400">
          {Math.round(currentNoise * 100)}%
        </span>
      </div>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={[currentNoise]}
        onValueChange={(vals) =>
          setBackgroundConfig({ noise: vals[0] })
        }
        className="py-2"
      />
    </div>
  );
};
