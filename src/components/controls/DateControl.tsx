import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { MONTH_NAMES_FR } from "@/utils/dates";
import React from "react";
import { ControlSelect } from "./components/ControlSelect";
import { SectionHeader } from "./components/SectionHeader";

export const DateControl: React.FC = () => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  const monthOptions = MONTH_NAMES_FR.map((name, i) => ({
    label: name,
    value: i.toString(),
  }));

  return (
    <section className="space-y-4">
      <SectionHeader title="Date" />

      <div className="grid grid-cols-2 gap-4">
        <ControlSelect
          label="Mois"
          value={calendar.month.toString()}
          onValueChange={(val) => setCalendarConfig({ month: parseInt(val) })}
          options={monthOptions}
          placeholder="Sélectionner le mois"
        />

        <div className="space-y-2">
          <Label className="text-sm">Année</Label>
          <Input
            type="number"
            value={calendar.year}
            onChange={(e) =>
              setCalendarConfig({ year: parseInt(e.target.value) })
            }
            className="border-zinc-800 bg-zinc-900"
          />
        </div>
      </div>
    </section>
  );
};
