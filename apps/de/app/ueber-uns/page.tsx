import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Über uns | WM 2026",
  description:
    "Über WM 2026: Ihr umfassender Guide zur WM 2026. Prognosen, Statistiken und Analysen für alle 48 Mannschaften.",
  alternates: {
    canonical: "https://www.wm2026guide.de/ueber-uns",
  },
  openGraph: {
    title: "Über WM 2026",
    description: "Ihr umfassender Guide zur WM 2026.",
  },
};

export default function AProposPage() {
  return (
    <>
<section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Über uns</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Über WM 2026</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ihr umfassender Guide zur ersten WM mit 48 Mannschaften.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Unsere Mission
            </h2>
            <p>
              WM 2026 ist eine unabhängige Website zur FIFA
              Weltmeisterschaft 2026, die vom 11. Juni bis 19. Juli 2026 in den
              USA, Kanada und Mexiko stattfindet. Unser Ziel ist es, die
              umfassendsten Informationen und relevantesten Analysen zu diesem
              historischen Ereignis bereitzustellen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Was wir anbieten
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">Mannschaftsprofile</h3>
                <p className="mt-1 text-sm">
                  Detaillierte Analysen der 48 qualifizierten Mannschaften mit Kadern,
                  Statistiken und WM-Historie.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">Prognosen</h3>
                <p className="mt-1 text-sm">
                  Prognosen basierend auf statistischen Daten und
                  ELO-Rankings für jedes Spiel und jeden Vergleich.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">Quotenvergleich</h3>
                <p className="mt-1 text-sm">
                  Vergleich der Quoten führender lizenzierter Wettanbieter,
                  um Ihnen die besten Werte zu bieten.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">Praktischer Ratgeber</h3>
                <p className="mt-1 text-sm">
                  Guides zu den 16 Austragungsorten und Stadien mit praktischen
                  Informationen für Fans.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Unser Expertenteam
            </h2>
            <p>
              WM 2026 wird von einem Team aus 3 sich ergänzenden Experten verfasst:
              einem Sportdatenanalysten, einer erfahrenen Sportjournalistin
              und einem Sportwetten-Spezialisten. Jeder Artikel wird gegengelesen und
              geprüft, um die Zuverlässigkeit der Informationen zu gewährleisten.
            </p>
            <p className="mt-2">
              <Link href="/equipe-editoriale" className="text-primary font-medium hover:underline">
                Unser Redaktionsteam entdecken →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Unsere Methodik
            </h2>
            <p>
              Unsere Analysen stützen sich auf statistische Daten aus
              anerkannten offiziellen Quellen: FIFA-Rankings, Daten der
              Konföderationen (UEFA, CONMEBOL, CAF, AFC, CONCACAF) und
              spezialisierte Statistikdatenbanken. Unsere Prognosen verwenden ein
              algorithmisches Modell, das ELO-Rankings, fortgeschrittene Statistiken
              (xG, Ballbesitz, aktuelle Form) und den Direktvergleich
              kombiniert.
            </p>
            <p className="mt-2">
              Wir bemühen uns um Transparenz bei unserer Methodik und weisen
              darauf hin, dass jede Prognose mit Unsicherheiten verbunden ist.
              Unsere Vorhersagen stellen in keinem Fall eine Wettberatung dar.
              Besuchen Sie unsere{" "}
              <Link href="/ueber-uns" className="text-primary hover:underline">
                Methodik-Seite
              </Link>{" "}
              für weitere Details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Redaktionelle Unabhängigkeit
            </h2>
            <p>
              WM 2026 ist eine unabhängige Website, die weder mit der FIFA noch mit
              einem Sportwettenanbieter verbunden ist. Unsere Analysen und Prognosen
              werden vollständig unabhängig erstellt. Die auf der Website vorhandenen
              Affiliate-Links beeinflussen nicht unsere redaktionellen Inhalte
              und sind deutlich gekennzeichnet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Die WM 2026 in Zahlen
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "48", label: "Mannschaften" },
                { value: "104", label: "Spiele" },
                { value: "16", label: "Austragungsorte" },
                { value: "3", label: "Gastgeberländer" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-gray-50 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Nützliche Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/equipe-editoriale" className="text-primary hover:underline">
                  Unser Redaktionsteam
                </Link>
              </li>
              <li>
                <Link href="/ueber-uns" className="text-primary hover:underline">
                  Unsere Methodik
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-primary hover:underline">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/verantwortungsvolles-spielen" className="text-primary hover:underline">
                  Verantwortungsvolles Spielen
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
