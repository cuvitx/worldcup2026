import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { stadiums, stadiumsById } from "@repo/data/stadiums";
import { getHomeAlternates } from "@repo/data/route-mapping";
import { predictionsByTeamId } from "@repo/data/predictions";
import { estimatedOutrightOdds } from "@repo/data/affiliates";
import { newsArticles } from "@repo/data/news";
import { favoritesByTeamId } from "@repo/data/predictions-2026";
import { Countdown } from "./components/Countdown";
import { NewsletterCTA } from "./components/NewsletterCTA";
import { SocialProof } from "./components/SocialProof";
import { StadiumCarousel } from "./components/StadiumCarousel";

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

/* ──────────────────────────────── helpers ──────────────────────────────── */

const faqHomepageItems = [
  {
    question: "Quand commence la CDM 2026 ?",
    answer:
      "La Coupe du Monde 2026 débute le 11 juin 2026 avec le match d'ouverture au stade Azteca de Mexico. La finale est prévue le 19 juillet 2026 au MetLife Stadium de New York/New Jersey.",
  },
  {
    question: "Combien d'équipes participent à la CDM 2026 ?",
    answer:
      "La Coupe du Monde 2026 accueille pour la première fois 48 équipes, contre 32 lors des éditions précédentes. Le tournoi se compose de 12 groupes de 4 équipes, puis de phases à élimination directe pour un total de 104 matchs.",
  },
  {
    question: "Où se déroule la CDM 2026 ?",
    answer:
      "La Coupe du Monde 2026 est organisée conjointement par trois pays : les États-Unis (11 villes hôtes), le Canada (2 villes) et le Mexique (3 villes). Les 16 stades sont répartis dans des métropoles comme New York, Los Angeles, Dallas, Mexico, Toronto et Vancouver.",
  },
  {
    question: "Quelle chaîne diffuse la CDM 2026 en France ?",
    answer:
      "En France, les droits TV de la Coupe du Monde 2026 sont détenus par TF1 et M6 pour les matchs en clair, et par beIN Sports pour une couverture intégrale. Les matchs de l'équipe de France seront diffusés en clair.",
  },
];

const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CDM 2026 - Coupe du Monde",
    url: "https://cdm2026.fr",
    description: "Guide complet de la Coupe du Monde 2026 : pronostics, cotes, analyses des 48 équipes.",
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
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqHomepageItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

