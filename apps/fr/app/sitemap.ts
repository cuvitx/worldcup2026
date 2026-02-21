import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.cdm2026.fr";
const TODAY = new Date().toISOString();
const STATIC = "2026-02-21";

/* ── Safe data loaders ── */
function safeLoad<T>(fn: () => T, fallback: T): T {
  try { return fn(); } catch { return fallback; }
}

const teams = safeLoad(() => require("@repo/data/teams").teams as { slug: string }[], []);
const groups = safeLoad(() => require("@repo/data/groups").groups as { slug: string }[], []);
const stadiums = safeLoad(() => require("@repo/data/stadiums").stadiums as { slug: string }[], []);
const cities = safeLoad(() => require("@repo/data/cities").cities as { slug: string }[], []);
const players = safeLoad(() => require("@repo/data/players").players as { slug: string }[], []);
const matches = safeLoad(() => require("@repo/data/matches").matches as { slug: string; date: string }[], []);
const scorerPlayers = safeLoad(() => require("@repo/data/scorers").scorerPlayers as { slug: string }[], []);
const bookmakerReviews = safeLoad(() => require("@repo/data/bookmaker-reviews").bookmakerReviews as { slug: string }[], []);
const guides = safeLoad(() => require("@repo/data/guides").guides as { slug: string }[], []);
const newsArticles = safeLoad(() => require("@repo/data/news").newsArticles as { slug: string; date: string }[], []);

console.log(`[sitemap] teams=${teams.length} matches=${matches.length} players=${players.length} stadiums=${stadiums.length} cities=${cities.length} groups=${groups.length} guides=${guides.length} news=${newsArticles.length}`);

/* ── Inline slugs for pages not in @repo/data ── */
const CONFRONTATION_SLUGS = [
  "france-vs-bresil","argentine-vs-allemagne","bresil-vs-allemagne","france-vs-allemagne",
  "france-vs-italie","bresil-vs-argentine","angleterre-vs-allemagne","espagne-vs-italie",
  "france-vs-argentine","bresil-vs-france","allemagne-vs-italie","angleterre-vs-france",
  "pays-bas-vs-argentine","bresil-vs-angleterre","espagne-vs-allemagne","portugal-vs-espagne",
  "france-vs-espagne","allemagne-vs-pays-bas","argentine-vs-angleterre","bresil-vs-italie",
  "france-vs-portugal","uruguay-vs-bresil","argentine-vs-bresil","pays-bas-vs-allemagne",
  "angleterre-vs-argentine","france-vs-pays-bas","espagne-vs-angleterre","allemagne-vs-bresil",
  "italie-vs-angleterre","portugal-vs-france",
];
const ECRANS_GEANTS_SLUGS = [
  "paris","lyon","marseille","toulouse","bordeaux","nice","nantes","strasbourg",
  "montpellier","lille","rennes","saint-etienne","grenoble","dijon","toulon",
  "angers","brest","metz","reims","le-havre",
];
const TOP_50_PLAYER_SLUGS = [
  "mbappe","haaland","vinicius-jr","bellingham","yamal","messi","ronaldo","kane","salah","de-bruyne",
  "griezmann","neymar","lewandowski","osimhen","saka","pedri","rodri","gavi","foden","rashford",
  "alvarez","martinez-lautaro","isak","vlahovic","morata","richarlison","gakpo","thuram","kim-min-jae","hakimi",
  "valverde","tchouameni","camavinga","wirtz","musiala","szczesny","alisson","courtois","van-dijk","dias",
  "hojlund","palmer","nunez","diaz-luis","dembele","son","kulusevski","raphinha","bruno-fernandes","bernardo-silva",
];
const REFEREE_SLUGS = [
  "facundo-tello","jesus-valenzuela","wilton-sampaio","raphael-claus","cesar-ramos",
  "fernando-rapallini","andres-matonte","piero-maza","mario-escobar","ivan-barton",
  "clement-turpin","francois-letexier","szymon-marciniak","daniele-orsato","antonio-mateu-lahoz",
  "felix-brych","daniel-siebert","michael-oliver","anthony-taylor","slavko-vincic",
  "istvan-kovacs","halil-umut-meler","abdulrahman-al-jassim","mustapha-ghorbal","victor-gomes",
  "bakary-gassama","salima-mukansanga","maguette-ndiaye","ma-ning","yoshimi-yamashita",
  "chris-beath","matthew-conger","ismail-elfath","kralovec-pavel","nicholas-mohammed","said-martinez",
];
const BONUS_SLUGS = ["winamax", "betclic", "unibet", "parionssport"];

/* ── Helpers ── */
function u(path: string, opts?: { lastmod?: string; freq?: string; prio?: number }): MetadataRoute.Sitemap[0] {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: opts?.lastmod ?? STATIC,
    changeFrequency: (opts?.freq ?? "weekly") as "weekly",
    priority: opts?.prio ?? 0.7,
  };
}

