import React from "react";

/**
 * Props for the Flag component.
 * 
 * @param flag - Flag emoji (e.g., "🇫🇷", "🇧🇷")
 * @param name - Country name for accessibility label
 * @param className - Optional CSS classes
 */
interface FlagProps {
  flag: string;
  name: string;
  className?: string;
}

/**
 * Flag component — Accessible flag emoji with proper ARIA attributes.
 * 
 * Wraps a flag emoji with `role="img"` and `aria-label` for screen reader support.
 * 
 * @example
 * ```tsx
 * <Flag flag="🇫🇷" name="France" />
 * ```
 * 
 * @example
 * ```tsx
 * <Flag flag="🇧🇷" name="Brésil" className="text-3xl" />
 * ```
 */
export default function Flag({ flag, name, className }: FlagProps) {
  return (
    <span role="img" aria-label={`Drapeau de ${name}`} className={className}>
      {flag}
    </span>
  );
}
