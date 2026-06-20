import { Card } from "@repo/ui/card";
import { DataRow } from "@repo/ui/data-row";
import Image from "next/image";
import Link from "next/link";
import type { Team } from "@repo/data";
import type { TeamPrediction } from "@repo/data/predictions";
import { predictionsByTeamId } from "@repo/data/predictions";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { groups } from "@repo/data/groups";
import { teams } from "../../../../lib/localized-data";
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
      {/* Aktuelle Form */}
      {(() => {
        const mockForms: Record<string, string[]> = {
          france: ["S", "S", "U", "S", "N"],
          brazil: ["S", "U", "S", "S", "S"],
          argentina: ["S", "S", "S", "U", "S"],
          germany: ["S", "N", "S", "U", "S"],
          spain: ["S", "S", "S", "S", "U"],
          england: ["S", "U", "S", "S", "N"],
          portugal: ["S", "S", "N", "S", "S"],
          netherlands: ["U", "S", "S", "N", "S"],
          belgium: ["S", "N", "U", "S", "S"],
          italy: ["S", "S", "U", "N", "S"],
        };
        const form = mockForms[team.slug] ?? ["S", "U", "N", "S", "U"];
        const colors: Record<string, string> = { S: "bg-accent", U: "bg-gray-400", N: "bg-red-500" };
        const labels: Record<string, string> = { S: "Sieg", U: "Unentschieden", N: "Niederlage" };
        return (
          <Card hover padding="md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktuelle Form</h3>
            <p className="text-sm text-gray-500 mb-3">Letzte 5 Spiele</p>
            <div className="flex gap-2">
              {form.map((r, i) => (
                <span key={i} title={labels[r]} className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${colors[r]}`}>{r}</span>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">Richtwerte (Qualifikation)</p>
          </Card>
        );
      })()}

      {/* Mini-Tabelle der Gruppe */}
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
              <Link href={`/gruppe/${team.group.toLowerCase()}`} className="text-primary hover:underline">Gruppe {team.group}</Link>
            </h3>
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase text-gray-500 text-gray-500 text-xs">
                  <th className="py-2 px-2 text-left">#</th>
                  <th className="py-2 px-2 text-left">Mannschaft</th>
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
                      <Link href={`/mannschaft/${row.team.slug}`} className="hover:text-primary flex items-center gap-1">
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
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />Qualifiziert (Top 2)
            </div>
            <p className="mt-1 text-xs text-gray-500">Simulierte Tabelle (vor dem Turnier)</p>
          </Card>
        );
      })()}

      {/* Quick Stats */}
      <Card hover padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Steckbrief</h3>
        <dl className="space-y-3 text-sm">
          <DataRow label="FIFA-Code" value={team.code} />
          <DataRow label="Konföderation" value={team.confederation} />
          <DataRow label="FIFA-Rangliste" value={`#${team.fifaRanking}`} />
          <DataRow label="Gruppe" value={team.group} />
          <DataRow label="WM-Teilnahmen" value={String(team.wcAppearances)} />
          <DataRow label="Bestes Ergebnis" value={team.bestResult} />
        </dl>
      </Card>

      {/* Live Form & Stats */}
      {(enriched?.form || enriched?.goalStats) && (
        <Card hover padding="md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktuelle Form</h3>
          {enriched?.form && (
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Letzte 5 Spiele</p>
              <div className="flex gap-1">
                {enriched?.form.split("").map((r, i) => (
                  <span key={i} className={`flex h-8 w-8 items-center justify-center rounded text-sm font-bold text-white ${r === "W" ? "bg-accent" : r === "D" ? "bg-accent" : r === "L" ? "bg-red-500" : "bg-gray-300"}`}>
                    {r === "W" ? "S" : r === "D" ? "U" : r === "L" ? "N" : r}
                  </span>
                ))}
              </div>
            </div>
          )}
          {enriched?.goalStats && (
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded bg-gray-50 p-2">
                <p className="text-lg font-bold text-field">{enriched?.goalStats.scored}</p>
                <p className="text-xs text-gray-500">Tore erzielt</p>
              </div>
              <div className="rounded bg-gray-50 p-2">
                <p className="text-lg font-bold text-red-500">{enriched?.goalStats.conceded}</p>
                <p className="text-xs text-gray-500">Gegentore</p>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Verletzungen</h3>
          <ul className="space-y-2">
            {enriched?.injuries?.map((inj) => (
              <li key={inj.player} className="flex items-center gap-2 text-sm">
                <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">{inj.type === "Missing Fixture" ? "Ausfall" : inj.type}</span>
                <span className="font-medium">{inj.player}</span>
                <span className="text-gray-500">— {inj.reason}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* CTA Betting */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Prognose {team.name}</h3>
        {prediction ? (
          <div className="space-y-3">
            <dl className="space-y-3 text-sm">
              <DataRow label="Rating ELO"><span className="font-bold text-primary">{prediction.eloRating}</span></DataRow>
              <DataRow label="Gruppenphase überstehen"><span className="font-bold text-field">{Math.round(prediction.groupStageProb * 100)}%</span></DataRow>
              <DataRow label="WM gewinnen"><span className="font-bold text-accent">{prediction.winnerProb >= 0.01 ? `${(prediction.winnerProb * 100).toFixed(1)}%` : `${(prediction.winnerProb * 100).toFixed(2)}%`}</span></DataRow>
            </dl>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Die Prognosen werden in Kürze verfügbar sein.</p>
        )}
      </div>

      {/* Betting CTA */}
      <div className="rounded-lg bg-primary p-6 shadow-md text-white">
        <h3 className="text-lg font-semibold text-white mb-3">Auf {team.name} als Weltmeister wetten</h3>
        <p className="mb-4 text-sm text-white/70">Vergleichen Sie die besten lizenzierten Wettanbieter, um auf {team.name} bei der WM 2026 zu wetten.</p>
        <a href={featuredBookmaker.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="block w-full rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white text-center hover:bg-accent/80 transition-colors">
          {featuredBookmaker.name} - {featuredBookmaker.bonus} → Wetten auf {team.name}
        </a>
        <div className="mt-4 space-y-2">
          {bookmakers.filter((bk) => bk.id !== featuredBookmaker.id).map((bk) => (
            <a key={bk.id} href={bk.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 hover:bg-white/15 transition-colors text-sm">
              <span className="flex items-center gap-3 font-semibold">{bk.logo && <Image src={bk.logo} alt={`Logo ${bk.name}`} width={24} height={24} className="h-6 w-6 rounded object-contain" />}<span>{bk.name}</span> <span className="text-white/60">{bk.bonus}</span></span>
              <span className="text-accent font-semibold whitespace-nowrap">Wetten auf {team.name} →</span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/50">18+. Verantwortungsvolles Spielen.</p>
      </div>

      {/* Related Teams */}
      <Card hover padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mannschaften der Gruppe {team.group}</h3>
        <ul className="space-y-2">
          {groupTeams.map((t) => (
            <li key={t.id}>
              <Link href={`/mannschaft/${t.slug}`} className="flex items-center gap-2 text-sm hover:text-primary">
                <span role="img" aria-label={`Flagge von ${t.name}`}>{t.flag}</span><span>{t.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
