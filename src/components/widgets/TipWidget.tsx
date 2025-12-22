import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { cn } from "@/lib/utils";
import React from "react";
import { WidgetTitle } from "./WidgetTitle";

interface TipWidgetProps {
  fontFamily?: string;
  textColor?: "light" | "dark";
}

export const TipWidget: React.FC<TipWidgetProps> = ({
  fontFamily,
  textColor = "light",
}) => {
  const { config } = useWallpaperStore();
  const { currentTips } = config.tips;

  const isDark = textColor === "dark";
  const textClass = isDark ? "text-black" : "text-white";

  const uniqueCategories = Array.from(
    new Set(currentTips.filter((t) => !t.isCustom).map((t) => t.category))
  )
    .join(" • ");

  return (
    <div className="group relative flex h-full flex-col">
      <WidgetTitle
        title="Conseils du mois"
        textColor={textColor}
        className="mb-4 text-3xl"
        fontFamily={fontFamily}
      />

      <div className="flex flex-1 flex-col justify-start">
        <ul
          className={cn("list-none pl-0 space-y-4", textClass)}
          style={{ fontFamily }}
        >
          {currentTips.map((tip, index) => (
            <li
              key={index}
              className="flex flex-col gap-1 text-xl leading-relaxed font-medium"
            >
              <div className="flex items-start gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                <span>{tip.content}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "absolute bottom-0 right-0 text-xs opacity-60 font-light uppercase tracking-wider",
          textClass
        )}
        style={{ fontFamily }}
      >
        {uniqueCategories}
      </div>
    </div>
  );
};
