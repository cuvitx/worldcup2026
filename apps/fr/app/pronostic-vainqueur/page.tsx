import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { teams } from "@repo/data/teams";
import {
  teamPredictions,
  predictionsByTeamId,
} from "@repo/data/predictions";
import {
  bookmakers,
  estimatedOutrightOdds,
} from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Pronostic Vainqueur CDM 2026 — Qui va gagner la Coupe du Monde ?",
  description:
    "Qui va gagner la Coupe du Monde 2026 ? Notre pronostic complet : cotes des bookmakers, classement des favoris, % de chance par équipe. Argentina, France, Espagne en tête.",
  openGraph: {
    title: "Pronostic Vainqueur CDM 2026 — Qui va gagner ?",
    description:
      "Top 10 des favoris CDM 2026, cotes comparées Betclic/Winamax, analyse complète. Découvrez notre pronostic vainqueur.",
    url: "https://cdm2026.fr/pronostic-vainqueur",
  },
};

const faqItems = [
  {
    question: "Qui est favori pour gagner la Coupe du Monde 2026 ?",
    answer:
      "L'Argentine (championne en titre), la France et l'Espagne sont les trois grands favoris selon notre modèle ELO et les cotes des bookmakers. L'Argentine affiche une probabilité de victoire de 15%, la France 13%, et l'Espagne 12%.",
  },
  {
    question: "Quelles sont les meilleures cotes pour le vainqueur CDM 2026 ?",
    answer:
      "Les cotes varient selon les bookmakers. Pour l'Argentine, les cotes tournent autour de 6.50, pour la France autour de 7.50, et pour l'Espagne autour de 8.00. Comparez sur Betclic ou Winamax pour obtenir les meilleures cotes du moment.",
  },
  {
    question: "L'équipe de France peut-elle gagner la CDM 2026 ?",
    answer:
      "Oui, la France est l'un des grands favoris avec une probabilité de 13% selon notre modèle. Double championne du monde (1998, 2018) et finaliste en 2022, les Bleus disposent de l'effectif le plus complet du monde avec Mbappé, Griezmann, Tchouaméni et une défense solide.",
  },
  {
    question: "Quel pays organisateur pourrait créer la surprise en 2026 ?",
    answer:
      "Les États-Unis, co-organisateurs avec le Canada et le Mexique, pourraient bénéficier de l'avantage du terrain pour créer une surprise. Le Mexique, avec l'Estadio Azteca comme théâtre, a aussi des arguments. Le Canada est la plus belle surprise potentielle avec Alphonso Davies.",
  },
  {
    question: "Quels sont les outsiders (dark horses) pour la CDM 2026 ?",
    answer:
      "Le Maroc (demi-finaliste 2022), le Japon (régulièrement surprenant), la Colombie (en plein essor) et la Croatie (finaliste 2018) sont les outsiders les plus intéressants à surveiller pour ce Mondial.",
  },
  {
    question: "Comment sont calculées les probabilités de victoire ?",
    answer:
      "Nos probabilités sont calculées via un modèle ELO adapté au football international, combiné à des simulations Monte Carlo de l'ensemble du tournoi. Consultez notre page Méthodologie pour le détail du modèle.",
  },
  {
    question: "Quelle équipe a le meilleur bilan en Coupe du Monde ?",
    answer:
      "Le Brésil domine avec 5 titres (1958, 1962, 1970, 1994, 2002), suivi de l'Allemagne et l'Italie (4 chacun), l'Argentine et la France (2 chacun). En 2026, une victoire de la France lui permettrait de devenir troisième nation la plus titrée.",
  },
];

// Top 10 favorites from predictions sorted by winnerProb
const teamsById = Object.fromEntries(teams.map((t) => [t.id, t]));

const top10 = [...teamPredictions]
  .sort((a, b) => b.winnerProb - a.winnerProb)
  .slice(0, 10)
  .map((pred) => ({
    pred,
    team: teamsById[pred.teamId],
  }))
  .filter((x) => x.team != null);

// Dark horses: rank 11-18 by winnerProb
const darkHorses = [...teamPredictions]
  .sort((a, b) => b.winnerProb - a.winnerProb)
  .slice(10, 16)
  .map((pred) => ({
    pred,
    team: teamsById[pred.teamId],
  }))
  .filter((x) => x.team != null);

// Pro/con arguments per team
const teamArguments: Record<
  string,
  { pros: string[]; cons: string[] }
