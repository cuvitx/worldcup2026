import { describe, it, expect } from "vitest";
import { teamPredictions } from "../src/predictions";
import { teams } from "../src/teams";

describe("Predictions Data", () => {
  it("should have predictions for at least 42 teams (confirmed teams)", () => {
    expect(teamPredictions.length).toBeGreaterThanOrEqual(42);
  });

  it("should have all required fields for each prediction", () => {
    teamPredictions.forEach((pred) => {
      expect(pred.teamId).toBeTruthy();
      expect(typeof pred.eloRating).toBe("number");
      expect(typeof pred.groupStageProb).toBe("number");
      expect(typeof pred.roundOf32Prob).toBe("number");
      expect(typeof pred.roundOf16Prob).toBe("number");
      expect(typeof pred.quarterFinalProb).toBe("number");
      expect(typeof pred.semiFinalProb).toBe("number");
      expect(typeof pred.finalProb).toBe("number");
      expect(typeof pred.winnerProb).toBe("number");
    });
  });

  it("should have all probabilities between 0 and 1", () => {
    teamPredictions.forEach((pred) => {
      expect(pred.groupStageProb).toBeGreaterThanOrEqual(0);
      expect(pred.groupStageProb).toBeLessThanOrEqual(1);

      expect(pred.roundOf32Prob).toBeGreaterThanOrEqual(0);
      expect(pred.roundOf32Prob).toBeLessThanOrEqual(1);

      expect(pred.roundOf16Prob).toBeGreaterThanOrEqual(0);
      expect(pred.roundOf16Prob).toBeLessThanOrEqual(1);

      expect(pred.quarterFinalProb).toBeGreaterThanOrEqual(0);
      expect(pred.quarterFinalProb).toBeLessThanOrEqual(1);

      expect(pred.semiFinalProb).toBeGreaterThanOrEqual(0);
      expect(pred.semiFinalProb).toBeLessThanOrEqual(1);

      expect(pred.finalProb).toBeGreaterThanOrEqual(0);
      expect(pred.finalProb).toBeLessThanOrEqual(1);

      expect(pred.winnerProb).toBeGreaterThanOrEqual(0);
      expect(pred.winnerProb).toBeLessThanOrEqual(1);
    });
  });

  it("should have probabilities in decreasing order (groupStage > roundOf32 > ... > winner)", () => {
    teamPredictions.forEach((pred) => {
      expect(pred.groupStageProb).toBeGreaterThanOrEqual(pred.roundOf32Prob);
      expect(pred.roundOf32Prob).toBeGreaterThanOrEqual(pred.roundOf16Prob);
      expect(pred.roundOf16Prob).toBeGreaterThanOrEqual(pred.quarterFinalProb);
      expect(pred.quarterFinalProb).toBeGreaterThanOrEqual(pred.semiFinalProb);
      expect(pred.semiFinalProb).toBeGreaterThanOrEqual(pred.finalProb);
      expect(pred.finalProb).toBeGreaterThanOrEqual(pred.winnerProb);
    });
  });

  it("should have sum of all winnerProb approximately equal to 1", () => {
    const sumWinnerProb = teamPredictions.reduce(
      (sum, pred) => sum + pred.winnerProb,
      0
    );
    expect(sumWinnerProb).toBeGreaterThan(0.95);
    expect(sumWinnerProb).toBeLessThan(1.05);
  });

  it("should have ELO ratings between 1400 and 2200", () => {
    teamPredictions.forEach((pred) => {
      expect(pred.eloRating).toBeGreaterThanOrEqual(1400);
      expect(pred.eloRating).toBeLessThanOrEqual(2200);
    });
  });

  it("should have unique team IDs", () => {
    const teamIds = teamPredictions.map((p) => p.teamId);
    const uniqueTeamIds = new Set(teamIds);
    expect(uniqueTeamIds.size).toBe(teamPredictions.length);
  });

  it("should have all predicted teams exist in teams data", () => {
    const validTeamIds = teams.map((t) => t.id);
    teamPredictions.forEach((pred) => {
      expect(validTeamIds).toContain(pred.teamId);
    });
  });

  it("should have higher ELO = higher winner probability (top 10)", () => {
    const sortedByElo = [...teamPredictions].sort(
      (a, b) => b.eloRating - a.eloRating
    );
    const sortedByWinner = [...teamPredictions].sort(
      (a, b) => b.winnerProb - a.winnerProb
    );

    // Top 10 by ELO should overlap significantly with top 10 by winner prob
    const top10Elo = sortedByElo.slice(0, 10).map((p) => p.teamId);
    const top10Winner = sortedByWinner.slice(0, 10).map((p) => p.teamId);

    const overlap = top10Elo.filter((id) => top10Winner.includes(id));
    expect(overlap.length).toBeGreaterThanOrEqual(7); // At least 7/10 overlap
  });

  it("should have at least one team with > 10% winner probability", () => {
    const highWinnerProbs = teamPredictions.filter((p) => p.winnerProb > 0.1);
    expect(highWinnerProbs.length).toBeGreaterThanOrEqual(1);
  });
});
