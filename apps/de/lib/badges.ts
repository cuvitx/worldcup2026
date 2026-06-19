/**
 * Badge definitions and unlock logic for CDM 2026
 * @module badges
 */

/**
 * Badge definition structure
 */
export interface BadgeDef {
  id: string;
  emoji: string;
  name: string;
  description: string;
  category: "pronostic" | "engagement" | "quiz" | "exploration";
}

/**
 * List of all available badges with their metadata
 */
export const BADGE_DEFS: BadgeDef[] = [
  { id: "first-prono", emoji: "🎯", name: "Premier Pronostic", description: "Soumettre son 1er pronostic", category: "pronostic" },
  { id: "streak7", emoji: "🔥", name: "Streak x7", description: "7 jours consécutifs de visite", category: "engagement" },
  { id: "expert-cdm", emoji: "🧠", name: "Expert CDM", description: "Score quiz > 80%", category: "quiz" },
  { id: "oracle", emoji: "🔮", name: "Oracle", description: "3 pronostics corrects d'affilée", category: "pronostic" },
  { id: "globe-trotter", emoji: "🌍", name: "Globe Trotter", description: "Visiter toutes les pages stades", category: "exploration" },
  { id: "champion", emoji: "🏆", name: "Champion", description: "Terminer le simulateur", category: "engagement" },
  { id: "assidu", emoji: "📅", name: "Assidu", description: "Visiter le site 30 jours", category: "engagement" },
];

/**
 * LocalStorage keys used for badge tracking and user progress
 */
export const BADGE_KEYS = {
  unlockedBadges: "cdm2026-badges-unlocked",
  pronoCount: "cdm2026-prono-count",
  pronoCorrectStreak: "cdm2026-prono-correct-streak",
  visitDays: "cdm2026-visit-days",
  streak: "cdm2026-streak",
  streakLastDate: "cdm2026-streak-last-date",
  quizBestPercent: "cdm2026-quiz-best-percent",
  bracketDone: "cdm2026-bracket-done",
  visitedStadiums: "cdm2026-visited-stadiums",
  visitedPages: "cdm2026-visited-pages",
} as const;

/**
 * Total stadium pages on the site (16 stadiums)
 */
export const TOTAL_STADIUMS = 16;

/**
 * Get a value from localStorage with type safety and fallback
 * @template T - The expected return type
 * @param {string} key - The localStorage key
 * @param {T} fallback - Default value if key doesn't exist or parsing fails
 * @returns {T} Parsed value from localStorage or fallback
 * @example
 * const badges = getLS<string[]>("cdm2026-badges-unlocked", []);
 */
export function getLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Save a value to localStorage with JSON serialization
 * @param {string} key - The localStorage key
 * @param {unknown} value - The value to store (will be JSON.stringify'd)
 * @example
 * setLS("cdm2026-badges-unlocked", ["first-prono", "streak7"]);
 */
export function setLS(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * User progress state for badge unlock calculation
 */
export interface BadgeState {
  pronoCount: number;
  pronoCorrectStreak: number;
  streak: number;
  visitDays: number;
  quizBestPercent: number;
  bracketDone: boolean;
  visitedStadiums: number;
}

/**
 * Check if a specific badge should be unlocked based on user state
 * @param {string} id - The badge ID to check
 * @param {BadgeState} s - Current user progress state
 * @returns {boolean} True if the badge is unlocked, false otherwise
 * @example
 * const state = { pronoCount: 5, streak: 10, ... };
 * checkBadge("first-prono", state); // true
 * checkBadge("streak7", state); // true
 */
export function checkBadge(id: string, s: BadgeState): boolean {
  switch (id) {
    case "first-prono": return s.pronoCount >= 1;
    case "streak7": return s.streak >= 7;
    case "expert-cdm": return s.quizBestPercent > 80;
    case "oracle": return s.pronoCorrectStreak >= 3;
    case "globe-trotter": return s.visitedStadiums >= TOTAL_STADIUMS;
    case "champion": return s.bracketDone;
    case "assidu": return s.visitDays >= 30;
    default: return false;
  }
}

/**
 * Compute all currently unlocked badge IDs based on user state
 * @param {BadgeState} state - Current user progress state
 * @returns {string[]} Array of unlocked badge IDs
 * @example
 * const state = { pronoCount: 5, streak: 10, visitDays: 35, ... };
 * computeUnlocked(state); // ["first-prono", "streak7", "assidu"]
 */
export function computeUnlocked(state: BadgeState): string[] {
  return BADGE_DEFS.filter((b) => checkBadge(b.id, state)).map((b) => b.id);
}
