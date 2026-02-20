import { describe, it, expect } from "vitest";
import { cities } from "../src/cities";

describe("Cities Data", () => {
  it("should have exactly 16 host cities", () => {
    expect(cities).toHaveLength(16);
  });

  it("should have all required fields for each city", () => {
    cities.forEach((city) => {
      expect(city.id).toBeTruthy();
      expect(city.name).toBeTruthy();
      expect(city.slug).toBeTruthy();
      expect(city.country).toBeTruthy();
      expect(["USA", "Canada", "Mexico"]).toContain(city.country);
      expect(city.state).toBeTruthy();
      expect(city.population).toBeGreaterThan(0);
      expect(city.timezone).toBeTruthy();
      expect(city.description).toBeTruthy();
      expect(Array.isArray(city.stadiumIds)).toBe(true);
      expect(city.stadiumIds.length).toBeGreaterThan(0);
    });
  });

  it("should have unique city IDs", () => {
    const ids = cities.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(cities.length);
  });

  it("should have unique city slugs", () => {
    const slugs = cities.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(cities.length);
  });

  it("should have valid population numbers (> 100k)", () => {
    cities.forEach((city) => {
      expect(city.population).toBeGreaterThan(100000);
    });
  });

  it("should have valid timezone format", () => {
    const timezoneRegex = /^America\//;
    cities.forEach((city) => {
      expect(city.timezone).toMatch(timezoneRegex);
    });
  });

  it("should have correct distribution of cities by country", () => {
    const usaCities = cities.filter((c) => c.country === "USA");
    const canadaCities = cities.filter((c) => c.country === "Canada");
    const mexicoCities = cities.filter((c) => c.country === "Mexico");

    // Verify we have cities in all three countries
    expect(usaCities.length).toBeGreaterThan(0);
    expect(canadaCities.length).toBeGreaterThan(0);
    expect(mexicoCities.length).toBeGreaterThan(0);
    
    // Total should be 16
    expect(usaCities.length + canadaCities.length + mexicoCities.length).toBe(16);
  });

  it("should have description length > 300 chars", () => {
    cities.forEach((city) => {
      expect(city.description.length).toBeGreaterThan(300);
    });
  });

  it("should have at least one stadium per city", () => {
    cities.forEach((city) => {
      expect(city.stadiumIds.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("should have valid slug format (lowercase, hyphens)", () => {
    cities.forEach((city) => {
      expect(city.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("should have all stadiumIds as non-empty strings", () => {
    cities.forEach((city) => {
      city.stadiumIds.forEach((stadiumId) => {
        expect(typeof stadiumId).toBe("string");
        expect(stadiumId.length).toBeGreaterThan(0);
      });
    });
  });
});
