import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { getInitialConfig, useWallpaperStore } from "@/hooks/useWallpaperStore";
import { Calendar as CalendarIcon, RotateCcw, Shuffle } from "lucide-react";
import React, { useMemo } from "react";

export const ConfigActions: React.FC = () => {
  const { config, setCalendarConfig, resetConfig, randomizeConfig } =
    useWallpaperStore();
  const { calendar } = config;

  // Determine if current view is current date
  const isCurrentDate = useMemo(() => {
    const now = new Date();
    return (
      calendar.month === now.getMonth() && calendar.year === now.getFullYear()
    );
  }, [calendar.month, calendar.year]);

  // Determine if config is default
  const isDefaultConfig = useMemo(() => {
    const initial = getInitialConfig();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentTips: _c, ...configTipsWithoutCurrent } = config.tips;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentTips: _i, ...initialTipsWithoutCurrent } = initial.tips;

    const configToCompare = { ...config, tips: configTipsWithoutCurrent };
    const initialToCompare = { ...initial, tips: initialTipsWithoutCurrent };

    return JSON.stringify(configToCompare) === JSON.stringify(initialToCompare);
  }, [config]);

  const handleCurrentMonth = () => {
    const now = new Date();
    setCalendarConfig({ month: now.getMonth(), year: now.getFullYear() });
  };

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon"
        onClick={handleCurrentMonth}
        title="Date courante"
        disabled={isCurrentDate}
      >
        <CalendarIcon className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={randomizeConfig}
        title="Aléatoire"
      >
        <Shuffle className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={resetConfig}
        title="Réinitialiser"
        disabled={isDefaultConfig}
      >
        <RotateCcw className="size-4" />
      </Button>
    </ButtonGroup>
  );
};
