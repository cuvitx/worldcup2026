import type { MetadataRoute } from "next";
import { teams } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { groups } from "@repo/data/groups";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { players } from "@repo/data/players";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
import { bookmakers } from "@repo/data/bookmakers";
import { guides } from "@repo/data/guides";
import { getAllArticles } from "../lib/mdx";

const BASE_URL = "https://www.cdm2026.fr";

// Fixed recent date for semi-static content
const STATIC_DATE = "2026-05-01T00:00:00.000Z";

type SitemapEntry = MetadataRoute.Sitemap[number];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function entry(
  path: string,
  opts: {
    changeFrequency?: SitemapEntry["changeFrequency"];
    priority?: number;
    lastModified?: string | Date;
  } = {},
): SitemapEntry {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: opts.lastModified ?? STATIC_DATE,
    changeFrequency: opts.changeFrequency ?? "weekly",
    priority: opts.priority ?? 0.7,
  };
}

// Group-stage match slugs only (for per-match sub-pages like pronostic-match, compos, etc.)
const groupStageMatches = matches.filter((m) => m.stage === "group");
const allMatchSlugs = matches.map((m) => m.slug);
const groupMatchSlugs = groupStageMatches.map((m) => m.slug);
const teamSlugs = teams.map((t) => t.slug);
const groupSlugs = groups.map((g) => g.slug);
const stadiumSlugs = stadiums.map((s) => s.slug);
const citySlugs = cities.map((c) => c.slug);
const playerSlugs = players.map((p) => p.slug);
const bookmakerReviewSlugs = bookmakerReviews.map((b) => b.slug);
const guideSlugs = guides.map((g) => g.slug);
const bookmakerBonusSlugs = bookmakers
  .filter((b) => b.bonusUrl)
  .map((b) => b.bonusUrl.replace("/bonus/", ""));

// Historical confrontation slugs (fixed list of classic matchups)
const confrontationSlugs = [
  "allemagne-vs-bresil",
  "allemagne-vs-italie",
  "allemagne-vs-pays-bas",
  "angleterre-vs-allemagne",
  "angleterre-vs-argentine",
  "angleterre-vs-france",
  "argentine-vs-allemagne",
  "argentine-vs-angleterre",
  "argentine-vs-bresil",
  "bresil-vs-allemagne",
  "bresil-vs-angleterre",
  "bresil-vs-argentine",
  "bresil-vs-france",
  "bresil-vs-italie",
  "espagne-vs-allemagne",
  "espagne-vs-angleterre",
  "espagne-vs-italie",
  "france-vs-allemagne",
  "france-vs-argentine",
  "france-vs-bresil",
  "france-vs-espagne",
  "france-vs-italie",
  "france-vs-pays-bas",
  "france-vs-portugal",
  "italie-vs-angleterre",
  "pays-bas-vs-allemagne",
  "pays-bas-vs-argentine",
  "portugal-vs-espagne",
  "portugal-vs-france",
  "uruguay-vs-bresil",
];

// French cities for ecrans-geants (giant screens)
const ecransGeantsCities = [
  "angers",
  "bordeaux",
  "brest",
  "dijon",
  "grenoble",
  "le-havre",
  "lille",
  "lyon",
  "marseille",
  "metz",
  "montpellier",
  "nantes",
  "nice",
  "paris",
  "reims",
  "rennes",
  "saint-etienne",
  "strasbourg",
  "toulon",
  "toulouse",
];

// Referee slugs (fixed list)
const refereeSlugs = [
  "abdulrahman-al-jassim",
  "andres-matonte",
  "anthony-taylor",
  "antonio-mateu-lahoz",
  "bakary-gassama",
  "cesar-ramos",
  "chris-beath",
  "clement-turpin",
  "daniel-siebert",
  "daniele-orsato",
  "facundo-tello",
  "felix-brych",
  "fernando-rapallini",
  "francois-letexier",
  "halil-umut-meler",
  "ismail-elfath",
  "istvan-kovacs",
  "ivan-barton",
  "jesus-valenzuela",
  "kralovec-pavel",
  "ma-ning",
  "maguette-ndiaye",
  "mario-escobar",
  "matthew-conger",
  "michael-oliver",
  "mustapha-ghorbal",
  "nicholas-mohammed",
  "piero-maza",
  "raphael-claus",
  "said-martinez",
  "salima-mukansanga",
  "slavko-vincic",
  "szymon-marciniak",
  "victor-gomes",
  "wilton-sampaio",
  "yoshimi-yamashita",
];

