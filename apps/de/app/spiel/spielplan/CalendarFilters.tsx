"use client";

import Link from "next/link";
import { MatchRow } from "@repo/ui/match-row";
import { useState, useMemo } from "react";
import { stageLabels } from "@repo/data/constants";
import { pmuTrackingUrl } from "@repo/data/affiliates";

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
  homeScore?: number;
  awayScore?: number;
  status?: "scheduled" | "live" | "finished";
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
      .sort((a, b) => a.name.localeCompare(b.name, "de"));
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
      .sort((a, b) => a.name.localeCompare(b.name, "de"));
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
              <option value=""> Alle Mannschafts</option>
              {teamOptions.map((t) => (
                <option key={t.id} value={t.id}>{t.flag} {t.name}</option>
              ))}
            </select>

            <select value={group} onChange={(e) => setGroup(e.target.value)} className={selectClass}>
              <option value="">Groupe</option>
              {groupOptions.map((g) => (
                <option key={g} value={g}>Gruppe {g}</option>
              ))}
            </select>

            <select value={stadium} onChange={(e) => setStadium(e.target.value)} className={selectClass}>
              <option value="">Stadion</option>
              {stadiumOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select value={phase} onChange={(e) => setPhase(e.target.value)} className={selectClass + " col-span-2 sm:col-span-1"}>
              <option value="">Alle phases</option>
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
          <p className="text-center text-gray-500 py-12">Keine Spiele ne correspond aux filtres sélectionnés.</p>
        ) : (
          Array.from(matchesByStage.entries()).map(([stage, stageMatches], stageIdx) => {
            const byDate = new Map<string, MatchData[]>();
            for (const match of stageMatches) {
              const existing = byDate.get(match.date) ?? [];
              existing.push(match);
              byDate.set(match.date, existing);
            }

            // Insert CTA after 1st phase section (after group stage)
            const showCtaAfter = stageIdx === 0;

            return (
              <div key={stage}>
                <section id={stage}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {stageLabels[stage]}
                  </h2>
                  <div className="space-y-6">
                    {Array.from(byDate.entries()).map(([date, dateMatches], idx) => (
                      <div key={date} className={idx > 0 ? "border-t border-gray-100 pt-4" : ""}>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                          {new Date(date).toLocaleDateString("de-DE", {
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
                                href={`/spiel/${match.slug}`}
                                homeFlag={home?.flag ?? ""}
                                homeName={home?.name ?? "TBD"}
                                awayFlag={away?.flag ?? ""}
                                awayName={away?.name ?? "TBD"}
                                time={match.time}
                                group={match.group}
                                stadium={stad?.name}
                                homeScore={match.homeScore}
                                awayScore={match.awayScore}
                                status={match.status}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {showCtaAfter && <InlineAffiliateCTA />}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

/** Inline affiliate CTA — same visual DNA as PmuBanner (dark gradient, gold accents) */
function InlineAffiliateCTA() {
  const url = pmuTrackingUrl("spielplan-inline");

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#d4af37]/25 text-white shadow-lg mt-10"
      style={{
        background:
          "linear-gradient(135deg, #041511 0%, #0c3b2e 40%, #1a6e4f 100%)",
      }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4af37]/15 blur-3xl"
      />

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        className="group relative flex flex-col sm:flex-row items-center gap-3 sm:gap-5 px-5 py-4 sm:px-6"
      >
        <img
          src="/partners/pmu-play.webp"
          alt="Betano"
          width={120}
          height={36}
          className="h-7 w-auto shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
        />

        <div className="flex-1 text-center sm:text-left">
          <p className="text-[#d4af37] font-bold text-xs sm:text-sm uppercase tracking-wide">
            Wetten auf les matchs de la CDM 2026
          </p>
          <p className="text-white font-extrabold text-xl sm:text-2xl mt-0.5">
            Jusqu&apos;à <span className="text-[#ffd700]">100&nbsp;&euro;</span> Willkommensbonus
          </p>
        </div>

        <span
          className="relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-black uppercase tracking-wider text-[#0c3b2e] shadow-lg transition"
          style={{
            background:
              "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)",
          }}
        >
          {/* Shine */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
          />
          <span className="relative">J&apos;en profite</span>
          <span className="relative" aria-hidden="true">&rarr;</span>
        </span>
      </a>

      {/* Legal */}
      <div className="relative border-t border-white/5 bg-black/25 px-4 py-2 sm:px-5">
        <p className="text-center text-[10px] leading-snug text-white/30">
          18+ | Es gelten die AGB |{" "}
          <a href="tel:0974751313" className="underline text-white/40 hover:text-white/60">
            0800 1 37 27 00
          </a>{" "}
          | Verantwortungsvolles Spielen
        </p>
      </div>
    </div>
  );
}