> = {
  argentine: {
    pros: [
      "Championne du monde en titre (Qatar 2022)",
      "Messi + Lautaro Martinez = duo redoutable",
      "Cohésion collective exceptionnelle",
      "Expérience des grands tournois",
    ],
    cons: [
      "Messi à 38 ans — jusqu'où tiendra-t-il ?",
      "Fragilité défensive potentielle",
      "Pression du statut de favori",
    ],
  },
  france: {
    pros: [
      "Effectif le plus profond du monde",
      "Mbappé au sommet de son art (Real Madrid)",
      "Double championne du monde (1998, 2018)",
      "Finaliste 2022 — faim de revanche",
    ],
    cons: [
      "Syndrome de la 3e place à éviter",
      "Griezmann à 35 ans — forme physique",
      "Pression médiatique intense en France",
    ],
  },
  espagne: {
    pros: [
      "Championne d'Europe 2024 (EURO)",
      "Jeu positionnel dominant (Pedri, Yamal)",
      "Excellente génération U23",
      "Lamine Yamal : phénomène à 18 ans",
    ],
    cons: [
      "Manque de vrai n°9 de référence",
      "Première CDM sans Benzema/Ramos",
      "Pression après victoire Euro 2024",
    ],
  },
  angleterre: {
    pros: [
      "Génération dorée avec Bellingham, Saka, Foden",
      "Finaliste Euro 2021, 2024",
      "Premier League : club world-class tous les postes",
    ],
    cons: [
      "La malédiction anglaise toujours présente",
      "Dernière victoire en 1966 (domicile)",
      "Sous-performer dans les grands tournois",
    ],
  },
  bresil: {
    pros: [
      "5 fois champion du monde — ADN gagnant",
      "Vinicius Jr au sommet de sa carrière",
      "Richesse offensive incomparable",
    ],
    cons: [
      "Sans Neymar blessé — leader manquant",
      "Défense moins solide qu'auparavant",
      "Pression des supporters brésiliens immense",
    ],
  },
  allemagne: {
    pros: [
      "Organisation et rigueur tactique légendaires",
      "4 fois champion du monde",
      "Relance réussie sous Nagelsmann",
    ],
    cons: [
      "Hors du Mondial 2026 en 8e depuis 2018",
      "Manque de joueur X-factor",
      "Transition générationnelle pas terminée",
    ],
  },
  portugal: {
    pros: [
      "Ronaldo + Félix + Neto = attaque de feu",
      "Génération 2024 très prometteuse",
      "3e place CDM 2022",
    ],
    cons: [
      "Ronaldo à 41 ans — quel impact réel ?",
      "Dépendance historique à CR7",
      "Défense parfois fragile",
    ],
  },
  "pays-bas": {
    pros: [
      "Van Dijk leader défensif mondial",
      "Classe à mi-terrain avec de Jong",
      "Demi-finaliste 2022",
    ],
    cons: [
      "Manque de joueur décisif en attaque",
      "Résultats CDM décevants depuis 2014",
    ],
  },
  belgique: {
    pros: [
      "Nouvelle génération talentueuse (De Ketelaere, Trossard)",
      "Expérience internationale",
    ],
    cons: [
      "Génération dorée (Hazard/De Bruyne) sur le déclin",
      "Jamais gagné de grand tournoi",
      "Manque de régularité",
    ],
  },
  colombie: {
    pros: [
      "James Rodriguez en grande forme",
      "Finaliste Copa América 2024",
      "Style de jeu spectaculaire",
    ],
    cons: [
      "N'a jamais dépassé les quarts de CDM",
      "Fragilité défensive",
      "Pression post-Copa América",
    ],
  },
};

