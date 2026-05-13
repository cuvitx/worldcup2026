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
    logo: `${url}/images/logo-navbar.png`,
    description:
      "Guide complet de la Coupe du Monde 2026 : pronostics, cotes, analyses des 48 équipes, calendrier des 104 matchs.",
    sameAs: [
      "https://www.cdm2026.fr",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${url}/contact`,
      availableLanguage: "French",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
