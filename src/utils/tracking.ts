import { WallpaperConfig } from "@/types/calendar";
import { GRADIENT_PRESETS } from "@/utils/gradients";

export const getExportTrackingData = (
  config: WallpaperConfig,
  exportType: "Month" | "Year"
) => {
  const gradient = GRADIENT_PRESETS.find(
    (g) => g.className === config.background.gradient
  );

  const backgroundName =
    config.background.type === "image"
      ? "Image"
      : gradient
      ? gradient.name
      : "Custom Gradient";

  const finalWidth =
    config.dimensions.exportWidth ??
    Math.round(config.dimensions.width * config.dimensions.scale);
  const finalHeight =
    config.dimensions.exportHeight ??
    Math.round(config.dimensions.height * config.dimensions.scale);

  return {
    type: exportType,
    year: config.calendar.year,
    month: exportType === "Month" ? config.calendar.month + 1 : undefined,
    dimensions: `${finalWidth}x${finalHeight}`,
    show_holidays: config.calendar.showHolidays,
    show_school_holidays: config.calendar.showSchoolHolidays,
    show_world_days: config.calendar.showWorldDays,
    background_type:
      config.background.type[0].toUpperCase() + config.background.type.slice(1),
    background_name: backgroundName,
    text_color: config.background.textColor,
    font_family: config.typography.fontFamily,
    apply_font_to_all: config.typography.applyToAll,
  };
};
