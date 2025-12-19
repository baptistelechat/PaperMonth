import React from 'react';
import { getDaysInMonth, getFirstDayOfMonth, DAYS_FR, DAYS_EN } from '@/utils/dates';
import { CalendarConfig } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  config: CalendarConfig;
  holidays: Array<{ date: string; localName: string }>;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ config, holidays }) => {
  const { month, year, weekStart, showWeekends, showHolidays } = config;
  
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year, weekStart);
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const weekDays = weekStart === 'monday' ? DAYS_FR : DAYS_EN; // Using FR for Monday start as default for this app context, logic can be improved

  // Helper to check if a day is a holiday
  const getHoliday = (day: number) => {
    if (!showHolidays) return null;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays.find(h => h.date === dateStr);
  };

  // Helper to check if day is weekend
  const isWeekend = (index: number) => {
    // index includes blanks. 
    // If weekStart is Monday (0), Saturday is 5, Sunday is 6.
    // If weekStart is Sunday (0), Saturday is 6, Sunday is 0.
    const dayOfWeek = (index) % 7;
    if (weekStart === 'monday') {
      return dayOfWeek === 5 || dayOfWeek === 6;
    } else {
      return dayOfWeek === 0 || dayOfWeek === 6;
    }
  };

  return (
    <div className="w-full">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium opacity-70">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="h-10" />
        ))}
        
        {days.map((day, i) => {
          const absoluteIndex = i + firstDay;
          const isWknd = isWeekend(absoluteIndex);
          const holiday = getHoliday(day);
          
          return (
            <div 
              key={day} 
              className={cn(
                "h-10 flex flex-col items-center justify-center relative rounded-md transition-colors",
                // Base styles
                "text-white",
                // Weekend styling (dimmed text, slight bg)
                showWeekends && isWknd && "bg-white/5 text-white/70",
                // Holiday styling (stronger bg, bright text, bold) - overrides weekend style if conflicting
                holiday && "bg-white/10 font-bold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
              )}
            >
              <span className="text-lg leading-none">
                {day}
              </span>
              
              {holiday && (
                <span className="text-[0.6rem] leading-none opacity-80 truncate w-full text-center px-1 mt-0.5">
                  {holiday.localName}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
