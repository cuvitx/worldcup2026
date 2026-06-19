import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Layers, ArrowRight, AlertTriangle, CheckCircle, XCircle, Calculator, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Kombiwetten-Ratgeber WM 2026 — Kombi, System, Trixie, Yankee",
  description:
    "Kombiwetten WM 2026: Kombi, System, Trixie, Yankee. Konkrete Beispiele, Quotenberechnung und beste Wettanbieter.",
  openGraph: {
    title: "Kombiwetten WM 2026 — Der komplette Ratgeber",
    description: "Kombiwetten, System, Trixie: Steigern Sie Ihre WM-2026-Gewinne mit unseren Beispielen und Strategien.",
    url: "https://www.wm2026guide.de/sportwetten/kombiwetten",
  },
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/kombiwetten" },
};

const types = [
  {
    nom: "Klassische Kombiwette (Acca)",
    description: "Alle Auswahlen müssen gewinnen. Die Quoten werden miteinander multipliziert. Hohes Gewinnpotenzial, aber maximales Risiko.",
    exemple: "3 Spiele mit je 1,80 → Gesamtquote = 1,80 × 1,80 × 1,80 = 5,83",
  },
  {
    nom: "System (oder Multi-System)",
    description: "Kombination mehrerer Kombiwetten. Sie gewinnen auch, wenn eine oder mehrere Auswahlen verlieren, aber der Einsatz ist höher.",
    exemple: "System 2/3 auf 3 Auswahlen = 3 Zweier-Kombis. Wenn 2 von 3 richtig sind, gewinnen Sie mindestens eine Kombi.",
  },
  {
    nom: "Trixie",
    description: "4 Wetten auf 3 Auswahlen: 3 Zweier + 1 Dreier. Sie gewinnen, sobald 2 von 3 Auswahlen richtig sind.",
    exemple: "Auswahlen A (1,90), B (2,10), C (1,75) → 3 Zweier (AB, AC, BC) + 1 Dreier (ABC). Einsatz = 4 × Einzeleinsatz.",
  },
  {
    nom: "Yankee",
    description: "11 Wetten auf 4 Auswahlen: 6 Zweier + 4 Dreier + 1 Vierer. Profitabel ab 2 richtigen Auswahlen.",
    exemple: "4 Auswahlen → 11 Kombinationen. Gesamteinsatz = 11 × Einzeleinsatz. Sehr beliebt in UK.",
  },
  {
    nom: "Lucky 15 / Lucky 31",
    description: "Wie Yankee, aber mit Einzelwetten. Lucky 15 = 15 Wetten auf 4 Auswahlen (4 Einzel + 6 Zweier + 4 Dreier + 1 Vierer).",
    exemple: "Sie gewinnen sogar mit nur einer richtigen Auswahl (die Einzelwette). Maximale Sicherheit, hoher Einsatz.",
  },
];

const exemples = [
  {
    titre: "Kombi \"Favoriten Gruppenphase\"",
    selections: ["Frankreich gewinnt die Gruppe (1,45)", "Brasilien gewinnt die Gruppe (1,60)", "Deutschland gewinnt die Gruppe (1,55)"],
    cote: "1,45 × 1,60 × 1,55 = 3,60",
    mise: "10 €",
    gain: "36 €",
    analyse: "Niedrige Quoten, aber kombiniert = gute Rendite. Moderates Risiko: Alle drei sind Favoriten, aber ein Ausrutscher ist immer möglich.",
  },
  {
    titre: "Kombi \"BTTS (beide treffen)\"",
    selections: ["Frankreich-Argentinien BTTS Ja (1,70)", "Brasilien-Deutschland BTTS Ja (1,75)", "Spanien-England BTTS Ja (1,65)"],
    cote: "1,70 × 1,75 × 1,65 = 4,91",
    mise: "10 €",
    gain: "49,10 €",
    analyse: "Die großen WM-Duelle produzieren oft Tore auf beiden Seiten. Guter Wert bei Quote ~4,90.",
  },
  {
    titre: "Kombi \"Over 2.5 Tore Hitze\"",
    selections: ["Spiel Houston Over 2.5 (1,85)", "Spiel Dallas Over 2.5 (1,80)", "Spiel Miami Over 2.5 (1,90)"],
    cote: "1,85 × 1,80 × 1,90 = 6,33",
    mise: "5 €",
    gain: "31,65 €",
    analyse: "Die Hitze ermüdet die Abwehr in der 2. Halbzeit. Spiele in heißen Stadien = historisch mehr Tore.",
  },
  {
    titre: "System 2/3 \"Sieger 1. Spieltag\"",
    selections: ["Frankreich gewinnt ST1 (1,55)", "Spanien gewinnt ST1 (1,50)", "Argentinien gewinnt ST1 (1,60)"],
    cote: "3 Zweier: 2,33 + 2,48 + 2,40 = wenn 2 von 3 richtig",
    mise: "3 × 5 € = 15 €",
    gain: "~12-13 € (bei 2 richtigen) bis 36 € (bei 3 richtigen)",
    analyse: "Das System schützt gegen ein falsches Ergebnis. Weniger Gewinn, aber höhere Chance auf Return on Investment.",
  },
  {
    titre: "Kombi \"Torschütze + Ergebnis\"",
    selections: ["Mbappé trifft (1,90)", "Frankreich gewinnt (1,55)", "Over 1.5 Tore Frankreich (1,35)"],
    cote: "1,90 × 1,55 × 1,35 = 3,97",
    mise: "10 €",
    gain: "39,70 €",
    analyse: "Stimmige Kombiwette: Die drei Auswahlen verstärken sich logisch gegenseitig. Wenn Mbappé trifft und Frankreich gewinnt, gibt es sehr wahrscheinlich 2+ Tore.",
  },
];

