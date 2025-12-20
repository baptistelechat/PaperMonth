import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { FONT_PRESETS } from "@/utils/fonts";
import React from "react";

export const TypographyControl: React.FC = () => {
  const { config, setTypographyConfig } = useWallpaperStore();
  const { typography } = config;

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
        Typographie
      </h3>

      <div className="flex items-center justify-between">
        <Label className="text-sm cursor-pointer" htmlFor="apply-to-all">
          Appliquer à tout
        </Label>
        <Switch
          id="apply-to-all"
          checked={typography.applyToAll}
          onCheckedChange={(checked) =>
            setTypographyConfig({ applyToAll: checked })
          }
        />
      </div>

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
