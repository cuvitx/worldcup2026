import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { RelatedLinks } from "../components/RelatedLinks";
import { teams } from "@repo/data/teams";
import Flag from "@repo/ui/flag";
import { TableOfContents } from "@repo/ui";

export const metadata: Metadata = {
  title: "Classement FIFA 2026 - Ranking des 48 équipes qualifiées | CDM 2026",
  description:
    "Classement FIFA complet des 48 équipes qualifiées pour la Coupe du Monde 2026. Découvrez le ranking officiel, les mouvements et l'évolution des sélections.",
  openGraph: {
    title: "Classement FIFA 2026 - Ranking des 48 équipes",
    description:
      "Classement FIFA officiel des 48 sélections qualifiées pour la CDM 2026, avec historique et analyse.",
    url: "https://cdm2026.fr/classement-fifa",
  },
  alternates: {
    canonical: "https://cdm2026.fr/classement-fifa",
  },
};

// Préparer les équipes triées par classement FIFA
const teamsRanked = [...teams]
  .filter((t) => t.fifaRanking > 0)
  .sort((a, b) => a.fifaRanking - b.fifaRanking);

const playoffTeams = teams.filter((t) => t.fifaRanking === 0);

const faqItems = [
  {
    question: "Comment fonctionne le classement FIFA ?",
    answer: "Le classement FIFA est calculé selon un système basé sur les points obtenus lors des matchs officiels (compétitions, qualifications et amicaux). Les critères incluent le résultat du match, l'importance de la compétition, la force de l'adversaire et la confédération. Les points sont pondérés sur 4 ans avec un poids décroissant pour les matchs les plus anciens. Le classement est mis à jour mensuellement par la FIFA."
  },
  {
    question: "Quel est le pays #1 au classement FIFA en 2026 ?",
    answer: "L'Argentine occupe la première place du classement FIFA au 19 janvier 2026, suivie de la France (#2) et de l'Espagne (#3). Les champions du monde 2022 ont consolidé leur position grâce à leur victoire au Qatar et leurs performances régulières en qualifications."
  },
  {
    question: "Le classement FIFA influence-t-il le tirage au sort ?",
    answer: "Oui, le classement FIFA est utilisé pour déterminer les têtes de série lors du tirage au sort de la Coupe du Monde. Les 12 équipes les mieux classées sont généralement réparties dans les différents chapeaux, ce qui influence les groupes et donc les parcours potentiels des sélections."
  },
  {
    question: "Quelle est l'équipe la moins bien classée qualifiée pour la CDM 2026 ?",
    answer: "Parmi les équipes déjà qualifiées (hors barrages), l'Afrique du Sud est l'équipe la moins bien classée au ranking FIFA (#60). Les six places de barrages restantes pourraient accueillir des équipes avec un classement moins favorable."
  },
  {
    question: "À quelle fréquence le classement FIFA est-il mis à jour ?",
    answer: "Le classement FIFA est mis à jour mensuellement, généralement le jeudi suivant les fenêtres internationales. Les mises à jour prennent en compte tous les matchs internationaux disputés, pondérés selon leur importance (Coupe du Monde, qualifications, amicaux, etc.)."
  },
  {
    question: "Le classement FIFA est-il fiable pour prédire les résultats ?",
    answer: "Le classement FIFA est un bon indicateur de la force relative des équipes, mais il ne prédit pas toujours les résultats d'un match donné. Des facteurs comme la forme du moment, les blessures, l'avantage du terrain et les tactiques peuvent inverser les pronostics. Néanmoins, statistiquement, les équipes mieux classées ont plus de chances de réussite."
  }
];

