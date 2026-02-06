import type { MetadataRoute } from "next";
import { teams } from "@repo/data/teams";
import { groups } from "@repo/data/groups";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { players } from "@repo/data/players";
import { matches } from "@repo/data/matches";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://worldcup2026guide.com";

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
      url: `${BASE_URL}/match/schedule`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/teams`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/stadiums`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/players`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cities`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/legal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/responsible-gambling`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Team pages
  const teamPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${BASE_URL}/team/${team.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Team prediction pages (high priority for betting conversion)
  const predictionPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${BASE_URL}/prediction/${team.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Group pages
  const groupPages: MetadataRoute.Sitemap = groups.map((group) => ({
    url: `${BASE_URL}/group/${group.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Match pages
  const matchPages: MetadataRoute.Sitemap = matches.map((match) => ({
    url: `${BASE_URL}/match/${match.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Match prediction pages (high priority for betting conversion)
  const predictionMatchPages: MetadataRoute.Sitemap = matches.map((match) => ({
    url: `${BASE_URL}/prediction-match/${match.slug}`,
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
    url: `${BASE_URL}/stadium/${stadium.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/city/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Player pages
  const playerPages: MetadataRoute.Sitemap = players.map((player) => ({
    url: `${BASE_URL}/player/${player.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...teamPages,
    ...predictionPages,
    ...groupPages,
    ...matchPages,
    ...predictionMatchPages,
    ...h2hPages,
    ...stadiumPages,
    ...cityPages,
    ...playerPages,
  ];
}
