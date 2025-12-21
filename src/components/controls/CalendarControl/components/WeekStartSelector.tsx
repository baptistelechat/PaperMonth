import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React from "react";

export const WeekStartSelector: React.FC = () => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm">Début de semaine</Label>
      <div className="flex bg-zinc-900 rounded-md p-1 border border-zinc-800">
        <Button
          variant={calendar.weekStart === "monday" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setCalendarConfig({ weekStart: "monday" })}
          className="h-7 text-xs"
        >
          Lun
        </Button>
        <Button
          variant={calendar.weekStart === "sunday" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setCalendarConfig({ weekStart: "sunday" })}
          className="h-7 text-xs"
        >
          Dim
        </Button>
      </div>
    </div>
  );
};
