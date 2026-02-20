// ============================================================================
// BetOfTheDay — Widget "Pari du jour"
// Auto-sélectionne le prochain match avec le favori le plus net.
// ============================================================================

import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { matchPredictionByPair } from "@repo/data/predictions";
import { stageLabels } from "@repo/data/constants";
import { bookmakers } from "@repo/data/affiliates";

export interface DailyBet {
  matchLabel: string;
  homeFlag: string;
  awayFlag: string;
  matchSlug: string;
  betType: string;
  odds: string;
  bookmaker: string;
  bookmakerUrl: string;
  confidence: 1 | 2 | 3 | 4 | 5;
  dateLabel: string;
}

function pickBetOfTheDay(): DailyBet {
  // Sort matches by date
  const sorted = [...matches]
    .filter((m) => !m.homeTeamId.startsWith("barrage-") && !m.homeTeamId.startsWith("intercontinental-"))
    .filter((m) => !m.awayTeamId.startsWith("barrage-") && !m.awayTeamId.startsWith("intercontinental-"))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Use build date to pick a different match each day (deterministic)
  const today = new Date().toISOString().slice(0, 10);
  const dayHash = today.split("-").reduce((acc, n) => acc + parseInt(n, 10), 0);

  function getPred(m: typeof sorted[0]) {
    return matchPredictionByPair[`${m.homeTeamId}:${m.awayTeamId}`];
  }

  // Find the match with highest win probability (most "safe" bet)
  let bestMatch = sorted[0]!;
  let bestProb = 0;

  for (const m of sorted) {
    const pred = getPred(m);
    if (!pred) continue;
    const maxProb = Math.max(pred.team1WinProb, pred.team2WinProb);
    if (maxProb > bestProb) {
      bestProb = maxProb;
      bestMatch = m;
    }
  }

  // Rotate through top 5 matches based on day
  const top5 = sorted
    .map((m) => {
      const p = getPred(m);
      return { match: m, prob: p ? Math.max(p.team1WinProb, p.team2WinProb) : 0 };
    })
    .filter((x) => x.prob > 0)
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 5);

  const picked = top5[dayHash % top5.length] ?? { match: bestMatch, prob: bestProb };
  const match = picked.match;
  const pred = getPred(match);
  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeName = home?.name ?? "TBD";
  const awayName = away?.name ?? "TBD";

  // Determine bet type based on probabilities
  const homeProb = pred?.team1WinProb ?? 0.33;
  const awayProb = pred?.team2WinProb ?? 0.33;
  const isFavoriHome = homeProb >= awayProb;
  const favoriName = isFavoriHome ? homeName : awayName;
  const favoriProb = isFavoriHome ? homeProb : awayProb;

  // Calculate confidence (1-5) based on probability gap
  const confidence: 1 | 2 | 3 | 4 | 5 = favoriProb > 0.65 ? 5 : favoriProb > 0.55 ? 4 : favoriProb > 0.45 ? 3 : favoriProb > 0.35 ? 2 : 1;

  // Determine bet type and odds
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

  // Pick recommended bookmaker (rotate)
  const mainBookmaker = bookmakers[dayHash % bookmakers.length] ?? bookmakers[0]!;

  return {
    matchLabel: `${homeName} vs ${awayName}`,
    homeFlag: home?.flag ?? "🏳",
    awayFlag: away?.flag ?? "🏳",
    matchSlug: match.slug,
    betType,
    odds,
    bookmaker: mainBookmaker.name,
    bookmakerUrl: mainBookmaker.url,
    confidence,
    dateLabel: `${stageLabels[match.stage] ?? match.stage} CDM 2026`,
  };
}

const todaysBet = pickBetOfTheDay();

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

export function BetOfTheDay({ compact = false, bet }: BetOfTheDayProps) {
  const display = bet ?? todaysBet;
  const conf = CONFIDENCE_LABELS[display.confidence] ?? CONFIDENCE_LABELS[3]!;

  if (compact) {
    return (
      <div className="rounded-xl border border-secondary/30 p-4 shadow-lg shadow-blue-900/20" style={{ background: "linear-gradient(160deg, var(--color-primary) 0%, var(--color-deep) 50%, var(--color-primary) 100%)" }}>
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
          href={display.bookmakerUrl}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="block w-full text-center rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-white hover:bg-accent/80 transition-colors"
        >
          Parier sur {display.bookmaker} →
        </a>
        <p className="mt-2 text-center text-[9px] text-gray-400">18+ · Jeu responsable</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden">
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
            href={display.bookmakerUrl}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 font-bold text-white hover:-translate-y-0.5 transition-all text-sm"
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

export { todaysBet };
