import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { GRADIENT_PRESETS } from "@/utils/gradients";
import React from "react";

export const GradientPicker: React.FC = () => {
  const { config, setBackgroundConfig } = useWallpaperStore();
  const { background } = config;

  if (background.type !== "gradient") return null;

  return (
    <div className="grid grid-cols-3 gap-2">
      {GRADIENT_PRESETS.map((preset) => (
        <button
          key={preset.id}
          onClick={() => setBackgroundConfig({ gradient: preset.className })}
          className={`h-16 relative rounded-md ${
            preset.className
          } border transition-all overflow-hidden ${
            background.gradient === preset.className
              ? "ring-2 ring-white scale-105"
              : "border-transparent opacity-80 hover:opacity-100"
          }`}
          title={preset.name}
        >
          <div className="absolute bottom-0 right-0 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-tl-md">
            <span className="text-[10px] font-medium text-white/90">
              {preset.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
