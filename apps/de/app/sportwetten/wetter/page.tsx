import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { CloudRain, Thermometer, Mountain, ArrowRight, BarChart3, Target, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Einfluss des Wetters auf Wetten WM 2026 — Hitze, Höhenlage, Regen",
  description:
    "Analysieren Sie den Einfluss des Wetters auf die Spiele und Wetten der WM 2026: Hitze in Houston/Dallas, Höhenlage in Mexiko-Stadt (2240 m), Regen, historische Statistiken und Over/Under-Empfehlungen.",
  openGraph: {
    title: "Wetter & Wetten WM 2026 — Analyse der Bedingungen",
    description: "Hitze, Höhenlage, Regen: Wie das Wetter die Spiele und Sportwetten beeinflusst.",
    url: "https://www.wm2026guide.de/sportwetten/wetter",
  },
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/wetter" },
};

const facteurs = [
  {
    icon: Thermometer,
    titre: "Extreme Hitze (Houston, Dallas, Miami)",
    description:
      "Im Juni und Juli erreichen Houston und Dallas regelmäßig 35-40 °C bei hoher Luftfeuchtigkeit (70-90 % in Houston). Diese Bedingungen führen zu beschleunigter Muskelermüdung, besonders in der 2. Halbzeit.",
    stats: [
      "WM 1994 (USA): +23 % mehr Tore in der 2. Halbzeit im Vergleich zum Weltdurchschnitt",
      "WM 2014 (Brasilien, tropische Hitze): 56 % der Tore in der 2. Halbzeit",
      "WM 2022 (Katar, klimatisierte Stadien): Rückkehr auf 52 % in der 2. HZ → Klimaanlagen normalisierten das",
      "Europäische Mannschaften leiden stärker: -12 % Laufdistanz über 32 °C",
    ],
    recommandation: "Bevorzugen Sie Over 2.5 Tore und Tore in der 2. Halbzeit bei Spielen in Houston, Dallas und Miami, besonders wenn eine nordische Mannschaft (Dänemark, Schweden, Schottland) auf eine hitzegewohnte Mannschaft trifft.",
  },
  {
    icon: Mountain,
    titre: "Höhenlage in Mexiko-Stadt (2.240 m)",
    description:
      "Das Estadio Azteca liegt auf 2.240 Metern Höhe. Die dünne Luft verursacht schnellere Ermüdung (ca. 20 % weniger Sauerstoff), Bälle fliegen schneller und weiter, und Schüsse werden unberechenbarer.",
    stats: [
      "Nicht akklimatisierte Mannschaften verlieren 8-15 % ihrer aeroben Kapazität in der Höhe",
      "WM 1970 (Mexiko): Durchschnitt von 2.97 Toren/Spiel (der höchste seit 1966)",
      "WM 1986 (Mexiko): 2.54 Tore/Spiel mit offenen Spielen gegen Ende",
      "Torhüter sind anfälliger: schnellere Bälle, unvorhersehbare Flugbahnen",
    ],
    recommandation: "Für Spiele in Mexiko-Stadt: Over Ecken, Over Tore in der 2. Halbzeit und BTTS (beide Mannschaften treffen). Fernschüsse sind gefährlicher. Achten Sie auf südamerikanische Mannschaften, die an die Höhe gewöhnt sind (Kolumbien, Ecuador, Bolivien).",
  },
  {
    icon: CloudRain,
    titre: "Regen und nasser Rasen",
    description:
      "Houston und Miami befinden sich im Juni und Juli in der Regenzeit (kurze, aber heftige tropische Schauer). Auch Mexiko-Stadt erlebt Regen am späten Nachmittag. Ein nasser Rasen verlangsamt das Spiel, begünstigt Ausrutscher und macht lange Pässe unberechenbar.",
    stats: [
      "Spiele bei Regen weisen durchschnittlich 15 % mehr Fouls auf",
      "Tore nach Standardsituationen steigen bei nassem Rasen um ca. 20 %",
      "Der Tordurchschnitt sinkt bei starkem Regen leicht (-0.2 Tore/Spiel)",
      "Ecken sind häufiger erfolgreich: Torhüter sind bei Flanken unsicherer",
    ],
    recommandation: "Bei angekündigtem Regen: Under 2.5 Tore, Over Fouls, Over Ecken. Wetten auf Kopfballtore/Standardsituationen gewinnen an Wert. Prüfen Sie das Wetter 24 Stunden vor dem Spiel.",
  },
];

