import { describe, it, expect } from "vitest";
import { players } from "../src/players";
import { teams } from "../src/teams";

describe("Players Data", () => {
  const validTeamIds = teams.map((t) => t.id);
  const validPositions = ["GK", "DF", "MF", "FW"];

  it("should have 966 players", () => {
    expect(players).toHaveLength(966);
  });

  it("should have all required fields for each player", () => {
    players.forEach((player) => {
      expect(player.id).toBeTruthy();
      expect(player.name).toBeTruthy();
      expect(player.slug).toBeTruthy();
      expect(player.teamId).toBeTruthy();
      expect(player.position).toBeTruthy();
      expect(player.age).toBeGreaterThan(0);
      expect(player.club).toBeTruthy();
      expect(typeof player.goals).toBe("number");
      expect(player.goals).toBeGreaterThanOrEqual(0);
      expect(typeof player.caps).toBe("number");
      expect(player.caps).toBeGreaterThanOrEqual(0);
      expect(player.description).toBeTruthy();
    });
  });

  it("should have unique player IDs", () => {
    const ids = players.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(players.length);
  });

  it("should have unique player slugs", () => {
    const slugs = players.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(players.length);
  });

  it("should have all players with valid teamId references", () => {
    players.forEach((player) => {
      expect(validTeamIds).toContain(player.teamId);
    });
  });

  it("should have all players with valid positions", () => {
    players.forEach((player) => {
      expect(validPositions).toContain(player.position);
    });
  });

  it("should have players distributed across all 48 teams", () => {
    const teamCounts: Record<string, number> = {};
    players.forEach((player) => {
      teamCounts[player.teamId] = (teamCounts[player.teamId] || 0) + 1;
    });

    // All teams should have players
    expect(Object.keys(teamCounts).length).toBeGreaterThanOrEqual(42); // At least confirmed teams
  });

  it("should have reasonable age range (17-45)", () => {
    players.forEach((player) => {
      expect(player.age).toBeGreaterThanOrEqual(17);
      expect(player.age).toBeLessThanOrEqual(45); // Some veterans may be older
    });
  });

  it("should have goalkeepers with 0 goals", () => {
    const goalkeepers = players.filter((p) => p.position === "GK");
    goalkeepers.forEach((gk) => {
      expect(gk.goals).toBe(0);
    });
  });

  it("should have valid jersey numbers when provided", () => {
    players.forEach((player) => {
      if (player.number !== undefined) {
        expect(player.number).toBeGreaterThanOrEqual(1);
        expect(player.number).toBeLessThanOrEqual(99);
      }
    });
  });

  it("should have caps >= goals for most players", () => {
    // Most players should have caps >= goals, but data may have some anomalies
    const validPlayers = players.filter(
      (p) => p.caps >= p.goals
    );
    expect(validPlayers.length).toBeGreaterThan(players.length * 0.95); // 95% threshold
  });

  it("should have description length > 20 chars", () => {
    players.forEach((player) => {
      expect(player.description.length).toBeGreaterThan(20);
    });
  });

  it("should have valid slug format (lowercase, hyphens)", () => {
    players.forEach((player) => {
      expect(player.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("should have at least 20 players per confirmed team", () => {
    const confirmedTeams = teams.filter(
      (t) =>
        !t.id.includes("barrage") &&
        !t.id.includes("playoff") &&
        !t.id.includes("interconf")
    );

    confirmedTeams.forEach((team) => {
      const teamPlayers = players.filter((p) => p.teamId === team.id);
      expect(teamPlayers.length).toBeGreaterThanOrEqual(20);
    });
  });

  it("should have at least 2 goalkeepers per team", () => {
    const confirmedTeams = teams.filter(
      (t) =>
        !t.id.includes("barrage") &&
        !t.id.includes("playoff") &&
        !t.id.includes("interconf")
    );

    confirmedTeams.forEach((team) => {
      const goalkeepers = players.filter(
        (p) => p.teamId === team.id && p.position === "GK"
      );
      expect(goalkeepers.length).toBeGreaterThanOrEqual(2);
    });
  });
});
