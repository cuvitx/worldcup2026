import { describe, it, expect } from "vitest";
import { groups, groupsByLetter, groupsBySlug } from "../src/groups";

describe("Groups Data", () => {
  it("should have exactly 12 groups", () => {
    expect(groups).toHaveLength(12);
  });

  it("should have all required fields for each group", () => {
    groups.forEach((group) => {
      expect(group.letter).toBeTruthy();
      expect(group.slug).toBeTruthy();
      expect(Array.isArray(group.teams)).toBe(true);
      expect(group.teams.length).toBe(4);
    });
  });

  it("should have groups labeled A through L", () => {
    const expectedLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    const actualLetters = groups.map((g) => g.letter).sort();
    expect(actualLetters).toEqual(expectedLetters);
  });

  it("should have unique group letters", () => {
    const letters = groups.map((g) => g.letter);
    const uniqueLetters = new Set(letters);
    expect(uniqueLetters.size).toBe(groups.length);
  });

  it("should have unique group slugs", () => {
    const slugs = groups.map((g) => g.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(groups.length);
  });

  it("should have exactly 4 teams per group", () => {
    groups.forEach((group) => {
      expect(group.teams).toHaveLength(4);
    });
  });

  it("should have total of 48 teams across all groups", () => {
    const allTeamIds = groups.flatMap((g) => g.teams);
    expect(allTeamIds).toHaveLength(48);
  });

  it("should have unique team IDs across all groups", () => {
    const allTeamIds = groups.flatMap((g) => g.teams);
    const uniqueTeamIds = new Set(allTeamIds);
    expect(uniqueTeamIds.size).toBe(48);
  });

  it("should have slug match lowercase letter", () => {
    groups.forEach((group) => {
      expect(group.slug).toBe(group.letter.toLowerCase());
    });
  });

  it("should have groupsByLetter helper with all 12 groups", () => {
    expect(Object.keys(groupsByLetter)).toHaveLength(12);
    groups.forEach((group) => {
      expect(groupsByLetter[group.letter]).toEqual(group);
    });
  });

  it("should have groupsBySlug helper with all 12 groups", () => {
    expect(Object.keys(groupsBySlug)).toHaveLength(12);
    groups.forEach((group) => {
      expect(groupsBySlug[group.slug]).toEqual(group);
    });
  });

  it("should have all team IDs as non-empty strings", () => {
    groups.forEach((group) => {
      group.teams.forEach((teamId) => {
        expect(typeof teamId).toBe("string");
        expect(teamId.length).toBeGreaterThan(0);
      });
    });
  });

  it("should have valid slug format (single lowercase letter)", () => {
    groups.forEach((group) => {
      expect(group.slug).toMatch(/^[a-l]$/);
    });
  });
});
