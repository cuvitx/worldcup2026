import type { Metadata } from "next";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "../lib/localized-data";
import { matches } from "@repo/data/matches";
import { stadiums, stadiumsById } from "../lib/localized-data";
import { getHomeAlternates } from "@repo/data/route-mapping";
import { newsArticles } from "@repo/data/news";
import { DISPLAY_LIMITS } from "@repo/data/constants";
import { getNextMatch } from "@repo/data/tournament-state";
import { matchPredictionByPair, estimatedMatchOdds } from "@repo/data";
import { Newsletter } from "@repo/ui/newsletter";
import { SocialProof } from "@repo/ui/social-proof";
import { StadiumCarousel } from "./components/StadiumCarousel";
import { SectionHeading } from "@repo/ui/section-heading";
import { FAQSection } from "@repo/ui/faq-section";
import { getUpcomingMatches } from "@repo/utils";

import Link from "next/link";
import { HeroSection } from "./components/home/HeroSection";
import { UpcomingMatches } from "./components/home/UpcomingMatches";
import { GroupsOverview } from "./components/home/GroupsOverview";
import { RecentArticles } from "./components/home/RecentArticles";
import { FavoriteTeams } from "./components/home/FavoriteTeams";
import { PmuBanner } from "./components/PmuBanner";
import { BetOfTheDay } from "./components/home/BetOfTheDay";

export const metadata: Metadata = {
  title: "WM 2026 | Prognosen, Quoten & Kompletter Leitfaden",
  description:
    "WM 2026: Prognosen, Quoten & Analysen der 48 Mannschaften. Spielplan der 104 Spiele, Turnierbaum-Simulator. Sportwetten vorbereiten — kostenloser Zugang.",
  alternates: getHomeAlternates(),
  openGraph: {
    title: "WM 2026 | Prognosen, Quoten & Kompletter Leitfaden",
    description:
      "Prognosen, Quoten, Analysen der 48 Mannschaften und Spielplan der 104 Spiele der WM 2026.",
    url: "https://www.wm2026guide.de",
  },
};

/* ──────────────────────────────── data ──────────────────────────────── */

const faqHomepageItems = [
  {
    question: "Wann beginnt die WM 2026?",
    answer:
      "Die WM 2026 beginnt am 11. Juni 2026 mit dem Eröffnungsspiel im Estadio Azteca in Mexiko-Stadt. Das Finale ist für den 19. Juli 2026 im MetLife Stadium in New York/New Jersey geplant.",
  },
  {
    question: "Wie viele Mannschaften nehmen an der WM 2026 teil?",
    answer:
      "Die WM 2026 empfängt erstmals 48 Mannschaften, statt 32 bei früheren Ausgaben. Das Turnier besteht aus 12 Gruppen mit je 4 Mannschaften, gefolgt von K.o.-Runden für insgesamt 104 Spiele.",
  },
  {
    question: "Wo findet die WM 2026 statt?",
    answer:
      "Die WM 2026 wird gemeinsam von drei Ländern ausgerichtet: den USA (11 Austragungsorte), Kanada (2 Städte) und Mexiko (3 Städte). Die 16 Stadien sind auf Metropolen wie New York, Los Angeles, Dallas, Mexiko-Stadt, Toronto und Vancouver verteilt.",
  },
  {
    question: "Wo wird die WM 2026 in Deutschland übertragen?",
    answer:
      "In Deutschland übertragen ARD und ZDF die WM 2026 im Free-TV. MagentaTV zeigt alle 104 Spiele live. Weitere Übertragungsrechte liegen bei RTL und weiteren Sendern.",
  },
];