function slugPages(prefix: string, slugs: { slug: string }[], opts?: { lastmod?: string; prio?: number }) {
  return slugs.map((s) => u(`/${prefix}/${s.slug}`, opts));
}

function staticSlugs(prefix: string, slugs: string[], opts?: { lastmod?: string; prio?: number }) {
  return slugs.map((s) => u(`/${prefix}/${s}`, opts));
}

/* ── Single sitemap (no generateSitemaps = produces /sitemap.xml) ── */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  /* ── Static pages ── */
  entries.push(
    u("/", { lastmod: TODAY, freq: "daily", prio: 1.0 }),
    u("/match/calendrier", { lastmod: TODAY, freq: "weekly", prio: 0.9 }),
    u("/match/aujourdhui", { lastmod: TODAY, freq: "daily", prio: 0.9 }),
    u("/tableau", { lastmod: TODAY, freq: "weekly", prio: 0.9 }),
    u("/buteurs", { lastmod: TODAY, freq: "weekly", prio: 0.9 }),
    u("/comparateur-cotes", { lastmod: TODAY, freq: "daily", prio: 0.9 }),
    u("/pronostic/vainqueur", { lastmod: TODAY, freq: "weekly", prio: 0.9 }),
    u("/paris-sportifs", { lastmod: TODAY, freq: "weekly", prio: 0.9 }),
    u("/live", { lastmod: TODAY, freq: "daily", prio: 0.9 }),
    u("/statistiques", { prio: 0.8 }),
    u("/comparateur-joueurs", { prio: 0.8 }),
    u("/comparateur-equipes", { prio: 0.8 }),
    u("/simulateur", { prio: 0.8 }),
    u("/billets", { prio: 0.8 }),
    u("/recherche", { prio: 0.6 }),
    u("/groupes", { prio: 0.9 }),
    u("/newsletter", { prio: 0.4, freq: "monthly" }),
    u("/equipes", { prio: 0.9 }),
    u("/stades", { prio: 0.8 }),
    u("/joueurs", { prio: 0.8 }),
    u("/villes", { prio: 0.8 }),
    u("/guides", { prio: 0.8 }),
    u("/ou-regarder", { prio: 0.8 }),
    u("/carte-stades", { prio: 0.7, freq: "monthly" }),
    u("/histoire", { prio: 0.8, freq: "monthly" }),
    u("/palmares", { prio: 0.7, freq: "monthly" }),
    u("/faq", { prio: 0.7, freq: "monthly" }),
    u("/quiz", { prio: 0.7, freq: "monthly" }),
    u("/guide/glossaire", { prio: 0.7, freq: "monthly" }),
    u("/methodologie", { prio: 0.5, freq: "monthly" }),
    u("/a-propos", { prio: 0.3, freq: "monthly" }),
    u("/contact", { prio: 0.3, freq: "monthly" }),
    u("/jeu-responsable", { prio: 0.3, freq: "monthly" }),
    u("/mentions-legales", { prio: 0.2, freq: "monthly" }),
    u("/politique-de-confidentialite", { prio: 0.2, freq: "monthly" }),
    u("/actualites", { lastmod: TODAY, freq: "daily", prio: 0.9 }),
    u("/arbitres", { prio: 0.7, freq: "monthly" }),
    u("/pronostics/grille", { lastmod: TODAY, prio: 0.8 }),
    u("/pronostics/leaderboard", { lastmod: TODAY, prio: 0.7 }),
    u("/pronostic", { lastmod: TODAY, prio: 0.8 }),
    u("/bonus", { prio: 0.8, freq: "monthly" }),
    u("/hebergement", { prio: 0.7, freq: "monthly" }),
    u("/securite", { prio: 0.7, freq: "monthly" }),
    u("/fan-zones", { prio: 0.7, freq: "monthly" }),
    u("/h2h", { prio: 0.7 }),
    u("/meilleurs-bookmakers", { prio: 0.8 }),
    u("/methodes-paiement", { prio: 0.7 }),
    u("/pronostic/btts", { prio: 0.8 }),
    u("/pronostic/over-under", { prio: 0.8 }),
    u("/pronostic/cartons", { prio: 0.8 }),
    u("/pronostic/clean-sheet", { prio: 0.8 }),
    u("/pronostic/buteurs", { prio: 0.8 }),
    u("/pronostic/scores-exacts", { prio: 0.8 }),
    u("/pronostic/finalistes", { prio: 0.8 }),
    u("/pronostic/tirs-au-but", { prio: 0.8 }),
    u("/paris-sportifs/corners", { prio: 0.7 }),
    u("/paris-sportifs/handicap", { prio: 0.7 }),
    u("/paris-sportifs/live", { prio: 0.7 }),
    u("/paris-sportifs/mi-temps", { prio: 0.7 }),
    u("/paris-sportifs/value-bets", { prio: 0.7 }),
    u("/paris-sportifs/dark-horses", { prio: 0.7 }),
    u("/paris-sportifs/guide", { prio: 0.7 }),
    u("/paris-sportifs/ballon-or", { prio: 0.7 }),
    u("/voyage/esta-visa-usa", { prio: 0.7 }),
    u("/voyage/visa-mexique", { prio: 0.7 }),
    u("/voyage/formalites-canada", { prio: 0.7 }),
    u("/voyage/decalage-horaire", { prio: 0.6 }),
    u("/voyage/assurance", { prio: 0.6 }),
    u("/voyage/vols-budget", { prio: 0.6 }),
    u("/voyage/alcool-stades", { prio: 0.6, freq: "monthly" }),
    u("/voyage/wifi-stades", { prio: 0.6, freq: "monthly" }),
  );

  /* ── Bonus bookmaker pages ── */
  entries.push(...staticSlugs("bonus", BONUS_SLUGS, { prio: 0.8 }));

  /* ── Calendrier jour pages ── */
  for (let i = 1; i <= 39; i++) entries.push(u(`/calendrier/jour-${i}`, { lastmod: TODAY, freq: "daily", prio: 0.8 }));

  /* ── Dynamic data-driven pages ── */
  entries.push(...slugPages("equipe", teams, { prio: 0.9 }));
  entries.push(...slugPages("pronostic", teams, { lastmod: TODAY, prio: 0.9 }));
  entries.push(...slugPages("parier", teams, { prio: 0.8 }));
  entries.push(...slugPages("cote-champion", teams, { prio: 0.8 }));
  entries.push(...slugPages("effectif", teams, { prio: 0.8 }));

  entries.push(...slugPages("match", matches, { prio: 0.8 }));
  entries.push(...slugPages("pronostic-match", matches, { lastmod: TODAY, prio: 0.9 }));
  entries.push(...slugPages("score-exact", matches, { prio: 0.7 }));
  entries.push(...slugPages("compos-officielles", matches, { prio: 0.7 }));
  entries.push(...slugPages("arbitre", matches, { prio: 0.7 }));
  entries.push(...slugPages("corners", matches, { prio: 0.7 }));
  entries.push(...slugPages("possession", matches, { prio: 0.7 }));
  entries.push(...slugPages("hors-jeu", matches, { prio: 0.7 }));
  entries.push(...slugPages("sur-quelle-chaine", matches, { prio: 0.8 }));

  entries.push(...slugPages("groupe", groups, { prio: 0.9 }));
  entries.push(...slugPages("pronostic-groupe", groups, { lastmod: TODAY, prio: 0.8 }));
  entries.push(...slugPages("scenarios-qualification", groups, { prio: 0.7 }));

  entries.push(...slugPages("stade", stadiums, { prio: 0.8, lastmod: STATIC }));
  entries.push(...slugPages("ville", cities, { prio: 0.8 }));
  entries.push(...slugPages("fan-zone", cities, { prio: 0.7 }));
  entries.push(...slugPages("hebergement", cities, { prio: 0.7 }));
  entries.push(...slugPages("meteo", cities, { prio: 0.7 }));
  entries.push(...slugPages("transport", cities, { prio: 0.7 }));
  entries.push(...slugPages("guide-supporter", cities, { prio: 0.7 }));
  entries.push(...slugPages("securite", cities, { prio: 0.7 }));

  entries.push(...slugPages("joueur", players, { prio: 0.7 }));
  entries.push(...slugPages("buteur", scorerPlayers, { lastmod: TODAY, prio: 0.8 }));

  /* ── Player sub-pages (top 50) ── */
  for (const prefix of ["tirs-cadres", "passes-decisives", "tacles", "cote-carton-jaune", "cote-buteur"]) {
    entries.push(...staticSlugs(prefix, TOP_50_PLAYER_SLUGS, { prio: 0.7 }));
  }

  /* ── Team scenarios ── */
  entries.push(...slugPages("scenarios-qualification-equipe", teams, { prio: 0.7 }));

  /* ── Écrans géants ── */
  entries.push(...staticSlugs("ecrans-geants", ECRANS_GEANTS_SLUGS, { prio: 0.7, lastmod: STATIC }));

  /* ── Referees ── */
  entries.push(...staticSlugs("statistiques-arbitre", REFEREE_SLUGS, { prio: 0.7 }));

  /* ── Confrontations ── */
  entries.push(...staticSlugs("confrontation", CONFRONTATION_SLUGS, { prio: 0.7 }));

  /* ── Articles ── */
  entries.push(...newsArticles.map((a) => u(`/actualites/${a.slug}`, { lastmod: a.date, prio: 0.7 })));

  /* ── Guides ── */
  entries.push(...slugPages("guide", guides, { prio: 0.8 }));

  /* ── Bookmakers ── */
  entries.push(...slugPages("bookmaker", bookmakerReviews, { prio: 0.8 }));

  /* ── H2H combos ── */
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const t1 = teams[i], t2 = teams[j];
      if (t1 && t2) entries.push(u(`/h2h/${t1.slug}-vs-${t2.slug}`, { prio: 0.6, freq: "monthly" }));
    }
  }

  console.log(`[sitemap] Total URLs: ${entries.length}`);
  return entries;
}
