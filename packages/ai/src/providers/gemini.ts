// ============================================================================
// Gemini 2.5 Flash via OpenRouter — Tier "Journaliste Factuel"
// Génération du contenu SEO initial + previews de matchs.
// Coût : ~$0.15/$0.60 par million tokens via OpenRouter.
// ============================================================================

import OpenAI from "openai";

const MODEL = "google/gemini-2.5-flash";

let client: OpenAI | null = null;

function getClient(): OpenAI | null {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    // Fallback to direct Gemini key (not used currently)
    if (!process.env.GEMINI_API_KEY) {
      console.warn("[gemini] No OPENROUTER_API_KEY or GEMINI_API_KEY configured");
      return null;
    }
    console.warn("[gemini] GEMINI_API_KEY found but OpenRouter preferred — set OPENROUTER_API_KEY");
    return null;
  }
  if (!client) {
    client = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });
  }
  return client;
}

export interface GeminiResponse {
  content: string;
  groundingMetadata: unknown | null;
  model: string;
}

/**
 * Generate factual content with Gemini 2.5 Flash via OpenRouter.
 */
export async function generateFactual(
  prompt: string,
  options?: {
    useSearchGrounding?: boolean;
    temperature?: number;
    maxTokens?: number;
  }
): Promise<GeminiResponse | null> {
  const openai = getClient();
  if (!openai) return null;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 4000,
      messages: [
        { role: "user", content: prompt },
      ],
    });

    const text = response.choices[0]?.message?.content ?? "";

    return {
      content: text,
      groundingMetadata: null,
      model: MODEL,
    };
  } catch (error) {
    console.error("[gemini] Generation failed:", error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Generate standard SEO page content.
 */
export async function generateStandardPage(
  matchContext: string,
  language: "fr" | "en" | "es"
): Promise<GeminiResponse | null> {
  const langInstructions = {
    fr: "Redige en francais. Ton journalistique sportif, factuel et engageant.",
    en: "Write in English. Sports journalism tone, factual and engaging.",
    es: "Escribe en espanol. Tono de periodismo deportivo, factual y atractivo.",
  };

  const prompt = `${langInstructions[language]}

Utilise les informations suivantes pour rediger une analyse de match complete.

${matchContext}

Structure de la reponse (JSON):
{
  "preview": "Analyse pre-match (300-500 mots)",
  "keyFactors": ["Facteur 1", "Facteur 2", "Facteur 3"],
  "prediction": "Score predit avec justification",
  "bettingAngle": "Angle de pari interessant"
}`;

  return generateFactual(prompt);
}
