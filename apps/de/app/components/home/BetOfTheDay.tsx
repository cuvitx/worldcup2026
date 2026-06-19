import Link from "next/link";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { GaTrackingPixel } from "../GaTrackingPixel";

import type { Match, Team } from "@repo/data/types";
import type { MatchPrediction } from "@repo/data/predictions";

interface BetOfTheDayProps {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
  prediction: MatchPrediction | null;
  odds: { home: string; draw: string; away: string };
}

function formatDate(date: string): string {
  return new Date(date + "T00:00:00Z").toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

function getRecommendation(prediction: MatchPrediction): {
  label: string;
  detail: string;
  type: "1" | "N" | "2";
} {
  const { team1WinProb, drawProb, team2WinProb } = prediction;

  if (team1WinProb >= team2WinProb && team1WinProb >= drawProb) {
    return { label: "1", detail: "Victoire domicile", type: "1" };
  }
  if (team2WinProb >= team1WinProb && team2WinProb >= drawProb) {
    return { label: "2", detail: "Victoire extérieur", type: "2" };
  }
  return { label: "N", detail: "Match nul", type: "N" };
}

export function BetOfTheDay({
  match,
  homeTeam,
  awayTeam,
  prediction,
  odds,
}: BetOfTheDayProps) {
  const url = pmuTrackingUrl("bet-of-the-day");
  const reco = prediction ? getRecommendation(prediction) : null;

  const bestOdd =
    reco?.type === "1"
      ? odds.home
      : reco?.type === "2"
        ? odds.away
        : odds.draw;

  const stageLabel =
    match.stage === "group"
      ? `Groupe ${match.group}`
      : match.stage === "round-of-32"
        ? "32es de finale"
        : match.stage === "round-of-16"
          ? "8es de finale"
          : match.stage === "quarter-final"
            ? "Quart de finale"
            : match.stage === "semi-final"
              ? "Demi-finale"
              : match.stage === "final"
                ? "Finale"
                : match.stage === "third-place"
                  ? "Petite finale"
                  : "";

  return (
    <section className="py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-2xl border border-[#d4af37]/30 shadow-xl"
          style={{
            background:
              "linear-gradient(135deg, #0a0e1a 0%, #1a1040 35%, #2d1b69 65%, #1a1040 100%)",
          }}
        >
          <GaTrackingPixel variant="728x90" tracking="bet-of-the-day" />

          {/* Decorative elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#d4af37]/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"
          />

          <div className="relative px-5 py-6 sm:px-8 sm:py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/20 backdrop-blur-sm border border-[#d4af37]/30">
                <svg
                  className="h-5 w-5 text-[#ffd700]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Pari du jour
                </h2>
                <p className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                  {stageLabel} &bull; {formatDate(match.date)}
                </p>
              </div>
            </div>

            {/* Match card */}
            <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 mb-6">
              <div className="flex items-center justify-between gap-4">
                {/* Home */}
                <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                  <span className="text-3xl sm:text-4xl">{homeTeam.flag}</span>
                  <span className="text-sm sm:text-base font-bold text-white text-center truncate w-full">
                    {homeTeam.name}
                  </span>
                </div>

                {/* VS + time */}
                <div className="flex flex-col items-center shrink-0 gap-1">
                  <span className="text-xs font-black text-[#d4af37] tracking-widest">
                    VS
                  </span>
                  {match.time && (
                    <span className="text-xs text-white/60 font-medium">
                      {match.time}
                    </span>
                  )}
                </div>

                {/* Away */}
                <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                  <span className="text-3xl sm:text-4xl">{awayTeam.flag}</span>
                  <span className="text-sm sm:text-base font-bold text-white text-center truncate w-full">
                    {awayTeam.name}
                  </span>
                </div>
              </div>

              {/* Odds row */}
              <div className="grid grid-cols-3 gap-2 mt-5">
                {[
                  { label: "1", value: odds.home, active: reco?.type === "1" },
                  { label: "N", value: odds.draw, active: reco?.type === "N" },
                  { label: "2", value: odds.away, active: reco?.type === "2" },
                ].map((odd) => (
                  <div
                    key={odd.label}
                    className={`rounded-lg px-3 py-2.5 text-center transition-all ${
                      odd.active
                        ? "bg-[#d4af37]/20 border border-[#d4af37]/50 ring-1 ring-[#d4af37]/30"
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${
                        odd.active ? "text-[#ffd700]" : "text-white/40"
                      }`}
                    >
                      {odd.label}
                    </p>
                    <p
                      className={`text-base sm:text-lg font-black ${
                        odd.active ? "text-[#ffd700]" : "text-white/70"
                      }`}
                    >
                      {odd.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation + CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Prediction */}
              {reco && prediction && (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/30">
                    <span className="text-sm font-black text-[#ffd700]">
                      {reco.label}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      Notre prono : {reco.detail}
                    </p>
                    <p className="text-xs text-white/50">
                      Score prédit :{" "}
                      <span className="text-white/80 font-semibold">
                        {prediction.predictedScore}
                      </span>
                      {bestOdd !== "—" && (
                        <>
                          {" "}
                          &bull; Cote{" "}
                          <span className="text-[#ffd700] font-bold">
                            {bestOdd}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-black uppercase tracking-wider text-[#0c3b2e] shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)",
                }}
              >
                {/* Shine */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
                />
                <span className="relative">Parier sur PMU</span>
                <span className="relative" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>

            {/* Link to match page */}
            <div className="mt-4 text-center sm:text-left">
              <Link
                href={`/prognose-spiel/${match.slug}`}
                className="text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
              >
                Voir l&apos;analyse compl&egrave;te du match &rarr;
              </Link>
            </div>
          </div>

          {/* Legal footer */}
          <div className="relative border-t border-white/5 bg-black/30 px-4 py-2 sm:px-6">
            <p className="text-center text-[10px] leading-snug text-white/25">
              18+ | Offre soumise &agrave; conditions |{" "}
              <a
                href="tel:0974751313"
                className="underline text-white/35 hover:text-white/50"
              >
                09 74 75 13 13
              </a>{" "}
              | Jeu responsable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
