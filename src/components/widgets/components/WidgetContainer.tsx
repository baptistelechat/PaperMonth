import { cn } from "@/lib/utils";
import React from "react";

interface WidgetContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
  opacity?: number;
  themeClasses: {
    container: string;
    text: string;
  };
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  colStart,
  colSpan,
  rowStart,
  rowSpan,
  opacity = 1,
  themeClasses,
  className,
  style,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "backdrop-blur-sm rounded-xl p-8 border flex flex-col shadow-2xl transition-all duration-300",
        themeClasses.container,
        themeClasses.text,
        className
      )}
      style={{
        gridColumnStart: colStart,
        gridColumnEnd: `span ${colSpan}`,
        gridRowStart: rowStart,
        gridRowEnd: `span ${rowSpan}`,
        opacity,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
