"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Trophy,
  Users,
  Swords,
  Plane,
  CircleDollarSign,
  LayoutGrid,
  Star,
  Calculator,
  HelpCircle,
  BarChart3,
  Calendar,
  Scale,
  Shield,
  FileText,
  Mail,
  Info,
  BookOpen,
} from "lucide-react";

type SiloLink = { href: string; label: string };

function detectSilo(pathname: string): string {
  const p = pathname;

  if (
    ["/joueur/", "/tirs-cadres/", "/passes-decisives/", "/tacles/", "/cote-carton-jaune/", "/buteur/"].some(
      (s) => p.startsWith(s)
    )
  )
    return "joueurs";

  if (
    ["/equipe/", "/pronostic/", "/effectif/", "/parier/"].some((s) => p.startsWith(s))
  )
    return "equipes";

  if (
    [
      "/match/",
      "/corners/",
      "/possession/",
      "/hors-jeu/",
      "/compos-officielles/",
      "/arbitre/",
      "/pronostic-match/",
      "/score-exact/",
    ].some((s) => p.startsWith(s))
  )
    return "matchs";

  if (
    [
      "/stade/",
      "/ville/",
      "/guide-ville/",
      "/hebergement",
      "/budget",
      "/securite/",
      "/transport",
      "/meteo",
      "/fan-zone",
    ].some((s) => p.startsWith(s))
  )
    return "voyage";

  if (
    [
      "/bonus/",
      "/bookmaker/",
      "/paris-",
    ].some((s) => p.startsWith(s)) ||
    [
      "/meilleurs-bookmakers",
      "/guide-paris",
      "/methodes-paiement",
      "/value-bets",
      "/pronostic-btts",
      "/pronostic-over-under",
      "/pronostic-scores-exacts",
      "/pronostic-buteurs",
      "/lexique-paris",
      "/cashout-guide",
      "/bankroll-cdm",
    ].includes(p)
  )
    return "paris";

  if (
    ["/groupe/", "/scenarios-qualification/"].some((s) => p.startsWith(s)) ||
    ["/groupes", "/meilleurs-troisiemes"].includes(p) ||
    p.startsWith("/simulateur") ||
    p.startsWith("/tableau")
  )
    return "competition";

  return "default";
}

function getSiloLinks(silo: string): SiloLink[] {
  switch (silo) {
    case "joueurs":
      return [
        { href: "/pronostic-buteurs", label: "Accéder au pronostic buteurs" },
        { href: "/comparateur-joueurs", label: "Comparer les joueurs" },
        { href: "/equipes", label: "Toutes les équipes" },
        { href: "/classement-fifa", label: "Classement FIFA" },
        { href: "/buteurs", label: "Meilleurs buteurs" },
        { href: "/joueurs", label: "Tous les joueurs" },
        { href: "/tirs-cadres", label: "Statistiques tirs cadrés" },
        { href: "/passes-decisives", label: "Passes décisives" },
      ];
    case "equipes":
      return [
        { href: "/groupes", label: "Voir tous les groupes" },
        { href: "/match/calendrier", label: "Calendrier des matchs" },
        { href: "/joueurs", label: "Joueurs stars" },
        { href: "/pronostic-vainqueur", label: "Accéder au pronostic vainqueur" },
        { href: "/comparateur-joueurs", label: "Comparer les effectifs" },
        { href: "/classement-fifa", label: "Classement FIFA actuel" },
      ];
    case "matchs":
      return [
        { href: "/match/calendrier", label: "Calendrier complet" },
        { href: "/comparateur-cotes", label: "Consulter les cotes" },
        { href: "/pronostic-vainqueur", label: "Pronostic du tournoi" },
        { href: "/live", label: "Scores en direct" },
        { href: "/ou-regarder", label: "Où regarder les matchs" },
        { href: "/compos-officielles", label: "Compositions officielles" },
        { href: "/score-exact", label: "Pronostic score exact" },
      ];
    case "voyage":
      return [
        { href: "/carte-stades", label: "Explorer la carte des stades" },
        { href: "/villes", label: "Guide des villes hôtes" },
        { href: "/billets", label: "Acheter des billets" },
        { href: "/esta-usa", label: "Obtenir son ESTA" },
        { href: "/assurance-voyage", label: "Assurance voyage" },
        { href: "/calculateur-budget", label: "Calculer son budget" },
      ];
    case "paris":
      return [
        { href: "/meilleurs-bookmakers", label: "Comparer les bookmakers" },
        { href: "/bonus", label: "Découvrir les bonus" },
        { href: "/guide-paris", label: "Explorer le guide paris" },
        { href: "/jeu-responsable", label: "Jouer responsable" },
        { href: "/comparateur-cotes", label: "Consulter les cotes" },
        { href: "/value-bets", label: "Trouver des value bets" },
        { href: "/lexique-paris", label: "Lexique des paris" },
      ];
    case "competition":
      return [
        { href: "/groupes", label: "Tous les groupes" },
        { href: "/simulateur", label: "Lancer le simulateur" },
        { href: "/tableau-final-virtuel", label: "Tableau final virtuel" },
        { href: "/format", label: "Format de la compétition" },
        { href: "/reglement", label: "Règlement officiel" },
        { href: "/meilleurs-troisiemes", label: "Meilleurs troisièmes" },
      ];
    default:
      return [
        { href: "/equipes", label: "Toutes les équipes" },
        { href: "/groupes", label: "Phase de groupes" },
        { href: "/match/calendrier", label: "Calendrier des matchs" },
        { href: "/pronostic-vainqueur", label: "Accéder au pronostic" },
        { href: "/meilleurs-bookmakers", label: "Comparer les bookmakers" },
        { href: "/simulateur", label: "Simuler le tournoi" },
      ];
  }
}

