import { describe, it, expect } from "vitest";
import { localizeTeam, localizeTeams, registerTeamTranslations } from "../src/i18n";
import { teams } from "../src/teams";
import { teamsDE } from "../src/translations/teams.de";

// Register DE translations for testing
registerTeamTranslations("de", teamsDE);

const france = teams.find((t) => t.id === "france")!;
const allemagne = teams.find((t) => t.id === "allemagne")!;

describe("i18n", () => {
  describe("localizeTeam", () => {
    it("returns original team for FR", () => {
      const result = localizeTeam(france, "fr");
      expect(result).toBe(france); // same reference, no copy
      expect(result.name).toBe("France");
    });

    it("returns translated name for DE", () => {
      const result = localizeTeam(france, "de");
      expect(result.name).toBe("Frankreich");
      expect(result.bestResult).toBe("Weltmeister (1998, 2018)");
      // Non-translated fields preserved
      expect(result.id).toBe("france");
      expect(result.slug).toBe("france");
      expect(result.flag).toBe(france.flag);
    });

    it("translates Deutschland correctly", () => {
      const result = localizeTeam(allemagne, "de");
      expect(result.name).toBe("Deutschland");
      expect(result.bestResult).toBe("Weltmeister (1954, 1974, 1990, 2014)");
    });

    it("does not mutate original team object", () => {
      localizeTeam(france, "de");
      expect(france.name).toBe("France");
    });
  });

  describe("localizeTeams", () => {
    it("returns original array for FR", () => {
      const result = localizeTeams(teams, "fr");
      expect(result).toBe(teams); // same reference
    });

    it("translates all teams for DE", () => {
      const result = localizeTeams(teams, "de");
      const de = result.find((t) => t.id === "allemagne");
      expect(de?.name).toBe("Deutschland");
    });
  });
});
