export type ShortcutCategory = "Navigation" | "Actions";

export interface ShortcutConfig {
  keys: string[];
  label: string;
  category: ShortcutCategory;
}

export const SHORTCUTS_CONFIG: Record<string, ShortcutConfig> = {
  prevMonth: {
    keys: ["left", "a"],
    label: "Mois précédent",
    category: "Navigation",
  },
  nextMonth: {
    keys: ["right", "d"],
    label: "Mois suivant",
    category: "Navigation",
  },
  currentMonth: {
    keys: ["t"],
    label: "Mois actuel",
    category: "Navigation",
  },
  random: {
    keys: ["r", "space"],
    label: "Aléatoire",
    category: "Actions",
  },
  reset: {
    keys: ["backspace", "delete"],
    label: "Réinitialiser",
    category: "Actions",
  },
};

export const KEY_DISPLAY_MAP: Record<string, string> = {
  left: "←",
  right: "→",
  up: "↑",
  down: "↓",
  space: "Espace",
  backspace: "Retour",
  delete: "Suppr",
  a: "Q",
};

export const formatKeyForDisplay = (key: string): string => {
  return KEY_DISPLAY_MAP[key.toLowerCase()] || key.toUpperCase();
};
