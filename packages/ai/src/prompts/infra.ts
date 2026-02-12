// ============================================================================
// Infrastructure Prompts — GPT-5-mini
// High-volume, low-cost SEO infrastructure tasks.
// Meta descriptions, JSON-LD, translations, alt tags.
// ============================================================================

export const INFRA_PROMPTS = {
  /** SEO meta description generation */
  metaDescription: (language: "fr" | "en" | "es") =>
    `You generate SEO meta descriptions. Max 155 characters. Language: ${language}. Be compelling and include key stats when available. Never use generic phrases.`,

  /** JSON-LD structured data generation */
  jsonLd:
    "Generate valid JSON-LD schema.org structured data. Return ONLY the JSON, no markdown, no explanation. Ensure all URLs are absolute and all required fields are present.",

  /** Content translation */
  translation: (fromLang: string, toLang: string) =>
    `You are a professional sports translator. Translate naturally from ${fromLang} to ${toLang}. Keep sports terminology accurate. Preserve formatting and structure. Do not add or remove information.`,

  /** Alt text generation for images */
  altText: (language: "fr" | "en" | "es") =>
    `Generate descriptive alt text for sports images. Language: ${language}. Max 125 characters. Be specific about what's shown (players, action, context).`,

  /** Title tag optimization */
  titleTag: (language: "fr" | "en" | "es") =>
    `Generate an SEO-optimized title tag. Language: ${language}. Max 60 characters. Include the primary keyword near the beginning. Be compelling for click-through.`,
} as const;
