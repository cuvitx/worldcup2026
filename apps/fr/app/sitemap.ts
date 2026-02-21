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

/* ── Inline slugs ── */
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

/* ── Sitemap segments (generates /sitemap/0.xml through /sitemap/N.xml + index) ── */
type SitemapId = 
  | "static"
  | "teams"
  | "matches"
  | "groups"
  | "stadiums-cities"
  | "players"
  | "pronostics"
  | "paris-sportifs"
  | "voyage"
  | "articles"
  | "h2h"
  | "misc";

const SEGMENT_IDS: SitemapId[] = [
  "static", "teams", "matches", "groups", "stadiums-cities",
  "players", "pronostics", "paris-sportifs", "voyage", "articles", "h2h", "misc",
];

export async function generateSitemaps() {
  return SEGMENT_IDS.map((_, id) => ({ id }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const segment = SEGMENT_IDS[id];

  switch (segment) {
    case "static":
      return [
        u("/", { lastmod: TODAY, freq: "daily", prio: 1.0 }),
        u("/equipes", { prio: 0.9 }),
        u("/groupes", { prio: 0.9 }),
        u("/joueurs", { prio: 0.8 }),
        u("/stades", { prio: 0.8 }),
        u("/villes", { prio: 0.8 }),
        u("/buteurs", { lastmod: TODAY, prio: 0.9 }),
        u("/match/calendrier", { lastmod: TODAY, prio: 0.9 }),
        u("/match/aujourdhui", { lastmod: TODAY, prio: 0.9 }),
        u("/tableau", { lastmod: TODAY, prio: 0.9 }),
        u("/live", { lastmod: TODAY, freq: "daily", prio: 0.9 }),
        u("/simulateur", { prio: 0.8 }),
        u("/comparateur-cotes", { lastmod: TODAY, prio: 0.9 }),
        u("/comparateur-joueurs", { prio: 0.8 }),
        u("/comparateur-equipes", { prio: 0.8 }),
        u("/statistiques", { prio: 0.8 }),
        u("/histoire", { prio: 0.8, freq: "monthly" }),
        u("/palmares", { prio: 0.7, freq: "monthly" }),
        u("/faq", { prio: 0.7, freq: "monthly" }),
        u("/quiz", { prio: 0.7, freq: "monthly" }),
        u("/guides", { prio: 0.8 }),
        u("/guide/glossaire", { prio: 0.7, freq: "monthly" }),
        u("/carte-stades", { prio: 0.7, freq: "monthly" }),
        u("/ou-regarder", { prio: 0.8 }),
        u("/billets", { prio: 0.8 }),
        u("/fan-zones", { prio: 0.7 }),
        u("/recherche", { prio: 0.6 }),
        u("/newsletter", { prio: 0.4, freq: "monthly" }),
        u("/arbitres", { prio: 0.7, freq: "monthly" }),
        u("/h2h", { prio: 0.7 }),
        u("/bonus", { prio: 0.8, freq: "monthly" }),
        u("/meilleurs-bookmakers", { prio: 0.8 }),
        u("/methodes-paiement", { prio: 0.7 }),
        u("/actualites", { lastmod: TODAY, freq: "daily", prio: 0.9 }),
        u("/pronostic", { lastmod: TODAY, prio: 0.8 }),
        u("/pronostics/grille", { lastmod: TODAY, prio: 0.8 }),
        u("/pronostics/leaderboard", { lastmod: TODAY, prio: 0.7 }),
        u("/paris-sportifs", { lastmod: TODAY, prio: 0.9 }),
        u("/plan-du-site", { prio: 0.3, freq: "monthly" }),
        u("/a-propos", { prio: 0.3, freq: "monthly" }),
        u("/contact", { prio: 0.3, freq: "monthly" }),
        u("/jeu-responsable", { prio: 0.3, freq: "monthly" }),
        u("/mentions-legales", { prio: 0.2, freq: "monthly" }),
        u("/politique-de-confidentialite", { prio: 0.2, freq: "monthly" }),
        u("/methodologie", { prio: 0.5, freq: "monthly" }),
        u("/equipe-editoriale", { prio: 0.3, freq: "monthly" }),
      ];

    case "teams":
      return [
        ...slugPages("equipe", teams, { prio: 0.9 }),
        ...slugPages("effectif", teams, { prio: 0.8 }),
        ...slugPages("parier", teams, { prio: 0.8 }),
        ...slugPages("cote-champion", teams, { prio: 0.8 }),
        ...slugPages("pronostic", teams, { lastmod: TODAY, prio: 0.9 }),
        ...slugPages("scenarios-qualification-equipe", teams, { prio: 0.7 }),
      ];

    case "matches":
      return [
        ...slugPages("match", matches, { prio: 0.8 }),
        ...slugPages("pronostic-match", matches, { lastmod: TODAY, prio: 0.9 }),
        ...slugPages("score-exact", matches, { prio: 0.7 }),
        ...slugPages("compos-officielles", matches, { prio: 0.7 }),
        ...slugPages("arbitre", matches, { prio: 0.7 }),
        ...slugPages("corners", matches, { prio: 0.7 }),
        ...slugPages("possession", matches, { prio: 0.7 }),
        ...slugPages("hors-jeu", matches, { prio: 0.7 }),
        ...slugPages("sur-quelle-chaine", matches, { prio: 0.8 }),
        ...Array.from({ length: 39 }, (_, i) => u(`/calendrier/jour-${i + 1}`, { lastmod: TODAY, freq: "daily", prio: 0.8 })),
      ];

    case "groups":
      return [
        ...slugPages("groupe", groups, { prio: 0.9 }),
        ...slugPages("pronostic-groupe", groups, { lastmod: TODAY, prio: 0.8 }),
        ...slugPages("scenarios-qualification", groups, { prio: 0.7 }),
      ];

    case "stadiums-cities":
      return [
        ...slugPages("stade", stadiums, { prio: 0.8 }),
        ...slugPages("ville", cities, { prio: 0.8 }),
        ...slugPages("fan-zone", cities, { prio: 0.7 }),
        ...slugPages("hebergement", cities, { prio: 0.7 }),
        ...slugPages("meteo", cities, { prio: 0.7 }),
        ...slugPages("transport", cities, { prio: 0.7 }),
        ...slugPages("guide-supporter", cities, { prio: 0.7 }),
        ...slugPages("securite", cities, { prio: 0.7 }),
        ...staticSlugs("ecrans-geants", ECRANS_GEANTS_SLUGS, { prio: 0.7 }),
        ...staticSlugs("matchs-au-stade", stadiums.map(s => s.slug), { prio: 0.7 }),
      ];

    case "players":
      return [
        ...slugPages("joueur", players, { prio: 0.7 }),
        ...slugPages("buteur", scorerPlayers, { lastmod: TODAY, prio: 0.8 }),
        ...staticSlugs("tirs-cadres", TOP_50_PLAYER_SLUGS, { prio: 0.7 }),
        ...staticSlugs("passes-decisives", TOP_50_PLAYER_SLUGS, { prio: 0.7 }),
        ...staticSlugs("tacles", TOP_50_PLAYER_SLUGS, { prio: 0.7 }),
        ...staticSlugs("cote-carton-jaune", TOP_50_PLAYER_SLUGS, { prio: 0.7 }),
        ...staticSlugs("cote-buteur", TOP_50_PLAYER_SLUGS, { prio: 0.7 }),
        ...staticSlugs("statistiques-arbitre", REFEREE_SLUGS, { prio: 0.7 }),
        ...slugPages("joueurs/equipe", teams, { prio: 0.7 }),
        ...slugPages("joueurs/groupe", groups, { prio: 0.7 }),
      ];

    case "pronostics":
      return [
        u("/pronostic/vainqueur", { lastmod: TODAY, prio: 0.9 }),
        u("/pronostic/btts", { prio: 0.8 }),
        u("/pronostic/over-under", { prio: 0.8 }),
        u("/pronostic/buteurs", { prio: 0.8 }),
        u("/pronostic/cartons", { prio: 0.8 }),
        u("/pronostic/clean-sheet", { prio: 0.8 }),
        u("/pronostic/scores-exacts", { prio: 0.8 }),
        u("/pronostic/finalistes", { prio: 0.8 }),
        u("/pronostic/tirs-au-but", { prio: 0.8 }),
      ];

    case "paris-sportifs":
      return [
        u("/paris-sportifs/corners", { prio: 0.7 }),
        u("/paris-sportifs/handicap", { prio: 0.7 }),
        u("/paris-sportifs/live", { prio: 0.7 }),
        u("/paris-sportifs/mi-temps", { prio: 0.7 }),
        u("/paris-sportifs/combines", { prio: 0.7 }),
        u("/paris-sportifs/bankroll", { prio: 0.7 }),
        u("/paris-sportifs/value-bets", { prio: 0.7 }),
        u("/paris-sportifs/lexique", { prio: 0.7 }),
        u("/paris-sportifs/cashout", { prio: 0.7 }),
        u("/paris-sportifs/strategie", { prio: 0.7 }),
        u("/paris-sportifs/guide", { prio: 0.7 }),
        u("/paris-sportifs/dark-horses", { prio: 0.7 }),
        u("/paris-sportifs/ballon-or", { prio: 0.7 }),
        ...slugPages("bookmaker", bookmakerReviews, { prio: 0.8 }),
        ...staticSlugs("bonus", BONUS_SLUGS, { prio: 0.8 }),
      ];

    case "voyage":
      return [
        u("/voyage/esta-visa-usa", { prio: 0.7 }),
        u("/voyage/visa-mexique", { prio: 0.7 }),
        u("/voyage/formalites-canada", { prio: 0.7 }),
        u("/voyage/vols-budget", { prio: 0.7 }),
        u("/voyage/assurance", { prio: 0.7 }),
        u("/voyage/carte-sim", { prio: 0.7 }),
        u("/voyage/valise", { prio: 0.7 }),
        u("/voyage/decalage-horaire", { prio: 0.6 }),
        u("/voyage/pourboires", { prio: 0.6 }),
        u("/voyage/supporter-francais", { prio: 0.6 }),
        u("/voyage/wifi-stades", { prio: 0.6 }),
        u("/voyage/alcool-stades", { prio: 0.6 }),
        u("/voyage/hebergement", { prio: 0.7 }),
        u("/voyage/securite", { prio: 0.7 }),
      ];

    case "articles":
      return [
        ...newsArticles.map((a) => u(`/actualites/${a.slug}`, { lastmod: a.date, prio: 0.7 })),
        ...slugPages("guide", guides, { prio: 0.8 }),
      ];

    case "h2h":
      const h2hEntries: MetadataRoute.Sitemap = [];
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          const t1 = teams[i], t2 = teams[j];
          if (t1 && t2) h2hEntries.push(u(`/h2h/${t1.slug}-vs-${t2.slug}`, { prio: 0.6, freq: "monthly" }));
        }
      }
      h2hEntries.push(...staticSlugs("confrontation", CONFRONTATION_SLUGS, { prio: 0.7 }));
      return h2hEntries;

    case "misc":
      return [];

    default:
      return [];
  }
}
