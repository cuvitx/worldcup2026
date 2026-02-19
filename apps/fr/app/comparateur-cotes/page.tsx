"use client";

import { useState } from "react";
import Link from "next/link";
import { mockOdds, allGroups, type MatchOdds } from "./mock-odds";

function getBestOdds(match: MatchOdds) {
  const best = { home: 0, draw: 0, away: 0 };
  for (const o of match.odds) {
    if (o.home > best.home) best.home = o.home;
    if (o.draw > best.draw) best.draw = o.draw;
    if (o.away > best.away) best.away = o.away;
  }
  return best;
}

export default function ComparateurCotesPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  const filtered = selectedGroup === "all"
    ? mockOdds
    : mockOdds.filter((m) => m.group === selectedGroup);

  return (
    <>
      {/* SEO metadata via head — handled by metadata export in layout or generateMetadata */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cdm2026.fr/" },
              { "@type": "ListItem", position: 2, name: "Comparateur de cotes", item: "https://www.cdm2026.fr/comparateur-cotes" },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Comparateur de cotes</li>
          </ol>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 md:text-4xl mb-2">
          Comparateur de cotes – Coupe du Monde 2026
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
          Comparez les cotes des meilleurs bookmakers français pour tous les matchs de la phase de groupes du Mondial 2026.
          Trouvez la meilleure cote pour chaque rencontre.
        </p>

        {/* Group filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedGroup("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              selectedGroup === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Tous les groupes
          </button>
          {allGroups.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                selectedGroup === g
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Groupe {g}
            </button>
          ))}
        </div>

        {/* Matches */}
        <div className="space-y-6">
          {filtered.map((match) => {
            const best = getBestOdds(match);
            return (
              <div key={match.matchId} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Match header */}
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
                      Groupe {match.group}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {match.homeFlag} {match.homeTeam} vs {match.awayTeam} {match.awayFlag}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{match.date} 2026</span>
                </div>

                {/* Odds table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase">
                        <th className="px-4 py-2 text-left font-medium">Bookmaker</th>
                        <th className="px-4 py-2 text-center font-medium">1 ({match.homeTeam})</th>
                        <th className="px-4 py-2 text-center font-medium">N (Nul)</th>
                        <th className="px-4 py-2 text-center font-medium">2 ({match.awayTeam})</th>
                        <th className="px-4 py-2 text-center font-medium">Parier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.odds.map((o, idx) => (
                        <tr key={o.bookmaker} className={`border-t border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                          idx % 2 === 0 ? "bg-gray-50/50 dark:bg-slate-700/50" : "bg-white dark:bg-gray-800"
                        }`}>
                          <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-gray-100">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gray-200 dark:bg-gray-600 text-xs font-bold text-gray-600 dark:text-gray-300">
                                {o.bookmaker.charAt(0)}
                              </span>
                              {o.bookmaker}
                            </div>
                          </td>
                          <td className={`px-4 py-2.5 text-center font-mono font-semibold ${
                            o.home === best.home ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30" : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {o.home.toFixed(2)}
                          </td>
                          <td className={`px-4 py-2.5 text-center font-mono font-semibold ${
                            o.draw === best.draw ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30" : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {o.draw.toFixed(2)}
                          </td>
                          <td className={`px-4 py-2.5 text-center font-mono font-semibold ${
                            o.away === best.away ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30" : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {o.away.toFixed(2)}
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            <a
                              href={o.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="inline-block bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded transition"
                            >
                              Parier →
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg text-sm text-amber-800 dark:text-amber-200">
          <p className="font-semibold mb-1">⚠️ Avertissement</p>
          <p>
            Cotes indicatives, susceptibles de varier. Les cotes affichées sont fournies à titre informatif et peuvent
            évoluer à tout moment. Consultez directement le site du bookmaker pour les cotes en temps réel.
            Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13 (appel non surtaxé).
          </p>
        </div>
      </main>
    </>
  );
}
