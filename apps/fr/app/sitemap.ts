import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.cdm2026.fr";
const TODAY = new Date().toISOString();
const STATIC = "2026-02-21";

/* ── Safe data loaders ── */
function safeLoad<T>(fn: () => T, fallback: T): T {
  try { return fn(); } catch (e) { console.error("[sitemap] Failed to load:", e); return fallback; }
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

console.log(`[sitemap] Data: teams=${teams.length} matches=${matches.length} players=${players.length} stadiums=${stadiums.length} cities=${cities.length} groups=${groups.length} guides=${guides.length} news=${newsArticles.length}`);

/* ── Inline slugs for non-data pages ── */
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
function slugs(prefix: string, items: { slug: string }[], opts?: { lastmod?: string; prio?: number }) {
  return items.map((s) => u(`/${prefix}/${s.slug}`, opts));
}
function statics(prefix: string, items: string[], opts?: { lastmod?: string; prio?: number }) {
  return items.map((s) => u(`/${prefix}/${s}`, opts));
}

/* ── Single sitemap → /sitemap.xml ── */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  /* Static pages */
  entries.push(
    u("/", { lastmod: TODAY, freq: "daily", prio: 1.0 }),
    u("/equipe", { prio: 0.9 }), u("/groupes", { prio: 0.9 }), u("/joueurs", { prio: 0.8 }),
    u("/stades", { prio: 0.8 }), u("/villes", { prio: 0.8 }), u("/buteurs", { lastmod: TODAY, prio: 0.9 }),
    u("/match/calendrier", { lastmod: TODAY, prio: 0.9 }), u("/match/aujourdhui", { lastmod: TODAY, prio: 0.9 }),
    u("/tableau", { lastmod: TODAY, prio: 0.9 }), u("/live", { lastmod: TODAY, freq: "daily", prio: 0.9 }),
    u("/simulateur", { prio: 0.8 }), u("/comparateur-cotes", { lastmod: TODAY, prio: 0.9 }),
    u("/comparateur-joueurs", { prio: 0.8 }), u("/comparateur-equipes", { prio: 0.8 }),
    u("/statistiques", { prio: 0.8 }), u("/histoire", { prio: 0.8, freq: "monthly" }),
    u("/palmares", { prio: 0.7, freq: "monthly" }), u("/faq", { prio: 0.7 }),
    u("/quiz", { prio: 0.7 }), u("/guides", { prio: 0.8 }), u("/guide/glossaire", { prio: 0.7 }),
    u("/carte-stades", { prio: 0.7 }), u("/ou-regarder", { prio: 0.8 }), u("/billets", { prio: 0.8 }),
    u("/fan-zones", { prio: 0.7 }), u("/recherche", { prio: 0.6 }), u("/newsletter", { prio: 0.4 }),
    u("/arbitres", { prio: 0.7 }), u("/h2h", { prio: 0.7 }), u("/bonus", { prio: 0.8 }),
    u("/meilleurs-bookmakers", { prio: 0.8 }), u("/methodes-paiement", { prio: 0.7 }),
    u("/actualites", { lastmod: TODAY, freq: "daily", prio: 0.9 }),
    u("/pronostic", { lastmod: TODAY, prio: 0.8 }), u("/pronostics/grille", { lastmod: TODAY, prio: 0.8 }),
    u("/pronostics/leaderboard", { lastmod: TODAY, prio: 0.7 }),
    u("/paris-sportifs", { lastmod: TODAY, prio: 0.9 }), u("/voyage", { prio: 0.8 }),
    u("/plan-du-site", { prio: 0.3 }), u("/a-propos", { prio: 0.3 }),
    u("/contact", { prio: 0.3 }), u("/jeu-responsable", { prio: 0.3 }),
    u("/mentions-legales", { prio: 0.2 }), u("/politique-de-confidentialite", { prio: 0.2 }),
    u("/methodologie", { prio: 0.5 }), u("/equipe-editoriale", { prio: 0.3 }),
  );

  /* Pronostics */
  for (const t of ["vainqueur","btts","over-under","buteurs","cartons","clean-sheet","scores-exacts","finalistes","tirs-au-but"]) {
    entries.push(u(`/pronostic/${t}`, { lastmod: TODAY, prio: 0.8 }));
  }

  /* Paris sportifs */
  for (const p of ["corners","handicap","live","mi-temps","combines","bankroll","value-bets","lexique","cashout","strategie","guide","dark-horses","ballon-or"]) {
    entries.push(u(`/paris-sportifs/${p}`, { prio: 0.7 }));
  }

  /* Voyage */
  for (const v of ["esta-visa-usa","visa-mexique","formalites-canada","vols-budget","assurance","carte-sim","valise","decalage-horaire","pourboires","supporter-francais","wifi-stades","alcool-stades","hebergement","securite"]) {
    entries.push(u(`/voyage/${v}`, { prio: 0.7 }));
  }

  /* Teams */
  entries.push(...slugs("equipe", teams, { prio: 0.9 }));
  entries.push(...slugs("effectif", teams, { prio: 0.8 }));
  entries.push(...slugs("parier", teams, { prio: 0.8 }));
  entries.push(...slugs("cote-champion", teams, { prio: 0.8 }));
  entries.push(...slugs("pronostic", teams, { lastmod: TODAY, prio: 0.9 }));
  entries.push(...slugs("scenarios-qualification-equipe", teams, { prio: 0.7 }));
  entries.push(...slugs("joueurs/equipe", teams, { prio: 0.7 }));

  /* Matches */
  entries.push(...slugs("match", matches, { prio: 0.8 }));
  entries.push(...slugs("pronostic-match", matches, { lastmod: TODAY, prio: 0.9 }));
  entries.push(...slugs("score-exact", matches, { prio: 0.7 }));
  entries.push(...slugs("compos-officielles", matches, { prio: 0.7 }));
  entries.push(...slugs("arbitre", matches, { prio: 0.7 }));
  entries.push(...slugs("corners", matches, { prio: 0.7 }));
  entries.push(...slugs("possession", matches, { prio: 0.7 }));
  entries.push(...slugs("hors-jeu", matches, { prio: 0.7 }));
  entries.push(...slugs("sur-quelle-chaine", matches, { prio: 0.8 }));
  for (let i = 1; i <= 39; i++) entries.push(u(`/calendrier/jour-${i}`, { lastmod: TODAY, prio: 0.8 }));

  /* Groups */
  entries.push(...slugs("groupe", groups, { prio: 0.9 }));
  entries.push(...slugs("pronostic-groupe", groups, { lastmod: TODAY, prio: 0.8 }));
  entries.push(...slugs("scenarios-qualification", groups, { prio: 0.7 }));
  entries.push(...slugs("joueurs/groupe", groups, { prio: 0.7 }));

  /* Stadiums & Cities */
  entries.push(...slugs("stade", stadiums, { prio: 0.8 }));
  entries.push(...slugs("ville", cities, { prio: 0.8 }));
  entries.push(...slugs("fan-zone", cities, { prio: 0.7 }));
  entries.push(...slugs("hebergement", cities, { prio: 0.7 }));
  entries.push(...slugs("meteo", cities, { prio: 0.7 }));
  entries.push(...slugs("transport", cities, { prio: 0.7 }));
  entries.push(...slugs("guide-supporter", cities, { prio: 0.7 }));
  entries.push(...slugs("securite", cities, { prio: 0.7 }));
  entries.push(...statics("ecrans-geants", ECRANS_GEANTS_SLUGS, { prio: 0.7 }));

  /* Players */
  entries.push(...slugs("joueur", players, { prio: 0.7 }));
  entries.push(...slugs("buteur", scorerPlayers, { lastmod: TODAY, prio: 0.8 }));
  for (const prefix of ["tirs-cadres","passes-decisives","tacles","cote-carton-jaune","cote-buteur"]) {
    entries.push(...statics(prefix, TOP_50_PLAYER_SLUGS, { prio: 0.7 }));
  }
  entries.push(...statics("statistiques-arbitre", REFEREE_SLUGS, { prio: 0.7 }));

  /* Bookmakers & Bonus */
  entries.push(...slugs("bookmaker", bookmakerReviews, { prio: 0.8 }));
  entries.push(...statics("bonus", BONUS_SLUGS, { prio: 0.8 }));

  /* Articles & Guides */
  entries.push(...newsArticles.map((a) => u(`/actualites/${a.slug}`, { lastmod: a.date, prio: 0.7 })));
  entries.push(...slugs("guide", guides, { prio: 0.8 }));

  /* H2H */
  entries.push(...statics("confrontation", CONFRONTATION_SLUGS, { prio: 0.7 }));
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const t1 = teams[i], t2 = teams[j];
      if (t1 && t2) entries.push(u(`/h2h/${t1.slug}-vs-${t2.slug}`, { prio: 0.6, freq: "monthly" }));
    }
  }

  console.log(`[sitemap] Total URLs: ${entries.length}`);
  return entries;
}
