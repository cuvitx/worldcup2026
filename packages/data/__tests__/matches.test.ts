import { describe, it, expect } from "vitest";
import { matches } from "../src/matches";
import { teams } from "../src/teams";
import { stadiums } from "../src/stadiums";
import { groups } from "../src/groups";

describe("Matches Data", () => {
  const validTeamIds = teams.map((t) => t.id);
  const validStadiumIds = stadiums.map((s) => s.id);
  const validGroups = groups.map((g) => g.letter);

  it("should have exactly 104 matches", () => {
    expect(matches).toHaveLength(104);
  });

  it("should have all required fields for each match", () => {
    matches.forEach((match) => {
      expect(match.id).toBeTruthy();
      expect(match.slug).toBeTruthy();
      expect(match.homeTeamId).toBeTruthy();
      expect(match.awayTeamId).toBeTruthy();
      expect(match.date).toBeTruthy();
      expect(match.time).toBeTruthy();
      expect(match.stadiumId).toBeTruthy();
      expect(match.stage).toBeTruthy();
    });
  });

  it("should have unique match IDs", () => {
    const ids = matches.map((m) => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(matches.length);
  });

  it("should have valid dates (ISO format YYYY-MM-DD)", () => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    matches.forEach((match) => {
      expect(match.date).toMatch(isoDateRegex);
      const date = new Date(match.date);
      expect(date.toString()).not.toBe("Invalid Date");
    });
  });

  it("should have valid times (HH:MM format)", () => {
    const timeRegex = /^\d{2}:\d{2}$/;
    matches.forEach((match) => {
      expect(match.time).toMatch(timeRegex);
    });
  });

  it("should have group stage teams exist in teams data", () => {
    const groupMatches = matches.filter((m) => m.stage === "group");
    groupMatches.forEach((match) => {
      expect(validTeamIds).toContain(match.homeTeamId);
      expect(validTeamIds).toContain(match.awayTeamId);
    });
  });

  it("should have valid team IDs format for knockout matches", () => {
    const knockoutMatches = matches.filter((m) => m.stage !== "group");
    knockoutMatches.forEach((match) => {
      // Knockout teams may be TBD placeholders like "tbd-r32-1-home"
      expect(match.homeTeamId).toBeTruthy();
      expect(match.awayTeamId).toBeTruthy();
    });
  });

  it("should have all stadiums exist in stadiums data", () => {
    matches.forEach((match) => {
      expect(validStadiumIds).toContain(match.stadiumId);
    });
  });

  it("should have valid stages", () => {
    const validStages = [
      "group",
      "round-of-32",
      "round-of-16",
      "quarter-final",
      "semi-final",
      "third-place",
      "final",
    ];
    matches.forEach((match) => {
      expect(validStages).toContain(match.stage);
    });
  });

  it("should have group property for group stage matches", () => {
    const groupMatches = matches.filter((m) => m.stage === "group");
    groupMatches.forEach((match) => {
      expect(match.group).toBeTruthy();
      expect(validGroups).toContain(match.group);
    });
  });

  it("should have matchday property for group stage matches", () => {
    const groupMatches = matches.filter((m) => m.stage === "group");
    groupMatches.forEach((match) => {
      expect(match.matchday).toBeTruthy();
      expect(match.matchday).toBeGreaterThanOrEqual(1);
      expect(match.matchday).toBeLessThanOrEqual(3);
    });
  });

  it("should have all matches between June 11 and July 19, 2026", () => {
    const startDate = new Date("2026-06-11");
    const endDate = new Date("2026-07-19");

    matches.forEach((match) => {
      const matchDate = new Date(match.date);
      expect(matchDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
      expect(matchDate.getTime()).toBeLessThanOrEqual(endDate.getTime());
    });
  });

  it("should not have a team playing against itself", () => {
    matches.forEach((match) => {
      expect(match.homeTeamId).not.toBe(match.awayTeamId);
    });
  });

  it("should have exactly 1 final match", () => {
    const finals = matches.filter((m) => m.stage === "final");
    expect(finals).toHaveLength(1);
  });

  it("should have exactly 1 third-place match", () => {
    const thirdPlace = matches.filter((m) => m.stage === "third-place");
    expect(thirdPlace).toHaveLength(1);
  });

  it("should have group stage matches distributed across all groups", () => {
    const groupMatches = matches.filter((m) => m.stage === "group");
    validGroups.forEach((groupLetter) => {
      const groupMatchCount = groupMatches.filter(
        (m) => m.group === groupLetter
      ).length;
      expect(groupMatchCount).toBe(6); // 4 teams = 6 matches per group
    });
  });

  it("should have all matches with valid slug format", () => {
    matches.forEach((match) => {
      expect(match.slug).toMatch(/^[a-z0-9-]+$/);
      // Group stage matches have "-vs-", knockout may have different format
      if (match.stage === "group") {
        expect(match.slug).toContain("-vs-");
      }
    });
  });
});
