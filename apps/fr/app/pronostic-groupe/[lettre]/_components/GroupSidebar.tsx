import Link from "next/link";
import { groups } from "@repo/data/groups";
import type { SortedTeam } from "./types";

interface GroupSidebarProps {
  groupLetter: string;
  lettre: string;
  sortedTeams: SortedTeam[];
}

export function GroupSidebar({ groupLetter, lettre, sortedTeams }: GroupSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Liens vers le groupe */}
      <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🔗 Liens utiles</h3>
        <div className="space-y-2">
          <Link href={`/groupe/${lettre}`} className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 px-4 py-3 text-sm font-medium transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5">
            Groupe {groupLetter} — statistiques
          </Link>
          {sortedTeams.slice(0, 4).map(({ team }) => (
            team && (
              <Link key={team.id} href={`/pronostic/${team.slug}`} className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 px-4 py-3 text-sm font-medium transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5">
                <span>{team.flag}</span>Pronostic {team.name}
              </Link>
            )
          ))}
        </div>
      </div>

      {/* Navigation groupes */}
      <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tous les groupes</h3>
        <div className="grid grid-cols-4 gap-2">
          {groups.map((g) => (
            <Link key={g.letter} href={`/pronostic-groupe/${g.slug}`} className={`rounded-lg border p-2 text-center text-sm font-bold transition-all ${g.letter === groupLetter ? "border-primary/20 bg-primary text-white shadow-md" : "border-gray-200 dark:border-slate-600 hover:border-primary/30 hover:text-primary"}`}>
              {g.letter}
            </Link>
          ))}
        </div>
      </div>

      {/* CTA paris */}
      <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-6 text-white shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">🎰 Parier sur le Groupe {groupLetter}</h3>
        <p className="text-sm text-white/80 mb-4">Comparez les meilleures cotes pour la qualification dans ce groupe.</p>
        <Link href="/comparateur-cotes" className="block rounded-lg bg-white text-primary font-bold text-center py-2.5 text-sm hover:bg-gray-50 transition-colors">Comparer les cotes →</Link>
      </div>

      {/* Pronostic vainqueur */}
      <div className="rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pronostic vainqueur CDM 2026</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Qui soulèvera le trophée ? Découvrez notre analyse complète.</p>
        <Link href="/pronostic-vainqueur" className="text-sm font-semibold text-primary hover:underline">Voir le pronostic vainqueur →</Link>
      </div>
    </div>
  );
}
