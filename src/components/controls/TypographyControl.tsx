import { Button } from "@/components/ui/button";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { FONT_PRESETS } from "@/utils/gradients";
import React from "react";

export const TypographyControl: React.FC = () => {
  const { config, setTypographyConfig } = useWallpaperStore();
  const { typography } = config;

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
        Typographie
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {FONT_PRESETS.map((font) => (
          <Button
            key={font.id}
            variant={
              typography.fontFamily === font.name ? "secondary" : "outline"
            }
            onClick={() => setTypographyConfig({ fontFamily: font.name })}
            className="h-auto py-2 text-sm font-normal border-zinc-800"
            style={{ fontFamily: font.name }}
          >
            {font.name}
          </Button>
        ))}
      </div>
    </section>
  );
};
