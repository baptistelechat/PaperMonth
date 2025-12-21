import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React from "react";
import { ControlGridButtons } from "../../components/ControlGridButtons";

export const BackgroundTypeSelector: React.FC = () => {
  const { config, setBackgroundConfig } = useWallpaperStore();
  const { background } = config;

  const options = [
    { label: "Gradients", value: "gradient" },
    { label: "Image", value: "image" },
  ];

  return (
    <ControlGridButtons 
      value={background.type}
      onChange={(val) =>
        setBackgroundConfig({ type: val as "gradient" | "image" })
      }
      options={options}
    />
  );
};
