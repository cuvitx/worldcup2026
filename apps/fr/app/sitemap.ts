import type { MetadataRoute } from "next";
import { teams } from "@repo/data/teams";
import { groups } from "@repo/data/groups";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { players } from "@repo/data/players";
import { matches } from "@repo/data/matches";
import { scorerPlayers } from "@repo/data/scorers";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
import { guides } from "@repo/data/guides";
import { newsArticles } from "@repo/data/news";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.cdm2026.fr";
const TODAY = new Date();
const STATIC_LAST_MODIFIED = new Date("2026-02-19");

/* ── Debug: log data availability at import time ── */
const DATA_COUNTS = {
  teams: teams?.length ?? 0,
  groups: groups?.length ?? 0,
  stadiums: stadiums?.length ?? 0,
  cities: cities?.length ?? 0,
  players: players?.length ?? 0,
  matches: matches?.length ?? 0,
  scorerPlayers: scorerPlayers?.length ?? 0,
  bookmakerReviews: bookmakerReviews?.length ?? 0,
  guides: guides?.length ?? 0,
  newsArticles: newsArticles?.length ?? 0,
};
console.log("[sitemap] Data counts:", JSON.stringify(DATA_COUNTS));

function matchLastModified(matchDate: string): Date {
  const d = new Date(matchDate);
  return d > TODAY ? d : TODAY;
}

/* ── Segment IDs ── */
const SEGMENT_STATIC = 0;
const SEGMENT_TEAMS = 1;
const SEGMENT_MATCHES = 2;
const SEGMENT_GROUPS = 3;
const SEGMENT_STADIUMS = 4;
const SEGMENT_CITIES = 5;
const SEGMENT_PLAYERS = 6;
const SEGMENT_SCORERS = 7;
const SEGMENT_H2H = 8;
const SEGMENT_ARTICLES = 9;
const SEGMENT_GUIDES = 10;
const SEGMENT_BOOKMAKERS = 11;
const SEGMENT_PRONOSTICS_TEAMS = 12;
const SEGMENT_PRONOSTICS_MATCHES = 13;
const SEGMENT_CALENDRIER = 14;
const SEGMENT_MATCH_SUBPAGES = 15;
const SEGMENT_TEAM_SUBPAGES = 16;
const SEGMENT_CITY_SUBPAGES = 17;
const SEGMENT_PLAYER_SUBPAGES = 18;
const SEGMENT_SCENARIOS = 19;
const SEGMENT_REFEREES = 20;
const SEGMENT_CONFRONTATIONS = 21;

/* ── Inline data (mirrors page files) ── */
const CONFRONTATION_SLUGS = [
  "france-vs-bresil", "argentine-vs-allemagne", "bresil-vs-allemagne", "france-vs-allemagne",
  "france-vs-italie", "bresil-vs-argentine", "angleterre-vs-allemagne", "espagne-vs-italie",
  "france-vs-argentine", "bresil-vs-france", "allemagne-vs-italie", "angleterre-vs-france",
  "pays-bas-vs-argentine", "bresil-vs-angleterre", "espagne-vs-allemagne", "portugal-vs-espagne",
  "france-vs-espagne", "allemagne-vs-pays-bas", "argentine-vs-angleterre", "bresil-vs-italie",
  "france-vs-portugal", "uruguay-vs-bresil", "argentine-vs-bresil", "pays-bas-vs-allemagne",
  "angleterre-vs-argentine", "france-vs-pays-bas", "espagne-vs-angleterre", "allemagne-vs-bresil",
  "italie-vs-angleterre", "portugal-vs-france",
];

