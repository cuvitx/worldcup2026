// ============================================================================
// @repo/ai — Package principal
// Triple-Tier AI Dispatcher pour Worldcup2026
//
// ECONOMY  → GPT-5-mini  : SEO infra (méta, traductions, JSON-LD)
// REALTIME → Gemini 3 Flash : Contenu SEO, fact-checking, grounding
// EXPERT   → Claude Opus 4.6 : Value bets, analyses tactiques profondes
// ============================================================================

export {
  generateMatchPreview,
  generateTeamAnalysis,
  generateExpertInsight,
  generatePageMeta,
  translatePage,
  generateJsonLd,
  type ModelTier,
  type ExpertInsight,
} from "./orchestrator";

export { generateExpert, type ClaudeResponse } from "./providers/claude";
export { generateFactual, generateStandardPage, type GeminiResponse } from "./providers/gemini";
export { generateInfra, generateMetaDescription, translateContent, type GPTResponse } from "./providers/openai";

export { aiCacheGet, aiCacheSet, aiCacheKey, AI_CACHE_TTL } from "./cache";

// Generators — high-level orchestrators (API + AI → structured output)
export { generateFullMatchPreview, type MatchPreviewData } from "./generators/match-preview";
export { generateFullTeamAnalysis, type TeamAnalysisData } from "./generators/team-analysis";
