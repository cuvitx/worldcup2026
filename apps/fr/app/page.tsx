import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { stadiums } from "@repo/data/stadiums";
import { getHomeAlternates } from "@repo/data/route-mapping";
import { predictionsByTeamId, matchPredictionByPair } from "@repo/data/predictions";
import { estimatedMatchOdds, estimatedOutrightOdds } from "@repo/data/affiliates";
import { newsArticles } from "@repo/data/news";
import { MatchCard } from "./components/MatchCard";
import { Countdown } from "./components/Countdown";
import { BetOfTheDay } from "./components/BetOfTheDay";

export const metadata: Metadata = {
  title: "Coupe du Monde 2026 | Pronostics, Cotes & Guide Complet",
  description:
    "CDM 2026 : pronostics, cotes & analyses des 48 équipes. Calendrier des 104 matchs, simulateur de bracket. Préparez vos paris — accès gratuit.",
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
    location: { "@type": "Place", name: "États-Unis, Canada, Mexique" },
    sport: "Football",
    description: "Première Coupe du Monde FIFA à 48 équipes. 104 matchs dans 16 stades.",
  },
];

const HOT_MATCHES = ["france-maroc", "bresil-argentine", "espagne-angleterre", "allemagne-portugal"];

const STADIUM_EMOJIS: Record<string, string> = { USA: "🇺🇸", Mexico: "🇲🇽", Canada: "🇨🇦" };

