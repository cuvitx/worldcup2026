import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { stageLabels } from "@repo/data/constants";
import { getFixturesByDate, getLineup } from "@repo/api/football";
import type { ApiLineup } from "@repo/api/football";
import { notFound } from "next/navigation";
import { Users, ArrowRight, ShieldAlert, UserX, ClipboardList } from "lucide-react";

export const dynamicParams = false;
export const revalidate = 300; // 5min — lineups can appear 1h before kickoff

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeName = home?.name ?? "À déterminer";
  const awayName = away?.name ?? "À déterminer";
  const stage = stageLabels[match.stage] ?? match.stage;

  return {
    title: `Compo officielle ${homeName} - ${awayName} | ${stage} CDM 2026`,
    description: `Composition officielle de ${homeName} vs ${awayName}, ${stage} de la Coupe du Monde 2026. Titulaires, remplaçants et absents.`,
    openGraph: {
      title: `Compo ${homeName} vs ${awayName} - CDM 2026`,
      description: `Les 11 titulaires, remplaçants et absents pour ${homeName} - ${awayName}.`,
    },
    alternates: {
      canonical: `https://www.cdm2026.fr/compos-officielles/${slug}`,
    },
  };
}

// ── Position labels for 4-3-3 fallback ──
const POSITION_LABELS_433 = [
  ["Gardien"],
  ["Latéral D", "Défenseur C", "Défenseur C", "Latéral G"],
  ["Milieu", "Milieu", "Milieu"],
  ["Ailier D", "Attaquant", "Ailier G"],
];

const POS_LABELS_FR: Record<string, string> = {
  G: "Gardien",
  D: "Défenseur",
  M: "Milieu",
  F: "Attaquant",
};

/** Build formation rows from API lineup data. */
function buildFormationRows(lineup: ApiLineup): { name: string; number: number; pos: string }[][] {
  const formation = lineup.formation; // e.g. "4-3-3"
  const rowSizes = formation.split("-").map(Number);
  const players = lineup.startXI.map((p) => p.player);

  // GK is always first
  const gk = players[0];
  const outfield = players.slice(1);

  const rows: { name: string; number: number; pos: string }[][] = [];
  rows.push(gk ? [gk] : []);

  let idx = 0;
  for (const size of rowSizes) {
    rows.push(outfield.slice(idx, idx + size));
    idx += size;
  }

  return rows;
}

