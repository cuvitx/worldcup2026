"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  label: string;
  href: string;
}

const TOP_50_SLUGS = new Set([
  "mbappe","haaland","vinicius-jr","bellingham","yamal","messi","ronaldo","kane","salah","de-bruyne",
  "griezmann","neymar","lewandowski","osimhen","saka","pedri","rodri","gavi","foden","rashford",
  "alvarez","martinez-lautaro","isak","vlahovic","morata","richarlison","gakpo","thuram","kim-min-jae","hakimi",
  "valverde","tchouameni","camavinga","wirtz","musiala","szczesny","alisson","courtois","van-dijk","dias",
  "hojlund","palmer","nunez","diaz-luis","dembele","son","kulusevski","raphinha","bruno-fernandes","bernardo-silva",
]);

interface SiloMatch {
  silo: string;
  slug: string | null;
}

/* Slugs that are pronostic TYPES, not team slugs */
const PRONOSTIC_TYPE_SLUGS = new Set([
  "vainqueur", "btts", "over-under", "buteurs", "cartons", "clean-sheet",
  "scores-exacts", "finalistes", "tirs-au-but",
]);

function detectSilo(pathname: string): SiloMatch | null {
  // Remove trailing slash
  const p = pathname.replace(/\/$/, "") || "/";

  // Special case: /prognose/{type} → pronostics silo, not equipe
  if (p.startsWith("/prognose/")) {
    const slug = p.slice("/prognose/".length).split("/")[0];
    if (slug && PRONOSTIC_TYPE_SLUGS.has(slug)) {
      return { silo: "pronostics", slug: null };
    }
  }

  // Silos with dynamic slug
  const slugSilos: { prefixes: string[]; silo: string }[] = [
    {
      silo: "equipe",
      prefixes: ["/mannschaft/", "/effectif/", "/parier/", "/cote-champion/", "/prognose/"],
    },
    {
      silo: "match",
      prefixes: [
        "/spiel/", "/score-exact/", "/compos-officielles/", "/sur-quelle-chaine/",
        "/corners/", "/possession/", "/hors-jeu/", "/arbitre/", "/prognose-spiel/",
      ],
    },
    {
      silo: "stade-ville",
      prefixes: [
        "/stadion/", "/stadt/", "/fan-zone/", "/hebergement/", "/meteo/",
        "/transport/", "/guide-supporter/", "/securite/", "/ecrans-geants/",
        "/matchs-au-stade/", "/acces-stade/",
      ],
    },
    {
      silo: "joueur",
      prefixes: [
        "/spieler/", "/tirs-cadres/", "/passes-decisives/", "/tacles/",
        "/cote-carton-jaune/", "/cote-buteur/", "/torschuetze/",
      ],
    },
    {
      silo: "groupe",
      prefixes: ["/gruppe/", "/pronostic-groupe/", "/scenarios-qualification/"],
    },
  ];

  // Non-slug pages that happen to start with a silo prefix
  const excludedPages = new Set([
    "/spiel/spielplan", "/spiel/heute",
  ]);
  if (excludedPages.has(p)) return null;

  for (const { prefixes, silo } of slugSilos) {
    for (const prefix of prefixes) {
      if (p.startsWith(prefix)) {
        const slug = p.slice(prefix.length).split("/")[0];
        if (slug) return { silo, slug };
      }
    }
  }

  // Prognoses silo (static pages)
  const pronosticsPages = [
    "/prognose/vainqueur", "/prognose/btts", "/prognose/over-under",
    "/prognose/cartons", "/pronostic-corners", "/prognose/clean-sheet",
    "/prognose/finalistes", "/prognose/tirs-au-but", "/prognose/scores-exacts",
    "/prognose/torschuetzen", "/sportwetten", "/sportwetten/combines", "/sportwetten/handicap",
    "/sportwetten/live", "/sportwetten/mi-temps", "/sportwetten/corners", "/sportwetten/value-bets", "/comparateur-cotes",
  ];
  if (pronosticsPages.includes(p)) return { silo: "pronostics", slug: null };

  // Guide voyage silo
  const guidePages = [
    "/voyage/esta-visa-usa", "/voyage/visa-mexique", "/voyage/formalites-canada", "/voyage/decalage-horaire",
    "/vols", "/budget", "/voyage/assurance", "/voyage/carte-sim", "/voyage/valise",
    "/voyage/pourboires", "/voyage/supporter-francais", "/voyage/wifi-stades", "/voyage/alcool-stades",
    "/hebergement",
  ];
  if (guidePages.includes(p) || p.startsWith("/guide")) return { silo: "guide-voyage", slug: null };

  return null;
}

