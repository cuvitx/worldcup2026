import type { Match, Team, Stadium } from "@repo/data";

interface MatchStructuredDataProps {
  match: Match;
  home: Team | undefined;
  away: Team | undefined;
  homeName: string;
  awayName: string;
  stadium: Stadium | undefined;
  stage: string;
}

export function MatchStructuredData({
  match,
  home,
  away,
  homeName,
  awayName,
  stadium,
  stage,
}: MatchStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${homeName} vs ${awayName} - Coupe du Monde 2026`,
    eventStatus: "https://schema.org/EventScheduled",
    startDate: `${match.date}T${match.time || "00:00"}:00-04:00`,
    location: stadium
      ? {
          "@type": "StadiumOrArena",
          name: stadium.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: stadium.city,
            addressCountry: stadium.country,
          },
        }
      : undefined,
    homeTeam: home ? { "@type": "SportsTeam", name: home.name } : undefined,
    awayTeam: away ? { "@type": "SportsTeam", name: away.name } : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Football",
    description: `Pronostic et cotes pour ${homeName} vs ${awayName}, ${stage} de la Coupe du Monde 2026.`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
