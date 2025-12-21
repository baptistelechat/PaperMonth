import { Holiday } from "@/hooks/useHolidays";

// Helper to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Calculate Easter Sunday (Meeus/Jones/Butcher's algorithm)
const getEasterDate = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
};

// Calculate Pentecost (Pentecôte) - 49 days after Easter
const getPentecostDate = (year: number): Date => {
  const easter = getEasterDate(year);
  return addDays(easter, 49);
};

// Calculate Ascension - 39 days after Easter
const getAscensionDate = (year: number): Date => {
  const easter = getEasterDate(year);
  return addDays(easter, 39);
};

// Get the Nth weekday of a month
// weekday: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
const getNthWeekdayOfMonth = (year: number, month: number, weekday: number, n: number): Date => {
  let count = 0;
  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day);
    if (date.getMonth() !== month) break;
    if (date.getDay() === weekday) {
      count++;
      if (count === n) return date;
    }
  }
  throw new Error("Date not found");
};

// Get the last weekday of a month
const getLastWeekdayOfMonth = (year: number, month: number, weekday: number): Date => {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  let date = lastDayOfMonth;
  while (date.getDay() !== weekday) {
    date = addDays(date, -1);
  }
  return date;
};

export const getFrenchCelebrations = (year: number): Holiday[] => {
  const celebrations: Holiday[] = [];

  const addCelebration = (date: Date, name: string) => {
    const dateStr = `${year}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    celebrations.push({
      date: dateStr,
      localName: name,
      name: name,
      countryCode: "FR",
      fixed: false,
      global: false,
      counties: null,
      launchYear: null,
      types: ["Observance"],
    });
  };

  // 0. Épiphanie: First Sunday of Jan after Jan 1st (or Jan 6th traditionally, but in France usually celebrated on Sunday)
  // For calendar purposes, often Jan 6th is noted, but the celebration is the Sunday.
  // Let's stick to the 1st Sunday of January, unless Jan 1st is Sunday, then it's Jan 8th?
  // Actually in France: "L'Épiphanie a lieu le 6 janvier. Cependant, le jour n'étant pas férié, elle est célébrée le premier dimanche de janvier sauf si celui-ci tombe le 1er janvier."
  let epiphany = getNthWeekdayOfMonth(year, 0, 0, 1);
  if (epiphany.getDate() === 1) {
    epiphany = getNthWeekdayOfMonth(year, 0, 0, 2);
  }
  addCelebration(epiphany, "Épiphanie");

  // Chandeleur: Feb 2
  addCelebration(new Date(year, 1, 2), "Chandeleur");

  // Mardi Gras: 47 days before Easter
  const easter = getEasterDate(year);
  const mardiGras = addDays(easter, -47);
  addCelebration(mardiGras, "Mardi Gras");

  // 1. Fête des Grands-Mères: First Sunday of March
  // Month is 0-indexed in JS Date (0 = Jan, 2 = March)
  const grandMothersDay = getNthWeekdayOfMonth(year, 2, 0, 1);
  addCelebration(grandMothersDay, "Fête des Grands-Mères");

  // 2. Fête des Mères: Last Sunday of May. Exception: if Pentecost, then 1st Sunday of June.
  const pentecost = getPentecostDate(year);
  let mothersDay = getLastWeekdayOfMonth(year, 4, 0); // May is month 4

  // Check if Pentecost falls on the same day
  if (pentecost.getTime() === mothersDay.getTime()) {
    mothersDay = getNthWeekdayOfMonth(year, 5, 0, 1); // 1st Sunday of June (month 5)
  }
  addCelebration(mothersDay, "Fête des Mères");

  // 3. Fête des Pères: 3rd Sunday of June
  const fathersDay = getNthWeekdayOfMonth(year, 5, 0, 3);
  addCelebration(fathersDay, "Fête des Pères");

  // Fête des Grands-Pères: First Sunday of October
  const grandFathersDay = getNthWeekdayOfMonth(year, 9, 0, 1);
  addCelebration(grandFathersDay, "Fête des Grands-Pères");

  // Sainte-Catherine: Nov 25
  addCelebration(new Date(year, 10, 25), "Sainte-Catherine");

  // Saint-Nicolas: Dec 6
  addCelebration(new Date(year, 11, 6), "Saint-Nicolas");

  // 4. Fête des Voisins: Generally last Friday of May.
  // Exception (heuristic): Avoid Pont de l'Ascension (Friday after Ascension).
  const ascension = getAscensionDate(year);
  const ascensionFriday = addDays(ascension, 1);
  let neighboursDay = getLastWeekdayOfMonth(year, 4, 5); // Last Friday (5) of May (4)

  if (neighboursDay.getTime() === ascensionFriday.getTime()) {
    // If it falls on Ascension Friday, move to previous Friday (common practice) or next Friday (June)
    // In 2025, it's moved to previous Friday (May 23rd).
    neighboursDay = addDays(neighboursDay, -7);
  }
  addCelebration(neighboursDay, "Fête des Voisins");

  // 5. Fixed dates
  const fixedDates = [
    { month: 1, day: 14, name: "Saint-Valentin" }, // Feb 14
    { month: 2, day: 17, name: "Saint Patrick" }, // Mar 17
    { month: 3, day: 1, name: "Poisson d'avril" }, // Apr 1
    { month: 5, day: 21, name: "Fête de la Musique" }, // June 21
    { month: 9, day: 31, name: "Halloween" }, // Oct 31
  ];

  fixedDates.forEach(d => {
    const date = new Date(year, d.month, d.day);
    addCelebration(date, d.name);
  });
  
  // Sort by date
  return celebrations.sort((a, b) => a.date.localeCompare(b.date));
};
