// ============================================================================
// BetOfTheDay — Widget "Pari du jour"
// Auto-sélectionne le prochain match avec le favori le plus net, depuis les
// matchs RÉSOLUS (resolver officiel), jamais depuis les données statiques :
// les statuts statiques peuvent rester "scheduled" après coup et faire
// remonter un match de groupes déjà joué (bug Uruguay-Cap-Vert du 2026-07-02).
// Le lien du CTA suit TOUJOURS le bookmaker affiché (rotation multi-programmes).
// ============================================================================

import Link from "next/link";
import { matches } from "@repo/data/matches";
import { matchPredictionByPair, predictionsByTeamId } from "@repo/data/predictions";
import { stageLabels } from "@repo/data/constants";
import {
  affiliateLinkAttributes,
  affiliateTrackingUrl,
  bookmakers,
  type AffiliateProgramId,
} from "@repo/data/affiliates";
import { getResolvedCalendarMatches } from "../../lib/calendar-match-resolution";
import { GaTrackingPixel } from "./GaTrackingPixel";

export interface DailyBet {
  matchLabel: string;
  homeFlag: string;
  awayFlag: string;
  matchSlug: string;
  betType: string;
  odds: string;
  bookmaker: string;
  bookmakerProgram: AffiliateProgramId;
  confidence: 1 | 2 | 3 | 4 | 5;
  dateLabel: string;
}

/** Fallback ELO quand la paire exacte manque dans matchPredictionByPair (même modèle que la homepage). */
function eloFallbackProbs(homeTeamId: string, awayTeamId: string) {
  const home = predictionsByTeamId[homeTeamId];
  const away = predictionsByTeamId[awayTeamId];
  if (!home || !away) return null;

  const eloDiff = home.eloRating - away.eloRating;
  const absEloDiff = Math.abs(eloDiff);
  const drawProb = Math.max(0.18, Math.min(0.31, 0.31 - Math.min(absEloDiff, 400) * 0.00025));
  const nonDrawProb = 1 - drawProb;
  const homeNoDrawProb = 1 / (1 + Math.pow(10, -eloDiff / 400));

  return {
    team1WinProb: nonDrawProb * homeNoDrawProb,
    drawProb,
    team2WinProb: nonDrawProb * (1 - homeNoDrawProb),
  };
}

function isRealTeamId(teamId: string | undefined): boolean {
  return Boolean(
    teamId &&
      !teamId.startsWith("tbd-") &&
      !teamId.startsWith("barrage-") &&
      !teamId.startsWith("intercontinental-")
  );
}

async function pickBetOfTheDay(): Promise<DailyBet | null> {
  const resolved = await getResolvedCalendarMatches(matches);
  const today = new Date().toISOString().slice(0, 10);

  // Uniquement les matchs à venir dont l'affiche est officiellement résolue.
  const upcoming = resolved
    .filter((m) => m.status !== "finished")
    .filter((m) => m.date >= today)
    .filter((m) => isRealTeamId(m.homeTeamId) && isRealTeamId(m.awayTeamId))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (upcoming.length === 0) return null;

  // Matchs du jour, sinon prochaine journée avec des affiches connues.
  const targetDate = upcoming.some((m) => m.date === today) ? today : upcoming[0]!.date;
  const pool = upcoming.filter((m) => m.date === targetDate);

  const candidates = pool
    .map((m) => {
      const pred =
        matchPredictionByPair[`${m.homeTeamId}:${m.awayTeamId}`] ??
        eloFallbackProbs(m.homeTeamId, m.awayTeamId);
      if (!pred) return null;
      return { match: m, pred, prob: Math.max(pred.team1WinProb, pred.team2WinProb) };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.prob - a.prob);

  // Aucun candidat fiable : ne rien afficher plutôt qu'un pari trompeur.
  if (candidates.length === 0) return null;

  const picked = candidates[0]!;
  const { match, pred } = picked;

  const homeName = match.homeName;
  const awayName = match.awayName;
  const homeProb = pred.team1WinProb;
  const awayProb = pred.team2WinProb;
  const isFavoriHome = homeProb >= awayProb;
  const favoriName = isFavoriHome ? homeName : awayName;
  const favoriProb = isFavoriHome ? homeProb : awayProb;

  const confidence: 1 | 2 | 3 | 4 | 5 =
    favoriProb > 0.65 ? 5 : favoriProb > 0.55 ? 4 : favoriProb > 0.45 ? 3 : favoriProb > 0.35 ? 2 : 1;

  let betType: string;
  let odds: string;
  if (favoriProb > 0.55) {
    betType = `Match nul ou victoire ${favoriName}`;
    // Double chance odds ≈ 1 / (1 - loserProb)
    const loserProb = isFavoriHome ? awayProb : homeProb;
    odds = Math.max(1.1, 1 / (1 - loserProb)).toFixed(2);
  } else {
    betType = `Victoire ${favoriName}`;
    odds = (1 / favoriProb).toFixed(2);
  }

  // Rotation quotidienne du bookmaker recommandé sur les programmes câblés.
  const dayHash = today.split("-").reduce((acc, n) => acc + parseInt(n, 10), 0);
  const mainBookmaker = bookmakers[dayHash % bookmakers.length] ?? bookmakers[0]!;

  return {
    matchLabel: `${homeName} vs ${awayName}`,
    homeFlag: match.homeFlag,
    awayFlag: match.awayFlag,
    matchSlug: match.slug,
    betType,
    odds,
    bookmaker: mainBookmaker.name,
    bookmakerProgram: mainBookmaker.program,
    confidence,
    dateLabel: `${stageLabels[match.stage] ?? match.stage} CDM 2026`,
  };
}

const CONFIDENCE_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Risqué", color: "text-red-400" },
  2: { label: "Incertain", color: "text-primary" },
  3: { label: "Modéré", color: "text-secondary" },
  4: { label: "Confiant", color: "text-secondary" },
  5: { label: "Très confiant", color: "text-accent" },
};

