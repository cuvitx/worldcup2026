import type { Match, Team } from "@repo/data";
import { RelatedContent, type RelatedItem } from "../../../components/RelatedContent";
import { teamsById } from "../../../../lib/localized-data";
import { stageLabelsI18n } from "@repo/data/constants";

const stageLabels = stageLabelsI18n.de;

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
            href: `/mannschaft/${home.slug}`,
            emoji: home.flag,
            title: home.name,
            description: `Mannschaftsprofil · FIFA #${home.fifaRanking}`,
          },
        ]
      : []),
    ...(away
      ? [
          {
            href: `/mannschaft/${away.slug}`,
            emoji: away.flag,
            title: away.name,
            description: `Mannschaftsprofil · FIFA #${away.fifaRanking}`,
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
          href: `/prognose-spiel/${m.slug}`,
          emoji: "",
          title: `${mHome?.name ?? "TBD"} - ${mAway?.name ?? "TBD"}`,
          description: `Gleicher Tag · ${stageLabels[m.stage] ?? m.stage}`,
        };
      }),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      <RelatedContent items={relatedItems} />
    </div>
  );
}
