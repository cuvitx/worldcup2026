export interface TeamRating {
  attack: number;
  defense: number;
  physical: number;
  technique: number;
  experience: number;
}

/**
 * Ratings /100 for each of the 48 World Cup 2026 teams.
 * Based on FIFA ranking, World Cup palmares, recent form & squad quality.
 */
export const teamRatings: Record<string, TeamRating> = {
  // ── GROUP A ──
  mexique:            { attack: 76, defense: 72, physical: 78, technique: 77, experience: 88 },
  "afrique-du-sud":   { attack: 58, defense: 55, physical: 68, technique: 56, experience: 45 },
  "coree-du-sud":     { attack: 70, defense: 68, physical: 75, technique: 72, experience: 72 },
  "barrage-uefa-d":   { attack: 62, defense: 60, physical: 65, technique: 63, experience: 40 },

  // ── GROUP B ──
  canada:             { attack: 68, defense: 64, physical: 78, technique: 66, experience: 30 },
  suisse:             { attack: 74, defense: 76, physical: 77, technique: 78, experience: 68 },
  qatar:              { attack: 55, defense: 54, physical: 62, technique: 58, experience: 35 },
  "barrage-uefa-a":   { attack: 63, defense: 62, physical: 66, technique: 64, experience: 42 },

  // ── GROUP C ──
  bresil:             { attack: 92, defense: 82, physical: 86, technique: 94, experience: 98 },
  maroc:              { attack: 74, defense: 78, physical: 80, technique: 75, experience: 52 },
  ecosse:             { attack: 62, defense: 65, physical: 76, technique: 64, experience: 48 },
  haiti:              { attack: 48, defense: 45, physical: 62, technique: 50, experience: 20 },

  // ── GROUP D ──
  "etats-unis":       { attack: 72, defense: 70, physical: 80, technique: 72, experience: 55 },
  paraguay:           { attack: 64, defense: 66, physical: 74, technique: 65, experience: 58 },
  australie:          { attack: 62, defense: 60, physical: 76, technique: 60, experience: 55 },
  "barrage-uefa-c":   { attack: 64, defense: 63, physical: 67, technique: 65, experience: 44 },

  // ── GROUP E ──
  allemagne:          { attack: 88, defense: 82, physical: 84, technique: 90, experience: 95 },
  equateur:           { attack: 68, defense: 64, physical: 78, technique: 66, experience: 38 },
  "cote-divoire":     { attack: 70, defense: 65, physical: 82, technique: 68, experience: 42 },
  curacao:            { attack: 45, defense: 42, physical: 60, technique: 48, experience: 15 },

  // ── GROUP F ──
  "pays-bas":         { attack: 84, defense: 80, physical: 80, technique: 86, experience: 82 },
  japon:              { attack: 76, defense: 74, physical: 74, technique: 80, experience: 58 },
  tunisie:            { attack: 60, defense: 66, physical: 72, technique: 62, experience: 52 },
  "barrage-uefa-b":   { attack: 64, defense: 64, physical: 68, technique: 66, experience: 45 },

  // ── GROUP G ──
  belgique:           { attack: 82, defense: 76, physical: 78, technique: 84, experience: 65 },
  iran:               { attack: 62, defense: 68, physical: 76, technique: 60, experience: 52 },
  egypte:             { attack: 66, defense: 64, physical: 74, technique: 68, experience: 42 },
  "nouvelle-zelande": { attack: 48, defense: 50, physical: 68, technique: 48, experience: 28 },

  // ── GROUP H ──
  espagne:            { attack: 90, defense: 86, physical: 80, technique: 95, experience: 90 },
  uruguay:            { attack: 80, defense: 78, physical: 82, technique: 78, experience: 85 },
  "arabie-saoudite":  { attack: 58, defense: 60, physical: 70, technique: 58, experience: 50 },
  "cap-vert":         { attack: 50, defense: 52, physical: 66, technique: 52, experience: 18 },

  // ── GROUP I ──
  france:             { attack: 92, defense: 88, physical: 85, technique: 90, experience: 95 },
  senegal:            { attack: 74, defense: 72, physical: 84, technique: 70, experience: 45 },
  norvege:            { attack: 78, defense: 68, physical: 82, technique: 72, experience: 32 },
  "barrage-interconf-2": { attack: 55, defense: 52, physical: 64, technique: 54, experience: 25 },

  // ── GROUP J ──
  argentine:          { attack: 94, defense: 86, physical: 82, technique: 92, experience: 96 },
  autriche:           { attack: 70, defense: 72, physical: 80, technique: 72, experience: 38 },
  algerie:            { attack: 64, defense: 62, physical: 76, technique: 64, experience: 42 },
  jordanie:           { attack: 52, defense: 56, physical: 68, technique: 54, experience: 22 },

  // ── GROUP K ──
  portugal:           { attack: 90, defense: 84, physical: 82, technique: 92, experience: 78 },
  colombie:           { attack: 80, defense: 74, physical: 80, technique: 82, experience: 55 },
  ouzbekistan:        { attack: 58, defense: 60, physical: 72, technique: 60, experience: 28 },
  "barrage-interconf-1": { attack: 56, defense: 54, physical: 65, technique: 55, experience: 26 },

  // ── GROUP L ──
  angleterre:         { attack: 88, defense: 82, physical: 84, technique: 88, experience: 82 },
  croatie:            { attack: 80, defense: 78, physical: 76, technique: 86, experience: 80 },
  ghana:              { attack: 66, defense: 60, physical: 80, technique: 64, experience: 48 },
  panama:             { attack: 52, defense: 54, physical: 72, technique: 52, experience: 30 },
};
