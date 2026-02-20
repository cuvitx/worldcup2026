import type { Match, Team } from "@repo/data";
import { RelatedContent, type RelatedItem } from "../../../components/RelatedContent";
import { teamsById } from "@repo/data/teams";
import { stageLabels } from "@repo/data/constants";

interface RelatedMatchesSectionProps {
  currentMatch: Match;
  allMatches: Match[];
  home: Team | undefined;
  away: Team | undefined;
  slug: string;
}

export function RelatedMatchesSection({
  currentMatch,
  allMatches,
  home,
  away,
  slug,
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
    ...allMatches
      .filter((m) => m.slug !== slug && m.date === currentMatch.date)
      .slice(0, 2)
      .map((m): RelatedItem => {
        const mHome = teamsById[m.homeTeamId];
        const mAway = teamsById[m.awayTeamId];
        return {
          href: `/pronostic-match/${m.slug}`,
          emoji: "",
          title: `${mHome?.name ?? "TBD"} - ${mAway?.name ?? "TBD"}`,
          description: `Même jour · ${stageLabels[m.stage] ?? m.stage}`,
        };
      }),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      <RelatedContent items={relatedItems} />
    </div>
  );
}
