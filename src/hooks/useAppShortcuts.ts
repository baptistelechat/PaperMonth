import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const useAppShortcuts = () => {
  const { nextMonth, prevMonth, setCurrentDate } = useWallpaperStore();

  // Navigation basée sur la position physique des touches (Layout-agnostic)
  // KeyA = Emplacement de Q (AZERTY) et A (QWERTY) -> Gauche
  // KeyD = Emplacement de D (AZERTY et QWERTY) -> Droite
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorer si l'utilisateur tape dans un champ texte
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      switch (e.code) {
        case "ArrowLeft":
        case "KeyA": // Position physique "Gauche" (Q sur AZERTY, A sur QWERTY)
          prevMonth();
          break;
        case "ArrowRight":
        case "KeyD": // Position physique "Droite"
          nextMonth();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextMonth, prevMonth]);

  // Actions spécifiques (lettres)
  useHotkeys("t", setCurrentDate); // T pour Today
};
