import React from "react";

interface WidgetTitleProps {
  title: string;
  fontFamily?: string;
  textColor?: "light" | "dark";
  className?: string;
  level?: "h1" | "h2";
}

export const WidgetTitle: React.FC<WidgetTitleProps> = ({
  title,
  fontFamily,
  textColor = "light",
  className = "",
  level = "h2",
}) => {
  const Tag = level;

  return (
    <div className="mb-6">
      <Tag
        className={`font-bold tracking-tight drop-shadow-sm text-4xl ${textColor === "dark" ? "text-black" : "text-white"} ${className}`}
        style={{ fontFamily }}
      >
        {title}
      </Tag>
    </div>
  );
};
