import React from 'react';
import { formatMonthTitle } from '@/utils/dates';
import { CalendarConfig } from '@/types/calendar';

interface CalendarHeaderProps {
  config: CalendarConfig;
  fontFamily?: string;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ config, fontFamily }) => {
  const { month, year, titleFormat } = config;
  
  return (
    <div className="mb-6">
      <h1 
        className="text-5xl font-bold tracking-tight text-white drop-shadow-sm"
        style={{ fontFamily }}
      >
        {formatMonthTitle(month, year, titleFormat)}
      </h1>
    </div>
  );
};
