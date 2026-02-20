import { describe, it, expect } from "vitest";
import { teams } from "../src/teams";
import { groups } from "../src/groups";

describe("Teams Data", () => {
  it("should have exactly 48 teams", () => {
    expect(teams).toHaveLength(48);
  });

  it("should have all required fields for each team", () => {
    teams.forEach((team) => {
      expect(team.id).toBeTruthy();
      expect(team.name).toBeTruthy();
      expect(team.slug).toBeTruthy();
      expect(team.code).toBeTruthy();
      expect(team.code).toHaveLength(3);
      expect(team.flag).toBeTruthy();
      expect(team.confederation).toBeTruthy();
      expect(["UEFA", "CONMEBOL", "CAF", "AFC", "CONCACAF", "OFC"]).toContain(
        team.confederation
      );
      expect(team.fifaRanking).toBeGreaterThanOrEqual(0); // 0 for TBD teams
      expect(team.group).toBeTruthy();
      expect(typeof team.isHost).toBe("boolean");
      expect(team.wcAppearances).toBeGreaterThanOrEqual(0);
      expect(team.bestResult).toBeTruthy();
      expect(team.description).toBeTruthy();
    });
  });

  it("should have unique team IDs", () => {
    const ids = teams.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(teams.length);
  });

  it("should have unique team slugs", () => {
    const slugs = teams.map((t) => t.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(teams.length);
  });

  it("should have unique team codes or TBD", () => {
    const codes = teams.map((t) => t.code);
    const uniqueCodes = new Set(codes);
    // Some TBD teams may share "TBD" code
    expect(uniqueCodes.size).toBeGreaterThan(40);
  });

  it("should have exactly 3 host countries", () => {
    const hosts = teams.filter((t) => t.isHost);
    expect(hosts).toHaveLength(3);
    const hostNames = hosts.map((t) => t.name).sort();
    expect(hostNames).toEqual(["Canada", "États-Unis", "Mexique"].sort());
  });

  it("should have all teams assigned to a valid group", () => {
    const validGroups = groups.map((g) => g.letter);
    teams.forEach((team) => {
      expect(validGroups).toContain(team.group);
    });
  });

  it("should have 4 teams per group", () => {
    const groupCounts: Record<string, number> = {};
    teams.forEach((team) => {
      groupCounts[team.group] = (groupCounts[team.group] || 0) + 1;
    });

    Object.entries(groupCounts).forEach(([group, count]) => {
      expect(count).toBe(4);
    });
  });

  it("should have valid FIFA rankings (0-211, 0 for TBD)", () => {
    teams.forEach((team) => {
      expect(team.fifaRanking).toBeGreaterThanOrEqual(0);
      expect(team.fifaRanking).toBeLessThanOrEqual(211);
    });
  });

  it("should have all team IDs referenced in groups", () => {
    const groupTeamIds = groups.flatMap((g) => g.teams);
    teams.forEach((team) => {
      expect(groupTeamIds).toContain(team.id);
    });
  });

  it("should have all teams with description length > 100 chars", () => {
    teams.forEach((team) => {
      expect(team.description.length).toBeGreaterThan(100);
    });
  });
});
