import React from "react";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { formatMonthTitle } from "@/utils/dates";
import { TitleFormat } from "@/types/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CalendarControl: React.FC = () => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
        Calendrier
      </h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Format du titre</Label>
          <Select
            value={calendar.titleFormat}
            onValueChange={(val: TitleFormat) =>
              setCalendarConfig({ titleFormat: val })
            }
          >
            <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">
                Complet ({formatMonthTitle(calendar.month, calendar.year, "full")})
              </SelectItem>
              <SelectItem value="numeric">
                Numérique (
                {formatMonthTitle(
                  calendar.month,
                  calendar.year,
                  "numeric"
                )}
                )
              </SelectItem>
              <SelectItem value="uppercase">
                Majuscule (
                {formatMonthTitle(
                  calendar.month,
                  calendar.year,
                  "uppercase"
                )}
                )
              </SelectItem>
              <SelectItem value="abbreviated">
                Abrégé (
                {formatMonthTitle(
                  calendar.month,
                  calendar.year,
                  "abbreviated"
                )}
                )
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
  );
};
