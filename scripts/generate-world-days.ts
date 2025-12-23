import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";
import { STOP_WORDS } from "../src/utils/textFormatting";

// --- Types ---

type WorldDayRule =
  | { type: "fixed"; month: number; day: number }
  | {
      type: "weekday-of-month";
      month: number;
      weekday: number;
      occurrence: number;
    };

type WorldDay = {
  label: string;
  rule: WorldDayRule;
  source: "ONU" | "Wikipedia";
};

type WorldDaysMap = Record<string, WorldDay[]>;

// --- Configuration ---

const WIKIPEDIA_URL =
  "https://fr.wikipedia.org/wiki/Journ%C3%A9e_internationale";
const UN_URL = "https://www.un.org/fr/observances/list-days-weeks";
const OUTPUT_FILE = path.join(process.cwd(), "src", "data", "world-days.json");

const MONTHS: Record<string, number> = {
  janvier: 1,
  février: 2,
  mars: 3,
  avril: 4,
  mai: 5,
  juin: 6,
  juillet: 7,
  août: 8,
  septembre: 9,
  octobre: 10,
  novembre: 11,
  décembre: 12,
};

const WEEKDAYS: Record<string, number> = {
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
  dimanche: 7,
};

const OCCURRENCES: Record<string, number> = {
  premier: 1,
  "1er": 1,
  deuxième: 2,
  "2e": 2,
  second: 2,
  troisième: 3,
  "3e": 3,
  quatrième: 4,
  "4e": 4,
  dernier: -1,
  dernière: -1,
};

// --- Helpers ---

function getMonthNumber(name: string): number | undefined {
  if (!name) return undefined;
  return MONTHS[name.toLowerCase().trim()];
}

function getWeekdayNumber(name: string): number | undefined {
  if (!name) return undefined;
  return WEEKDAYS[name.toLowerCase().trim()];
}

function getOccurrenceNumber(text: string): number | undefined {
  if (!text) return undefined;
  const t = text.toLowerCase().trim();
  if (OCCURRENCES[t]) return OCCURRENCES[t];
  // Fallback for "1er", "2ème" etc if regex didn't catch it exactly
  if (t.startsWith("1")) return 1;
  if (t.startsWith("2")) return 2;
  if (t.startsWith("3")) return 3;
  if (t.startsWith("4")) return 4;
  return undefined;
}

