import React from 'react';
import { getDaysInMonth, getFirstDayOfMonth, DAYS_FR, DAYS_FR_SUNDAY_START } from '@/utils/dates';
import { CalendarConfig } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { SchoolHoliday } from '@/hooks/useHolidays';

interface CalendarGridProps {
  config: CalendarConfig;
  holidays: Array<{ date: string; localName: string }>;
  schoolHolidays?: SchoolHoliday[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ config, holidays, schoolHolidays }) => {
  const {
    month,
    year,
    weekStart,
    showWeekends,
    showHolidays,
    showHolidayNames,
    showSchoolHolidays,
  } = config;

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year, weekStart);
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const weekDays = weekStart === 'monday' ? DAYS_FR : DAYS_FR_SUNDAY_START;

  // Helper to check if a day is a holiday
  const getHoliday = (day: number) => {
    if (!showHolidays) return null;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays.find(h => h.date === dateStr);
  };

  // Helper to check if a day is a school holiday
  const getSchoolHoliday = (day: number) => {
    if (!showSchoolHolidays || !schoolHolidays) return null;
    
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    return schoolHolidays.find(h => {
        // Extract YYYY-MM-DD
        const start = h.start_date.split('T')[0];
        const end = h.end_date.split('T')[0];
        
        // Holiday is strictly between start (end of class) and end (resumption of class)
        return dateStr > start && dateStr < end;
    });
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
          const schoolHoliday = getSchoolHoliday(day);
          
          return (
            <div 
              key={day} 
              className={cn(
                "h-10 flex flex-col items-center justify-center relative rounded-md transition-colors",
                // Base styles
                "text-white",
                
                // School Holiday styling (Background highlight)
                // Use a soft color, distinct from weekends but harmonious
                schoolHoliday && "bg-indigo-500/20 text-indigo-100",

                // Weekend styling (dimmed text, slight bg)
                // If it's a school holiday AND weekend, maybe blend?
                // If weekend, usually we want to keep it dimmed unless it's a special holiday.
                showWeekends && isWknd && !schoolHoliday && "bg-white/5 text-white/70",
                showWeekends && isWknd && schoolHoliday && "bg-indigo-500/30 text-indigo-100/90",

                // Holiday styling (stronger bg, bright text, bold) - overrides weekend and school holiday
                holiday && "bg-white/10 font-bold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
              )}
            >
              <span className="text-lg leading-none">
                {day}
              </span>
              
              {holiday && (
                showHolidayNames ? (
                  <span className="text-[0.6rem] leading-none opacity-80 truncate w-full text-center px-1 mt-0.5">
                    {holiday.localName}
                  </span>
                ) : (
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
