// ============================================================================
// Factual Prompts — Gemini 3 Flash (Search Grounding)
// SEO content generation with real-time fact-checking.
// Google Search grounding ensures freshness of injury/news data.
// ============================================================================

export const FACTUAL_PROMPTS = {
  /** Match preview for standard SEO pages */
  matchPreview: (language: "fr" | "en" | "es") => {
    const langInstructions = {
      fr: "Redige en francais. Ton journalistique sportif, factuel et engageant.",
      en: "Write in English. Sports journalism tone, factual and engaging.",
      es: "Escribe en espanol. Tono de periodismo deportivo, factual y atractivo.",
    };

    return `${langInstructions[language]}

Utilise les informations suivantes pour rediger une analyse de match complete.
Verifie les dernieres blessures et nouvelles via la recherche.

Structure de la reponse (JSON):
{
  "preview": "Analyse pre-match (300-500 mots)",
  "keyFactors": ["Facteur 1", "Facteur 2", "Facteur 3"],
  "prediction": "Score predit avec justification",
  "bettingAngle": "Angle de pari interessant"
}`;
  },

  /** Team analysis for longue traine SEO */
  teamAnalysis: (language: "fr" | "en" | "es") => {
    const langMap = {
      fr: "Analyse cette equipe pour la Coupe du Monde 2026. Fournis une analyse complete incluant forme recente, joueurs cles, systeme tactique, et pronostic pour le tournoi.",
      en: "Analyze this team for the 2026 World Cup. Provide a comprehensive analysis including recent form, key players, tactical system, and tournament prediction.",
      es: "Analiza este equipo para el Mundial 2026. Proporciona un analisis completo incluyendo forma reciente, jugadores clave, sistema tactico y pronostico para el torneo.",
    };

    return `${langMap[language]}

Structure (JSON):
{
  "overview": "Vue d'ensemble (200-300 mots)",
  "keyPlayers": [{"name": "...", "role": "...", "impact": "..."}],
  "tacticalSystem": "Description du systeme de jeu",
  "strengths": ["Force 1", "Force 2"],
  "weaknesses": ["Faiblesse 1", "Faiblesse 2"],
  "tournamentPrediction": "Pronostic pour le tournoi",
  "bettingInsight": "Angle de pari interessant sur cette equipe"
}`;
  },

  /** Group stage analysis */
  groupAnalysis: (language: "fr" | "en" | "es") => {
    const langMap = {
      fr: "Analyse ce groupe de la Coupe du Monde 2026.",
      en: "Analyze this 2026 World Cup group.",
      es: "Analiza este grupo del Mundial 2026.",
    };

    return `${langMap[language]}

Structure (JSON):
{
  "groupOverview": "Presentation du groupe (150-200 mots)",
  "powerRanking": [{"team": "...", "rank": 1, "reason": "..."}],
  "keyMatch": "Le match decisif du groupe",
  "surprise": "Le resultat surprise possible",
  "qualificationPrediction": "Les 2 qualifies et pourquoi"
}`;
  },
} as const;
