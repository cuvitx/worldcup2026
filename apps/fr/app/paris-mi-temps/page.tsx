import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Clock, ArrowRight, AlertTriangle, BarChart3, Target, Zap, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Paris mi-temps / fin de match CDM 2026 — Guide HT/FT complet",
  description:
    "Guide complet des paris mi-temps / fin de match (HT/FT) pour la CDM 2026 : explication, stats, cotes types, stratégies et meilleurs matchs pour ce marché.",
  openGraph: {
    title: "Paris mi-temps / fin de match CDM 2026",
    description: "Maîtrisez le marché HT/FT : stats CDM, cotes et stratégies.",
    url: "https://www.cdm2026.fr/paris-mi-temps",
  },
  alternates: { canonical: "https://www.cdm2026.fr/paris-mi-temps" },
};

const resultatsHtFt = [
  { combo: "1/1", description: "Équipe A mène à la MT et gagne", frequence: "~28%", coteType: "1.80 – 2.50" },
  { combo: "X/1", description: "Nul à la MT, équipe A gagne", frequence: "~14%", coteType: "3.50 – 5.00" },
  { combo: "2/1", description: "Équipe B mène à la MT, A gagne (remontada)", frequence: "~3%", coteType: "12.00 – 25.00" },
  { combo: "1/X", description: "Équipe A mène à la MT, nul final", frequence: "~6%", coteType: "6.00 – 10.00" },
  { combo: "X/X", description: "Nul à la MT et nul final", frequence: "~12%", coteType: "4.00 – 5.50" },
  { combo: "2/X", description: "Équipe B mène à la MT, nul final", frequence: "~5%", coteType: "8.00 – 14.00" },
  { combo: "1/2", description: "Équipe A mène à la MT, B gagne (remontada)", frequence: "~3%", coteType: "12.00 – 25.00" },
  { combo: "X/2", description: "Nul à la MT, équipe B gagne", frequence: "~13%", coteType: "3.80 – 5.50" },
  { combo: "2/2", description: "Équipe B mène à la MT et gagne", frequence: "~16%", coteType: "2.50 – 4.00" },
];

const statsCDM = [
  { stat: "Matchs où le score change en 2e MT", valeur: "~42%", detail: "Presque 1 match sur 2 voit le score évoluer après la pause" },
  { stat: "Matchs 0-0 à la mi-temps", valeur: "~38%", detail: "Les équipes se jaugent en 1ère MT de CDM, surtout en phase de groupes" },
  { stat: "Remontadas (mené MT → gagne)", valeur: "~6%", detail: "Rare mais très lucratif en termes de cotes" },
  { stat: "Buts marqués en 2e MT", valeur: "~56%", detail: "La majorité des buts tombent après la pause (fatigue, tactique, pression)" },
  { stat: "Matchs avec résultat différent MT vs FT", valeur: "~35%", detail: "Un tiers des matchs changent de physionomie en 2e période" },
];

const strategies = [
  {
    titre: "X/1 ou X/2 (nul à la MT, victoire finale)",
    description: "Les matchs de CDM démarrent souvent prudemment. Cherchez les gros favoris qui dominent mais mettent du temps à marquer : France, Brésil, Allemagne en phase de groupes contre des « petits » qui défendent bien.",
    coteType: "3.50 – 5.00",
    risque: "Moyen",
  },
  {
    titre: "1/1 sur les gros favoris",
    description: "Les équipes qui ouvrent le score tôt (avant la 30e) gagnent dans 85% des cas en CDM. Identifiez les favoris qui marquent vite : données à croiser avec les statistiques de temps du 1er but.",
    coteType: "1.80 – 2.50",
    risque: "Faible",
  },
  {
    titre: "Remontada (2/1 ou 1/2) sur les derbys",
    description: "Les confrontations historiques (Argentine-Brésil, France-Allemagne) produisent plus de retournements de situation. Cotes très élevées, à jouer en petite mise.",
    coteType: "12.00 – 25.00",
    risque: "Très élevé",
  },
  {
    titre: "X/X en phase de groupes",
    description: "Les nuls sont fréquents en J1 (les équipes ne veulent pas perdre) et J3 (matchs sans enjeu ou résultats arrangés). Cote ~4.50 pour un bon rendement.",
    coteType: "4.00 – 5.50",
    risque: "Moyen",
  },
];

