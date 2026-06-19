import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { RelatedLinks } from "../components/RelatedLinks";
import { TableOfContents } from "@repo/ui";
import { AlertTriangle, ArrowRight, Check, Target, Trophy, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Format WM 2026 - 48 Mannschaften, 12 Gruppen, Turnierbaum | WM 2026",
  description:
    "Revolutionäres Format der WM 2026: 48 Mannschaften, 12 Gruppen zu je 4, K.-o.-Runden, beste Gruppendritte qualifiziert. Vergleich mit dem alten Format mit 32 Mannschaften.",
  openGraph: {
    title: "Format WM 2026 - Neues System mit 48 Mannschaften",
    description:
      "Entdecken Sie das neue Format der WM 2026: 48 Mannschaften, 12 Gruppen, 104 Spiele. Phasen, Qualifikationen und Turnierbaum.",
    url: "https://www.wm2026guide.de/format",
  },
  alternates: {
    canonical: "https://www.wm2026guide.de/format",
  },
};

const faqItems = [
  {
    question: "Warum ist die FIFA von 32 auf 48 Mannschaften umgestiegen?",
    answer: "Die FIFA hat beschlossen, die WM auf 48 Mannschaften zu erweitern, und zwar aus mehreren Gründen: die weltweite Repräsentativität des Fussballs zu erhöhen (mehr Plätze für Afrika, Asien und Nordamerika), zusätzliche Einnahmen durch mehr Spiele zu generieren (104 statt 64) und mehr Nationen die Möglichkeit zu geben, am grössten Sportereignis der Welt teilzunehmen."
  },
  {
    question: "Wie werden die 48 Plätze auf die Konföderationen verteilt?",
    answer: "Die 48 Plätze verteilen sich wie folgt: UEFA (Europa) 16 Plätze, CAF (Afrika) 9 Plätze, AFC (Asien) 8 Plätze, CONMEBOL (Südamerika) 6 Plätze, CONCACAF (Nord-/Mittelamerika/Karibik) 6 Plätze, davon 3 für die Gastgeberländer (USA, Kanada, Mexiko), OFC (Ozeanien) 1 Platz und 2 Plätze über interkontinentale Playoffs."
  },
  {
    question: "Wie viele Spiele muss der Weltmeister 2026 bestreiten?",
    answer: "Der Weltmeister 2026 muss insgesamt 7 Spiele bestreiten: 3 Gruppenspiele, dann 4 K.-o.-Spiele (Achtelfinale, Viertelfinale, Halbfinale und Finale). Das ist die gleiche Anzahl an Spielen wie beim alten Format mit 32 Mannschaften, aber der Weg ist anders, da es 12 Gruppen statt 8 gibt."
  },
  {
    question: "Was ändert sich für die Gruppendritten?",
    answer: "Im Format mit 48 Mannschaften qualifizieren sich nur die 8 besten Gruppendritten (von 12) für das Achtelfinale, zusätzlich zu den 24 Erst- und Zweitplatzierten. Eine Rangliste der 12 Dritten wird nach folgenden Kriterien erstellt: Punkte, Tordifferenz, geschossene Tore und Fairplay. Diese Regel sorgt bis zum letzten Spiel jeder Gruppe für Spannung."
  },
  {
    question: "Wird es mit 12 Gruppen mehr Unentschieden geben?",
    answer: "Möglicherweise ja. Mit 12 Gruppen zu je 4 Mannschaften statt 8 könnten einige Mannschaften vorsichtiger spielen, um sich einen qualifizierten dritten Platz zu sichern. Allerdings spornt die Regel der besten Dritten (nur 8 von 12 qualifizieren sich) dazu an, Tore zu schiessen, um die Tordifferenz zu verbessern, was zu defensive Spiele begrenzen sollte."
  },
  {
    question: "Ist das Format mit 48 Mannschaften für künftige Ausgaben endgültig?",
    answer: "Ja, die FIFA hat bestätigt, dass das Format mit 48 Mannschaften für künftige Ausgaben beibehalten wird, insbesondere für die WM 2030 (gemeinsam organisiert von Marokko, Spanien, Portugal, Uruguay, Argentinien und Paraguay). Dieses Format wird von der FIFA als kommerzieller und sportlicher Erfolg angesehen."
  }
];