function FormationPitch({
  teamName,
  flag,
  lineup,
}: {
  teamName: string;
  flag?: string;
  lineup: ApiLineup | null;
}) {
  const formation = lineup?.formation ?? "4-3-3";
  const hasLineup = lineup && lineup.startXI.length > 0;

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-[#022149] text-white px-4 py-3 font-bold flex items-center gap-2">
        {flag && <span>{flag}</span>}
        {teamName} — {formation}
      </div>
      <div className="bg-gradient-to-b from-green-800 to-green-700 p-3 sm:p-4 min-h-[320px] flex flex-col justify-between gap-2 sm:gap-3">
        {hasLineup ? (
          // Real lineup from API
          buildFormationRows(lineup).map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-1 sm:gap-2">
              {row.map((player, posIdx) => (
                <div
                  key={posIdx}
                  className="bg-white/20 backdrop-blur rounded-lg px-1.5 sm:px-2 py-2 text-center min-w-[60px] sm:min-w-[70px]"
                >
                  <div className="w-8 h-8 rounded-full bg-white/90 mx-auto mb-1 flex items-center justify-center text-[#022149] text-xs font-bold">
                    {player.number}
                  </div>
                  <p className="text-white text-[10px] sm:text-xs font-semibold leading-tight truncate max-w-[70px] sm:max-w-[90px]">
                    {player.name.split(" ").pop()}
                  </p>
                  <p className="text-white/60 text-[9px]">
                    {POS_LABELS_FR[player.pos] ?? player.pos}
                  </p>
                </div>
              ))}
            </div>
          ))
        ) : (
          // Placeholder when lineup not yet available
          POSITION_LABELS_433.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-1 sm:gap-2">
              {row.map((pos, posIdx) => (
                <div
                  key={posIdx}
                  className="bg-white/20 backdrop-blur rounded-lg px-1.5 sm:px-2 py-2 text-center min-w-[60px] sm:min-w-[70px]"
                >
                  <div className="w-8 h-8 rounded-full bg-white/30 mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold">
                    ?
                  </div>
                  <p className="text-white text-[10px] leading-tight">À confirmer</p>
                  <p className="text-white/60 text-[9px]">{pos}</p>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <div className="bg-gray-50 px-4 py-2 text-center text-xs text-gray-500">
        {hasLineup
          ? `Compo officielle — ${lineup.coach?.name ? `Coach : ${lineup.coach.name}` : ""}`
          : "Composition à confirmer 1h avant le coup d'envoi"}
      </div>
    </div>
  );
}

/** Try to fetch lineups from API-Football for a given match. */
async function fetchLineupsForMatch(
  matchDate: string,
  matchTime: string,
  homeTeamName: string,
  awayTeamName: string
): Promise<{ home: ApiLineup | null; away: ApiLineup | null }> {
  try {
    const fixtures = await getFixturesByDate(matchDate);
    if (!fixtures.length) return { home: null, away: null };

    // Find the fixture matching this match by kickoff time
    const parisDate = new Date(`${matchDate}T${matchTime}:00+02:00`);
    const kickoffUTC = parisDate.toISOString().slice(0, 19);

    let fixture = fixtures.find((f) => f.fixture.date.startsWith(kickoffUTC));

    // Fallback: fuzzy match by team name
    if (!fixture) {
      fixture = fixtures.find(
        (f) =>
          f.teams.home.name.toLowerCase().includes(homeTeamName.toLowerCase().split(" ")[0] ?? "") ||
          f.teams.away.name.toLowerCase().includes(awayTeamName.toLowerCase().split(" ")[0] ?? "")
      );
    }

    if (!fixture) return { home: null, away: null };

    const lineups = await getLineup(fixture.fixture.id);
    if (!lineups.length) return { home: null, away: null };

    // Match lineups to home/away
    const homeLineup = lineups[0] ?? null;
    const awayLineup = lineups[1] ?? null;

    return { home: homeLineup, away: awayLineup };
  } catch {
    return { home: null, away: null };
  }
}

export default async function ComposOfficiellesPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeName = home?.name ?? "À déterminer";
  const awayName = away?.name ?? "À déterminer";
  const stadium = stadiumsById[match.stadiumId];
  const stage = stageLabels[match.stage] ?? match.stage;
  const dateStr = new Date(match.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Fetch real lineups from API (cached, revalidated every 5min)
  const lineups = await fetchLineupsForMatch(match.date, match.time, homeName, awayName);
  const hasLineups = !!(lineups.home || lineups.away);

  const faqItems = [
    {
      question: `Quand sera connue la compo de ${homeName} vs ${awayName} ?`,
      answer: `Les compositions officielles sont généralement annoncées 1 heure avant le coup d'envoi. Nous mettrons à jour cette page dès leur publication par la FIFA.`,
    },
    {
      question: "Combien de remplaçants sont autorisés en CDM 2026 ?",
      answer:
        "La FIFA autorise 26 joueurs dans chaque effectif, avec 15 remplaçants sur la feuille de match. Chaque équipe peut effectuer 5 remplacements (en 3 fenêtres + la mi-temps).",
    },
    {
      question: `Quel est le système de jeu habituel de ${homeName} ?`,
      answer: hasLineups
        ? `${homeName} joue en ${lineups.home?.formation ?? "4-3-3"} et ${awayName} en ${lineups.away?.formation ?? "4-3-3"} pour ce match.`
        : `Le système tactique sera confirmé avec la composition officielle. En attendant, nous affichons un 4-3-3 par défaut.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${homeName} vs ${awayName} - ${stage} CDM 2026`,
    startDate: `${match.date}T${match.time}:00+02:00`,
    location: {
      "@type": "Place",
      name: stadium?.name ?? "Stade à confirmer",
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: `Composition officielle pour ${homeName} vs ${awayName}, ${stage} de la Coupe du Monde 2026.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm text-white/60 mb-2">{stage} — {dateStr}</p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4">
            Compo officielle :{" "}
            <span className="text-accent">
              {homeName} vs {awayName}
            </span>
          </h1>
          <p className="text-white/80">
            {stadium?.name ?? "Stade à confirmer"} — {match.time} (heure de Paris)
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-10 sm:space-y-12">
        {/* Formations */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#022149] mb-4 sm:mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#00B865]" />
            {hasLineups ? "Compositions officielles" : "Compositions probables (4-3-3)"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <FormationPitch teamName={homeName} flag={home?.flag} lineup={lineups.home} />
            <FormationPitch teamName={awayName} flag={away?.flag} lineup={lineups.away} />
          </div>
        </section>

        {/* Remplaçants */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-[#00B865]" />
            Remplaçants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              { name: homeName, flag: home?.flag, lineup: lineups.home },
              { name: awayName, flag: away?.flag, lineup: lineups.away },
            ].map((team) => {
              const subs = team.lineup?.substitutes ?? [];
              return (
                <div key={team.name} className="rounded-xl border border-gray-200 p-4">
                  <h3 className="font-bold text-[#022149] mb-3">
                    {team.flag && <span className="mr-1">{team.flag}</span>}
                    {team.name}
                  </h3>
                  <div className="space-y-2">
                    {subs.length > 0
                      ? subs.map((sub, i) => (
                          <div key={i} className="flex items-center gap-3 py-1.5 border-b border-gray-100 last:border-0">
                            <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700 font-bold shrink-0">
                              {sub.player.number}
                            </span>
                            <span className="text-sm text-gray-700 truncate">{sub.player.name}</span>
                            <span className="text-xs text-gray-400 ml-auto shrink-0">{POS_LABELS_FR[sub.player.pos] ?? sub.player.pos}</span>
                          </div>
                        ))
                      : Array.from({ length: 7 }, (_, i) => (
                          <div key={i} className="flex items-center gap-3 py-1.5 border-b border-gray-100 last:border-0">
                            <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold">
                              ?
                            </span>
                            <span className="text-sm text-gray-400">Remplaçant {i + 1} — à confirmer</span>
                          </div>
                        ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Absents / Blessés */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#022149] mb-4 flex items-center gap-2">
            <UserX className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            Absents et blessés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[homeName, awayName].map((teamName) => (
              <div key={teamName} className="rounded-xl border border-gray-200 p-4">
                <h3 className="font-bold text-[#022149] mb-3">{teamName}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 py-4">
                  <ShieldAlert className="h-5 w-5" />
                  Aucun absent confirmé pour le moment
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lien vers match */}
        <section className="text-center py-8">
          <Link
            href={`/match/${slug}`}
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:opacity-90 transition"
          >
            Voir la page du match
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>

        <FAQSection title="Questions sur la composition" items={faqItems} />

        <p className="text-xs text-gray-400 text-center">
          Les paris sportifs comportent des risques. Jouez responsable. 18+ | Autorité Nationale des Jeux (ANJ) —{" "}
          <a href="https://www.joueurs-info-service.fr" className="underline" target="_blank" rel="noopener noreferrer">
            joueurs-info-service.fr
          </a>
        </p>
      </main>
    </>
  );
}
