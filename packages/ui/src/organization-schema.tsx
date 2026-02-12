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
      "https://mondial2026.fr",
      "https://worldcup2026guide.com",
      "https://mundial2026.es",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
