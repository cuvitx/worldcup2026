import type { Metadata } from "next";
import Link from "next/link";
import { domains } from "@repo/data/route-mapping";
import { Bot } from "lucide-react"
export const metadata: Metadata = {
  title: "Notre méthodologie | Comment nous calculons nos pronostics CDM 2026",
  description:
    "Découvrez notre méthodologie de pronostics pour la Coupe du Monde 2026 : modèle ELO, pipeline IA triple-tier, facteurs d'analyse et transparence sur nos prédictions.",
  alternates: {
    canonical: "https://www.cdm2026.fr/methodologie",
  },
  openGraph: {
    title: "Notre méthodologie | Pronostics CDM 2026",
    description:
      "Modèle ELO, intelligence artificielle et analyse statistique : comment nous calculons nos pronostics pour la Coupe du Monde 2026.",
  },
};

export default function MethodologiePage() {
  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Transparence</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Notre méthodologie</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comment nous calculons nos pronostics pour la Coupe du Monde 2026 :
            modèle ELO, intelligence artificielle et analyse multi-facteurs.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-12 space-y-8">
        {/* ELO Rating System */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Le modèle ELO
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Le système de classement ELO, initialement conçu pour les échecs par
            Arpad Elo, est adapté au football international pour évaluer la force
            relative de chaque équipe. Chaque nation possède un{" "}
            <strong>rating ELO</strong> qui évolue après chaque match en
            fonction du résultat et de la force de l&apos;adversaire.
          </p>

          <div className="rounded-lg bg-gray-50 p-5 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Formule simplifiée</h3>
            <div className="font-mono text-sm bg-white rounded p-3 border border-gray-200">
              <p>
                R<sub>new</sub> = R<sub>old</sub> + K × (S - E)
              </p>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-gray-600">
              <li>
                <strong>R</strong> = Rating ELO de l&apos;équipe
              </li>
              <li>
                <strong>K</strong> = Facteur K (poids du match : 60 pour la CDM,
                50 pour les qualifications, 30 pour les amicaux)
              </li>
              <li>
                <strong>S</strong> = Score réel (1 = victoire, 0.5 = nul, 0 =
                défaite)
              </li>
              <li>
                <strong>E</strong> = Score attendu (Expected Score)
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-gray-50 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Score attendu (Expected Score)</h3>
            <div className="font-mono text-sm bg-white rounded p-3 border border-gray-200">
              <p>
                E = 1 / (1 + 10<sup>(R<sub>adversaire</sub> - R<sub>équipe</sub>) / 400</sup>)
              </p>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Cette formule calcule la probabilité de victoire en fonction de la
              différence de rating entre les deux équipes. Plus l&apos;écart est
              grand, plus le favori a de chances de l&apos;emporter.
            </p>
          </div>
        </section>

        {/* AI Pipeline */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            <Bot className="h-5 w-5 inline-block" /> Pipeline IA triple-tier
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Nos pronostics sont enrichis par un pipeline d&apos;intelligence
            artificielle à trois niveaux, chacun spécialisé dans un rôle précis.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Expert */}
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-white font-bold">
                  1
                </span>
                <div>
                  <p className="font-bold text-primary">Expert</p>
                  <p className="text-xs text-primary/70">Claude (Anthropic)</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Analyse tactique approfondie, évaluation des forces et
                faiblesses, prédictions de score, identification des value bets
                et insights stratégiques.
              </p>
            </div>

            {/* Factuel */}
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-white font-bold">
                  2
                </span>
                <div>
                  <p className="font-bold text-primary">Factuel</p>
                  <p className="text-xs text-primary/70">Gemini (Google)</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Fact-checking en temps réel, vérification des données, récupération
                des dernières actualités (blessures, suspensions, forme récente,
                météo).
              </p>
            </div>

            {/* Infra */}
            <div className="rounded-lg border-2 border-field/20 bg-field/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-field text-lg text-white font-bold">
                  3
                </span>
                <div>
                  <p className="font-bold text-field">Infra</p>
                  <p className="text-xs text-field/70">GPT (OpenAI)</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Orchestration des meta-données, structuration du contenu,
                génération SEO et synthèse des résultats des deux autres tiers.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600 text-center">
              <strong>Flux :</strong> Données brutes → Gemini (fact-check) →
              Claude (analyse experte) → GPT (structuration) → Pronostic final
            </p>
          </div>
        </section>

        {/* Factors */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
             Facteurs d&apos;analyse
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nos pronostics intègrent de multiples facteurs pour maximiser la
            précision des prédictions :
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: "",
                title: "Rating ELO",
                desc: "Force relative de chaque équipe basée sur l'historique des résultats",
              },
              {
                icon: "",
                title: "Confrontations directes (H2H)",
                desc: "Historique des résultats entre les deux équipes",
              },
              {
                icon: "",
                title: "Altitude",
                desc: "Impact de l'altitude du stade sur la performance (ex: Mexico à 2 240m)",
              },
              {
                icon: "",
                title: "Météo",
                desc: "Température, humidité et conditions météo le jour du match",
              },
              {
                icon: "",
                title: "Fatigue voyage",
                desc: "Distance parcourue, décalage horaire et temps de récupération",
              },
              {
                icon: "",
                title: "Blessures & suspensions",
                desc: "Joueurs clés absents et impact sur la composition",
              },
              {
                icon: "",
                title: "Forme récente",
                desc: "Résultats des 5 derniers matchs et dynamique de l'équipe",
              },
              {
                icon: "",
                title: "Avantage domicile",
                desc: "Bonus pour les pays hôtes (USA, Canada, Mexique)",
              },
            ].map((factor) => (
              <div
                key={factor.title}
                className="flex gap-3 rounded-lg border border-gray-200 p-4"
              >
                <span className="text-2xl shrink-0">{factor.icon}</span>
                <div>
                  <p className="font-semibold">{factor.title}</p>
                  <p className="text-sm text-gray-500">{factor.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How predictions work */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Comment sont calculées les probabilités
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Pour chaque match, nous combinons le modèle ELO avec les facteurs
              contextuels pour obtenir un rating ajusté. Les probabilités de
              victoire, nul et défaite sont ensuite calculées via la formule
              Expected Score.
            </p>
            <p>
              Pour les pronostics de tournoi (chances de passer les groupes, de
              gagner la CDM), nous effectuons une{" "}
              <strong>simulation Monte-Carlo</strong> de 100 000 tournois
              complets. Chaque match est simulé en utilisant les probabilités
              ajustées, ce qui nous donne des estimations robustes pour chaque
              phase.
            </p>
            <p>
              Les cotes estimées sont dérivées des probabilités selon la formule :
            </p>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="font-mono text-sm bg-white rounded p-3 border border-gray-200 text-center">
                Cote = 1 / Probabilité
              </div>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Exemple : 40% de chances → cote de 2.50
              </p>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Transparence & limites
          </h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              <strong>
                Nos pronostics sont des estimations basées sur des modèles
                statistiques. Ils ne garantissent pas les résultats.
              </strong>
            </p>
            <p>
              Le football est un sport imprévisible. Aucun modèle ne peut
              prédire avec certitude l&apos;issue d&apos;un match. Nos analyses
              visent à fournir un éclairage statistique pour aider à la
              compréhension, pas à encourager les paris.
            </p>
            <p>
              Si vous choisissez de parier, faites-le de manière responsable.
              Consultez notre page{" "}
              <Link
                href="/jeu-responsable"
                className="text-primary hover:underline font-medium"
              >
                Jeu responsable
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg bg-primary text-white p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Découvrez nos pronostics en action
          </h2>
          <p className="text-gray-300 mb-4">
            Consultez les pronostics détaillés pour chaque match de la Coupe du
            Monde 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/match/calendrier"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Calendrier des matchs
            </Link>
            <Link
              href="/equipe"
              className="rounded-lg bg-white/10 px-5 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Les 48 équipes
            </Link>
            <Link
              href="/guides"
              className="rounded-lg bg-white/10 px-5 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Nos guides
            </Link>
          </div>
        </section>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Notre méthodologie | Comment nous calculons nos pronostics CDM 2026",
            description:
              "Découvrez notre méthodologie de pronostics pour la Coupe du Monde 2026 : modèle ELO, pipeline IA triple-tier et analyse multi-facteurs.",
            author: {
              "@type": "Organization",
              name: "Équipe CDM 2026",
            },
            publisher: {
              "@type": "Organization",
              name: "CDM 2026",
            },
            url: `${domains.fr}/methodologie`,
          }),
        }}
      />
    </>
  );
}
