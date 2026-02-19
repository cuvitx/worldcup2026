"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { groups } from "@repo/data/groups";

const STORAGE_KEY = "cdm2026-pronostics";

type Pronostics = Record<string, { home: string; away: string }>;

function teamName(id: string): string {
  return teamsById[id]?.name ?? id;
}

function teamFlag(id: string): string {
  return teamsById[id]?.flag ?? "🏳️";
}

export default function GrillePronosticsPage() {
  const [pronostics, setPronostics] = useState<Pronostics>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPronostics(JSON.parse(saved));
    } catch {}
  }, []);

  const save = useCallback(
    (next: Pronostics) => {
      setPronostics(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
    },
    []
  );

  const update = (matchId: string, side: "home" | "away", value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 2);
    save({ ...pronostics, [matchId]: { ...pronostics[matchId], [side]: v } as { home: string; away: string } });
  };

  const groupMatches = matches.filter((m) => m.stage === "group");
  const matchesByGroup = new Map<string, typeof groupMatches>();
  for (const m of groupMatches) {
    const g = m.group ?? "?";
    const list = matchesByGroup.get(g) ?? [];
    list.push(m);
    matchesByGroup.set(g, list);
  }

  const filledCount = Object.values(pronostics).filter((p) => p.home !== "" && p.away !== "").length;

  const generateText = () => {
    let text = "🏆 Mes pronostics CDM 2026\n\n";
    for (const g of groups) {
      const gm = matchesByGroup.get(g.letter);
      if (!gm) continue;
      text += `Groupe ${g.letter}:\n`;
      for (const m of gm) {
        const p = pronostics[m.id];
        const score = p?.home && p?.away ? `${p.home}-${p.away}` : "?-?";
        text += `  ${teamName(m.homeTeamId)} ${score} ${teamName(m.awayTeamId)}\n`;
      }
      text += "\n";
    }
    return text;
  };

  const handleShare = async () => {
    const text = generateText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; color: black; }
          .print-grid input { border: 1px solid #ccc; background: white; color: black; }
        }
      `}</style>

      <nav className="no-print bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li><Link href="/" className="hover:text-secondary00">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/pronostics" className="hover:text-secondary00">Pronostics</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Grille</li>
          </ol>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">📝 Grille de pronostics</h1>
          <p className="mt-2 text-gray-300">
            Entrez vos scores pour les {groupMatches.length} matchs de groupes · {filledCount} remplis
          </p>
          <div className="mt-4 flex flex-wrap gap-3 no-print">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 px-5 py-2.5 text-sm font-semibold transition-colors backdrop-blur-sm"
            >
              📄 Imprimer ma grille
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 px-5 py-2.5 text-sm font-semibold transition-colors backdrop-blur-sm"
            >
              {copied ? "✅ Copié !" : "📤 Partager"}
            </button>
          </div>
        </div>
      </section>

      <div className="print-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => {
            const gm = matchesByGroup.get(g.letter) ?? [];
            return (
              <div
                key={g.letter}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-slate-700 px-4 py-2.5 font-bold text-sm text-gray-900 dark:text-white">
                  Groupe {g.letter}
                </div>
                <div className="divide-y divide-gray-100 dark:divide-slate-700">
                  {gm.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)).map((m) => {
                    const p = pronostics[m.id] ?? { home: "", away: "" };
                    return (
                      <div key={m.id} className="px-4 py-3">
                        <div className="text-xs text-gray-500 dark:text-gray-300 mb-1.5">
                          {new Date(m.date + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} · {m.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex-1 text-right text-sm font-medium text-gray-900 dark:text-white truncate">
                            {teamFlag(m.homeTeamId)} {teamName(m.homeTeamId)}
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={2}
                            value={p.home}
                            onChange={(e) => update(m.id, "home", e.target.value)}
                            className="w-10 h-9 text-center rounded-md border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={`Score ${teamName(m.homeTeamId)}`}
                          />
                          <span className="text-gray-400 font-bold">-</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={2}
                            value={p.away}
                            onChange={(e) => update(m.id, "away", e.target.value)}
                            className="w-10 h-9 text-center rounded-md border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={`Score ${teamName(m.awayTeamId)}`}
                          />
                          <span className="flex-1 text-left text-sm font-medium text-gray-900 dark:text-white truncate">
                            {teamName(m.awayTeamId)} {teamFlag(m.awayTeamId)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
