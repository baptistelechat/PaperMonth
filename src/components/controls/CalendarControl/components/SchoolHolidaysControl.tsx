import { SchoolHoliday } from "@/hooks/useHolidays";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { SchoolZone } from "@/types/calendar";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";
import { ControlSwitch } from "../../components/ControlSwitch";
import { ControlSelect } from "../../components/ControlSelect";

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

interface SchoolHolidaysControlProps {
  schoolHolidays: SchoolHoliday[];
}

export const SchoolHolidaysControl: React.FC<SchoolHolidaysControlProps> = ({
  schoolHolidays,
}) => {
  const { config, setCalendarConfig } = useWallpaperStore();
  const { calendar } = config;

  const hasSchoolHolidaysInMonth = useMemo(() => {
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

  const zoneOptions = [
    {
      label: "Zones Académiques",
      items: [
        { label: "Zone A", value: "Zone A" },
        { label: "Zone B", value: "Zone B" },
        { label: "Zone C", value: "Zone C" },
      ],
    },
    {
      label: "Régions Spécifiques",
      items: [
        { label: "Corse", value: "Corse" },
        { label: "Guadeloupe", value: "Guadeloupe" },
        { label: "Guyane", value: "Guyane" },
        { label: "Martinique", value: "Martinique" },
        { label: "Mayotte", value: "Mayotte" },
        { label: "Nouvelle Calédonie", value: "Nouvelle Calédonie" },
        { label: "Polynésie", value: "Polynésie" },
        { label: "Réunion", value: "Réunion" },
        { label: "Saint Pierre et Miquelon", value: "Saint Pierre et Miquelon" },
        { label: "Wallis et Futuna", value: "Wallis et Futuna" },
      ],
    },
  ];

  const helpContent = (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">Zones Académiques</h4>
      <div className="grid gap-3">
        {Object.entries(ACADEMY_ZONES).map(([zone, academies]) => (
          <div key={zone} className="space-y-1">
            <p className="text-primary text-sm font-medium">{zone}</p>
            <p className="text-muted-foreground text-xs leading-snug">
              {academies.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {hasSchoolHolidaysInMonth && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-4">
              <ControlSwitch
                label="Vacances scolaires"
                checked={calendar.showSchoolHolidays}
                onCheckedChange={(checked) =>
                  setCalendarConfig({ showSchoolHolidays: checked })
                }
                id="show-school-holidays"
              />

              <AnimatePresence>
                {calendar.showSchoolHolidays && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ControlSelect
                      label="Zone scolaire"
                      value={calendar.schoolZone}
                      onValueChange={(val) =>
                        setCalendarConfig({ schoolZone: val as SchoolZone })
                      }
                      options={zoneOptions}
                      helpContent={helpContent}
                      indent={true}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