const avantages = [
  "Potenziell sehr hohe Gewinne mit einem bescheidenen Einsatz",
  "Machen niedrige Quoten erst in Kombination interessant",
  "Mehr Spannung beim Verfolgen mehrerer Spiele",
  "Manche Wettanbieter bieten Kombi-Boni (+5 % bis +50 % auf den Gewinn)",
];

const risques = [
  "Ein einziger Fehler reicht, um alles zu verlieren (klassische Kombiwette)",
  "Die tatsächliche Gewinnwahrscheinlichkeit bei 5+ Auswahlen ist sehr gering (<5 %)",
  "Wettanbieter lieben Kombiwetten: Die kumulierte Marge ist zu ihren Gunsten",
  "Neigung, Auswahlen \"um die Kombi zu vervollständigen\" ohne Analyse hinzuzufügen",
];

const bookmakers = [
  { nom: "Betano", avantage: "Regelmäßige Kombi-Boosts, Teil-Cashout bei Kombiwetten, vertrauenswürdiger lizenzierter Wettanbieter", url: pmuTrackingUrl("paris-sportifs") },
];

const faqItems = [
  {
    question: "Wie viele Auswahlen maximal in einer Kombiwette?",
    answer:
      "Die meisten Wettanbieter erlauben bis zu 15-20 Auswahlen. Allerdings sinkt die Gewinnwahrscheinlichkeit ab 3-4 Auswahlen drastisch. Erfahrene Wetter empfehlen, 3-4 Auswahlen nicht zu überschreiten, um ein optimales Risiko-Gewinn-Verhältnis zu erzielen.",
  },
  {
    question: "Ist die Kombiwette langfristig profitabel?",
    answer:
      "Nein, Kombiwetten haben langfristig eine negative Gewinnerwartung, da sich die Margen der Wettanbieter kumulieren. Eine Kombiwette mit 5 Auswahlen hat eine kumulierte Marge von ~25-30 % zugunsten des Wettanbieters. Nutzen Sie sie mit Maß zum Vergnügen, nicht als Hauptstrategie.",
  },
  {
    question: "Was ist ein Kombi-Boost?",
    answer:
      "Ein Kombi-Boost ist eine Aktion, bei der der Wettanbieter Ihren Gewinn erhöht, wenn Ihre Kombiwette gewinnt (z. B.: +10 % bei 3 Auswahlen, +30 % bei 5+). Betano bietet regelmäßig solche Boosts bei großen Wettbewerben wie der WM 2026 an.",
  },
  {
    question: "Ist eine Kombiwette oder ein System besser?",
    answer:
      "Das System (Trixie, Yankee) ist weniger riskant, da Sie auch mit einer falschen Auswahl gewinnen können. Allerdings ist der Gesamteinsatz höher und der Maximalgewinn niedriger. Für Anfänger ist das System 2/3 ein guter Kompromiss.",
  },
];

export default function ParisCombinaPage() {
return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Sportwetten
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Kombiwetten-Ratgeber WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Kombi, System, Trixie, Yankee: Meistern Sie Kombiwetten mit unseren konkreten Beispielen
            und Strategien für die WM 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Types */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Layers className="h-7 w-7 text-accent" /> Types de paris combinés
          </h2>
          <div className="space-y-4">
            {types.map((t) => (
              <div key={t.nom} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900 text-lg">{t.nom}</h3>
                <p className="text-sm text-gray-700 mt-1">{t.description}</p>
                <p className="text-xs text-accent bg-accent/5 rounded-lg p-2 mt-2">
                  <Calculator className="inline h-3 w-3 mr-1" /> {t.exemple}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Exemples */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Calculator className="h-7 w-7 text-accent" /> 5 exemples de combinés CDM 2026
          </h2>
          <div className="space-y-4">
            {exemples.map((e) => (
              <div key={e.titre} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900">{e.titre}</h3>
                <ul className="mt-2 space-y-1">
                  {e.selections.map((s, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-accent">→</span> {s}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  <span className="text-accent font-semibold">Cote : {e.cote}</span>
                  <span>Mise : {e.mise}</span>
                  <span className="font-bold text-green-600">Gain : {e.gain}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">{e.analyse}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Avantages / Risques */}
        <div className="grid gap-6 sm:grid-cols-2">
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" /> Avantages
            </h2>
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <ul className="space-y-2">
                {avantages.map((a, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <XCircle className="h-6 w-6 text-red-500" /> Risques
            </h2>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <ul className="space-y-2">
                {risques.map((r, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Bookmakers */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <Layers className="h-7 w-7 text-accent" /> Meilleurs bookmakers pour les combinés
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {bookmakers.map((b) => (
              <a
                key={b.nom}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="rounded-xl border border-gray-200 bg-white p-5 hover:border-accent/50 hover:shadow-md transition-all block"
              >
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  {b.nom} <ExternalLink className="h-4 w-4 text-gray-400" />
                </h3>
                <p className="text-sm text-gray-600 mt-1">{b.avantage}</p>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/comparateur-cotes"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Comparateur de cotes <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/sportwetten/wetter"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Impact météo sur les paris
          </Link>
        </div>

        {/* ANJ */}
        <p className="text-xs text-gray-400 text-center">
          <AlertTriangle className="inline h-3 w-3 mr-1" />
          Les paris sportifs comportent des risques. Jouez responsablement. 18+ | Informations et aide sur{" "}
          <a href="https://www.bzga.de" target="_blank" rel="noopener noreferrer" className="underline">
            bzga.de
          </a>{" "}
          (ANJ).
        </p>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
