"use client";

import Link from "next/link";
import { MatchRow } from "@repo/ui/match-row";
import { useState, useMemo } from "react";
import { stageLabels } from "@repo/data/constants";

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
      .filter((t): t is TeamInfo => Boolean(t))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
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
      .filter((s): s is StadiumInfo => Boolean(s))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
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

  const selectClass = "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary/20 focus:ring-1 focus:ring-primary outline-none";

  return (
    <>
      {/* Filters */}
      <section className="border-b border-gray-200 bg-gray-50 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-2 sm:gap-3">
            <select value={team} onChange={(e) => setTeam(e.target.value)} className={selectClass + " col-span-2 sm:col-span-1"}>
              <option value=""> Toutes les équipes</option>
              {teamOptions.map((t) => (
                <option key={t.id} value={t.id}>{t.flag} {t.name}</option>
              ))}
            </select>

            <select value={group} onChange={(e) => setGroup(e.target.value)} className={selectClass}>
              <option value="">Groupe</option>
              {groupOptions.map((g) => (
                <option key={g} value={g}>Groupe {g}</option>
              ))}
            </select>

            <select value={stadium} onChange={(e) => setStadium(e.target.value)} className={selectClass}>
              <option value="">Stade</option>
              {stadiumOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select value={phase} onChange={(e) => setPhase(e.target.value)} className={selectClass + " col-span-2 sm:col-span-1"}>
              <option value="">Toutes les phases</option>
              {phaseOptions.map((p) => (
                <option key={p} value={p}>{stageLabels[p]}</option>
              ))}
            </select>

            {hasFilters && (
              <button
                onClick={reset}
                className="col-span-2 sm:col-span-1 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition-colors"
              >
                ✕ Réinitialiser
              </button>
            )}
          </div>
          {hasFilters && (
            <p className="mt-2 text-sm text-gray-600">
              {filtered.length} match{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </section>

      {/* Quick nav */}
      <section className="border-b border-gray-200 bg-white py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {Array.from(matchesByStage.entries()).map(([stage, sm]) => (
              <a
                key={stage}
                href={`#${stage}`}
                className="shrink-0 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {stageLabels[stage]} ({sm.length})
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Match list */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {stageLabels[stage]}
                </h2>
                <div className="space-y-6">
                  {Array.from(byDate.entries()).map(([date, dateMatches], idx) => (
                    <div key={date} className={idx > 0 ? "border-t border-gray-100 pt-4" : ""}>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        {new Date(date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {dateMatches.map((match) => {
                          const home = teamsById[match.homeTeamId];
                          const away = teamsById[match.awayTeamId];
                          const stad = stadiumsById[match.stadiumId];

                          return (
                            <MatchRow
                              key={match.id}
                              href={`/match/${match.slug}`}
                              homeFlag={home?.flag ?? ""}
                              homeName={home?.name ?? "TBD"}
                              awayFlag={away?.flag ?? ""}
                              awayName={away?.name ?? "TBD"}
                              time={match.time}
                              group={match.group}
                              stadium={stad?.name}
                            />
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
