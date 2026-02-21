/**
 * OrganizationSchema component — Renders schema.org Organization JSON-LD.
 * 
 * @param url - Organization website URL
 * @param name - Organization name
 * 
 * @example
 * ```tsx
 * <OrganizationSchema url="https://www.cdm2026.fr" name="CDM2026" />
 * ```
 */
export function OrganizationSchema({
  url,
  name,
}: {
  url: string;
  name: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    sameAs: [
      "https://www.cdm2026.fr",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
