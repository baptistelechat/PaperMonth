import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useHolidays } from "@/hooks/useHolidays";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { SchoolZone, TitleFormat } from "@/types/calendar";
import { formatMonthTitle } from "@/utils/dates";
import { getWorldDaysForYear } from "@/utils/worldDays";
import { CircleHelp } from "lucide-react";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";

const ACADEMY_ZONES = {
  "Zone A": [
    "Besançon",
    "Bordeaux",
    "Clermont-Ferrand",
    "Dijon",
    "Grenoble",
    "Limoges",
    "Lyon",
    "Poitiers",
  ],
  "Zone B": [
    "Aix-Marseille",
    "Amiens",
    "Lille",
    "Nancy-Metz",
    "Nantes",
    "Nice",
    "Normandie",
    "Orléans-Tours",
    "Reims",
    "Rennes",
    "Strasbourg",
  ],
  "Zone C": ["Créteil", "Montpellier", "Paris", "Toulouse", "Versailles"],
};

export const CalendarControl: React.FC = () => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  const { schoolHolidays, holidays } = useHolidays(
    calendar.year,
    "FR",
    calendar.schoolZone
  );

  const hasSchoolHolidaysInMonth = React.useMemo(() => {
    if (!schoolHolidays || schoolHolidays.length === 0) return false;

    const monthStart = `${calendar.year}-${String(calendar.month + 1).padStart(
      2,
      "0"
    )}-01`;
    const lastDay = new Date(calendar.year, calendar.month + 1, 0).getDate();
    const monthEnd = `${calendar.year}-${String(calendar.month + 1).padStart(
      2,
      "0"
    )}-${String(lastDay).padStart(2, "0")}`;

    return schoolHolidays.some((h) => {
      const start = h.start_date.split("T")[0];
      const end = h.end_date.split("T")[0];
      return start <= monthEnd && end >= monthStart;
    });
  }, [schoolHolidays, calendar.month, calendar.year]);

  const hasHolidaysInMonth = React.useMemo(() => {
    if (!holidays || holidays.length === 0) return false;

    const monthPrefix = `${calendar.year}-${String(calendar.month + 1).padStart(
      2,
      "0"
    )}`;
    return holidays.some((h) => h.date.startsWith(monthPrefix));
  }, [holidays, calendar.month, calendar.year]);

  // Get World Days for current month
  const worldDaysInMonth = React.useMemo(() => {
    const allWorldDays = getWorldDaysForYear(calendar.year);
    const monthPrefix = `${calendar.year}-${String(calendar.month + 1).padStart(
      2,
      "0"
    )}`;

    return allWorldDays
      .filter((day) => day.date.startsWith(monthPrefix))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [calendar.month, calendar.year]);

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
                Complet (
                {formatMonthTitle(calendar.month, calendar.year, "full")})
              </SelectItem>
              <SelectItem value="uppercase">
                Majuscule (
                {formatMonthTitle(calendar.month, calendar.year, "uppercase")})
              </SelectItem>
              <SelectItem value="Month">
                Mois seul (
                {formatMonthTitle(calendar.month, calendar.year, "Month")})
              </SelectItem>
              <SelectItem value="mm/yyyy">
                Numérique complet (
                {formatMonthTitle(calendar.month, calendar.year, "mm/yyyy")})
              </SelectItem>
              <SelectItem value="mm/yy">
                Numérique court (
                {formatMonthTitle(calendar.month, calendar.year, "mm/yy")})
              </SelectItem>
              <SelectItem value="MMM/YYYY">
                Abrégé complet (
                {formatMonthTitle(calendar.month, calendar.year, "MMM/YYYY")})
              </SelectItem>
              <SelectItem value="MMM/YY">
                Abrégé court (
                {formatMonthTitle(calendar.month, calendar.year, "MMM/YY")})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

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

        <div className="flex items-center justify-between">
          <Label className="text-sm cursor-pointer" htmlFor="show-weekends">
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

        {hasHolidaysInMonth && (
          <div className="flex items-center justify-between">
            <Label className="text-sm cursor-pointer" htmlFor="show-holidays">
              Jours fériés
            </Label>
            <Switch
              id="show-holidays"
              checked={calendar.showHolidays}
              onCheckedChange={(checked) =>
                setCalendarConfig({ showHolidays: checked })
              }
            />
          </div>
        )}

        {calendar.showHolidays && hasHolidaysInMonth && (
          <div className="flex items-center justify-between">
            <Label
              className="text-sm cursor-pointer"
              htmlFor="show-holiday-names"
            >
              Afficher le noms des jours fériés
            </Label>
            <Switch
              id="show-holiday-names"
              checked={calendar.showHolidayNames}
              onCheckedChange={(checked) =>
                setCalendarConfig({ showHolidayNames: checked })
              }
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-sm cursor-pointer" htmlFor="show-world-days">
              Journées Mondiales
            </Label>
            {worldDaysInMonth.length > 0 && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <CircleHelp className="size-4 text-muted-foreground cursor-help" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80" side="right" align="start">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm">
                      Journées Mondiales du mois{" "}
                      <span className="text-muted-foreground font-mono shrink-0">
                        ({worldDaysInMonth.length})
                      </span>
                    </h4>
                    <ScrollArea className="h-72 w-full pr-4">
                      <div className="grid gap-2">
                        {worldDaysInMonth.map((day, index) => (
                          <div
                            key={`${day.date}-${index}`}
                            className="flex gap-2 text-sm"
                          >
                            <span className="text-muted-foreground font-mono shrink-0">
                              {new Date(day.date)
                                .getDate()
                                .toString()
                                .padStart(2, "0")}
                            </span>
                            <span className="text-primary leading-snug">
                              {day.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
          <Switch
            id="show-world-days"
            checked={calendar.showWorldDays}
            onCheckedChange={(checked) =>
              setCalendarConfig({ showWorldDays: checked })
            }
          />
        </div>

        {hasSchoolHolidaysInMonth && (
          <div className="flex items-center justify-between">
            <Label
              className="text-sm cursor-pointer"
              htmlFor="show-school-holidays"
            >
              Vacances scolaires
            </Label>
            <Switch
              id="show-school-holidays"
              checked={calendar.showSchoolHolidays}
              onCheckedChange={(checked) =>
                setCalendarConfig({ showSchoolHolidays: checked })
              }
            />
          </div>
        )}

        {calendar.showSchoolHolidays && hasSchoolHolidaysInMonth && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Zone scolaire</Label>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <CircleHelp className="size-4 text-muted-foreground cursor-help" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80" side="right" align="start">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm">Zones Académiques</h4>
                    <div className="grid gap-3">
                      {Object.entries(ACADEMY_ZONES).map(
                        ([zone, academies]) => (
                          <div key={zone} className="space-y-1">
                            <p className="text-sm font-medium text-primary">
                              {zone}
                            </p>
                            <p className="text-xs text-muted-foreground leading-snug">
                              {academies.join(", ")}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <Select
              value={calendar.schoolZone}
              onValueChange={(val: SchoolZone) =>
                setCalendarConfig({ schoolZone: val })
              }
            >
              <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Zones Académiques</SelectLabel>
                  <SelectItem value="Zone A">Zone A</SelectItem>
                  <SelectItem value="Zone B">Zone B</SelectItem>
                  <SelectItem value="Zone C">Zone C</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Régions Spécifiques</SelectLabel>
                  <SelectItem value="Corse">Corse</SelectItem>
                  <SelectItem value="Guadeloupe">Guadeloupe</SelectItem>
                  <SelectItem value="Guyane">Guyane</SelectItem>
                  <SelectItem value="Martinique">Martinique</SelectItem>
                  <SelectItem value="Mayotte">Mayotte</SelectItem>
                  <SelectItem value="Nouvelle Calédonie">
                    Nouvelle Calédonie
                  </SelectItem>
                  <SelectItem value="Polynésie">Polynésie</SelectItem>
                  <SelectItem value="Réunion">Réunion</SelectItem>
                  <SelectItem value="Saint Pierre et Miquelon">
                    Saint Pierre et Miquelon
                  </SelectItem>
                  <SelectItem value="Wallis et Futuna">
                    Wallis et Futuna
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </section>
  );
};
