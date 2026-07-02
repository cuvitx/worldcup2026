import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Shield,
  Trophy,
} from "lucide-react";
import { FAQSection } from "@repo/ui/faq-section";
import { matches } from "@repo/data/matches";
import { stadiumsById } from "@repo/data/stadiums";
import type { Match, Team } from "@repo/data/types";
import type { ResolvedMatchTeams } from "../../lib/knockout-match-teams";
import { resolveMatchTeamsWithResults } from "../../lib/knockout-match-teams-runtime";
import { getResolvedCalendarMatches } from "../../lib/calendar-match-resolution";
import { PmuBanner } from "./PmuBanner";

type KnockoutStage = Extract<
  Match["stage"],
  | "round-of-32"
  | "round-of-16"
  | "quarter-final"
  | "semi-final"
  | "third-place"
  | "final"
>;

type MainKnockoutStage = Exclude<KnockoutStage, "third-place">;

interface RoundConfig {
  stage: KnockoutStage;
  slug: string;
  href: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  dateLabel: string;
  matchCount: number;
  teamCount: number;
  previous?: MainKnockoutStage;
  next?: MainKnockoutStage;
  faqItems: { question: string; answer: string }[];
}

const MAIN_ROUNDS: MainKnockoutStage[] = [
  "round-of-32",
  "round-of-16",
  "quarter-final",
  "semi-final",
  "final",
];

const OVERVIEW_ROUNDS: KnockoutStage[] = [
  "round-of-32",
  "round-of-16",
  "quarter-final",
  "semi-final",
  "third-place",
  "final",
];

