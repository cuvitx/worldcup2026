import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";

export const revalidate = 3600;

// ============================================================
//  Tournament dates: June 11 (day 1) to July 19 (day 39)
// ============================================================
const TOURNAMENT_START = new Date("2026-06-11");
const TOTAL_DAYS = 39;

function dayNumberToDate(n: number): string {
  const d = new Date(TOURNAMENT_START);
  d.setDate(d.getDate() + (n - 1));
  return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function dateToFrench(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function utcToFrParis(time: string): string {
  // time is "HH:MM" UTC, tournament is June-July → CEST = UTC+2
  const [h, m] = time.split(":").map(Number);
  const frH = ((h ?? 0) + 2) % 24;
  return `${String(frH).padStart(2, "0")}h${String(m ?? 0).padStart(2, "0")}`;
}

function stageLabel(stage: string, group?: string): string {
  const labels: Record<string, string> = {
    group: `Phase de groupes${group ? ` — Groupe ${group}` : ""}`,
    "round-of-32": "Huitièmes de finale",
    "round-of-16": "8es de finale",
    "quarter-final": "Quarts de finale",
    "semi-final": "Demi-finales",
    "third-place": "Match pour la 3e place",
    final: "FINALE",
  };
  return labels[stage] ?? stage;
}

function stageBadgeClass(stage: string): string {
  if (stage === "final") return "bg-secondary/20 text-secondary font-bold";
  if (stage === "semi-final") return "bg-primary/20 text-primary font-semibold";
  if (stage === "quarter-final") return "bg-primary/20 text-primary";
  if (stage === "round-of-16" || stage === "round-of-32") return "bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary";
  return "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300";
}

// ============================================================
//  Static params: generate pages for jour-1 to jour-39
// ============================================================
export async function generateStaticParams() {
  return Array.from({ length: TOTAL_DAYS }, (_, i) => ({
    n: String(i + 1),
  }));
}

// ============================================================
//  Metadata
// ============================================================
interface PageProps {
  params: Promise<{ n: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { n } = await params;
  const dayNum = parseInt(n, 10);
  if (isNaN(dayNum) || dayNum < 1 || dayNum > TOTAL_DAYS) return {};

  const dateStr = dayNumberToDate(dayNum);
  const dateFr = dateToFrench(dateStr);
  const dayMatches = matches.filter((m) => m.date === dateStr);

  return {
    title: `Jour ${dayNum} — ${dateFr} | Matchs CDM 2026`,
    description: `Programme du jour ${dayNum} de la Coupe du Monde 2026 (${dateFr}) : ${dayMatches.length} match${dayMatches.length > 1 ? "s" : ""} au programme. Horaires, stades et équipes.`,
    openGraph: {
      title: `CDM 2026 — Jour ${dayNum} : ${dateFr}`,
      description: `${dayMatches.length} match${dayMatches.length > 1 ? "s" : ""} ce jour-là. Tous les horaires et stades.`,
    },
    alternates: {
      canonical: `${domains.fr}/calendrier/jour-${dayNum}`,
    },
  };
}

// ============================================================
//  FAQ items (static — same for all day pages)
// ============================================================
const faqCalendrierItems = [
  {
    question: "Quand débute et se termine la Coupe du Monde 2026 ?",
    answer:
      "La Coupe du Monde 2026 commence le 11 juin 2026 avec le match d'ouverture à l'Estadio Azteca de Mexico. La grande finale est prévue le 19 juillet 2026 au MetLife Stadium de New York/New Jersey, soit 39 jours de compétition au total.",
  },
  {
    question: "Combien de matchs au total à la CDM 2026 ?",
    answer:
      "La Coupe du Monde 2026 compte 104 matchs au total : 72 matchs de phase de groupes (12 groupes × 6 matchs), puis 32 matchs de phase finale (16 huitièmes + 8 quarts + 4 demi-finales + 1 match pour la 3e place + 1 finale). C'est 24 matchs de plus qu'en 2022.",
  },
  {
    question: "Dans quel fuseau horaire sont affichés les horaires des matchs ?",
    answer:
      "Les horaires sur ce site sont affichés en heure de Paris (CEST, UTC+2 en été). Les matchs se jouent en heure locale américaine (EDT = UTC-4, CDT = UTC-5, PDT = UTC-7), soit généralement en soirée française (entre 18h et 3h du matin selon le fuseau de la ville hôte).",
  },
];

// ============================================================
//  Page component
// ============================================================
export default async function JourPage({ params }: PageProps) {
  const { n } = await params;
  const dayNum = parseInt(n, 10);

  if (isNaN(dayNum) || dayNum < 1 || dayNum > TOTAL_DAYS) {
    notFound();
  }

  const dateStr = dayNumberToDate(dayNum);
  const dateFr = dateToFrench(dateStr);

  // Matches for this day
  const dayMatches = matches
    .filter((m) => m.date === dateStr)
    .sort((a, b) => a.time.localeCompare(b.time));

  const hasPrev = dayNum > 1;
  const hasNext = dayNum < TOTAL_DAYS;

  return (
    <>
      {/* Structured data */}
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Calendrier", url: "/match/calendrier" },
          { name: `Jour ${dayNum}`, url: `/calendrier/jour-${dayNum}` },
        ]}
        baseUrl={domains.fr}
      />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/match/calendrier" className="hover:text-primary">
                Calendrier
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">
              Jour {dayNum}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-white/70 uppercase tracking-widest mb-1">
                Coupe du Monde 2026
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold">
                Jour {dayNum}
              </h1>
              <p className="mt-2 text-lg text-white/90 capitalize">{dateFr}</p>
              <p className="mt-1 text-sm text-white/60">
                {dayMatches.length > 0
                  ? `${dayMatches.length} match${dayMatches.length > 1 ? "s" : ""} au programme`
                  : "Pas de match prévu ce jour"}
              </p>
            </div>

            {/* Day counter badge */}
            <div className="flex items-center gap-3 sm:text-right">
              <div className="rounded-2xl bg-white/10 px-5 py-3 text-center">
                <p className="text-3xl font-extrabold">{dayNum}</p>
                <p className="text-xs text-white/70">/ {TOTAL_DAYS} jours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Navigation prev/next */}
        <div className="flex items-center justify-between mb-8 gap-4">
          {hasPrev ? (
            <Link
              href={`/calendrier/jour-${dayNum - 1}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors dark:text-gray-200"
            >
              ← Jour {dayNum - 1}
            </Link>
          ) : (
            <div />
          )}
          <span className="text-sm text-gray-500 dark:text-gray-300">
            Jour {dayNum} / {TOTAL_DAYS}
          </span>
          {hasNext ? (
            <Link
              href={`/calendrier/jour-${dayNum + 1}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors dark:text-gray-200"
            >
              Jour {dayNum + 1} →
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Matches list */}
        {dayMatches.length === 0 ? (
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
            <p className="text-4xl mb-4">⚽</p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Journée sans match
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Aucun match n'est programmé ce {dateFr}.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              {hasPrev && (
                <Link
                  href={`/calendrier/jour-${dayNum - 1}`}
                  className="rounded-lg bg-primary/10 px-4 py-2 text-sm text-primary font-medium hover:bg-primary/20"
                >
                  ← Jour précédent
                </Link>
              )}
              {hasNext && (
                <Link
                  href={`/calendrier/jour-${dayNum + 1}`}
                  className="rounded-lg bg-primary px-4 py-2 text-sm text-white font-medium hover:bg-primary/90"
                >
                  Jour suivant →
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {dayMatches.map((match) => {
              const homeTeam = teamsById[match.homeTeamId];
              const awayTeam = teamsById[match.awayTeamId];
              const stadium = stadiumsById[match.stadiumId];
              const frTime = utcToFrParis(match.time);
              const stageLbl = stageLabel(match.stage, match.group);
              const badgeClass = stageBadgeClass(match.stage);
              const isFinal = match.stage === "final";

              return (
                <Link
                  key={match.id}
                  href={`/match/${match.slug}`}
                  className={`block rounded-xl border bg-white dark:bg-slate-800 shadow-sm transition-all hover:shadow-md hover:border-primary/50 ${
                    isFinal
                      ? "border-secondary/40 ring-2 ring-gold/20"
                      : "border-gray-200 dark:border-slate-700"
                  }`}
                >
                  <div className="p-5">
                    {/* Stage badge */}
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs ${badgeClass}`}>
                        {stageLbl}
                      </span>
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                          <span>🕐</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{frTime} (heure FR)</span>
                          <span className="text-xs text-gray-400">| {match.time} UTC</span>
                        </span>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-center gap-4 sm:gap-8">
                      {/* Home team */}
                      <div className="flex flex-col items-center gap-2 text-center flex-1">
                        <span className="text-4xl sm:text-5xl" role="img" aria-label={homeTeam?.name ?? "Équipe locale"}>
                          {homeTeam?.flag ?? "🏳️"}
                        </span>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                            {homeTeam?.name ?? match.homeTeamId}
                          </p>
                          {homeTeam && (
                            <p className="text-xs text-gray-500 dark:text-gray-300">{homeTeam.code}</p>
                          )}
                        </div>
                      </div>

                      {/* VS */}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <span className="text-xl font-extrabold text-gray-400 dark:text-gray-400">VS</span>
                        {isFinal && (
                          <span className="text-xs font-bold text-secondary">🏆 FINALE</span>
                        )}
                      </div>

                      {/* Away team */}
                      <div className="flex flex-col items-center gap-2 text-center flex-1">
                        <span className="text-4xl sm:text-5xl" role="img" aria-label={awayTeam?.name ?? "Équipe visiteur"}>
                          {awayTeam?.flag ?? "🏳️"}
                        </span>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                            {awayTeam?.name ?? match.awayTeamId}
                          </p>
                          {awayTeam && (
                            <p className="text-xs text-gray-500 dark:text-gray-300">{awayTeam.code}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stadium info */}
                    {stadium && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                          <span>🏟️</span>
                          <span>{stadium.name}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📍</span>
                          <span>{stadium.city}, {stadium.country}</span>
                        </span>
                        {stadium.capacity && (
                          <span className="flex items-center gap-1">
                            <span>👥</span>
                            <span>{stadium.capacity.toLocaleString("fr-FR")} places</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Navigation bottom */}
        <div className="mt-10 flex items-center justify-between gap-4">
          {hasPrev ? (
            <Link
              href={`/calendrier/jour-${dayNum - 1}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors dark:text-gray-200"
            >
              ← Jour {dayNum - 1}
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/match/calendrier"
            className="rounded-lg bg-gray-100 dark:bg-slate-700 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            Calendrier complet
          </Link>
          {hasNext ? (
            <Link
              href={`/calendrier/jour-${dayNum + 1}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors dark:text-gray-200"
            >
              Jour {dayNum + 1} →
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Quick jump: all days */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-lg dark:">Navigation rapide</h2>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: TOTAL_DAYS }, (_, i) => {
              const d = i + 1;
              const isActive = d === dayNum;
              // Count matches that day for visual feedback
              const dDate = dayNumberToDate(d);
              const cnt = matches.filter((m) => m.date === dDate).length;
              return (
                <Link
                  key={d}
                  href={`/calendrier/jour-${d}`}
                  title={`Jour ${d} — ${cnt} match${cnt !== 1 ? "s" : ""}`}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : cnt > 0
                      ? "bg-gray-100 dark:bg-slate-700 hover:bg-primary/20 text-gray-700 dark:text-gray-200"
                      : "bg-gray-50 dark:bg-slate-700/50 text-gray-400 dark:text-gray-400 cursor-default"
                  }`}
                >
                  {d}
                  {cnt > 0 && !isActive && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-gray-400 dark:text-gray-400">
            Les points verts indiquent les journées avec des matchs.
          </p>
        </div>
      </div>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: `Coupe du Monde 2026 — Jour ${dayNum}`,
            startDate: dateStr,
            endDate: dateStr,
            location: {
              "@type": "Place",
              name: "USA / Mexico / Canada",
            },
            organizer: {
              "@type": "Organization",
              name: "FIFA",
            },
            url: `${domains.fr}/calendrier/jour-${dayNum}`,
            description: `Programme du jour ${dayNum} de la Coupe du Monde 2026 : ${dayMatches.length} match(s).`,
          }),
        }}
      />
    </>
  );
}
