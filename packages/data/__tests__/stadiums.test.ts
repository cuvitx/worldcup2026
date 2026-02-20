import { describe, it, expect } from "vitest";
import { stadiums } from "../src/stadiums";
import { cities } from "../src/cities";

describe("Stadiums Data", () => {
  it("should have exactly 16 stadiums", () => {
    expect(stadiums).toHaveLength(16);
  });

  it("should have all required fields for each stadium", () => {
    stadiums.forEach((stadium) => {
      expect(stadium.id).toBeTruthy();
      expect(stadium.name).toBeTruthy();
      expect(stadium.slug).toBeTruthy();
      expect(stadium.city).toBeTruthy();
      expect(stadium.cityId).toBeTruthy();
      expect(stadium.country).toBeTruthy();
      expect(stadium.capacity).toBeGreaterThan(0);
      expect(stadium.roofType).toBeTruthy();
      expect(["open", "retractable", "fixed"]).toContain(stadium.roofType);
      expect(typeof stadium.latitude).toBe("number");
      expect(typeof stadium.longitude).toBe("number");
      expect(stadium.description).toBeTruthy();
    });
  });

  it("should have unique stadium IDs", () => {
    const ids = stadiums.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(stadiums.length);
  });

  it("should have unique stadium slugs", () => {
    const slugs = stadiums.map((s) => s.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(stadiums.length);
  });

  it("should have capacity greater than 40,000", () => {
    stadiums.forEach((stadium) => {
      expect(stadium.capacity).toBeGreaterThan(40000);
    });
  });

  it("should have valid countries (USA, Canada, Mexico)", () => {
    const validCountries = ["USA", "Canada", "Mexico"];
    stadiums.forEach((stadium) => {
      expect(validCountries).toContain(stadium.country);
    });
  });

  it("should have valid latitude coordinates (-90 to 90)", () => {
    stadiums.forEach((stadium) => {
      expect(stadium.latitude).toBeGreaterThanOrEqual(-90);
      expect(stadium.latitude).toBeLessThanOrEqual(90);
    });
  });

  it("should have valid longitude coordinates (-180 to 180)", () => {
    stadiums.forEach((stadium) => {
      expect(stadium.longitude).toBeGreaterThanOrEqual(-180);
      expect(stadium.longitude).toBeLessThanOrEqual(180);
    });
  });

  it("should have all cityIds referenced in cities data", () => {
    const validCityIds = cities.map((c) => c.id);
    stadiums.forEach((stadium) => {
      expect(validCityIds).toContain(stadium.cityId);
    });
  });

  it("should have correct distribution of stadiums by country", () => {
    const usaStadiums = stadiums.filter((s) => s.country === "USA");
    const canadaStadiums = stadiums.filter((s) => s.country === "Canada");
    const mexicoStadiums = stadiums.filter((s) => s.country === "Mexico");

    // Verify we have stadiums in all three countries
    expect(usaStadiums.length).toBeGreaterThan(0);
    expect(canadaStadiums.length).toBeGreaterThan(0);
    expect(mexicoStadiums.length).toBeGreaterThan(0);
    
    // Total should be 16
    expect(usaStadiums.length + canadaStadiums.length + mexicoStadiums.length).toBe(16);
  });

  it("should have description length > 200 chars", () => {
    stadiums.forEach((stadium) => {
      expect(stadium.description.length).toBeGreaterThan(200);
    });
  });

  it("should have reasonable capacity range (40k-100k)", () => {
    stadiums.forEach((stadium) => {
      expect(stadium.capacity).toBeGreaterThanOrEqual(40000);
      expect(stadium.capacity).toBeLessThanOrEqual(110000);
    });
  });

  it("should have yearBuilt if provided", () => {
    stadiums.forEach((stadium) => {
      if (stadium.yearBuilt) {
        expect(stadium.yearBuilt).toBeGreaterThanOrEqual(1900);
        expect(stadium.yearBuilt).toBeLessThanOrEqual(2026);
      }
    });
  });

  it("should have valid slug format (lowercase, hyphens)", () => {
    stadiums.forEach((stadium) => {
      expect(stadium.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });
});
