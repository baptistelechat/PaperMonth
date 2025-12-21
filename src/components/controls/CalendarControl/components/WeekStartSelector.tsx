import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Label } from "@/components/ui/label";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React from "react";

export const WeekStartSelector: React.FC = () => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  const options = [
    { label: "Lun", value: "monday" },
    { label: "Dim", value: "sunday" },
  ];

  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm">Début de semaine</Label>
      <ButtonGroup>
        {options.map((option) => (
          <Button
            key={option.value}
            variant={
              calendar.weekStart === option.value ? "secondary" : "outline"
            }
            size="sm"
            onClick={() =>
              setCalendarConfig({
                weekStart: option.value as "monday" | "sunday",
              })
            }
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
