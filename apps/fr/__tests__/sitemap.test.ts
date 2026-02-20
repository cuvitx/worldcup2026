import { describe, it, expect } from "vitest";
import sitemap, { generateSitemaps } from "../app/sitemap";

describe("Sitemap Generation", () => {
  it("should generate all sitemap segments", async () => {
    const sitemaps = await generateSitemaps();

    expect(sitemaps.length).toBeGreaterThan(0);
    expect(sitemaps.length).toBe(15); // 15 segments

    // Verify segment structure
    sitemaps.forEach((segment) => {
      expect(segment).toHaveProperty("id");
      expect(typeof segment.id).toBe("number");
    });
  });

  it("should generate static pages segment", () => {
    const staticSegment = sitemap({ id: 0 });

    expect(staticSegment.length).toBeGreaterThan(0);

    // Check for key static pages
    const urls = staticSegment.map((entry) => entry.url);

    expect(urls).toContain("https://cdm2026.fr");
    expect(urls).toContain("https://cdm2026.fr/match/calendrier");
    expect(urls).toContain("https://cdm2026.fr/tableau");
    expect(urls).toContain("https://cdm2026.fr/equipes");
    expect(urls).toContain("https://cdm2026.fr/groupes");
    expect(urls).toContain("https://cdm2026.fr/stades");
    expect(urls).toContain("https://cdm2026.fr/faq");
  });

  it("should have valid URL format for all entries", () => {
    const segments = [0, 1, 2, 3, 4, 5, 6];

    segments.forEach((segmentId) => {
      const entries = sitemap({ id: segmentId });

      entries.forEach((entry) => {
        expect(entry.url).toMatch(/^https:\/\//);
        expect(entry.url).toContain("cdm2026.fr");
      });
    });
  });

  it("should have lastModified date for all entries", () => {
    const entries = sitemap({ id: 0 });

    entries.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(entry.lastModified.toString()).not.toBe("Invalid Date");
    });
  });

  it("should have changeFrequency for all entries", () => {
    const entries = sitemap({ id: 0 });
    const validFrequencies = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];

    entries.forEach((entry) => {
      expect(entry.changeFrequency).toBeDefined();
      if (entry.changeFrequency) {
        expect(validFrequencies).toContain(entry.changeFrequency);
      }
    });
  });

  it("should have priority between 0 and 1", () => {
    const entries = sitemap({ id: 0 });

    entries.forEach((entry) => {
      expect(entry.priority).toBeDefined();
      if (entry.priority !== undefined) {
        expect(entry.priority).toBeGreaterThanOrEqual(0);
        expect(entry.priority).toBeLessThanOrEqual(1);
      }
    });
  });

  it("should generate teams segment with valid structure", () => {
    const teamsSegment = sitemap({ id: 1 });

    expect(teamsSegment.length).toBe(48); // 48 teams

    teamsSegment.forEach((entry) => {
      expect(entry.url).toMatch(/\/equipe\/[a-z0-9-]+$/);
      expect(entry.changeFrequency).toBe("weekly");
      expect(entry.priority).toBe(0.9);
    });
  });

  it("should generate matches segment with valid structure", () => {
    const matchesSegment = sitemap({ id: 2 });

    expect(matchesSegment.length).toBe(104); // 104 matches

    matchesSegment.forEach((entry) => {
      expect(entry.url).toMatch(/\/match\/[a-z0-9-]+$/);
      expect(entry.changeFrequency).toBe("weekly");
      expect(entry.priority).toBe(0.8);
    });
  });

  it("should generate groups segment with valid structure", () => {
    const groupsSegment = sitemap({ id: 3 });

    expect(groupsSegment.length).toBe(12); // 12 groups

    groupsSegment.forEach((entry) => {
      expect(entry.url).toMatch(/\/groupe\/[a-l]$/);
      expect(entry.changeFrequency).toBe("weekly");
      expect(entry.priority).toBe(0.9);
    });
  });

  it("should generate stadiums segment with valid structure", () => {
    const stadiumsSegment = sitemap({ id: 4 });

    expect(stadiumsSegment.length).toBe(16); // 16 stadiums

    stadiumsSegment.forEach((entry) => {
      expect(entry.url).toMatch(/\/stade\/[a-z0-9-]+$/);
      expect(entry.changeFrequency).toBe("monthly");
      expect(entry.priority).toBe(0.8);
    });
  });

  it("should generate cities segment with valid structure", () => {
    const citiesSegment = sitemap({ id: 5 });

    expect(citiesSegment.length).toBe(16); // 16 cities

    citiesSegment.forEach((entry) => {
      expect(entry.url).toMatch(/\/ville\/[a-z0-9-]+$/);
      expect(entry.changeFrequency).toBe("monthly");
      expect(entry.priority).toBe(0.8);
    });
  });

  it("should generate players segment with valid structure", () => {
    const playersSegment = sitemap({ id: 6 });

    expect(playersSegment.length).toBe(966); // 966 players

    playersSegment.forEach((entry) => {
      expect(entry.url).toMatch(/\/joueur\/[a-z0-9-]+$/);
      expect(entry.changeFrequency).toBe("monthly");
      expect(entry.priority).toBe(0.7);
    });
  });

  it("should generate calendrier segment with 39 days", () => {
    const calendrierSegment = sitemap({ id: 14 });

    expect(calendrierSegment.length).toBe(39); // 39 days

    calendrierSegment.forEach((entry, index) => {
      expect(entry.url).toMatch(/\/calendrier\/jour-\d+$/);
      expect(entry.changeFrequency).toBe("daily");
      expect(entry.priority).toBe(0.8);
    });
  });

  it("should generate H2H segment with team combinations", () => {
    const h2hSegment = sitemap({ id: 8 });

    // 48 teams = 48*47/2 = 1128 combinations
    expect(h2hSegment.length).toBe(1128);

    h2hSegment.forEach((entry) => {
      expect(entry.url).toMatch(/\/h2h\/[a-z0-9-]+-vs-[a-z0-9-]+$/);
      expect(entry.changeFrequency).toBe("monthly");
      expect(entry.priority).toBe(0.7);
    });
  });

  it("should return empty array for invalid segment ID", () => {
    const invalidSegment = sitemap({ id: 999 });

    expect(invalidSegment).toEqual([]);
  });

  it("should have homepage with highest priority", () => {
    const staticSegment = sitemap({ id: 0 });
    const homepage = staticSegment.find((entry) => entry.url === "https://cdm2026.fr");

    expect(homepage).toBeDefined();
    expect(homepage?.priority).toBe(1.0);
  });
});
