// ============================================================================
// GPT-5-mini — Tier "Infrastructure"
// SEO technique : meta-descriptions, JSON-LD, traductions, balises alt.
// Coût : $0.05/$0.40 par million tokens — quasi-gratuit pour le volume.
// ============================================================================

import OpenAI from "openai";

let client: OpenAI | null = null;

function getClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("[openai] No OPENAI_API_KEY configured");
    return null;
  }
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export interface GPTResponse {
  content: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

/**
 * Generate infrastructure content with GPT-5-mini.
 * Optimized for high-volume, low-cost repetitive tasks.
 */
export async function generateInfra(
  systemPrompt: string,
  userPrompt: string,
  options?: {
    maxTokens?: number;
    temperature?: number;
  }
): Promise<GPTResponse | null> {
  const openai = getClient();
  if (!openai) return null;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      max_tokens: options?.maxTokens ?? 1000,
      temperature: options?.temperature ?? 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const choice = response.choices[0];
    if (!choice?.message.content) return null;

    return {
      content: choice.message.content,
      model: response.model,
      inputTokens: response.usage?.prompt_tokens ?? 0,
      outputTokens: response.usage?.completion_tokens ?? 0,
    };
  } catch (error) {
    console.error("[openai] Generation failed:", error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Generate meta descriptions in batch for SEO.
 */
export async function generateMetaDescription(
  pageTitle: string,
  pageContent: string,
  language: "fr" | "en" | "es"
): Promise<string | null> {
  const result = await generateInfra(
    `You generate SEO meta descriptions. Max 155 characters. Language: ${language}. Be compelling and include key stats.`,
    `Title: ${pageTitle}\nContent summary: ${pageContent}`
  );
  return result?.content ?? null;
}

/**
 * Translate content between languages.
 */
export async function translateContent(
  content: string,
  fromLang: string,
  toLang: string
): Promise<string | null> {
  const result = await generateInfra(
    `You are a professional sports translator. Translate naturally from ${fromLang} to ${toLang}. Keep sports terminology accurate. Do not add or remove information.`,
    content,
    { temperature: 0.2 }
  );
  return result?.content ?? null;
}