const statsHistoriques = [
  { edition: "USA 1994", temp: "28-35 °C", buts: "2.71/Spiel", particularite: "Hitze + große Stadien = entscheidende 2. HZ" },
  { edition: "Brasilien 2014", temp: "22-35 °C", buts: "2.67/Spiel", particularite: "7:1, offene Spiele bei Hitze" },
  { edition: "Russland 2018", temp: "18-28 °C", buts: "2.64/Spiel", particularite: "Gemäßigtes Klima = ausgeglichene Spiele" },
  { edition: "Katar 2022", temp: "24-32 °C (Klima)", buts: "2.56/Spiel", particularite: "Klimatisierte Stadien = weniger Einfluss" },
  { edition: "Mexiko 1970", temp: "20-28 °C + Höhe", buts: "2.97/Spiel", particularite: "Torrekord, Höhenlage als Schlüsselfaktor" },
  { edition: "Mexiko 1986", temp: "18-26 °C + Höhe", buts: "2.54/Spiel", particularite: "Offene Spiele gegen Spielende" },
];

const faqItems = [
  {
    question: "Begünstigt die Hitze eher Over oder Under?",
    answer:
      "Statistisch gesehen begünstigt extreme Hitze Over Tore in der 2. Halbzeit. Die Spieler ermüden, die Abwehrreihen werden nachlässiger und die Räume öffnen sich. Über das gesamte Spiel betrachtet ist der Einfluss weniger eindeutig, da die 1. Halbzeit defensiv geprägt sein kann (Kräftesparen).",
  },
  {
    question: "Beeinflusst die Höhenlage von Mexiko-Stadt wirklich die Spiele?",
    answer:
      "Ja, erheblich. Auf 2.240 m sinkt der verfügbare Sauerstoff um ca. 20 %. Nicht akklimatisierte Mannschaften leiden ab der 60. Minute. Bälle fliegen schneller und Fernschüsse sind gefährlicher. Die WM-Ausgaben 1970 und 1986 in Mexiko produzierten die höchsten Tordurchschnitte.",
  },
  {
    question: "Wo findet man zuverlässige Wettervorhersagen für die Spiele?",
    answer:
      "Weather.com, AccuWeather und Windy.com bieten Vorhersagen für 10-14 Tage. Für Abendspiele prüfen Sie die stündlichen Vorhersagen. Tropische Gewitter in Houston/Miami treten oft zwischen 15 und 18 Uhr Ortszeit auf.",
  },
  {
    question: "Sind die amerikanischen Stadien überdacht?",
    answer:
      "Einige ja: NRG Stadium (Houston) und AT&T Stadium (Dallas) haben ein Schiebedach/sind überdacht, was den Regeneffekt aufhebt, aber nicht die Hitze (die Klimaanlage mildert, beseitigt sie aber nicht). SoFi Stadium (LA) ist halboffen. Die anderen Stadien sind unter freiem Himmel.",
  },
];

export default function ImpactMeteoParisPage() {
return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Sportwetten
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Einfluss des Wetters auf Wetten WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Hitze, Höhenlage, Regen: Analysieren Sie, wie die klimatischen Bedingungen
            die Spiele beeinflussen, und verfeinern Sie Ihre Prognosen.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Faktoren */}
        {facteurs.map((f) => (
          <section key={f.titre}>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <f.icon className="h-7 w-7 text-accent" /> {f.titre}
            </h2>
            <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">{f.description}</p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" /> Historische Statistiken
                </h3>
                <ul className="space-y-1">
                  {f.stats.map((s, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-accent">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <h3 className="font-semibold text-accent mb-1 flex items-center gap-2">
                  <Target className="h-5 w-5" /> Wettempfehlung
                </h3>
                <p className="text-sm text-gray-700">{f.recommandation}</p>
              </div>
            </div>
          </section>
        ))}

        {/* Historische Tabelle */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-accent" /> Historische Statistiken nach Ausgabe
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-900">Ausgabe</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Temperatur</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Tore/Spiel</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Besonderheit</th>
                </tr>
              </thead>
              <tbody>
                {statsHistoriques.map((s) => (
                  <tr key={s.edition} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{s.edition}</td>
                    <td className="py-3 px-4 text-gray-700">{s.temp}</td>
                    <td className="py-3 px-4 text-accent font-semibold">{s.buts}</td>
                    <td className="py-3 px-4 text-gray-500">{s.particularite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/comparateur-cotes"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Quotenvergleich <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/sportwetten/kombiwetten"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Ratgeber Kombiwetten
          </Link>
        </div>

        {/* BZgA */}
        <p className="text-xs text-gray-400 text-center">
          <AlertTriangle className="inline h-3 w-3 mr-1" />
          Sportwetten sind mit Risiken verbunden. Spielen Sie verantwortungsvoll. 18+ | Informationen und Hilfe auf{" "}
          <a href="https://www.bzga.de" target="_blank" rel="noopener noreferrer" className="underline">
            bzga.de
          </a>{" "}
          (BZgA).
        </p>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
