import type { Match, Team, MatchPrediction, TeamPrediction, H2HRecord, Stadium } from "@repo/data";
import type { MatchPreviewData } from "@repo/ai/generators";
import dynamic from "next/dynamic";
import {
  PredictionOutcomes,
  PredictedScore,
  MatchAnalysis,
  PredictionSidebar,
} from "../components";
import type { Bookmaker } from "@repo/data/affiliates";

const AiExpertInsight = dynamic(
  () => import("@repo/ui/ai-expert-insight").then((m) => ({ default: m.AiExpertInsight })),
  {
    loading: () => (
      <div className="rounded-xl border border-border bg-card p-6 animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      </div>
    ),
    ssr: false,
  }
);

interface PredictionTabProps {
  prediction: MatchPrediction | undefined;
  outcomes: { key: string; label: string; prob: number }[];
  maxProb: number;
  home: Team | undefined;
  away: Team | undefined;
  homeName: string;
  awayName: string;
  match: Match;
  predHome: TeamPrediction | undefined;
  predAway: TeamPrediction | undefined;
  h2h: H2HRecord | undefined;
  stage: string;
  dateFormatted: string;
  stadium: Stadium | undefined;
  city: any;
  enriched: MatchPreviewData | null;
  odds: { home: string; draw: string; away: string } | null;
  featuredBookmaker: Bookmaker;
  relatedMatches: Match[];
}

export function PredictionTab({
  prediction,
  outcomes,
  maxProb,
  home,
  away,
  homeName,
  awayName,
  match,
  predHome,
  predAway,
  h2h,
  stage,
  dateFormatted,
  stadium,
  city,
  enriched,
  odds,
  featuredBookmaker,
  relatedMatches,
}: PredictionTabProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {prediction && (
            <PredictionOutcomes
              outcomes={outcomes}
              maxProb={maxProb}
              homeName={homeName}
              awayName={awayName}
            />
          )}
          {prediction && (
            <PredictedScore
              prediction={prediction}
              home={home}
              away={away}
              homeName={homeName}
              awayName={awayName}
            />
          )}
          {home && away && prediction && (
            <MatchAnalysis
              match={match}
              home={home}
              away={away}
              prediction={prediction}
              predHome={predHome}
              predAway={predAway}
              h2h={h2h}
              stage={stage}
              homeName={homeName}
              awayName={awayName}
              dateFormatted={dateFormatted}
              stadium={stadium}
            />
          )}
          {enriched?.expert && (
            <AiExpertInsight
              valueBets={enriched.expert.valueBets}
              matchAnalysis={enriched.expert.matchAnalysis}
              scorePrediction={enriched.expert.scorePrediction}
              keyInsight={enriched.expert.keyInsight}
              locale="fr"
            />
          )}
        </div>
        <PredictionSidebar
          prediction={prediction}
          odds={odds}
          home={home}
          away={away}
          match={match}
          stadium={stadium}
          city={city}
          homeName={homeName}
          awayName={awayName}
          enriched={enriched}
          featuredBookmaker={featuredBookmaker}
          relatedMatches={relatedMatches}
        />
      </div>
    </div>
  );
}
