import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { MONTH_NAMES_FR } from "@/utils/dates";
import { FONT_PRESETS, GRADIENT_PRESETS } from "@/utils/gradients";
import { Upload } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export const ControlPanel: React.FC = () => {
  const {
    config,
    setCalendarConfig,
    setBackgroundConfig,
    setTypographyConfig,
  } = useWallpaperStore();
  const { calendar, background, typography } = config;

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
    <div className="w-96 shrink-0 bg-zinc-950 text-white border-r border-white/10 flex flex-col h-screen">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-bold tracking-tight">Configuration</h2>
      </div>

      {/* Hauteur de l'écran (100vh) - Hauteur du header (~77px: p-6(24*2) + text-xl(28) + border(1)) */}
      <ScrollArea className="h-[calc(100vh-78px)]">
        <div className="p-6 space-y-8">
          {/* Date Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Date
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-zinc-500">Mois</Label>
                <Select
                  value={calendar.month.toString()}
                  onValueChange={(val) =>
                    setCalendarConfig({ month: parseInt(val) })
                  }
                >
                  <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
                    <SelectValue placeholder="Sélectionner le mois" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTH_NAMES_FR.map((name, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-zinc-500">Année</Label>
                <Input
                  type="number"
                  value={calendar.year}
                  onChange={(e) =>
                    setCalendarConfig({ year: parseInt(e.target.value) })
                  }
                  className="bg-zinc-900 border-zinc-800"
                />
              </div>
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Calendar Options */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Calendrier
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Format du titre</Label>
                <Select
                  value={calendar.titleFormat}
                  onValueChange={(val: any) =>
                    setCalendarConfig({ titleFormat: val })
                  }
                >
                  <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">
                      Complet (Décembre 2025)
                    </SelectItem>
                    <SelectItem value="numeric">
                      Numérique (12 / 2025)
                    </SelectItem>
                    <SelectItem value="uppercase">
                      Majuscule (DECEMBER 2025)
                    </SelectItem>
                    <SelectItem value="abbreviated">
                      Abrégé (DEC. 2025)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Début de semaine</Label>
                <div className="flex bg-zinc-900 rounded-md p-1 border border-zinc-800">
                  <Button
                    variant={
                      calendar.weekStart === "monday" ? "secondary" : "ghost"
                    }
                    size="sm"
                    onClick={() => setCalendarConfig({ weekStart: "monday" })}
                    className="h-7 text-xs"
                  >
                    Lun
                  </Button>
                  <Button
                    variant={
                      calendar.weekStart === "sunday" ? "secondary" : "ghost"
                    }
                    size="sm"
                    onClick={() => setCalendarConfig({ weekStart: "sunday" })}
                    className="h-7 text-xs"
                  >
                    Dim
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label
                  className="text-sm cursor-pointer"
                  htmlFor="show-weekends"
                >
                  Afficher Week-ends
                </Label>
                <Switch
                  id="show-weekends"
                  checked={calendar.showWeekends}
                  onCheckedChange={(checked) =>
                    setCalendarConfig({ showWeekends: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label
                  className="text-sm cursor-pointer"
                  htmlFor="show-holidays"
                >
                  Jours fériés (FR)
                </Label>
                <Switch
                  id="show-holidays"
                  checked={calendar.showHolidays}
                  onCheckedChange={(checked) =>
                    setCalendarConfig({ showHolidays: checked })
                  }
                />
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-xs text-zinc-500">
                  Couleur d'accent
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    "#3b82f6",
                    "#ef4444",
                    "#10b981",
                    "#f59e0b",
                    "#8b5cf6",
                    "#ec4899",
                    "#ffffff",
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => setCalendarConfig({ accentColor: color })}
                      className={`w-6 h-6 rounded-full border border-white/10 transition-transform hover:scale-110 ${
                        calendar.accentColor === color
                          ? "ring-2 ring-white scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Background Section */}
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

          <Separator className="bg-white/10" />

          {/* Typography Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Typographie
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {FONT_PRESETS.map((font) => (
                <Button
                  key={font.id}
                  variant={
                    typography.fontFamily === font.name
                      ? "secondary"
                      : "outline"
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
        </div>
      </ScrollArea>
    </div>
  );
};
