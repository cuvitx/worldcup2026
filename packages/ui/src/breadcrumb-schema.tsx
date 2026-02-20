/**
 * A single breadcrumb item for JSON-LD schema.
 * 
 * @param name - Display name of the breadcrumb
 * @param url - URL path (absolute or relative)
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * BreadcrumbSchema component — Renders schema.org BreadcrumbList JSON-LD.
 * 
 * @param items - Array of breadcrumb items
 * @param baseUrl - Base URL for resolving relative paths (e.g., "https://cdm2026.fr")
 * 
 * @example
 * ```tsx
 * <BreadcrumbSchema
 *   items={[
 *     { name: "Accueil", url: "/" },
 *     { name: "Équipes", url: "/equipes" }
 *   ]}
 *   baseUrl="https://cdm2026.fr"
 * />
 * ```
 */
export function BreadcrumbSchema({
  items,
  baseUrl,
}: {
  items: BreadcrumbItem[];
  baseUrl: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