const faqItems = [
  {
    question: "Qu'est-ce qu'un pari mi-temps / fin de match (HT/FT) ?",
    answer:
      "C'est un pari sur le résultat à la mi-temps ET le résultat final du match. Il y a 9 combinaisons possibles (1/1, X/1, 2/1, 1/X, X/X, 2/X, 1/2, X/2, 2/2). Les cotes sont plus élevées qu'un simple 1X2 car il faut prédire deux résultats.",
  },
  {
    question: "Quel est le meilleur pari HT/FT en CDM ?",
    answer:
      "Le X/1 (nul à la mi-temps, favori gagne) est le meilleur rapport valeur/probabilité en CDM. Environ 14% des matchs se terminent ainsi, avec des cotes de 3.50-5.00. Les favoris marquent souvent en 2e mi-temps quand l'adversaire fatigue.",
  },
  {
    question: "Les remontadas sont-elles fréquentes en CDM ?",
    answer:
      "Non, seulement ~6% des matchs voient l'équipe menée à la mi-temps l'emporter. C'est rare mais mémorable (Allemagne-Suède 2018 : 0-1 MT → 2-1 FT). Les cotes de 12-25 reflètent cette faible probabilité.",
  },
  {
    question: "Faut-il parier HT/FT en live ?",
    answer:
      "Non, le pari HT/FT se fait avant le match. En live, les cotes s'ajustent en temps réel et perdent leur valeur. L'intérêt du HT/FT est justement d'anticiper le scénario du match avec des cotes attractives pré-match.",
  },
];

export default function ParisMiTempsPage() {
  const breadcrumbItems = [{ label: "Accueil", href: "/" }, { label: "Paris mi-temps / fin de match" }];
  
  return (
    <>
<Breadcrumb items={breadcrumbItems} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Paris sportifs
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Paris mi-temps / fin de match CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Maîtrisez le marché HT/FT : 9 combinaisons, stats CDM, cotes types et stratégies
            pour profiter des retournements de situation.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Explication */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <Clock className="h-7 w-7 text-accent" /> Comment ça marche ?
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 prose max-w-none">
            <p>
              Le pari <strong>mi-temps / fin de match (HT/FT)</strong> consiste à prédire le résultat
              à la pause ET le résultat final. Il y a <strong>9 combinaisons possibles</strong> (3 résultats
              à la MT × 3 résultats en fin de match). Les cotes sont plus élevées qu&apos;un simple 1X2
              car la double prédiction est plus difficile.
            </p>
            <p>
              <strong>Notation :</strong> 1 = victoire équipe à domicile / favori, X = nul, 2 = victoire
              extérieur / outsider. Exemple : <strong>X/1</strong> = nul à la mi-temps, victoire du favori
              en fin de match.
            </p>
          </div>
        </section>

        {/* Tableau des 9 combinaisons */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-accent" /> Les 9 combinaisons HT/FT
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-900">HT/FT</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Description</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Fréquence CDM</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Cote type</th>
                </tr>
              </thead>
              <tbody>
                {resultatsHtFt.map((r) => (
                  <tr key={r.combo} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-bold text-accent">{r.combo}</td>
                    <td className="py-3 px-4 text-gray-700">{r.description}</td>
                    <td className="py-3 px-4 text-gray-600">{r.frequence}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900">{r.coteType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Stats CDM */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-accent" /> Statistiques CDM
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statsCDM.map((s) => (
              <div key={s.stat} className="rounded-xl border border-gray-200 bg-white p-5 text-center">
                <p className="text-2xl font-extrabold text-accent">{s.valeur}</p>
                <p className="font-semibold text-gray-900 text-sm mt-1">{s.stat}</p>
                <p className="text-xs text-gray-500 mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stratégies */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Target className="h-7 w-7 text-accent" /> Stratégies HT/FT pour la CDM 2026
          </h2>
          <div className="space-y-4">
            {strategies.map((s) => (
              <div key={s.titre} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900">{s.titre}</h3>
                <p className="text-sm text-gray-700 mt-1">{s.description}</p>
                <div className="flex gap-4 mt-2 text-xs">
                  <span className="text-accent font-semibold">Cote : {s.coteType}</span>
                  <span className="text-gray-500">Risque : {s.risque}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/paris-combines"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Paris combinés CDM <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/paris-corners"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Paris corners
          </Link>
          <Link
            href="/comparateur-cotes"
            className="inline-flex items-center gap-2 border border-gray-300 rounded-xl py-3.5 px-6 font-semibold hover:bg-gray-50 transition-colors"
          >
            Comparateur de cotes
          </Link>
        </div>

        {/* ANJ */}
        <p className="text-xs text-gray-400 text-center">
          <AlertTriangle className="inline h-3 w-3 mr-1" />
          Les paris sportifs comportent des risques. Jouez responsablement. 18+ | Informations et aide sur{" "}
          <a href="https://www.joueurs-info-service.fr" target="_blank" rel="noopener noreferrer" className="underline">
            joueurs-info-service.fr
          </a>{" "}
          (ANJ).
        </p>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
