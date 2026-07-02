import type { Match, Team } from "@repo/data";
import { RelatedContent, type RelatedItem } from "../../../components/RelatedContent";
import { stageLabels } from "@repo/data/constants";

export interface RelatedPronosticMatch {
  match: Match;
  home: Team | undefined;
  away: Team | undefined;
  homeName: string;
  awayName: string;
}

interface RelatedMatchesSectionProps {
  home: Team | undefined;
  away: Team | undefined;
  relatedMatches: RelatedPronosticMatch[];
}

export function RelatedMatchesSection({
  home,
  away,
  relatedMatches,
}: RelatedMatchesSectionProps) {
  const relatedItems: RelatedItem[] = [
    ...(home
      ? [
          {
            href: `/equipe/${home.slug}`,
            emoji: home.flag,
            title: home.name,
            description: `Fiche équipe · FIFA #${home.fifaRanking}`,
          },
        ]
      : []),
    ...(away
      ? [
          {
            href: `/equipe/${away.slug}`,
            emoji: away.flag,
            title: away.name,
            description: `Fiche équipe · FIFA #${away.fifaRanking}`,
          },
        ]
      : []),
    ...relatedMatches
      .slice(0, 2)
      .map((relatedMatch): RelatedItem => {
        return {
          href: `/pronostic-match/${relatedMatch.match.slug}`,
          emoji: relatedMatch.home?.flag ?? relatedMatch.away?.flag ?? "",
          title: `${relatedMatch.homeName} - ${relatedMatch.awayName}`,
          description: `Même jour · ${stageLabels[relatedMatch.match.stage] ?? relatedMatch.match.stage}`,
        };
      }),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      <RelatedContent items={relatedItems} />
    </div>
  );
}
