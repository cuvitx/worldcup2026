import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains, getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { groups, groupsBySlug } from "@repo/data/groups";
import { teamsById } from "@repo/data/teams";
import { matchesByGroup } from "@repo/data/matches";
import { predictionsByTeamId } from "@repo/data/predictions";
import { probToOdds } from "@repo/data/affiliates";
import { groupPredictionsByGroup } from "@repo/data/predictions-2026";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ lettre: string }>;
}

export async function generateStaticParams() {
  return groups.map((group) => ({ lettre: group.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lettre } = await params;
  const group = groupsBySlug[lettre];
  if (!group) return {};

  const groupTeams = group.teams
    .map((id) => teamsById[id])
    .filter((t): t is NonNullable<typeof t> => t != null && !t.id.startsWith("barrage"));
  const teamNames = groupTeams.map((t) => t.name).join(", ");

  return {
    title: `Pronostic Groupe ${group.letter} CDM 2026 | Analyse & Qualification`,
    description: `Pronostic Groupe ${group.letter} Coupe du Monde 2026 : ${teamNames}. Classement prédit, analyse des forces, cotes qualification et calendrier complet du groupe.`,
    alternates: getAlternates("group", lettre, "fr"),
    openGraph: {
      title: `Pronostic Groupe ${group.letter} - CDM 2026`,
      description: `${teamNames} — Qui se qualifie ? Analyse et pronostics du Groupe ${group.letter}.`,
    },
  };
}

// ── Helper: sort teams in a group by their group-stage probability ──────────
function getSortedGroupTeams(group: { teams: string[] }) {
  return group.teams
    .map((id) => {
      const team = teamsById[id];
      const pred = predictionsByTeamId[id];
      return { team, pred, id };
    })
    .filter((x) => x.team != null)
    .sort((a, b) => {
      const probA = a.pred?.groupStageProb ?? 0;
      const probB = b.pred?.groupStageProb ?? 0;
      if (probB !== probA) return probB - probA;
      const eloA = a.pred?.eloRating ?? 0;
      const eloB = b.pred?.eloRating ?? 0;
      return eloB - eloA;
    });
}

// ── Arguments for each ranking position ────────────────────────────────────
const RANK_LABEL = ["🥇 1er", "🥈 2e", "🥉 3e", "4e"];
const RANK_COLOR = [
  "border-secondary bg-secondary/5 dark:bg-secondary/10",
  "border-gray-400 bg-gray-50 dark:bg-slate-800/40",
  "border-primary/20 bg-primary/5 dark:bg-primary/10",
  "border-red-300 bg-red-50 dark:bg-red-900/10",
];
const RANK_BADGE = [
  "bg-secondary text-gray-900",
  "bg-gray-300 text-gray-700",
  "bg-primary text-white",
  "bg-red-200 text-red-700",
];

export default async function PronosticGroupPage({ params }: PageProps) {
  const { lettre } = await params;
  const group = groupsBySlug[lettre];
  if (!group) notFound();

  const sortedTeams = getSortedGroupTeams(group);
  const groupMatches = matchesByGroup[group.letter] ?? [];
  const allGroupTeams = group.teams
    .map((id) => teamsById[id])
    .filter((t): t is NonNullable<typeof t> => t != null);

  // The top 2 qualify directly, 3rd may qualify as best third
  const qualified = sortedTeams.slice(0, 2);
  const maybeQualify = sortedTeams[2];
  const eliminated = sortedTeams[3];

  // Enriched prediction data for this group (from predictions-2026)
  const enrichedPrediction = groupPredictionsByGroup[group.letter];
  // Build lookup by teamId for enriched predictions
  const enrichedByTeam: Record<string, { predictedPoints: number; predictedGoalDiff: number; firstProb: number; qualifyProb: number; rank: number }> = {};
  if (enrichedPrediction) {
    for (const tp of enrichedPrediction.teams) {
      enrichedByTeam[tp.teamId] = tp;
    }
  }
  // Sort enriched teams by rank
  const enrichedSorted = enrichedPrediction
    ? [...enrichedPrediction.teams].sort((a, b) => a.rank - b.rank)
    : [];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Pronostics", url: "/pronostic" },
          {
            name: `Pronostic Groupe ${group.letter}`,
            url: `/pronostic-groupe/${lettre}`,
          },
        ]}
        baseUrl={domains.fr}
      />

      {/* Breadcrumb nav */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/pronostic" className="hover:text-primary transition-colors">
                Pronostics
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">
              Groupe {group.letter}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-1">
                Pronostic · Coupe du Monde 2026
              </p>
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Groupe {group.letter}
              </h1>
              <p className="mt-3 text-gray-300 text-lg">
                {allGroupTeams.map((t) => t.flag).join("  ")} &nbsp;
                {allGroupTeams.map((t) => t.name).join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Main Column ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Équipes du groupe */}
            <section className="rounded-xl bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  🌍 Équipes du Groupe {group.letter}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="px-4 py-3 text-left">Équipe</th>
                      <th className="px-4 py-3 text-center">FIFA</th>
                      <th className="px-4 py-3 text-center">Conf.</th>
                      <th className="px-4 py-3 text-center">CDM</th>
                      <th className="px-4 py-3 text-left hidden sm:table-cell">Meilleur résultat</th>
                      <th className="px-4 py-3 text-center">Proba qual.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {sortedTeams.map(({ team, pred }, idx) => (
                      <tr
                        key={team!.id}
                        className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <Link
                            href={`/equipe/${team!.slug}`}
                            className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
                          >
                            <span className="text-xl" aria-label={team!.name}>
                              {team!.flag}
                            </span>
                            <span>{team!.name}</span>
                            {team!.isHost && (
                              <span className="rounded bg-secondary/10 dark:bg-secondary/20 px-1.5 py-0.5 text-xs text-secondary dark:text-secondary">
                                Hôte
                              </span>
                            )}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">
                          {team!.fifaRanking > 0 ? `#${team!.fifaRanking}` : "—"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="rounded-full bg-gray-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {team!.confederation}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">
                          {team!.wcAppearances}
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs hidden sm:table-cell">
                          {team!.bestResult}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {pred ? (
                            <span
                              className={`font-bold text-sm ${
                                idx < 2
                                  ? "text-[#06D6A0] dark:text-[#06D6A0]"
                                  : "text-gray-500 dark:text-gray-300"
                              }`}
                            >
                              {Math.round(pred.groupStageProb * 100)}%
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Classement prédit */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
                🏆 Classement prédit
              </h2>
              <div className="space-y-3">
                {sortedTeams.map(({ team, pred }, idx) => {
                  const qual = idx < 2;
                  return (
                    <div
                      key={team!.id}
                      className={`rounded-xl border-2 p-4 ${RANK_COLOR[idx]}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold ${RANK_BADGE[idx]}`}
                        >
                          {RANK_LABEL[idx]}
                        </span>
                        <span className="text-2xl" aria-label={team!.name}>
                          {team!.flag}
                        </span>
                        <Link
                          href={`/equipe/${team!.slug}`}
                          className="font-bold text-lg hover:text-primary transition-colors"
                        >
                          {team!.name}
                        </Link>
                        {qual && (
                          <span className="ml-auto rounded-full bg-[#06D6A0]/15 dark:bg-[#06D6A0]/10/30 px-2 py-0.5 text-xs font-semibold text-[#06D6A0] dark:text-[#06D6A0]">
                            ✅ Qualifié
                          </span>
                        )}
                        {idx === 2 && (
                          <span className="ml-auto rounded-full bg-secondary/10 dark:bg-secondary/20 px-2 py-0.5 text-xs font-semibold text-secondary dark:text-secondary">
                            ⚠️ Meilleur 3e possible
                          </span>
                        )}
                        {idx === 3 && (
                          <span className="ml-auto rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400">
                            ❌ Éliminé
                          </span>
                        )}
                      </div>
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-600 dark:text-gray-300">
                        <div>
                          <span className="block text-gray-400 uppercase">FIFA</span>
                          <span className="font-semibold">
                            {team!.fifaRanking > 0 ? `#${team!.fifaRanking}` : "—"}
                          </span>
                        </div>
                        {pred && (
                          <>
                            <div>
                              <span className="block text-gray-400 uppercase">ELO</span>
                              <span className="font-semibold">{pred.eloRating}</span>
                            </div>
                            <div>
                              <span className="block text-gray-400 uppercase">Proba groupe</span>
                              <span className="font-semibold">
                                {Math.round(pred.groupStageProb * 100)}%
                              </span>
                            </div>
                            <div>
                              <span className="block text-gray-400 uppercase">Cote victoire</span>
                              <span className="font-semibold">
                                {probToOdds(pred.winnerProb)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Pronostic enrichi (données prédictions-2026) ── */}
            {enrichedSorted.length > 0 && (
              <section className="rounded-xl bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-slate-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    🔮 Pronostic détaillé — Points & Buts attendus
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                    Classement prédit après 3 matchs de groupe · Modèle ELO + cotes bookmakers · Fév. 2026
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                      <tr>
                        <th className="px-4 py-3 text-left">Rang prédit</th>
                        <th className="px-4 py-3 text-left">Équipe</th>
                        <th className="px-4 py-3 text-center">Pts prévus</th>
                        <th className="px-4 py-3 text-center">+/- buts</th>
                        <th className="px-4 py-3 text-center">Prob. 1er</th>
                        <th className="px-4 py-3 text-center">Prob. qual.</th>
                        <th className="px-4 py-3 text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                      {enrichedSorted.map((ep, idx) => {
                        const team = teamsById[ep.teamId];
                        const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "4️⃣";
                        const qualifyBg =
                          idx < 2
                            ? "bg-[#06D6A0]/10 dark:bg-[#06D6A0]/10/10"
                            : idx === 2
                            ? "bg-secondary/5 dark:bg-secondary/10"
                            : "bg-red-50/50 dark:bg-red-900/5";
                        const goalDiffStr =
                          ep.predictedGoalDiff > 0
                            ? `+${ep.predictedGoalDiff}`
                            : `${ep.predictedGoalDiff}`;
                        const goalDiffColor =
                          ep.predictedGoalDiff > 0
                            ? "text-[#06D6A0] dark:text-[#06D6A0]"
                            : ep.predictedGoalDiff < 0
                            ? "text-red-500 dark:text-red-400"
                            : "text-gray-500";
                        return (
                          <tr key={ep.teamId} className={`transition-colors hover:brightness-95 dark:hover:brightness-110 ${qualifyBg}`}>
                            <td className="px-4 py-3 text-center text-xl">{medal}</td>
                            <td className="px-4 py-3">
                              {team ? (
                                <Link
                                  href={`/equipe/${team.slug}`}
                                  className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
                                >
                                  <span className="text-xl">{team.flag}</span>
                                  <span>{team.name}</span>
                                </Link>
                              ) : (
                                <span className="text-gray-500">{ep.teamId}</span>
                              )}
                            </td>
                            {/* Points prévus */}
                            <td className="px-4 py-3 text-center">
                              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 dark:bg-primary/20 font-extrabold text-primary dark:text-white text-base">
                                {ep.predictedPoints}
                              </span>
                            </td>
                            {/* Diff buts */}
                            <td className={`px-4 py-3 text-center font-bold text-base ${goalDiffColor}`}>
                              {goalDiffStr}
                            </td>
                            {/* Prob 1er */}
                            <td className="px-4 py-3 text-center">
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                                  {Math.round(ep.firstProb * 100)}%
                                </span>
                                <div className="w-12 h-1.5 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-secondary rounded-full"
                                    style={{ width: `${Math.round(ep.firstProb * 100)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            {/* Prob qual */}
                            <td className="px-4 py-3 text-center">
                              <div className="flex flex-col items-center gap-1">
                                <span className={`text-xs font-bold ${idx < 2 ? "text-[#06D6A0] dark:text-[#06D6A0]" : "text-gray-500"}`}>
                                  {Math.round(ep.qualifyProb * 100)}%
                                </span>
                                <div className="w-12 h-1.5 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${idx < 2 ? "bg-[#06D6A0]" : idx === 2 ? "bg-secondary" : "bg-red-400"}`}
                                    style={{ width: `${Math.round(ep.qualifyProb * 100)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            {/* Statut */}
                            <td className="px-4 py-3 text-center">
                              {idx < 2 ? (
                                <span className="inline-block rounded-full bg-[#06D6A0]/15 dark:bg-[#06D6A0]/10/30 px-2 py-0.5 text-xs font-semibold text-[#06D6A0] dark:text-[#06D6A0]">
                                  ✅ Qualifié
                                </span>
                              ) : idx === 2 ? (
                                <span className="inline-block rounded-full bg-secondary/10 dark:bg-secondary/20 px-2 py-0.5 text-xs font-semibold text-secondary dark:text-secondary">
                                  ⚠️ Meilleur 3e
                                </span>
                              ) : (
                                <span className="inline-block rounded-full bg-red-100 dark:bg-red-900/20 px-2 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400">
                                  ❌ Éliminé
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-3 bg-gray-50 dark:bg-slate-800/80 border-t border-gray-100 dark:border-slate-700">
                  <p className="text-[11px] text-gray-400 dark:text-gray-400">
                    Pts prévus = total après 3 matchs de groupe · +/- buts = différence de buts attendue · Proba qual. = probabilité de se qualifier (1er ou 2e direct + meilleur 3e inclus)
                  </p>
                </div>
              </section>
            )}

            {/* Pronostic qualification */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🎯 Pronostic qualification
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm leading-relaxed">
                Dans le format de la Coupe du Monde 2026 (48 équipes, 12 groupes de 4),{" "}
                <strong>les 2 premiers de chaque groupe</strong> sont directement qualifiés pour les huitièmes de finale.{" "}
                <strong>8 meilleurs troisièmes</strong> (sur 12) se qualifient également.
              </p>

              {/* Qualified */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#06D6A0] dark:text-[#06D6A0] mb-2">
                  ✅ Qualifiés directs pour les huitièmes
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {qualified.map(({ team, pred }) => (
                    <div
                      key={team!.id}
                      className="flex items-center gap-3 rounded-lg border border-[#06D6A0]/30 dark:border-[#06D6A0]/20 bg-[#06D6A0]/10 dark:bg-[#06D6A0]/10/20 p-3"
                    >
                      <span className="text-2xl">{team!.flag}</span>
                      <div>
                        <Link
                          href={`/pronostic/${team!.slug}`}
                          className="font-bold hover:text-primary transition-colors"
                        >
                          {team!.name}
                        </Link>
                        {pred && (
                          <p className="text-xs text-gray-500 dark:text-gray-300">
                            ELO {pred.eloRating} · {Math.round(pred.groupStageProb * 100)}% qualification
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maybe */}
              {maybeQualify?.team && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary dark:text-secondary mb-2">
                    ⚠️ Meilleur 3e possible
                  </h3>
                  <div className="flex items-center gap-3 rounded-lg border border-secondary/20 dark:border-secondary/30 bg-secondary/5 dark:bg-secondary/10 p-3">
                    <span className="text-2xl">{maybeQualify.team.flag}</span>
                    <div>
                      <Link
                        href={`/pronostic/${maybeQualify.team.slug}`}
                        className="font-bold hover:text-primary transition-colors"
                      >
                        {maybeQualify.team.name}
                      </Link>
                      {maybeQualify.pred && (
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          {Math.round(maybeQualify.pred.groupStageProb * 100)}% de se qualifier comme meilleur 3e · ELO {maybeQualify.pred.eloRating}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Eliminated */}
              {eliminated?.team && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-red-500 dark:text-red-400 mb-2">
                    ❌ Éliminé en phase de groupes
                  </h3>
                  <div className="flex items-center gap-3 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-3">
                    <span className="text-2xl">{eliminated.team.flag}</span>
                    <div>
                      <span className="font-bold">{eliminated.team.name}</span>
                      {eliminated.pred && (
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          Seulement {Math.round(eliminated.pred.groupStageProb * 100)}% de chances de se qualifier · ELO {eliminated.pred.eloRating}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Analyse des forces */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🔍 Analyse des forces en présence
              </h2>
              <div className="space-y-4">
                {sortedTeams.map(({ team, pred }, idx) => (
                  <div key={team!.id} className="border-l-4 border-primary/20 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{team!.flag}</span>
                      <Link
                        href={`/equipe/${team!.slug}`}
                        className="font-bold hover:text-primary transition-colors"
                      >
                        {team!.name}
                      </Link>
                      <span className="text-xs text-gray-400">
                        (#{team!.fifaRanking > 0 ? team!.fifaRanking : "—"} FIFA
                        {pred ? `, ELO ${pred.eloRating}` : ""})
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {team!.description
                        ? team!.description.slice(0, 250) + (team!.description.length > 250 ? "…" : "")
                        : `${team!.name} disputera le Groupe ${group.letter} avec l'objectif de se qualifier pour les huitièmes de finale.`}
                    </p>
                    {pred && (
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-secondary/10 dark:bg-secondary/20 border border-secondary/20 dark:border-secondary/30 px-2 py-1">
                          🏆 Titre : {probToOdds(pred.winnerProb)}
                        </span>
                        <span className="rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 px-2 py-1">
                          🎽 Finale : {Math.round(pred.finalProb * 100)}%
                        </span>
                        <span className="rounded-full bg-field/10 dark:bg-field/20 border border-field/20 dark:border-field/30 px-2 py-1">
                          ✅ Groupe : {Math.round(pred.groupStageProb * 100)}%
                        </span>
                        <Link
                          href={`/pronostic/${team!.slug}`}
                          className="rounded-full bg-primary/10 border border-primary/20 px-2 py-1 text-primary hover:bg-primary/20 transition-colors"
                        >
                          Voir pronostic complet →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Calendrier */}
            {groupMatches.length > 0 && (
              <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  📅 Calendrier du Groupe {group.letter}
                </h2>
                <div className="space-y-2">
                  {groupMatches.map((match) => {
                    const home = teamsById[match.homeTeamId];
                    const away = teamsById[match.awayTeamId];
                    const dateStr = new Date(match.date).toLocaleDateString("fr-FR", {
                      weekday: "short",
                      day: "numeric",
                      month: "long",
                    });
                    return (
                      <Link
                        key={match.id}
                        href={`/match/${match.slug}`}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-all hover:border-primary/30 hover:bg-primary/5 group"
                      >
                        <div className="text-xs text-gray-500 dark:text-gray-300 w-24 shrink-0">
                          <div>{dateStr}</div>
                          <div className="font-medium text-gray-700 dark:text-gray-300">
                            {match.time} UTC
                          </div>
                        </div>
                        <div className="flex flex-1 items-center gap-1 justify-center min-w-0">
                          <span className="text-base shrink-0" aria-label={home?.name}>{home?.flag ?? "🏳️"}</span>
                          <span className="font-semibold text-xs text-right flex-1 min-w-0 truncate">
                            {home?.name ?? "TBD"}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-slate-700 px-1.5 py-1 rounded font-mono shrink-0">
                            vs
                          </span>
                          <span className="font-semibold text-xs flex-1 min-w-0 truncate">
                            {away?.name ?? "TBD"}
                          </span>
                          <span className="text-base shrink-0" aria-label={away?.name}>{away?.flag ?? "🏳️"}</span>
                        </div>
                        <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          Pronostic →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Cotes qualification */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                💰 Cotes de qualification (estimées)
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-400 mb-4">
                Cotes calculées à partir des probabilités ELO avec marge bookmaker (8%). À titre indicatif.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="px-4 py-2 text-left">Équipe</th>
                      <th className="px-4 py-2 text-center">Qual. groupes</th>
                      <th className="px-4 py-2 text-center">1/8 de finale</th>
                      <th className="px-4 py-2 text-center">1/4 de finale</th>
                      <th className="px-4 py-2 text-center">Vainqueur</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {sortedTeams.map(({ team, pred }) => (
                      <tr
                        key={team!.id}
                        className="hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span>{team!.flag}</span>
                            <span className="font-medium">{team!.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center font-mono font-bold text-[#06D6A0] dark:text-[#06D6A0]">
                          {pred ? probToOdds(pred.groupStageProb / 1.08) : "—"}
                        </td>
                        <td className="px-4 py-3 text-center font-mono">
                          {pred ? probToOdds(pred.roundOf16Prob / 1.08) : "—"}
                        </td>
                        <td className="px-4 py-3 text-center font-mono text-gray-500 dark:text-gray-300">
                          {pred ? probToOdds(pred.quarterFinalProb / 1.08) : "—"}
                        </td>
                        <td className="px-4 py-3 text-center font-mono text-gray-400 dark:text-gray-400">
                          {pred ? probToOdds(pred.winnerProb / 1.08) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Liens vers le groupe */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🔗 Liens utiles</h3>
              <div className="space-y-2">
                <Link
                  href={`/groupe/${lettre}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 px-4 py-3 text-sm font-medium transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                >
                  📊 Groupe {group.letter} — statistiques
                </Link>
                {sortedTeams.slice(0, 4).map(({ team }) => (
                  team && (
                    <Link
                      key={team.id}
                      href={`/pronostic/${team.slug}`}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 px-4 py-3 text-sm font-medium transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                    >
                      <span>{team.flag}</span>
                      Pronostic {team.name}
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
                  <Link
                    key={g.letter}
                    href={`/pronostic-groupe/${g.slug}`}
                    className={`rounded-lg border p-2 text-center text-sm font-bold transition-all ${
                      g.letter === group.letter
                        ? "border-primary/20 bg-primary text-white shadow-md"
                        : "border-gray-200 dark:border-slate-600 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {g.letter}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA paris */}
            <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-6 text-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🎰 Parier sur le Groupe {group.letter}
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Comparez les meilleures cotes pour la qualification dans ce groupe.
              </p>
              <Link
                href="/comparateur-cotes"
                className="block rounded-lg bg-white text-primary font-bold text-center py-2.5 text-sm hover:bg-gray-50 transition-colors"
              >
                Comparer les cotes →
              </Link>
            </div>

            {/* Pronostic vainqueur */}
            <div className="rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🏆 Pronostic vainqueur CDM 2026
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Qui soulèvera le trophée ? Découvrez notre analyse complète.
              </p>
              <Link
                href="/pronostic-vainqueur"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Voir le pronostic vainqueur →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `Coupe du Monde 2026 — Groupe ${group.letter}`,
            sport: "Football",
            startDate: groupMatches[0]?.date ?? "2026-06-11",
            competitor: allGroupTeams.map((t) => ({
              "@type": "SportsTeam",
              name: t.name,
            })),
          }),
        }}
      />
    </>
  );
}