const ROUND_CONFIGS: Record<KnockoutStage, RoundConfig> = {
  "round-of-32": {
    stage: "round-of-32",
    slug: "16emes-de-finale",
    href: "/16emes-de-finale",
    title: "16es de finale CDM 2026",
    shortTitle: "16es de finale",
    eyebrow: "Début de la phase finale",
    description:
      "Les 32 équipes qualifiées entrent dans le tableau à élimination directe. Retrouvez les affiches, scores, horaires, stades et liens vers chaque fiche match.",
    dateLabel: "28 juin - 4 juillet 2026",
    matchCount: 16,
    teamCount: 32,
    next: "round-of-16",
    faqItems: [
      {
        question: "Combien de matchs y a-t-il en 16es de finale ?",
        answer:
          "Les 16es de finale comptent 16 matchs. Les 12 premiers de groupe, les 12 deuxièmes et les 8 meilleurs troisièmes se qualifient pour ce premier tour à élimination directe.",
      },
      {
        question: "Les équipes affichées sont-elles les vraies équipes ?",
        answer:
          "Oui. La page utilise les résultats mis à jour pour résoudre les places du tableau. Les emplacements encore non déterminés restent affichés comme vainqueur ou slot qualificatif jusqu'à confirmation.",
      },
      {
        question: "Que se passe-t-il en cas d'égalité ?",
        answer:
          "À partir des 16es de finale, un match nul après 90 minutes mène à une prolongation de 30 minutes, puis à une séance de tirs au but si nécessaire.",
      },
    ],
  },
  "round-of-16": {
    stage: "round-of-16",
    slug: "8emes-de-finale",
    href: "/8emes-de-finale",
    title: "8es de finale CDM 2026",
    shortTitle: "8es de finale",
    eyebrow: "Le tableau se resserre",
    description:
      "Les vainqueurs des 16es de finale s'affrontent pour rejoindre les quarts. Suivez les affiches officielles, les scores et les liens vers les pronostics match par match.",
    dateLabel: "4 - 7 juillet 2026",
    matchCount: 8,
    teamCount: 16,
    previous: "round-of-32",
    next: "quarter-final",
    faqItems: [
      {
        question: "Quand se jouent les 8es de finale ?",
        answer:
          "Les 8es de finale sont programmés du 4 au 7 juillet 2026, avec huit matchs répartis sur quatre jours.",
      },
      {
        question: "Comment les affiches des 8es sont-elles déterminées ?",
        answer:
          "Chaque affiche oppose deux vainqueurs des 16es de finale selon le bracket FIFA. Les équipes sont remplacées automatiquement quand les matchs précédents sont terminés.",
      },
    ],
  },
  "quarter-final": {
    stage: "quarter-final",
    slug: "quarts-de-finale",
    href: "/quarts-de-finale",
    title: "Quarts de finale CDM 2026",
    shortTitle: "Quarts de finale",
    eyebrow: "Les huit derniers",
    description:
      "Quatre matchs décisifs pour atteindre le dernier carré. Calendrier, stades, scores et accès direct aux fiches de pronostic.",
    dateLabel: "9 - 12 juillet 2026",
    matchCount: 4,
    teamCount: 8,
    previous: "round-of-16",
    next: "semi-final",
    faqItems: [
      {
        question: "Quand se jouent les quarts de finale ?",
        answer:
          "Les quarts de finale sont programmés du 9 au 12 juillet 2026 en heure de Paris, selon les horaires officiels du calendrier.",
      },
      {
        question: "Combien d'équipes restent en quarts ?",
        answer:
          "Huit équipes restent en lice. Les quatre vainqueurs accèdent aux demi-finales.",
      },
    ],
  },
  "semi-final": {
    stage: "semi-final",
    slug: "demi-finales",
    href: "/demi-finales",
    title: "Demi-finales CDM 2026",
    shortTitle: "Demi-finales",
    eyebrow: "Le dernier carré",
    description:
      "Deux matchs pour une place en finale. Suivez les équipes qualifiées, les scores, les stades et les liens utiles avant le coup d'envoi.",
    dateLabel: "14 - 15 juillet 2026",
    matchCount: 2,
    teamCount: 4,
    previous: "quarter-final",
    next: "final",
    faqItems: [
      {
        question: "Quand se jouent les demi-finales ?",
        answer:
          "Les demi-finales sont programmées les 14 et 15 juillet 2026 en heure de Paris.",
      },
      {
        question: "Y a-t-il un match pour la 3e place ?",
        answer:
          "Oui. Les deux perdants des demi-finales jouent le match pour la 3e place le 18 juillet 2026.",
      },
    ],
  },
  "third-place": {
    stage: "third-place",
    slug: "petite-finale",
    href: "/match/third-place",
    title: "Match pour la 3e place CDM 2026",
    shortTitle: "Petite finale",
    eyebrow: "Podium",
    description:
      "Le match pour la 3e place oppose les deux perdants des demi-finales, la veille de la grande finale.",
    dateLabel: "18 juillet 2026",
    matchCount: 1,
    teamCount: 2,
    faqItems: [],
  },
  final: {
    stage: "final",
    slug: "finale",
    href: "/finale",
    title: "Finale CDM 2026",
    shortTitle: "Finale",
    eyebrow: "Le match du titre",
    description:
      "La finale de la Coupe du Monde 2026 au MetLife Stadium. Retrouvez les finalistes, le score, l'horaire et la fiche match officielle.",
    dateLabel: "19 juillet 2026",
    matchCount: 1,
    teamCount: 2,
    previous: "semi-final",
    faqItems: [
      {
        question: "Quand se joue la finale de la Coupe du Monde 2026 ?",
        answer:
          "La finale est programmée le 19 juillet 2026 au MetLife Stadium, avec un coup d'envoi à 21h00 en heure de Paris selon le calendrier actuel.",
      },
      {
        question: "Quand les finalistes seront-ils affichés ?",
        answer:
          "Les finalistes sont affichés automatiquement après les demi-finales, dès que les résultats sont intégrés dans la source de données du site.",
      },
    ],
  },
};

async function getOfficialKnockoutMatches() {
  return getResolvedCalendarMatches(matches);
}

function roundMatches(sourceMatches: Match[], stage: KnockoutStage) {
  return sourceMatches
    .filter((match) => match.stage === stage)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });
}

function formatDayHeader(date: string) {
  const value = new Date(`${date}T12:00:00`);
  const weekday = value.toLocaleDateString("fr-FR", { weekday: "long" });
  const fullDate = value.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
    fullDate,
  };
}

