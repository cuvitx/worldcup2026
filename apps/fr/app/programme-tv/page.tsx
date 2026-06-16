import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { getTVInfo } from "@repo/data/tv-schedule";
import { stageLabels } from "@repo/data/constants";
import { domains } from "@repo/data/route-mapping";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Programme TV Coupe du Monde 2026 — Calendrier des diffusions",
  description:
    "Programme TV complet de la Coupe du Monde 2026 : chaînes, horaires et streaming pour tous les matchs. TF1, beIN Sports, M6 — ne manquez aucun match.",
  alternates: { canonical: `${domains.fr}/programme-tv` },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const channelColors: Record<string, string> = {
  TF1: "bg-blue-600 text-white",
  M6: "bg-orange-500 text-white",
  "beIN Sports": "bg-red-800 text-white",
};

const defaultChannelColor = "bg-gray-600 text-white";

/** French day/month formatter for "Mercredi 11 juin 2026" style. */
function formatDateFR(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
}

/** Capitalise the first letter (for French day names). */
function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Get a team display name + flag, or a TBD placeholder. */
function teamLabel(teamId: string): { name: string; flag: string } {
  const team = teamsById[teamId];
  if (team) return { name: team.name, flag: team.flag };
  // Knockout-stage TBD placeholders
  return { name: "\u00c0 d\u00e9terminer", flag: "" };
}

/** Stage display name (with group letter if applicable). */
function stageDisplay(match: (typeof matches)[number]): string {
  const label = stageLabels[match.stage] ?? match.stage;
  if (match.group) return `${label} — Gr. ${match.group}`;
  return label;
}

// ---------------------------------------------------------------------------
// Group matches by date
// ---------------------------------------------------------------------------

type MatchesByDate = { date: string; label: string; matches: typeof matches }[];

function groupByDate(): MatchesByDate {
  const map = new Map<string, typeof matches>();
  for (const m of matches) {
    if (!map.has(m.date)) map.set(m.date, []);
    map.get(m.date)!.push(m);
  }
  const groups: MatchesByDate = [];
  for (const [date, ms] of map) {
    groups.push({
      date,
      label: capitalise(formatDateFR(date)),
      matches: ms.sort((a, b) => a.time.localeCompare(b.time)),
    });
  }
  groups.sort((a, b) => a.date.localeCompare(b.date));
  return groups;
}

// ---------------------------------------------------------------------------
// JSON-LD BroadcastEvent for next 5 upcoming matches
// ---------------------------------------------------------------------------

