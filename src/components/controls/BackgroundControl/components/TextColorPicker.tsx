import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React from "react";
import { ControlGridButtons } from "../../components/ControlGridButtons";

export const TextColorPicker: React.FC = () => {
  const { config, setBackgroundConfig } = useWallpaperStore();
  const { background } = config;

  const options = [
    { label: "Clair", value: "light" },
    { label: "Sombre", value: "dark" },
  ];

  return (
    <div className="pt-2">
      <ControlGridButtons
        label="Couleur du texte"
        value={background.textColor}
        onChange={(val) =>
          setBackgroundConfig({ textColor: val as "light" | "dark" })
        }
        options={options}
      />
    </div>
  );
};