function statusLabel(match: Match) {
  if (match.status === "finished") return "Terminé";
  if (match.status === "live") {
    if (match.statusShort === "BT") return "Pause prolongation";
    if (match.statusShort === "ET") return "Prolongation";
    if (match.statusShort === "P") return "Tirs au but";
    if (match.statusShort === "HT") return "Mi-temps";
    return "En direct";
  }
  return "À venir";
}

function scoreText(match: Match) {
  if (
    typeof match.homeScore === "number" &&
    typeof match.awayScore === "number"
  ) {
    return `${match.homeScore} - ${match.awayScore}`;
  }
  return "VS";
}

function isWinner(match: Match, side: "home" | "away") {
  if (
    match.status !== "finished" ||
    typeof match.homeScore !== "number" ||
    typeof match.awayScore !== "number" ||
    (match.homeScore === match.awayScore && !match.winnerTeamId && !match.winnerSide)
  ) {
    return false;
  }

  if (match.winnerTeamId) {
    return side === "home"
      ? match.winnerTeamId === match.homeTeamId
      : match.winnerTeamId === match.awayTeamId;
  }

  if (match.homeScore === match.awayScore && match.winnerSide) {
    return match.winnerSide === side;
  }

  return side === "home"
    ? match.homeScore > match.awayScore
    : match.awayScore > match.homeScore;
}

function winnerSide(match: Match): "home" | "away" | null {
  if (
    match.status !== "finished" ||
    typeof match.homeScore !== "number" ||
    typeof match.awayScore !== "number" ||
    (match.homeScore === match.awayScore && !match.winnerTeamId && !match.winnerSide)
  ) {
    return null;
  }

  if (match.winnerSide === "home" || match.winnerSide === "away") {
    return match.winnerSide;
  }

  if (match.winnerTeamId) {
    if (match.winnerTeamId === match.homeTeamId) return "home";
    if (match.winnerTeamId === match.awayTeamId) return "away";
  }

  return match.homeScore > match.awayScore ? "home" : "away";
}

function hasPenaltyShootout(match: Match) {
  return (
    typeof match.penaltyHomeScore === "number" &&
    typeof match.penaltyAwayScore === "number"
  );
}

function verdictLabel(match: Match, teams: ResolvedMatchTeams) {
  const side = winnerSide(match);
  if (!side) return null;

  const name = side === "home" ? teams.homeName : teams.awayName;
  return hasPenaltyShootout(match)
    ? `${name} qualifié aux tirs au but`
    : `${name} vainqueur`;
}

function matchNumberLabel(slug: string) {
  const match = slug.match(/-(\d+)$/);
  return match ? `N°${match[1]}` : slug.toUpperCase();
}

function groupCardsByDate(matchCards: MatchCardModel[]) {
  const groups = new Map<string, MatchCardModel[]>();

  for (const card of matchCards) {
    const dayMatches = groups.get(card.match.date) ?? [];
    dayMatches.push(card);
    groups.set(card.match.date, dayMatches);
  }

  return Array.from(groups.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, cards]) => ({
      date,
      cards,
    }));
}

