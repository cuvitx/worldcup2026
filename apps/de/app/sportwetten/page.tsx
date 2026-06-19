import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sportwetten zur WM 2026 | Wettanbieter & Tipps",
  description:
    "Sportwetten zur Fussball-WM 2026: Wettanbieter, Quoten und Tipps. Verantwortungsvolles Spielen ab 18 Jahren.",
  alternates: getStaticAlternates("betting", "de"),
  openGraph: {
    title: "Sportwetten -- WM 2026",
    description:
      "Wettanbieter, Quoten und Tipps fuer die WM 2026. 18+ | Gluecksspiel kann suechtig machen.",
  },
};

export default function SportwettenPage() {
  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Sportwetten zur WM 2026
          </h1>
          <p className="mt-2 text-gray-300">
            Wettanbieter, Quoten und Tipps fuer die Fussball-WM
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-12 space-y-8">
        {/* Introduction */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            WM 2026 Sportwetten -- Ueberblick
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Die Fussball-Weltmeisterschaft 2026 bietet mit 104 Spielen und 48
            Mannschaften eine Vielzahl an Wettmoeglichkeiten. Von einfachen
            Ergebniswetten ueber Torschuetzenwetten bis hin zu Langzeitwetten
            auf den Weltmeister -- die WM 2026 verspricht spannende Wochen
            fuer Fussballfans.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Auf dieser Seite finden Sie einen Ueberblick ueber die wichtigsten
            Wettmaerkte und Tipps fuer verantwortungsvolles Wetten waehrend
            der WM 2026.
          </p>
        </section>

        {/* Betting markets */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Beliebte Wettmaerkte
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Weltmeister-Wette",
                desc: "Wer gewinnt die WM 2026? Langzeitwette auf den Turniersieger.",
              },
              {
                title: "Spielergebnis",
                desc: "1X2-Wetten auf das Ergebnis jedes einzelnen WM-Spiels.",
              },
              {
                title: "Torschuetzen",
                desc: "Welcher Spieler erzielt ein Tor? Erster Torschuetze, letzter Torschuetze, jederzeit.",
              },
              {
                title: "Ueber/Unter Tore",
                desc: "Werden mehr oder weniger als 2,5 Tore in einem Spiel fallen?",
              },
              {
                title: "Gruppenerster",
                desc: "Welche Mannschaft gewinnt ihre Gruppe?",
              },
              {
                title: "Torschuetzenkoenig",
                desc: "Wer wird bester Torschuetze der WM 2026?",
              },
            ].map((market) => (
              <div
                key={market.title}
                className="rounded-lg border border-gray-100 bg-gray-50 p-4"
              >
                <p className="font-semibold text-gray-900 mb-1">
                  {market.title}
                </p>
                <p className="text-sm text-gray-600">{market.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Responsible gambling */}
        <section className="rounded-xl border-2 border-yellow-400 bg-yellow-50 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Verantwortungsvolles Spielen
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Gluecksspiel kann suechtig machen. Setzen Sie nur Geld ein, das
            Sie sich leisten koennen zu verlieren. Setzen Sie sich ein Budget
            und halten Sie sich daran.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>Teilnahme ab 18 Jahren</li>
            <li>Spielen Sie nicht unter Alkohol- oder Drogeneinfluss</li>
            <li>Versuchen Sie nicht, Verluste durch hoeheren Einsatz auszugleichen</li>
            <li>Setzen Sie sich ein zeitliches und finanzielles Limit</li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            <strong>Hilfe bei Spielsucht:</strong> Bundeszentrale fuer
            gesundheitliche Aufklaerung (BZgA) -- Telefon: 0800 1 37 27 00
            (kostenlos und anonym).
          </p>
        </section>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/spiel/spielplan"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Spielplan
          </Link>
          <Link
            href="/mannschaften"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Mannschaften
          </Link>
          <Link
            href="/gruppen"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Gruppen
          </Link>
        </div>
      </div>
    </>
  );
}
