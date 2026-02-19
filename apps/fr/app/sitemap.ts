import type { MetadataRoute } from "next";
import { teams } from "@repo/data/teams";
import { groups } from "@repo/data/groups";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { players } from "@repo/data/players";
import { matches } from "@repo/data/matches";
import { scorerPlayers } from "@repo/data/scorers";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
import { guides } from "@repo/data/guides";
import { newsArticles } from "@repo/data/news";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://cdm2026.fr";
/** Date du jour — homepage & pages dynamiques */
const TODAY = new Date();
/** Date de dernière modif du code pour les pages statiques */
const STATIC_LAST_MODIFIED = new Date("2026-02-19");

function matchLastModified(matchDate: string): Date {
  const d = new Date(matchDate);
  // Si le match est dans le futur → on renvoie la date du match (contenu susceptible de changer)
  // Sinon → date du jour (résultats live)
  return d > TODAY ? d : TODAY;
}

export default function sitemap(): MetadataRoute.Sitemap {

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage — toujours la date du jour
    {
      url: BASE_URL,
      lastModified: TODAY,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Pages dynamiques (contenu qui change fréquemment)
    {
      url: `${BASE_URL}/match/calendrier`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/match/aujourdhui`,
      lastModified: TODAY,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tableau`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/buteurs`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/comparateur-cotes`,
      lastModified: TODAY,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pronostic-vainqueur`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/equipe-de-france`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/paris-sportifs`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/live`,
      lastModified: TODAY,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/statistiques`,
      lastModified: TODAY,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/comparateur-joueurs`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/simulateur`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/billets`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recherche`,
      lastModified: TODAY,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    // Pages statiques — date de dernière modif du code
    {
      url: `${BASE_URL}/groupes`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/equipes`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/stades`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/joueurs`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/villes`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ou-regarder`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/carte-stades`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/histoire`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/palmares`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/guide/glossaire`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/methodologie`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/jeu-responsable`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/politique-de-confidentialite`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    // Calendrier jour par jour (39 jours : 11 juin → 19 juillet 2026)
    ...Array.from({ length: 39 }, (_, i) => ({
      url: `${BASE_URL}/calendrier/jour-${i + 1}`,
      lastModified: TODAY,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];

  // Team pages — pages statiques (données ne changent pas souvent)
  const teamPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${BASE_URL}/equipe/${team.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Team pronostic pages (high priority for betting conversion)
  const pronosticPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${BASE_URL}/pronostic/${team.slug}`,
    lastModified: TODAY,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Group pages — statiques
  const groupPages: MetadataRoute.Sitemap = groups.map((group) => ({
    url: `${BASE_URL}/groupe/${group.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Match pages — date du match si futur, sinon date actuelle
  const matchPages: MetadataRoute.Sitemap = matches.map((match) => ({
    url: `${BASE_URL}/match/${match.slug}`,
    lastModified: matchLastModified(match.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Match pronostic pages — idem, lié à la date du match
  const pronosticMatchPages: MetadataRoute.Sitemap = matches.map((match) => ({
    url: `${BASE_URL}/pronostic-match/${match.slug}`,
    lastModified: matchLastModified(match.date),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // H2H pages (all combinations) — statiques
  const h2hPages: MetadataRoute.Sitemap = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const t1 = teams[i];
      const t2 = teams[j];
      if (t1 && t2) {
        h2hPages.push({
          url: `${BASE_URL}/h2h/${t1.slug}-vs-${t2.slug}`,
          lastModified: STATIC_LAST_MODIFIED,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      }
    }
  }

  // Stadium pages — statiques
  const stadiumPages: MetadataRoute.Sitemap = stadiums.map((stadium) => ({
    url: `${BASE_URL}/stade/${stadium.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // City pages — statiques
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/ville/${city.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Player pages — statiques
  const playerPages: MetadataRoute.Sitemap = players.map((player) => ({
    url: `${BASE_URL}/joueur/${player.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Scorer (buteur) pages — dynamiques (cotes changent)
  const scorerPages: MetadataRoute.Sitemap = scorerPlayers.map((player) => ({
    url: `${BASE_URL}/buteur/${player.slug}`,
    lastModified: TODAY,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Bookmaker review pages — statiques
  const bookmakerPages: MetadataRoute.Sitemap = bookmakerReviews.map((bk) => ({
    url: `${BASE_URL}/bookmaker/${bk.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Guide pages — statiques
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guide/${guide.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // News pages
  const newsListingPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/actualites`,
      lastModified: TODAY,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const newsPages: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${BASE_URL}/actualites/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...newsListingPage,
    ...newsPages,
    ...teamPages,
    ...pronosticPages,
    ...groupPages,
    ...matchPages,
    ...pronosticMatchPages,
    ...h2hPages,
    ...stadiumPages,
    ...cityPages,
    ...playerPages,
    ...scorerPages,
    ...bookmakerPages,
    ...guidePages,
  ];
}
