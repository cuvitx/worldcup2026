'use client';

import { usePathname } from 'next/navigation';
import { RelatedContent } from './RelatedContent';
import { getRelatedLinks } from '../../lib/related-links';

export function AutoRelatedContent() {
  const pathname = usePathname();
  const items = getRelatedLinks(pathname);
  if (!items.length) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-8">
      <RelatedContent items={items} />
    </div>
  );
}
