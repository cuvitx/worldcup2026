import type { MetadataRoute } from "next";
import { teams } from "@repo/data/teams";
import { groups } from "@repo/data/groups";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { players } from "@repo/data/players";
import { matches } from "@repo/data/matches";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://mondial2026.fr";

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
      url: `${BASE_URL}/match/calendrier`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/jeu-responsable`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Team pages
  const teamPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${BASE_URL}/equipe/${team.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Group pages
  const groupPages: MetadataRoute.Sitemap = groups.map((group) => ({
    url: `${BASE_URL}/groupe/${group.slug}`,
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
    url: `${BASE_URL}/stade/${stadium.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/ville/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Player pages
  const playerPages: MetadataRoute.Sitemap = players.map((player) => ({
    url: `${BASE_URL}/joueur/${player.slug}`,
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

  return [
    ...staticPages,
    ...teamPages,
    ...groupPages,
    ...matchPages,
    ...h2hPages,
    ...stadiumPages,
    ...cityPages,
    ...playerPages,
  ];
}
