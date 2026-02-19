"use client";

import { useState } from "react";
import type { Group, Team } from "@repo/data/types";
import { GroupCard } from "./GroupCard";

interface GroupAccordionProps {
  groups: { group: Group; teams: Team[] }[];
}

export function GroupAccordion({ groups }: GroupAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Desktop: show all */}
      <div className="hidden md:grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {groups.map(({ group, teams }) => (
          <GroupCard key={group.letter} group={group} teams={teams} />
        ))}
      </div>

      {/* Mobile: accordion - show first 4, expand for rest */}
      <div className="md:hidden">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {(isExpanded ? groups : groups.slice(0, 4)).map(({ group, teams }) => (
            <GroupCard key={group.letter} group={group} teams={teams} />
          ))}
        </div>
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="mt-4 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 text-center font-semibold text-accent transition-colors hover:bg-accent/5 min-h-[44px]"
          >
            Voir les {groups.length - 4} autres groupes ↓
          </button>
        )}
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="mt-4 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 text-center font-semibold text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-50 dark:bg-slate-700 dark:hover:bg-gray-700 min-h-[44px]"
          >
            Réduire ↑
          </button>
        )}
      </div>
    </>
  );
}
