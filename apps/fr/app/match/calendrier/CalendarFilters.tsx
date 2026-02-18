"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

interface MatchData {
  id: string;
  slug: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time: string;
  stadiumId: string;
  stage: string;
  group?: string;
}

interface TeamInfo {
  id: string;
  name: string;
  flag: string;
}

interface StadiumInfo {
  id: string;
  name: string;
}

const stageLabels: Record<string, string> = {
  group: "Phase de groupes",
  "round-of-32": "32es de finale",
  "round-of-16": "Huitièmes de finale",
  "quarter-final": "Quarts de finale",
  "semi-final": "Demi-finales",
  "third-place": "Match pour la 3e place",
  final: "Finale",
};

const stageOrder = [
  "group",
  "round-of-32",
  "round-of-16",
  "quarter-final",
  "semi-final",
  "third-place",
  "final",
];

interface Props {
  matches: MatchData[];
  teamsById: Record<string, TeamInfo>;
  stadiumsById: Record<string, StadiumInfo>;
}

export default function CalendarFilters({ matches, teamsById, stadiumsById }: Props) {
  const [team, setTeam] = useState("");
  const [group, setGroup] = useState("");
  const [stadium, setStadium] = useState("");
  const [phase, setPhase] = useState("");

  // Build option lists
  const teamOptions = useMemo(() => {
    const ids = new Set<string>();
    matches.forEach((m) => { ids.add(m.homeTeamId); ids.add(m.awayTeamId); });
    return Array.from(ids)
      .map((id) => teamsById[id])
      .filter(Boolean)
      .sort((a, b) => a!.name.localeCompare(b!.name, "fr"));
  }, [matches, teamsById]);

  const groupOptions = useMemo(() => {
    const gs = new Set<string>();
    matches.forEach((m) => { if (m.group) gs.add(m.group); });
    return Array.from(gs).sort();
  }, [matches]);

  const stadiumOptions = useMemo(() => {
    const ids = new Set<string>();
    matches.forEach((m) => ids.add(m.stadiumId));
    return Array.from(ids)
      .map((id) => stadiumsById[id])
      .filter(Boolean)
      .sort((a, b) => a!.name.localeCompare(b!.name, "fr"));
  }, [matches, stadiumsById]);

  const phaseOptions = useMemo(() => {
    const stages = new Set<string>();
    matches.forEach((m) => stages.add(m.stage));
    return stageOrder.filter((s) => stages.has(s));
  }, [matches]);

  const hasFilters = team || group || stadium || phase;

  // Filter matches
  const filtered = useMemo(() => {
    return matches.filter((m) => {
      if (team && m.homeTeamId !== team && m.awayTeamId !== team) return false;
      if (group && m.group !== group) return false;
      if (stadium && m.stadiumId !== stadium) return false;
      if (phase && m.stage !== phase) return false;
      return true;
    });
  }, [matches, team, group, stadium, phase]);

  // Group by stage then date
  const matchesByStage = useMemo(() => {
    const map = new Map<string, MatchData[]>();
    for (const stage of stageOrder) {
      const sm = filtered.filter((m) => m.stage === stage);
      if (sm.length > 0) map.set(stage, sm);
    }
    return map;
  }, [filtered]);

  const reset = () => { setTeam(""); setGroup(""); setStadium(""); setPhase(""); };

  const selectClass = "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none";

  return (
    <>
      {/* Filters */}
      <section className="border-b border-gray-200 bg-gray-50 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-gray-600">Filtres :</span>

            <select value={team} onChange={(e) => setTeam(e.target.value)} className={selectClass}>
              <option value="">Toutes les équipes</option>
              {teamOptions.map((t) => (
                <option key={t.id} value={t.id}>{t.flag} {t.name}</option>
              ))}
            </select>

            <select value={group} onChange={(e) => setGroup(e.target.value)} className={selectClass}>
              <option value="">Tous les groupes</option>
              {groupOptions.map((g) => (
                <option key={g} value={g}>Groupe {g}</option>
              ))}
            </select>

            <select value={stadium} onChange={(e) => setStadium(e.target.value)} className={selectClass}>
              <option value="">Tous les stades</option>
              {stadiumOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select value={phase} onChange={(e) => setPhase(e.target.value)} className={selectClass}>
              <option value="">Toutes les phases</option>
              {phaseOptions.map((p) => (
                <option key={p} value={p}>{stageLabels[p]}</option>
              ))}
            </select>

            {hasFilters && (
              <button
                onClick={reset}
                className="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition-colors"
              >
                ✕ Réinitialiser
              </button>
            )}
          </div>
          {hasFilters && (
            <p className="mt-2 text-sm text-gray-500">
              {filtered.length} match{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </section>

      {/* Quick nav */}
      <section className="border-b border-gray-200 bg-white py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-2">
            {Array.from(matchesByStage.entries()).map(([stage, sm]) => (
              <a
                key={stage}
                href={`#${stage}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-accent/10 hover:text-accent transition-colors"
              >
                {stageLabels[stage]} ({sm.length})
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Match list */}
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-12">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12">Aucun match ne correspond aux filtres sélectionnés.</p>
        ) : (
          Array.from(matchesByStage.entries()).map(([stage, stageMatches]) => {
            const byDate = new Map<string, MatchData[]>();
            for (const match of stageMatches) {
              const existing = byDate.get(match.date) ?? [];
              existing.push(match);
              byDate.set(match.date, existing);
            }

            return (
              <section key={stage} id={stage}>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {stageLabels[stage]}
                </h2>
                <div className="space-y-6">
                  {Array.from(byDate.entries()).map(([date, dateMatches]) => (
                    <div key={date}>
                      <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        {new Date(date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </h3>
                      <div className="space-y-2">
                        {dateMatches.map((match) => {
                          const home = teamsById[match.homeTeamId];
                          const away = teamsById[match.awayTeamId];
                          const stad = stadiumsById[match.stadiumId];

                          return (
                            <Link
                              key={match.id}
                              href={`/match/${match.slug}`}
                              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-accent hover:bg-accent/5"
                            >
                              <span className="text-sm text-gray-500 w-12 text-center shrink-0">
                                {match.time}
                              </span>
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-lg">{home?.flag ?? "🏳️"}</span>
                                <span className="font-medium truncate">{home?.name ?? "À déterminer"}</span>
                              </div>
                              <span className="text-xs text-gray-400 shrink-0">vs</span>
                              <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                                <span className="font-medium truncate text-right">{away?.name ?? "À déterminer"}</span>
                                <span className="text-lg">{away?.flag ?? "🏳️"}</span>
                              </div>
                              {match.group && (
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 shrink-0">
                                  Gr. {match.group}
                                </span>
                              )}
                              {stad && (
                                <span className="text-xs text-gray-400 hidden sm:block shrink-0 w-32 text-right truncate">
                                  {stad.name}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
    </>
  );
}