const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WM 2026 Guide",
    url: "https://www.wm2026guide.de",
    description: "Kompletter Leitfaden zur WM 2026: Prognosen, Quoten, Analysen der 48 Mannschaften.",
    inLanguage: "de",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.wm2026guide.de/recherche?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "WM FIFA 2026",
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    location: { "@type": "Place", name: "USA, Kanada, Mexiko" },
    sport: "Fußball",
    description: "Erste FIFA WM mit 48 Mannschaften. 104 Spiele in 16 Stadien.",
    organizer: {
      "@type": "Organization",
      name: "FIFA",
      url: "https://www.fifa.com",
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: "https://www.wm2026guide.de/og-default.jpg",
    offers: {
      "@type": "Offer",
      url: "https://www.fifa.com/tickets",
      name: "Tickets WM 2026",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const upcomingMatches = getUpcomingMatches(matches)
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time ?? "00:00"}Z`).getTime() -
        new Date(`${b.date}T${b.time ?? "00:00"}Z`).getTime()
    )
    .slice(0, DISPLAY_LIMITS.UPCOMING_MATCHES_HOME);

  const topTeams = teams
    .filter((t) => t.fifaRanking > 0 && t.fifaRanking <= 5)
    .sort((a, b) => a.fifaRanking - b.fifaRanking);

  const recentArticles = newsArticles.slice(0, DISPLAY_LIMITS.RECENT_ARTICLES);

  // Bet of the day: next upcoming match with prediction data
  const nextMatch = getNextMatch();
  const betOfTheDayMatch = nextMatch;
  const betHomeTeam = betOfTheDayMatch ? teamsById[betOfTheDayMatch.homeTeamId] : null;
  const betAwayTeam = betOfTheDayMatch ? teamsById[betOfTheDayMatch.awayTeamId] : null;
  const betPrediction = betOfTheDayMatch
    ? matchPredictionByPair[`${betOfTheDayMatch.homeTeamId}:${betOfTheDayMatch.awayTeamId}`] ?? null
    : null;
  const betOdds = betPrediction
    ? estimatedMatchOdds(betPrediction.team1WinProb, betPrediction.drawProb, betPrediction.team2WinProb)
    : { home: "—", draw: "—", away: "—" };

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

      {/* 1. HERO + STATS (single hero-animated) */}
      <div className="hero-animated">
      <HeroSection />

      {/* STATS RIBBON */}
      <section className="relative py-6 sm:py-8">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "48", label: "Mannschaften", icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>) },
              { value: "104", label: "Spiele", icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>) },
              { value: "16", label: "Stadien", icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 3v6"/><path d="M15 3v6"/></svg>) },
              { value: "3", label: "Gastgeberländer", icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>) },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4 hover:bg-white/10 transition-all">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white leading-none">{stat.value}</p>
                  <p className="text-xs text-gray-300 font-medium mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>{/* end hero-animated wrapper */}

      {/* 2. PROCHAINS MATCHS */}
      <UpcomingMatches upcomingMatches={upcomingMatches} teamsById={teamsById} stadiumsById={stadiumsById} />

      {/* PARI DU JOUR */}
      {betOfTheDayMatch && betHomeTeam && betAwayTeam && (
        <BetOfTheDay
          match={betOfTheDayMatch}
          homeTeam={betHomeTeam}
          awayTeam={betAwayTeam}
          prediction={betPrediction}
          odds={betOdds}
        />
      )}

      {/* BETTING CTA — Habillage CDM */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PmuBanner tracking="homepage" />
        </div>
      </section>

      {/* 3. GROUPES */}
      <GroupsOverview groups={groups} teamsById={teamsById} />

      {/* 4. ARTICLES RÉCENTS */}
      <RecentArticles recentArticles={recentArticles} />

      {/* 5. STADES CDM 2026 */}
      <section className="bg-gray-50/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-1.5">
              🇺🇸 🇨🇦 🇲🇽 Nordamerika
            </p>
            <SectionHeading title="Stadien WM 2026" subtitle="16 Stadien in 3 Gastgeberländern" linkHref="/stadien" linkLabel="Alle Stadien →" />
          </div>

          <StadiumCarousel stadiums={stadiums} />
        </div>
      </section>

      {/* 6. ÉQUIPES FAVORITES */}
      <FavoriteTeams topTeams={topTeams} />

      {/* Quick Links - Explore */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Die WM 2026 entdecken" subtitle="Alles Wissenswerte rund um die Weltmeisterschaft" />
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-8">
            {[
              { href: "/fifa-ranking", icon: "", label: "FIFA-Rangliste" },
              { href: "/spieler-liste", icon: "", label: "Schlüsselspieler" },
              { href: "/staedte", icon: "", label: "Austragungsorte" },
              { href: "/pays-hotes", icon: "", label: "Gastgeberländer" },
              { href: "/format", icon: "", label: "Turnierformat" },
              { href: "/ou-regarder", icon: "", label: "Wo schauen" },
              { href: "/Tickets", icon: "", label: "Tickets" },
              { href: "/h2h", icon: "", label: "Direktvergleich (H2H)" },
              { href: "/mascotte", icon: "", label: "Maskottchen" },
              { href: "/histoire", icon: "", label: "WM-Geschichte" },
              { href: "/comparateur-Spielers", icon: "", label: "Spieler vergleichen" },
              { href: "/turnierbaum", icon: "", label: "Turnierbaum" },
              { href: "/trophee", icon: "", label: "FIFA-Trophäe" },
              { href: "/chants-supporters", icon: "", label: "Fan-Gesänge" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 hover:shadow-md hover:border-primary/30 transition-all"
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection title="Häufig gestellte Fragen — WM 2026" items={faqHomepageItems} />

      {/* SOCIAL PROOF + NEWSLETTER */}
      {/* SocialProof removed */}
      <Newsletter variant="banner" />
    </>
  );
}
