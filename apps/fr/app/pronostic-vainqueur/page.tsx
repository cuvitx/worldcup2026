import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterCTA } from "../components/NewsletterCTA";
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
import {
  top10Favorites,
  favoritesByTeamId,
} from "@repo/data/predictions-2026";

export const metadata: Metadata = {
  title: "Pronostic Vainqueur CDM 2026 — Qui va gagner la Coupe du Monde ?",
  description:
    "Pronostic vainqueur CDM 2026 : Argentine 15%, France 13%, Espagne 12%. Comparez les cotes, découvrez nos favoris et osez parier.",
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
  {
    question: "L'avantage à domicile joue-t-il un rôle en Coupe du Monde ?",
    answer:
      "Historiquement, l'avantage du pays hôte est réel mais pas déterminant : sur 22 éditions, seules 6 nations hôtes ont remporté le titre (Uruguay 1930, Italie 1934, Angleterre 1966, Allemagne 1974, Argentine 1978, France 1998), soit un taux de 27%. En 2026, les États-Unis, le Canada et le Mexique bénéficieront de cet avantage, mais les grands favoris (Argentine, France, Espagne) restent favoris malgré tout.",
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

// ============================================================================
// Données enrichies pour les sections additionnelles
// ============================================================================

// Couleurs par confédération pour le graphique
const CONFEDERATION_COLORS: Record<string, { bg: string; border: string; label: string }> = {
  UEFA: { bg: "bg-blue-500", border: "border-blue-400", label: "UEFA (Europe)" },
  CONMEBOL: { bg: "bg-green-500", border: "border-green-400", label: "CONMEBOL (Amérique du Sud)" },
  CONCACAF: { bg: "bg-amber-500", border: "border-amber-400", label: "CONCACAF (Amérique du Nord)" },
  CAF: { bg: "bg-orange-500", border: "border-orange-400", label: "CAF (Afrique)" },
  AFC: { bg: "bg-purple-500", border: "border-purple-400", label: "AFC (Asie)" },
  OFC: { bg: "bg-teal-500", border: "border-teal-400", label: "OFC (Océanie)" },
};

// Analyse narrative pour le top 5 "Pourquoi ils peuvent gagner"
const whyTheyCanWin: Record<string, {
  narrative: string;
  keyPlayer: string;
  keyPlayerDesc: string;
  tacticalEdge: string;
  xFactor: string;
  betOdds: string;
}> = {
  argentine: {
    narrative: "L'Argentine aborde ce Mondial avec la sérénité du champion en titre. Malgré l'approche de la fin de carrière de Messi (38 ans en 2026), les Albicelestes ont démontré au Qatar qu'ils savent gagner collectivement. Lautaro Martinez, Di Maria et les nouvelles générations portent désormais ce projet. L'équipe de Scaloni a remporté 3 titres consécutifs (Copa América 2021, 2024, CDM 2022) — un momentum unique dans l'histoire du football.",
    keyPlayer: "Lautaro Martinez",
    keyPlayerDesc: "Buteur de l'Inter Milan, véritable machine à buts. Avec ou sans Messi, il peut faire la différence.",
    tacticalEdge: "Système 4-4-2 diamant ultra-rodé. L'Argentine est la nation la plus expérimentée en phases finales.",
    xFactor: "L'ADN gagnant post-Qatar 2022. Cette équipe sait comment soulever un trophée mondial.",
    betOdds: "5.50",
  },
  france: {
    narrative: "La France possède probablement l'effectif le plus profond de toutes les 48 nations. Champions du monde 1998 et 2018, finalistes en 2022 après avoir remonté un déficit improbable en finale contre l'Argentine, les Bleus ont faim de revanche. Mbappé (27 ans) est au sommet absolu de sa carrière au Real Madrid. La machine est prête, le talent est là — il ne manque que la réussite dans les tirs au but.",
    keyPlayer: "Kylian Mbappé",
    keyPlayerDesc: "Meilleur joueur du monde, champion de Liga. À 27 ans en 2026, il sera dans sa fenêtre optimale pour décrocher un titre mondial.",
    tacticalEdge: "Profondeur de banc incomparable : même le 12e joueur français serait titulaire dans la plupart des autres sélections.",
    xFactor: "La revanche de 2022. Perdre aux tirs au but en finale crée une motivation qui dure des années.",
    betOdds: "6.00",
  },
  bresil: {
    narrative: "5 étoiles, mais pas de titre depuis 2002 — la seleção souffre depuis 24 ans. Vinicius Jr. est l'un des meilleurs joueurs de la planète, mais l'absence de Neymar, blessé longue durée, est une plaie ouverte. Le Brésil a le talent offensif pour gagner, mais manque encore de l'équilibre défensif qui caractérise les grandes équipes championnes. Rodrigo, Endrick, Savinho : la nouvelle génération est prometteuse et affamée.",
    keyPlayer: "Vinicius Jr.",
    keyPlayerDesc: "Deux fois finaliste de Ligue des Champions, vainqueur de la Coupe du Monde des clubs. L'ailier du Real Madrid peut gagner un match à lui seul.",
    tacticalEdge: "Le Brésil attaque en permanence avec 4-5 joueurs offensifs de classe mondiale. Difficile de défendre une telle densité.",
    xFactor: "L'humiliation du 7-1 face à l'Allemagne en 2014 est encore dans toutes les mémoires. La pression nationale est le moteur de ce projet.",
    betOdds: "6.50",
  },
  angleterre: {
    narrative: "It's coming home ? La génération Bellingham-Saka-Foden est peut-être la plus talentueuse depuis 1966. Finalistes de l'Euro 2021 et 2024, les Three Lions ont le mental des grandes occasions mais semblent bloqués dans les demi-finales depuis des années. En 2026, avec une expérience supplémentaire, le groupe de Southgate (ou son successeur) pourrait franchir le cap décisif. La Premier League offre aux joueurs anglais une intensité de jeu qui les prépare parfaitement aux tournois.",
    keyPlayer: "Jude Bellingham",
    keyPlayerDesc: "Milieu offensif du Real Madrid, Ballon d'Or potentiel. À 22 ans en 2026, il sera au sommet absolu de sa puissance physique.",
    tacticalEdge: "Bloc défensif solide + transitions rapides avec des ailiers de vitesse. L'Angleterre ne donne rien.",
    xFactor: "Briser 60 ans de disette serait l'événement footballistique du siècle en Angleterre. La motivation est absolue.",
    betOdds: "7.00",
  },
  allemagne: {
    narrative: "La Mannschaft est en reconstruction depuis l'humiliation du premier tour en 2018 et 2022. Sous Nagelsmann, le projet de relance est encourageant : nouveau style de jeu basculant entre pressing intensif et possession. L'Allemagne a retrouvé du mordant lors de l'Euro 2024 à domicile. Florian Wirtz (Bayer Leverkusen) est l'élément créatif qui manquait à cette équipe. 4 titres mondiaux en franchise — l'Allemagne a l'ADN pour un 5e.",
    keyPlayer: "Florian Wirtz",
    keyPlayerDesc: "Le meilleur numéro 10 de sa génération en Bundesliga. Technique, créatif, décisif. Le joueur qui redonne de la magie à l'Allemagne.",
    tacticalEdge: "Organisation collective sans failles, discipline tactique légendaire. L'Allemagne ne perd jamais par négligence.",
    xFactor: "L'effet rebond après deux premiers tours ratés. Les Allemands ont une culture de la résilience unique dans le football mondial.",
    betOdds: "8.00",
  },
};

// Historique CDM à domicile (stats réelles)
const cdmHomeStats = [
  { year: 1930, host: "Uruguay", winner: "Uruguay", hostWon: true, hostFlag: "🇺🇾", note: "Première CDM" },
  { year: 1934, host: "Italie", winner: "Italie", hostWon: true, hostFlag: "🇮🇹", note: "Organisation fasciste" },
  { year: 1938, host: "France", winner: "Italie", hostWon: false, hostFlag: "🇫🇷", note: "Italie bis répetita" },
  { year: 1950, host: "Brésil", winner: "Uruguay", hostWon: false, hostFlag: "🇧🇷", note: "Le Maracanazo, drame brésilien" },
  { year: 1954, host: "Suisse", winner: "Allemagne", hostWon: false, hostFlag: "🇨🇭", note: "Miracle de Berne" },
  { year: 1958, host: "Suède", winner: "Brésil", hostWon: false, hostFlag: "🇸🇪", note: "1er titre Brésil, 17 ans Pelé" },
  { year: 1962, host: "Chili", winner: "Brésil", hostWon: false, hostFlag: "🇨🇱", note: "Brésil confirme" },
  { year: 1966, host: "Angleterre", winner: "Angleterre", hostWon: true, hostFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", note: "Seul titre anglais" },
  { year: 1970, host: "Mexique", winner: "Brésil", hostWon: false, hostFlag: "🇲🇽", note: "Brésil légendaire de Pelé" },
  { year: 1974, host: "Allemagne", winner: "Allemagne", hostWon: true, hostFlag: "🇩🇪", note: "Beck­enbauer capitaine" },
  { year: 1978, host: "Argentine", winner: "Argentine", hostWon: true, hostFlag: "🇦🇷", note: "1er titre argentin" },
  { year: 1982, host: "Espagne", winner: "Italie", hostWon: false, hostFlag: "🇪🇸", note: "Rossi en feu" },
  { year: 1986, host: "Mexique", winner: "Argentine", hostWon: false, hostFlag: "🇲🇽", note: "La main de Dieu" },
  { year: 1990, host: "Italie", winner: "Allemagne", hostWon: false, hostFlag: "🇮🇹", note: "Nuit de Rome" },
  { year: 1994, host: "États-Unis", winner: "Brésil", hostWon: false, hostFlag: "🇺🇸", note: "Brésil aux pénaltys" },
  { year: 1998, host: "France", winner: "France", hostWon: true, hostFlag: "🇫🇷", note: "Zidane x2, fête nationale" },
  { year: 2002, host: "Japon/Corée", winner: "Brésil", hostWon: false, hostFlag: "🇯🇵🇰🇷", note: "Ronaldo ressuscite" },
  { year: 2006, host: "Allemagne", winner: "Italie", hostWon: false, hostFlag: "🇩🇪", note: "Zidane coup de boule" },
  { year: 2010, host: "Afrique du Sud", winner: "Espagne", hostWon: false, hostFlag: "🇿🇦", note: "Tiki-taka espagnol" },
  { year: 2014, host: "Brésil", winner: "Allemagne", hostWon: false, hostFlag: "🇧🇷", note: "Le 7-1, Mineirazo" },
  { year: 2018, host: "Russie", winner: "France", hostWon: false, hostFlag: "🇷🇺", note: "Mbappé explose au monde" },
  { year: 2022, host: "Qatar", winner: "Argentine", hostWon: false, hostFlag: "🇶🇦", note: "Messi sacré, finale épique" },
];

const homeWins = cdmHomeStats.filter((s) => s.hostWon).length;
const totalEditions = cdmHomeStats.length;
const homeWinPct = Math.round((homeWins / totalEditions) * 100);

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
            🏆 Argentine, France, Espagne :{" "}
            <span className="gradient-text">qui décroche le titre ?</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300/90 mb-6">
            Modèle ELO + cotes bookmakers + 48 analyses d&apos;équipes.
            Le classement qui dérange — mis à jour en temps réel.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <a href="#top10" className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-white hover:bg-accent/90 hover:-translate-y-0.5 transition-all">
              🔥 Top 10 des favoris
            </a>
            <a href="#analyse-top5" className="rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 font-semibold text-accent hover:bg-accent/20 transition-all">
              💡 Pourquoi ils peuvent gagner
            </a>
            <a href="#cotes" className="rounded-lg border border-gold/30 bg-gold/10 px-5 py-2.5 font-semibold text-gold hover:bg-gold/20 transition-all">
              💰 Meilleures cotes
            </a>
            <a href="#historique" className="rounded-lg border border-white/15 bg-white/8 px-5 py-2.5 font-semibold text-white hover:bg-white/15 transition-all">
              🏟️ Avantage domicile
            </a>
            <a href="#dark-horses" className="rounded-lg border border-white/15 bg-white/8 px-5 py-2.5 font-semibold text-white hover:bg-white/15 transition-all">
              🐴 Les surprises possibles
            </a>
          </div>
        </div>
      </section>

      {/* ===== GRAPHIQUE VISUEL DES COTES PAR CONTINENT ===== */}
      <section id="graphique" className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                📊 Chances de titre par confédération
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Barres proportionnelles aux probabilités — colorées par confédération
              </p>
            </div>
          </div>

          {/* Légende confédérations */}
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.entries(CONFEDERATION_COLORS).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs">
                <span className={`inline-block w-3 h-3 rounded-sm ${val.bg}`} />
                <span className="text-gray-600 dark:text-gray-400">{val.label}</span>
              </div>
            ))}
          </div>

          {/* Barres horizontales */}
          <div className="space-y-2.5">
            {top10.map(({ pred, team }, index) => {
              if (!team) return null;
              const winPct = Math.round(pred.winnerProb * 100 * 10) / 10;
              const barWidth = Math.min(pred.winnerProb * 100 * 7, 100);
              const conf = CONFEDERATION_COLORS[team.confederation] ?? CONFEDERATION_COLORS["UEFA"]!;
              const approxOdds = estimatedOutrightOdds(pred.winnerProb);

              return (
                <div key={team.id} className="flex items-center gap-3">
                  {/* Rank */}
                  <span className="shrink-0 w-6 text-right text-xs font-bold text-gray-400 dark:text-gray-500">
                    {index + 1}
                  </span>
                  {/* Flag + name */}
                  <div className="flex items-center gap-2 w-36 shrink-0">
                    <span className="text-xl shrink-0">{team.flag}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {team.name}
                    </span>
                  </div>
                  {/* Bar */}
                  <div className="flex-1 h-7 bg-gray-100 dark:bg-slate-800 rounded-lg overflow-hidden relative">
                    <div
                      className={`h-full ${conf.bg} opacity-85 rounded-lg transition-all duration-700 flex items-center pl-3`}
                      style={{ width: `${barWidth}%` }}
                    >
                      <span className="text-[10px] font-bold text-white whitespace-nowrap">
                        {winPct < 1 ? "<1" : winPct}%
                      </span>
                    </div>
                  </div>
                  {/* Odds */}
                  <span className="shrink-0 w-14 text-right text-sm font-bold text-gold">
                    {approxOdds}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            * Largeur des barres proportionnelle à la probabilité de remporter le titre (modèle ELO). Les cotes sont indicatives.
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
              const fav = favoritesByTeamId[team.id];
              const approxOdds = fav ? fav.avgOdds.toFixed(2) : estimatedOutrightOdds(pred.winnerProb);
              const impliedPct = fav ? Math.round(fav.impliedProbability * 100 * 10) / 10 : null;
              const trendIcon = fav ? (fav.trend === "up" ? " ↑" : fav.trend === "down" ? " ↓" : "") : "";
              const trendColor = fav?.trend === "up" ? "text-green-500" : fav?.trend === "down" ? "text-red-400" : "";
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
                      <p className="text-xl font-bold text-gold">
                        {approxOdds}
                        {trendIcon && (
                          <span className={`text-sm ml-1 font-bold ${trendColor}`}>{trendIcon}</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {fav ? "cote moy. marché" : "cote approx."}
                      </p>
                    </div>
                  </div>

                  {/* Real bookmaker odds strip (if in top10Favorites) */}
                  {fav && (
                    <div className="flex items-center gap-2 px-5 pb-2 flex-wrap">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">Cotes réelles :</span>
                      <span className="inline-flex items-center gap-1 rounded bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 px-2 py-0.5 text-xs font-bold text-orange-600 dark:text-orange-400">
                        Winamax {fav.winamax.toFixed(2)}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/50 px-2 py-0.5 text-xs font-bold text-teal-600 dark:text-teal-400">
                        Bet365 {fav.bet365.toFixed(2)}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 px-2 py-0.5 text-xs font-bold text-green-600 dark:text-green-400">
                        DraftKings {fav.draftkings.toFixed(2)}
                      </span>
                      {impliedPct !== null && (
                        <span className="ml-auto inline-flex items-center gap-1 rounded bg-accent/10 border border-accent/20 px-2 py-0.5 text-xs font-bold text-accent">
                          Proba : {impliedPct}%
                        </span>
                      )}
                    </div>
                  )}

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

      {/* ===== POURQUOI ILS PEUVENT GAGNER — TOP 5 ===== */}
      <section id="analyse-top5" className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                🔍 Pourquoi ils peuvent gagner — Analyse top 5
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Décryptage en profondeur des 5 équipes les plus probables de soulever le trophée
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {top10.slice(0, 5).map(({ team, pred }, index) => {
              if (!team) return null;
              const analysis = whyTheyCanWin[team.id];
              if (!analysis) return null;
              const winPct = (pred.winnerProb * 100).toFixed(1);

              return (
                <div
                  key={team.id}
                  className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 border-b border-gray-100 dark:border-slate-700">
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg ${
                      index === 0 ? "bg-gold/20 text-gold border-2 border-gold/50" :
                      index === 1 ? "bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200" :
                      index === 2 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" :
                      "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400"
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-4xl">{team.flag}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                        {team.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <span className="text-sm text-accent font-bold">{winPct}% de chance de titre</span>
                        <span className="text-sm text-gold font-bold">Cote {analysis.betOdds}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{team.bestResult}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 grid md:grid-cols-3 gap-6">
                    {/* Narrative */}
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                        📝 Notre analyse
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {analysis.narrative}
                      </p>
                    </div>

                    {/* Key info */}
                    <div className="space-y-3">
                      <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">
                          ⭐ Joueur clé
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{analysis.keyPlayer}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{analysis.keyPlayerDesc}</p>
                      </div>
                      <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-purple-600 dark:text-purple-400 mb-1">
                          ⚙️ Avantage tactique
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{analysis.tacticalEdge}</p>
                      </div>
                      <div className="rounded-xl bg-gold/5 border border-gold/20 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-gold mb-1">
                          ✨ Facteur X
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{analysis.xFactor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HISTORIQUE CDM À DOMICILE ===== */}
      <section id="historique" className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <div className="section-header mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                🏠 Historique : qui a gagné à domicile ?
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Le pays hôte peut-il vraiment faire la différence ? Retour sur 22 éditions.
              </p>
            </div>
          </div>

          {/* Stats globales */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 text-center">
              <p className="text-4xl font-extrabold text-accent mb-1">{homeWins}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">pays hôtes vainqueurs</p>
              <p className="text-xs text-gray-400 mt-1">sur {totalEditions} éditions depuis 1930</p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 text-center">
              <p className="text-4xl font-extrabold text-gold mb-1">{homeWinPct}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">taux de victoire à domicile</p>
              <p className="text-xs text-gray-400 mt-1">Avantage terrain non négligeable</p>
            </div>
            <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 p-5 text-center">
              <p className="text-4xl font-extrabold text-amber-600 mb-1">3</p>
              <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">pays hôtes en 2026</p>
              <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">USA, Canada, Mexique — triple avantage terrain</p>
            </div>
          </div>

          {/* Pays hôtes vainqueurs */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              🏆 Les 6 champions du monde à domicile
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cdmHomeStats.filter((s) => s.hostWon).map((s) => (
                <div
                  key={s.year}
                  className="flex items-center gap-3 rounded-xl border border-gold/30 bg-gold/5 dark:bg-gold/10 p-4"
                >
                  <span className="text-3xl">{s.hostFlag}</span>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {s.host} {s.year}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.note}</p>
                  </div>
                  <span className="ml-auto text-gold font-extrabold text-lg">🏆</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline complète (compacte) */}
          <details className="group">
            <summary className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-accent hover:underline list-none mb-4">
              <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
              Voir l&apos;historique complet ({totalEditions} éditions)
            </summary>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
                    <th className="text-left px-3 py-2">Année</th>
                    <th className="text-left px-3 py-2">Hôte</th>
                    <th className="text-left px-3 py-2">Vainqueur</th>
                    <th className="text-left px-3 py-2 hidden sm:table-cell">Anecdote</th>
                    <th className="text-center px-3 py-2">🏠</th>
                  </tr>
                </thead>
                <tbody>
                  {cdmHomeStats.map((s, i) => (
                    <tr
                      key={s.year}
                      className={`border-t border-gray-100 dark:border-slate-700/50 ${
                        s.hostWon
                          ? "bg-gold/5 dark:bg-gold/10"
                          : i % 2 === 0 ? "bg-white dark:bg-slate-800/50" : "bg-gray-50/50 dark:bg-slate-800"
                      }`}
                    >
                      <td className="px-3 py-2 font-bold text-gray-900 dark:text-white">{s.year}</td>
                      <td className="px-3 py-2">
                        <span className="mr-1">{s.hostFlag}</span>
                        {s.host}
                      </td>
                      <td className={`px-3 py-2 font-semibold ${s.hostWon ? "text-gold" : "text-gray-600 dark:text-gray-300"}`}>
                        {s.winner} {s.hostWon ? "🏆" : ""}
                      </td>
                      <td className="px-3 py-2 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{s.note}</td>
                      <td className="px-3 py-2 text-center">
                        {s.hostWon ? <span className="text-green-500 font-bold">✓</span> : <span className="text-red-400">✗</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          {/* Impact pour 2026 */}
          <div className="mt-6 rounded-xl border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 p-5">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
              🔭 Implications pour 2026 : États-Unis, Canada, Mexique
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300/80 leading-relaxed mb-3">
              Pour la première fois de l&apos;histoire, <strong>3 pays partagent l&apos;organisation</strong>. L&apos;avantage terrain est donc dilué mais présent. Historiquement, le pays hôte bénéficie de <strong>+6 à +8 pts ELO</strong> grâce au soutien du public et à la connaissance des conditions locales.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { flag: "🇺🇸", name: "États-Unis", note: "Jouent devant 80 000 supporters à domicile. Objectif réaliste : quarts de finale.", chance: "4.2%" },
                { flag: "🇨🇦", name: "Canada", note: "Alphonso Davies au sommet. Première CDM — la ferveur peut créer des miracles.", chance: "1.8%" },
                { flag: "🇲🇽", name: "Mexique", note: "L'Azteca en altitude (2240m) — avantage physique considérable en phase de groupes.", chance: "2.1%" },
              ].map((host) => (
                <div key={host.name} className="rounded-lg bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{host.flag}</span>
                    <span className="font-bold text-sm text-gray-900 dark:text-white">{host.name}</span>
                    <span className="ml-auto text-xs font-bold text-accent">{host.chance}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{host.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SIMULATEUR BRACKET ===== */}
      <section id="simulateur-cta" className="bg-gradient-to-br from-[#1a1035] via-[#302b63] to-[#24243e] py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold mb-4">
            <span className="text-gold">🏆</span>
            Simulateur interactif
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Construisez votre propre bracket
          </h2>
          <p className="text-gray-300/80 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Notre simulateur de bracket vous permet de rejouer l&apos;intégralité de la CDM 2026 — 
            de la phase de groupes à la finale. Testez vos propres pronostics, créez des scénarios 
            alternatifs et partagez votre tableau avec vos amis.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/simulateur"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-amber-500 px-8 py-3.5 font-bold text-primary shadow-lg shadow-gold/30 hover:shadow-xl hover:-translate-y-1 transition-all text-base"
            >
              🎮 Lancer le simulateur bracket
            </Link>
            <Link
              href="/tableau"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 font-semibold text-white hover:bg-white/20 hover:-translate-y-0.5 transition-all text-base"
            >
              📋 Voir le tableau officiel
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-gray-500">
            Basé sur 100 000 simulations Monte Carlo · Mis à jour en temps réel
          </p>
        </div>
      </section>

      {/* ===== TABLEAU COMPARATIF DES COTES MULTI-BOOKMAKERS (données réelles) ===== */}
      <section id="cotes" className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            📊 Cotes vainqueur CDM 2026 — Multi-bookmakers
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Cotes décimales réelles collectées auprès de Winamax, Bet365 et DraftKings. Mises à jour : <span className="font-semibold text-gray-700 dark:text-gray-200">février 2026</span>.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
            ↑ Tendance haussière vs. cotes d&apos;ouverture (déc. 2025) · ↓ Tendance baissière · → Stable
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
                  <th className="text-left px-4 py-3 font-bold min-w-[160px]">Équipe</th>
                  <th className="text-center px-4 py-3 font-bold whitespace-nowrap text-[#FF6600]">Winamax</th>
                  <th className="text-center px-4 py-3 font-bold whitespace-nowrap text-[#00A0A0]">Bet365</th>
                  <th className="text-center px-4 py-3 font-bold whitespace-nowrap text-[#53B648]">DraftKings</th>
                  <th className="text-center px-4 py-3 font-bold text-gold whitespace-nowrap">Moy. marché</th>
                  <th className="text-center px-4 py-3 font-bold text-accent whitespace-nowrap">Proba.</th>
                  <th className="text-center px-4 py-3 font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">Tendance</th>
                </tr>
              </thead>
              <tbody>
                {top10Favorites.map((fav, i) => {
                  const team = teams.find((t) => t.id === fav.teamId);
                  if (!team) return null;
                  const trendIcon = fav.trend === "up" ? "↑" : fav.trend === "down" ? "↓" : "→";
                  const trendColor =
                    fav.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : fav.trend === "down"
                      ? "text-red-500 dark:text-red-400"
                      : "text-gray-400 dark:text-gray-500";
                  const impliedPct = Math.round(fav.impliedProbability * 100 * 10) / 10;
                  // best odds among bookmakers
                  const bestOdds = Math.max(fav.winamax, fav.bet365, fav.draftkings);

                  return (
                    <tr
                      key={fav.teamId}
                      className={`border-t border-gray-100 dark:border-slate-700/50 ${
                        i % 2 === 0 ? "bg-white dark:bg-slate-800/50" : "bg-gray-50/50 dark:bg-slate-800"
                      } hover:bg-accent/5 dark:hover:bg-accent/10 transition-colors`}
                    >
                      {/* Team */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            i === 0 ? "bg-gold/20 text-gold" :
                            i === 1 ? "bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200" :
                            i === 2 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600" :
                            "bg-gray-100 dark:bg-slate-700 text-gray-500"
                          }`}>{i + 1}</span>
                          <span className="text-xl">{team.flag}</span>
                          <Link href={`/equipe/${team.slug}`} className="font-medium text-gray-900 dark:text-white hover:text-accent transition-colors">
                            {team.name}
                          </Link>
                        </div>
                      </td>
                      {/* Winamax */}
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded font-bold text-sm ${fav.winamax === bestOdds ? "bg-gold/10 text-gold border border-gold/30" : "text-gray-700 dark:text-gray-200"}`}>
                          {fav.winamax.toFixed(2)}
                        </span>
                      </td>
                      {/* Bet365 */}
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded font-bold text-sm ${fav.bet365 === bestOdds ? "bg-gold/10 text-gold border border-gold/30" : "text-gray-700 dark:text-gray-200"}`}>
                          {fav.bet365.toFixed(2)}
                        </span>
                      </td>
                      {/* DraftKings */}
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded font-bold text-sm ${fav.draftkings === bestOdds ? "bg-gold/10 text-gold border border-gold/30" : "text-gray-700 dark:text-gray-200"}`}>
                          {fav.draftkings.toFixed(2)}
                        </span>
                      </td>
                      {/* Moyenne */}
                      <td className="px-4 py-3 text-center">
                        <span className="font-bold text-gold">{fav.avgOdds.toFixed(2)}</span>
                      </td>
                      {/* Proba implicite */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-accent text-sm">{impliedPct}%</span>
                          <div className="w-16 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-accent to-gold rounded-full"
                              style={{ width: `${Math.min(impliedPct * 5, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      {/* Tendance */}
                      <td className={`px-4 py-3 text-center text-lg font-bold ${trendColor}`}>
                        {trendIcon}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Légende + note */}
          <div className="mt-4 flex flex-wrap gap-4 items-start justify-between">
            <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span>🟡 = Meilleure cote du moment</span>
              <span className="text-green-600 dark:text-green-400 font-semibold">↑ Tendance haussière</span>
              <span className="text-red-500 dark:text-red-400 font-semibold">↓ Tendance baissière</span>
              <span>→ Stable</span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs text-right">
              Sources : Winamax (football.fr), Bet365 (covers.com), DraftKings (nbcsports.com). Cotes décimales. Jeu responsable — 18+.
            </p>
          </div>

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

      {/* ===== NEWSLETTER CTA ===== */}
      <NewsletterCTA />

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