const categoryColors: Record<string, string> = {
  stades: "bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary",
  billets: "bg-field/10 text-field dark:bg-field/20 dark:text-field",
  equipes: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-white",
  paris: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary",
  transferts: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const categoryLabels: Record<string, string> = {
  stades: "Stades",
  billets: "Billets",
  equipes: "Équipes",
  paris: "Paris",
  transferts: "Transferts",
};

function formatMatchDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  /* ── data ── */
  const upcomingMatches = matches
    .filter((m) => new Date(`${m.date}T${m.time ?? "00:00"}Z`) >= new Date())
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time ?? "00:00"}Z`).getTime() -
        new Date(`${b.date}T${b.time ?? "00:00"}Z`).getTime()
    )
    .slice(0, 3);

  const topTeams = teams
    .filter((t) => t.fifaRanking > 0 && t.fifaRanking <= 5)
    .sort((a, b) => a.fifaRanking - b.fifaRanking);

  const recentArticles = newsArticles.slice(0, 3);

  return (
    <>
      {/* JSON-LD */}
      {homepageJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO — Cinematic full-screen avec countdown intégré
          ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#070b18] text-white">
        {/* Background — stade fantôme */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/stadiums/metlife-stadium.jpg')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b18]/60 via-[#070b18]/40 to-[#070b18]" />

        {/* Orbs décoratifs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          {/* Badge event */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e8c547]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8c547]">
              Coupe du Monde 2026 · 11 juin – 19 juillet
            </span>
          </div>

          {/* Headline principale */}
          <h1 className="mb-4 text-4xl font-black tracking-tight leading-none sm:text-5xl md:text-6xl lg:text-7xl">
            <span
              className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
              style={{ letterSpacing: "-0.02em" }}
            >
              Chaque match.
            </span>
            <span
              className="block bg-gradient-to-r from-[#e8c547] via-[#f5d76e] to-[#e8c547] bg-clip-text text-transparent"
              style={{ letterSpacing: "-0.02em" }}
            >
              Chaque pari.
            </span>
            <span
              className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
              style={{ letterSpacing: "-0.02em" }}
            >
              Chaque champion.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-base text-gray-200 leading-relaxed sm:text-lg">
            Pronostics d&apos;experts · Cotes live · Analyses exclusives
            <br />
            <span className="text-sm text-gray-300">
              🇺🇸 États-Unis · 🇨🇦 Canada · 🇲🇽 Mexique — 48 équipes · 104 matchs
            </span>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <Link
              href="/pronostic-vainqueur"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#e63946] to-[#c1121f] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#e63946]/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#e63946]/40"
            >
              <span className="text-base">🎯</span>
              Mes pronostics
              <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <Link
              href="/simulateur"
              className="group inline-flex items-center gap-2.5 rounded-2xl border border-[#e8c547]/30 bg-[#e8c547]/10 px-8 py-4 text-sm font-black text-[#e8c547] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#e8c547]/20 hover:border-[#e8c547]/50"
            >
              <span className="text-base">🏆</span>
              Créer mon bracket
              <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>

          {/* Countdown intégré dans le hero */}
          <Countdown />
        </div>

        {/* Arrow scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/40 text-xl">
          ↓
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STATS RIBBON
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#0d1117] border-y border-gray-200 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 divide-x divide-gray-200 dark:divide-white/5">
            {[
              { value: "48", label: "Équipes", icon: "🌍" },
              { value: "104", label: "Matchs", icon: "⚽" },
              { value: "16", label: "Stades", icon: "🏟️" },
              { value: "3", label: "Pays hôtes", icon: "🌎" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-5 px-2 text-center gap-0.5">
                <span className="text-base sm:text-lg mb-0.5">{stat.icon}</span>
                <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-none">{stat.value}</p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-500 font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. PROCHAINS MATCHS — 3 matchs avec stade
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e63946] mb-1.5">
                Phase de groupes
              </p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                Prochains matchs
              </h2>
            </div>
            <Link
              href="/match/calendrier"
              className="text-sm font-semibold text-[#e63946] hover:underline"
            >
              Calendrier complet →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {upcomingMatches.length === 0 ? (
              <p className="col-span-3 text-center text-gray-400 py-8">
                Aucun match à venir.
              </p>
            ) : (
              upcomingMatches.map((match) => {
                const home = teamsById[match.homeTeamId];
                const away = teamsById[match.awayTeamId];
                const stadium = stadiumsById[match.stadiumId];

                return (
                  <Link
                    key={match.id}
                    href={`/pronostic-match/${match.slug}`}
                    className="group relative flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                  >
                    {/* Top accent */}
                    <div className="h-0.5 bg-gradient-to-r from-[#e63946] to-[#e8c547]" />

                    {/* Match group badge */}
                    <div className="flex items-center justify-between px-4 pt-3 pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        {match.group ? `Groupe ${match.group}` : match.stage}
                        {match.matchday ? ` · J${match.matchday}` : ""}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                        {formatMatchDate(match.date)}
                        {match.time && (
                          <span className="ml-1 text-gray-400"> {match.time}</span>
                        )}
                      </span>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-between gap-2 px-4 py-4">
                      {/* Home */}
                      <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                        <span className="text-4xl drop-shadow-sm" role="img" aria-label={home?.name}>
                          {home?.flag ?? "🏳️"}
                        </span>
                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100 text-center truncate w-full">
                          {home?.name ?? match.homeTeamId}
                        </span>
                      </div>

                      {/* VS */}
                      <div className="flex flex-col items-center shrink-0">
                        <span className="text-xs font-black text-[#e63946] tracking-widest">VS</span>
                      </div>

                      {/* Away */}
                      <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                        <span className="text-4xl drop-shadow-sm" role="img" aria-label={away?.name}>
                          {away?.flag ?? "🏳️"}
                        </span>
                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100 text-center truncate w-full">
                          {away?.name ?? match.awayTeamId}
                        </span>
                      </div>
                    </div>

                    {/* Stadium */}
                    {stadium && (
                      <div className="px-4 pb-4 mt-auto">
                        <div className="flex items-center gap-1.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 px-3 py-2">
                          <span className="text-sm">🏟️</span>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300 truncate">
                              {stadium.name}
                            </p>
                            <p className="text-[9px] text-gray-400 dark:text-gray-500">
                              {stadium.city}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hover CTA */}
                    <div className="px-4 pb-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="block text-center text-[11px] font-bold text-[#e63946]">
                        Voir le pronostic →
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. GROUPES EN UN COUP D'ŒEIL — 12 cartes A-L
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-900/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8c547] mb-1.5">
                12 groupes · 48 équipes
              </p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                Groupes en un coup d&apos;œil
              </h2>
            </div>
            <Link href="/groupes" className="text-sm font-semibold text-[#e8c547] hover:underline">
              Voir tous les groupes →
            </Link>
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
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
                  className="group block rounded-2xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#0d1117] to-[#1a2035]">
                    <span className="text-xs font-black text-[#e8c547]">
                      GROUPE {group.letter}
                    </span>
                    <span className="text-[10px] text-gray-500 group-hover:text-[#e8c547] transition-colors">
                      {groupTeams.length} éq.
                    </span>
                  </div>

                  {/* Teams list */}
                  <div className="divide-y divide-gray-50 dark:divide-gray-700/30 py-1">
                    {groupTeams.map((team, i) => (
                      <div
                        key={team.id}
                        className={`flex items-center gap-2 px-3 py-1.5 ${
                          i < 2
                            ? "text-gray-900 dark:text-gray-100"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        <span className="text-xs text-gray-300 dark:text-gray-600 w-3 shrink-0 font-bold">
                          {i + 1}
                        </span>
                        <span className="text-sm shrink-0" role="img" aria-label={team.name}>
                          {team.flag}
                        </span>
                        <span className="text-[11px] font-semibold truncate flex-1">
                          {team.name}
                        </span>
                        {team.isHost && (
                          <span className="text-[8px] bg-[#e8c547]/20 text-[#e8c547] px-1 py-0.5 rounded font-bold shrink-0">
                            H
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. ARTICLES RÉCENTS — 3 derniers articles
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e63946] mb-1.5">
                Actualités
              </p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                Articles récents
              </h2>
            </div>
            <Link href="/actualites" className="text-sm font-semibold text-[#e63946] hover:underline">
              Toutes les actus →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {recentArticles.map((article, i) => (
              <Link
                key={article.id}
                href={`/actualites/${article.slug}`}
                className="group relative flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Thumbnail zone */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                  <span className="text-6xl opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500">
                    {article.imageEmoji}
                  </span>
                  {/* Glassmorphism on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Featured badge for first article */}
                  {i === 0 && (
                    <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider bg-[#e63946] text-white px-2.5 py-1 rounded-full">
                      À la une
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <span
                    className={`self-start text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider ${
                      categoryColors[article.category] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {categoryLabels[article.category] ?? article.category}
                  </span>

                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 leading-snug mb-2 line-clamp-2 group-hover:text-[#e63946] transition-colors duration-200">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 dark:border-gray-800">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                      {new Date(article.date + "T00:00:00Z").toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </p>
                    <span className="text-[11px] font-bold text-[#e63946] opacity-0 group-hover:opacity-100 transition-opacity">
                      Lire →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. STADES CDM 2026 — Carousel horizontal 16 stades
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-900/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3b82f6] mb-1.5">
                🇺🇸 🇨🇦 🇲🇽 Amérique du Nord
              </p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                Stades CDM 2026
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                16 stades répartis dans 3 pays hôtes
              </p>
            </div>
            <Link href="/stades" className="text-sm font-semibold text-[#3b82f6] hover:underline">
              Tous les stades →
            </Link>
          </div>

          <StadiumCarousel stadiums={stadiums} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. ÉQUIPES FAVORITES — Top 5 avec cotes et drapeaux
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8c547] mb-1.5">
                Cotes Vainqueur
              </p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                Équipes favorites
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Top 5 FIFA · Pronostics &amp; chances de titre
              </p>
            </div>
            <Link
              href="/pronostic-vainqueur"
              className="text-sm font-semibold text-[#e8c547] hover:underline"
            >
              Tous les pronostics →
            </Link>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {topTeams.map((team, index) => {
              const pred = predictionsByTeamId[team.id];
              const favData = favoritesByTeamId[team.id];
              const winPct = pred ? Math.round(pred.winnerProb * 100) : null;
              // Prefer real bookmaker avg odds over estimated
              const outrightOdds = favData ? favData.avgOdds.toFixed(2) : pred ? estimatedOutrightOdds(pred.winnerProb) : null;
              const trendIcon = favData?.trend === "up" ? " ↑" : favData?.trend === "down" ? " ↓" : null;
              const medals = ["🥇", "🥈", "🥉"];

              return (
                <Link
                  key={team.id}
                  href={`/equipe/${team.slug}`}
                  className="group relative flex flex-col items-center rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Glow effect for top 3 */}
                  {index < 3 && (
                    <div className="absolute inset-0 bg-gradient-to-b from-[#e8c547]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}

                  {/* Rank badge */}
                  <span className="absolute top-2.5 left-2.5 text-[11px] font-black">
                    {index < 3 ? medals[index] : (
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded text-[10px]">
                        #{team.fifaRanking}
                      </span>
                    )}
                  </span>

                  {/* Flag */}
                  <span
                    className="text-5xl mb-3 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                    role="img"
                    aria-label={team.name}
                  >
                    {team.flag}
                  </span>

                  {/* Team name */}
                  <p className="text-sm font-extrabold text-gray-900 dark:text-gray-100 mb-1">
                    {team.name}
                  </p>

                  {/* Win probability bar */}
                  {winPct !== null && winPct > 0 && (
                    <div className="w-full mt-1.5 mb-2">
                      <div className="flex justify-between text-[9px] text-gray-400 mb-1">
                        <span>Chances</span>
                        <span className="font-bold text-[#e63946]">
                          {winPct < 1 ? "<1" : winPct}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1">
                        <div
                          className="bg-gradient-to-r from-[#e63946] to-[#e8c547] h-1 rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(winPct * 4, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Odds badge — real bookmaker data when available */}
                  {outrightOdds && (
                    <div className="mt-1 w-full rounded-xl border border-[#e8c547]/30 bg-[#e8c547]/5 dark:bg-[#e8c547]/10 px-3 py-2">
                      <p className="text-[9px] text-gray-500 dark:text-gray-400 mb-0.5">
                        {favData ? "Cote moy. marché" : "Cote vainqueur"}
                      </p>
                      <p className="text-lg font-black text-[#e8c547]">
                        {outrightOdds}
                        {trendIcon && (
                          <span className={`text-xs ml-0.5 font-bold ${favData?.trend === "up" ? "text-green-500" : "text-red-400"}`}>
                            {trendIcon}
                          </span>
                        )}
                      </p>
                      {favData && (
                        <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5">
                          Proba : {Math.round(favData.impliedProbability * 100)}%
                        </p>
                      )}
                    </div>
                  )}

                  <p className="text-[9px] text-gray-400 dark:text-gray-600 mt-2">
                    Groupe {team.group}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-center text-[10px] text-gray-400 dark:text-gray-600">
            * Cotes indicatives basées sur nos modèles. Vérifiez sur les bookmakers agréés.
            Pariez responsablement. 18+
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-900/60 py-12 sm:py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 text-center">
            ❓ Questions fréquentes — CDM 2026
          </h2>
          <div className="space-y-3">
            {faqHomepageItems.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800/60 overflow-hidden"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-bold text-gray-900 dark:text-white hover:text-[#e63946] dark:hover:text-[#e63946] transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 text-gray-300 dark:text-gray-600 group-open:rotate-180 transition-transform duration-200 text-xs">
                      ▼
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-gray-700/40 pt-3">
                    {item.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          7. NEWSLETTER CTA
          ══════════════════════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════════════════
          SOCIAL PROOF
          ══════════════════════════════════════════════════════════════════ */}
      <SocialProof />

      <NewsletterCTA />
    </>
  );
}
