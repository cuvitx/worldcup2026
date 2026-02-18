// ============================================================================
// AI Error Monitoring — Structured logging with circular buffer
// Sentry-ready JSON output for production observability
// ============================================================================

export interface AiErrorEntry {
  timestamp: string;
  context: string;
  message: string;
  stack?: string;
  metadata?: Record<string, unknown>;
}

export interface AiErrorStats {
  total: number;
  last24h: number;
  byContext: Record<string, number>;
}

const MAX_BUFFER_SIZE = 1000;
const errorBuffer: AiErrorEntry[] = [];

/**
 * Log a structured AI error.
 * Stores in a circular buffer of 1000 entries and outputs structured JSON to console.error.
 */
export function logAiError(
  context: string,
  error: unknown,
  metadata?: Record<string, unknown>
): void {
  const entry: AiErrorEntry = {
    timestamp: new Date().toISOString(),
    context,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    metadata,
  };

  // Circular buffer — remove oldest if at capacity
  if (errorBuffer.length >= MAX_BUFFER_SIZE) {
    errorBuffer.shift();
  }
  errorBuffer.push(entry);

  // Structured JSON output (Sentry-ready format)
  console.error(
    JSON.stringify({
      level: "error",
      logger: "ai-monitoring",
      ...entry,
    })
  );
}

/**
 * Returns summary statistics of AI errors.
 */
export function getAiErrorStats(): AiErrorStats {
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  const byContext: Record<string, number> = {};
  let last24h = 0;

  for (const entry of errorBuffer) {
    // Count by context
    byContext[entry.context] = (byContext[entry.context] ?? 0) + 1;

    // Count last 24h
    if (new Date(entry.timestamp).getTime() >= oneDayAgo) {
      last24h++;
    }
  }

  return {
    total: errorBuffer.length,
    last24h,
    byContext,
  };
}

/**
 * Returns the last N errors from the buffer.
 * Defaults to 10 if not specified.
 */
export function getRecentErrors(n: number = 10): AiErrorEntry[] {
  return errorBuffer.slice(-n);
}
