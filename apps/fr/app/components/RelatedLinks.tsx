/**
 * @deprecated Replaced by AutoRelatedContent in layout.tsx
 * Kept as a no-op to avoid breaking pages that still import it.
 */

export interface RelatedLink {
  href: string;
  title: string;
  description: string;
  icon?: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
  variant?: "default" | "compact";
}

export function RelatedLinks(_props: RelatedLinksProps) {
  return null;
}
