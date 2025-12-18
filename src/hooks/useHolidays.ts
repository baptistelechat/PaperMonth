import { useState, useEffect } from 'react';

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export function useHolidays(year: number, countryCode: string = 'FR') {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHolidays() {
      if (!year) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch holidays');
        }
        const data = await response.json();
        setHolidays(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error("Error fetching holidays:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHolidays();
  }, [year, countryCode]);

  return { holidays, loading, error };
}
