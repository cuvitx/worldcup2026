"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { teams } from "@repo/data/teams";

interface TeamQuickNavProps {
  teamSlug: string;
}

const navItems = (slug: string) => [
  { label: "Equipe", href: `/equipe/${slug}` },
  { label: "Pronostic", href: `/pronostic/${slug}` },
  { label: "Groupe", href: `/groupe/${getGroupSlug(slug)}` },
  { label: "Matchs", href: `/equipe/${slug}/matchs` },
  { label: "Joueurs", href: `/equipe/${slug}/joueurs` },
  { label: "Cotes", href: `/equipe/${slug}/cotes` },
  { label: "Scenarios", href: `/scenarios-qualification-equipe/${slug}` },
];

function getGroupSlug(teamSlug: string): string {
  const team = teams.find((t) => t.slug === teamSlug);
  return team ? team.group.toLowerCase() : "a";
}

export function TeamQuickNav({ teamSlug }: TeamQuickNavProps) {
  const pathname = usePathname();
  const items = navItems(teamSlug);

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Navigation rapide equipe">
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
