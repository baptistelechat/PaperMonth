import { useEffect, useState } from "react";
import { getFrenchCelebrations } from "@/utils/frenchDays";

export interface Holiday {
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

export interface SchoolHoliday {
  description: string;
  start_date: string;
  end_date: string;
  zones: string;
  location: string;
  annee_scolaire: string;
  population?: string; // 'Élèves', 'Enseignants'
}

export function useHolidays(
  year: number,
  countryCode: string = "FR",
  schoolZone: string = "Zone A"
) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [schoolHolidays, setSchoolHolidays] = useState<SchoolHoliday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHolidays() {
      if (!year) return;

      setLoading(true);
      setError(null);
      try {
        // Fetch public holidays
        const response = await fetch(
          `https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch holidays");
        }
        const data = await response.json();
        
        let allHolidays = data;
        if (countryCode === "FR") {
           const frenchCelebrations = getFrenchCelebrations(year);
           // Merge and sort
           allHolidays = [...allHolidays, ...frenchCelebrations].sort((a: Holiday, b: Holiday) => a.date.localeCompare(b.date));
        }

        setHolidays(allHolidays);

        // Fetch school holidays
        // We fetch holidays that overlap with the current year
        const baseUrl =
          "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records";

        // Filter for holidays overlapping with the requested year
        const whereQuery = `start_date < "${year}-12-31" AND end_date > "${year}-01-01"`;
        const encodedWhere = encodeURIComponent(whereQuery);

        // Pagination loop to fetch all records (limit is capped at 100)
        let allResults: SchoolHoliday[] = [];
        let offset = 0;
        let totalCount = 0;
        const limit = 100;

        do {
          const schoolResponse = await fetch(
            `${baseUrl}?where=${encodedWhere}&limit=${limit}&offset=${offset}`
          );

          if (!schoolResponse.ok) {
            console.warn("Failed to fetch school holidays page");
            break;
          }

          const schoolData = await schoolResponse.json();
          const results = schoolData.results || [];
          totalCount = schoolData.total_count || 0;

          allResults = [...allResults, ...results];
          offset += limit;

          // Break if we fetched everything or if no more results
          if (results.length === 0 || allResults.length >= totalCount) {
            break;
          }
        } while (offset < totalCount && allResults.length < totalCount);

        if (allResults.length > 0) {
          let results = allResults;

          // Filter by zone
          if (schoolZone && schoolZone !== "all") {
            if (schoolZone === "Corse") {
              // Corse sometimes appears as location 'Corse' or zone 'Corse'
              results = results.filter(
                (h) => h.location === "Corse" || h.zones === "Corse"
              );
            } else if (
              [
                "Guadeloupe",
                "Guyane",
                "Martinique",
                "Mayotte",
                "Nouvelle Calédonie",
                "Polynésie",
                "Réunion",
                "Saint Pierre et Miquelon",
                "Wallis et Futuna",
              ].includes(schoolZone)
            ) {
              // For Overseas territories, usually the Zone name matches the territory name
              // or the location matches.
              results = results.filter(
                (h) => h.zones === schoolZone || h.location === schoolZone
              );
            } else {
              // Standard Metro Zones (A, B, C)
              results = results.filter((h) => h.zones === schoolZone);
            }
          }

          // Filter for 'Élèves' population if specified (sometimes dataset has separate rows for teachers)
          // Usually we want student holidays.
          results = results.filter(
            (h) =>
              !h.population || h.population === "Élèves" || h.population === "-"
          );

          setSchoolHolidays(results);
        } else {
          console.warn("No school holidays found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error fetching holidays:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHolidays();
  }, [year, countryCode, schoolZone]);

  return { holidays, schoolHolidays, loading, error };
}
