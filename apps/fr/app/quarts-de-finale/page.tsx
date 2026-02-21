import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Swords, Calendar, ArrowRight, Medal } from "lucide-react";

export const metadata: Metadata = {
  title: "Quarts de finale Coupe du Monde 2026 - Dates & Analyse | CDM 2026",
  description:
    "Quarts de finale CDM 2026 : les 9 et 10 juillet 2026. Les 8 meilleures équipes du monde s'affrontent. Format, stades et analyse.",
  openGraph: {
    title: "Quarts de finale CDM 2026",
    description: "Tout sur les quarts de finale de la Coupe du Monde 2026.",
    url: "https://www.cdm2026.fr/quarts-de-finale",
  },
  alternates: { canonical: "https://www.cdm2026.fr/quarts-de-finale" },
};

const faqItems = [
  {
    question: "Quand se jouent les quarts de finale de la CDM 2026 ?",
    answer: "Les quarts de finale se jouent les 9 et 10 juillet 2026. 4 matchs sont programmés sur 2 jours.",
  },
  {
    question: "Où se jouent les quarts de finale ?",
    answer: "Les quarts de finale se déroulent dans 4 stades différents parmi les 16 enceintes du tournoi. Les stades exacts seront confirmés par la FIFA dans le calendrier détaillé.",
  },
  {
    question: "Quelles équipes sont favorites pour les quarts ?",
    answer: "Les favoris habituels (Brésil, Argentine, France, Allemagne, Angleterre, Espagne) sont attendus à ce stade, mais le format élargi à 48 équipes peut réserver des surprises avec l'émergence de nouvelles nations.",
  },
];

export default function QuartsDeFinale() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Quarts de finale" },
        ]}
      />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Medal className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Phases éliminatoires
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-accent">Quarts de finale</span> CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Les 8 meilleures équipes du monde. 4 matchs décisifs les 9 et 10 juillet 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "4", label: "Matchs" },
              { val: "8", label: "Équipes" },
              { val: "2", label: "Jours" },
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
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Swords className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">Le stade des grands</h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Les quarts de finale marquent l&apos;entrée dans le « dernier carré élargi ».
              À ce stade, il ne reste que 8 équipes et chaque match peut devenir un classique
              de l&apos;histoire du football.
            </p>
            <p>
              Le format reste identique : 90 minutes de temps réglementaire, prolongation
              et tirs au but si nécessaire. Les vainqueurs accèdent aux demi-finales.
            </p>
            <p>
              Historiquement, les quarts de finale ont produit des matchs légendaires :
              France-Brésil 2006, Argentine-Angleterre 1986, Brésil-Allemagne 2014
              (en demi, certes, mais l&apos;intensité des quarts est comparable).
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">Calendrier</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Matchs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">9 juillet 2026</td>
                  <td className="px-4 py-3 text-gray-600">Quarts 1 et 2</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">10 juillet 2026</td>
                  <td className="px-4 py-3 text-gray-600">Quarts 3 et 4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 p-8 text-center">
            <Medal className="h-12 w-12 text-accent mx-auto mb-4 opacity-60" />
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Affiches à venir
            </p>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Les affiches des quarts de finale seront déterminées par les résultats
              des huitièmes. Testez vos pronostics avec notre simulateur.
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
