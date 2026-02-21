'use client';

import Link from 'next/link';

export interface RelatedItem {
  href: string;
  emoji: string;
  title: string;
  description: string;
}

interface RelatedContentProps {
  items: RelatedItem[];
  title?: string;
}

export function RelatedContent({ items, title = 'Vous pourriez aussi aimer' }: RelatedContentProps) {
  if (!items.length) return null;

  return (
    <section className="mt-10 border-t border-gray-200 pt-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/80 px-4 py-3 transition-all hover:shadow-md hover:border-primary/30"
          >
            <span className="text-2xl shrink-0">{item.emoji}</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {item.description}
              </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
