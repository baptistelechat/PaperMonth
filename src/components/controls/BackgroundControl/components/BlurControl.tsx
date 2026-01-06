import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React from "react";

export const BlurControl: React.FC = () => {
  const { config, setBackgroundConfig } = useWallpaperStore();
  const { background } = config;
  const currentBlur = background.blur ?? 0;

  if (background.type !== "image") return null;

  return (
    <div className="space-y-3 pt-2">
      <div className="flex justify-between">
        <Label className="text-xs text-zinc-500">Flou arrière-plan</Label>
        <span className="text-xs text-zinc-400">
          {Math.round(currentBlur)}px
        </span>
      </div>
      <Slider
        min={0}
        max={40}
        step={1}
        value={[currentBlur]}
        onValueChange={(vals) =>
          setBackgroundConfig({ blur: vals[0] })
        }
        className="py-2"
      />
    </div>
  );
};
