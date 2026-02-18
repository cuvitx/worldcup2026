/**
 * Accessible flag emoji component.
 * Wraps flag emojis with proper ARIA labels for screen readers.
 */
export function FlagEmoji({ flag, name, className = "" }: { flag: string; name: string; className?: string }) {
  return (
    <span role="img" aria-label={name} className={className}>
      {flag}
    </span>
  );
}