export default function ClassementFifaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Classement FIFA", url: "/classement-fifa" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Ranking FIFA 2026
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Classement FIFA des 48 équipes
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Découvrez le classement FIFA complet des sélections qualifiées pour la Coupe du Monde 2026.
            Ranking officiel, évolution et analyse par confédération.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "48", label: "Équipes qualifiées" },
              { val: "6", label: "Confédérations" },
              { val: "ARG", label: "#1 Mondial" },
              { val: "12", label: "Têtes de série" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3 min-w-[110px]">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div>
          {/* Intro */}
          <div className="mb-10">
            <h2 id="introduction" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Le classement FIFA : référence mondiale
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              Le classement mondial de la FIFA est l'indicateur de référence pour évaluer la force des sélections nationales.
              Mis à jour mensuellement depuis 1993, il prend en compte les résultats des matchs officiels pondérés par leur importance,
              la force de l'adversaire et la confédération concernée.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Pour la Coupe du Monde 2026, le classement FIFA a joué un rôle décisif dans la composition des chapeaux lors du tirage au sort.
              Les 12 équipes les mieux classées ont été réparties comme têtes de série dans les 12 groupes, 
              influençant directement les parcours et les confrontations potentielles.
            </p>
          </div>

          {/* Tableau classement FIFA */}
          <div className="mb-12">
            <h2 id="classement-complet" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Classement FIFA complet (19 janvier 2026)
            </h2>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Rang FIFA
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Équipe
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Confédération
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Groupe
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        CDM
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {teamsRanked.map((team, idx) => (
                      <tr
                        key={team.id}
                        className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`
                              font-bold text-sm
                              ${team.fifaRanking <= 12 ? "text-accent" : "text-gray-900 dark:text-white"}
                            `}>
                              #{team.fifaRanking}
                            </span>
                            {team.fifaRanking <= 12 && (
                              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                                tête de série
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/equipe/${team.slug}`}
                            className="flex items-center gap-2 hover:text-accent transition-colors group"
                          >
                            <Flag flag={team.flag} name={team.name} className="w-6 h-4" />
                            <span className="font-medium text-gray-900 dark:text-white group-hover:underline">
                              {team.name}
                            </span>
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {team.confederation}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/groupe/${team.group.toLowerCase()}`}
                            className="text-sm font-semibold text-gray-900 dark:text-white hover:text-accent transition-colors"
                          >
                            Groupe {team.group}
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {team.wcAppearances}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {playoffTeams.length > 0 && (
              <div className="mt-6 bg-gray-50 dark:bg-slate-900 rounded-xl p-5 border border-gray-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Places de barrages en attente
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {playoffTeams.length} places restent à déterminer via les barrages UEFA et intercontinentaux (mars 2026) :
                </p>
                <ul className="space-y-1.5">
                  {playoffTeams.map((team) => (
                    <li key={team.id} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      <span>{team.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Analyse par confédération */}
          <div className="mb-12">
            <h2 id="par-confederation" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Répartition par confédération
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["UEFA", "CONMEBOL", "AFC", "CAF", "CONCACAF", "OFC"].map((conf) => {
                const confTeams = teamsRanked.filter((t) => t.confederation === conf);
                const avgRank = confTeams.length > 0
                  ? (confTeams.reduce((sum, t) => sum + t.fifaRanking, 0) / confTeams.length).toFixed(1)
                  : "N/A";
                const bestRank = confTeams.length > 0 ? Math.min(...confTeams.map((t) => t.fifaRanking)) : null;

                return (
                  <div
                    key={conf}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{conf}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Équipes</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{confTeams.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Meilleur rang</span>
                        <span className="text-sm font-bold text-accent">#{bestRank || "—"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Rang moyen</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{avgRank}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top 10 */}
          <div className="mb-12">
            <h2 id="top-10" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Top 10 mondial FIFA
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {teamsRanked.slice(0, 10).map((team) => (
                <Link
                  key={team.id}
                  href={`/equipe/${team.slug}`}
                  className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group"
                >
                  <div className="flex-shrink-0">
                    <div className="text-3xl font-extrabold text-accent">#{team.fifaRanking}</div>
                  </div>
                  <Flag flag={team.flag} name={team.name} className="w-10 h-7 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                      {team.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {team.confederation} · Groupe {team.group}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { href: "/equipes", label: "Toutes les équipes", desc: "48 sélections qualifiées" },
              { href: "/groupes", label: "Composition des groupes", desc: "12 groupes de 4 équipes" },
              { href: "/statistiques", label: "Statistiques CDM", desc: "Records et analyses" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col gap-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group text-center"
              >
                <div className="font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                  {label}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <TableOfContents items={[
          { id: "introduction", label: "Introduction", level: 2 },
          { id: "classement-complet", label: "Classement complet", level: 2 },
          { id: "par-confederation", label: "Par confédération", level: 2 },
          { id: "top-10", label: "Top 10 mondial", level: 2 },
        ]} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks variant="compact" title="Pages liées" links={[
          { href: "/equipes", title: "48 équipes qualifiées", description: "Fiches complètes des équipes de la CDM 2026", icon: "🏟️" },
          { href: "/groupes", title: "Les 12 groupes", description: "Composition et analyse de chaque groupe", icon: "📋" },
          { href: "/pronostic-vainqueur", title: "Pronostic vainqueur", description: "Qui va gagner la CDM 2026 ?", icon: "🥇" },
          { href: "/statistiques", title: "Statistiques", description: "Stats et chiffres clés du tournoi", icon: "📊" },
          { href: "/simulateur", title: "Simulateur", description: "Simulez le parcours de votre équipe", icon: "🎮" },
        ]} />
      </div>

      <FAQSection title="Questions sur le classement FIFA" items={faqItems} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Classement FIFA 2026 - Ranking des 48 équipes qualifiées",
            description: "Classement FIFA complet des 48 équipes qualifiées pour la Coupe du Monde 2026.",
            url: "https://cdm2026.fr/classement-fifa",
            mainEntity: {
              "@type": "ItemList",
              name: "Classement FIFA des équipes qualifiées CDM 2026",
              numberOfItems: teamsRanked.length,
              itemListElement: teamsRanked.slice(0, 20).map((team, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: `${team.name} - #${team.fifaRanking} FIFA`,
              })),
            },
          }),
        }}
      />
    </>
  );
}
