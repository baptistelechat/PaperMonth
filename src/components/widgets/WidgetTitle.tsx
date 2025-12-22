import React from "react";

interface WidgetTitleProps {
  title: string;
  fontFamily?: string;
  textColor?: "light" | "dark";
  className?: string;
}

export const WidgetTitle: React.FC<WidgetTitleProps> = ({
  title,
  fontFamily,
  textColor = "light",
  className = "",
}) => {
  return (
    <div className="mb-6">
      <h2
        className={`text-5xl font-bold tracking-tight drop-shadow-sm ${
          textColor === "dark" ? "text-black" : "text-white"
        } ${className}`}
        style={{ fontFamily }}
      >
        {title}
      </h2>
    </div>
  );
};