const ECRANS_GEANTS_SLUGS = [
  "paris", "lyon", "marseille", "toulouse", "bordeaux", "nice", "nantes", "strasbourg",
  "montpellier", "lille", "rennes", "saint-etienne", "grenoble", "dijon", "toulon",
  "angers", "brest", "metz", "reims", "le-havre",
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

export async function generateSitemaps() {
  return Array.from({ length: 22 }, (_, i) => ({ id: i }));
}

/* ── Helper: match-based sub-pages ── */
function matchSubPages(prefix: string, priority = 0.7): MetadataRoute.Sitemap {
  return matches.map((m) => ({
    url: `${BASE_URL}/${prefix}/${m.slug}`,
    lastModified: matchLastModified(m.date),
    changeFrequency: "weekly" as const,
    priority,
  }));
}

/* ── Helper: team-based sub-pages ── */
function teamSubPages(prefix: string, priority = 0.8): MetadataRoute.Sitemap {
  return teams.map((t) => ({
    url: `${BASE_URL}/${prefix}/${t.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority,
  }));
}

/* ── Helper: city-based sub-pages ── */
function citySubPages(prefix: string, priority = 0.7): MetadataRoute.Sitemap {
  return cities.map((c) => ({
    url: `${BASE_URL}/${prefix}/${c.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority,
  }));
}

/* ── Helper: top-50 player sub-pages ── */
function playerSubPages(prefix: string, priority = 0.7): MetadataRoute.Sitemap {
  return TOP_50_PLAYER_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${prefix}/${slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority,
  }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  try {
    const result = sitemapInner(id);
    console.log(`[sitemap] segment ${id} → ${result.length} URLs`);
    return result;
  } catch (err) {
    console.error(`[sitemap] ERROR on segment ${id}:`, err);
    return [];
  }
}

function sitemapInner(id: number): MetadataRoute.Sitemap {
  switch (id) {
    /* ══════ STATIC PAGES ══════ */
    case SEGMENT_STATIC:
      return [
        { url: BASE_URL, lastModified: TODAY, changeFrequency: "daily", priority: 1.0 },
        { url: `${BASE_URL}/match/calendrier`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/match/aujourdhui`, lastModified: TODAY, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/tableau`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/buteurs`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/comparateur-cotes`, lastModified: TODAY, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/pronostic-vainqueur`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/paris-sportifs`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/live`, lastModified: TODAY, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/statistiques`, lastModified: TODAY, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/comparateur-joueurs`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/comparateur-equipes`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/simulateur`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/billets`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/recherche`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.6 },
        { url: `${BASE_URL}/groupes`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/newsletter`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.4 },
        { url: `${BASE_URL}/equipes`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/stades`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/joueurs`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/villes`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/guides`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/ou-regarder`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/carte-stades`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/histoire`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/palmares`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/faq`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/quiz`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/guide/glossaire`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/methodologie`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/a-propos`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
        { url: `${BASE_URL}/contact`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
        { url: `${BASE_URL}/jeu-responsable`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
        { url: `${BASE_URL}/mentions-legales`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.2 },
        { url: `${BASE_URL}/politique-de-confidentialite`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.2 },
        { url: `${BASE_URL}/actualites`, lastModified: TODAY, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/arbitres`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/pronostics/grille`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/pronostics/leaderboard`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/pronostic`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/bonus`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/hebergement`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/securite`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
        // Bonus bookmaker pages
        ...BONUS_SLUGS.map((slug) => ({
          url: `${BASE_URL}/bonus/${slug}`,
          lastModified: STATIC_LAST_MODIFIED,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      ];

    /* ══════ CALENDRIER JOUR PAGES ══════ */
    case SEGMENT_CALENDRIER:
      return Array.from({ length: 39 }, (_, i) => ({
        url: `${BASE_URL}/calendrier/jour-${i + 1}`,
        lastModified: TODAY,
        changeFrequency: "daily" as const,
        priority: 0.8,
      }));

    /* ══════ TEAMS ══════ */
    case SEGMENT_TEAMS:
      return teams.map((team) => ({
        url: `${BASE_URL}/equipe/${team.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));

    /* ══════ PRONOSTICS PER TEAM ══════ */
    case SEGMENT_PRONOSTICS_TEAMS:
      return teams.map((team) => ({
        url: `${BASE_URL}/pronostic/${team.slug}`,
        lastModified: TODAY,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));

    /* ══════ MATCHES ══════ */
    case SEGMENT_MATCHES:
      return matches.map((match) => ({
        url: `${BASE_URL}/match/${match.slug}`,
        lastModified: matchLastModified(match.date),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    /* ══════ PRONOSTICS PER MATCH ══════ */
    case SEGMENT_PRONOSTICS_MATCHES:
      return matches.map((match) => ({
        url: `${BASE_URL}/pronostic-match/${match.slug}`,
        lastModified: matchLastModified(match.date),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));

    /* ══════ GROUPS ══════ */
    case SEGMENT_GROUPS:
      return groups.map((group) => ({
        url: `${BASE_URL}/groupe/${group.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));

    /* ══════ STADIUMS ══════ */
    case SEGMENT_STADIUMS:
      return stadiums.map((stadium) => ({
        url: `${BASE_URL}/stade/${stadium.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    /* ══════ CITIES ══════ */
    case SEGMENT_CITIES:
      return cities.map((city) => ({
        url: `${BASE_URL}/ville/${city.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    /* ══════ PLAYERS ══════ */
    case SEGMENT_PLAYERS:
      return players.map((player) => ({
        url: `${BASE_URL}/joueur/${player.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    /* ══════ SCORERS / BUTEURS ══════ */
    case SEGMENT_SCORERS:
      return scorerPlayers.map((player) => ({
        url: `${BASE_URL}/buteur/${player.slug}`,
        lastModified: TODAY,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    /* ══════ H2H ══════ */
    case SEGMENT_H2H: {
      const h2hPages: MetadataRoute.Sitemap = [];
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          const t1 = teams[i];
          const t2 = teams[j];
          if (t1 && t2) {
            h2hPages.push({
              url: `${BASE_URL}/h2h/${t1.slug}-vs-${t2.slug}`,
              lastModified: STATIC_LAST_MODIFIED,
              changeFrequency: "monthly" as const,
              priority: 0.7,
            });
          }
        }
      }
      return h2hPages;
    }

    /* ══════ ARTICLES ══════ */
    case SEGMENT_ARTICLES:
      return newsArticles.map((article) => ({
        url: `${BASE_URL}/actualites/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    /* ══════ GUIDES ══════ */
    case SEGMENT_GUIDES:
      return guides.map((guide) => ({
        url: `${BASE_URL}/guide/${guide.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    /* ══════ BOOKMAKERS ══════ */
    case SEGMENT_BOOKMAKERS:
      return bookmakerReviews.map((bk) => ({
        url: `${BASE_URL}/bookmaker/${bk.slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    /* ══════ MATCH SUB-PAGES (score-exact, compos, arbitre, corners, etc.) ══════ */
    case SEGMENT_MATCH_SUBPAGES:
      return [
        ...matchSubPages("score-exact", 0.7),
        ...matchSubPages("compos-officielles", 0.7),
        ...matchSubPages("arbitre", 0.7),
        ...matchSubPages("corners", 0.7),
        ...matchSubPages("possession", 0.7),
        ...matchSubPages("hors-jeu", 0.7),
        ...matchSubPages("sur-quelle-chaine", 0.8),
      ];

    /* ══════ TEAM SUB-PAGES (parier, cote-champion, effectif) ══════ */
    case SEGMENT_TEAM_SUBPAGES:
      return [
        ...teamSubPages("parier", 0.8),
        ...teamSubPages("cote-champion", 0.8),
        ...teamSubPages("effectif", 0.8),
      ];

    /* ══════ CITY SUB-PAGES (fan-zone, hebergement, meteo, transport, guide-supporter, securite) ══════ */
    case SEGMENT_CITY_SUBPAGES:
      return [
        ...citySubPages("fan-zone", 0.7),
        ...citySubPages("hebergement", 0.7),
        ...citySubPages("meteo", 0.7),
        ...citySubPages("transport", 0.7),
        ...citySubPages("guide-supporter", 0.7),
        ...citySubPages("securite", 0.7),
      ];

    /* ══════ PLAYER SUB-PAGES (tirs-cadres, passes-decisives, tacles, cote-carton-jaune, cote-buteur) ══════ */
    case SEGMENT_PLAYER_SUBPAGES:
      return [
        ...playerSubPages("tirs-cadres", 0.7),
        ...playerSubPages("passes-decisives", 0.7),
        ...playerSubPages("tacles", 0.7),
        ...playerSubPages("cote-carton-jaune", 0.7),
        ...playerSubPages("cote-buteur", 0.7),
      ];

    /* ══════ SCENARIOS + ECRANS GEANTS ══════ */
    case SEGMENT_SCENARIOS:
      return [
        // scenarios-qualification per group
        ...groups.map((g) => ({
          url: `${BASE_URL}/scenarios-qualification/${g.slug}`,
          lastModified: STATIC_LAST_MODIFIED,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
        // scenarios-qualification-equipe per team
        ...teams.map((t) => ({
          url: `${BASE_URL}/scenarios-qualification-equipe/${t.slug}`,
          lastModified: STATIC_LAST_MODIFIED,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
        // ecrans-geants
        ...ECRANS_GEANTS_SLUGS.map((slug) => ({
          url: `${BASE_URL}/ecrans-geants/${slug}`,
          lastModified: STATIC_LAST_MODIFIED,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ];

    /* ══════ REFEREES + CONFRONTATIONS ══════ */
    case SEGMENT_REFEREES:
      return REFEREE_SLUGS.map((slug) => ({
        url: `${BASE_URL}/statistiques-arbitre/${slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    case SEGMENT_CONFRONTATIONS:
      return CONFRONTATION_SLUGS.map((slug) => ({
        url: `${BASE_URL}/confrontation/${slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    default:
      return [];
  }
}