function buildBroadcastEventsJsonLd() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = matches
    .filter((m) => m.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 5);

  return upcoming.map((m) => {
    const home = teamLabel(m.homeTeamId);
    const away = teamLabel(m.awayTeamId);
    const tv = getTVInfo(m.slug);
    return {
      "@context": "https://schema.org",
      "@type": "BroadcastEvent",
      name: `${home.name} vs ${away.name} — Coupe du Monde 2026`,
      startDate: `${m.date}T${m.time}:00+02:00`,
      isLiveBroadcast: true,
      videoFormat: "HD",
      broadcastOfEvent: {
        "@type": "SportsEvent",
        name: `${home.name} vs ${away.name}`,
        startDate: `${m.date}T${m.time}:00+02:00`,
        location: {
          "@type": "Place",
          name: m.stadiumId,
        },
        competitor: [
          { "@type": "SportsTeam", name: home.name },
          { "@type": "SportsTeam", name: away.name },
        ],
      },
      publishedOn: tv.channels.map((ch) => ({
        "@type": "BroadcastService",
        name: ch,
        broadcastDisplayName: ch,
      })),
    };
  });
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ProgrammeTVPage() {
  const dateGroups = groupByDate();
  const broadcastEvents = buildBroadcastEventsJsonLd();

  return (
    <>
      {/* JSON-LD: BroadcastEvent for next 5 upcoming matches */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(broadcastEvents),
        }}
      />

      {/* ===== Hero ===== */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Programme TV — Coupe du Monde 2026
          </h1>
          <p className="mt-3 max-w-2xl text-gray-300 text-sm sm:text-base leading-relaxed">
            Retrouvez le programme TV complet de la Coupe du Monde 2026 avec
            les horaires (heure de Paris), les cha{"î"}nes de diffusion et les
            plateformes de streaming pour chacun des 104 matchs. TF1, M6 et
            beIN Sports se partagent les droits de diffusion en France.
          </p>
        </div>
      </section>

      {/* ===== Match schedule by date ===== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Legend */}
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-semibold text-gray-700">L{"\u00e9"}gende :</span>
          {Object.entries(channelColors).map(([ch, cls]) => (
            <span key={ch} className={`inline-flex items-center px-2.5 py-1 rounded-full font-semibold ${cls}`}>
              {ch}
            </span>
          ))}
        </div>

        {dateGroups.map((group) => (
          <section key={group.date} className="mb-10">
            {/* Date header */}
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-primary pb-2">
              {group.label}
            </h2>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-2">
              <table className="w-full text-sm bg-white">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 w-20">Heure</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Match</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 w-40">Phase</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 w-48">Cha{"\u00ee"}nes TV</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 w-44">Streaming</th>
                  </tr>
                </thead>
                <tbody>
                  {group.matches.map((m) => {
                    const home = teamLabel(m.homeTeamId);
                    const away = teamLabel(m.awayTeamId);
                    const tv = getTVInfo(m.slug);
                    const isFrance =
                      m.homeTeamId === "france" || m.awayTeamId === "france";

                    return (
                      <tr
                        key={m.id}
                        className={`border-t border-gray-100 ${
                          isFrance
                            ? "bg-blue-50/60 hover:bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {/* Time */}
                        <td className="px-4 py-3 font-extrabold text-primary whitespace-nowrap">
                          {m.time}
                        </td>

                        {/* Match */}
                        <td className="px-4 py-3">
                          <Link
                            href={`/match/${m.slug}`}
                            className="inline-flex items-center gap-1.5 font-semibold text-gray-900 hover:text-primary transition-colors"
                          >
                            <span>{home.flag}</span>
                            <span>{home.name}</span>
                            <span className="text-gray-400 mx-1">-</span>
                            <span>{away.name}</span>
                            <span>{away.flag}</span>
                          </Link>
                        </td>

                        {/* Stage */}
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                          {stageDisplay(m)}
                        </td>

                        {/* TV Channels */}
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1.5">
                            {tv.channels.map((ch) => (
                              <span
                                key={ch}
                                className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                  channelColors[ch] ?? defaultChannelColor
                                }`}
                              >
                                {ch}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Streaming */}
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1.5">
                            {tv.streaming.map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {group.matches.map((m) => {
                const home = teamLabel(m.homeTeamId);
                const away = teamLabel(m.awayTeamId);
                const tv = getTVInfo(m.slug);
                const isFrance =
                  m.homeTeamId === "france" || m.awayTeamId === "france";

                return (
                  <div
                    key={m.id}
                    className={`rounded-xl border p-4 ${
                      isFrance
                        ? "bg-blue-50/60 border-blue-200"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {stageDisplay(m)}
                      </span>
                      <span className="text-lg font-extrabold text-primary shrink-0">
                        {m.time}
                      </span>
                    </div>

                    <Link
                      href={`/match/${m.slug}`}
                      className="block font-bold text-gray-900 text-sm mb-2 hover:text-primary transition-colors"
                    >
                      {home.flag} {home.name} - {away.name} {away.flag}
                    </Link>

                    {/* Channels */}
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {tv.channels.map((ch) => (
                        <span
                          key={ch}
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            channelColors[ch] ?? defaultChannelColor
                          }`}
                        >
                          {ch}
                        </span>
                      ))}
                    </div>

                    {/* Streaming */}
                    <div className="flex flex-wrap gap-1.5">
                      {tv.streaming.map((s) => (
                        <span
                          key={s}
                          className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Footer note */}
        <p className="text-xs text-gray-400 mt-4 italic">
          * Programme indicatif, sous r{"\u00e9"}serve de modifications. Horaires en
          heure fran{"\u00e7"}aise (CEST, UTC+2). Les matchs de la France sont diffus{"\u00e9"}s
          en clair sur TF1.
        </p>
      </div>

      {/* ===== SEO text ===== */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 prose prose-sm text-gray-600">
          <h2 className="text-xl font-bold text-gray-900">
            Comment suivre la Coupe du Monde 2026 {"\u00e0"} la t{"\u00e9"}l{"\u00e9"}vision ?
          </h2>
          <p>
            En France, les droits TV de la Coupe du Monde 2026 sont partag{"\u00e9"}s
            entre <strong>TF1</strong>, <strong>M6</strong> et{" "}
            <strong>beIN Sports</strong>. TF1 diffuse tous les matchs de
            l&apos;{"\u00e9"}quipe de France ainsi que le match d&apos;ouverture et la finale.
            M6 propose une s{"\u00e9"}lection de matchs {"\u00e0"} forte affiche (Br{"\u00e9"}sil, Argentine,
            Espagne, Angleterre). beIN Sports assure la couverture int{"\u00e9"}grale des
            104 matchs du tournoi.
          </p>
          <p>
            En streaming, les matchs en clair sont disponibles gratuitement sur{" "}
            <strong>MYTF1</strong> et <strong>6play</strong>. L&apos;int{"\u00e9"}gralit{"\u00e9"} du
            tournoi est accessible sur <strong>beIN CONNECT</strong>, la
            plateforme de streaming de beIN Sports.
          </p>
          <p>
            <Link href="/ou-regarder" className="text-primary font-semibold hover:underline">
              Consulter le guide complet &quot;O{"\u00f9"} regarder la CDM 2026&quot;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
