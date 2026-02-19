import React from "react";

interface FlagProps {
  flag: string;
  name: string;
  className?: string;
}

/**
 * Accessible flag emoji component.
 * Wraps a flag emoji with proper aria-label and role for screen readers.
 */
export default function Flag({ flag, name, className }: FlagProps) {
  return (
    <span role="img" aria-label={`Drapeau de ${name}`} className={className}>
      {flag}
    </span>
  );
}
