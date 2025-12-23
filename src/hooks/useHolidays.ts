import { getFrenchCelebrations } from "@/utils/frenchDays";
import { useEffect, useState } from "react";

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
          allHolidays = [...allHolidays, ...frenchCelebrations].sort(
            (a: Holiday, b: Holiday) => a.date.localeCompare(b.date)
          );
        }

        setHolidays(allHolidays);

        // Fetch school holidays
        // We fetch holidays that overlap with the current year
        const baseUrl =
          "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records";

        // Filter for holidays overlapping with the requested year
        // Logic: The holiday must start BEFORE the year ends AND end AFTER the year begins.
        // We use inclusive boundaries (<= and >=) to capture holidays starting/ending exactly on Jan 1st or Dec 31st.
        let whereQuery = `start_date <= "${year}-12-31" AND end_date >= "${year}-01-01"`;

        // Add Zone Filter
        if (schoolZone && schoolZone !== "all") {
          if (schoolZone === "Corse") {
            whereQuery += ` AND (zones="Corse" OR location="Corse")`;
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
            whereQuery += ` AND (zones="${schoolZone}" OR location="${schoolZone}")`;
          } else {
            // Standard Metro Zones (A, B, C)
            whereQuery += ` AND zones="${schoolZone}"`;
          }
        }

        // Add Population Filter (Students only)
        // We exclude teachers explicitly to be safe, or match 'Élèves'
        // Based on previous logic: !h.population || h.population === "Élèves" || h.population === "-"
        // ODSQL approach: (population IS NULL OR population = "Élèves" OR population = "-")
        // Simpler approach that usually works for this dataset: population != "Enseignants"
        whereQuery += ` AND (population="Élèves" OR population="-" OR population IS NULL)`;

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
          setSchoolHolidays(allResults);
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
