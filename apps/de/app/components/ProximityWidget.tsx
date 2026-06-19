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
  if (currentPath.startsWith("/spiel/") && slug && slug !== "spielplan") {
    const t1 = team1 || slug.split("-vs-")[0]?.replace(/-/g, " ") || "";
    const t2 = team2 || slug.split("-vs-")[1]?.replace(/-/g, " ") || "";
    const t1Cap = t1.replace(/\b\w/g, (c) => c.toUpperCase());
    const t2Cap = t2.replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      {
        href: `/score-exact/${slug}`,
        label: "Genaues Ergebnis",
        description: `Detaillierte Analyse von ${t1Cap} - ${t2Cap} ansehen`,
      },
      {
        href: `/prognose/torschuetzen`,
        label: "Torschützen-Quoten",
        description: "Quoten der wahrscheinlichen Torschützen ansehen",
      },
      {
        href: `/quotenvergleich`,
        label: "Quoten vergleichen",
        description: "Die besten Quoten bei den Wettanbietern finden",
      },
    ];
  }

  // Spieler page
  if (currentPath.startsWith("/spieler/") && slug) {
    const name = player || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      {
        href: `/mannschaften`,
        label: `Mannschaft von ${name}`,
        description: "Den vollständigen Kader seiner Nationalmannschaft entdecken",
      },
      {
        href: `/prognose/torschuetzen`,
        label: "Torschützen-Prognose",
        description: `Quoten von ${name} und seinen Konkurrenten ansehen`,
      },
      {
        href: `/tirs-cadres/${slug}`,
        label: "Torschuss-Statistiken",
        description: "Analyse seiner Effizienz vor dem Tor ansehen",
      },
    ];
  }

  // Stadt page
  if (currentPath.startsWith("/stadt/") && slug) {
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      {
        href: `/stadion/${slug}`,
        label: `Stadion in ${name}`,
        description: "Das Stadion und seine Merkmale erkunden",
      },
      {
        href: `/securite/${slug}`,
        label: `Sicherheit in ${name}`,
        description: "Sicherheitsratgeber für Fans ansehen",
      },
      {
        href: `/fan-zone/${slug}`,
        label: `Fanzonen ${name}`,
        description: "Die besten Orte zum Spiele schauen finden",
      },
    ];
  }

  // Equipe page
  if (currentPath.startsWith("/mannschaft/") && slug) {
    const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return [
      {
        href: `/prognose/${slug}`,
        label: `Prognose ${name}`,
        description: `Analyse und Chancen von ${name} ansehen`,
      },
      {
        href: `/Kader/${slug}`,
        label: `Vollständiger Kader`,
        description: "Die nominierten Spieler entdecken",
      },
      {
        href: `/sportwetten/${slug}`,
        label: `Quoten ansehen`,
        description: `Quoten für ${name} vergleichen`,
      },
    ];
  }

  // Stadion page
  if (currentPath.startsWith("/stadion/") && slug) {
    return [
      {
        href: `/carte-Stadien`,
        label: "Stadionkarte",
        description: "Alle Stadien auf der interaktiven Karte erkunden",
      },
      {
        href: `/Tickets`,
        label: "Tickets kaufen",
        description: "Plätze für die WM reservieren",
      },
      {
        href: `/staedte`,
        label: "Gastgeberstädte",
        description: "Den Aufenthalt in den WM-Städten planen",
      },
    ];
  }

  // Default
  return [
    {
      href: "/prognose/sieger",
      label: "Siegerprognose ansehen",
      description: "Unsere Analyse der Turnierfavoriten entdecken",
    },
    {
      href: "/turnierbaum",
      label: "Simulator starten",
      description: "Die gesamte WM simulieren",
    },
    {
      href: "/sportwetten",
      label: "Wettanbieter vergleichen",
      description: "Den besten Anbieter zum Wetten finden",
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
    <div className="bg-gray-50 rounded-xl p-6">
      <p className="text-sm font-semibold text-[#022149] mb-4">
        Besucher haben auch angesehen
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col gap-1 rounded-lg border border-gray-200 bg-white p-4 hover:border-[#00B865] transition-colors"
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
