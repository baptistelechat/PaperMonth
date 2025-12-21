import {
  BackgroundConfig,
  CalendarConfig,
  TypographyConfig,
  WallpaperConfig,
} from "@/types/calendar";
import { WidgetConfig } from "@/types/widgets";
import { FONT_PRESETS } from "@/utils/fonts";
import { GRADIENT_PRESETS } from "@/utils/gradients";
import { create } from "zustand";

interface WallpaperStore {
  config: WallpaperConfig;
  setCalendarConfig: (config: Partial<CalendarConfig>) => void;
  setBackgroundConfig: (config: Partial<BackgroundConfig>) => void;
  setTypographyConfig: (config: Partial<TypographyConfig>) => void;
  addWidget: (widget: WidgetConfig) => void;
  updateWidget: (id: string, updates: Partial<WidgetConfig>) => void;
  removeWidget: (id: string) => void;
  resetConfig: () => void;
  randomizeConfig: () => void;
}

export const getInitialConfig = (): WallpaperConfig => ({
  calendar: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    weekStart: "monday",
    titleFormat: "full",
    showWeekends: true,
    showHolidays: true,
    showHolidayNames: false,
    showSchoolHolidays: false,
    showWorldDays: true,
    schoolZone: "Zone A",
  },
  background: {
    type: "gradient",
    gradient: GRADIENT_PRESETS[17].className,
    overlayOpacity: 0.1,
    textColor: "light",
  },
  typography: {
    fontFamily: "Inter",
    fontSize: "md",
    applyToAll: true,
  },
  widgets: [],
});

export const useWallpaperStore = create<WallpaperStore>((set) => ({
  config: getInitialConfig(),
  setCalendarConfig: (updates) =>
    set((state) => ({
      config: {
        ...state.config,
        calendar: { ...state.config.calendar, ...updates },
      },
    })),
  setBackgroundConfig: (updates) =>
    set((state) => ({
      config: {
        ...state.config,
        background: { ...state.config.background, ...updates },
      },
    })),
  setTypographyConfig: (updates) =>
    set((state) => ({
      config: {
        ...state.config,
        typography: { ...state.config.typography, ...updates },
      },
    })),
  addWidget: (widget) =>
    set((state) => ({
      config: {
        ...state.config,
        widgets: [...state.config.widgets, widget],
      },
    })),
  updateWidget: (id, updates) =>
    set((state) => ({
      config: {
        ...state.config,
        widgets: state.config.widgets.map((w) =>
          w.id === id ? { ...w, ...updates } : w
        ),
      },
    })),
  removeWidget: (id) =>
    set((state) => ({
      config: {
        ...state.config,
        widgets: state.config.widgets.filter((w) => w.id !== id),
      },
    })),
  resetConfig: () => set({ config: getInitialConfig() }),
  randomizeConfig: () => {
    const randomGradient =
      GRADIENT_PRESETS[Math.floor(Math.random() * GRADIENT_PRESETS.length)];
    const randomFont =
      FONT_PRESETS[Math.floor(Math.random() * FONT_PRESETS.length)];

    set((state) => ({
      config: {
        ...state.config,
        background: {
          ...state.config.background,
          type: "gradient",
          gradient: randomGradient.className,
        },
        typography: {
          ...state.config.typography,
          fontFamily: randomFont.name,
        },
      },
    }));
  },
}));
