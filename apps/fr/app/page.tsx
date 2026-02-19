import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { stadiumsById } from "@repo/data/stadiums";
import { getHomeAlternates } from "@repo/data/route-mapping";
import { predictionsByTeamId, matchPredictionByPair } from "@repo/data/predictions";
import { estimatedMatchOdds } from "@repo/data/affiliates";
import { TeamCard } from "./components/TeamCard";
import { Countdown } from "./components/Countdown";
import { MatchCard } from "./components/MatchCard";

export const metadata: Metadata = {
  title: "Coupe du Monde 2026 | Pronostics, Cotes & Guide Complet",
  description:
    "Guide complet de la Coupe du Monde 2026 : pronostics, cotes des bookmakers, analyses des 48 équipes, calendrier des 104 matchs. Tout pour parier sur la CDM 2026.",
  alternates: getHomeAlternates(),
  openGraph: {
    title: "Coupe du Monde 2026 | Pronostics, Cotes & Guide Complet",
    description:
      "Pronostics, cotes, analyses des 48 équipes et calendrier des 104 matchs de la CDM 2026.",
    url: "https://cdm2026.fr",
  },
};

const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CDM 2026 - Coupe du Monde",
    url: "https://cdm2026.fr",
    description:
      "Guide complet de la Coupe du Monde 2026 : pronostics, cotes, analyses des 48 équipes.",
    inLanguage: "fr",
  },
  {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "Coupe du Monde FIFA 2026",
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    location: {
      "@type": "Place",
      name: "États-Unis, Canada, Mexique",
    },
    sport: "Football",
    description: "Première Coupe du Monde FIFA à 48 équipes. 104 matchs dans 16 stades.",
  },
];

// Top matches for "Pronostics populaires"
const HOT_MATCHES = [
  "france-maroc",
  "bresil-argentine",
  "espagne-angleterre",
  "allemagne-portugal",
];

