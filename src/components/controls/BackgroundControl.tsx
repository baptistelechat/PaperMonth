import React from "react";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { GRADIENT_PRESETS } from "@/utils/gradients";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const BackgroundControl: React.FC = () => {
  const { config, setBackgroundConfig } = useWallpaperStore();
  const { background } = config;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundConfig({
          type: "image",
          imageUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
        Fond d'écran
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={
              background.type === "gradient" ? "secondary" : "outline"
            }
            onClick={() => setBackgroundConfig({ type: "gradient" })}
            className="w-full border-zinc-800"
          >
            Gradients
          </Button>
          <Button
            variant={
              background.type === "image" ? "secondary" : "outline"
            }
            onClick={() => setBackgroundConfig({ type: "image" })}
            className="w-full border-zinc-800"
          >
            Image
          </Button>
        </div>

        {background.type === "gradient" && (
          <div className="grid grid-cols-3 gap-2">
            {GRADIENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() =>
                  setBackgroundConfig({ gradient: preset.className })
                }
                className={`h-12 rounded-md ${
                  preset.className
                } border transition-all ${
                  background.gradient === preset.className
                    ? "ring-2 ring-white scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                title={preset.name}
              />
            ))}
          </div>
        )}

        {background.type === "image" && (
          <div className="space-y-2">
            <div className="relative border-2 border-dashed border-zinc-800 rounded-lg p-6 hover:bg-zinc-900 transition-colors cursor-pointer text-center group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <Upload className="w-8 h-8 mx-auto mb-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                Cliquez pour uploader une image
              </span>
            </div>
            {background.imageUrl && (
              <div className="text-xs text-emerald-500 text-center font-medium">
                Image chargée avec succès
              </div>
            )}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div className="flex justify-between">
            <Label className="text-xs text-zinc-500">
              Opacité Overlay
            </Label>
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
      </div>
    </section>
  );
};
