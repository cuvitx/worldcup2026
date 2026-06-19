import type { Match, Stadium } from "@repo/data";
import CommunityVote from "../../../components/CommunityVote";
import { MatchInfo } from "../components";

interface InfoTabProps {
  match: Match;
  stadium: Stadium | undefined;
  city: any;
  stage: string;
  dateFormatted: string;
  homeName: string;
  awayName: string;
  homeRanking: number;
  awayRanking: number;
}

export function InfoTab({
  match,
  stadium,
  city,
  stage,
  dateFormatted,
  homeName,
  awayName,
  homeRanking,
  awayRanking,
}: InfoTabProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <MatchInfo
          match={match}
          stadium={stadium}
          city={city}
          stage={stage}
          dateFormatted={dateFormatted}
        />
        <CommunityVote
          slug={match.slug}
          homeName={homeName}
          awayName={awayName}
          homeRanking={homeRanking}
          awayRanking={awayRanking}
        />
      </div>
    </div>
  );
}
