import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { Trophy, Calendar, ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Demi-finales Coupe du Monde 2026 - Dates, Stades & Analyse | CDM 2026",
  description:
    "Demi-finales CDM 2026 : les 13 et 14 juillet 2026. Stades pressentis, format, analyse et pronostics pour le dernier carré.",
  openGraph: {
    title: "Demi-finales CDM 2026",
    description: "Les demi-finales de la Coupe du Monde 2026 : dates, stades et analyse.",
    url: "https://cdm2026.fr/demi-finales",
  },
  alternates: { canonical: "https://cdm2026.fr/demi-finales" },
};

const faqItems = [
  {
    question: "Quand se jouent les demi-finales de la CDM 2026 ?",
    answer: "Les demi-finales sont programmées les 13 et 14 juillet 2026, un match par jour.",
  },
  {
    question: "Dans quels stades se jouent les demi-finales ?",
    answer: "Les stades des demi-finales seront parmi les plus grandes enceintes du tournoi. Le AT&T Stadium (Dallas, 80 000 places) et le MetLife Stadium (New York, 82 500 places) sont pressentis.",
  },
  {
    question: "Y a-t-il un match pour la 3e place en 2026 ?",
    answer: "Oui, la FIFA maintient le match pour la 3e place (petite finale). Il se jouera le 18 juillet 2026, la veille de la grande finale, entre les deux perdants des demi-finales.",
  },
];

const stades = [
  {
    nom: "AT&T Stadium",
    ville: "Dallas / Arlington, Texas",
    capacite: "80 000",
    detail: "Toit rétractable, écran géant emblématique",
  },
  {
    nom: "MetLife Stadium",
    ville: "East Rutherford, New Jersey (New York)",
    capacite: "82 500",
    detail: "Stade de la finale, à ciel ouvert",
  },
];

export default function DemiFinales() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Demi-finales", url: "/demi-finales" },
        ]}
        baseUrl={domains.fr}
      />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Demi-finales" },
        ]}
      />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Trophy className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">
              Le dernier carré
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-secondary">Demi-finales</span> CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Les 4 meilleures équipes du monde. 13 et 14 juillet 2026.
            Deux matchs pour une place en finale.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "2", label: "Matchs" },
              { val: "4", label: "Équipes" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-secondary">{s.val}</p>
                <p className="text-xs text-gray-300 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendrier</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                <tr className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">13 juillet 2026</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Demi-finale 1</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">14 juillet 2026</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Demi-finale 2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Stades pressentis</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stades.map((s) => (
              <div
                key={s.nom}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{s.nom}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.ville}</p>
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <span className="font-medium text-primary">{s.capacite} places</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600 dark:text-gray-300">{s.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="rounded-xl border-2 border-dashed border-secondary/40 bg-secondary/5 p-8 text-center">
            <Trophy className="h-12 w-12 text-secondary mx-auto mb-4 opacity-60" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Affiches à venir
            </p>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              Les demi-finales seront déterminées par les résultats des quarts.
              Qui atteindra le dernier carré ?
            </p>
            <Link
              href="/simulateur"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
            >
              Simuler le bracket
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
