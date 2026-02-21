import type { ReactNode } from "react";

/**
 * Props for the HeroSection component.
 * 
 * @param title - Main hero title (H1)
 * @param subtitle - Optional subtitle text
 * @param badge - Optional badge text displayed above title
 * @param children - Optional additional content below subtitle
 * @param className - Additional CSS classes
 */
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * HeroSection component — Full-width hero banner with glassmorphism background.
 * 
 * @example
 * ```tsx
 * <HeroSection
 *   badge="Coupe du Monde 2026"
 *   title="États-Unis · Canada · Mexique"
 *   subtitle="48 équipes pour la première Coupe du Monde à 3 pays hôtes"
 * />
 * ```
 */
export function HeroSection({ title, subtitle, badge, children, className = "" }: HeroSectionProps) {
  return (
    <section className={`hero-animated text-white py-14 sm:py-20 ${className}`}>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">{badge}</span>
          </div>
        )}
        <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">{title}</h1>
        {subtitle && (
          <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
