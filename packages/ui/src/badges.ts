// Badge definitions and unlock logic for CDM 2026

export interface BadgeDef {
  id: string;
  emoji: string;
  name: string;
  description: string;
  nameDE?: string;
  descriptionDE?: string;
  category: "pronostic" | "engagement" | "quiz" | "exploration";
}

export const BADGE_DEFS: BadgeDef[] = [
  { id: "first-prono", emoji: " ", name: "Premier Pronostic", nameDE: "Erste Prognose", description: "Soumettre son 1er pronostic", descriptionDE: "Erste Prognose abgeben", category: "pronostic" },
  { id: "streak7", emoji: " ", name: "Streak x7", nameDE: "Streak x7", description: "7 jours consécutifs de visite", descriptionDE: "7 Tage in Folge besucht", category: "engagement" },
  { id: "expert-cdm", emoji: " ", name: "Expert CDM", nameDE: "WM-Experte", description: "Score quiz > 80%", descriptionDE: "Quiz-Score > 80%", category: "quiz" },
  { id: "oracle", emoji: "🔮", name: "Oracle", nameDE: "Oracle", description: "3 pronostics corrects d'affilée", descriptionDE: "3 richtige Prognosen in Folge", category: "pronostic" },
  { id: "globe-trotter", emoji: "", name: "Globe Trotter", nameDE: "Globe Trotter", description: "Visiter toutes les pages stades", descriptionDE: "Alle Stadion-Seiten besuchen", category: "exploration" },
  { id: "champion", emoji: " ", name: "Champion", nameDE: "Champion", description: "Terminer le simulateur", descriptionDE: "Den Turnierbaum abschließen", category: "engagement" },
  { id: "assidu", emoji: " ", name: "Assidu", nameDE: "Treuer Fan", description: "Visiter le site 30 jours", descriptionDE: "Die Seite 30 Tage besuchen", category: "engagement" },
];

// localStorage keys
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

// Total stadium pages on the site (16 stadiums)
export const TOTAL_STADIUMS = 16;

export function getLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function setLS(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export interface BadgeState {
  pronoCount: number;
  pronoCorrectStreak: number;
  streak: number;
  visitDays: number;
  quizBestPercent: number;
  bracketDone: boolean;
  visitedStadiums: number;
}

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

export function computeUnlocked(state: BadgeState): string[] {
  return BADGE_DEFS.filter((b) => checkBadge(b.id, state)).map((b) => b.id);
}

/** Get localized badge name */
export function getBadgeName(badge: BadgeDef, lang: "fr" | "de" = "fr"): string {
  return lang === "de" ? (badge.nameDE ?? badge.name) : badge.name;
}

/** Get localized badge description */
export function getBadgeDescription(badge: BadgeDef, lang: "fr" | "de" = "fr"): string {
  return lang === "de" ? (badge.descriptionDE ?? badge.description) : badge.description;
}