function normalizeString(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

function getCanonicalKey(str: string): string {
  // 1. Lowercase and normalize spaces
  let s = normalizeString(str).toLowerCase();
  // 2. Remove accents
  s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // 3. Remove parentheses and their content (e.g. "(ONU)", "(UNESCO)")
  s = s.replace(/\([^)]*\)/g, "");
  // 4. Remove punctuation
  s = s.replace(/[.,:;!?'"’\-–]/g, " ");
  // 5. Remove stop words (French)
  // le, la, les, l, un, une, des, d, du, de, à, et, ou, pour, sur, en, dans, par, avec, sans, sous
  const regex = new RegExp(`\\b(${STOP_WORDS.join("|")})\\b`, "g");
  s = s.replace(regex, "");
  // 6. Normalize spaces again
  return normalizeString(s);
}

function areDuplicates(label1: string, label2: string): boolean {
  const k1 = getCanonicalKey(label1);
  const k2 = getCanonicalKey(label2);

  if (k1 === k2) return true;

  // Token-based overlap check
  const words1 = k1.split(" ").filter((w) => w.length > 2); // filter short words to avoid noise
  const words2 = k2.split(" ").filter((w) => w.length > 2);

  if (words1.length === 0 || words2.length === 0) return false;

  const set1 = new Set(words1);
  const intersection = words2.filter((w) => set1.has(w));

  const ratio = intersection.length / Math.min(words1.length, words2.length);

  // High threshold to be safe
  return ratio >= 0.8;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// --- Parsing Logic ---

function parseLine(line: string, currentMonth: number | null): WorldDay | null {
  const normalized = normalizeString(line);

  // 1. Try Fixed Date: "8 mars : Journée..." or "8 mars - Journée..."
  // Regex: Start with 1-2 digits, then month name, then separator
  const fixedRegex = /^(\d{1,2})\s+([a-zéû]+)\s*[:–-]\s*(.*)/i;
  const fixedMatch = normalized.match(fixedRegex);

  if (fixedMatch) {
    const day = parseInt(fixedMatch[1], 10);
    const monthName = fixedMatch[2];
    const label = fixedMatch[3];
    const month = getMonthNumber(monthName);

    if (month) {
      const cleanLabel = capitalizeFirstLetter(label.trim());
      if (!cleanLabel) return null;

      return {
        label: cleanLabel,
        rule: { type: "fixed", month, day },
        source: "Wikipedia", // Default to Wikipedia, refined later if needed
      };
    }
  }

  // 2. Try Variable Date:
  // Pattern A: "{occurrence} {weekday} {monthSeparator} {monthName} : {label}"
  // Pattern B: "{occurrence} {weekday} : {label}" (Implicit Month - relies on currentMonth)

  // Note: "du mois" can appear in Pattern B as "Dernier samedi du mois : ..."

  const occurrenceRegexStr =
    "(premier|1er|deuxième|2e|second|troisième|3e|quatrième|4e|dernier|dernière)";
  const weekdayRegexStr =
    "(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)";
  const monthSepRegexStr = "(?:de|du|d'|du mois de|du mois d')";

  // Full Regex:
  // Group 1: Occurrence
  // Group 2: Weekday
  // Group 3: Month Separator (optional)
  // Group 4: Month Name (optional)
  // Group 5: Label (after separator)

  // We construct regex carefully to allow optional month part
  const variableRegex = new RegExp(
    `^${occurrenceRegexStr}\\s+${weekdayRegexStr}(?:\\s+${monthSepRegexStr}\\s*([a-zéû]+)?)?\\s*(?:du mois)?\\s*[:–-]\\s*(.*)`,
    "i"
  );

  const variableMatch = normalized.match(variableRegex);

  if (variableMatch) {
    // variableMatch[3] is inside the non-capturing group for month separator??
    // Wait, regex construction above:
    // Group 1: occurrence
    // Group 2: weekday
    // Group 3: month name (if present)
    // Group 4: label
    // Let's re-verify group indices.

    // Actually, let's simplify regex to two separate checks to avoid group index confusion.

    // Case A: Explicit Month
    const explicitMonthRegex = new RegExp(
      `^${occurrenceRegexStr}\\s+${weekdayRegexStr}\\s+(?:de|du|d'|du mois de|du mois d')\\s*([a-zéû]+)\\s*[:–-]\\s*(.*)`,
      "i"
    );
    const matchA = normalized.match(explicitMonthRegex);

    if (matchA) {
      const occurrence = getOccurrenceNumber(matchA[1]);
      const weekday = getWeekdayNumber(matchA[2]);
      const month = getMonthNumber(matchA[3]);
      const label = matchA[4];

      if (occurrence && weekday && month) {
        return {
          label: capitalizeFirstLetter(label.trim()),
          rule: { type: "weekday-of-month", month, weekday, occurrence },
          source: "Wikipedia",
        };
      }
    }

    // Case B: Implicit Month (uses currentMonth)
    // Matches "Dernier samedi du mois : ..." or "2e mardi : ..."
    if (currentMonth) {
      const implicitMonthRegex = new RegExp(
        `^${occurrenceRegexStr}\\s+${weekdayRegexStr}(?:\\s+du mois)?\\s*[:–-]\\s*(.*)`,
        "i"
      );
      const matchB = normalized.match(implicitMonthRegex);

      if (matchB) {
        const occurrence = getOccurrenceNumber(matchB[1]);
        const weekday = getWeekdayNumber(matchB[2]);
        const label = matchB[3];

        if (occurrence && weekday) {
          return {
            label: capitalizeFirstLetter(label.trim()),
            rule: {
              type: "weekday-of-month",
              month: currentMonth,
              weekday,
              occurrence,
            },
            source: "Wikipedia",
          };
        }
      }
    }
  }

  // 3. If we are inside a month section, sometimes the line starts with just the day number
  // e.g. "21 : Journée..." (assuming we know the month from context)
  if (currentMonth) {
    const shortFixedRegex = /^(\d{1,2})\s*[:–-]\s*(.*)/i;
    const shortMatch = normalized.match(shortFixedRegex);
    if (shortMatch) {
      const day = parseInt(shortMatch[1], 10);
      const label = shortMatch[2];
      return {
        label: capitalizeFirstLetter(label.trim()),
        rule: { type: "fixed", month: currentMonth, day },
        source: "Wikipedia",
      };
    }
  }

  return null;
}

function generateKey(day: WorldDay): string {
  if (day.rule.type === "fixed") {
    const m = day.rule.month.toString().padStart(2, "0");
    const d = day.rule.day!.toString().padStart(2, "0");
    return `${m}-${d}`;
  } else if (day.rule.type === "weekday-of-month") {
    const m = day.rule.month.toString().padStart(2, "0");
    return `${m}-WEEKDAY`;
  }
  return "UNKNOWN";
}

async function scrapeWikipedia(results: WorldDaysMap) {
  console.log(`Fetching ${WIKIPEDIA_URL}...`);
  const response = await fetch(WIKIPEDIA_URL);
  const html = await response.text();
  const $ = cheerio.load(html);

  function processText(
    text: string,
    currentMonth: number | null,
    results: WorldDaysMap
  ) {
    // Remove references like [1], [2]
    const cleanText = text.replace(/\[\d+\]/g, "").trim();
    if (!cleanText) return;

    const worldDay = parseLine(cleanText, currentMonth);

    if (worldDay) {
      // Check source
      if (cleanText.includes("(ONU)") || cleanText.includes("Nations unies")) {
        worldDay.source = "ONU";
      }

      const key = generateKey(worldDay);
      if (!results[key]) {
        results[key] = [];
      }

      const exists = results[key].some((existing) =>
        areDuplicates(existing.label, worldDay.label)
      );

      if (!exists) {
        results[key].push(worldDay);
      }
    }
  }

  // Wikipedia structure for "Journée internationale":
  // Usually H2 or H3 headers with Month names, followed by UL lists.

  const content = $("#mw-content-text .mw-parser-output");

  let currentMonth: number | null = null;

  content.children().each((_, element) => {
    const el = $(element);

    // Check for Heading (Month)
    // Recent MediaWiki uses <div class="mw-heading"><h2>...</h2></div>
    let headingText = "";
    if (el.is("h2") || el.is("h3")) {
      headingText = el.text();
    } else if (el.find("h2, h3").length > 0) {
      headingText = el.find("h2, h3").first().text();
    }

    if (headingText) {
      const text = headingText
        .replace("[modifier | modifier le code]", "")
        .trim()
        .toLowerCase();
      // Remove extra info if heading has more text (e.g. "Janvier[edit]")
      const cleanText = text.split("[")[0].trim();
      const month = getMonthNumber(cleanText);
      if (month) {
        currentMonth = month;
        console.log(`Processing month: ${cleanText} (${month})`);
      }
    }

    // Check for List
    if (el.is("ul") || el.is("dl")) {
      el.find("li").each((_, li) => {
        const $li = $(li);

        // Handle nested lists
        const nestedUl = $li.children("ul");
        if (nestedUl.length > 0) {
          const clone = $li.clone();
          clone.children("ul").remove(); // Remove nested list to get just the text part
          const datePart = clone.text().trim();

          const dateMatch = datePart.match(/^(.+?)\s*[:–-]/);
          const datePrefix = dateMatch ? dateMatch[1] : datePart;

          // Process the parent text itself if it has content after the separator
          if (
            datePart.includes(":") ||
            datePart.includes("–") ||
            datePart.includes("-")
          ) {
            processText(datePart, currentMonth, results);
          }

          // Now iterate over the nested items
          nestedUl.find("li").each((_, subLi) => {
            const subText = $(subLi).text().trim();
            // Construct a combined string using the extracted date prefix
            const combined = `${datePrefix} : ${subText}`;
            processText(combined, currentMonth, results);
          });
        } else {
          // Simple item
          const text = $li.text().trim();
          processText(text, currentMonth, results);
        }
      });
    }
  });
}

async function scrapeUN(results: WorldDaysMap) {
  console.log(`Fetching ${UN_URL}...`);
  try {
    const response = await fetch(UN_URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    $(".views-row").each((_, element) => {
      const row = $(element);
      const titleEl = row.find(".views-field-title .field-content");
      const dateEl = row.find(
        ".views-field-field-event-date-1 .date-display-single"
      );

      const title = titleEl.text().trim();
      const dateStr = dateEl.attr("content"); // e.g. 2025-04-29T00:00:00+00:00

      if (title && dateStr) {
        const dateObj = new Date(dateStr);
        if (!isNaN(dateObj.getTime())) {
          const month = dateObj.getMonth() + 1;
          const day = dateObj.getDate();

          const worldDay: WorldDay = {
            label: capitalizeFirstLetter(title),
            rule: { type: "fixed", month, day },
            source: "ONU",
          };

          const key = generateKey(worldDay);
          if (!results[key]) {
            results[key] = [];
          }

          // Deduplication check
          const exists = results[key].some((existing) =>
            areDuplicates(existing.label, worldDay.label)
          );

          if (!exists) {
            results[key].push(worldDay);
          }
        }
      }
    });
    console.log("UN data parsed.");
  } catch (e) {
    console.error("Error scraping UN data:", e);
  }
}

// --- Main ---

async function main() {
  const results: WorldDaysMap = {};

  await scrapeWikipedia(results);
  await scrapeUN(results);

  // Count total events
  let totalEvents = 0;
  Object.values(results).forEach((arr) => (totalEvents += arr.length));
  console.log(`Parsed ${totalEvents} events.`);

  // Ensure directory exists
  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf-8");
  console.log(`Saved to ${OUTPUT_FILE}`);
}

main();
