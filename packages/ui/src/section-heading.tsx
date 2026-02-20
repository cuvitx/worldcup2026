import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Props for the SectionHeading component.
 * 
 * @param title - Main heading text
 * @param subtitle - Optional subtitle text
 * @param linkHref - Optional "see all" link URL
 * @param linkLabel - Label for the "see all" link
 * @param emoji - Optional emoji prefix
 * @param children - Optional additional content (e.g., custom actions)
 */
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  linkHref?: string;
  linkLabel?: string;
  emoji?: string;
  children?: ReactNode;
}

/**
 * SectionHeading component — Page section heading with optional subtitle and link.
 * 
 * @example
 * ```tsx
 * <SectionHeading
 *   title="Pronostics du jour"
 *   subtitle="Nos prédictions pour les matchs d'aujourd'hui"
 *   linkHref="/pronostics"
 *   linkLabel="Voir tous les pronostics →"
 *   emoji=""
 * />
 * ```
 */
export function SectionHeading({ title, subtitle, linkHref, linkLabel, emoji, children }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {emoji && <>{emoji} </>}{title}
        </h2>
        {subtitle && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>
        )}
      </div>
      {linkHref && linkLabel && (
        <Link href={linkHref} className="text-sm font-semibold text-primary hover:underline shrink-0">
          {linkLabel}
        </Link>
      )}
      {children}
    </div>
  );
}
