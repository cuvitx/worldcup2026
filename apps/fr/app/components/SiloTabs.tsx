"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  label: string;
  href: string;
}

interface SiloMatch {
  silo: string;
  slug: string | null;
}

function detectSilo(pathname: string): SiloMatch | null {
  // Remove trailing slash
  const p = pathname.replace(/\/$/, "") || "/";

  // Silos with dynamic slug
  const slugSilos: { prefixes: string[]; silo: string }[] = [
    {
      silo: "equipe",
      prefixes: ["/equipe/", "/effectif/", "/parier/", "/cote-champion/", "/pronostic/"],
    },
    {
      silo: "match",
      prefixes: [
        "/match/", "/score-exact/", "/compos-officielles/", "/sur-quelle-chaine/",
        "/corners/", "/possession/", "/hors-jeu/", "/arbitre/", "/pronostic-match/",
      ],
    },
    {
      silo: "stade-ville",
      prefixes: [
        "/stade/", "/ville/", "/fan-zone/", "/hebergement/", "/meteo/",
        "/transport/", "/guide-supporter/", "/securite/", "/ecrans-geants/",
        "/matchs-au-stade/", "/acces-stade/",
      ],
    },
    {
      silo: "joueur",
      prefixes: [
        "/joueur/", "/tirs-cadres/", "/passes-decisives/", "/tacles/",
        "/cote-carton-jaune/", "/cote-buteur/", "/buteur/",
      ],
    },
    {
      silo: "groupe",
      prefixes: ["/groupe/", "/pronostic-groupe/", "/scenarios-qualification/"],
    },
  ];

  for (const { prefixes, silo } of slugSilos) {
    for (const prefix of prefixes) {
      if (p.startsWith(prefix)) {
        const slug = p.slice(prefix.length).split("/")[0];
        if (slug) return { silo, slug };
      }
    }
  }

  // Pronostics silo (static pages)
  const pronosticsPages = [
    "/pronostic-vainqueur", "/pronostic-btts", "/pronostic-over-under",
    "/pronostic-cartons", "/pronostic-corners", "/pronostic-clean-sheet",
    "/pronostic-finalistes", "/pronostic-tirs-au-but", "/pronostic-scores-exacts",
    "/pronostic-buteurs", "/paris-sportifs", "/paris-combines", "/paris-handicap",
    "/paris-live", "/paris-mi-temps", "/paris-corners", "/value-bets", "/comparateur-cotes",
  ];
  if (pronosticsPages.includes(p)) return { silo: "pronostics", slug: null };

  // Guide voyage silo
  const guidePages = [
    "/esta-usa", "/visa-mexique", "/formalites-canada", "/decalage-horaire",
    "/vols", "/budget", "/assurance-voyage", "/carte-sim-usa", "/valise-cdm",
    "/pourboires-usa", "/supporter-francais-usa", "/wifi-stades", "/alcool-stades",
    "/hebergement",
  ];
  if (guidePages.includes(p) || p.startsWith("/guide")) return { silo: "guide-voyage", slug: null };

  return null;
}

function getTabsForSilo(silo: string, slug: string | null): Tab[] {
  switch (silo) {
    case "equipe":
      return [
        { label: "Équipe", href: `/equipe/${slug}` },
        { label: "Pronostic", href: `/pronostic/${slug}` },
        { label: "Effectif", href: `/effectif/${slug}` },
        { label: "Parier", href: `/parier/${slug}` },
        { label: "Cote champion", href: `/cote-champion/${slug}` },
      ];
    case "match":
      return [
        { label: "Match", href: `/match/${slug}` },
        { label: "Pronostic", href: `/pronostic-match/${slug}` },
        { label: "Score exact", href: `/score-exact/${slug}` },
        { label: "Compos", href: `/compos-officielles/${slug}` },
        { label: "Chaîne TV", href: `/sur-quelle-chaine/${slug}` },
        { label: "Corners", href: `/corners/${slug}` },
        { label: "H2H", href: `/hors-jeu/${slug}` },
      ];
    case "stade-ville":
      return [
        { label: "Stade", href: `/stade/${slug}` },
        { label: "Ville", href: `/ville/${slug}` },
        { label: "Fan zone", href: `/fan-zone/${slug}` },
        { label: "Hébergement", href: `/hebergement/${slug}` },
        { label: "Météo", href: `/meteo/${slug}` },
        { label: "Transport", href: `/transport/${slug}` },
        { label: "Guide supporter", href: `/guide-supporter/${slug}` },
        { label: "Sécurité", href: `/securite/${slug}` },
      ];
    case "joueur":
      return [
        { label: "Joueur", href: `/joueur/${slug}` },
        { label: "Tirs cadrés", href: `/tirs-cadres/${slug}` },
        { label: "Passes", href: `/passes-decisives/${slug}` },
        { label: "Tacles", href: `/tacles/${slug}` },
        { label: "Cote carton", href: `/cote-carton-jaune/${slug}` },
        { label: "Cote buteur", href: `/cote-buteur/${slug}` },
      ];
    case "groupe":
      return [
        { label: "Groupe", href: `/groupe/${slug}` },
        { label: "Pronostic groupe", href: `/pronostic-groupe/${slug}` },
        { label: "Scénarios qualification", href: `/scenarios-qualification/${slug}` },
      ];
    case "pronostics":
      return [
        { label: "Vainqueur", href: "/pronostic-vainqueur" },
        { label: "BTTS", href: "/pronostic-btts" },
        { label: "Over/Under", href: "/pronostic-over-under" },
        { label: "Cartons", href: "/pronostic-cartons" },
        { label: "Corners", href: "/paris-corners" },
        { label: "Clean Sheet", href: "/pronostic-clean-sheet" },
        { label: "Buteurs", href: "/pronostic-buteurs" },
        { label: "Scores exacts", href: "/pronostic-scores-exacts" },
        { label: "Paris sportifs", href: "/paris-sportifs" },
        { label: "Comparateur", href: "/comparateur-cotes" },
      ];
    case "guide-voyage":
      return [
        { label: "ESTA", href: "/esta-usa" },
        { label: "Visa Mexique", href: "/visa-mexique" },
        { label: "Canada", href: "/formalites-canada" },
        { label: "Décalage", href: "/decalage-horaire" },
        { label: "Vols", href: "/vols" },
        { label: "Budget", href: "/budget" },
        { label: "Assurance", href: "/assurance-voyage" },
        { label: "Carte SIM", href: "/carte-sim-usa" },
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
    <nav aria-label="Navigation du silo" className="px-4 py-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center">
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