function TeamBlock({
  team,
  name,
  slotLabel,
  winner,
  align = "left",
}: {
  team?: Team;
  name: string;
  slotLabel: string;
  winner: boolean;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex w-full min-w-0 flex-col items-center gap-2 rounded-xl border px-3 py-3 text-center transition-colors sm:flex-row sm:gap-3 sm:px-4 sm:text-left ${
        winner
          ? "border-emerald-200 bg-emerald-50 shadow-sm ring-1 ring-emerald-100"
          : "border-transparent bg-transparent"
      } ${
        align === "right" ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <span
        className={`flex h-12 w-16 shrink-0 items-center justify-center rounded-lg border text-4xl shadow-sm ${
          winner
            ? "border-emerald-200 bg-emerald-50"
            : "border-gray-200 bg-white"
        }`}
        aria-hidden="true"
      >
        <span className="leading-none">
          {team?.flag ?? "🏳️"}
        </span>
      </span>
      <div className="min-w-0 max-w-full">
        <div
          className={`flex min-w-0 flex-col items-center gap-1 sm:flex-row ${
            align === "right" ? "sm:flex-row-reverse" : ""
          }`}
        >
          <p
            className={`truncate text-base font-extrabold ${
              winner ? "text-primary" : "text-gray-900"
            }`}
          >
            {name}
          </p>
          {winner && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
              <Trophy className="h-3 w-3" />
              Vainqueur
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-[11px] font-semibold uppercase text-gray-500">
          {team ? `${team.code} · #${team.fifaRanking} FIFA` : slotLabel}
        </p>
      </div>
    </div>
  );
}

type MatchCardModel = {
  match: Match;
  teams: ResolvedMatchTeams;
};

async function resolveMatchCards(
  stageMatches: Match[],
  sourceMatches: Match[],
): Promise<MatchCardModel[]> {
  return Promise.all(
    stageMatches.map(async (match) => ({
      match,
      teams: await resolveMatchTeamsWithResults(
        match,
        "À déterminer",
        sourceMatches,
      ),
    })),
  );
}

function MatchScore({
  match,
  verdict,
}: {
  match: Match;
  verdict?: string | null;
}) {
  const live = match.status === "live";
  const finished = match.status === "finished";
  const label = finished || live ? scoreText(match) : match.time;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span
        className={`inline-flex min-w-16 items-center justify-center rounded-lg px-3 py-2 text-lg font-black tabular-nums ${
          live
            ? "bg-emerald-600 text-white"
            : finished
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-950"
        }`}
      >
        {label}
      </span>
      {finished && verdict && (
        <span className="inline-flex max-w-44 items-center justify-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-center text-[11px] font-black uppercase leading-tight text-emerald-700">
          <Trophy className="h-3.5 w-3.5 shrink-0" />
          {verdict}
        </span>
      )}
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
          live
            ? "bg-emerald-100 text-emerald-700"
            : finished
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600"
        }`}
      >
        {statusLabel(match)}
      </span>
    </div>
  );
}

function MatchRow({
  match,
  teams,
}: {
  match: Match;
  teams: ResolvedMatchTeams;
}) {
  const stadium = stadiumsById[match.stadiumId];
  const round = ROUND_CONFIGS[match.stage as KnockoutStage];
  const verdict = verdictLabel(match, teams);

  return (
    <article className="bg-white px-4 py-5 transition-colors hover:bg-gray-50 sm:px-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_172px_minmax(0,1fr)] lg:items-center">
        <TeamBlock
          team={teams.home}
          name={teams.homeName}
          slotLabel={teams.homeSlot.label}
          winner={isWinner(match, "home")}
        />

        <MatchScore match={match} verdict={verdict} />

        <TeamBlock
          team={teams.away}
          name={teams.awayName}
          slotLabel={teams.awaySlot.label}
          winner={isWinner(match, "away")}
          align="right"
        />
      </div>

      <div className="mt-5 flex flex-col items-center gap-3 border-t border-gray-100 pt-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <dl className="grid min-w-0 justify-items-center gap-2 text-sm text-gray-600 sm:grid-cols-3 lg:flex lg:items-center lg:justify-items-start lg:gap-4">
          <div className="flex min-w-0 items-center justify-center gap-2 lg:justify-start">
            <Shield className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate font-semibold text-primary">
              {round.shortTitle}
            </span>
          </div>
          <div className="flex min-w-0 items-center justify-center gap-2 lg:justify-start">
            <CalendarDays className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="truncate">{matchNumberLabel(match.slug)}</span>
          </div>
          {stadium && (
            <div className="flex min-w-0 items-center justify-center gap-2 lg:justify-start">
              <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="truncate">
                {stadium.name}, {stadium.city}
              </span>
            </div>
          )}
        </dl>

        <div className="flex w-full flex-wrap justify-center gap-2 lg:w-auto lg:justify-end">
          <Link
            href={`/match/${match.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Fiche match
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/pronostic-match/${match.slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            Pronostic
          </Link>
        </div>
      </div>
    </article>
  );
}

function MatchDaySection({
  date,
  cards,
  showRound = false,
}: {
  date: string;
  cards: MatchCardModel[];
  showRound?: boolean;
}) {
  const { weekday, fullDate } = formatDayHeader(date);
  const roundSummary = Array.from(
    new Set(
      cards
        .map((card) => ROUND_CONFIGS[card.match.stage as KnockoutStage])
        .filter(Boolean)
        .map((round) => round.shortTitle),
    ),
  ).join(" · ");

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 bg-primary px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="rounded bg-white/15 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide">
            {weekday}
          </span>
          <h3 className="truncate text-base font-extrabold">{fullDate}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/80">
          {roundSummary && !showRound && <span>{roundSummary}</span>}
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-white">
            {cards.length} match{cards.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {cards.map(({ match, teams }) => (
          <MatchRow
            key={match.id}
            match={match}
            teams={teams}
          />
        ))}
      </div>
    </section>
  );
}

function MatchDayList({
  matchCards,
  showRound = false,
}: {
  matchCards: MatchCardModel[];
  showRound?: boolean;
}) {
  const groups = groupCardsByDate(matchCards);

  return (
    <div className="space-y-6">
      {groups.map(({ date, cards }) => (
        <MatchDaySection
          key={date}
          date={date}
          cards={cards}
          showRound={showRound}
        />
      ))}
    </div>
  );
}

function RoundNav({ config }: { config: RoundConfig }) {
  const previous = config.previous ? ROUND_CONFIGS[config.previous] : undefined;
  const next = config.next ? ROUND_CONFIGS[config.next] : undefined;

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Navigation phase finale">
      <Link
        href="/phase-finale"
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:bg-primary/5"
      >
        Phase finale
      </Link>
      {previous && (
        <Link
          href={previous.href}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:bg-primary/5"
        >
          <ChevronLeft className="h-4 w-4" />
          {previous.shortTitle}
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:bg-primary/5"
        >
          {next.shortTitle}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
      <Link
        href="/match/calendrier"
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:bg-primary/5"
      >
        Calendrier
      </Link>
      <Link
        href="/pronostic/vainqueur"
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:bg-primary/5"
      >
        Pronostic vainqueur
      </Link>
      <Link
        href="/tableau"
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:bg-primary/5"
      >
        Tableau pronostic
      </Link>
    </nav>
  );
}

export async function OfficialKnockoutRoundPage({
  stage,
}: {
  stage: MainKnockoutStage;
}) {
  const config = ROUND_CONFIGS[stage];
  const sourceMatches = await getOfficialKnockoutMatches();
  const stageMatches = roundMatches(sourceMatches, stage);
  const matchCards = await resolveMatchCards(stageMatches, sourceMatches);

  return (
    <>
      <section className="hero-animated text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase text-accent">
            <Trophy className="h-4 w-4" />
            {config.eyebrow}
          </div>
          <h1 className="max-w-4xl text-3xl font-extrabold sm:text-5xl">
            {config.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg">
            {config.description}
          </p>
          <div className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="text-2xl font-black text-accent">{config.matchCount}</p>
              <p className="text-sm text-gray-200">matchs</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="text-2xl font-black text-accent">{config.teamCount}</p>
              <p className="text-sm text-gray-200">équipes</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <p className="text-lg font-black text-accent">{config.dateLabel}</p>
              <p className="text-sm text-gray-200">calendrier</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <RoundNav config={config} />
        </div>

        <section aria-labelledby="matchs-du-tour">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 id="matchs-du-tour" className="text-2xl font-bold text-gray-900">
                Matchs et résultats
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Données actualisées automatiquement toutes les 5 minutes.
              </p>
            </div>
            <Link
              href="/phase-finale"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
            >
              Voir toute la phase finale
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <MatchDayList matchCards={matchCards} showRound />
        </section>

        <section className="mt-10">
          <PmuBanner
            tracking={{
              pageType: "phase-finale",
              slug: config.slug,
              placement: "banner",
            }}
          />
        </section>

        {config.faqItems.length > 0 && (
          <section className="mt-12">
            <FAQSection items={config.faqItems} />
          </section>
        )}
      </main>
    </>
  );
}

export async function OfficialKnockoutOverview() {
  const sourceMatches = await getOfficialKnockoutMatches();
  const rounds = await Promise.all(
    OVERVIEW_ROUNDS.map(async (stage) => {
      const config = ROUND_CONFIGS[stage];
      const stageMatches = roundMatches(sourceMatches, stage);
      return {
        stage,
        config,
        matchCards: await resolveMatchCards(stageMatches, sourceMatches),
      };
    }),
  );
  const allMatchCards = rounds.flatMap(({ matchCards }) => matchCards);

  return (
    <>
      <section className="hero-animated text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase text-accent">
            <Trophy className="h-4 w-4" />
            Résultats officiels
          </div>
          <h1 className="max-w-4xl text-3xl font-extrabold sm:text-5xl">
            Phase finale CDM 2026
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg">
            Tous les matchs à élimination directe : 16es, 8es, quarts,
            demi-finales, match pour la 3e place et finale. Cette page suit les
            vrais résultats ; le tableau de projection reste disponible sur la
            page pronostic.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tableau"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-primary hover:bg-accent/90"
            >
              Tableau pronostic
              <BarChart3 className="h-4 w-4" />
            </Link>
            <Link
              href="/match/calendrier"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/15"
            >
              Calendrier complet
              <CalendarDays className="h-4 w-4" />
            </Link>
            <Link
              href="/pronostic/vainqueur"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/15"
            >
              Pronostic vainqueur
              <Trophy className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section aria-labelledby="tours-phase-finale">
          <h2 id="tours-phase-finale" className="text-2xl font-bold text-gray-900">
            Tours de phase finale
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {MAIN_ROUNDS.map((stage) => {
              const config = ROUND_CONFIGS[stage];
              return (
                <Link
                  key={stage}
                  href={config.href}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <p className="font-bold text-gray-900">{config.shortTitle}</p>
                  <p className="mt-1 text-sm text-gray-500">{config.dateLabel}</p>
                  <p className="mt-3 text-sm font-semibold text-primary">
                    {config.matchCount} match{config.matchCount > 1 ? "s" : ""}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section
          className="mt-10"
          aria-labelledby="calendrier-phase-finale"
        >
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                Calendrier officiel
              </p>
              <h2
                id="calendrier-phase-finale"
                className="mt-1 text-2xl font-bold text-gray-900"
              >
                Matchs de phase finale
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-600">
                Les affiches sont regroupées par journée, avec les gros drapeaux
                pour identifier vite les équipes et le score ou l'heure au centre.
              </p>
            </div>
            <Link
              href="/match/calendrier"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
            >
              Calendrier complet
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <MatchDayList matchCards={allMatchCards} />
        </section>

        <section
          className="mt-10 rounded-lg border border-primary/15 bg-primary/5 p-5 sm:p-6"
          aria-labelledby="pronostics-cotes-phase-finale"
        >
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                Pronostics et cotes
              </p>
              <h2
                id="pronostics-cotes-phase-finale"
                className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl"
              >
                Croiser les resultats avec les favoris du Mondial
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                La phase finale officielle montre les vrais matchs et scores.
                Pour preparer un pari, comparez ensuite le tableau pronostic,
                les cotes vainqueur et les pages equipe avant chaque affiche.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Link
                href="/tableau"
                className="rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-primary hover:border-primary hover:bg-primary hover:text-white"
              >
                Tableau pronostic
              </Link>
              <Link
                href="/cote-champion/france"
                className="rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-primary hover:border-primary hover:bg-primary hover:text-white"
              >
                Cote France
              </Link>
              <Link
                href="/cote-champion/portugal"
                className="rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-primary hover:border-primary hover:bg-primary hover:text-white"
              >
                Cote Portugal
              </Link>
              <Link
                href="/pronostic/vainqueur"
                className="rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-primary hover:border-primary hover:bg-primary hover:text-white"
              >
                Pronostic vainqueur
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <PmuBanner
            tracking={{
              pageType: "phase-finale",
              slug: "index",
              placement: "banner",
            }}
          />
        </section>
      </main>
    </>
  );
}
