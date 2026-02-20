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
    <section className="mt-12 border-t border-gray-200 dark:border-gray-700/60 pt-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-slate-800/80 p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30"
          >
            <span className="mb-3 block text-3xl">{item.emoji}</span>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors line-clamp-2 mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-300 line-clamp-2">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
