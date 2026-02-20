import type { Metadata } from "next";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { stadiums, stadiumsById } from "@repo/data/stadiums";
import { getHomeAlternates } from "@repo/data/route-mapping";
import { newsArticles } from "@repo/data/news";
import { DISPLAY_LIMITS } from "@repo/data/constants";
import { Newsletter } from "@repo/ui/newsletter";
import { SocialProof } from "@repo/ui/social-proof";
import { StadiumCarousel } from "./components/StadiumCarousel";
import { SectionHeading } from "@repo/ui/section-heading";
import { FAQSection } from "@repo/ui/faq-section";
import { getUpcomingMatches } from "@repo/utils";

import { HeroSection } from "./components/home/HeroSection";
import { UpcomingMatches } from "./components/home/UpcomingMatches";
import { GroupsOverview } from "./components/home/GroupsOverview";
import { RecentArticles } from "./components/home/RecentArticles";
import { FavoriteTeams } from "./components/home/FavoriteTeams";

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

/* ──────────────────────────────── data ──────────────────────────────── */

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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://cdm2026.fr/recherche?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
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
              { value: "48", label: "Équipes", icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>) },
              { value: "104", label: "Matchs", icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>) },
              { value: "16", label: "Stades", icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 3v6"/><path d="M15 3v6"/></svg>) },
              { value: "3", label: "Pays hôtes", icon: (<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>) },
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

      {/* 3. GROUPES */}
      <GroupsOverview groups={groups} teamsById={teamsById} />

      {/* 4. ARTICLES RÉCENTS */}
      <RecentArticles recentArticles={recentArticles} />

      {/* 5. STADES CDM 2026 */}
      <section className="bg-gray-50 dark:bg-slate-900/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary dark:text-amber-400 mb-1.5">
              🇺🇸 🇨🇦 🇲🇽 Amérique du Nord
            </p>
            <SectionHeading title="Stades CDM 2026" subtitle="16 stades répartis dans 3 pays hôtes" linkHref="/stades" linkLabel="Tous les stades →" />
          </div>

          <StadiumCarousel stadiums={stadiums} />
        </div>
      </section>

      {/* 6. ÉQUIPES FAVORITES */}
      <FavoriteTeams topTeams={topTeams} />

      {/* FAQ */}
      <FAQSection title="Questions fréquentes — CDM 2026" items={faqHomepageItems} />

      {/* SOCIAL PROOF + NEWSLETTER */}
      <SocialProof />
      <Newsletter variant="banner" />
    </>
  );
}