const categoryColors: Record<string, string> = {
  stades: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  billets: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  equipes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  paris: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  transferts: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const categoryLabels: Record<string, string> = {
  stades: "Stades", billets: "Billets", equipes: "Équipes", paris: "Paris", transferts: "Transferts",
};

export default function HomePage() {
  const upcomingMatches = matches
    .filter((m) => new Date(`${m.date}T${m.time ?? "00:00"}Z`) >= new Date())
    .sort((a, b) =>
      new Date(`${a.date}T${a.time ?? "00:00"}Z`).getTime() -
      new Date(`${b.date}T${b.time ?? "00:00"}Z`).getTime()
    )
    .slice(0, 6);

  const hotMatches = matches.filter((m) => HOT_MATCHES.includes(m.slug)).slice(0, 6);
  const featuredMatches = hotMatches.length > 0 ? hotMatches : upcomingMatches.slice(0, 6);

  const topTeams = teams
    .filter((t) => t.fifaRanking > 0 && t.fifaRanking <= 10)
    .sort((a, b) => a.fifaRanking - b.fifaRanking);

  const recentArticles = newsArticles.slice(0, 4);
  const featuredStadiums = stadiums.slice(0, 8);

  const features = [
    { href: "/simulateur", icon: "🏆", label: "Simulateur de Bracket", desc: "Créez votre tableau et simulez les phases jusqu'à la finale.", gradient: "from-blue-600 to-blue-800", badge: "Populaire" },
    { href: "/quiz", icon: "🧩", label: "Quiz Football", desc: "Testez vos connaissances sur la Coupe du Monde 2026.", gradient: "from-purple-600 to-purple-800", badge: "Fun" },
    { href: "/comparateur-cotes", icon: "📊", label: "Comparateur de Cotes", desc: "Comparez les meilleures cotes des bookmakers en temps réel.", gradient: "from-emerald-600 to-emerald-800", badge: "Exclusif" },
    { href: "/pronostic-vainqueur", icon: "🎯", label: "Pronostics Vainqueur", desc: "Nos analystes dévoilent leurs pronostics pour le titre.", gradient: "from-red-600 to-red-800", badge: "Expert" },
    { href: "/match/calendrier", icon: "📅", label: "Calendrier Complet", desc: "104 matchs, 16 stades, 48 équipes. Toutes les dates.", gradient: "from-amber-600 to-amber-800", badge: null },
    { href: "/paris-sportifs", icon: "💰", label: "Guide Paris CDM", desc: "Notre guide pour parier intelligemment sur la CDM 2026.", gradient: "from-cyan-600 to-cyan-800", badge: "Nouveau" },
  ];

  return (
    <>
      {homepageJsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* ================================================================
          HERO — Cinematic Premium
          ================================================================ */}
      <section className="hero-animated py-20 md:py-32 text-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur-sm">
            <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-gold" />
            Coupe du Monde 2026 · 11 juin – 19 juillet
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl drop-shadow-lg leading-[1.05]">
            <span className="gradient-text">CDM 2026</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/80">
              La plus grande Coupe du Monde de l&apos;Histoire
            </span>
          </h1>

          <p className="mx-auto mb-2 max-w-2xl text-base text-gray-300/90 leading-relaxed md:text-lg">
            Pronostics d&apos;experts · Cotes en temps réel · Analyses des 48 équipes
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-sm text-gray-400/80 leading-relaxed">
            🇺🇸 États-Unis · 🇨🇦 Canada · 🇲🇽 Mexique — 48 équipes · 104 matchs · 16 stades
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/pronostic-vainqueur" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent to-red-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-accent/40 hover:shadow-xl hover:shadow-accent/50 hover:-translate-y-1 transition-all duration-200 text-base">
              🎯 Voir les pronostics
            </Link>
            <Link href="/simulateur" className="inline-flex items-center justify-center rounded-xl border border-gold/40 bg-gold/10 px-8 py-3.5 font-bold text-gold backdrop-blur-sm hover:bg-gold/20 hover:-translate-y-1 transition-all duration-200 text-base">
              🏆 Simulateur
            </Link>
            <Link href="/match/calendrier" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/8 px-8 py-3.5 font-bold text-white backdrop-blur-sm hover:bg-white/15 hover:-translate-y-1 transition-all duration-200 text-base">
              📅 Calendrier
            </Link>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <Countdown />

      {/* PARI DU JOUR */}
      <section className="bg-white dark:bg-gray-900 py-10 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-gold" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              💰 Pari du jour — recommandé par nos experts
            </h2>
          </div>
          <BetOfTheDay />
        </div>
      </section>

      {/* STATS */}
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
              { value: "210", label: "Nations qualif.", icon: "🏳️" },
              { value: "1954", label: "Depuis", icon: "🏆" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-4 px-2 text-center">
                <span className="text-xl mb-1">{stat.icon}</span>
                <p className="text-xl font-extrabold text-primary dark:text-white leading-none">{stat.value}</p>
                <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ÉQUIPES FAVORITES — Top 10 avec cotes + barres de progression
          ================================================================ */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">⭐</span>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Équipes favorites</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Top 10 FIFA · Chances de remporter la Coupe du Monde 2026</p>
            </div>
            <Link href="/equipes" className="ml-auto text-sm font-semibold text-accent hover:underline shrink-0">
              Voir les 48 équipes →
            </Link>
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {topTeams.map((team, index) => {
              const pred = predictionsByTeamId[team.id];
              const winPct = pred ? Math.round(pred.winnerProb * 100) : null;
              const outrightOdds = pred ? estimatedOutrightOdds(pred.winnerProb) : null;
              const isTop3 = index < 3;

              return (
                <Link
                  key={team.id}
                  href={`/equipe/${team.slug}`}
                  className={`group relative flex flex-col items-center rounded-2xl border bg-white dark:bg-gray-800 p-5 shadow-sm text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl ${isTop3 ? "border-gold/40 hover:border-gold/70" : "border-gray-200 dark:border-gray-700 hover:border-accent/50"}`}
                >
                  <span className={`absolute top-2.5 left-2.5 text-[11px] font-extrabold rounded-md px-1.5 py-0.5 ${index === 0 ? "bg-gold text-primary" : index === 1 ? "bg-gray-300 text-gray-800" : index === 2 ? "bg-amber-700 text-white" : "bg-primary dark:bg-gray-900 text-gold"}`}>
                    #{team.fifaRanking}
                  </span>

                  <span className="text-5xl mb-3 transition-transform group-hover:scale-110 duration-200 drop-shadow-sm" role="img" aria-label={team.name}>
                    {team.flag}
                  </span>

                  <p className="font-extrabold text-sm text-gray-900 dark:text-gray-100 mb-1">{team.name}</p>

                  {winPct !== null && winPct > 0 && (
                    <div className="w-full mt-1">
                      <div className="flex justify-between text-[10px] text-gray-400 mb-0.5">
                        <span>Chances</span>
                        <span className="font-bold text-accent">{winPct < 1 ? "<1" : winPct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1">
                        <div className="bg-gradient-to-r from-accent to-red-500 h-1 rounded-full transition-all" style={{ width: `${Math.min(winPct * 4, 100)}%` }} />
                      </div>
                    </div>
                  )}

                  {outrightOdds && (
                    <div className="mt-2 px-2 py-1 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 w-full">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Cote vainqueur</span>
                      <p className="text-base font-extrabold text-gold">{outrightOdds}</p>
                    </div>
                  )}

                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">Groupe {team.group}</p>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link href="/pronostic-vainqueur" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-bold text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              🎯 Voir tous les pronostics vainqueur
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCHAINS MATCHS
          ================================================================ */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">⚽</span>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Prochains matchs</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phase de groupes · CDM 2026</p>
            </div>
            <Link href="/match/calendrier" className="ml-auto text-sm font-semibold text-accent hover:underline shrink-0">
              Calendrier complet →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingMatches.map((match) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              const pred = home && away ? matchPredictionByPair[`${home.id}:${away.id}`] : undefined;
              const odds = pred ? estimatedMatchOdds(pred.team1WinProb, pred.drawProb, pred.team2WinProb) : undefined;

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

          <div className="mt-8 text-center">
            <Link href="/match/calendrier" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-3 font-semibold text-gray-700 dark:text-gray-200 hover:border-accent/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              📅 Voir les 104 matchs
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          FONCTIONNALITÉS — Cards premium avec gradients
          ================================================================ */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-2xl">🚀</span>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Outils &amp; Fonctionnalités</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Tous les outils pour vivre la Coupe du Monde 2026 comme un expert
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group relative flex flex-col rounded-2xl overflow-hidden border border-transparent shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${feature.gradient} p-6 text-white flex-1`}>
                  {feature.badge && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                      {feature.badge}
                    </span>
                  )}
                  <div className="text-4xl mb-4 transition-transform group-hover:scale-110 duration-200">{feature.icon}</div>
                  <h3 className="text-lg font-extrabold mb-2 text-white">{feature.label}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{feature.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-bold text-white/90 group-hover:gap-2 transition-all">
                    Découvrir
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ARTICLES RÉCENTS
          ================================================================ */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">📰</span>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Actualités CDM 2026</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Les dernières infos sur la Coupe du Monde</p>
            </div>
            <Link href="/actualites" className="ml-auto text-sm font-semibold text-accent hover:underline shrink-0">
              Toutes les actus →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/actualites/${article.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200"
              >
                <div className="flex items-center justify-center h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-5xl transition-transform group-hover:scale-105 duration-300">
                  {article.imageEmoji}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className={`self-start text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 uppercase tracking-wide ${categoryColors[article.category] ?? "bg-gray-100 text-gray-600"}`}>
                    {categoryLabels[article.category] ?? article.category}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-3 font-medium">
                    {new Date(article.date + "T00:00:00Z").toLocaleDateString("fr-FR", {
                      day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PRONOSTICS POPULAIRES
          ================================================================ */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🔥</span>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Pronostics populaires</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Matchs les plus attendus de la CDM 2026</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMatches.map((match, i) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              const pred = home && away ? matchPredictionByPair[`${home.id}:${away.id}`] : undefined;
              const odds = pred ? estimatedMatchOdds(pred.team1WinProb, pred.drawProb, pred.team2WinProb) : undefined;

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

          <div className="mt-8 text-center">
            <Link href="/methodologie" className="text-sm font-semibold text-accent hover:underline">
              Notre méthodologie de pronostics →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          GROUPES — 12 groupes compacts
          ================================================================ */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🗂️</span>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Les 12 groupes</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Composition des groupes — CDM 2026</p>
            </div>
            <Link href="/groupe/a" className="ml-auto text-sm font-semibold text-accent hover:underline shrink-0">
              Voir tous les groupes →
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
              const topTeam = groupTeams[0];

              return (
                <Link
                  key={group.slug}
                  href={`/groupe/${group.slug}`}
                  className="group block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm transition-all duration-200 hover:border-accent/50 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-primary to-secondary dark:from-gray-900 dark:to-gray-800 text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold bg-gold/20 text-gold px-2 py-0.5 rounded">G. {group.letter}</span>
                      {topTeam && <span className="text-xs text-gray-300 truncate">{topTeam.flag} {topTeam.name}</span>}
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-gold transition-colors shrink-0">{groupTeams.length} éq. →</span>
                  </div>

                  <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
                    {groupTeams.map((team, i) => (
                      <div key={team.id} className={`flex items-center gap-2.5 px-4 py-2 ${i < 2 ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"}`}>
                        <span className="text-sm w-4 text-center font-bold text-gray-300 dark:text-gray-600">{i + 1}</span>
                        <span className="text-base shrink-0" role="img" aria-label={team.name}>{team.flag}</span>
                        <span className="text-xs font-semibold truncate flex-1">{team.name}</span>
                        {team.isHost && <span className="text-[9px] bg-gold/20 text-gold px-1.5 py-0.5 rounded font-bold shrink-0">H</span>}
                        <span className="text-[10px] text-gray-400 dark:text-gray-600 shrink-0">#{team.fifaRanking || "–"}</span>
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
          STADES — Grille des 8 stades vedettes
          ================================================================ */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🏟️</span>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">Les stades</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">16 stades répartis dans 3 pays pour la CDM 2026</p>
            </div>
            <Link href="/stades" className="ml-auto text-sm font-semibold text-accent hover:underline shrink-0">
              Tous les stades →
            </Link>
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {featuredStadiums.map((stadium) => (
              <Link
                key={stadium.id}
                href={`/stade/${stadium.slug}`}
                className="group relative flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200"
              >
                <div className="flex items-center justify-center h-24 bg-gradient-to-br from-blue-600/10 via-primary/5 to-purple-600/10 dark:from-blue-900/30 dark:to-purple-900/30 text-5xl">
                  {STADIUM_EMOJIS[stadium.country] ?? "🏟️"}
                </div>
                <div className="p-3 flex-1">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 leading-snug mb-1 line-clamp-2 group-hover:text-accent transition-colors">
                    {stadium.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">📍 {stadium.city}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{STADIUM_EMOJIS[stadium.country]} {stadium.country}</span>
                    <span className="text-[10px] font-bold text-accent">{(stadium.capacity / 1000).toFixed(0)}K places</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/stades" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-bold text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              🏟️ Découvrir les 16 stades
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          BOOKMAKER CTA
          ================================================================ */}
      <section className="bg-white dark:bg-gray-900 py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-8 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e, #2d1a3e)" }}>
                <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Partenaire officiel</p>
                <h3 className="text-2xl font-extrabold mb-3">Pariez sur la CDM 2026</h3>
                <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                  Obtenez jusqu&apos;à <span className="text-gold font-bold">100€ offerts</span> en freebets sur votre premier pari.
                </p>
                <a href="https://www.betclic.fr/?utm_source=cdm2026" target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-bold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 hover:-translate-y-0.5 transition-all">
                  Voir l&apos;offre Betclic →
                </a>
                <p className="mt-3 text-[11px] text-gray-500">18+ · Jeu responsable · Mise max 100€</p>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-gray-800 flex flex-col justify-center">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">⭐ Meilleures cotes CDM 2026</p>
                <div className="space-y-3">
                  {[
                    { name: "France", flag: "🇫🇷", odds: "5.50", ranking: 2 },
                    { name: "Argentine", flag: "🇦🇷", odds: "4.80", ranking: 1 },
                    { name: "Espagne", flag: "🇪🇸", odds: "6.00", ranking: 3 },
                    { name: "Brésil", flag: "🇧🇷", odds: "5.00", ranking: 5 },
                  ].map((t) => (
                    <div key={t.name} className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 hover:border-accent/30 transition-colors">
                      <span className="text-xl">{t.flag}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex-1">{t.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">#{t.ranking} FIFA</span>
                      <span className="odds-badge">{t.odds}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] text-gray-400 dark:text-gray-500">* Cotes indicatives. Vérifiez sur Betclic.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          BOTTOM CTA
          ================================================================ */}
      <section className="bg-field py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-2 text-3xl font-extrabold">11 juin – 19 juillet 2026</h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-field-light leading-relaxed">
            La première Coupe du Monde à 48 équipes. 3 pays, 16 stades, 104 matchs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/pronostic-vainqueur" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent to-red-600 px-7 py-3 font-bold text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              🎯 Pronostics
            </Link>
            <Link href="/match/calendrier" className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3 font-semibold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 hover:-translate-y-0.5 transition-all">
              📅 Calendrier
            </Link>
            <Link href="/stades" className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition-all">
              🏟️ Stades
            </Link>
            <Link href="/villes" className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition-all">
              🌆 Villes hôtes
            </Link>
            <Link href="/guides" className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition-all">
              📖 Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
