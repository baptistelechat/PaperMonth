import React from "react";
import { WidgetTitle } from "./WidgetTitle";

interface ZoneWidgetProps {
  title: string;
  fontFamily?: string;
  textColor?: "light" | "dark";
}

export const ZoneWidget: React.FC<ZoneWidgetProps> = ({
  title,
  fontFamily,
  textColor,
}) => {
  return (
    <div className="flex h-full flex-col">
      <WidgetTitle title={title} fontFamily={fontFamily} textColor={textColor} />
      <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-current opacity-30">
        {/* Placeholder for icons */}
      </div>
    </div>
  );
};
