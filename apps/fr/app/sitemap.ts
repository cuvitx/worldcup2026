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
const TODAY = new Date().toISOString();
const STATIC = "2026-02-21";

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
function sl(prefix: string, items: { slug: string }[], opts?: { lastmod?: string; prio?: number }) {
  return items.map((s) => u(`/${prefix}/${s.slug}`, opts));
}
function st(prefix: string, items: string[], opts?: { lastmod?: string; prio?: number }) {
  return items.map((s) => u(`/${prefix}/${s}`, opts));
}

/* ── Sitemap segments ── */
type SegmentId = "static" | "teams" | "matches" | "groups" | "stadiums-cities" | "players" | "pronostics" | "paris" | "voyage" | "articles" | "h2h";
const SEGMENTS: SegmentId[] = ["static","teams","matches","groups","stadiums-cities","players","pronostics","paris","voyage","articles","h2h"];

export async function generateSitemaps() {
  return SEGMENTS.map((_, id) => ({ id }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const seg = SEGMENTS[id];

  switch (seg) {
    case "static":
      return [
        u("/", { lastmod: TODAY, freq: "daily", prio: 1.0 }),
        u("/equipe", { prio: 0.9 }), u("/groupes", { prio: 0.9 }), u("/joueurs", { prio: 0.8 }),
        u("/stades", { prio: 0.8 }), u("/villes", { prio: 0.8 }), u("/buteurs", { lastmod: TODAY, prio: 0.9 }),
        u("/match/calendrier", { lastmod: TODAY, prio: 0.9 }), u("/match/aujourdhui", { lastmod: TODAY, prio: 0.9 }),
        u("/tableau", { lastmod: TODAY, prio: 0.9 }), u("/live", { lastmod: TODAY, freq: "daily", prio: 0.9 }),
        u("/simulateur", { prio: 0.8 }), u("/comparateur-cotes", { lastmod: TODAY, prio: 0.9 }),
        u("/comparateur-joueurs", { prio: 0.8 }), u("/comparateur-equipes", { prio: 0.8 }),
        u("/statistiques", { prio: 0.8 }), u("/histoire", { prio: 0.8, freq: "monthly" }),
        u("/palmares", { prio: 0.7 }), u("/faq", { prio: 0.7 }), u("/quiz", { prio: 0.7 }),
        u("/guides", { prio: 0.8 }), u("/guide/glossaire", { prio: 0.7 }), u("/carte-stades", { prio: 0.7 }),
        u("/ou-regarder", { prio: 0.8 }), u("/billets", { prio: 0.8 }), u("/fan-zones", { prio: 0.7 }),
        u("/recherche", { prio: 0.6 }), u("/newsletter", { prio: 0.4 }), u("/arbitres", { prio: 0.7 }),
        u("/h2h", { prio: 0.7 }), u("/bonus", { prio: 0.8 }), u("/meilleurs-bookmakers", { prio: 0.8 }),
        u("/methodes-paiement", { prio: 0.7 }), u("/actualites", { lastmod: TODAY, freq: "daily", prio: 0.9 }),
        u("/pronostic", { lastmod: TODAY, prio: 0.8 }), u("/pronostics/grille", { lastmod: TODAY, prio: 0.8 }),
        u("/pronostics/leaderboard", { lastmod: TODAY, prio: 0.7 }),
        u("/paris-sportifs", { lastmod: TODAY, prio: 0.9 }), u("/voyage", { prio: 0.8 }),
        u("/plan-du-site", { prio: 0.3 }), u("/a-propos", { prio: 0.3 }), u("/contact", { prio: 0.3 }),
        u("/jeu-responsable", { prio: 0.3 }), u("/mentions-legales", { prio: 0.2 }),
        u("/politique-de-confidentialite", { prio: 0.2 }), u("/methodologie", { prio: 0.5 }),
        u("/equipe-editoriale", { prio: 0.3 }),
      ];

    case "teams":
      return [
        ...sl("equipe", teams, { prio: 0.9 }), ...sl("effectif", teams, { prio: 0.8 }),
        ...sl("parier", teams, { prio: 0.8 }), ...sl("cote-champion", teams, { prio: 0.8 }),
        ...sl("pronostic", teams, { lastmod: TODAY, prio: 0.9 }),
        ...sl("scenarios-qualification-equipe", teams, { prio: 0.7 }),
        ...sl("joueurs/equipe", teams, { prio: 0.7 }),
      ];

    case "matches":
      return [
        ...sl("match", matches, { prio: 0.8 }), ...sl("pronostic-match", matches, { lastmod: TODAY, prio: 0.9 }),
        ...sl("score-exact", matches, { prio: 0.7 }), ...sl("compos-officielles", matches, { prio: 0.7 }),
        ...sl("arbitre", matches, { prio: 0.7 }), ...sl("corners", matches, { prio: 0.7 }),
        ...sl("possession", matches, { prio: 0.7 }), ...sl("hors-jeu", matches, { prio: 0.7 }),
        ...sl("sur-quelle-chaine", matches, { prio: 0.8 }),
        ...Array.from({ length: 39 }, (_, i) => u(`/calendrier/jour-${i + 1}`, { lastmod: TODAY, prio: 0.8 })),
      ];

    case "groups":
      return [
        ...sl("groupe", groups, { prio: 0.9 }), ...sl("pronostic-groupe", groups, { lastmod: TODAY, prio: 0.8 }),
        ...sl("scenarios-qualification", groups, { prio: 0.7 }), ...sl("joueurs/groupe", groups, { prio: 0.7 }),
      ];

    case "stadiums-cities":
      return [
        ...sl("stade", stadiums, { prio: 0.8 }), ...sl("ville", cities, { prio: 0.8 }),
        ...sl("fan-zone", cities, { prio: 0.7 }), ...sl("hebergement", cities, { prio: 0.7 }),
        ...sl("meteo", cities, { prio: 0.7 }), ...sl("transport", cities, { prio: 0.7 }),
        ...sl("guide-supporter", cities, { prio: 0.7 }), ...sl("securite", cities, { prio: 0.7 }),
        ...st("ecrans-geants", ECRANS_GEANTS_SLUGS, { prio: 0.7 }),
      ];

    case "players":
      return [
        ...sl("joueur", players, { prio: 0.7 }), ...sl("buteur", scorerPlayers, { lastmod: TODAY, prio: 0.8 }),
        ...["tirs-cadres","passes-decisives","tacles","cote-carton-jaune","cote-buteur"].flatMap(
          (p) => st(p, TOP_50_PLAYER_SLUGS, { prio: 0.7 })
        ),
        ...st("statistiques-arbitre", REFEREE_SLUGS, { prio: 0.7 }),
      ];

    case "pronostics":
      return ["vainqueur","btts","over-under","buteurs","cartons","clean-sheet","scores-exacts","finalistes","tirs-au-but"]
        .map((t) => u(`/pronostic/${t}`, { lastmod: TODAY, prio: 0.8 }));

    case "paris":
      return [
        ...["corners","handicap","live","mi-temps","combines","bankroll","value-bets","lexique","cashout","strategie","guide","dark-horses","ballon-or"]
          .map((p) => u(`/paris-sportifs/${p}`, { prio: 0.7 })),
        ...sl("bookmaker", bookmakerReviews, { prio: 0.8 }), ...st("bonus", BONUS_SLUGS, { prio: 0.8 }),
      ];

    case "voyage":
      return ["esta-visa-usa","visa-mexique","formalites-canada","vols-budget","assurance","carte-sim","valise","decalage-horaire","pourboires","supporter-francais","wifi-stades","alcool-stades","hebergement","securite"]
        .map((v) => u(`/voyage/${v}`, { prio: 0.7 }));

    case "articles":
      return [
        ...newsArticles.map((a) => u(`/actualites/${a.slug}`, { lastmod: a.date, prio: 0.7 })),
        ...sl("guide", guides, { prio: 0.8 }),
      ];

    case "h2h": {
      const entries: MetadataRoute.Sitemap = st("confrontation", CONFRONTATION_SLUGS, { prio: 0.7 });
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          const t1 = teams[i], t2 = teams[j];
          if (t1 && t2) entries.push(u(`/h2h/${t1.slug}-vs-${t2.slug}`, { prio: 0.6, freq: "monthly" }));
        }
      }
      return entries;
    }

    default:
      return [];
  }
}
