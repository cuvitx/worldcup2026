"use client";

// ============================================================================
// BetOfTheDay — Widget "Paris du jour"
// Données statiques pour l'instant. Structure prête pour API future.
// Intégrer sur homepage et pages match.
// ============================================================================

import Link from "next/link";

export interface DailyBet {
  id: string;
  /** Nom du match, ex: "France vs Brésil" */
  matchLabel: string;
  /** Drapeaux des équipes */
  homeFlag: string;
  awayFlag: string;
  /** Slug du match pour le lien */
  matchSlug?: string;
  /** Type de pari, ex: "Victoire France", "Les deux équipes marquent" */
  betType: string;
  /** Cote décimale affichée */
  odds: string;
  /** Nom du bookmaker recommandé */
  bookmaker: string;
  /** URL affilié du bookmaker */
  bookmakerUrl: string;
  /** Confiance de l'analyste (1-5) */
  confidence: 1 | 2 | 3 | 4 | 5;
  /** Argument court (1-2 phrases) */
  rationale: string;
  /** Date du match ou "Phase de groupes" */
  dateLabel: string;
}

// Données statiques — à remplacer par fetch API lorsque disponible
const DAILY_BETS: DailyBet[] = [
  {
    id: "bet-001",
    matchLabel: "France vs Argentine",
    homeFlag: "🇫🇷",
    awayFlag: "🇦🇷",
    matchSlug: "france-vs-argentine",
    betType: "Match nul ou victoire France",
    odds: "1.65",
    bookmaker: "Betclic",
    bookmakerUrl:
      "https://www.betclic.fr/?utm_source=cdm2026&utm_medium=widget&utm_campaign=betday",
    confidence: 4,
    rationale:
      "La France n'a perdu qu'un seul de ses 8 derniers matchs face à l'Argentine. Effectif plus homogène et en forme.",
    dateLabel: "Quart de finale CDM 2026",
  },
  {
    id: "bet-002",
    matchLabel: "Brésil vs Angleterre",
    homeFlag: "🇧🇷",
    awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    matchSlug: "bresil-vs-angleterre",
    betType: "+2.5 buts dans le match",
    odds: "1.88",
    bookmaker: "Winamax",
    bookmakerUrl:
      "https://www.winamax.fr/?utm_source=cdm2026&utm_medium=widget&utm_campaign=betday",
    confidence: 3,
    rationale:
      "Ces deux équipes cumulent 7 buts par match en moyenne lors des phases finales. Style offensif des deux côtés garanti.",
    dateLabel: "Demi-finale CDM 2026",
  },
  {
    id: "bet-003",
    matchLabel: "Espagne vs Allemagne",
    homeFlag: "🇪🇸",
    awayFlag: "🇩🇪",
    matchSlug: "espagne-vs-allemagne",
    betType: "Victoire Espagne",
    odds: "2.10",
    bookmaker: "Betclic",
    bookmakerUrl:
      "https://www.betclic.fr/?utm_source=cdm2026&utm_medium=widget&utm_campaign=betday",
    confidence: 4,
    rationale:
      "L'Espagne domine le jeu de possession en EURO 2024. L'Allemagne peine encore à retrouver son niveau en gros matchs.",
    dateLabel: "Phase de groupes CDM 2026",
  },
];

// Pari du jour = premier de la liste (en production: fetch API)
const todaysBet = DAILY_BETS[0]!;

const CONFIDENCE_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Risqué", color: "text-red-400" },
  2: { label: "Incertain", color: "text-primary" },
  3: { label: "Modéré", color: "text-secondary" },
  4: { label: "Confiant", color: "text-secondary" },
  5: { label: "Très confiant", color: "text-field" },
};

interface BetOfTheDayProps {
  /** Variante compacte pour sidebar/page match */
  compact?: boolean;
  /** Surcharger le pari (pour les pages match) */
  bet?: DailyBet;
}

export function BetOfTheDay({ compact = false, bet }: BetOfTheDayProps) {
  const display = bet ?? todaysBet;
  const conf = CONFIDENCE_LABELS[display.confidence] ?? CONFIDENCE_LABELS[3]!;
  const confidenceStars = "★".repeat(display.confidence) + "☆".repeat(5 - display.confidence);

  if (compact) {
    return (
      <div className="rounded-xl border border-secondary/30 p-4 shadow-lg shadow-blue-900/20" style={{ background: "linear-gradient(160deg, #0D3B66 0%, #0F1923 50%, #0D3B66 100%)" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-secondary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
              Pari du jour
            </span>
          </div>
          <span className={`text-[10px] font-semibold ${conf.color}`}>{conf.label}</span>
        </div>

        {/* Match */}
        <p className="text-sm font-bold text-white mb-1">
          {display.homeFlag} {display.matchLabel} {display.awayFlag}
        </p>
        <p className="text-xs text-white/50 mb-3">{display.dateLabel}</p>

        {/* Bet */}
        <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 mb-3">
          <span className="text-xs text-gray-300">{display.betType}</span>
          <span className="text-lg font-extrabold text-secondary">{display.odds}</span>
        </div>

        {/* CTA */}
        <a
          href={display.bookmakerUrl}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="block w-full text-center rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white hover:bg-primary/90 transition-colors"
        >
          Parier sur {display.bookmaker} →
        </a>
        <p className="mt-2 text-center text-[9px] text-gray-500">18+ · Jeu responsable</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />
      {/* Déco orb */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 border border-secondary/40">
              🎯
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">
                Pari du jour
              </p>
              <p className="text-[10px] text-gray-400">Par nos experts CDM 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${conf.color}`}>{conf.label}</span>
            <span className="text-secondary text-xs tracking-tighter">{confidenceStars}</span>
          </div>
        </div>

        {/* Match display */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <span className="text-5xl block mb-1">{display.homeFlag}</span>
            <span className="text-xs text-gray-300 font-medium">
              {display.matchLabel.split(" vs ")[0]}
            </span>
          </div>
          <div className="text-center px-4">
            <span className="block text-lg font-extrabold text-gray-400">VS</span>
            <span className="block text-[10px] text-gray-500 mt-1">{display.dateLabel}</span>
          </div>
          <div className="text-center">
            <span className="text-5xl block mb-1">{display.awayFlag}</span>
            <span className="text-xs text-gray-300 font-medium">
              {display.matchLabel.split(" vs ")[1]}
            </span>
          </div>
        </div>

        {/* Bet card */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow mb-4">
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

        {/* Rationale */}
        <p className="text-sm text-gray-300/80 leading-relaxed mb-5 italic">
          💡 {display.rationale}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a
            href={display.bookmakerUrl}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-red-600 px-5 py-3 font-bold text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
          >
            Parier sur {display.bookmaker}
            <span className="text-secondary font-extrabold">{display.odds}</span>
          </a>
          {display.matchSlug && (
            <Link
              href={`/pronostic-match/${display.matchSlug}`}
              className="flex items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/8 px-5 py-3 font-semibold text-white hover:bg-white/15 transition-all text-sm"
            >
              Analyse complète →
            </Link>
          )}
        </div>

        <p className="mt-3 text-center text-[10px] text-gray-600">
          18+ · Jeu responsable · Les paris sportifs peuvent créer une dépendance.
        </p>
      </div>
    </div>
  );
}

// Export des données pour usage externe
export { DAILY_BETS, todaysBet };