export default function FormatPage() {
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Neues FIFA-Format
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Format WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            48 Mannschaften, 12 Gruppen, 104 Spiele: Entdecken Sie das revolutionäre neue Format
            der ersten erweiterten WM der Geschichte.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "48", label: "Mannschaften" },
              { val: "12", label: "Gruppen" },
              { val: "104", label: "Spiele" },
              { val: "32", label: "Qualifiziert fürs Achtelfinale" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3 min-w-[110px]">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div>
          {/* Einführung */}
          <div className="mb-12">
            <h2 id="introduction" className="text-2xl font-bold text-gray-900 mb-4">
              Eine Revolution in der Geschichte der WM
            </h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              Die WM 2026 markiert einen historischen Wendepunkt mit der Einführung eines neuen Formats mit <strong>48 Mannschaften</strong>,
              gegenüber 32 bei den vorherigen Ausgaben (1998-2022). Diese radikale Änderung, die vom FIFA-Rat im Januar 2017 beschlossen wurde,
              zielt darauf ab, das Turnier inklusiver zu gestalten, indem mehr Nationen am grössten Sportereignis der Welt teilnehmen können.
            </p>
            <p className="text-gray-700 mb-3 leading-relaxed">
              Das Format teilt die 48 Mannschaften in <strong>12 Gruppen zu je 4 Mannschaften</strong>. Die beiden Erstplatzierten jeder Gruppe
              qualifizieren sich automatisch für das Achtelfinale, zusammen mit den <strong>8 besten Gruppendritten</strong>.
              Insgesamt erreichen 32 Mannschaften die K.-o.-Runde, gegenüber 16 im alten Format.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Diese neue Konfiguration erhöht die Gesamtzahl der Spiele auf <strong>104</strong> (gegenüber 64 zuvor)
              und verlängert die Turnierdauer auf 39 Tage (11. Juni - 19. Juli 2026). Der Weltmeister muss weiterhin 7 Spiele bestreiten,
              um die Trophäe zu gewinnen, aber der Weg dorthin ist mit einer erweiterten Vorrunde anders.
            </p>
          </div>

          {/* Schema des Formats */}
          <div className="mb-12">
            <h2 id="schema-format" className="text-2xl font-bold text-gray-900 mb-6">
              Schema des Formats 2026
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-gray-200 p-8 shadow-sm">
              <div className="flex flex-col items-center gap-6">
                {/* Schritt 1: Gruppenphase */}
                <div className="w-full">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-bold text-gray-900">
                      1. Gruppenphase
                    </h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="text-center mb-3">
                      <p className="text-3xl font-extrabold text-accent">48 Mannschaften</p>
                      <p className="text-sm text-gray-600 mt-1">
                        12 Gruppen zu je 4 Mannschaften
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].map((g) => (
                        <div key={g} className="bg-gray-50 rounded px-2 py-1.5 text-center font-semibold text-gray-900">
                          Gruppe {g}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mt-4 text-center">
                      Jede Mannschaft spielt <strong>3 Spiele</strong> (gegen die 3 anderen ihrer Gruppe)
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-8 h-8 text-accent rotate-90 sm:rotate-0" />

                {/* Schritt 2: Qualifikation */}
                <div className="w-full">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-bold text-gray-900">
                      2. Qualifikation fürs Achtelfinale
                    </h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="grid sm:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-extrabold text-accent">12</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Gruppensieger (1.)
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-accent">12</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Gruppenzweite
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-accent">8</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Beste Dritte (von 12)
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                      <p className="text-3xl font-extrabold text-accent">32 qualifizierte Mannschaften</p>
                      <p className="text-sm text-gray-600 mt-1">
                        fürs Achtelfinale
                      </p>
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-8 h-8 text-accent rotate-90 sm:rotate-0" />

                {/* Schritt 3: K.-o.-Runde */}
                <div className="w-full">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Trophy className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-bold text-gray-900">
                      3. K.-o.-Runde
                    </h3>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center justify-between text-center gap-2">
                      <div className="flex-1">
                        <p className="text-xl font-bold text-gray-900">32</p>
                        <p className="text-xs text-gray-600 mt-1">Achtelfinale</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xl font-bold text-gray-900">16</p>
                        <p className="text-xs text-gray-600 mt-1">Viertelfinale</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xl font-bold text-gray-900">8</p>
                        <p className="text-xs text-gray-600 mt-1">Halbfinale</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xl font-bold text-gray-900">4</p>
                        <p className="text-xs text-gray-600 mt-1">Finale</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xl font-bold text-accent">1</p>
                        <p className="text-xs text-gray-600 mt-1">Weltmeister</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-4 text-center">
                      K.-o.-Spiele (Verlängerung + Elfmeterschiessen bei Bedarf)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vergleich altes vs. neues Format */}
          <div className="mb-12">
            <h2 id="comparaison" className="text-2xl font-bold text-gray-900 mb-6">
              Altes Format (32 Mannschaften) vs. Neues Format (48 Mannschaften)
            </h2>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Kriterium
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Format 32 (1998-2022)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Format 48 (2026+)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { critere: "Anzahl Mannschaften", ancien: "32", nouveau: "48" },
                      { critere: "Anzahl Gruppen", ancien: "8 Gruppen zu je 4", nouveau: "12 Gruppen zu je 4" },
                      { critere: "Qualifizierte fürs Achtelfinale", ancien: "16 Mannschaften (1. + 2.)", nouveau: "32 Mannschaften (1. + 2. + 8 beste Dritte)" },
                      { critere: "Gesamtzahl Spiele", ancien: "64 Spiele", nouveau: "104 Spiele" },
                      { critere: "Spiele pro Mannschaft (min.)", ancien: "3 Spiele", nouveau: "3 Spiele" },
                      { critere: "Spiele pro Mannschaft (max.)", ancien: "7 Spiele (Weltmeister)", nouveau: "7 Spiele (Weltmeister)" },
                      { critere: "Turnierdauer", ancien: "~32 Tage", nouveau: "~39 Tage" },
                      { critere: "Plätze UEFA (Europa)", ancien: "13", nouveau: "16" },
                      { critere: "Plätze CAF (Afrika)", ancien: "5", nouveau: "9" },
                      { critere: "Plätze AFC (Asien)", ancien: "4,5", nouveau: "8" },
                      { critere: "Plätze CONMEBOL (Südamerika)", ancien: "4,5", nouveau: "6" },
                      { critere: "Plätze CONCACAF (Nordamerika)", ancien: "3,5", nouveau: "6 (davon 3 Gastgeber)" },
                      { critere: "Plätze OFC (Ozeanien)", ancien: "0,5", nouveau: "1" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {row.critere}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {row.ancien}
                        </td>
                        <td className="px-4 py-3 text-sm text-accent font-semibold">
                          {row.nouveau}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Regel der besten Gruppendritten */}
          <div className="mb-12">
            <h2 id="meilleurs-3e" className="text-2xl font-bold text-gray-900 mb-6">
              Wie werden die besten Gruppendritten eingestuft?
            </h2>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-gray-700 mb-4">
                Die 12 Gruppendritten werden untereinander nach folgenden Kriterien eingestuft (in dieser Reihenfolge):
              </p>
              <ol className="space-y-3">
                {[
                  "Punkte in der Gruppe",
                  "Tordifferenz in der Gruppe",
                  "Geschossene Tore in der Gruppe",
                  "Fairplay-Punkte (Gelbe Karte = -1, indirekte Rote = -3, direkte Rote = -4)",
                  "FIFA-Losentscheid (als letztes Mittel)"
                ].map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700">
                  <strong className="text-accent">Wichtig:</strong> Nur die 8 besten Gruppendritten von 12 qualifizieren sich.
                  Ein dritter Platz in der Gruppe garantiert also NICHT automatisch die Qualifikation, im Gegensatz zum EM-Format
                  (wo sich 4 der besten 6 Dritten qualifizieren).
                </p>
              </div>
            </div>
          </div>

          {/* Vor- und Nachteile */}
          <div className="mb-12">
            <h2 id="avantages-inconvenients" className="text-2xl font-bold text-gray-900 mb-6">
              Vor- und Nachteile des neuen Formats
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-accent mb-3 flex items-center gap-2">
                  <span className="text-xl"><Check className="h-5 w-5 inline-block" /></span>
                  Vorteile
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Mehr vertretene Nationen (+50% Mannschaften)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Mehr Spiele für die Fans (104 statt 64)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Mehr Plätze für Afrika und Asien</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Höhere Einnahmen für die FIFA und die Verbände</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Einzigartiges Erlebnis für mehr Spieler</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Mehr Ungewissheit und Spannung in der Gruppenphase</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                  <span className="text-xl"><AlertTriangle className="h-5 w-5 inline-block" /></span>
                  Nachteile
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Verwässerung des sportlichen Niveaus (schwächere Mannschaften)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Längeres Turnier (Ermüdung der Spieler)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Risiko taktischer Unentschieden, um den 3. Platz anzupeilen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Komplexität der Rangliste der besten Dritten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Höhere Organisationskosten (Infrastruktur)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Grössere Umweltbelastung (Reisen, Emissionen)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { href: "/reglement", label: "Vollständiges Reglement", desc: "Alle FIFA-Regeln" },
              { href: "/gruppen", label: "Gruppenphase", desc: "12 Gruppen zu je 4 Mannschaften" },
              { href: "/turnierbaum", label: "Turnierbaum", desc: "Interaktiver Bracket mit 32 Mannschaften" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col gap-2 bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group text-center"
              >
                <div className="font-bold text-gray-900 group-hover:text-accent transition-colors">
                  {label}
                </div>
                <div className="text-xs text-gray-600">{desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <TableOfContents items={[
          { id: "introduction", label: "Einführung", level: 2 },
          { id: "schema-format", label: "Schema des Formats", level: 2 },
          { id: "comparaison", label: "Vergleich 32 vs. 48", level: 2 },
          { id: "meilleurs-3e", label: "Beste Gruppendritte", level: 2 },
          { id: "avantages-inconvenients", label: "Vor- & Nachteile", level: 2 },
        ]} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><RelatedLinks variant="compact" title="Verwandte Seiten" links={[
          { href: "/gruppen", title: "Die 12 Gruppen", description: "Zusammensetzung jeder Gruppe", icon: "" },
          { href: "/spiel/spielplan", title: "Spielplan", description: "Die 104 Spiele der WM 2026", icon: "" },
          { href: "/simulateur", title: "Simulator", description: "Simulieren Sie den Turnierbaum", icon: "" },
          { href: "/turnierbaum", title: "Turnierbaum", description: "Bracket der K.-o.-Runden", icon: "" },
          { href: "/reglement", title: "Reglement", description: "Offizielle Regeln der WM 2026", icon: "" },
        ]} /></div>
      <FAQSection title="Fragen zum Format" items={faqItems} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Format WM 2026 - 48 Mannschaften, 12 Gruppen",
            description: "Revolutionäres Format der WM 2026: 48 Mannschaften, 12 Gruppen zu je 4, K.-o.-Runden und vollständiger Turnierbaum.",
            url: "https://www.wm2026guide.de/format",
          }),
        }}
      />
    </>
  );
}
