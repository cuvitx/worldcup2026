// ============================================================================
// Gemini 3 Flash — Tier "Journaliste Factuel"
// Génération du contenu SEO initial + previews de matchs.
// Search Grounding pour fact-checker blessures et news en temps réel.
// Coût : ~$0.50/$3.00 par million tokens — meilleur ratio qualité/prix.
// ============================================================================

import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("[gemini] No GEMINI_API_KEY configured");
    return null;
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return client;
}

export interface GeminiResponse {
  content: string;
  groundingMetadata: unknown | null;
  model: string;
}

/**
 * Generate factual content with Gemini 3 Flash.
 * Uses Google Search grounding for real-time fact-checking.
 */
export async function generateFactual(
  prompt: string,
  options?: {
    useSearchGrounding?: boolean;
    temperature?: number;
    maxTokens?: number;
  }
): Promise<GeminiResponse | null> {
  const genai = getClient();
  if (!genai) return null;

  const tools = options?.useSearchGrounding !== false
    ? [{ googleSearch: {} }]
    : undefined;

  const response = await genai.models.generateContent({
    model: "gemini-3-flash",
    contents: prompt,
    config: {
      temperature: options?.temperature ?? 0.7,
      maxOutputTokens: options?.maxTokens ?? 4000,
      tools,
    },
  });

  const text = response.text ?? "";
  const groundingMetadata = response.candidates?.[0]?.groundingMetadata ?? null;

  return {
    content: text,
    groundingMetadata,
    model: "gemini-3-flash",
  };
}

/**
 * Generate standard SEO page content with search grounding.
 * Verifies injuries, news, and conditions before writing.
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
Verifie les dernieres blessures et nouvelles via la recherche.

${matchContext}

Structure de la reponse (JSON):
{
  "preview": "Analyse pre-match (300-500 mots)",
  "keyFactors": ["Facteur 1", "Facteur 2", "Facteur 3"],
  "prediction": "Score predit avec justification",
  "bettingAngle": "Angle de pari interessant"
}`;

  return generateFactual(prompt, { useSearchGrounding: true });
}
