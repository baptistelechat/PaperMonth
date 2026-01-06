import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { useHotkeys } from "react-hotkeys-hook";

export const useAppShortcuts = () => {
  const { nextMonth, prevMonth, setCurrentDate, randomizeConfig, resetConfig } =
    useWallpaperStore();

  // Navigation (Flèches + Q/A pour Gauche + D pour Droite)
  // On écoute 'q' et 'a' pour couvrir les claviers AZERTY et QWERTY
  useHotkeys(["left", "a"], prevMonth);
  useHotkeys(["right", "d"], nextMonth);

  // Actions
  useHotkeys(["r", "space"], randomizeConfig); // R ou Espace pour Random
  useHotkeys(["w", "backspace", "delete"], resetConfig); // Z, W, Retour arrière ou Suppr pour Reset
  useHotkeys("t", setCurrentDate); // T pour Today
};