// Number of tournament days for calendar pages
const TOURNAMENT_DAYS = 39;

// ---------------------------------------------------------------------------
// Sitemap generation
// ---------------------------------------------------------------------------

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [];

  // =====================================================================
  // 1. High-frequency pages (updated often, priority 0.9-1.0)
  // =====================================================================
  entries.push(
    entry("/", { changeFrequency: "daily", priority: 1, lastModified: now }),
    entry("/match/calendrier", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/match/aujourdhui", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/resultats", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/phase-finale", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/live", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/tableau", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/comparateur-cotes", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/actualites", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/buteurs", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/paris-sportifs", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/pronostic", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
    entry("/programme-tv", { changeFrequency: "daily", priority: 0.9, lastModified: now }),
  );

  // =====================================================================
  // 2. Main index pages (priority 0.9)
  // =====================================================================
  entries.push(
    entry("/equipe", { priority: 0.9 }),
    entry("/groupes", { priority: 0.9 }),
    entry("/joueurs", { priority: 0.9 }),
    entry("/stades", { priority: 0.9 }),
    entry("/villes", { priority: 0.9 }),
  );

  // =====================================================================
  // 3. Secondary index / tool pages (priority 0.8)
  // =====================================================================
  const secondaryPages = [
    "/simulateur",
    "/comparateur-joueurs",
    "/comparateur-equipes",
    "/statistiques",
    "/histoire",
    "/billets",
    "/ou-regarder",
    "/guides",
    "/voyage",
    "/meilleurs-bookmakers",
    "/bonus",
    "/pronostics/grille",
    "/pronostic/vainqueur",
    "/pronostic/btts",
    "/pronostic/over-under",
    "/pronostic/buteurs",
    "/pronostic/cartons",
    "/pronostic/clean-sheet",
    "/pronostic/scores-exacts",
    "/pronostic/finalistes",
    "/pronostic/tirs-au-but",
  ];
  for (const path of secondaryPages) {
    entries.push(entry(path, { priority: 0.8 }));
  }

  // =====================================================================
  // 4. Tertiary pages (priority 0.7)
  // =====================================================================
  const tertiaryPages = [
    "/palmares",
    "/faq",
    "/quiz",
    "/guide/glossaire",
    "/carte-stades",
    "/fan-zones",
    "/arbitres",
    "/h2h",
    "/methodes-paiement",
    "/pronostics/leaderboard",
    "/newsletter",
    "/recherche",
  ];
  for (const path of tertiaryPages) {
    entries.push(entry(path, { priority: 0.7 }));
  }

  // Paris sportifs sub-pages (priority 0.7)
  const parisSportifsPages = [
    "corners",
    "handicap",
    "live",
    "mi-temps",
    "combines",
    "bankroll",
    "value-bets",
    "lexique",
    "cashout",
    "strategie",
    "guide",
    "dark-horses",
    "ballon-or",
  ];
  for (const slug of parisSportifsPages) {
    entries.push(entry(`/paris-sportifs/${slug}`, { priority: 0.7 }));
  }

  // Voyage sub-pages (priority 0.7)
  const voyagePages = [
    "esta-visa-usa",
    "visa-mexique",
    "formalites-canada",
    "vols-budget",
    "assurance",
    "carte-sim",
    "valise",
    "decalage-horaire",
    "pourboires",
    "supporter-francais",
    "wifi-stades",
    "alcool-stades",
    "hebergement",
    "securite",
  ];
  for (const slug of voyagePages) {
    entries.push(entry(`/voyage/${slug}`, { priority: 0.7 }));
  }

  // =====================================================================
  // 4b. Knockout stage overview pages (priority 0.8, daily)
  // =====================================================================
  const knockoutOverviewPages = [
    "/16emes-de-finale",
    "/8emes-de-finale",
    "/quarts-de-finale",
    "/demi-finales",
    "/finale",
    "/meilleurs-troisiemes",
  ];
  for (const path of knockoutOverviewPages) {
    entries.push(entry(path, { priority: 0.8, changeFrequency: "daily" }));
  }

  // =====================================================================
  // 4c. Informational content pages (priority 0.6, weekly)
  // =====================================================================
  const informationalPages = [
    "/format",
    "/reglement",
    "/classement-fifa",
    "/maillots",
    "/records",
    "/wall-of-fame",
    "/selections-listes",
    "/barrages",
    "/chants-supporters",
    "/mascotte",
    "/pays-hotes",
    "/blessures",
    "/confrontations-historiques",
    "/budget",
    "/regarder-cdm-au-travail",
    "/simulateur-bracket",
    "/calendrier/imprimer",
    "/trophee",
  ];
  for (const path of informationalPages) {
    entries.push(entry(path, { priority: 0.6, changeFrequency: "weekly" }));
  }

  // =====================================================================
  // 5. Footer / legal pages (priority 0.2-0.3)
  // =====================================================================
  entries.push(
    entry("/plan-du-site", { changeFrequency: "monthly", priority: 0.3 }),
    entry("/a-propos", { changeFrequency: "monthly", priority: 0.3 }),
    entry("/contact", { changeFrequency: "monthly", priority: 0.3 }),
    entry("/jeu-responsable", { changeFrequency: "monthly", priority: 0.3 }),
    entry("/equipe-editoriale", { changeFrequency: "monthly", priority: 0.3 }),
    entry("/methodologie", { changeFrequency: "monthly", priority: 0.3 }),
    entry("/mentions-legales", { changeFrequency: "monthly", priority: 0.2 }),
    entry("/politique-de-confidentialite", { changeFrequency: "monthly", priority: 0.2 }),
  );

  // =====================================================================
  // 6. Team pages — /equipe/{slug}, /effectif/{slug}, /parier/{slug},
  //    /cote-champion/{slug}, /pronostic/{slug},
  //    /scenarios-qualification-equipe/{slug}
  // =====================================================================
  for (const slug of teamSlugs) {
    entries.push(
      entry(`/equipe/${slug}`, { priority: 0.9 }),
      entry(`/effectif/${slug}`, { priority: 0.8 }),
      entry(`/parier/${slug}`, { priority: 0.8 }),
      entry(`/cote-champion/${slug}`, { priority: 0.8 }),
      entry(`/pronostic/${slug}`, { priority: 0.9 }),
      entry(`/scenarios-qualification-equipe/${slug}`, { priority: 0.7 }),
    );
  }

  // =====================================================================
  // 7. Group pages — /groupe/{slug}, /pronostic-groupe/{slug},
  //    /scenarios-qualification/{slug}, /joueurs/groupe/{slug}
  // =====================================================================
  for (const slug of groupSlugs) {
    entries.push(
      entry(`/groupe/${slug}`, { priority: 0.9 }),
      entry(`/pronostic-groupe/${slug}`, { priority: 0.8 }),
      entry(`/scenarios-qualification/${slug}`, { priority: 0.7 }),
      entry(`/joueurs/groupe/${slug}`, { priority: 0.7 }),
    );
  }

  // =====================================================================
  // 8. Players by team — /joueurs/equipe/{slug}
  // =====================================================================
  for (const slug of teamSlugs) {
    entries.push(entry(`/joueurs/equipe/${slug}`, { priority: 0.7 }));
  }

  // =====================================================================
  // 9. Match pages — /match/{slug} (all 104 matches)
  // =====================================================================
  for (const slug of allMatchSlugs) {
    entries.push(entry(`/match/${slug}`, { priority: 0.8, changeFrequency: "daily" }));
  }

  // =====================================================================
  // 10. Match sub-pages (group stage only):
  //     /pronostic-match/{slug}, /compos-officielles/{slug},
  //     /sur-quelle-chaine/{slug}, /score-exact/{slug},
  //     /arbitre/{slug}, /corners/{slug}, /hors-jeu/{slug},
  //     /possession/{slug}
  // =====================================================================
  for (const slug of groupMatchSlugs) {
    entries.push(
      entry(`/pronostic-match/${slug}`, { priority: 0.8 }),
      entry(`/compos-officielles/${slug}`, { priority: 0.7 }),
      entry(`/sur-quelle-chaine/${slug}`, { priority: 0.7 }),
      entry(`/score-exact/${slug}`, { priority: 0.7 }),
      entry(`/arbitre/${slug}`, { priority: 0.6 }),
      entry(`/corners/${slug}`, { priority: 0.6 }),
      entry(`/hors-jeu/${slug}`, { priority: 0.6 }),
      entry(`/possession/${slug}`, { priority: 0.6 }),
    );
  }

  // Knockout stage match sub-pages (less detailed)
  const knockoutMatches = matches.filter((m) => m.stage !== "group");
  for (const m of knockoutMatches) {
    entries.push(
      entry(`/pronostic-match/${m.slug}`, { priority: 0.7 }),
      entry(`/compos-officielles/${m.slug}`, { priority: 0.6 }),
      entry(`/sur-quelle-chaine/${m.slug}`, { priority: 0.6 }),
      entry(`/arbitre/${m.slug}`, { priority: 0.5 }),
    );
  }

  // =====================================================================
  // 11. Stadium pages — /stade/{slug}
  // =====================================================================
  for (const slug of stadiumSlugs) {
    entries.push(entry(`/stade/${slug}`, { priority: 0.8 }));
  }

  // =====================================================================
  // 12. City pages — /ville/{slug} + sub-pages
  //     /guide-supporter/{slug}, /meteo/{slug}, /hebergement/{slug},
  //     /transport/{slug}, /fan-zone/{slug}, /securite/{slug}
  // =====================================================================
  for (const slug of citySlugs) {
    entries.push(
      entry(`/ville/${slug}`, { priority: 0.8 }),
      entry(`/guide-supporter/${slug}`, { priority: 0.7 }),
      entry(`/meteo/${slug}`, { priority: 0.6 }),
      entry(`/hebergement/${slug}`, { priority: 0.6 }),
      entry(`/transport/${slug}`, { priority: 0.6 }),
      entry(`/fan-zone/${slug}`, { priority: 0.6 }),
      entry(`/securite/${slug}`, { priority: 0.6 }),
    );
  }

  // =====================================================================
  // 13. Player pages — /joueur/{slug} + stat sub-pages
  //     /buteur/{slug}, /cote-buteur/{slug}, /cote-carton-jaune/{slug},
  //     /passes-decisives/{slug}, /tacles/{slug}, /tirs-cadres/{slug}
  // =====================================================================
  for (const slug of playerSlugs) {
    entries.push(
      entry(`/joueur/${slug}`, { priority: 0.7 }),
      entry(`/buteur/${slug}`, { priority: 0.6 }),
      entry(`/cote-buteur/${slug}`, { priority: 0.6 }),
      entry(`/cote-carton-jaune/${slug}`, { priority: 0.6 }),
      entry(`/passes-decisives/${slug}`, { priority: 0.6 }),
      entry(`/tacles/${slug}`, { priority: 0.6 }),
      entry(`/tirs-cadres/${slug}`, { priority: 0.6 }),
    );
  }

  // =====================================================================
  // 14. Editorial articles — /actualites/{slug}
  // =====================================================================
  for (const article of getAllArticles()) {
    entries.push(
      entry(`/actualites/${article.slug}`, {
        priority: 0.7,
        changeFrequency: "weekly",
        lastModified: new Date(article.date).toISOString(),
      }),
    );
  }

  // =====================================================================
  // 15. Bookmaker pages — /bookmaker/{slug}
  // =====================================================================
  for (const slug of bookmakerReviewSlugs) {
    entries.push(entry(`/bookmaker/${slug}`, { priority: 0.8 }));
  }

  // =====================================================================
  // 16. Bonus pages — /bonus/{slug}
  // =====================================================================
  for (const slug of bookmakerBonusSlugs) {
    entries.push(entry(`/bonus/${slug}`, { priority: 0.7 }));
  }

  // =====================================================================
  // 17. Guide pages — /guide/{slug}
  // =====================================================================
  for (const slug of guideSlugs) {
    entries.push(entry(`/guide/${slug}`, { priority: 0.7 }));
  }

  // =====================================================================
  // 18. Calendar day pages — /calendrier/jour-{n}
  // =====================================================================
  for (let day = 1; day <= TOURNAMENT_DAYS; day++) {
    entries.push(entry(`/calendrier/jour-${day}`, { priority: 0.6, changeFrequency: "daily" }));
  }

  // =====================================================================
  // 19. Historical confrontation pages — /confrontation/{slug}
  // =====================================================================
  for (const slug of confrontationSlugs) {
    entries.push(entry(`/confrontation/${slug}`, { priority: 0.7 }));
  }

  // =====================================================================
  // 20. H2H match pages — /h2h/{slug} (group-stage matchups)
  // =====================================================================
  for (const slug of groupMatchSlugs) {
    entries.push(entry(`/h2h/${slug}`, { priority: 0.6 }));
  }

  // =====================================================================
  // 21. Ecrans geants (French cities) — /ecrans-geants/{slug}
  // =====================================================================
  for (const slug of ecransGeantsCities) {
    entries.push(entry(`/ecrans-geants/${slug}`, { priority: 0.6 }));
  }

  // =====================================================================
  // 22. Referee stats pages — /statistiques-arbitre/{slug}
  // =====================================================================
  for (const slug of refereeSlugs) {
    entries.push(entry(`/statistiques-arbitre/${slug}`, { priority: 0.6 }));
  }

  return entries;
}
