// ============================================================================
// AI Orchestrator — Triple-Tier Dispatcher "Elite 2026"
//
// ECONOMY  → GPT-5-mini  : SEO technique, méta, traductions (~$0.05/$0.40/M)
// REALTIME → Gemini 3 Flash : Contenu SEO, live alerts, grounding (~$0.50/$3/M)
// EXPERT   → Claude Opus 4.6 : Value bets, analyses tactiques (~$5/$25/M)
//
// Budget cible : < 120$/mois
// ============================================================================

import { generateExpert } from "./providers/claude";
import { generateFactual, generateStandardPage } from "./providers/gemini";
import { generateInfra, generateMetaDescription, translateContent } from "./providers/openai";
import { aiCacheGet, aiCacheSet, aiCacheKey, AI_CACHE_TTL } from "./cache";

export type ModelTier = "ECONOMY" | "REALTIME" | "EXPERT";

// ─── Standard Page Generation (Gemini 3 Flash) ─────────────────────────────

/**
 * Generate match preview content for a standard SEO page.
 * Uses Gemini 3 Flash with Google Search grounding for fact-checking.
 * Cached for 24h — shared across language versions where possible.
 */
export async function generateMatchPreview(
  matchSlug: string,
  matchContext: string,
  language: "fr" | "en" | "es"
) {
  const key = aiCacheKey("standard", "match-preview", matchSlug, language);
  const cached = await aiCacheGet(key);
  if (cached) return JSON.parse(cached) as { content: string; grounded: boolean };

  const result = await generateStandardPage(matchContext, language);
  if (!result) return null;

  const output = {
    content: result.content,
    grounded: result.groundingMetadata !== null,
  };

  await aiCacheSet(key, JSON.stringify(output), AI_CACHE_TTL.STANDARD_PAGE);
  return output;
}

/**
 * Generate team analysis page content.
 * Uses Gemini 3 Flash for the "longue traîne" SEO.
 */
export async function generateTeamAnalysis(
  teamSlug: string,
  teamContext: string,
  language: "fr" | "en" | "es"
) {
  const key = aiCacheKey("standard", "team-analysis", teamSlug, language);
  const cached = await aiCacheGet(key);
  if (cached) return JSON.parse(cached) as { content: string };

  const result = await generateFactual(
    `Analyse cette equipe pour la Coupe du Monde 2026. Langue: ${language}.\n\n${teamContext}`,
    { useSearchGrounding: true }
  );
  if (!result) return null;

  const output = { content: result.content };
  await aiCacheSet(key, JSON.stringify(output), AI_CACHE_TTL.STANDARD_PAGE);
  return output;
}

// ─── Expert Analysis (Claude Opus 4.6) ──────────────────────────────────────

/** System prompt shared across all expert analyses — cached for cost reduction */
const EXPERT_SYSTEM_PROMPT = `Tu es un analyste sportif professionnel specialise dans les paris a haute valeur pour la Coupe du Monde 2026.

Tu analyses les variables croisees suivantes pour detecter les Value Bets :
- Ratings ELO et classements FIFA
- Historique face-a-face (H2H)
- Impact de l'altitude (Estadio Azteca = 2240m)
- Fatigue de voyage et decalage horaire
- Conditions meteo (temperature, humidite, vent, pluie)
- Blessures et absences confirmees
- Cotes reelles des bookmakers vs probabilites du modele
- Forme recente des equipes

Tu dois :
1. Identifier les ecarts entre les cotes du marche et les probabilites reelles
2. Quantifier le "edge" en pourcentage
3. Donner un niveau de confiance (1-5 etoiles)
4. Justifier avec des donnees precises, jamais des generalites

Format de reponse : JSON structure.`;

/**
 * Generate expert Value Bet analysis with Claude Opus 4.6.
 * Uses adaptive thinking for deep multi-variable reasoning.
 * RESERVED for top 5-10 matches per day (cost control).
 */
