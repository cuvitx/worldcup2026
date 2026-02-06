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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://mundial2026.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/match/calendario`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/acerca-de`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/aviso-legal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/juego-responsable`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Hub pages
  const hubPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/equipos`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/estadios`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/jugadores`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ciudades`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/goleadores`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/apuestas`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guias`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Team pages
  const teamPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${BASE_URL}/equipo/${team.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Team pronostico pages
  const teamPronosticoPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${BASE_URL}/pronostico/${team.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Match pronostico pages
  const matchPronosticoPages: MetadataRoute.Sitemap = matches.map((match) => ({
    url: `${BASE_URL}/pronostico-partido/${match.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Group pages
  const groupPages: MetadataRoute.Sitemap = groups.map((group) => ({
    url: `${BASE_URL}/grupo/${group.slug}`,
    lastModified: now,
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
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      }
    }
  }

  // Stadium pages
  const stadiumPages: MetadataRoute.Sitemap = stadiums.map((stadium) => ({
    url: `${BASE_URL}/estadio/${stadium.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/ciudad/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Player pages
  const playerPages: MetadataRoute.Sitemap = players.map((player) => ({
    url: `${BASE_URL}/jugador/${player.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Match pages
  const matchPages: MetadataRoute.Sitemap = matches.map((match) => ({
    url: `${BASE_URL}/match/${match.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Scorer pages
  const scorerPages: MetadataRoute.Sitemap = scorerPlayers.map((player) => ({
    url: `${BASE_URL}/goleador/${player.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Bookmaker review pages
  const bookmakerPages: MetadataRoute.Sitemap = bookmakerReviews.map((bk) => ({
    url: `${BASE_URL}/casa-apuestas/${bk.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guia/${guide.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...hubPages,
    ...teamPages,
    ...teamPronosticoPages,
    ...matchPronosticoPages,
    ...groupPages,
    ...matchPages,
    ...h2hPages,
    ...stadiumPages,
    ...cityPages,
    ...playerPages,
    ...scorerPages,
    ...bookmakerPages,
    ...guidePages,
  ];
}
