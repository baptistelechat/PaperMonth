import React from "react";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { MONTH_NAMES_FR } from "@/utils/dates";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DateControl: React.FC = () => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
        Date
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs text-zinc-500">Mois</Label>
          <Select
            value={calendar.month.toString()}
            onValueChange={(val) => setCalendarConfig({ month: parseInt(val) })}
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
  );
};
