import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { FONT_PRESETS } from "@/utils/fonts";
import React from "react";
import { ControlGridButtons } from "./components/ControlGridButtons";
import { ControlSwitch } from "./components/ControlSwitch";
import { SectionHeader } from "./components/SectionHeader";

export const TypographyControl: React.FC = () => {
  const { config, setTypographyConfig } = useWallpaperStore();
  const { typography } = config;

  const fontOptions = FONT_PRESETS.map((font) => ({
    label: font.name,
    value: font.name,
    style: { fontFamily: font.name },
  }));

  return (
    <section className="space-y-4">
      <SectionHeader title="Typographie" />

      <ControlSwitch
        label="Appliquer à tout"
        checked={typography.applyToAll}
        onCheckedChange={(checked) =>
          setTypographyConfig({ applyToAll: checked })
        }
        id="apply-to-all"
      />

      <ControlGridButtons
        value={typography.fontFamily}
        onChange={(val) => setTypographyConfig({ fontFamily: val })}
        options={fontOptions}
        buttonClassName="h-auto py-2 text-sm font-normal"
      />
    </section>
  );
};
