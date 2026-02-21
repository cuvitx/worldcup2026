import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProximityWidgetProps {
  currentPath: string;
  team1?: string;
  team2?: string;
  player?: string;
}

type ProximityLink = { href: string; label: string; description: string };

function getProximityLinks(
  currentPath: string,
  team1?: string,
  team2?: string,
  player?: string
): ProximityLink[] {
  const segments = currentPath.split("/").filter(Boolean);
  const slug = segments[1] || "";

  // Match page
  if (currentPath.startsWith("/match/") && slug && slug !== "calendrier") {
    const t1 = team1 || slug.split("-vs-")[0]?.replace(/-/g, " ") || "";
    const t2 = team2 || slug.split("-vs-")[1]?.replace(/-/g, " ") || "";
    const t1Cap = t1.replace(/\b\w/g, (c) => c.toUpperCase());
    const t2Cap = t2.replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      {
        href: `/score-exact/${slug}`,
        label: "Pronostic score exact",
        description: `Voir l'analyse détaillée de ${t1Cap} - ${t2Cap}`,
      },
      {
        href: `/pronostic-buteurs`,
        label: "Cotes buteurs du match",
        description: "Consulter les cotes des buteurs probables",
      },
      {
        href: `/comparateur-cotes`,
        label: "Comparer les cotes",
        description: "Trouver la meilleure cote chez les bookmakers",
      },
    ];
  }

  // Joueur page
  if (currentPath.startsWith("/joueur/") && slug) {
    const name = player || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      {
        href: `/equipes`,
        label: `Équipe de ${name}`,
        description: "Découvrir l'effectif complet de sa sélection",
      },
      {
        href: `/pronostic-buteurs`,
        label: "Accéder au pronostic buteurs",
        description: `Consulter les cotes de ${name} et ses rivaux`,
      },
      {
        href: `/tirs-cadres/${slug}`,
        label: "Statistiques tirs cadrés",
        description: "Voir l'analyse de son efficacité devant le but",
      },
    ];
  }

  // Ville page
  if (currentPath.startsWith("/ville/") && slug) {
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      {
        href: `/stade/${slug}`,
        label: `Stade de ${name}`,
        description: "Explorer le stade et ses caractéristiques",
      },
      {
        href: `/securite/${slug}`,
        label: `Sécurité à ${name}`,
        description: "Consulter le guide sécurité pour les supporters",
      },
      {
        href: `/fan-zone/${slug}`,
        label: `Fan zones ${name}`,
        description: "Trouver les meilleurs spots pour suivre les matchs",
      },
    ];
  }

  // Equipe page
  if (currentPath.startsWith("/equipe/") && slug) {
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      {
        href: `/pronostic/${slug}`,
        label: `Pronostic ${name}`,
        description: `Voir l'analyse et les chances de ${name}`,
      },
      {
        href: `/effectif/${slug}`,
        label: `Effectif complet`,
        description: "Découvrir les joueurs sélectionnés",
      },
      {
        href: `/parier/${slug}`,
        label: `Consulter les cotes`,
        description: `Comparer les cotes pour ${name}`,
      },
    ];
  }

  // Stade page
  if (currentPath.startsWith("/stade/") && slug) {
    return [
      {
        href: `/carte-stades`,
        label: "Carte des stades",
        description: "Explorer tous les stades sur la carte interactive",
      },
      {
        href: `/billets`,
        label: "Acheter des billets",
        description: "Réserver ses places pour la Coupe du Monde",
      },
      {
        href: `/villes`,
        label: "Guide des villes hôtes",
        description: "Préparer son séjour dans les villes du mondial",
      },
    ];
  }

  // Default
  return [
    {
      href: "/pronostic-vainqueur",
      label: "Accéder au pronostic vainqueur",
      description: "Découvrir notre analyse des favoris du tournoi",
    },
    {
      href: "/simulateur",
      label: "Lancer le simulateur",
      description: "Simuler l'intégralité de la Coupe du Monde",
    },
    {
      href: "/meilleurs-bookmakers",
      label: "Comparer les bookmakers",
      description: "Trouver le meilleur site pour parier",
    },
  ];
}

export function ProximityWidget({
  currentPath,
  team1,
  team2,
  player,
}: ProximityWidgetProps) {
  const links = getProximityLinks(currentPath, team1, team2, player);

  return (
    <div className="bg-gray-50slate-800 rounded-xl p-6">
      <p className="text-sm font-semibold text-[#022149] mb-4">
        Les visiteurs ont aussi consulté
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col gap-1 rounded-lg border border-gray-200 bg-whiteslate-900 p-4 hover:border-[#00B865] transition-colors"
          >
            <span className="text-sm font-medium text-[#022149] group-hover:text-[#00B865] transition-colors flex items-center gap-1">
              {link.label}
              <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-xs text-gray-500">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
