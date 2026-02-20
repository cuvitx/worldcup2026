import type { ReactNode } from "react";

/**
 * Props for the HeroSection component.
 * 
 * @param title - Main hero title (H1)
 * @param subtitle - Optional subtitle text
 * @param children - Optional additional content below subtitle
 * @param className - Additional CSS classes
 */
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * HeroSection component — Full-width hero banner with gradient background.
 * 
 * @example
 * ```tsx
 * <HeroSection
 *   title="Coupe du Monde 2026"
 *   subtitle="États-Unis · Canada · Mexique"
 * />
 * ```
 */
export function HeroSection({ title, subtitle, children, className = "" }: HeroSectionProps) {
  return (
    <section className={`bg-gradient-to-r from-primary to-primary/80 text-white py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-gray-300">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
