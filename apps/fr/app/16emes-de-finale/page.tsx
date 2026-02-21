import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Swords, Calendar, ArrowRight, Info, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "16èmes de finale Coupe du Monde 2026 - Tableau & Dates | CDM 2026",
  description:
    "16èmes de finale de la Coupe du Monde 2026 : format, dates du 28 juin au 2 juillet, tableau des matchs et nouveau bracket à 48 équipes.",
  openGraph: {
    title: "16èmes de finale CDM 2026 - Tableau complet",
    description:
      "Découvrez le format des 16èmes de finale de la Coupe du Monde 2026. Dates, matchs possibles et bracket.",
    url: "https://www.cdm2026.fr/16emes-de-finale",
  },
  alternates: {
    canonical: "https://www.cdm2026.fr/16emes-de-finale",
  },
};

const faqItems = [
  {
    question: "Combien de matchs y a-t-il en 16èmes de finale de la CDM 2026 ?",
    answer:
      "Il y a 16 matchs en 16èmes de finale (Round of 32). C'est un tour inédit dans l'histoire de la Coupe du Monde, rendu nécessaire par le passage à 48 équipes. Les 32 équipes qualifiées s'affrontent en matchs à élimination directe.",
  },
  {
    question: "Comment sont déterminés les matchs de 16èmes de finale ?",
    answer:
      "Les 1ers et 2èmes de chaque groupe (24 équipes) ainsi que les 8 meilleurs 3èmes se qualifient. Le bracket est prédéfini par la FIFA : les 1ers de groupe affrontent les meilleurs 3èmes ou les 2èmes d'un autre groupe selon un tableau croisé.",
  },
  {
    question: "Quand se jouent les 16èmes de finale de la CDM 2026 ?",
    answer:
      "Les 16èmes de finale se déroulent du 28 juin au 2 juillet 2026, juste après la fin de la phase de groupes. Les 16 matchs sont répartis sur 5 jours.",
  },
  {
    question: "Y a-t-il des prolongations en 16èmes de finale ?",
    answer:
      "Oui. À partir des 16èmes de finale, en cas d'égalité à l'issue du temps réglementaire (90 minutes), les équipes disputent une prolongation de 30 minutes (2 × 15 min). Si le score reste nul, une séance de tirs au but détermine le vainqueur.",
  },
];

export default function SeiziemesDeFinale() {
  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Swords className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Phases éliminatoires
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-accent">16èmes de finale</span> CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Round of 32 — Un tour inédit pour la première Coupe du Monde à 48 équipes.
            Du 28 juin au 2 juillet 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "16", label: "Matchs" },
              { val: "32", label: "Équipes" },
              { val: "5", label: "Jours" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-accent">{s.val}</p>
                <p className="text-xs text-gray-300 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        {/* Format */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Info className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Comment ça marche ?
            </h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Avec 48 équipes réparties en 12 groupes de 4, la phase de groupes qualifie
              <strong> 32 équipes</strong> pour les 16èmes de finale : les 12 premiers, les 12 deuxièmes
              et les 8 meilleurs troisièmes.
            </p>
            <p>
              Ce tour, absent des précédentes Coupes du Monde à 32 équipes, constitue le
              premier round à élimination directe. Il se joue en matchs secs avec prolongation
              et tirs au but si nécessaire.
            </p>
            <p>
              Le bracket est prédéterminé par la FIFA. Les premiers de groupe bénéficient
              d&apos;un tirage plus favorable en affrontant des troisièmes qualifiés, tandis que
              les deuxièmes se croisent avec d&apos;autres deuxièmes ou premiers selon la grille
              officielle.
            </p>
          </div>
        </section>

        {/* Dates */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Calendrier prévu
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Matchs</th>
                  <th className="px-4 py-3 text-left">Horaires (heure locale)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  { date: "28 juin 2026", matchs: "Matchs 1-4", heures: "13h / 16h / 19h / 22h" },
                  { date: "29 juin 2026", matchs: "Matchs 5-8", heures: "13h / 16h / 19h / 22h" },
                  { date: "30 juin 2026", matchs: "Matchs 9-12", heures: "13h / 16h / 19h / 22h" },
                  { date: "1er juillet 2026", matchs: "Matchs 13-14", heures: "19h / 22h" },
                  { date: "2 juillet 2026", matchs: "Matchs 15-16", heures: "19h / 22h" },
                ].map((r) => (
                  <tr key={r.date} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.date}</td>
                    <td className="px-4 py-3 text-gray-600">{r.matchs}</td>
                    <td className="px-4 py-3 text-gray-600">{r.heures}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tableau */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Tableau des matchs
            </h2>
          </div>
          <div className="rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 p-8 text-center">
            <Swords className="h-12 w-12 text-accent mx-auto mb-4 opacity-60" />
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Tableau à venir
            </p>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Le tableau complet des 16èmes de finale sera dévoilé après le tirage au sort
              et confirmé à l&apos;issue de la phase de groupes.
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

        {/* FAQ */}
        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
