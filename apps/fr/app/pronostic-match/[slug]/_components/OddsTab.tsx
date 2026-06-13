import type { MatchOddsResult } from "@repo/api/football/odds";
import CommunityVote from "../../../components/CommunityVote";
import { OddsTable } from "../components";

interface OddsTabProps {
  odds: { home: string; draw: string; away: string } | null;
  homeName: string;
  awayName: string;
  matchSlug: string;
  homeRanking: number;
  awayRanking: number;
  realOdds?: MatchOddsResult | null;
}

export function OddsTab({
  odds,
  homeName,
  awayName,
  matchSlug,
  homeRanking,
  awayRanking,
  realOdds,
}: OddsTabProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {odds && (
            <OddsTable
              odds={odds}
              homeName={homeName}
              awayName={awayName}
              realOdds={realOdds}
              matchSlug={matchSlug}
            />
          )}
        </div>
        <div className="space-y-4">
          <CommunityVote
            slug={matchSlug}
            homeName={homeName}
            awayName={awayName}
            homeRanking={homeRanking}
            awayRanking={awayRanking}
          />
        </div>
      </div>
    </div>
  );
}