export default function HomePage() {
  // Upcoming matches (first 8)
  const upcomingMatches = matches
    .filter((m) => new Date(`${m.date}T${m.time ?? "00:00"}Z`) >= new Date())
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time ?? "00:00"}Z`).getTime() -
        new Date(`${b.date}T${b.time ?? "00:00"}Z`).getTime()
    )
    .slice(0, 8);

  // Featured hot matches (pronostic-match slugs)
  const hotMatches = matches
    .filter((m) => HOT_MATCHES.includes(m.slug))
    .slice(0, 6);

  // Fallback: take first 6 upcoming if no hot matches found
  const featuredMatches =
    hotMatches.length > 0 ? hotMatches : upcomingMatches.slice(0, 6);

  // Top 10 FIFA teams
  const topTeams = teams
    .filter((t) => t.fifaRanking > 0 && t.fifaRanking <= 10)
    .sort((a, b) => a.fifaRanking - b.fifaRanking);

  // Quick nav items
  const quickNav = [
    { href: "/simulateur", icon: "🏆", label: "Simulateur", desc: "Créez votre bracket" },
    { href: "/quiz", icon: "🧩", label: "Quiz", desc: "Testez vos connaissances" },
    { href: "/comparateur-cotes", icon: "📊", label: "Comparateur", desc: "Meilleures cotes" },
    { href: "/live", icon: "⚡", label: "Live", desc: "Scores en direct" },
    { href: "/match/calendrier", icon: "📅", label: "Calendrier", desc: "104 matchs" },
    { href: "/buteurs", icon: "⚽", label: "Buteurs", desc: "Cotes meilleurs buteurs" },
    { href: "/joueurs", icon: "🌟", label: "Joueurs", desc: "Les stars de la CDM" },
    { href: "/paris-sportifs", icon: "💰", label: "Paris", desc: "Guide paris CDM 2026" },
  ];

  return (
    <>
      {homepageJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ================================================================
          HERO — Cinematic with animated gradient
          ================================================================ */}
      <section className="hero-animated py-16 md:py-24 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur-sm">
            <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-gold" />
            Coupe du Monde 2026 · 11 juin – 19 juillet
          </div>

          <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl drop-shadow-lg">
            <span className="gradient-text">CDM 2026</span>
          </h1>

          <p className="mx-auto mb-2 max-w-xl text-base text-gray-300/90 leading-relaxed md:text-lg">
            Pronostics, cotes &amp; guide complet
          </p>
          <p className="mx-auto mb-8 max-w-2xl text-sm text-gray-400/80 leading-relaxed">
            48 équipes · 104 matchs · 16 stades · États-Unis, Canada, Mexique
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/match/calendrier"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3 font-semibold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              📅 Calendrier
            </Link>
            <Link
              href="/simulateur"
              className="inline-flex items-center justify-center rounded-lg border border-gold/30 bg-gold/10 px-7 py-3 font-semibold text-gold backdrop-blur-sm hover:bg-gold/20 hover:-translate-y-0.5"
            >
              🏆 Simulateur
            </Link>
            <Link
              href="/groupe/a"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/8 px-7 py-3 font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:-translate-y-0.5"
            >
              Voir les groupes
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          COUNTDOWN — Cinematic
          ================================================================ */}
      <Countdown />

      {/* ================================================================
          STATS RAPIDES
          ================================================================ */}
      <section className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-800 sm:grid-cols-4 md:grid-cols-8">
            {[
              { value: "48", label: "Équipes", icon: "🌍" },
              { value: "104", label: "Matchs", icon: "⚽" },
              { value: "16", label: "Stades", icon: "🏟️" },
              { value: "3", label: "Pays", icon: "🌎" },
              { value: "32", label: "Jours", icon: "📅" },
              { value: "80K+", label: "Places/match", icon: "👥" },
              { value: "210", label: "Nations qualifiées", icon: "🏳️" },
              { value: "1954", label: "Depuis", icon: "🏆" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-4 px-2 text-center">
                <span className="text-xl mb-1">{stat.icon}</span>
                <p className="text-xl font-extrabold text-primary dark:text-white leading-none">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          MATCHS À VENIR — Style FlashScore
          ================================================================ */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Prochains matchs
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Phase de groupes · CDM 2026</p>
            </div>
            <Link
              href="/match/calendrier"
              className="ml-auto text-sm font-medium text-accent hover:underline shrink-0"
            >
              Calendrier complet →
            </Link>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingMatches.map((match) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];

              // Get odds if we have a prediction
              const pred =
                home && away
                  ? matchPredictionByPair[`${home.id}:${away.id}`]
                  : undefined;
              const odds = pred
                ? estimatedMatchOdds(pred.team1WinProb, pred.drawProb, pred.team2WinProb)
                : undefined;

              return (
                <MatchCard
                  key={match.id}
                  slug={match.slug}
                  homeName={home?.name ?? match.homeTeamId}
                  homeFlag={home?.flag ?? "🏳️"}
                  awayName={away?.name ?? match.awayTeamId}
                  awayFlag={away?.flag ?? "🏳️"}
                  date={match.date}
                  time={match.time}
                  group={match.group}
                  matchday={match.matchday}
                  stage={match.stage !== "group" ? match.stage : undefined}
                  odds={odds}
                  compact
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          NAVIGATION RAPIDE — Grid avec icônes
          ================================================================ */}
      <section className="bg-white dark:bg-gray-900 py-10 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Outils &amp; Sections
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
            {quickNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-center transition-all hover:border-accent/60 hover:bg-accent/5 dark:hover:bg-accent/10 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="text-2xl mb-2 transition-transform group-hover:scale-110 duration-200">
                  {item.icon}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {item.label}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                  {item.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          GROUPES — Mini-tableaux standings
          ================================================================ */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Les 12 groupes
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Classements préliminaires</p>
            </div>
            <Link href="/groupe/a" className="ml-auto text-sm font-medium text-accent hover:underline shrink-0">
              Voir tous →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groups.map((group) => {
              const groupTeams = group.teams
                .map((id) => teamsById[id])
                .filter((t): t is NonNullable<typeof t> => t != null)
                .sort((a, b) => {
                  if (a.fifaRanking === 0) return 1;
                  if (b.fifaRanking === 0) return -1;
                  return a.fifaRanking - b.fifaRanking;
                });

              return (
                <Link
                  key={group.slug}
                  href={`/groupe/${group.slug}`}
                  className="group block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm transition-all hover:border-accent/50 hover:shadow-md hover:-translate-y-0.5"
                >
                  {/* Group header */}
                  <div className="flex items-center justify-between px-3 py-2 bg-primary dark:bg-gray-900 text-white">
                    <span className="text-sm font-bold">Groupe {group.letter}</span>
                    <span className="text-xs text-gray-400 group-hover:text-gold transition-colors">
                      {groupTeams.length} équipes →
                    </span>
                  </div>

                  {/* Mini standings table */}
                  <div>
                    {/* Header row */}
                    <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] px-3 py-1 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase">Équipe</span>
                      <span className="text-[10px] text-gray-400 font-semibold w-6 text-center">J</span>
                      <span className="text-[10px] text-gray-400 font-semibold w-6 text-center">V</span>
                      <span className="text-[10px] text-gray-400 font-semibold w-6 text-center">N</span>
                      <span className="text-[10px] text-gray-400 font-semibold w-6 text-center">D</span>
                      <span className="text-[10px] text-gold font-bold w-8 text-center">Pts</span>
                    </div>

                    {groupTeams.map((team, i) => (
                      <div
                        key={team.id}
                        className={`grid grid-cols-[1fr_auto_auto_auto_auto_auto] items-center px-3 py-1.5 ${
                          i < groupTeams.length - 1
                            ? "border-b border-gray-50 dark:border-gray-700/50"
                            : ""
                        } ${i < 2 ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}`}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-sm shrink-0" role="img" aria-label={team.name}>
                            {team.flag}
                          </span>
                          <span className="text-xs font-medium truncate">{team.name}</span>
                          {team.isHost && (
                            <span className="text-[9px] bg-gold/20 text-gold px-1 rounded shrink-0">H</span>
                          )}
                        </div>
                        {/* Placeholder stats — all 0 pre-tournament */}
                        <span className="text-xs w-6 text-center">0</span>
                        <span className="text-xs w-6 text-center">0</span>
                        <span className="text-xs w-6 text-center">0</span>
                        <span className="text-xs w-6 text-center">0</span>
                        <span className="text-xs w-8 text-center font-bold text-gold">0</span>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          PRONOSTICS POPULAIRES — Cards avec cotes + badges Hot/Top
          ================================================================ */}
      <section className="bg-white dark:bg-gray-900 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Pronostics populaires
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Matchs les plus attendus</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMatches.map((match, i) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              const pred =
                home && away
                  ? matchPredictionByPair[`${home.id}:${away.id}`]
                  : undefined;
              const odds = pred
                ? estimatedMatchOdds(pred.team1WinProb, pred.drawProb, pred.team2WinProb)
                : undefined;

              return (
                <MatchCard
                  key={match.id}
                  slug={match.slug}
                  homeName={home?.name ?? match.homeTeamId}
                  homeFlag={home?.flag ?? "🏳️"}
                  awayName={away?.name ?? match.awayTeamId}
                  awayFlag={away?.flag ?? "🏳️"}
                  date={match.date}
                  time={match.time}
                  group={match.group}
                  matchday={match.matchday}
                  stage={match.stage !== "group" ? match.stage : undefined}
                  odds={odds}
                  isHot={i < 2}
                  isTop={i >= 2 && i < 4}
                />
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/methodologie"
              className="text-sm font-medium text-accent hover:underline"
            >
              Notre méthodologie de pronostics →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          ÉQUIPES FAVORITES
          ================================================================ */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Top 10 FIFA
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Équipes favorites pour le titre</p>
            </div>
            <Link href="/equipes" className="ml-auto text-sm font-medium text-accent hover:underline shrink-0">
              48 équipes →
            </Link>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {topTeams.map((team) => {
              const pred = predictionsByTeamId[team.id];
              const winPct = pred ? Math.round(pred.winnerProb * 100) : null;

              return (
                <Link
                  key={team.id}
                  href={`/equipe/${team.slug}`}
                  className="group relative flex flex-col items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm text-center transition-all hover:border-accent/50 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="absolute top-2 left-2 text-[10px] font-bold bg-primary dark:bg-gray-900 text-gold rounded px-1.5 py-0.5">
                    #{team.fifaRanking}
                  </span>
                  <span
                    className="text-4xl mb-2 transition-transform group-hover:scale-110 duration-200"
                    role="img"
                    aria-label={team.name}
                  >
                    {team.flag}
                  </span>
                  <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{team.name}</p>
                  {winPct !== null && winPct > 0 && (
                    <p className="text-xs text-accent font-semibold mt-1">
                      {winPct < 1 ? "<1" : winPct}% chances titre
                    </p>
                  )}
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Groupe {team.group}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          BOOKMAKER CTA — naturel, pas intrusif
          ================================================================ */}
      <section className="bg-white dark:bg-gray-900 py-10 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-2">
              {/* Left: text */}
              <div
                className="p-8 text-white"
                style={{ background: "linear-gradient(135deg, #1a1a2e, #2d1a3e)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
                  Partenaire officiel
                </p>
                <h3 className="text-2xl font-extrabold mb-3">
                  Pariez sur la CDM 2026
                </h3>
                <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                  Obtenez jusqu&apos;à <span className="text-gold font-bold">100€ offerts</span> en freebets
                  sur votre premier pari Coupe du Monde 2026.
                </p>
                <a
                  href="https://www.betclic.fr/?utm_source=cdm2026"
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 hover:-translate-y-0.5 transition-all"
                >
                  Voir l&apos;offre Betclic →
                </a>
                <p className="mt-3 text-[11px] text-gray-500">
                  18+ · Jeu responsable · Mise max 100€
                </p>
              </div>
              {/* Right: quick odds */}
              <div className="p-8 bg-gray-50 dark:bg-gray-800 flex flex-col justify-center">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">
                  ⭐ Meilleures cotes CDM 2026
                </p>
                <div className="space-y-3">
                  {[
                    { name: "France", flag: "🇫🇷", odds: "5.50", ranking: 2 },
                    { name: "Argentine", flag: "🇦🇷", odds: "4.80", ranking: 1 },
                    { name: "Espagne", flag: "🇪🇸", odds: "6.00", ranking: 3 },
                    { name: "Brésil", flag: "🇧🇷", odds: "5.00", ranking: 5 },
                  ].map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5"
                    >
                      <span className="text-xl">{t.flag}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 flex-1">
                        {t.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">#{t.ranking} FIFA</span>
                      <span className="odds-badge">{t.odds}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] text-gray-400 dark:text-gray-500">
                  * Cotes indicatives. Vérifiez sur Betclic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          BOTTOM CTA
          ================================================================ */}
      <section className="bg-field py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-2 text-3xl font-extrabold">
            11 juin – 19 juillet 2026
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-field-light leading-relaxed">
            La première Coupe du Monde à 48 équipes. 3 pays, 16 stades, 104 matchs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/match/calendrier"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3 font-semibold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 hover:-translate-y-0.5"
            >
              📅 Calendrier
            </Link>
            <Link
              href="/stades"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 hover:-translate-y-0.5"
            >
              🏟️ Stades
            </Link>
            <Link
              href="/villes"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 hover:-translate-y-0.5"
            >
              🌆 Villes hôtes
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 hover:-translate-y-0.5"
            >
              📖 Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
