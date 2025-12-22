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
    <div className="h-full flex flex-col">
      <WidgetTitle title={title} fontFamily={fontFamily} textColor={textColor} />
      <div className="flex-1 rounded-lg border-2 border-dashed border-current opacity-30 flex items-center justify-center">
        {/* Placeholder for icons */}
      </div>
    </div>
  );
};
