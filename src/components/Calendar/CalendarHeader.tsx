import React from 'react';
import { formatMonthTitle } from '@/utils/dates';
import { CalendarConfig } from '@/types/calendar';

interface CalendarHeaderProps {
  config: CalendarConfig;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ config }) => {
  const { month, year, titleFormat } = config;
  
  return (
    <div className="mb-6">
      <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-sm">
        {formatMonthTitle(month, year, titleFormat)}
      </h1>
    </div>
  );
};
