/* eslint-disable @next/next/no-img-element */
import { Card } from "@repo/ui/card";
import { SectionHeading } from "@repo/ui/section-heading";
import { StatCard } from "@repo/ui/stat-card";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import type { Team, Player } from "@repo/data";
import type { TeamPrediction } from "@repo/data/predictions";
import { teamWorldCupHistory } from "@repo/data/team-history";
import { teamRatings } from "@repo/data/team-ratings";
import { stadiumsById } from "@repo/data/stadiums";
import { teams } from "@repo/data/teams";
import type { generateFullTeamAnalysis } from "@repo/ai/generators";
import RadarChartLazy from "../../../components/RadarChartLazy";
import ExpandablePlayerList from "../ExpandablePlayerList";
import SquadTable from "../SquadTable";

interface TeamMainContentProps {
  team: Team;
  prediction: TeamPrediction | undefined;
  teamPlayers: Player[];
  teamMatches: Array<{ id: string; slug: string; homeTeamId: string; awayTeamId: string; date: string; time: string; matchday?: number; stadiumId: string }>;
  enriched: Awaited<ReturnType<typeof generateFullTeamAnalysis>> | null;
  groupTeams: Team[];
}

export function TeamMainContent({ team, prediction, teamPlayers, teamMatches, enriched, groupTeams }: TeamMainContentProps) {
  return (
    <div className="lg:col-span-2 space-y-8 min-w-0">
      {/* Description */}
      <Card>
        <SectionHeading title="Présentation" />
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words">{team.description}</p>
      </Card>

      {/* Radar Chart */}
      {teamRatings[team.slug] && (
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profil de l&apos;équipe</h2>
          <RadarChartLazy rating={teamRatings[team.slug]!} color="#3b82f6" />
        </section>
      )}

      {/* AI Analysis */}
      {enriched?.analysis && (
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analyse</h2>
            <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">IA</span>
          </div>
          <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(enriched?.analysis.content ?? "") }} />
        </section>
      )}

      {/* World Cup History */}
      {(() => {
        const history = teamWorldCupHistory[team.id];
        return (
          <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Historique en Coupe du Monde</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatCard value={history?.participations ?? team.wcAppearances} label="Participations" />
              <StatCard value={history?.bestResult ?? team.bestResult} label="Meilleur résultat" />
            </div>
            {history && history.yearsParticipated.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Années de participation</h3>
                <div className="flex flex-wrap gap-2">
                  {history.yearsParticipated.map((year) => (
                    <span key={year} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20">{year}</span>
                  ))}
                </div>
              </div>
            )}
            {history && history.notableResults.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Résultats notables</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500text-left">
                        <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300">Année</th>
                        <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300">Stade</th>
                        <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">Détail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.notableResults.map((result, idx) => (
                        <tr key={result.year} className={`border-b border-gray-100 dark:border-slate-700 ${idx % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-slate-700/30"}`}>
                          <td className="px-3 py-2 font-bold text-primary">{result.year}</td>
                          <td className="px-3 py-2 text-gray-800 dark:text-gray-200">{result.stage}</td>
                          <td className="px-3 py-2 text-gray-500 dark:text-gray-300 hidden sm:table-cell">{result.detail ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        );
      })()}

      {/* Palmarès CDM */}
      {teamWorldCupHistory[team.id] && (() => {
        const history = teamWorldCupHistory[team.id]!;
        const titles = history.notableResults.filter((r) => r.stage.includes("Champion"));
        return titles.length > 0 ? (
          <section className="rounded-xl border border-secondary/30 dark:border-secondary/20 bg-secondary/5 dark:bg-slate-800 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <span>🏆</span> Palmarès en Coupe du Monde
            </h2>
            <div className="flex flex-wrap gap-4 mb-4">
              {titles.map((title) => (
                <div key={title.year} className="flex flex-col items-center rounded-xl bg-secondary/10 dark:bg-secondary/20 border border-secondary/40 dark:border-secondary/30 px-5 py-4 min-w-[110px] text-center">
                  <span className="text-4xl mb-1">🏆</span>
                  <span className="text-2xl font-extrabold text-secondary dark:text-secondary">{title.year}</span>
                  {title.detail && <span className="mt-1 text-xs text-gray-600 dark:text-gray-300 leading-snug max-w-[120px]">{title.detail}</span>}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-secondary dark:text-secondary">{titles.length} titre{titles.length > 1 ? "s" : ""} mondial{titles.length > 1 ? "aux" : ""}</span>{" "}
              remporté{titles.length > 1 ? "s" : ""} en Coupe du Monde.
            </p>
          </section>
        ) : null;
      })()}

      {/* Forces & Faiblesses */}
      {teamWorldCupHistory[team.id] && (() => {
        const history = teamWorldCupHistory[team.id]!;
        return (
          <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Forces &amp; Faiblesses</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400 uppercase tracking-wide">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-xs">✓</span>
                  Forces
                </h3>
                <ul className="space-y-2">
                  {history.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-green-500 shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-red-600 dark:text-red-400 uppercase tracking-wide">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-xs">✗</span>
                  Faiblesses
                </h3>
                <ul className="space-y-2">
                  {history.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-red-500 shrink-0" />{w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Style de jeu */}
      {teamWorldCupHistory[team.id]?.playingStyle && (
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Style de jeu</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{teamWorldCupHistory[team.id]!.playingStyle}</p>
        </section>
      )}

      {/* Anecdotes */}
      {teamWorldCupHistory[team.id] && (() => {
        const history = teamWorldCupHistory[team.id]!;
        return history.anecdotes.length > 0 ? (
          <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Anecdotes &amp; Moments inoubliables</h2>
            <div className="space-y-4">
              {history.anecdotes.map((anecdote, idx) => (
                <div key={idx} className="flex gap-4 rounded-lg bg-gray-50 dark:bg-slate-700 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{idx + 1}</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{anecdote}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null;
      })()}

      {/* Predictions */}
      {prediction && (
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pronostics CDM 2026</h2>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/5 px-4 py-2">
              <span className="text-sm text-gray-500">Rating ELO</span>
              <p className="text-2xl font-extrabold text-primary">{prediction.eloRating}</p>
            </div>
            <div className="rounded-lg bg-secondary/10 px-4 py-2">
              <span className="text-sm text-gray-500">Chances de victoire</span>
              <p className="text-2xl font-extrabold text-secondary">{prediction.winnerProb >= 0.01 ? `${(prediction.winnerProb * 100).toFixed(1)}%` : `${(prediction.winnerProb * 100).toFixed(2)}%`}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              { label: "Phase de groupes", value: prediction.groupStageProb },
              { label: "32e de finale", value: prediction.roundOf32Prob },
              { label: "8e de finale", value: prediction.roundOf16Prob },
              { label: "Quart de finale", value: prediction.quarterFinalProb },
              { label: "Demi-finale", value: prediction.semiFinalProb },
              { label: "Finale", value: prediction.finalProb },
            ].map((stage) => (
              <div key={stage.label} className="rounded bg-gray-50 dark:bg-slate-700 p-2 text-center">
                <p className="text-lg font-bold text-primary">{Math.round(stage.value * 100)}%</p>
                <p className="text-xs text-gray-500">{stage.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Effectif probable */}
      {teamPlayers.length > 0 && (
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Effectif probable</h2>
          <p className="mb-4 text-sm text-gray-500">{teamPlayers.length} joueurs sélectionnés</p>
          <SquadTable players={teamPlayers} />
        </section>
      )}

      {/* Key Players */}
      {teamPlayers.length > 0 && (
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Joueurs clés</h2>
          <ExpandablePlayerList players={teamPlayers} />
        </section>
      )}

      {/* Group Matches */}
      {teamMatches.length > 0 && (
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Matchs de groupe</h2>
          <div className="space-y-3">
            {teamMatches.map((match) => {
              const opponent = teams.find((t) => t.id === (match.homeTeamId === team.id ? match.awayTeamId : match.homeTeamId));
              const isHome = match.homeTeamId === team.id;
              return (
                <Link key={match.id} href={`/match/${match.slug}`} className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5">
                  <span className="text-sm text-gray-500 w-20 shrink-0">{match.date.slice(5)}</span>
                  <span className="text-lg" role="img" aria-label={`Drapeau de ${opponent?.name ?? "Inconnu"}`}>{opponent?.flag ?? "🏳️"}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{isHome ? "vs" : "@"} {opponent?.name ?? "A determiner"}</p>
                    <p className="text-xs text-gray-500">J{match.matchday} &middot; {match.time} UTC</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Group Stage */}
      <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          <Link href={`/groupe/${team.group.toLowerCase()}`} className="text-primary dark:text-secondary hover:underline">Groupe {team.group}</Link>
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">Adversaires de {team.name} en phase de groupes :</p>
        <div className="space-y-3">
          {groupTeams.map((opponent) => (
            <div key={opponent.id} className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3">
              <span className="text-2xl" role="img" aria-label={`Drapeau de ${opponent.name}`}>{opponent.flag}</span>
              <div className="flex-1 min-w-0">
                <Link href={`/equipe/${opponent.slug}`} className="font-semibold hover:text-primary">{opponent.name}</Link>
                <p className="text-sm text-gray-500">{opponent.confederation} &middot; #{opponent.fifaRanking} FIFA</p>
              </div>
              <Link href={`/h2h/${team.slug}-vs-${opponent.slug}`} className="shrink-0 rounded bg-primary/10 px-2 py-1 text-xs text-primary font-medium hover:bg-primary/20">H2H &rarr;</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Stadiums */}
      {(() => {
        const teamStadiums = [...new Set(teamMatches.map((m) => m.stadiumId))].map((id) => stadiumsById[id]).filter((s): s is NonNullable<typeof s> => s != null);
        if (teamStadiums.length === 0) return null;
        return (
          <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{teamStadiums.length > 1 ? "Stades" : "Stade"} de {team.name}</h2>
            <div className="space-y-3">
              {teamStadiums.map((stadium) => (
                <Link key={stadium.id} href={`/stade/${stadium.slug}`} className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5">
                  <span className="text-2xl">🏟️</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{stadium.name}</p>
                    <p className="text-sm text-gray-500">{stadium.city} &middot; {stadium.capacity.toLocaleString("fr-FR")} places</p>
                  </div>
                  <span className="text-primary text-sm shrink-0">&rarr;</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}
    </div>
  );
}
