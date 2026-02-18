/**
 * Sanitize external data before injecting into AI prompts.
 * Prevents prompt injection from API data (player names, injury descriptions, etc.)
 */
export function sanitizeForPrompt(input: string): string {
  if (!input || typeof input !== "string") return "";

  return (
    input
      // Remove markdown code blocks that could contain hidden instructions
      .replace(/```[\s\S]*?```/g, "[removed]")
      // Remove common role-injection patterns
      .replace(/\b(?:system|assistant|user)\s*:/gi, "")
      // Remove XML-like tags that could confuse the model
      .replace(/<\/?(?:system|prompt|instruction|context|tool_use|function_call)[^>]*>/gi, "")
      // Remove CDATA sections
      .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "")
      // Collapse excessive whitespace
      .replace(/\n{3,}/g, "\n\n")
      // Limit length to prevent token stuffing
      .slice(0, 5000)
  );
}

/** Sanitize all string values in a record */
export function sanitizeMatchData(data: Record<string, string>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    sanitized[key] = sanitizeForPrompt(value);
  }
  return sanitized;
}