interface BetOfTheDayProps {
  compact?: boolean;
  bet?: DailyBet;
}

export async function BetOfTheDay({ compact = false, bet }: BetOfTheDayProps) {
  const display = bet ?? (await pickBetOfTheDay());
  if (!display) return null;

  const conf = CONFIDENCE_LABELS[display.confidence] ?? CONFIDENCE_LABELS[3]!;
  const tracking = {
    pageType: "bet-of-the-day",
    slug: display.matchSlug || "index",
    placement: compact ? "compact-cta" : "main-cta",
  };
  // Le lien va vers le bookmaker AFFICHÉ, jamais vers un programme par défaut.
  const bookmakerUrl = affiliateTrackingUrl(display.bookmakerProgram, tracking);
  if (!bookmakerUrl) return null;
  const bookmakerAttributes = affiliateLinkAttributes(tracking, undefined, display.bookmakerProgram);

  if (compact) {
    return (
      <div className="relative rounded-xl border border-secondary/30 p-4 shadow-lg shadow-blue-900/20" style={{ background: "linear-gradient(160deg, var(--color-primary) 0%, var(--color-deep) 50%, var(--color-primary) 100%)" }}>
        <GaTrackingPixel variant="300x250" tracking={`pari-du-jour-${display.matchSlug}`} />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-secondary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
              Pari du jour
            </span>
          </div>
          <span className={`text-[10px] font-semibold ${conf.color}`}>{conf.label}</span>
        </div>

        <p className="text-sm font-bold text-white mb-1">
          {display.homeFlag} {display.matchLabel} {display.awayFlag}
        </p>
        <p className="text-xs text-white/80 mb-3">{display.dateLabel}</p>

        <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 mb-3">
          <span className="text-xs text-gray-300">{display.betType}</span>
          <span className="text-lg font-extrabold text-secondary">{display.odds}</span>
        </div>

        <a
          href={bookmakerUrl}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          {...bookmakerAttributes}
          className="block w-full text-center rounded-xl px-4 py-2.5 text-xs font-bold text-[#0c3b2e] hover:brightness-110 transition"
          style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
        >
          Parier sur {display.bookmaker} →
        </a>
        <p className="mt-2 text-center text-[9px] text-gray-400">18+ · Jeu responsable</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <GaTrackingPixel variant="728x90" tracking={`pari-du-jour-${display.matchSlug}`} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-deep to-gray-dark" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 border border-secondary/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">Pari du jour</p>
              <p className="text-[10px] text-gray-300">Sélection automatique CDM 2026</p>
            </div>
          </div>
          <span className={`text-xs font-semibold ${conf.color}`}>{conf.label}</span>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <span className="text-5xl block mb-1">{display.homeFlag}</span>
            <span className="text-xs text-gray-300 font-medium">{display.matchLabel.split(" vs ")[0]}</span>
          </div>
          <div className="text-center px-4">
            <span className="block text-lg font-extrabold text-gray-300">VS</span>
            <span className="block text-[10px] text-gray-400 mt-1">{display.dateLabel}</span>
          </div>
          <div className="text-center">
            <span className="text-5xl block mb-1">{display.awayFlag}</span>
            <span className="text-xs text-gray-300 font-medium">{display.matchLabel.split(" vs ")[1]}</span>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Type de pari</p>
              <p className="text-sm sm:text-base font-bold text-white break-words">{display.betType}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Cote</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-secondary">{display.odds}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={bookmakerUrl}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            {...bookmakerAttributes}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-bold text-[#0c3b2e] hover:-translate-y-0.5 transition-all text-sm"
            style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
          >
            Parier sur {display.bookmaker}
            <span className="text-secondary font-extrabold">{display.odds}</span>
          </a>
          {display.matchSlug && (
            <Link
              href={`/pronostic-match/${display.matchSlug}`}
              className="flex items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 font-semibold text-white hover:bg-white/15 transition-all text-sm"
            >
              Analyse complète →
            </Link>
          )}
        </div>

        <p className="mt-3 text-center text-[10px] text-gray-400">
          18+ · Jeu responsable
        </p>
      </div>
    </div>
  );
}
