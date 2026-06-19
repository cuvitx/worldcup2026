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

/* Slugs that are Prognose TYPES, not team slugs */
const PRONOSTIC_TYPE_SLUGS = new Set([
  "vainqueur", "btts", "over-under", "Torschützen", "cartons", "clean-sheet",
  "scores-exacts", "finalistes", "tirs-au-but",
]);

function detectSilo(pathname: string): SiloMatch | null {
  // Remove trailing slash
  const p = pathname.replace(/\/$/, "") || "/";

  // Special case: /prognose/{type} → Prognoses silo, not team
  if (p.startsWith("/prognose/")) {
    const slug = p.slice("/prognose/".length).split("/")[0];
    if (slug && PRONOSTIC_TYPE_SLUGS.has(slug)) {
      return { silo: "Prognoses", slug: null };
    }
  }

  // Silos with dynamic slug
  const slugSilos: { prefixes: string[]; silo: string }[] = [
    {
      silo: "equipe",
      prefixes: ["/mannschaft/", "/Kader/", "/parier/", "/cote-champion/", "/prognose/"],
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
      silo: "Spieler",
      prefixes: [
        "/spieler/", "/tirs-cadres/", "/passes-decisives/", "/tacles/",
        "/cote-carton-jaune/", "/cote-Torschütze/", "/torschuetze/",
      ],
    },
    {
      silo: "groupe",
      prefixes: ["/gruppe/", "/prognose-gruppe/", "/scenarios-qualification/"],
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
  const PrognosesPages = [
    "/prognose/sieger", "/prognose/btts", "/prognose/over-under",
    "/prognose/karten", "/prognose/ecken", "/prognose/clean-sheet",
    "/prognose/finalisten", "/prognose/elfmeterschiessen", "/prognose/genaue-ergebnisse",
    "/prognose/torschuetzen", "/sportwetten", "/sportwetten/kombiwetten", "/sportwetten/handicap",
    "/sportwetten/live", "/sportwetten/halbzeit", "/sportwetten/corners", "/sportwetten/value-bets", "/comparateur-cotes",
  ];
  if (PrognosesPages.includes(p)) return { silo: "Prognoses", slug: null };

  // Reiseführer-Silo
  const guidePages = [
    "/voyage/esta-visa-usa", "/voyage/visa-mexique", "/voyage/formalites-canada", "/voyage/decalage-horaire",
    "/vols", "/budget", "/voyage/assurance", "/voyage/carte-sim", "/voyage/valise",
    "/voyage/pourboires", "/voyage/supporter-francais", "/voyage/wifi-Stadien", "/voyage/alcool-Stadien",
    "/hebergement",
  ];
  if (guidePages.includes(p) || p.startsWith("/guide")) return { silo: "guide-voyage", slug: null };

  return null;
}

function getTabsForSilo(silo: string, slug: string | null): Tab[] {
  switch (silo) {
    case "equipe":
      return [
        { label: "Mannschaft", href: `/mannschaft/${slug}` },
        { label: "Prognose", href: `/prognose/${slug}` },
        { label: "Kader", href: `/Kader/${slug}` },
        { label: "Wetten", href: `/parier/${slug}` },
        { label: "Meisterquote", href: `/cote-champion/${slug}` },
      ];
    case "match":
      return [
        { label: "Spiel", href: `/spiel/${slug}` },
        { label: "Prognose", href: `/prognose-spiel/${slug}` },
        { label: "Genaues Ergebnis", href: `/score-exact/${slug}` },
        { label: "Aufstellung", href: `/compos-officielles/${slug}` },
        { label: "TV", href: `/sur-quelle-chaine/${slug}` },
        { label: "Ecken", href: `/corners/${slug}` },
        { label: "H2H", href: `/hors-jeu/${slug}` },
      ];
    case "stade-ville":
      return [
        { label: "Stadion", href: `/stadion/${slug}` },
        { label: "Stadt", href: `/stadt/${slug}` },
        { label: "Fanzone", href: `/fan-zone/${slug}` },
        { label: "Unterkunft", href: `/hebergement/${slug}` },
        { label: "Wetter", href: `/meteo/${slug}` },
        { label: "Transport", href: `/transport/${slug}` },
        { label: "Fan-Guide", href: `/guide-supporter/${slug}` },
        { label: "Sicherheit", href: `/securite/${slug}` },
      ];
    case "Spieler": {
      const base = [{ label: "Spieler", href: `/spieler/${slug}` }];
      if (slug && TOP_50_SLUGS.has(slug)) {
        base.push(
          { label: "Torschüsse", href: `/tirs-cadres/${slug}` },
          { label: "Vorlagen", href: `/passes-decisives/${slug}` },
          { label: "Zweikämpfe", href: `/tacles/${slug}` },
          { label: "Kartenquote", href: `/cote-carton-jaune/${slug}` },
          { label: "Torschützenquote", href: `/cote-Torschütze/${slug}` },
        );
      }
      return base;
    }
    case "groupe":
      return [
        { label: "Gruppe", href: `/gruppe/${slug}` },
        { label: "Gruppenprognose", href: `/prognose-gruppe/${slug}` },
        { label: "Qualifikationsszenarien", href: `/scenarios-qualification/${slug}` },
      ];
    case "Prognoses":
      return [
        { label: "Sieger", href: "/prognose/sieger" },
        { label: "BTTS", href: "/prognose/btts" },
        { label: "Over/Under", href: "/prognose/over-under" },
        { label: "Karten", href: "/prognose/karten" },
        { label: "Ecken", href: "/sportwetten/corners" },
        { label: "Zu Null", href: "/prognose/clean-sheet" },
        { label: "Torschützen", href: "/prognose/torschuetzen" },
        { label: "Genaue Ergebnisse", href: "/prognose/genaue-ergebnisse" },
        { label: "Sportwetten", href: "/sportwetten" },
        { label: "Quotenvergleich", href: "/comparateur-cotes" },
      ];
    case "guide-voyage":
      return [
        { label: "ESTA", href: "/voyage/esta-visa-usa" },
        { label: "Visum Mexiko", href: "/voyage/visa-mexique" },
        { label: "Kanada", href: "/voyage/formalites-canada" },
        { label: "Zeitverschiebung", href: "/voyage/decalage-horaire" },
        { label: "Flüge", href: "/vols" },
        { label: "Budget", href: "/budget" },
        { label: "Versicherung", href: "/voyage/assurance" },
        { label: "SIM-Karte", href: "/voyage/carte-sim" },
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
    <nav aria-label="Bereichsnavigation" className="px-4 py-3 overflow-hidden">
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
