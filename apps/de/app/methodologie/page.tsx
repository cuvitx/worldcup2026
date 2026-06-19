import type { Metadata } from "next";
import Link from "next/link";
import { domains } from "@repo/data/route-mapping";
import { Bot } from "lucide-react"
export const metadata: Metadata = {
  title: "Unsere Methodik | So berechnen wir unsere Prognosen WM 2026",
  description:
    "Entdecken Sie unsere Prognosemethodik für die WM 2026: ELO-Modell, dreistufige KI-Pipeline, Analysefaktoren und Transparenz bei unseren Vorhersagen.",
  alternates: {
    canonical: "https://www.wm2026guide.de/methodologie",
  },
  openGraph: {
    title: "Unsere Methodik | Prognosen WM 2026",
    description:
      "ELO-Modell, Künstliche Intelligenz und statistische Analyse: So berechnen wir unsere Prognosen für die WM 2026.",
  },
};

export default function MethodologiePage() {
  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Transparenz</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Unsere Methodik</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            So berechnen wir unsere Prognosen für die WM 2026:
            ELO-Modell, Künstliche Intelligenz und Multi-Faktor-Analyse.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-12 space-y-8">
        {/* ELO Rating System */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Das ELO-Modell
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Das ELO-Ranking-System, ursprünglich von Arpad Elo für Schach entwickelt,
            wird für den internationalen Fußball angepasst, um die relative Stärke
            jeder Mannschaft zu bewerten. Jede Nation besitzt ein{" "}
            <strong>ELO-Rating</strong>, das sich nach jedem Spiel basierend auf
            dem Ergebnis und der Stärke des Gegners verändert.
          </p>

          <div className="rounded-lg bg-gray-50 p-5 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vereinfachte Formel</h3>
            <div className="font-mono text-sm bg-white rounded p-3 border border-gray-200">
              <p>
                R<sub>new</sub> = R<sub>old</sub> + K × (S - E)
              </p>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-gray-600">
              <li>
                <strong>R</strong> = ELO-Rating der Mannschaft
              </li>
              <li>
                <strong>K</strong> = K-Faktor (Spielgewichtung: 60 für die WM,
                50 für Qualifikationsspiele, 30 für Freundschaftsspiele)
              </li>
              <li>
                <strong>S</strong> = Tatsächliches Ergebnis (1 = Sieg, 0.5 = Unentschieden, 0 =
                Niederlage)
              </li>
              <li>
                <strong>E</strong> = Erwartetes Ergebnis (Expected Score)
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-gray-50 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Erwartetes Ergebnis (Expected Score)</h3>
            <div className="font-mono text-sm bg-white rounded p-3 border border-gray-200">
              <p>
                E = 1 / (1 + 10<sup>(R<sub>Gegner</sub> - R<sub>Mannschaft</sub>) / 400</sup>)
              </p>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Diese Formel berechnet die Siegwahrscheinlichkeit basierend auf der
              Rating-Differenz zwischen beiden Mannschaften. Je größer der Abstand,
              desto höher die Gewinnchancen des Favoriten.
            </p>
          </div>
        </section>

        {/* AI Pipeline */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <Bot className="h-5 w-5 inline-block" /> Dreistufige KI-Pipeline
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Unsere Prognosen werden durch eine dreistufige Pipeline mit Künstlicher
            Intelligenz angereichert, wobei jede Stufe auf eine bestimmte Rolle spezialisiert ist.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Expert */}
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-white font-bold">
                  1
                </span>
                <div>
                  <p className="font-bold text-primary">Experte</p>
                  <p className="text-xs text-primary/70">Claude (Anthropic)</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Tiefgehende taktische Analyse, Bewertung von Stärken und
                Schwächen, Ergebnisprognosen, Identifikation von Value Bets
                und strategische Einblicke.
              </p>
            </div>

            {/* Factuel */}
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-white font-bold">
                  2
                </span>
                <div>
                  <p className="font-bold text-primary">Faktencheck</p>
                  <p className="text-xs text-primary/70">Gemini (Google)</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Echtzeit-Faktenprüfung, Datenverifizierung, Erfassung
                aktueller Nachrichten (Verletzungen, Sperren, aktuelle Form,
                Wetter).
              </p>
            </div>

            {/* Infra */}
            <div className="rounded-lg border-2 border-field/20 bg-field/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-field text-lg text-white font-bold">
                  3
                </span>
                <div>
                  <p className="font-bold text-field">Infra</p>
                  <p className="text-xs text-field/70">GPT (OpenAI)</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Orchestrierung der Metadaten, Strukturierung der Inhalte,
                SEO-Generierung und Zusammenfassung der Ergebnisse der beiden anderen Stufen.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600 text-center">
              <strong>Ablauf:</strong> Rohdaten → Gemini (Faktencheck) →
              Claude (Expertenanalyse) → GPT (Strukturierung) → Endgültige Prognose
            </p>
          </div>
        </section>

        {/* Factors */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
             Analysefaktoren
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unsere Prognosen berücksichtigen zahlreiche Faktoren, um die
            Genauigkeit der Vorhersagen zu maximieren:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: "",
                title: "ELO-Rating",
                desc: "Relative Stärke jeder Mannschaft basierend auf der Ergebnishistorie",
              },
              {
                icon: "",
                title: "Direktvergleich (H2H)",
                desc: "Ergebnishistorie zwischen beiden Mannschaften",
              },
              {
                icon: "",
                title: "Höhenlage",
                desc: "Einfluss der Stadionhöhe auf die Leistung (z.B. Mexiko-Stadt auf 2.240m)",
              },
              {
                icon: "",
                title: "Wetter",
                desc: "Temperatur, Luftfeuchtigkeit und Wetterbedingungen am Spieltag",
              },
              {
                icon: "",
                title: "Reisemüdigkeit",
                desc: "Zurückgelegte Entfernung, Zeitverschiebung und Erholungszeit",
              },
              {
                icon: "",
                title: "Verletzungen & Sperren",
                desc: "Fehlende Schlüsselspieler und Auswirkungen auf die Aufstellung",
              },
              {
                icon: "",
                title: "Aktuelle Form",
                desc: "Ergebnisse der letzten 5 Spiele und Dynamik der Mannschaft",
              },
              {
                icon: "",
                title: "Heimvorteil",
                desc: "Bonus für die Gastgeberländer (USA, Kanada, Mexiko)",
              },
            ].map((factor) => (
              <div
                key={factor.title}
                className="flex gap-3 rounded-lg border border-gray-200 p-4"
              >
                <span className="text-2xl shrink-0">{factor.icon}</span>
                <div>
                  <p className="font-semibold">{factor.title}</p>
                  <p className="text-sm text-gray-500">{factor.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How predictions work */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            So werden die Wahrscheinlichkeiten berechnet
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Für jedes Spiel kombinieren wir das ELO-Modell mit den kontextuellen
              Faktoren, um ein angepasstes Rating zu erhalten. Die Wahrscheinlichkeiten für
              Sieg, Unentschieden und Niederlage werden dann über die Expected-Score-Formel
              berechnet.
            </p>
            <p>
              Für Turnierprognosen (Chancen auf das Weiterkommen in der Gruppenphase,
              WM-Titelgewinn) führen wir eine{" "}
              <strong>Monte-Carlo-Simulation</strong> mit 100.000 vollständigen
              Turnieren durch. Jedes Spiel wird anhand der angepassten Wahrscheinlichkeiten
              simuliert, was uns robuste Schätzungen für jede Phase liefert.
            </p>
            <p>
              Die geschätzten Quoten werden aus den Wahrscheinlichkeiten nach folgender Formel abgeleitet:
            </p>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="font-mono text-sm bg-white rounded p-3 border border-gray-200 text-center">
                Quote = 1 / Wahrscheinlichkeit
              </div>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Beispiel: 40% Chance → Quote von 2,50
              </p>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Transparenz & Grenzen
          </h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              <strong>
                Unsere Prognosen sind Schätzungen, die auf statistischen Modellen
                basieren. Sie garantieren keine Ergebnisse.
              </strong>
            </p>
            <p>
              Fußball ist ein unberechenbarer Sport. Kein Modell kann den
              Ausgang eines Spiels mit Sicherheit vorhersagen. Unsere Analysen
              sollen statistische Einblicke zum besseren Verständnis liefern,
              nicht zum Wetten ermutigen.
            </p>
            <p>
              Wenn Sie sich zum Wetten entschließen, tun Sie dies verantwortungsvoll.
              Besuchen Sie unsere Seite{" "}
              <Link
                href="/verantwortungsvolles-spielen"
                className="text-primary hover:underline font-medium"
              >
                Verantwortungsvolles Spielen
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg bg-primary text-white p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Entdecken Sie unsere Prognosen in Aktion
          </h2>
          <p className="text-gray-300 mb-4">
            Sehen Sie sich die detaillierten Prognosen für jedes Spiel der
            Weltmeisterschaft 2026 an.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/spiel/spielplan"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Spielplan
            </Link>
            <Link
              href="/mannschaft"
              className="rounded-lg bg-white/10 px-5 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Die 48 Mannschaften
            </Link>
            <Link
              href="/guides"
              className="rounded-lg bg-white/10 px-5 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Unsere Guides
            </Link>
          </div>
        </section>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Unsere Methodik | So berechnen wir unsere Prognosen WM 2026",
            description:
              "Entdecken Sie unsere Prognosemethodik für die WM 2026: ELO-Modell, dreistufige KI-Pipeline und Multi-Faktor-Analyse.",
            author: {
              "@type": "Organization",
              name: "Team WM 2026",
            },
            publisher: {
              "@type": "Organization",
              name: "WM 2026",
            },
            url: `${domains.de}/methodologie`,
          }),
        }}
      />
    </>
  );
}