function getTabsForSilo(silo: string, slug: string | null): Tab[] {
  switch (silo) {
    case "equipe":
      return [
        { label: "Équipe", href: `/mannschaft/${slug}` },
        { label: "Prognose", href: `/prognose/${slug}` },
        { label: "Effectif", href: `/effectif/${slug}` },
        { label: "Parier", href: `/parier/${slug}` },
        { label: "Cote champion", href: `/cote-champion/${slug}` },
      ];
    case "match":
      return [
        { label: "Match", href: `/spiel/${slug}` },
        { label: "Prognose", href: `/prognose-spiel/${slug}` },
        { label: "Score exact", href: `/score-exact/${slug}` },
        { label: "Compos", href: `/compos-officielles/${slug}` },
        { label: "Chaîne TV", href: `/sur-quelle-chaine/${slug}` },
        { label: "Corners", href: `/corners/${slug}` },
        { label: "H2H", href: `/hors-jeu/${slug}` },
      ];
    case "stade-ville":
      return [
        { label: "Stadion", href: `/stadion/${slug}` },
        { label: "Stadt", href: `/stadt/${slug}` },
        { label: "Fan zone", href: `/fan-zone/${slug}` },
        { label: "Hébergement", href: `/hebergement/${slug}` },
        { label: "Météo", href: `/meteo/${slug}` },
        { label: "Transport", href: `/transport/${slug}` },
        { label: "Guide supporter", href: `/guide-supporter/${slug}` },
        { label: "Sécurité", href: `/securite/${slug}` },
      ];
    case "joueur": {
      const base = [{ label: "Spieler", href: `/spieler/${slug}` }];
      if (slug && TOP_50_SLUGS.has(slug)) {
        base.push(
          { label: "Tirs cadrés", href: `/tirs-cadres/${slug}` },
          { label: "Passes", href: `/passes-decisives/${slug}` },
          { label: "Tacles", href: `/tacles/${slug}` },
          { label: "Cote carton", href: `/cote-carton-jaune/${slug}` },
          { label: "Cote buteur", href: `/cote-buteur/${slug}` },
        );
      }
      return base;
    }
    case "groupe":
      return [
        { label: "Groupe", href: `/gruppe/${slug}` },
        { label: "Prognose groupe", href: `/pronostic-groupe/${slug}` },
        { label: "Scénarios qualification", href: `/scenarios-qualification/${slug}` },
      ];
    case "pronostics":
      return [
        { label: "Vainqueur", href: "/prognose/vainqueur" },
        { label: "BTTS", href: "/prognose/btts" },
        { label: "Over/Under", href: "/prognose/over-under" },
        { label: "Cartons", href: "/prognose/cartons" },
        { label: "Corners", href: "/sportwetten/corners" },
        { label: "Clean Sheet", href: "/prognose/clean-sheet" },
        { label: "Torschützen", href: "/prognose/torschuetzen" },
        { label: "Scores exacts", href: "/prognose/scores-exacts" },
        { label: "Paris sportifs", href: "/sportwetten" },
        { label: "Comparateur", href: "/comparateur-cotes" },
      ];
    case "guide-voyage":
      return [
        { label: "ESTA", href: "/voyage/esta-visa-usa" },
        { label: "Visa Mexique", href: "/voyage/visa-mexique" },
        { label: "Canada", href: "/voyage/formalites-canada" },
        { label: "Décalage", href: "/voyage/decalage-horaire" },
        { label: "Vols", href: "/vols" },
        { label: "Budget", href: "/budget" },
        { label: "Assurance", href: "/voyage/assurance" },
        { label: "Carte SIM", href: "/voyage/carte-sim" },
      ];
    default:
      return [];
  }
}

export function SiloTabs() {
  const pathname = usePathname();
  const match = detectSilo(pathname);

  if (!match) return null;

  const tabs = getTabsForSilo(match.silo, match.slug);
  if (tabs.length === 0) return null;

  const currentPath = pathname.replace(/\/$/, "");

  return (
    <nav aria-label="Navigation du silo" className="px-4 py-3 overflow-hidden">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:justify-center -mx-4 px-4">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.href.replace(/\/$/, "");
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "border border-primary/30 text-primary/70 hover:bg-primary/5 hover:border-primary/50"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