const topNations: SiloLink[] = [
  { href: "/equipe/france", label: "France" },
  { href: "/equipe/bresil", label: "Brésil" },
  { href: "/equipe/argentine", label: "Argentine" },
  { href: "/equipe/angleterre", label: "Angleterre" },
  { href: "/equipe/allemagne", label: "Allemagne" },
  { href: "/equipe/espagne", label: "Espagne" },
  { href: "/equipe/portugal", label: "Portugal" },
  { href: "/equipe/pays-bas", label: "Pays-Bas" },
];

const outils: SiloLink[] = [
  { href: "/simulateur", label: "Simulateur" },
  { href: "/quiz", label: "Quiz CDM" },
  { href: "/comparateur-cotes", label: "Comparateur de cotes" },
  { href: "/match/calendrier", label: "Calendrier" },
  { href: "/calculateur-budget", label: "Calculateur budget" },
];

const legal: SiloLink[] = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Confidentialité" },
  { href: "/jeu-responsable", label: "Jeu responsable" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "À propos" },
  { href: "/equipe-editoriale", label: "Équipe éditoriale" },
];

const columnIcons: Record<string, React.ReactNode> = {
  joueurs: <Users className="h-4 w-4 text-[#00B865]" />,
  equipes: <Shield className="h-4 w-4 text-[#00B865]" />,
  matchs: <Swords className="h-4 w-4 text-[#00B865]" />,
  voyage: <Plane className="h-4 w-4 text-[#00B865]" />,
  paris: <CircleDollarSign className="h-4 w-4 text-[#00B865]" />,
  competition: <LayoutGrid className="h-4 w-4 text-[#00B865]" />,
  default: <Trophy className="h-4 w-4 text-[#00B865]" />,
};

const siloTitles: Record<string, string> = {
  joueurs: "Joueurs",
  equipes: "Équipes",
  matchs: "Matchs",
  voyage: "Voyage",
  paris: "Paris sportifs",
  competition: "Compétition",
  default: "À découvrir",
};

export function ContextualFooter() {
  const pathname = usePathname();
  const silo = detectSilo(pathname);
  const siloLinks = getSiloLinks(silo);

  return (
    <section className="bg-gray-50-900 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Col 1: Contextual */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#022149] mb-4">
              {columnIcons[silo]}
              {siloTitles[silo]}
            </h3>
            <ul className="space-y-2">
              {siloLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#022149] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Top Nations */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#022149] mb-4">
              <Star className="h-4 w-4 text-[#D4AF37]" />
              Top Nations
            </h3>
            <ul className="space-y-2">
              {topNations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#022149] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Outils */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#022149] mb-4">
              <Calculator className="h-4 w-4 text-[#00B865]" />
              Outils
            </h3>
            <ul className="space-y-2">
              {outils.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#022149] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Légal */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#022149] mb-4">
              <FileText className="h-4 w-4 text-gray-400" />
              Légal
            </h3>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#022149] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
