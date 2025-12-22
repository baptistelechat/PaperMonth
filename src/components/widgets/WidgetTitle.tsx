import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import React from "react";

interface WidgetTitleProps {
  title: string;
  textColor?: "light" | "dark";
  className?: string;
  level?: "h1" | "h2";
  fontFamily?: string;
}

export const WidgetTitle: React.FC<WidgetTitleProps> = ({
  title,
  textColor = "light",
  className = "",
  level = "h2",
  fontFamily,
}) => {
  const { config } = useWallpaperStore();
  const { typography } = config;

  const Tag = level;

  return (
    <div className="mb-6">
      <Tag
        className={`font-bold tracking-tight drop-shadow-sm text-4xl ${
          textColor === "dark" ? "text-black" : "text-white"
        } ${className}`}
        style={{ fontFamily: fontFamily || typography.fontFamily }}
      >
        {title}
      </Tag>
    </div>
  );
};
