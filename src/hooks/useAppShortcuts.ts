import { SHORTCUTS_CONFIG } from "@/constants/shortcuts";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { useHotkeys } from "react-hotkeys-hook";

export const useAppShortcuts = () => {
  const { nextMonth, prevMonth, setCurrentDate, randomizeConfig, resetConfig } =
    useWallpaperStore();

  // Navigation
  useHotkeys(SHORTCUTS_CONFIG.prevMonth.keys, prevMonth);
  useHotkeys(SHORTCUTS_CONFIG.nextMonth.keys, nextMonth);

  // Actions
  useHotkeys(SHORTCUTS_CONFIG.random.keys, randomizeConfig);
  useHotkeys(SHORTCUTS_CONFIG.reset.keys, resetConfig);
  useHotkeys(SHORTCUTS_CONFIG.currentMonth.keys, setCurrentDate);
};
