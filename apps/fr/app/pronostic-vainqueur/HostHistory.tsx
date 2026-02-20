import { Card } from "@repo/ui/card";
import { SectionHeading } from "@repo/ui/section-heading";

interface CdmHomeStat {
  year: number;
  host: string;
  winner: string;
  hostWon: boolean;
  hostFlag: string;
  note: string;
}

interface HostHistoryProps {
  cdmHomeStats: CdmHomeStat[];
  homeWins: number;
  totalEditions: number;
  homeWinPct: number;
}

export function HostHistory({ cdmHomeStats, homeWins, totalEditions, homeWinPct }: HostHistoryProps) {
  return (
    <section id="historique" className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Historique : qui a gagné à domicile ?" subtitle="Le pays hôte peut-il vraiment faire la différence ? Retour sur 22 éditions." />

        {/* Stats globales */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <Card hover padding="md" className="text-center">
            <p className="text-4xl font-extrabold text-primary mb-1">{homeWins}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">pays hôtes vainqueurs</p>
            <p className="text-xs text-gray-500 mt-1">sur {totalEditions} éditions depuis 1930</p>
          </Card>
          <Card hover padding="md" className="text-center">
            <p className="text-4xl font-extrabold text-accent mb-1">{homeWinPct}%</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">taux de victoire à domicile</p>
            <p className="text-xs text-gray-500 mt-1">Avantage terrain non négligeable</p>
          </Card>
          <div className="rounded-xl border border-accent/30 dark:border-accent/20 bg-accent/10 dark:bg-accent/10 p-5 text-center">
            <p className="text-4xl font-extrabold text-accent mb-1">3</p>
            <p className="text-sm text-accent dark:text-accent font-medium">pays hôtes en 2026</p>
            <p className="text-xs text-accent/70 dark:text-accent/70 mt-1">USA, Canada, Mexique — triple avantage terrain</p>
          </div>
        </div>

        {/* Pays hôtes vainqueurs */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Les 6 champions du monde à domicile
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cdmHomeStats.filter((s) => s.hostWon).map((s) => (
              <div
                key={s.year}
                className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 dark:bg-secondary/10 p-4"
              >
                <span className="text-3xl">{s.hostFlag}</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {s.host} {s.year}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{s.note}</p>
                </div>
                <span className="ml-auto text-accent font-extrabold text-lg"></span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline complète (compacte) */}
        <details className="group">
          <summary className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-primary hover:underline list-none mb-4">
            <svg className="w-4 h-4 group-open:rotate-90 transition-transform duration-200 inline-block" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
            Voir l&apos;historique complet ({totalEditions} éditions)
          </summary>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500text-gray-700 dark:text-gray-300">
                  <th className="text-left px-3 py-2">Année</th>
                  <th className="text-left px-3 py-2">Hôte</th>
                  <th className="text-left px-3 py-2">Vainqueur</th>
                  <th className="text-left px-3 py-2 hidden sm:table-cell">Anecdote</th>
                  <th className="text-center px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {cdmHomeStats.map((s, i) => (
                  <tr
                    key={s.year}
                    className={`border-t border-gray-100 dark:border-slate-700/50 ${
                      s.hostWon
                        ? "bg-primary/5 dark:bg-secondary/10"
                        : i % 2 === 0 ? "bg-white dark:bg-slate-800/50" : "bg-gray-50/50 dark:bg-slate-800"
                    }`}
                  >
                    <td className="px-3 py-2 font-bold text-gray-900 dark:text-white">{s.year}</td>
                    <td className="px-3 py-2">
                      <span className="mr-1">{s.hostFlag}</span>
                      {s.host}
                    </td>
                    <td className={`px-3 py-2 font-semibold ${s.hostWon ? "text-accent" : "text-gray-600 dark:text-gray-300"}`}>
                      {s.winner} {s.hostWon ? "" : ""}
                    </td>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-300 hidden sm:table-cell">{s.note}</td>
                    <td className="px-3 py-2 text-center">
                      {s.hostWon ? <span className="text-success font-bold">✓</span> : <span className="text-red-400">✗</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        {/* Impact pour 2026 */}
        <div className="mt-6 rounded-xl border border-primary/20 dark:border-secondary/30 bg-primary/5 dark:bg-secondary/10 p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-primary mb-2">
            🔭 Implications pour 2026 : États-Unis, Canada, Mexique
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Pour la première fois de l&apos;histoire, <strong>3 pays partagent l&apos;organisation</strong>. L&apos;avantage terrain est donc dilué mais présent. Historiquement, le pays hôte bénéficie de <strong>+6 à +8 pts ELO</strong> grâce au soutien du public et à la connaissance des conditions locales.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { flag: "🇺🇸", name: "États-Unis", note: "Jouent devant 80 000 supporters à domicile. Objectif réaliste : quarts de finale.", chance: "4.2%" },
              { flag: "🇨🇦", name: "Canada", note: "Alphonso Davies au sommet. Première CDM — la ferveur peut créer des miracles.", chance: "1.8%" },
              { flag: "🇲🇽", name: "Mexique", note: "L'Azteca en altitude (2240m) — avantage physique considérable en phase de groupes.", chance: "2.1%" },
            ].map((host) => (
              <div key={host.name} className="rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{host.flag}</span>
                  <span className="font-bold text-sm text-gray-900 dark:text-white">{host.name}</span>
                  <span className="ml-auto text-xs font-bold text-primary">{host.chance}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">{host.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
