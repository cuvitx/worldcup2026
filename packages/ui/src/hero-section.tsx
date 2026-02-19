import type { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

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
