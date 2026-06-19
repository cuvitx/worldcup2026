import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Ueber uns -- WM 2026",
  description:
    "Erfahren Sie mehr ueber wm2026guide.de, das deutschsprachige Informationsportal zur Fussball-WM 2026 in den USA, Kanada und Mexiko.",
  alternates: getStaticAlternates("about", "de"),
};

export default function UeberUnsPage() {
  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Ueber uns</h1>
          <p className="mt-2 text-gray-300">
            Das Team hinter wm2026guide.de
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Unsere Mission
            </h2>
            <p>
              wm2026guide.de ist das deutschsprachige Informationsportal fuer die
              FIFA Fussball-Weltmeisterschaft 2026. Unser Ziel ist es,
              deutschsprachigen Fussballfans alle wichtigen Informationen
              rund um das groesste Sportereignis der Welt zu liefern.
            </p>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Was wir bieten
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Spielplan & Ergebnisse:</strong> Alle 104 Spiele mit
                Datum, Uhrzeit, Stadion und Live-Ergebnissen.
              </li>
              <li>
                <strong>Mannschaften & Kader:</strong> Profile aller 48
                Mannschaften mit vollstaendigem Kader und Statistiken.
              </li>
              <li>
                <strong>Gruppen & Tabellen:</strong> Alle 12 Gruppen mit
                Tabellen, Spielplaenen und Analysen.
              </li>
              <li>
                <strong>Stadien & Staedte:</strong> Informationen zu allen 16
                Austragungsorten mit praktischen Tipps.
              </li>
              <li>
                <strong>Prognosen:</strong> Datenbasierte Vorhersagen und
                Analysen zu jedem Spiel und jeder Gruppe.
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Redaktion
            </h2>
            <p>
              Unsere Redaktion besteht aus Fussballbegeisterten und
              Datenanalysten, die es sich zur Aufgabe gemacht haben, die
              umfassendste und aktuellste WM-2026-Berichterstattung auf
              Deutsch zu liefern.
            </p>
          </section>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/kontakt"
            className="rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Kontakt aufnehmen
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </>
  );
}
