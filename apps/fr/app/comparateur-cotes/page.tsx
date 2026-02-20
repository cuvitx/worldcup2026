"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
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

  const faqItems = [
    {
      question: "Comment lire les cotes d'un bookmaker ?",
      answer: "Les cotes représentent la probabilité d'un événement et le gain potentiel. Par exemple, une cote à 2.00 signifie que si vous pariez 10€ et gagnez, vous récupérez 20€ (10€ de mise + 10€ de gain). Plus la cote est élevée, moins l'événement est probable mais plus le gain est important. Une cote à 1.50 indique un favori (66% de chances implicites), tandis qu'une cote à 5.00 indique un outsider (20% de chances implicites)."
    },
    {
      question: "Quel bookmaker propose les meilleures cotes pour la CDM 2026 ?",
      answer: "Les bookmakers avec les meilleures cotes pour la Coupe du Monde 2026 varient selon les matchs et les marchés. En général, Winamax et Betclic proposent des cotes très compétitives sur les grands matchs. ParionsSport (FDJ) a également amélioré ses cotes ces dernières années. Notre comparateur met en surbrillance en vert la meilleure cote pour chaque issue (victoire domicile, match nul, victoire extérieur), ce qui vous permet de maximiser vos gains potentiels."
    },
    {
      question: "Les cotes affichées sont-elles en temps réel ?",
      answer: "Les cotes affichées sur notre comparateur sont mises à jour régulièrement mais ne sont pas en temps réel absolu. Elles sont indicatives et peuvent varier légèrement au moment où vous placez votre pari. Pour obtenir les cotes exactes et actualisées, cliquez sur le bouton 'Parier' qui vous redirige directement vers le site du bookmaker concerné. Les cotes évoluent en fonction des volumes de paris, des blessures et des nouvelles sportives."
    },
    {
      question: "Qu'est-ce qu'un pari 1N2 ?",
      answer: "Le pari 1N2 est le type de pari le plus simple et le plus populaire en football. '1' représente la victoire de l'équipe à domicile, 'N' (Nul) représente le match nul après 90 minutes de jeu, et '2' représente la victoire de l'équipe à l'extérieur. Par exemple, pour France vs Brésil : 1 = victoire de la France, N = match nul, 2 = victoire du Brésil. En phase à élimination directe de la CDM, il n'y a pas de match nul définitif (prolongations et tirs au but si besoin)."
    },
    {
      question: "Comment maximiser mes gains avec le comparateur de cotes ?",
      answer: "Pour maximiser vos gains : 1) Comparez systématiquement les cotes de tous les bookmakers avant de parier, 2) Ciblez les cotes surlignées en vert (meilleures du marché), 3) Ouvrez des comptes sur plusieurs bookmakers pour pouvoir choisir la meilleure cote à chaque fois, 4) Profitez des bonus de bienvenue pour augmenter votre capital de départ, 5) Ne pariez jamais plus que ce que vous pouvez perdre et fixez-vous des limites de dépôt. 18+."
    },
    {
      question: "Peut-on parier sur tous les matchs de la phase de groupes ?",
      answer: "Oui, tous les bookmakers français proposent des paris sur l'intégralité des 72 matchs de la phase de groupes de la CDM 2026. Notre comparateur couvre tous les matchs groupe par groupe (A à L). Vous pouvez filtrer par groupe pour trouver rapidement les matchs qui vous intéressent. En plus du pari 1N2, des dizaines d'autres marchés sont disponibles : score exact, buteur, nombre de buts, handicap, mi-temps/fin, corners, cartons, etc."
    }
  ];

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
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Comparateur de cotes</li>
          </ol>
        </div>
      </nav>

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Paris sportifs</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
            Comparateur de cotes – Coupe du Monde 2026
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comparez les cotes des meilleurs bookmakers français pour tous les matchs de la phase de groupes du Mondial 2026.
            Trouvez la meilleure cote pour chaque rencontre.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {/* Group filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedGroup("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              selectedGroup === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
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
              <div key={match.matchId} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Match header */}
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded shrink-0">
                      Groupe {match.group}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm break-words min-w-0">
                      {match.homeFlag} {match.homeTeam} vs {match.awayTeam} {match.awayFlag}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-300 shrink-0">{match.date} 2026</span>
                </div>

                {/* Odds table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 dark:text-gray-300 text-xs uppercase">
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
                          idx % 2 === 0 ? "bg-gray-50/50 dark:bg-slate-700/50" : "bg-white dark:bg-slate-800"
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
                            o.home === best.home ? "text-success dark:text-success bg-success//10 dark:bg-success//10" : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {o.home.toFixed(2)}
                          </td>
                          <td className={`px-4 py-2.5 text-center font-mono font-semibold ${
                            o.draw === best.draw ? "text-success dark:text-success bg-success//10 dark:bg-success//10" : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {o.draw.toFixed(2)}
                          </td>
                          <td className={`px-4 py-2.5 text-center font-mono font-semibold ${
                            o.away === best.away ? "text-success dark:text-success bg-success//10 dark:bg-success//10" : "text-gray-700 dark:text-gray-300"
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

        <div className="mt-16">
          <FAQSection title="❓ Questions sur le comparateur de cotes" items={faqItems} />
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-accent//10 dark:bg-accent//10 border border-accent//30 dark:border-accent//20 rounded-lg text-sm text-accent dark:text-accent">
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