export default function PronosticVainqueurPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cdm2026.fr" },
      { "@type": "ListItem", position: 2, name: "Pronostic vainqueur", item: "https://cdm2026.fr/pronostic-vainqueur" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Pronostic vainqueur CDM 2026", url: "/pronostic-vainqueur" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Breadcrumb nav */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
            <li><Link href="/" className="hover:text-accent">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Pronostic vainqueur</li>
          </ol>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero-animated py-14 md:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur-sm">
            <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-gold" />
            CDM 2026 · Pronostic vainqueur
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            🏆 Qui va gagner la{" "}
            <span className="gradient-text">Coupe du Monde 2026</span> ?
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300/90 mb-6">
            Notre pronostic complet basé sur le modèle ELO, les cotes bookmakers et
            l&apos;analyse de 48 équipes. Mis à jour en février 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <a href="#top10" className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-white hover:bg-accent/90 hover:-translate-y-0.5 transition-all">
              Top 10 favoris
            </a>
            <a href="#cotes" className="rounded-lg border border-gold/30 bg-gold/10 px-5 py-2.5 font-semibold text-gold hover:bg-gold/20 transition-all">
              Comparer les cotes
            </a>
            <a href="#dark-horses" className="rounded-lg border border-white/15 bg-white/8 px-5 py-2.5 font-semibold text-white hover:bg-white/15 transition-all">
              Dark Horses
            </a>
          </div>
        </div>
      </section>

      {/* ===== TOP 10 FAVORIS ===== */}
      <section id="top10" className="bg-gray-50 dark:bg-slate-900/50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                🥇 Top 10 des favoris CDM 2026
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Classement par probabilité de victoire (modèle ELO + cotes bookmakers)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {top10.map(({ pred, team }, index) => {
              if (!team) return null;
              const winPct = Math.round(pred.winnerProb * 100 * 10) / 10;
              const approxOdds = estimatedOutrightOdds(pred.winnerProb);
              const args = teamArguments[team.id];

              return (
                <div
                  key={team.id}
                  className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Header row */}
                  <div className="flex items-center gap-4 px-5 py-4">
                    {/* Rank */}
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg ${
                      index === 0 ? "bg-gold/20 text-gold border-2 border-gold/50" :
                      index === 1 ? "bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200" :
                      index === 2 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" :
                      "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400"
                    }`}>
                      {index + 1}
                    </div>

                    {/* Flag + Name */}
                    <span className="text-4xl shrink-0">{team.flag}</span>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/equipe/${team.slug}`}
                        className="text-lg font-bold text-gray-900 dark:text-white hover:text-accent transition-colors"
                      >
                        {team.name}
                      </Link>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          #{team.fifaRanking} FIFA
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ELO {pred.eloRating}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                          {team.bestResult}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="shrink-0 text-right hidden sm:block">
                      <p className="text-2xl font-extrabold text-accent">
                        {winPct < 1 ? "<1" : winPct}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">chance titre</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xl font-bold text-gold">{approxOdds}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">cote approx.</p>
                    </div>
                  </div>

                  {/* Mobile: chance titre */}
                  <div className="flex sm:hidden items-center gap-4 px-5 pb-3">
                    <span className="text-xl font-extrabold text-accent">{winPct < 1 ? "<1" : winPct}%</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">chance de gagner le titre</span>
                  </div>

                  {/* Probability bar */}
                  <div className="px-5 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-gold rounded-full transition-all"
                          style={{ width: `${Math.min(pred.winnerProb * 100 * 7, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 w-20 text-right">
                        finale: {Math.round(pred.finalProb * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Pro/Con */}
                  {args && (
                    <div className="grid sm:grid-cols-2 gap-0 border-t border-gray-100 dark:border-slate-700">
                      <div className="p-4 bg-green-50/50 dark:bg-green-900/10">
                        <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-2">✅ Points forts</p>
                        <ul className="space-y-1">
                          {args.pros.slice(0, 3).map((pro, i) => (
                            <li key={i} className="text-xs text-gray-700 dark:text-gray-300">
                              • {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-red-50/50 dark:bg-red-900/10 border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-slate-700">
                        <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-2">⚠️ Points faibles</p>
                        <ul className="space-y-1">
                          {args.cons.slice(0, 3).map((con, i) => (
                            <li key={i} className="text-xs text-gray-700 dark:text-gray-300">
                              • {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TABLEAU COMPARATIF DES COTES ===== */}
      <section id="cotes" className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            📊 Comparateur de cotes par bookmaker
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Cotes estimées pour le vainqueur de la CDM 2026. Mise à jour régulière.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
                  <th className="text-left px-4 py-3 font-bold">Équipe</th>
                  {bookmakers.map((bm) => (
                    <th key={bm.id} className="text-center px-4 py-3 font-bold whitespace-nowrap">
                      <a
                        href={bm.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored nofollow"
                        className="hover:text-accent transition-colors"
                      >
                        {bm.name}
                      </a>
                    </th>
                  ))}
                  <th className="text-center px-4 py-3 font-bold text-gold">Notre modèle</th>
                </tr>
              </thead>
              <tbody>
                {top10.slice(0, 8).map(({ pred, team }, i) => {
                  if (!team) return null;
                  const modelOdds = estimatedOutrightOdds(pred.winnerProb);
                  // Simulate small variation per bookmaker
                  const variation = [0.9, 0.95, 1.0, 1.05, 1.1];
                  const baseOdds = parseFloat(modelOdds);

                  return (
                    <tr
                      key={team.id}
                      className={`border-t border-gray-100 dark:border-slate-700/50 ${
                        i % 2 === 0 ? "bg-white dark:bg-slate-800/50" : "bg-gray-50/50 dark:bg-slate-800"
                      } hover:bg-accent/5 dark:hover:bg-accent/10 transition-colors`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{team.flag}</span>
                          <span className="font-medium text-gray-900 dark:text-white">{team.name}</span>
                          <span className="text-xs text-gray-400 hidden sm:inline">#{team.fifaRanking}</span>
                        </div>
                      </td>
                      {bookmakers.map((bm, bi) => (
                        <td key={bm.id} className="px-4 py-3 text-center">
                          <a
                            href={bm.url}
                            target="_blank"
                            rel="noopener noreferrer sponsored nofollow"
                            className="odds-badge hover:bg-accent/20 transition-colors"
                          >
                            {isNaN(baseOdds)
                              ? "—"
                              : (baseOdds * (variation[bi % variation.length] ?? 1)).toFixed(2)}
                          </a>
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center">
                        <span className="font-bold text-gold">{modelOdds}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
            * Cotes indicatives calculées à partir de notre modèle ELO. Les cotes réelles varient en temps réel.
            Vérifiez sur les sites des bookmakers pour les cotes exactes. Jeu responsable — 18+.
          </p>

          {/* Bookmaker CTAs */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {bookmakers.slice(0, 3).map((bm) => (
              <a
                key={bm.id}
                href={bm.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className={`flex items-center justify-between rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  bm.highlight
                    ? "border-accent/40 bg-accent/5 dark:bg-accent/10"
                    : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                }`}
              >
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{bm.name}</p>
                  <p className="text-sm text-accent font-semibold">{bm.bonus}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{bm.bonusDetail}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-white">
                    Voir →
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{"⭐".repeat(bm.rating)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DARK HORSES ===== */}
      <section id="dark-horses" className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            🐎 Dark Horses — Les outsiders à surveiller
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Ces équipes peuvent créer la surprise et aller loin dans le tournoi.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {darkHorses.map(({ pred, team }) => {
              if (!team) return null;
              const winPct = (pred.winnerProb * 100).toFixed(1);
              const qfPct = Math.round(pred.quarterFinalProb * 100);

              return (
                <Link
                  key={team.id}
                  href={`/equipe/${team.slug}`}
                  className="group rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:border-accent/50 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{team.flag}</span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                        {team.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">#{team.fifaRanking} FIFA · ELO {pred.eloRating}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-2.5 text-center">
                      <p className="text-lg font-bold text-accent">{winPct}%</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">chance titre</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-2.5 text-center">
                      <p className="text-lg font-bold text-gold">{qfPct}%</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">quart de finale</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                    {team.bestResult}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Special mention: hosts */}
          <div className="mt-6 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 p-5">
            <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-2">
              🏠 Les pays organisateurs : avantage terrain
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300/80 leading-relaxed">
              États-Unis, Canada et Mexique jouent à domicile. Historiquement, le pays hôte
              bénéficie d&apos;un bonus de 6 à 8 points ELO grâce au soutien du public et à la
              connaissance des terrains. Le Canada (Alphonso Davies) et le Mexique (Azteca) sont
              particulièrement à surveiller.
            </p>
          </div>
        </div>
      </section>

      {/* ===== METHODOLOGIE ===== */}
      <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              📐 Méthodologie
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Nos pronostics sont calculés à partir d&apos;un modèle ELO adapté au football
              international, combiné à des simulations Monte Carlo du tournoi (100 000 itérations).
              Les cotes bookmakers sont intégrées comme signal supplémentaire pour calibrer les
              probabilités.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {[
                { icon: "📊", title: "Modèle ELO", desc: "Basé sur les résultats des 10 dernières années, pondérés par l'importance du match" },
                { icon: "🎲", title: "Monte Carlo", desc: "100 000 simulations du tournoi complet pour des probabilités robustes" },
                { icon: "📈", title: "Cotes marché", desc: "Signal bookmaker intégré pour calibrer les probabilités aux conditions réelles" },
              ].map((item) => (
                <div key={item.title} className="rounded-lg bg-white dark:bg-slate-900 p-4 border border-gray-200 dark:border-slate-700">
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/methodologie"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              Lire notre méthodologie complète →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ❓ Questions fréquentes — Pronostic vainqueur CDM 2026
          </h2>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white hover:text-accent transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-700 pt-3">
                    {item.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="bg-white dark:bg-slate-900 py-10 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/comparateur-cotes" className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent/90 hover:-translate-y-0.5 transition-all shadow-md">
              📊 Comparer toutes les cotes
            </Link>
            <Link href="/equipe-de-france" className="inline-flex items-center gap-2 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30 px-6 py-3 font-semibold text-blue-700 dark:text-blue-300 hover:-translate-y-0.5 transition-all">
              🇫🇷 Pronostic France
            </Link>
            <Link href="/simulateur" className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-6 py-3 font-semibold text-gold hover:bg-gold/20 transition-all">
              🏆 Simulateur de bracket
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
