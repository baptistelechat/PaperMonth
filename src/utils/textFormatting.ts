export const STOP_WORDS = [
  "le",
  "la",
  "les",
  "l",
  "un",
  "une",
  "des",
  "d",
  "du",
  "de",
  "a", // normalized 'à'
  "à",
  "et",
  "ou",
  "pour",
  "sur",
  "en",
  "dans",
  "par",
  "avec",
  "sous",
];

export function formatEventLabel(label: string): string {
  if (!label) return "";

  // 1. Remove specific prefixes (case insensitive)
  // We handle "Journée mondiale", "Journée internationale", "International Day", "World Day", and just "Journée"
  // Also proactively remove "du", "de", "des" if they follow immediately
  // And remove invisible characters like zero-width spaces (\u200B-\u200D\uFEFF)
  let cleaned = label
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(
      /(journées?|semaines?)(\s+(mondiale|internationale|nationale))?(\s+(des\s+nations\s+unies\s+pour|des|du|de|d'|d’))?/gi,
      ""
    )
    .replace(/(world|international)\s+day/gi, "")
    .replace(/\s*[([].*?[)\]]\s*$/g, "");

  // 2. Loop to remove leading stop words and non-alphanumeric characters (like ' - ')
  // We loop because removing one might expose another (e.g. "de la")
  let changed = true;
  while (changed) {
    changed = false;
    cleaned = cleaned.trim();

    // Remove leading punctuation/separators
    const punctuationMatch = cleaned.match(/^[-–:,]\s*/);
    if (punctuationMatch) {
      cleaned = cleaned.substring(punctuationMatch[0].length);
      changed = true;
      continue;
    }

    const lower = cleaned.toLowerCase();

    for (const word of STOP_WORDS) {
      // Check for "word " (space) or "word'" (apostrophe) or "word’" (curly apostrophe)
      // or if the string IS just the word (unlikely for a label but good for safety)
      if (
        lower.startsWith(word + " ") ||
        lower.startsWith(word + "'") ||
        lower.startsWith(word + "’")
      ) {
        // Remove the word and the following separator (space or apostrophe)
        // We need to be careful about length.
        // "de " -> 3 chars. "l'" -> 2 chars.

        // Find which separator was matched
        cleaned = cleaned.substring(word.length + 1);
        changed = true;
        break; // Restart loop
      }
    }
  }

  // 3. Remove trailing punctuation and spaces
  cleaned = cleaned.replace(/[,\s]+$/, "");

  // 4. Capitalize first letter
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  return cleaned;
}
