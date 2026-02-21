import type { ReactNode } from "react";

const paddingMap = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
} as const;

/**
 * Props for the Card component.
 * 
 * @param children - Content to render inside the card
 * @param className - Optional additional CSS classes
 * @param hover - Enable hover shadow effect (default: false)
 * @param padding - Padding size: "sm" | "md" | "lg" (default: "lg")
 */
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

/**
 * Card component — Generic card container with consistent styling.
 * 
 * Provides a rounded border, shadow, and configurable padding.
 * Supports dark mode via Tailwind classes.
 * 
 * @example
 * ```tsx
 * <Card>
 *   <h3>Titre</h3>
 *   <p>Contenu de la carte</p>
 * </Card>
 * ```
 * 
 * @example
 * ```tsx
 * <Card padding="sm" hover>
 *   <span>Compact card with hover effect</span>
 * </Card>
 * ```
 */
export function Card({ children, className = "", hover = false, padding = "lg" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm ${paddingMap[padding]} ${
        hover ? "hover:shadow-md transition-shadow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
