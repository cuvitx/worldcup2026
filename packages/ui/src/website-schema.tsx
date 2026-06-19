/**
 * WebSiteSchema component — Renders schema.org WebSite JSON-LD with SearchAction.
 *
 * Enables the Google Sitelinks Searchbox feature in SERPs.
 *
 * @param url - Website URL (e.g. "https://www.cdm2026.fr")
 * @param name - Website name
 * @param description - Short description of the website
 *
 * @example
 * ```tsx
 * <WebSiteSchema url="https://www.cdm2026.fr" name="CDM 2026" description="Guide complet..." />
 * ```
 */
export function WebSiteSchema({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description?: string;
}) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    ...(description && { description }),
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/recherche?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
