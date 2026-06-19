"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { mockOdds, allGroups, type MatchOdds } from "./mock-odds";
import { PmuBanner } from "../components/PmuBanner";

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
      question: "Wie liest man die Quoten eines Wettanbieters?",
      answer: "Die Quoten stellen die Wahrscheinlichkeit eines Ereignisses und den möglichen Gewinn dar. Zum Beispiel bedeutet eine Quote von 2.00, dass Sie bei einem Einsatz von 10 EUR und einem Gewinn 20 EUR erhalten (10 EUR Einsatz + 10 EUR Gewinn). Je höher die Quote, desto unwahrscheinlicher das Ereignis, aber desto höher der Gewinn. Eine Quote von 1.50 deutet auf einen Favoriten hin (66 % implizite Wahrscheinlichkeit), während eine Quote von 5.00 auf einen Aussenseiter hinweist (20 % implizite Wahrscheinlichkeit)."
    },
    {
      question: "Welcher Wettanbieter bietet die besten Quoten für die WM 2026?",
      answer: "Die Wettanbieter mit den besten Quoten für die WM 2026 variieren je nach Spiel und Markt. Im Allgemeinen bieten PokerStars Sports und Betsson sehr wettbewerbsfähige Quoten bei grossen Spielen. Betano hat seine Quoten in den letzten Jahren ebenfalls verbessert. Unser Vergleich hebt die beste Quote für jedes Ergebnis (Heimsieg, Unentschieden, Auswärtssieg) grün hervor, damit Sie Ihre potenziellen Gewinne maximieren können."
    },
    {
      question: "Werden die angezeigten Quoten in Echtzeit aktualisiert?",
      answer: "Die auf unserem Vergleich angezeigten Quoten werden regelmässig aktualisiert, sind aber nicht in absoluter Echtzeit. Sie sind indikativ und können zum Zeitpunkt Ihrer Wette leicht abweichen. Um die exakten und aktuellen Quoten zu erhalten, klicken Sie auf den Button 'Wetten', der Sie direkt zur Website des jeweiligen Wettanbieters weiterleitet. Die Quoten entwickeln sich je nach Wettvolumen, Verletzungen und Sportnachrichten."
    },
    {
      question: "Was ist eine 1X2-Wette?",
      answer: "Die 1X2-Wette ist die einfachste und beliebteste Wettart im Fussball. '1' steht für den Heimsieg, 'X' für das Unentschieden nach 90 Minuten Spielzeit und '2' für den Auswärtssieg. Zum Beispiel bei Frankreich vs. Brasilien: 1 = Sieg Frankreichs, X = Unentschieden, 2 = Sieg Brasiliens. In der K.-o.-Runde der WM gibt es kein endgültiges Unentschieden (Verlängerung und Elfmeterschiessen bei Bedarf)."
    },
    {
      question: "Wie maximiere ich meine Gewinne mit dem Quotenvergleich?",
      answer: "Um Ihre Gewinne zu maximieren: 1) Vergleichen Sie systematisch die Quoten aller Wettanbieter vor dem Wetten, 2) Zielen Sie auf die grün hervorgehobenen Quoten (Marktbeste), 3) Eröffnen Sie Konten bei mehreren Wettanbietern, um jedes Mal die beste Quote wählen zu können, 4) Nutzen Sie die Willkommensboni, um Ihr Startkapital zu erhöhen, 5) Wetten Sie nie mehr, als Sie verlieren können, und setzen Sie sich Einzahlungslimits. 18+."
    },
    {
      question: "Kann man auf alle Spiele der Gruppenphase wetten?",
      answer: "Ja, alle Wettanbieter bieten Wetten auf alle 72 Spiele der Gruppenphase der WM 2026 an. Unser Vergleich deckt alle Spiele Gruppe für Gruppe (A bis L) ab. Sie können nach Gruppe filtern, um schnell die Spiele zu finden, die Sie interessieren. Neben der 1X2-Wette stehen Dutzende weitere Märkte zur Verfügung: Exaktes Ergebnis, Torschütze, Anzahl der Tore, Handicap, Halbzeit/Ende, Ecken, Karten usw."
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
              { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.wm2026guide.de/" },
              { "@type": "ListItem", position: 2, name: "Quotenvergleich", item: "https://www.wm2026guide.de/quotenvergleich" },
            ],
          }),
        }}
      />

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Sportwetten</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
            Quotenvergleich -- WM 2026
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Vergleichen Sie die Quoten der besten Wettanbieter für alle Gruppenspiele der WM 2026.
            Finden Sie die beste Quote für jede Begegnung.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {/* Group filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
          <button
            onClick={() => setSelectedGroup("all")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition ${
              selectedGroup === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Alle Gruppen
          </button>
          {allGroups.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                selectedGroup === g
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Gruppe {g}
            </button>
          ))}
        </div>

        {/* Matches */}
        <div className="space-y-6">
          {filtered.map((match) => {
            const best = getBestOdds(match);
            return (
              <div key={match.matchId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Match header */}
                <div className="bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded shrink-0">
                      Gruppe {match.group}
                    </span>
                    <span className="font-semibold text-gray-900 text-sm break-words min-w-0">
                      {match.homeFlag} {match.homeTeam} vs {match.awayTeam} {match.awayFlag}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">{match.date} 2026</span>
                </div>

                {/* Odds table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase">
                        <th className="px-4 py-2 text-left font-medium">Bookmaker</th>
                        <th className="px-4 py-2 text-center font-medium">1 ({match.homeTeam})</th>
                        <th className="px-4 py-2 text-center font-medium">X (Unentschieden)</th>
                        <th className="px-4 py-2 text-center font-medium">2 ({match.awayTeam})</th>
                        <th className="px-4 py-2 text-center font-medium">Wetten</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.odds.map((o, idx) => (
                        <tr key={o.bookmaker} className={`border-t border-gray-100 hover:bg-gray-100 transition-colors ${
                          idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                        }`}>
                          <td className="px-4 py-2.5 font-medium text-gray-900">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gray-200 text-xs font-bold text-gray-600">
                                {o.bookmaker.charAt(0)}
                              </span>
                              {o.bookmaker}
                            </div>
                          </td>
                          <td className={`px-4 py-2.5 text-center font-mono font-semibold ${
                            o.home === best.home ? "text-accent bg-accent/10" : "text-gray-700"
                          }`}>
                            {o.home.toFixed(2)}
                          </td>
                          <td className={`px-4 py-2.5 text-center font-mono font-semibold ${
                            o.draw === best.draw ? "text-accent bg-accent/10" : "text-gray-700"
                          }`}>
                            {o.draw.toFixed(2)}
                          </td>
                          <td className={`px-4 py-2.5 text-center font-mono font-semibold ${
                            o.away === best.away ? "text-accent bg-accent/10" : "text-gray-700"
                          }`}>
                            {o.away.toFixed(2)}
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            <a
                              href={o.url}
                              target="_blank"
                              rel="noopener noreferrer sponsored nofollow"
                              className="inline-block bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded transition"
                            >
                              Wetten →
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

        {/* PMU Banner */}
        <section className="py-6 sm:py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PmuBanner tracking="comparateur-cotes" />
          </div>
        </section>

        <div className="mt-16">
          <FAQSection title="Fragen zum Quotenvergleich" items={faqItems} />
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-accent/10 border border-accent/30 rounded-lg text-sm text-accent">
          <p className="font-semibold mb-1">Hinweis</p>
          <p>
            Indikative Quoten, Änderungen vorbehalten. Die angezeigten Quoten dienen nur zur Information und können
            sich jederzeit ändern. Besuchen Sie direkt die Website des Wettanbieters für Echtzeit-Quoten.
            
          </p>
        </div>
      </main>
    </>
  );
}
