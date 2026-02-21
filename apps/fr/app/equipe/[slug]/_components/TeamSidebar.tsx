import { Card } from "@repo/ui/card";
import { DataRow } from "@repo/ui/data-row";
import Image from "next/image";
import Link from "next/link";
import type { Team } from "@repo/data";
import type { TeamPrediction } from "@repo/data/predictions";
import { predictionsByTeamId } from "@repo/data/predictions";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { groups } from "@repo/data/groups";
import { teams } from "@repo/data/teams";
import type { generateFullTeamAnalysis } from "@repo/ai/generators";

interface TeamSidebarProps {
  team: Team;
  prediction: TeamPrediction | undefined;
  groupTeams: Team[];
  enriched: Awaited<ReturnType<typeof generateFullTeamAnalysis>> | null;
}

export function TeamSidebar({ team, prediction, groupTeams, enriched }: TeamSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Forme récente */}
      {(() => {
        const mockForms: Record<string, string[]> = {
          france: ["V", "V", "N", "V", "D"],
          brazil: ["V", "N", "V", "V", "V"],
          argentina: ["V", "V", "V", "N", "V"],
          germany: ["V", "D", "V", "N", "V"],
          spain: ["V", "V", "V", "V", "N"],
          england: ["V", "N", "V", "V", "D"],
          portugal: ["V", "V", "D", "V", "V"],
          netherlands: ["N", "V", "V", "D", "V"],
          belgium: ["V", "D", "N", "V", "V"],
          italy: ["V", "V", "N", "D", "V"],
        };
        const form = mockForms[team.slug] ?? ["V", "N", "D", "V", "N"];
        const colors: Record<string, string> = { V: "bg-accent", N: "bg-gray-400", D: "bg-red-500" };
        const labels: Record<string, string> = { V: "Victoire", N: "Nul", D: "Défaite" };
        return (
          <Card hover padding="md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Forme récente</h3>
            <p className="text-sm text-gray-500 mb-3">5 derniers matchs</p>
            <div className="flex gap-2">
              {form.map((r, i) => (
                <span key={i} title={labels[r]} className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${colors[r]}`}>{r}</span>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">Données indicatives (qualifications)</p>
          </Card>
        );
      })()}

      {/* Mini classement du groupe */}
      {(() => {
        const group = groups.find((g) => g.letter === team.group);
        if (!group) return null;
        const allGroupTeams = group.teams.map((id) => teams.find((t) => t.id === id)).filter((t): t is NonNullable<typeof t> => t != null);
        const standings = allGroupTeams
          .map((t) => {
            const seed = t.fifaRanking;
            const pts = seed <= 10 ? 7 : seed <= 25 ? 5 : seed <= 50 ? 3 : 1;
            const gf = seed <= 10 ? 5 : seed <= 25 ? 3 : seed <= 50 ? 2 : 1;
            const ga = seed <= 10 ? 1 : seed <= 25 ? 2 : seed <= 50 ? 3 : 5;
            return { team: t, pts, gf, ga, gd: gf - ga };
          })
          .sort((a, b) => b.pts - a.pts || b.gd - a.gd);
        return (
          <Card hover padding="md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <Link href={`/groupe/${team.group.toLowerCase()}`} className="text-primary hover:underline">Groupe {team.group}</Link>
            </h3>
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase text-gray-500 text-gray-500 text-xs">
                  <th className="py-2 px-2 text-left">#</th>
                  <th className="py-2 px-2 text-left">Équipe</th>
                  <th className="py-2 px-2 text-center">Pts</th>
                  <th className="py-2 px-2 text-center">+/-</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, idx) => (
                  <tr key={row.team.id} className={`border-b border-gray-100 ${row.team.id === team.id ? "bg-primary/5 font-bold" : ""}`}>
                    <td className="py-2">
                      <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${idx < 2 ? "bg-accent/10 text-accent" : "bg-gray-100 text-gray-500"}`}>{idx + 1}</span>
                    </td>
                    <td className="py-2">
                      <Link href={`/equipe/${row.team.slug}`} className="hover:text-primary flex items-center gap-1">
                        <span>{row.team.flag}</span><span className="truncate">{row.team.code}</span>
                      </Link>
                    </td>
                    <td className="py-2 text-center font-bold">{row.pts}</td>
                    <td className="py-2 text-center">
                      <span className={row.gd > 0 ? "text-accent" : row.gd < 0 ? "text-red-500" : "text-gray-500"}>{row.gd > 0 ? "+" : ""}{row.gd}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />Qualifié (top 2)
            </div>
            <p className="mt-1 text-xs text-gray-500">Classement simulé (pré-tournoi)</p>
          </Card>
        );
      })()}

      {/* Quick Stats */}
      <Card hover padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiche technique</h3>
        <dl className="space-y-3 text-sm">
          <DataRow label="Code FIFA" value={team.code} />
          <DataRow label="Confederation" value={team.confederation} />
          <DataRow label="Classement FIFA" value={`#${team.fifaRanking}`} />
          <DataRow label="Groupe" value={team.group} />
          <DataRow label="Participations CDM" value={String(team.wcAppearances)} />
          <DataRow label="Meilleur résultat" value={team.bestResult} />
        </dl>
      </Card>

      {/* Live Form & Stats */}
      {(enriched?.form || enriched?.goalStats) && (
        <Card hover padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Forme actuelle</h3>
          {enriched?.form && (
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">5 derniers matchs</p>
              <div className="flex gap-1">
                {enriched?.form.split("").map((r, i) => (
                  <span key={i} className={`flex h-8 w-8 items-center justify-center rounded text-sm font-bold text-white ${r === "W" ? "bg-accent" : r === "D" ? "bg-accent" : r === "L" ? "bg-red-500" : "bg-gray-300"}`}>
                    {r === "W" ? "V" : r === "D" ? "N" : r === "L" ? "D" : r}
                  </span>
                ))}
              </div>
            </div>
          )}
          {enriched?.goalStats && (
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded bg-gray-50 p-2">
                <p className="text-lg font-bold text-field">{enriched?.goalStats.scored}</p>
                <p className="text-xs text-gray-500">Buts marques</p>
              </div>
              <div className="rounded bg-gray-50 p-2">
                <p className="text-lg font-bold text-red-500">{enriched?.goalStats.conceded}</p>
                <p className="text-xs text-gray-500">Buts encaisses</p>
              </div>
              <div className="rounded bg-gray-50 p-2">
                <p className="text-lg font-bold text-primary">{enriched?.goalStats.cleanSheets}</p>
                <p className="text-xs text-gray-500">Clean sheets</p>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Injuries */}
      {(enriched?.injuries?.length ?? 0) > 0 && (
        <Card hover padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Blessures</h3>
          <ul className="space-y-2">
            {enriched?.injuries?.map((inj) => (
              <li key={inj.player} className="flex items-center gap-2 text-sm">
                <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">{inj.type === "Missing Fixture" ? "Absent" : inj.type}</span>
                <span className="font-medium">{inj.player}</span>
                <span className="text-gray-500">— {inj.reason}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* CTA Betting */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Pronostic {team.name}</h3>
        {prediction ? (
          <div className="space-y-3">
            <dl className="space-y-3 text-sm">
              <DataRow label="Rating ELO"><span className="font-bold text-primary">{prediction.eloRating}</span></DataRow>
              <DataRow label="Passer les groupes"><span className="font-bold text-field">{Math.round(prediction.groupStageProb * 100)}%</span></DataRow>
              <DataRow label="Gagner la CDM"><span className="font-bold text-accent">{prediction.winnerProb >= 0.01 ? `${(prediction.winnerProb * 100).toFixed(1)}%` : `${(prediction.winnerProb * 100).toFixed(2)}%`}</span></DataRow>
            </dl>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Les pronostics seront disponibles prochainement.</p>
        )}
      </div>

      {/* Betting CTA */}
      <div className="rounded-lg bg-primary p-6 shadow-md text-white">
        <h3 className="text-lg font-semibold text-white mb-3">Parier sur {team.name} championne</h3>
        <p className="mb-4 text-sm text-white/70">Comparez les meilleurs sites agréés pour parier sur {team.name} à la Coupe du Monde 2026.</p>
        <a href={featuredBookmaker.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="block w-full rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white text-center hover:bg-accent/80 transition-colors">
          {featuredBookmaker.name} - {featuredBookmaker.bonus} → Parier sur {team.name}
        </a>
        <div className="mt-4 space-y-2">
          {bookmakers.filter((bk) => bk.id !== featuredBookmaker.id).map((bk) => (
            <a key={bk.id} href={bk.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 hover:bg-white/15 transition-colors text-sm">
              <span className="flex items-center gap-3 font-semibold">{bk.logo && <Image src={bk.logo} alt={`Logo ${bk.name}`} width={24} height={24} className="h-6 w-6 rounded object-contain" />}<span>{bk.name}</span> <span className="text-white/60">{bk.bonus}</span></span>
              <span className="text-accent font-semibold whitespace-nowrap">Parier sur {team.name} →</span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/50">18+. Pariez responsablement.</p>
      </div>

      {/* Related Teams */}
      <Card hover padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Équipes du groupe {team.group}</h3>
        <ul className="space-y-2">
          {groupTeams.map((t) => (
            <li key={t.id}>
              <Link href={`/equipe/${t.slug}`} className="flex items-center gap-2 text-sm hover:text-primary">
                <span role="img" aria-label={`Drapeau de ${t.name}`}>{t.flag}</span><span>{t.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
