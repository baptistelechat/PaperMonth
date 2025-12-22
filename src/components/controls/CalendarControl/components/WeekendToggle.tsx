import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React from "react";

export const WeekendToggle: React.FC = () => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  return (
    <div className="flex items-center justify-between">
      <Label className="cursor-pointer text-sm" htmlFor="show-weekends">
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
  );
};
