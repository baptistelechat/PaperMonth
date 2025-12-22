import { TipCategory, TIPS } from "@/data/tips";
import {
  BackgroundConfig,
  CalendarConfig,
  TipsConfig,
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
  setTipsConfig: (config: Partial<TipsConfig>) => void;
  addWidget: (widget: WidgetConfig) => void;
  updateWidget: (id: string, updates: Partial<WidgetConfig>) => void;
  removeWidget: (id: string) => void;
  resetConfig: () => void;
  randomizeConfig: () => void;
}

const getRandomTips = (count: number = 3, categories: TipCategory[] = []) => {
  let filteredTips = TIPS;
  if (categories.length > 0) {
    filteredTips = TIPS.filter((tip) => categories.includes(tip.category));
  }
  const shuffled = [...filteredTips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

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
  tips: {
    currentTips: getRandomTips(3, [
      "Productivité",
      "Bien-être",
      "Focus",
      "Numérique",
      "Créativité",
    ]),
    selectedCategories: [
      "Productivité",
      "Bien-être",
      "Focus",
      "Numérique",
      "Créativité",
    ],
  },
  widgets: [
    {
      id: "software-zone",
      type: "software",
      visible: true,
      colStart: 5,
      colSpan: 5,
      rowStart: 1,
      rowSpan: 6,
      size: "md",
      opacity: 1,
    },
    {
      id: "folder-zone",
      type: "folder",
      visible: true,
      colStart: 8,
      colSpan: 5,
      rowStart: 7,
      rowSpan: 6,
      size: "md",
      opacity: 1,
    },
    {
      id: "key-dates-widget",
      type: "keyDates",
      visible: true,
      colStart: 1,
      colSpan: 7,
      rowStart: 7,
      rowSpan: 6,
      size: "md",
      opacity: 1,
    },
    {
      id: "tip-widget",
      type: "tip",
      visible: true,
      colStart: 10,
      colSpan: 3,
      rowStart: 1,
      rowSpan: 6,
      size: "md",
      opacity: 1,
    },
  ],
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
  setTipsConfig: (updates) =>
    set((state) => ({
      config: {
        ...state.config,
        tips: { ...state.config.tips, ...updates },
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
  resetConfig: () =>
    set((state) => {
      const initial = getInitialConfig();
      return {
        config: {
          ...initial,
          tips: {
            ...initial.tips,
            currentTips: state.config.tips.currentTips,
          },
        },
      };
    }),
  randomizeConfig: () => {
    const randomGradient =
      GRADIENT_PRESETS[Math.floor(Math.random() * GRADIENT_PRESETS.length)];
    const randomFont =
      FONT_PRESETS[Math.floor(Math.random() * FONT_PRESETS.length)];
    const randomTextColor = Math.random() > 0.5 ? "light" : "dark";
    const randomOpacity = Math.round(Math.random() * 10) / 10;
    const randomApplyToAll = Math.random() > 0.5;

    set((state) => ({
      config: {
        ...state.config,
        background: {
          ...state.config.background,
          type: "gradient",
          gradient: randomGradient.className,
          textColor: randomTextColor,
          overlayOpacity: randomOpacity,
        },
        typography: {
          ...state.config.typography,
          fontFamily: randomFont.name,
          applyToAll: randomApplyToAll,
        },
      },
    }));
  },
}));
