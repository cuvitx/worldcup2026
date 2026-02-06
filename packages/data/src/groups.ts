import type { Group } from "./types";

// Groups from the official FIFA World Cup 2026 draw (December 5, 2025, Washington D.C.)
// Note: 6 playoff spots (4 UEFA paths + 2 inter-confederation) will be determined in March 2026.
export const groups: Group[] = [
  {
    letter: "A",
    slug: "a",
    teams: ["mexique", "afrique-du-sud", "coree-du-sud", "barrage-uefa-d"],
  },
  {
    letter: "B",
    slug: "b",
    teams: ["canada", "suisse", "qatar", "barrage-uefa-a"],
  },
  {
    letter: "C",
    slug: "c",
    teams: ["bresil", "maroc", "ecosse", "haiti"],
  },
  {
    letter: "D",
    slug: "d",
    teams: ["etats-unis", "paraguay", "australie", "barrage-uefa-c"],
  },
  {
    letter: "E",
    slug: "e",
    teams: ["allemagne", "equateur", "cote-divoire", "curacao"],
  },
  {
    letter: "F",
    slug: "f",
    teams: ["pays-bas", "japon", "tunisie", "barrage-uefa-b"],
  },
  {
    letter: "G",
    slug: "g",
    teams: ["belgique", "iran", "egypte", "nouvelle-zelande"],
  },
  {
    letter: "H",
    slug: "h",
    teams: ["espagne", "uruguay", "arabie-saoudite", "cap-vert"],
  },
  {
    letter: "I",
    slug: "i",
    teams: ["france", "senegal", "norvege", "barrage-interconf-2"],
  },
  {
    letter: "J",
    slug: "j",
    teams: ["argentine", "autriche", "algerie", "jordanie"],
  },
  {
    letter: "K",
    slug: "k",
    teams: ["portugal", "colombie", "ouzbekistan", "barrage-interconf-1"],
  },
  {
    letter: "L",
    slug: "l",
    teams: ["angleterre", "croatie", "ghana", "panama"],
  },
];

export const groupsByLetter: Record<string, Group> = Object.fromEntries(
  groups.map((g) => [g.letter, g])
);

export const groupsBySlug: Record<string, Group> = Object.fromEntries(
  groups.map((g) => [g.slug, g])
);