export async function generateExpertInsight(
  matchSlug: string,
  matchData: {
    teams: string;
    elo: string;
    h2h: string;
    weather: string;
    altitude: string;
    travel: string;
    injuries: string;
    odds: string;
    form: string;
  }
) {
  const key = aiCacheKey("expert", "value-bet", matchSlug);
  const cached = await aiCacheGet(key);
  if (cached) return JSON.parse(cached) as ExpertInsight;

  const userPrompt = `Analyse ce match et detecte les Value Bets :

EQUIPES : ${matchData.teams}
ELO : ${matchData.elo}
H2H : ${matchData.h2h}
METEO : ${matchData.weather}
ALTITUDE : ${matchData.altitude}
VOYAGE : ${matchData.travel}
BLESSURES : ${matchData.injuries}
COTES BOOKMAKERS : ${matchData.odds}
FORME RECENTE : ${matchData.form}

Reponds en JSON :
{
  "valueBets": [
    {
      "market": "1X2 / Over-Under / BTTS / etc.",
      "selection": "Le pari recommande",
      "bookmakerOdds": 0.00,
      "modelProbability": 0.00,
      "edge": 0.00,
      "confidence": 1-5,
      "reasoning": "Justification detaillee"
    }
  ],
  "matchAnalysis": "Analyse tactique complete (200-400 mots)",
  "scorePrediction": "Score predit",
  "keyInsight": "L'insight unique que personne d'autre ne fournit"
}`;

  const result = await generateExpert(EXPERT_SYSTEM_PROMPT, userPrompt, {
    budgetTokens: 4000,
    maxTokens: 8000,
    cacheSystemPrompt: true,
  });

  if (!result) return null;

  let parsed: ExpertInsight;
  try {
    parsed = {
      ...JSON.parse(result.content),
      thinking: result.thinking,
      tokensUsed: { input: result.inputTokens, output: result.outputTokens },
    };
  } catch {
    parsed = {
      valueBets: [],
      matchAnalysis: result.content,
      scorePrediction: "",
      keyInsight: "",
      thinking: result.thinking,
      tokensUsed: { input: result.inputTokens, output: result.outputTokens },
    };
  }

  await aiCacheSet(key, JSON.stringify(parsed), AI_CACHE_TTL.EXPERT_ANALYSIS);
  return parsed;
}

export interface ExpertInsight {
  valueBets: Array<{
    market: string;
    selection: string;
    bookmakerOdds: number;
    modelProbability: number;
    edge: number;
    confidence: number;
    reasoning: string;
  }>;
  matchAnalysis: string;
  scorePrediction: string;
  keyInsight: string;
  thinking: string | null;
  tokensUsed: { input: number; output: number };
}

// ─── Infrastructure (GPT-5-mini) ────────────────────────────────────────────

/**
 * Generate SEO meta description for a page.
 * Uses GPT-5-mini for maximum cost efficiency.
 */
export async function generatePageMeta(
  pageTitle: string,
  pageContent: string,
  language: "fr" | "en" | "es"
) {
  const key = aiCacheKey("infra", "meta", pageTitle, language);
  const cached = await aiCacheGet(key);
  if (cached) return cached;

  const result = await generateMetaDescription(pageTitle, pageContent, language);
  if (!result) return null;

  await aiCacheSet(key, result, AI_CACHE_TTL.META_DESCRIPTION);
  return result;
}

/**
 * Translate content from one language to another.
 * Uses GPT-5-mini — cheapest option for batch translations.
 */
export async function translatePage(
  content: string,
  fromLang: string,
  toLang: string,
  contentKey: string
) {
  const key = aiCacheKey("infra", "translate", contentKey, toLang);
  const cached = await aiCacheGet(key);
  if (cached) return cached;

  const result = await translateContent(content, fromLang, toLang);
  if (!result) return null;

  await aiCacheSet(key, result, AI_CACHE_TTL.TRANSLATION);
  return result;
}

/**
 * Generate JSON-LD structured data for a page.
 * Uses GPT-5-mini for cost efficiency.
 */
export async function generateJsonLd(
  pageType: string,
  pageData: string
): Promise<string | null> {
  const key = aiCacheKey("infra", "jsonld", pageType);
  const cached = await aiCacheGet(key);
  if (cached) return cached;

  const result = await generateInfra(
    "Generate valid JSON-LD schema.org structured data. Return ONLY the JSON, no markdown.",
    `Page type: ${pageType}\nData: ${pageData}`
  );
  if (!result) return null;

  await aiCacheSet(key, result.content, AI_CACHE_TTL.META_DESCRIPTION);
  return result.content;
}
