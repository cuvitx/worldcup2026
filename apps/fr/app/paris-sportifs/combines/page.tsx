import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Layers, ArrowRight, AlertTriangle, CheckCircle, XCircle, Calculator, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Guide des paris combinés CDM 2026 — Combiné, System, Trixie, Yankee",
  description:
    "Paris combinés Coupe du Monde 2026 : combiné, system, Trixie, Yankee. Exemples concrets, calcul de cotes et meilleurs bookmakers.",
  openGraph: {
    title: "Paris combinés CDM 2026 — Le guide complet",
    description: "Combinés, system, Trixie : boostez vos gains CDM 2026 avec nos exemples et stratégies.",
    url: "https://www.cdm2026.fr/paris-sportifs/combines",
  },
  alternates: { canonical: "https://www.cdm2026.fr/paris-sportifs/combines" },
};

const types = [
  {
    nom: "Combiné classique (Acca)",
    description: "Toutes les sélections doivent être gagnantes. Les cotes se multiplient entre elles. Gain potentiel élevé mais risque maximal.",
    exemple: "3 matchs à 1.80 chacun → cote combinée = 1.80 × 1.80 × 1.80 = 5.83",
  },
  {
    nom: "System (ou multi-system)",
    description: "Combinaison de plusieurs combinés. Vous gagnez même si une ou plusieurs sélections perdent, mais la mise est plus élevée.",
    exemple: "System 2/3 sur 3 sélections = 3 combinés de 2. Si 2 sur 3 sont bons, vous gagnez au moins un combiné.",
  },
  {
    nom: "Trixie",
    description: "4 paris sur 3 sélections : 3 doubles + 1 triple. Vous gagnez dès que 2 sélections sur 3 sont correctes.",
    exemple: "Sélections A (1.90), B (2.10), C (1.75) → 3 doubles (AB, AC, BC) + 1 triple (ABC). Mise = 4 × mise unitaire.",
  },
  {
    nom: "Yankee",
    description: "11 paris sur 4 sélections : 6 doubles + 4 triples + 1 quadruple. Rentable dès 2 bonnes sélections.",
    exemple: "4 sélections → 11 combinaisons. Mise totale = 11 × mise unitaire. Très populaire au UK.",
  },
  {
    nom: "Lucky 15 / Lucky 31",
    description: "Comme le Yankee mais inclut les paris simples. Lucky 15 = 15 paris sur 4 sélections (4 simples + 6 doubles + 4 triples + 1 quadruple).",
    exemple: "Vous gagnez même avec une seule bonne sélection (le pari simple). Sécurité maximale, mise élevée.",
  },
];

const exemples = [
  {
    titre: "Combiné « Favoris phase de groupes »",
    selections: ["France bat le Groupe (1.45)", "Brésil bat le Groupe (1.60)", "Allemagne bat le Groupe (1.55)"],
    cote: "1.45 × 1.60 × 1.55 = 3.60",
    mise: "10 €",
    gain: "36 €",
    analyse: "Cotes basses mais combinées = rendement correct. Risque modéré : les trois sont favoris mais un accident est toujours possible.",
  },
  {
    titre: "Combiné « BTTS (les deux marquent) »",
    selections: ["France-Argentine BTTS Oui (1.70)", "Brésil-Allemagne BTTS Oui (1.75)", "Espagne-Angleterre BTTS Oui (1.65)"],
    cote: "1.70 × 1.75 × 1.65 = 4.91",
    mise: "10 €",
    gain: "49,10 €",
    analyse: "Les grosses affiches CDM produisent souvent des buts des deux côtés. Valeur correcte à cote ~4.90.",
  },
  {
    titre: "Combiné « Over 2.5 buts chaleur »",
    selections: ["Match Houston Over 2.5 (1.85)", "Match Dallas Over 2.5 (1.80)", "Match Miami Over 2.5 (1.90)"],
    cote: "1.85 × 1.80 × 1.90 = 6.33",
    mise: "5 €",
    gain: "31,65 €",
    analyse: "La chaleur fatigue les défenses en 2e mi-temps. Matchs en stades chauds = plus de buts historiquement.",
  },
  {
    titre: "System 2/3 « Vainqueurs J1 »",
    selections: ["France gagne J1 (1.55)", "Espagne gagne J1 (1.50)", "Argentine gagne J1 (1.60)"],
    cote: "3 doubles : 2.33 + 2.48 + 2.40 = si 2 sur 3 bons",
    mise: "3 × 5 € = 15 €",
    gain: "~12-13 € (si 2 bons) à 36 € (si 3 bons)",
    analyse: "Le system protège contre un résultat raté. Moins de gain mais plus de chances de retour sur investissement.",
  },
  {
    titre: "Combiné « Buteur + résultat »",
    selections: ["Mbappé marque (1.90)", "France gagne (1.55)", "Over 1.5 buts France (1.35)"],
    cote: "1.90 × 1.55 × 1.35 = 3.97",
    mise: "10 €",
    gain: "39,70 €",
    analyse: "Combiné cohérent : les trois sélections se renforcent logiquement. Si Mbappé marque et la France gagne, il y a fort à parier qu'il y a 2+ buts.",
  },
];

