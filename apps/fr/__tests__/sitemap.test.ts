import sitemap from "../app/sitemap";

describe("sitemap", () => {
  it("should return a non-empty array", () => {
    const entries = sitemap();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it("all entries should have a valid url", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/www\.cdm2026\.fr/);
    }
  });

  it("should include homepage with priority 1.0", () => {
    const entries = sitemap();
    const home = entries.find((e) => e.url === "https://www.cdm2026.fr");
    expect(home).toBeDefined();
    expect(home?.priority).toBe(1.0);
  });
});
