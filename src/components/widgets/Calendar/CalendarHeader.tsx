import React from 'react';
import { formatMonthTitle } from '@/utils/dates';
import { CalendarConfig } from '@/types/calendar';

interface CalendarHeaderProps {
  config: CalendarConfig;
  fontFamily?: string;
  textColor?: "light" | "dark";
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  config, 
  fontFamily,
  textColor = "light"
}) => {
  const { month, year, titleFormat } = config;
  
  return (
    <div className="mb-6">
      <h1 
        className={`text-5xl font-bold tracking-tight drop-shadow-sm ${
          textColor === "dark" ? "text-black" : "text-white"
        }`}
        style={{ fontFamily }}
      >
        {formatMonthTitle(month, year, titleFormat)}
      </h1>
    </div>
  );
};
