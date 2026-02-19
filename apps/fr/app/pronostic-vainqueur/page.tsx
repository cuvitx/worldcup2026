import { Card } from "@repo/ui/card";
import { SectionHeading } from "@repo/ui/section-heading";
import { StatCard } from "@repo/ui/stat-card";
import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@repo/ui/newsletter";
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

import { TopFavorites } from "./TopFavorites";
import { OddsTable } from "./OddsTable";
import { WhyTheyCanWin } from "./WhyTheyCanWin";
import { HostHistory } from "./HostHistory";
import { DarkHorses } from "./DarkHorses";

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

// ============================================================================
// DATA
// ============================================================================

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

const teamsById = Object.fromEntries(teams.map((t) => [t.id, t]));

const top10 = [...teamPredictions]
  .sort((a, b) => b.winnerProb - a.winnerProb)
  .slice(0, 10)
  .map((pred) => ({
    pred,
    team: teamsById[pred.teamId],
  }))
  .filter((x): x is { pred: typeof x.pred; team: NonNullable<typeof x.team> } => x.team != null);

const darkHorses = [...teamPredictions]
  .sort((a, b) => b.winnerProb - a.winnerProb)
  .slice(10, 16)
  .map((pred) => ({
    pred,
    team: teamsById[pred.teamId],
  }))
  .filter((x): x is { pred: typeof x.pred; team: NonNullable<typeof x.team> } => x.team != null);

const teamArguments: Record<string, { pros: string[]; cons: string[] }> = {
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

const CONFEDERATION_COLORS: Record<string, { bg: string; border: string; label: string }> = {
  UEFA: { bg: "bg-[#2EC4B6]", border: "border-[#2EC4B6]/60", label: "UEFA (Europe)" },
  CONMEBOL: { bg: "bg-[#0D3B66]", border: "border-[#0D3B66]/60", label: "CONMEBOL (Amérique du Sud)" },
  CONCACAF: { bg: "bg-[#FF6B35]", border: "border-[#FF6B35]/60", label: "CONCACAF (Amérique du Nord)" },
  CAF: { bg: "bg-[#0D3B66]/70", border: "border-[#0D3B66]/20", label: "CAF (Afrique)" },
  AFC: { bg: "bg-[#2EC4B6]/70", border: "border-[#2EC4B6]/60", label: "AFC (Asie)" },
  OFC: { bg: "bg-[#06D6A0]", border: "border-[#06D6A0]/60", label: "OFC (Océanie)" },
};

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

// ============================================================================
// PAGE
// ============================================================================

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
          <ol className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 flex-wrap">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Pronostic vainqueur</li>
          </ol>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero-animated py-12 sm:py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary backdrop-blur-sm">
            <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
            CDM 2026 · Pronostic vainqueur
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            🏆 Argentine, France, Espagne :{" "}
            <span className="gradient-text">qui décroche le titre ?</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200 mb-6">
            Modèle ELO + cotes bookmakers + 48 analyses d&apos;équipes.
            Le classement qui dérange — mis à jour en temps réel.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <a href="#top10" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all">
              🔥 Top 10 des favoris
            </a>
            <a href="#analyse-top5" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all">
              💡 Pourquoi ils peuvent gagner
            </a>
            <a href="#cotes" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all">
              💰 Meilleures cotes
            </a>
            <a href="#historique" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all">
              🏟️ Avantage domicile
            </a>
            <a href="#dark-horses" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all">
              🐴 Les surprises possibles
            </a>
          </div>
        </div>
      </section>

      {/* ===== GRAPHIQUE VISUEL DES COTES PAR CONTINENT ===== */}
      <section id="graphique" className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading emoji="📊" title="Chances de titre par confédération" subtitle="Barres proportionnelles aux probabilités — colorées par confédération" />

          {/* Légende confédérations */}
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.entries(CONFEDERATION_COLORS).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs">
                <span className={`inline-block w-3 h-3 rounded-sm ${val.bg}`} />
                <span className="text-gray-600 dark:text-gray-300">{val.label}</span>
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
                  <span className="shrink-0 w-6 text-right text-xs font-bold text-gray-600 dark:text-gray-400">
                    {index + 1}
                  </span>
                  <div className="flex items-center gap-1.5 w-24 sm:w-36 shrink-0">
                    <span className="text-lg sm:text-xl shrink-0">{team.flag}</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white break-words leading-tight">
                      {team.name}
                    </span>
                  </div>
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
                  <span className="shrink-0 w-14 text-right text-sm font-bold text-secondary">
                    {approxOdds}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-xs text-gray-600 dark:text-gray-400">
            * Largeur des barres proportionnelle à la probabilité de remporter le titre (modèle ELO). Les cotes sont indicatives.
          </div>
        </div>
      </section>

      {/* ===== TOP 10 FAVORIS ===== */}
      <TopFavorites top10={top10} teamArguments={teamArguments} />

      {/* ===== POURQUOI ILS PEUVENT GAGNER — TOP 5 ===== */}
      <WhyTheyCanWin top10={top10} whyTheyCanWin={whyTheyCanWin} />

      {/* ===== HISTORIQUE CDM À DOMICILE ===== */}
      <HostHistory cdmHomeStats={cdmHomeStats} homeWins={homeWins} totalEditions={totalEditions} homeWinPct={homeWinPct} />

      {/* ===== CTA SIMULATEUR BRACKET ===== */}
      <section id="simulateur-cta" className="py-12" style={{ background: "linear-gradient(160deg, #0D3B66 0%, #0F1923 50%, #0D3B66 100%)" }}>
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary mb-4">
            <span className="text-secondary">🏆</span>
            Simulateur interactif
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
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
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-3.5 font-bold text-white shadow-lg shadow-secondary/30 hover:shadow-xl hover:-translate-y-1 transition-all text-base"
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

      {/* ===== TABLEAU COMPARATIF DES COTES MULTI-BOOKMAKERS ===== */}
      <OddsTable />

      {/* ===== DARK HORSES ===== */}
      <DarkHorses darkHorses={darkHorses} />

      {/* ===== METHODOLOGIE ===== */}
      <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card hover padding="md">
            <SectionHeading emoji="📐" title="Méthodologie" />
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
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/methodologie"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Lire notre méthodologie complète →
            </Link>
          </Card>
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
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 group-open:rotate-45 transition-transform duration-200">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
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
      <Newsletter variant="banner" />

      {/* ===== CTA FINAL ===== */}
      <section className="bg-white dark:bg-slate-900 py-10 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/comparateur-cotes" className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-md">
              📊 Comparer toutes les cotes
            </Link>
            <Link href="/equipe-de-france" className="inline-flex items-center gap-2 rounded-lg border border-secondary/30 dark:border-secondary/40 bg-secondary/5 dark:bg-secondary/10 px-6 py-3 font-semibold text-secondary dark:text-secondary hover:-translate-y-0.5 transition-all">
              🇫🇷 Pronostic France
            </Link>
            <Link href="/simulateur" className="inline-flex items-center gap-2 rounded-lg border border-secondary/30 bg-secondary/10 px-6 py-3 font-semibold text-secondary hover:bg-secondary/20 transition-all">
              🏆 Simulateur de bracket
            </Link>
          </div>
        </div>
      </section>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        🔞 Les paris sportifs sont interdits aux mineurs. Jouer comporte des risques : endettement, isolement, dépendance.
        Pour être aidé, appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé).
      </p>
</>
  );
}
