import type { Match, Team, MatchPrediction, TeamPrediction, H2HRecord, Stadium } from "@repo/data";
import type { MatchPreviewData } from "@repo/ai/generators";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  PredictionOutcomes,
  PredictedScore,
  MatchAnalysis,
  PredictionSidebar,
} from "../components";
import type { Bookmaker } from "@repo/data/affiliates";
import type { RelatedPronosticMatch } from "./RelatedMatchesSection";

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
  relatedMatches: RelatedPronosticMatch[];
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
          {!prediction && (
            <PredictionPendingCard
              match={match}
              home={home}
              away={away}
              homeName={homeName}
              awayName={awayName}
              stage={stage}
              dateFormatted={dateFormatted}
              stadium={stadium}
            />
          )}
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

function PredictionPendingCard({
  match,
  home,
  away,
  homeName,
  awayName,
  stage,
  dateFormatted,
  stadium,
}: {
  match: Match;
  home: Team | undefined;
  away: Team | undefined;
  homeName: string;
  awayName: string;
  stage: string;
  dateFormatted: string;
  stadium: Stadium | undefined;
}) {
  const teamLinks = [
    home ? { label: homeName, href: `/equipe/${home.id}`, flag: home.flag } : null,
    away ? { label: awayName, href: `/equipe/${away.id}`, flag: away.flag } : null,
  ].filter(Boolean) as { label: string; href: string; flag?: string }[];

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Analyse en préparation
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Pronostic {homeName} vs {awayName}
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Les probabilités 1-N-2 et le score prédit seront ajoutés dès que le
            modèle aura assez de signaux fiables pour ce match de {stage.toLowerCase()}.
            La page reste prête pour suivre l'affiche officielle, les infos du
            match et les marchés associés.
          </p>
        </div>

        <div className="rounded-xl bg-primary/5 px-4 py-3 text-sm text-primary sm:w-56">
          <p className="font-semibold">{dateFormatted}</p>
          <p className="mt-1 text-primary/70">{match.time}</p>
          {stadium && <p className="mt-1 text-primary/70">{stadium.name}</p>}
        </div>
      </div>

      {(home || away) && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {home && (
            <TeamSnapshot label={homeName} team={home} />
          )}
          {away && (
            <TeamSnapshot label={awayName} team={away} />
          )}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/match/${match.slug}`}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:text-primary"
        >
          Fiche du match
        </Link>
        <Link
          href={`/score-exact/${match.slug}`}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:text-primary"
        >
          Score exact
        </Link>
        <Link
          href={`/sur-quelle-chaine/${match.slug}`}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:text-primary"
        >
          Chaîne TV
        </Link>
        {teamLinks.map((teamLink) => (
          <Link
            key={teamLink.href}
            href={teamLink.href}
            className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:text-primary"
          >
            {teamLink.flag ? `${teamLink.flag} ` : ""}
            {teamLink.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function TeamSnapshot({ label, team }: { label: string; team: Team }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center gap-2">
        <span className="text-xl" aria-hidden="true">
          {team.flag}
        </span>
        <p className="min-w-0 truncate font-bold text-gray-900">{label}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-gray-500">Classement FIFA</p>
          <p className="font-bold text-gray-900">#{team.fifaRanking}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Confédération</p>
          <p className="font-bold text-gray-900">{team.confederation}</p>
        </div>
      </div>
    </div>
  );
}
