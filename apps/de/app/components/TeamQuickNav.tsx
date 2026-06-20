"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { teams } from "../../lib/localized-data";

interface TeamQuickNavProps {
  teamSlug: string;
}

const navItems = (slug: string) => [
  { label: "Mannschaft", href: `/mannschaft/${slug}` },
  { label: "Prognose", href: `/prognose/${slug}` },
  { label: "Gruppe", href: `/gruppe/${getGroupSlug(slug)}` },
  { label: "Spiele", href: `/mannschaft/${slug}/spiele` },
  { label: "Spieler", href: `/mannschaft/${slug}/spieler-liste` },
  { label: "Quoten", href: `/mannschaft/${slug}/quoten` },
  { label: "Szenarien", href: `/scenarios-qualification-equipe/${slug}` },
];

function getGroupSlug(teamSlug: string): string {
  const team = teams.find((t) => t.slug === teamSlug);
  return team ? team.group.toLowerCase() : "a";
}

export function TeamQuickNav({ teamSlug }: TeamQuickNavProps) {
  const pathname = usePathname();
  const items = navItems(teamSlug);

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Schnellnavigation Mannschaft">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
