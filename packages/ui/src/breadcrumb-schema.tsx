/**
 * A single breadcrumb item for JSON-LD schema.
 * Accepts both {name, url} and {label, href} formats for compatibility.
 */
interface BreadcrumbItem {
  name?: string;
  label?: string;
  url?: string;
  href?: string;
}

/**
 * BreadcrumbSchema component — Renders schema.org BreadcrumbList JSON-LD.
 *
 * Accepts items in either format:
 *   { name: "Accueil", url: "/" }        — canonical format
 *   { label: "Accueil", href: "/" }      — Breadcrumb visual component format
 *
 * Items without a url/href are skipped (last breadcrumb = current page with no link).
 *
 * @param items - Array of breadcrumb items
 * @param baseUrl - Base URL for resolving relative paths (e.g., "https://www.cdm2026.fr")
 * @param currentPath - Optional: URL of the current page (used for last item if it has no url/href)
 */
export function BreadcrumbSchema({
  items,
  baseUrl,
  currentPath,
}: {
  items: BreadcrumbItem[];
  baseUrl: string;
  currentPath?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const displayName = item.name || item.label || "";
      const rawUrl = item.url || item.href || (index === items.length - 1 ? currentPath : undefined);

      // Skip items with no resolvable URL
      if (!rawUrl) return null;

      const fullUrl = rawUrl.startsWith("http") ? rawUrl : `${baseUrl}${rawUrl}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: displayName,
        item: fullUrl,
      };
    }).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
