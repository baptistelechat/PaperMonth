import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { formatMonthTitle } from "@/utils/dates";
import { TitleFormat } from "@/types/calendar";
import React from "react";

export const TitleFormatSelector: React.FC = () => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  return (
    <div className="space-y-2">
      <Label className="text-sm">Format du titre</Label>
      <Select
        value={calendar.titleFormat}
        onValueChange={(val: TitleFormat) =>
          setCalendarConfig({ titleFormat: val })
        }
      >
        <SelectTrigger className="w-full border-zinc-800 bg-zinc-900">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full">
            Complet ({formatMonthTitle(calendar.month, calendar.year, "full")})
          </SelectItem>
          <SelectItem value="uppercase">
            Majuscule ({formatMonthTitle(calendar.month, calendar.year, "uppercase")})
          </SelectItem>
          <SelectItem value="Month">
            Mois seul ({formatMonthTitle(calendar.month, calendar.year, "Month")})
          </SelectItem>
          <SelectItem value="mm/yyyy">
            Numérique complet ({formatMonthTitle(calendar.month, calendar.year, "mm/yyyy")})
          </SelectItem>
          <SelectItem value="mm/yy">
            Numérique court ({formatMonthTitle(calendar.month, calendar.year, "mm/yy")})
          </SelectItem>
          <SelectItem value="MMM/YYYY">
            Abrégé complet ({formatMonthTitle(calendar.month, calendar.year, "MMM/YYYY")})
          </SelectItem>
          <SelectItem value="MMM/YY">
            Abrégé court ({formatMonthTitle(calendar.month, calendar.year, "MMM/YY")})
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
