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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://mondial2026.fr";
const LAST_UPDATED = new Date("2026-02-12");

export default function sitemap(): MetadataRoute.Sitemap {

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/match/calendrier`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/equipes`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/stades`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/joueurs`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/villes`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/jeu-responsable`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/buteurs`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/paris-sportifs`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/match/aujourdhui`,
      lastModified: LAST_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tableau`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/simulateur`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/comparateur-cotes`,
      lastModified: LAST_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guide/glossaire`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ou-regarder`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/methodologie`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/live`,
      lastModified: LAST_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Team pages
  const teamPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${BASE_URL}/equipe/${team.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Team pronostic pages (high priority for betting conversion)
  const pronosticPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${BASE_URL}/pronostic/${team.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Group pages
  const groupPages: MetadataRoute.Sitemap = groups.map((group) => ({
    url: `${BASE_URL}/groupe/${group.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Match pages
  const matchPages: MetadataRoute.Sitemap = matches.map((match) => ({
    url: `${BASE_URL}/match/${match.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Match pronostic pages (high priority for betting conversion)
  const pronosticMatchPages: MetadataRoute.Sitemap = matches.map((match) => ({
    url: `${BASE_URL}/pronostic-match/${match.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // H2H pages (all combinations)
  const h2hPages: MetadataRoute.Sitemap = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const t1 = teams[i];
      const t2 = teams[j];
      if (t1 && t2) {
        h2hPages.push({
          url: `${BASE_URL}/h2h/${t1.slug}-vs-${t2.slug}`,
          lastModified: LAST_UPDATED,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      }
    }
  }

  // Stadium pages
  const stadiumPages: MetadataRoute.Sitemap = stadiums.map((stadium) => ({
    url: `${BASE_URL}/stade/${stadium.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/ville/${city.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Player pages
  const playerPages: MetadataRoute.Sitemap = players.map((player) => ({
    url: `${BASE_URL}/joueur/${player.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Scorer (buteur) pages
  const scorerPages: MetadataRoute.Sitemap = scorerPlayers.map((player) => ({
    url: `${BASE_URL}/buteur/${player.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Bookmaker review pages
  const bookmakerPages: MetadataRoute.Sitemap = bookmakerReviews.map((bk) => ({
    url: `${BASE_URL}/bookmaker/${bk.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guide/${guide.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // News pages
  const newsListingPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/actualites`,
      lastModified: LAST_UPDATED,
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