const avantages = [
  "Gains potentiellement très élevés avec une mise modeste",
  "Rendent les petites cotes intéressantes une fois combinées",
  "Ajoutent de l'excitation en suivant plusieurs matchs",
  "Certains bookmakers offrent des bonus combinés (+5% à +50% sur les gains)",
];

const risques = [
  "Il suffit d'une seule erreur pour tout perdre (combiné classique)",
  "La probabilité réelle de gagner un combiné 5+ sélections est très faible (<5%)",
  "Les bookmakers adorent les combinés : la marge cumulée est en leur faveur",
  "Tendance à forcer des sélections « pour compléter le combi » sans analyse",
];

const bookmakers = [
  { nom: "Winamax", avantage: "Cotes boostées sur les combinés CDM, interface fluide", url: "https://www.winamax.fr" },
  { nom: "Betclic", avantage: "Bonus combiné jusqu'à +50%, large choix de marchés", url: "https://www.betclic.fr" },
  { nom: "Unibet", avantage: "Combo Boost réguliers, cashout partiel sur combinés", url: "https://www.unibet.fr" },
  { nom: "ParionsSport", avantage: "Point de vente + en ligne, offre Paris Combo", url: "https://www.enligne.parionssport.fdj.fr" },
];

const faqItems = [
  {
    question: "Combien de sélections maximum dans un combiné ?",
    answer:
      "La plupart des bookmakers autorisent jusqu'à 15-20 sélections. Cependant, au-delà de 3-4 sélections, la probabilité de gagner diminue drastiquement. Les parieurs expérimentés recommandent de ne pas dépasser 3-4 sélections pour un rapport risque/gain optimal.",
  },
  {
    question: "Le combiné est-il rentable sur le long terme ?",
    answer:
      "Non, les combinés ont une espérance de gain négative sur le long terme car les marges des bookmakers se cumulent. Un combiné de 5 sélections a une marge cumulée de ~25-30% en faveur du bookmaker. Utilisez-les avec modération pour le plaisir, pas comme stratégie principale.",
  },
  {
    question: "Qu'est-ce qu'un boost combiné ?",
    answer:
      "Un boost combiné est une promotion où le bookmaker augmente vos gains si votre combiné est gagnant (ex : +10% pour 3 sélections, +30% pour 5+). Winamax et Betclic proposent régulièrement ce type de boost pendant les grandes compétitions.",
  },
  {
    question: "Vaut-il mieux un combiné ou un system ?",
    answer:
      "Le system (Trixie, Yankee) est moins risqué car vous pouvez gagner même avec une sélection perdante. En revanche, la mise totale est plus élevée et le gain maximal plus faible. Pour les débutants, le system 2/3 est un bon compromis.",
  },
];

export default function ParisCombinaPage() {
  const breadcrumbItems = [{ label: "Accueil", href: "/" }, { label: "Paris combinés CDM 2026" }];
  
  return (
    <>
<Breadcrumb transparent items={breadcrumbItems} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Paris sportifs
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Guide des paris combinés CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Combiné, System, Trixie, Yankee : maîtrisez les paris combinés avec nos exemples concrets
            et nos stratégies pour la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Types */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Layers className="h-7 w-7 text-accent" /> Types de paris combinés
          </h2>
          <div className="space-y-4">
            {types.map((t) => (
              <div key={t.nom} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900 text-lg">{t.nom}</h3>
                <p className="text-sm text-gray-700 mt-1">{t.description}</p>
                <p className="text-xs text-accent bg-accent/5 rounded-lg p-2 mt-2">
                  <Calculator className="inline h-3 w-3 mr-1" /> {t.exemple}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Exemples */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Calculator className="h-7 w-7 text-accent" /> 5 exemples de combinés CDM 2026
          </h2>
          <div className="space-y-4">
            {exemples.map((e) => (
              <div key={e.titre} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900">{e.titre}</h3>
                <ul className="mt-2 space-y-1">
                  {e.selections.map((s, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-accent">→</span> {s}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  <span className="text-accent font-semibold">Cote : {e.cote}</span>
                  <span>Mise : {e.mise}</span>
                  <span className="font-bold text-green-600">Gain : {e.gain}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">{e.analyse}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Avantages / Risques */}
        <div className="grid gap-6 sm:grid-cols-2">
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" /> Avantages
            </h2>
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <ul className="space-y-2">
                {avantages.map((a, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <XCircle className="h-6 w-6 text-red-500" /> Risques
            </h2>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <ul className="space-y-2">
                {risques.map((r, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Bookmakers */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <Layers className="h-7 w-7 text-accent" /> Meilleurs bookmakers pour les combinés
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {bookmakers.map((b) => (
              <a
                key={b.nom}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="rounded-xl border border-gray-200 bg-white p-5 hover:border-accent/50 hover:shadow-md transition-all block"
              >
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  {b.nom} <ExternalLink className="h-4 w-4 text-gray-400" />
                </h3>
                <p className="text-sm text-gray-600 mt-1">{b.avantage}</p>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/comparateur-cotes"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Comparateur de cotes <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/paris-sportifs/meteo"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Impact météo sur les paris
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
