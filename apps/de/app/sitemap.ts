import type { MetadataRoute } from "next";
import { teams } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { players } from "@repo/data/players";
import { groups } from "@repo/data/groups";
import { routePrefixes } from "@repo/data/route-mapping";

const BASE = "https://www.wm2026guide.de";
const p = routePrefixes.de;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/${p.teams}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/${p.groups}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/${p.matchSchedule}`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/${p.matchToday}`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE}/${p.stadiums}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/${p.cities}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/${p.bracket}`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/${p.results}`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/${p.live}`, lastModified: now, changeFrequency: "always", priority: 0.8 },
    { url: `${BASE}/${p.betting}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/${p.faq}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/${p.legal}`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/${p.contact}`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/${p.about}`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const teamPages: MetadataRoute.Sitemap = teams.map((t) => ({
    url: `${BASE}/${p.team}/${t.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const matchPages: MetadataRoute.Sitemap = matches.map((m) => ({
    url: `${BASE}/${p.match}/${m.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const groupPages: MetadataRoute.Sitemap = groups.map((g) => ({
    url: `${BASE}/${p.group}/${g.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const stadiumPages: MetadataRoute.Sitemap = stadiums.map((s) => ({
    url: `${BASE}/${p.stadium}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${BASE}/${p.city}/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const playerPages: MetadataRoute.Sitemap = players.map((pl) => ({
    url: `${BASE}/${p.player}/${pl.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...teamPages,
    ...matchPages,
    ...groupPages,
    ...stadiumPages,
    ...cityPages,
    ...playerPages,
  ];
}
