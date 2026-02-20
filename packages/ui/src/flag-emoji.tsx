/**
 * FlagEmoji component — Accessible flag emoji with ARIA label.
 * 
 * @param flag - Flag emoji (e.g., "🇫🇷")
 * @param name - Country name for aria-label
 * @param className - Optional CSS classes
 * 
 * @example
 * ```tsx
 * <FlagEmoji flag="🇫🇷" name="France" className="text-2xl" />
 * ```
 */
export function FlagEmoji({ flag, name, className = "" }: { flag: string; name: string; className?: string }) {
  return (
    <span role="img" aria-label={name} className={className}>
      {flag}
    </span>
  );
}
