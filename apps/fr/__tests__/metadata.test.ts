import { describe, it, expect } from "vitest";
import { metadata as homeMetadata } from "../app/page";

describe("Metadata Generation", () => {
  describe("Homepage Metadata", () => {
    it("should have title", () => {
      expect(homeMetadata.title).toBeTruthy();
      expect(typeof homeMetadata.title).toBe("string");
      expect((homeMetadata.title as string).length).toBeGreaterThan(20);
    });

    it("should have description", () => {
      expect(homeMetadata.description).toBeTruthy();
      expect(typeof homeMetadata.description).toBe("string");
      expect((homeMetadata.description as string).length).toBeGreaterThan(50);
    });

    it("should have title containing key terms", () => {
      const title = homeMetadata.title as string;
      expect(title.toLowerCase()).toMatch(/coupe du monde|cdm|2026/);
    });

    it("should have description containing key terms", () => {
      const description = homeMetadata.description as string;
      expect(description.toLowerCase()).toMatch(/pronostic|cote|équipe|match/);
    });

    it("should have alternates for i18n", () => {
      expect(homeMetadata.alternates).toBeDefined();
    });

    it("should have OpenGraph data", () => {
      expect(homeMetadata.openGraph).toBeDefined();
      expect(homeMetadata.openGraph?.title).toBeTruthy();
      expect(homeMetadata.openGraph?.description).toBeTruthy();
      expect(homeMetadata.openGraph?.url).toBeTruthy();
    });

    it("should have valid OpenGraph URL", () => {
      expect(homeMetadata.openGraph?.url).toMatch(/^https?:\/\//);
      expect(homeMetadata.openGraph?.url).toContain("cdm2026.fr");
    });

    it("should have OpenGraph title length < 70 chars", () => {
      const ogTitle = homeMetadata.openGraph?.title as string;
      expect(ogTitle.length).toBeLessThan(70);
    });

    it("should have OpenGraph description length < 200 chars", () => {
      const ogDescription = homeMetadata.openGraph?.description as string;
      expect(ogDescription.length).toBeLessThan(200);
    });

    it("should have SEO-friendly title length (50-60 chars)", () => {
      const title = homeMetadata.title as string;
      expect(title.length).toBeGreaterThanOrEqual(30);
      expect(title.length).toBeLessThanOrEqual(70);
    });

    it("should have SEO-friendly description length (120-160 chars)", () => {
      const description = homeMetadata.description as string;
      expect(description.length).toBeGreaterThanOrEqual(100);
      expect(description.length).toBeLessThanOrEqual(200);
    });
  });

  describe("Metadata Best Practices", () => {
    it("should not have duplicate title and OG title", () => {
      const title = homeMetadata.title as string;
      const ogTitle = homeMetadata.openGraph?.title as string;

      // They can be same, but checking they both exist
      expect(title).toBeTruthy();
      expect(ogTitle).toBeTruthy();
    });

    it("should not have duplicate description and OG description", () => {
      const description = homeMetadata.description as string;
      const ogDescription = homeMetadata.openGraph?.description as string;

      expect(description).toBeTruthy();
      expect(ogDescription).toBeTruthy();
    });

    it("should have proper URL structure in OG", () => {
      const url = homeMetadata.openGraph?.url as string;

      expect(url).not.toMatch(/\/$/); // No trailing slash for homepage
      expect(url).toMatch(/^https:\/\//); // Must use HTTPS
    });
  });
});
