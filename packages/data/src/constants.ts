/* ─── Event dates ─── */
export const EVENT_DATES = {
  /** Tournament opening match */
  START: "2026-06-11",
  /** Final match */
  END: "2026-07-19",
  /** Draw date */
  DRAW_DATE: "2025-12-13",
  /** Human-readable range (FR) */
  RANGE_FR: "11 juin – 19 juillet 2026",
  /** Total tournament days */
  DURATION_DAYS: 39,
  /** Total matches */
  TOTAL_MATCHES: 104,
} as const;

/* ─── External URLs ─── */
export const EXTERNAL_URLS = {
  /** Main site URL */
  SITE: "https://www.cdm2026.fr",
  /** With www prefix (used in some structured data) */
  SITE_WWW: "https://www.cdm2026.fr",
  /** Contact email */
  CONTACT_EMAIL: "contact@cdm2026.fr",
  /** FIFA tickets page */
  FIFA_TICKETS: "https://www.fifa.com/en/tournaments/mens/worldcup/26/tickets",
  /** FIFA main site */
  FIFA_SITE: "https://www.fifa.com",
} as const;

/* ─── Stage labels ─── */
export const stageLabels: Record<string, string> = {
  group: "Phase de groupes",
  "round-of-32": "32e de finale",
  "round-of-16": "Huitième de finale",
  "quarter-final": "Quart de finale",
  "semi-final": "Demi-finale",
  "third-place": "Match pour la 3e place",
  final: "Finale",
};

/* ─── Display limits ─── */
export const DISPLAY_LIMITS = {
  UPCOMING_MATCHES_HOME: 3,
  TOP_TEAMS: 10,
  RECENT_ARTICLES: 3,
  TOP_SCORERS: 20,
  BOOKMAKERS_PREVIEW: 3,
  TEAM_SCORERS_PREVIEW: 3,
} as const;
