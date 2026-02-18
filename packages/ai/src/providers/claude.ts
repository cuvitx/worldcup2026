// ============================================================================
// Claude 4.6 Opus — Tier "Elite Analyste"
// Analyses de précision : Value Bets, impacts croisés altitude/fatigue/météo.
// Utilise l'Adaptive Thinking pour calibrer automatiquement la profondeur.
// Coût : ~$5/$25 par million tokens — réservé au Top 5% du trafic.
// ============================================================================

import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

function getClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("[claude] No ANTHROPIC_API_KEY configured");
    return null;
  }
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export interface ClaudeResponse {
  content: string;
  thinking: string | null;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

/**
 * Generate expert-level analysis with Claude Opus 4.6.
 * Uses adaptive thinking for complex multi-variable reasoning.
 */
export async function generateExpert(
  systemPrompt: string,
  userPrompt: string,
  options?: {
    maxTokens?: number;
    budgetTokens?: number;
    temperature?: number;
    cacheSystemPrompt?: boolean;
  }
): Promise<ClaudeResponse | null> {
  const anthropic = getClient();
  if (!anthropic) return null;

  const systemContent = options?.cacheSystemPrompt
    ? [{ type: "text" as const, text: systemPrompt, cache_control: { type: "ephemeral" as const } }]
    : systemPrompt;

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: options?.maxTokens ?? 16000,
      temperature: options?.temperature ?? 1, // required with extended thinking
      thinking: {
        type: "enabled",
        budget_tokens: options?.budgetTokens ?? 4000,
      },
      system: systemContent,
      messages: [{ role: "user", content: userPrompt }],
    });

    let content = "";
    let thinking = "";

    for (const block of response.content) {
      if (block.type === "thinking") {
        thinking += block.thinking;
      } else if (block.type === "text") {
        content += block.text;
      }
    }

    return {
      content,
      thinking: thinking || null,
      model: response.model,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    };
  } catch (error) {
    console.error("[claude] Generation failed:", error instanceof Error ? error.message : error);
    return null;
  }
}
