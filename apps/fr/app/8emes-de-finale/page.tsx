import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { Swords, Calendar, ArrowRight, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Huitièmes de finale Coupe du Monde 2026 - Dates & Format | CDM 2026",
  description:
    "Huitièmes de finale CDM 2026 : du 3 au 6 juillet 2026. Format, analyse du bracket, matchs à suivre et pronostics pour le round of 16.",
  openGraph: {
    title: "Huitièmes de finale CDM 2026",
    description: "Tout sur les huitièmes de finale de la Coupe du Monde 2026 : dates, format et analyse.",
    url: "https://cdm2026.fr/8emes-de-finale",
  },
  alternates: { canonical: "https://cdm2026.fr/8emes-de-finale" },
};

const faqItems = [
  {
    question: "Quand se jouent les huitièmes de finale de la CDM 2026 ?",
    answer: "Les huitièmes de finale se déroulent du 3 au 6 juillet 2026, soit 8 matchs répartis sur 4 jours.",
  },
  {
    question: "Combien d'équipes participent aux huitièmes de finale ?",
    answer: "16 équipes s'affrontent en huitièmes de finale (Round of 16). Ce sont les vainqueurs des 16 matchs de 16èmes de finale.",
  },
  {
    question: "Comment est structuré le bracket des huitièmes ?",
    answer: "Le bracket est prédéterminé : chaque moitié du tableau mène à une demi-finale. Les vainqueurs des huitièmes s'affrontent en quarts de finale selon un croisement fixé à l'avance par la FIFA.",
  },
];

export default function HuitiemesDeFinale() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Huitièmes de finale", url: "/8emes-de-finale" },
        ]}
        baseUrl={domains.fr}
      />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Huitièmes de finale" },
        ]}
      />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Swords className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">
              Phases éliminatoires
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-secondary">Huitièmes de finale</span> CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Round of 16 — Du 3 au 6 juillet 2026. Les 16 meilleures équipes
            s&apos;affrontent pour une place en quarts.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "8", label: "Matchs" },
              { val: "16", label: "Équipes" },
              { val: "4", label: "Jours" },
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
            <Target className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Format & enjeux</h2>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Les huitièmes de finale opposent les 16 vainqueurs des 16èmes de finale.
              C&apos;est le tour classique de la Coupe du Monde que les fans connaissent bien,
              mais avec un bracket élargi en amont.
            </p>
            <p>
              Chaque match se joue en 90 minutes, avec prolongation (2 × 15 min) et tirs au but
              en cas d&apos;égalité. Historiquement, ce tour produit certains des matchs les plus
              mémorables du tournoi.
            </p>
            <p>
              Le bracket est structuré en deux moitiés distinctes. Les équipes situées dans la
              même moitié ne peuvent se rencontrer qu&apos;en finale, ce qui crée des « tableaux
              de la mort » quand les favoris se retrouvent du même côté.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendrier prévu</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Matchs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                {[
                  { date: "3 juillet 2026", matchs: "Matchs 1-2" },
                  { date: "4 juillet 2026", matchs: "Matchs 3-4" },
                  { date: "5 juillet 2026", matchs: "Matchs 5-6" },
                  { date: "6 juillet 2026", matchs: "Matchs 7-8" },
                ].map((r) => (
                  <tr key={r.date} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{r.date}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{r.matchs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="rounded-xl border-2 border-dashed border-secondary/40 bg-secondary/5 p-8 text-center">
            <Swords className="h-12 w-12 text-secondary mx-auto mb-4 opacity-60" />
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Affiches à venir
            </p>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              Les affiches des huitièmes de finale seront connues à l&apos;issue des 16èmes.
              Simulez dès maintenant les matchs possibles.
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
