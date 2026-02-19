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
const TODAY = new Date();
const STATIC_LAST_MODIFIED = new Date("2026-02-19");

function matchLastModified(matchDate: string): Date {
  const d = new Date(matchDate);
  return d > TODAY ? d : TODAY;
}

// Segment IDs
const SEGMENT_STATIC = 0;
const SEGMENT_TEAMS = 1;
const SEGMENT_MATCHES = 2;
const SEGMENT_GROUPS = 3;
const SEGMENT_STADIUMS = 4;
const SEGMENT_CITIES = 5;
const SEGMENT_PLAYERS = 6;
const SEGMENT_SCORERS = 7;
const SEGMENT_H2H = 8;
const SEGMENT_ARTICLES = 9;
const SEGMENT_GUIDES = 10;
const SEGMENT_BOOKMAKERS = 11;
const SEGMENT_PRONOSTICS_TEAMS = 12;
const SEGMENT_PRONOSTICS_MATCHES = 13;
const SEGMENT_CALENDRIER = 14;

export async function generateSitemaps() {
  return [
    { id: SEGMENT_STATIC },
    { id: SEGMENT_TEAMS },
    { id: SEGMENT_MATCHES },
    { id: SEGMENT_GROUPS },
    { id: SEGMENT_STADIUMS },
    { id: SEGMENT_CITIES },
    { id: SEGMENT_PLAYERS },
    { id: SEGMENT_SCORERS },
    { id: SEGMENT_H2H },
    { id: SEGMENT_ARTICLES },
    { id: SEGMENT_GUIDES },
    { id: SEGMENT_BOOKMAKERS },
    { id: SEGMENT_PRONOSTICS_TEAMS },
    { id: SEGMENT_PRONOSTICS_MATCHES },
    { id: SEGMENT_CALENDRIER },
  ];
}

export default function sitemap({
  id,
}: {
  id: number;
}): MetadataRoute.Sitemap {
  switch (id) {
    case SEGMENT_STATIC:
      return [
        { url: BASE_URL, lastModified: TODAY, changeFrequency: "daily", priority: 1.0 },
        { url: `${BASE_URL}/match/calendrier`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/match/aujourdhui`, lastModified: TODAY, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/tableau`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/buteurs`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/comparateur-cotes`, lastModified: TODAY, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/pronostic-vainqueur`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/equipe-de-france`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/paris-sportifs`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/live`, lastModified: TODAY, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/statistiques`, lastModified: TODAY, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/comparateur-joueurs`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/simulateur`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/billets`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/recherche`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.6 },
        { url: `${BASE_URL}/groupes`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/newsletter`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.4 },
        { url: `${BASE_URL}/equipes`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/stades`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/joueurs`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/villes`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/guides`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/ou-regarder`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/carte-stades`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/histoire`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/palmares`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/faq`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/quiz`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/guide/glossaire`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/methodologie`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/a-propos`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
        { url: `${BASE_URL}/contact`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
        { url: `${BASE_URL}/jeu-responsable`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
        { url: `${BASE_URL}/mentions-legales`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.2 },
        { url: `${BASE_URL}/politique-de-confidentialite`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.2 },
        { url: `${BASE_URL}/actualites`, lastModified: TODAY, changeFrequency: "daily", priority: 0.9 },
      ];

    case SEGMENT_CALENDRIER:
      return Array.from({ length: 39 }, (_, i) => ({
        url: `${BASE_URL}/calendrier/jour-${i + 1}`,
        lastModified: TODAY,
        changeFrequency: "daily" as const,
        priority: 0.8,
      }));

    case SEGMENT_TEAMS:
      return teams.map((team) => ({
        url: `${BASE_URL}/equipe/${team.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));

    case SEGMENT_PRONOSTICS_TEAMS:
      return teams.map((team) => ({
        url: `${BASE_URL}/pronostic/${team.slug}`,
        lastModified: TODAY,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));

    case SEGMENT_MATCHES:
      return matches.map((match) => ({
        url: `${BASE_URL}/match/${match.slug}`,
        lastModified: matchLastModified(match.date),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    case SEGMENT_PRONOSTICS_MATCHES:
      return matches.map((match) => ({
        url: `${BASE_URL}/pronostic-match/${match.slug}`,
        lastModified: matchLastModified(match.date),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));

    case SEGMENT_GROUPS:
      return groups.map((group) => ({
        url: `${BASE_URL}/groupe/${group.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));

    case SEGMENT_STADIUMS:
      return stadiums.map((stadium) => ({
        url: `${BASE_URL}/stade/${stadium.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    case SEGMENT_CITIES:
      return cities.map((city) => ({
        url: `${BASE_URL}/ville/${city.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    case SEGMENT_PLAYERS:
      return players.map((player) => ({
        url: `${BASE_URL}/joueur/${player.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    case SEGMENT_SCORERS:
      return scorerPlayers.map((player) => ({
        url: `${BASE_URL}/buteur/${player.slug}`,
        lastModified: TODAY,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    case SEGMENT_H2H: {
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
      return h2hPages;
    }

    case SEGMENT_ARTICLES:
      return newsArticles.map((article) => ({
        url: `${BASE_URL}/actualites/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    case SEGMENT_GUIDES:
      return guides.map((guide) => ({
        url: `${BASE_URL}/guide/${guide.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    case SEGMENT_BOOKMAKERS:
      return bookmakerReviews.map((bk) => ({
        url: `${BASE_URL}/bookmaker/${bk.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    default:
      return [];
  }
}
