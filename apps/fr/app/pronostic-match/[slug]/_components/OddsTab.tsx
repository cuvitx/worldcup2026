import type { Bookmaker } from "@repo/data/affiliates";
import CommunityVote from "../../../components/CommunityVote";
import { OddsTable, BettingCta } from "../components";

interface OddsTabProps {
  odds: { home: string; draw: string; away: string } | null;
  homeName: string;
  awayName: string;
  bookmakers: Bookmaker[];
  featuredBookmaker: Bookmaker;
  matchSlug: string;
  homeRanking: number;
  awayRanking: number;
}

export function OddsTab({
  odds,
  homeName,
  awayName,
  bookmakers,
  featuredBookmaker,
  matchSlug,
  homeRanking,
  awayRanking,
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
              bookmakers={bookmakers}
            />
          )}
          <BettingCta
            featuredBookmaker={featuredBookmaker}
            bookmakers={bookmakers}
            matchLabel={`${homeName} vs ${awayName}`}
          />
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
