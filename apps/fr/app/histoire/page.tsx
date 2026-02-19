import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  title: "Histoire de la Coupe du Monde - Timeline 1930 à 2026 | CDM 2026",
  description:
    "Timeline complète de l'histoire de la Coupe du Monde FIFA de 1930 à 2026. Pays hôtes, vainqueurs, meilleurs buteurs et faits marquants de chaque édition.",
  openGraph: {
    title: "Histoire de la Coupe du Monde - Timeline 1930 à 2026",
    description:
      "Revivez toutes les Coupes du Monde depuis 1930 : pays hôtes, champions, records et anecdotes historiques.",
    url: "https://cdm2026.fr/histoire",
  },
  alternates: {
    canonical: "https://cdm2026.fr/histoire",
  },
};

// ── Données ────────────────────────────────────────────────────────────────

interface CdmEdition {
  year: number;
  host: string;
  hostFlag: string;
  winner: string;
  winnerFlag: string;
  runnerUp: string;
  runnerUpFlag: string;
  score: string;
  topScorer: string;
  topScorerGoals: number;
  teams: number;
  totalGoals: number;
  highlight: string;
  highlightDetail: string;
  color: string;
}

const editions: CdmEdition[] = [
  {
    year: 1930,
    host: "Uruguay",
    hostFlag: "🇺🇾",
    winner: "Uruguay",
    winnerFlag: "🇺🇾",
    runnerUp: "Argentine",
    runnerUpFlag: "🇦🇷",
    score: "4–2",
    topScorer: "Guillermo Stábile",
    topScorerGoals: 8,
    teams: 13,
    totalGoals: 70,
    highlight: "La naissance du Mondial",
    highlightDetail:
      "La première Coupe du Monde se tient en Uruguay pour le centenaire du pays. 13 équipes seulement participent, aucun Européen majeur ne fait le déplacement par voie maritime.",
    color: "from-amber-500 to-amber-700",
  },
  {
    year: 1934,
    host: "Italie",
    hostFlag: "🇮🇹",
    winner: "Italie",
    winnerFlag: "🇮🇹",
    runnerUp: "Tchécoslovaquie",
    runnerUpFlag: "🇨🇿",
    score: "2–1 a.p.",
    topScorer: "Oldřich Nejedly",
    topScorerGoals: 5,
    teams: 16,
    totalGoals: 70,
    highlight: "Mussolini et la propagande",
    highlightDetail:
      "L'Italie remporte la CDM sur home soil dans un contexte de tensions politiques. Le régime fasciste utilise la victoire à des fins de propagande.",
    color: "from-green-600 to-green-800",
  },
  {
    year: 1938,
    host: "France",
    hostFlag: "🇫🇷",
    winner: "Italie",
    winnerFlag: "🇮🇹",
    runnerUp: "Hongrie",
    runnerUpFlag: "🇭🇺",
    score: "4–2",
    topScorer: "Leônidas",
    topScorerGoals: 7,
    teams: 15,
    totalGoals: 84,
    highlight: "Double champion !",
    highlightDetail:
      "L'Italie devient la première équipe à remporter deux Coupes du Monde consécutives. Le Brésilien Leônidas, surnommé 'le Diamant Noir', régale le public parisien.",
    color: "from-blue-600 to-blue-800",
  },
  {
    year: 1950,
    host: "Brésil",
    hostFlag: "🇧🇷",
    winner: "Uruguay",
    winnerFlag: "🇺🇾",
    runnerUp: "Brésil",
    runnerUpFlag: "🇧🇷",
    score: "2–1 (phase finale)",
    topScorer: "Ademir",
    topScorerGoals: 9,
    teams: 13,
    totalGoals: 88,
    highlight: "Le Maracanazo",
    highlightDetail:
      "Devant 200 000 spectateurs au Maracanã, l'Uruguay bat le Brésil 2-1 en match décisif. Un traumatisme national qui marquera le Brésil pour des décennies.",
    color: "from-yellow-500 to-yellow-700",
  },
  {
    year: 1954,
    host: "Suisse",
    hostFlag: "🇨🇭",
    winner: "Allemagne",
    winnerFlag: "🇩🇪",
    runnerUp: "Hongrie",
    runnerUpFlag: "🇭🇺",
    score: "3–2",
    topScorer: "Sándor Kocsis",
    topScorerGoals: 11,
    teams: 16,
    totalGoals: 140,
    highlight: "Le Miracle de Berne",
    highlightDetail:
      "La Hongrie de Puskás — dite 'Magical Magyars', invaincu depuis 4 ans — se fait battre par l'Allemagne en finale (3–2). Le plus grand choc de l'histoire du Mondial. Record toujours en vigueur : 5,38 buts/match.",
    color: "from-red-600 to-red-800",
  },
  {
    year: 1958,
    host: "Suède",
    hostFlag: "🇸🇪",
    winner: "Brésil",
    winnerFlag: "🇧🇷",
    runnerUp: "Suède",
    runnerUpFlag: "🇸🇪",
    score: "5–2",
    topScorer: "Just Fontaine",
    topScorerGoals: 13,
    teams: 16,
    totalGoals: 126,
    highlight: "Pelé & Fontaine, deux légendes naissent",
    highlightDetail:
      "Pelé, 17 ans, éblouit le monde et remporte son premier titre. Le Français Just Fontaine inscrit 13 buts en 6 matchs — un record absolu, toujours imbattu 66 ans plus tard.",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    year: 1962,
    host: "Chili",
    hostFlag: "🇨🇱",
    winner: "Brésil",
    winnerFlag: "🇧🇷",
    runnerUp: "Tchécoslovaquie",
    runnerUpFlag: "🇨🇿",
    score: "3–1",
    topScorer: "Garrincha, Vavá, Sánchez, Jerkovic…",
    topScorerGoals: 4,
    teams: 16,
    totalGoals: 89,
    highlight: "Garrincha reprend le flambeau",
    highlightDetail:
      "Pelé se blesse dès le 2e match. Garrincha, « l'Oiseau Chanteur », prend les commandes et guide le Brésil vers son 2e titre mondial consécutif.",
    color: "from-teal-500 to-teal-700",
  },
  {
    year: 1966,
    host: "Angleterre",
    hostFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    winner: "Angleterre",
    winnerFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    runnerUp: "Allemagne",
    runnerUpFlag: "🇩🇪",
    score: "4–2 a.p.",
    topScorer: "Eusébio",
    topScorerGoals: 9,
    teams: 16,
    totalGoals: 89,
    highlight: "Le but fantôme de Wembley",
    highlightDetail:
      "Angleterre 4-2 Allemagne (a.p.) : le 3e but anglais (Hurst) franchi ou non la ligne ? Encore débattu aujourd'hui. L'Angleterre remporte sa seule et unique Coupe du Monde. Eusébio encante le tournoi.",
    color: "from-indigo-600 to-indigo-800",
  },
  {
    year: 1970,
    host: "Mexique",
    hostFlag: "🇲🇽",
    winner: "Brésil",
    winnerFlag: "🇧🇷",
    runnerUp: "Italie",
    runnerUpFlag: "🇮🇹",
    score: "4–1",
    topScorer: "Gerd Müller",
    topScorerGoals: 10,
    teams: 16,
    totalGoals: 95,
    highlight: "La plus belle équipe de l'histoire",
    highlightDetail:
      "Pelé, Jairzinho, Tostão, Rivelino : le Brésil 1970 est souvent cité comme la plus belle équipe de tous les temps. Victoire 4-1 en finale et conservation définitive du trophée Jules Rimet.",
    color: "from-yellow-400 to-green-600",
  },
  {
    year: 1974,
    host: "Allemagne",
    hostFlag: "🇩🇪",
    winner: "Allemagne",
    winnerFlag: "🇩🇪",
    runnerUp: "Pays-Bas",
    runnerUpFlag: "🇳🇱",
    score: "2–1",
    topScorer: "Grzegorz Lato",
    topScorerGoals: 7,
    teams: 16,
    totalGoals: 97,
    highlight: "Football Total vs efficacité allemande",
    highlightDetail:
      "Les Pays-Bas de Johan Cruyff inventent le 'Football Total' mais s'inclinent 2-1 en finale face à une Allemagne réaliste et organisée. Une finale mythique.",
    color: "from-orange-500 to-red-600",
  },
  {
    year: 1978,
    host: "Argentine",
    hostFlag: "🇦🇷",
    winner: "Argentine",
    winnerFlag: "🇦🇷",
    runnerUp: "Pays-Bas",
    runnerUpFlag: "🇳🇱",
    score: "3–1 a.p.",
    topScorer: "Mario Kempes",
    topScorerGoals: 6,
    teams: 16,
    totalGoals: 102,
    highlight: "Mario Kempes et le peuple argentin",
    highlightDetail:
      "Sur fond de dictature militaire, l'Argentine de Kempes remporte son premier titre mondial. Les serpentins de Buenos Aires resteront dans l'histoire.",
    color: "from-sky-400 to-sky-600",
  },
  {
    year: 1982,
    host: "Espagne",
    hostFlag: "🇪🇸",
    winner: "Italie",
    winnerFlag: "🇮🇹",
    runnerUp: "Allemagne",
    runnerUpFlag: "🇩🇪",
    score: "3–1",
    topScorer: "Paolo Rossi",
    topScorerGoals: 6,
    teams: 24,
    totalGoals: 146,
    highlight: "Paolo Rossi ressuscite !",
    highlightDetail:
      "Suspendu 2 ans pour des matchs truqués, Paolo Rossi revient et inscrit 6 buts en phase finale dont un triplé contre le Brésil. L'Italie gagne son 3e titre. 24 équipes pour la première fois.",
    color: "from-blue-500 to-indigo-700",
  },
  {
    year: 1986,
    host: "Mexique",
    hostFlag: "🇲🇽",
    winner: "Argentine",
    winnerFlag: "🇦🇷",
    runnerUp: "Allemagne",
    runnerUpFlag: "🇩🇪",
    score: "3–2",
    topScorer: "Gary Lineker",
    topScorerGoals: 6,
    teams: 24,
    totalGoals: 132,
    highlight: "Maradona, la Main de Dieu",
    highlightDetail:
      "Diego Maradona inscrit deux buts mémorables contre l'Angleterre : la 'Main de Dieu' (but de la main) et le 'But du Siècle' (60 mètres). Deux buts, deux histoires, une seule légende.",
    color: "from-sky-300 to-blue-500",
  },
  {
    year: 1990,
    host: "Italie",
    hostFlag: "🇮🇹",
    winner: "Allemagne",
    winnerFlag: "🇩🇪",
    runnerUp: "Argentine",
    runnerUpFlag: "🇦🇷",
    score: "1–0",
    topScorer: "Salvatore Schillaci",
    topScorerGoals: 6,
    teams: 24,
    totalGoals: 115,
    highlight: "Nuits magiques & édition défensive",
    highlightDetail:
      "La CDM 1990 est la moins prolifique (2,21 buts/match). 'Notti Magiche' envahit l'Italie. Schillaci, inconnu avant le tournoi, en devient le héros. L'Allemagne bat l'Argentine en finale (1-0 sur penalty).",
    color: "from-green-500 to-teal-700",
  },
  {
    year: 1994,
    host: "États-Unis",
    hostFlag: "🇺🇸",
    winner: "Brésil",
    winnerFlag: "🇧🇷",
    runnerUp: "Italie",
    runnerUpFlag: "🇮🇹",
    score: "0–0 a.p. (3–2 tab)",
    topScorer: "Hristo Stoïchkov & Oleg Salenko",
    topScorerGoals: 6,
    teams: 24,
    totalGoals: 141,
    highlight: "Baggio rate le penalty de la finale",
    highlightDetail:
      "Roberto Baggio, auteur d'un tournoi exceptionnel, rate le tir au but décisif en finale face au Brésil. L'image de ses yeux levés vers le ciel reste gravée dans l'histoire du football.",
    color: "from-red-500 to-red-700",
  },
  {
    year: 1998,
    host: "France",
    hostFlag: "🇫🇷",
    winner: "France",
    winnerFlag: "🇫🇷",
    runnerUp: "Brésil",
    runnerUpFlag: "🇧🇷",
    score: "3–0",
    topScorer: "Davor Šuker",
    topScorerGoals: 6,
    teams: 32,
    totalGoals: 171,
    highlight: "Zidane et les Bleus sacrent la France",
    highlightDetail:
      "Zinédine Zidane inscrit un doublé de la tête (43', 69') en finale. La France de Didier Deschamps s'impose 3-0 face à un Brésil diminué (Ronaldo victime d'une crise d'épilepsie la veille). 32 équipes pour la première fois.",
    color: "from-blue-700 to-red-600",
  },
  {
    year: 2002,
    host: "Corée du Sud & Japon",
    hostFlag: "🇰🇷🇯🇵",
    winner: "Brésil",
    winnerFlag: "🇧🇷",
    runnerUp: "Allemagne",
    runnerUpFlag: "🇩🇪",
    score: "2–0",
    topScorer: "Ronaldo",
    topScorerGoals: 8,
    teams: 32,
    totalGoals: 161,
    highlight: "Ronaldo, la revanche du phénomène",
    highlightDetail:
      "Ronaldo, traumatisé par 1998, inscrit 8 buts dont un doublé en finale et remporte le Ballon d'Or. Le Brésil remporte son 5e titre. La Corée du Sud crée l'exploit en atteignant le top 4.",
    color: "from-yellow-400 to-emerald-500",
  },
  {
    year: 2006,
    host: "Allemagne",
    hostFlag: "🇩🇪",
    winner: "Italie",
    winnerFlag: "🇮🇹",
    runnerUp: "France",
    runnerUpFlag: "🇫🇷",
    score: "1–1 a.p. (5–3 tab)",
    topScorer: "Miroslav Klose",
    topScorerGoals: 5,
    teams: 32,
    totalGoals: 147,
    highlight: "Le coup de tête de Zidane",
    highlightDetail:
      "En finale (France-Italie), Zidane donne un coup de tête à Materazzi après une provocation verbale et est expulsé. L'Italie gagne aux tirs au but. La dernière image de Zizou en professionnel.",
    color: "from-gray-600 to-gray-800",
  },
  {
    year: 2010,
    host: "Afrique du Sud",
    hostFlag: "🇿🇦",
    winner: "Espagne",
    winnerFlag: "🇪🇸",
    runnerUp: "Pays-Bas",
    runnerUpFlag: "🇳🇱",
    score: "1–0 a.p.",
    topScorer: "Thomas Müller, David Villa, Wesley Sneijder, Diego Forlán",
    topScorerGoals: 5,
    teams: 32,
    totalGoals: 145,
    highlight: "Le Vuvuzela et Paul le Poulpe",
    highlightDetail:
      "Première CDM en Afrique ! Les vuvuzelas envahissent les stades. Paul le poulpe prédit tous les résultats de l'Allemagne. L'Espagne remporte son 1er titre grâce à Iniesta (116'). Waka Waka.",
    color: "from-yellow-500 to-green-600",
  },
  {
    year: 2014,
    host: "Brésil",
    hostFlag: "🇧🇷",
    winner: "Allemagne",
    winnerFlag: "🇩🇪",
    runnerUp: "Argentine",
    runnerUpFlag: "🇦🇷",
    score: "1–0 a.p.",
    topScorer: "James Rodríguez",
    topScorerGoals: 6,
    teams: 32,
    totalGoals: 171,
    highlight: "Le 7–1 : le Mineirazo",
    highlightDetail:
      "Brésil 1–7 Allemagne en demi-finale : la plus grande déroute de l'histoire du football brésilien. Neymar absent blessé, le Brésil s'effondre. L'Allemagne gagne son 4e titre. James Rodríguez, révélation du tournoi.",
    color: "from-yellow-400 to-red-500",
  },
  {
    year: 2018,
    host: "Russie",
    hostFlag: "🇷🇺",
    winner: "France",
    winnerFlag: "🇫🇷",
    runnerUp: "Croatie",
    runnerUpFlag: "🇭🇷",
    score: "4–2",
    topScorer: "Harry Kane",
    topScorerGoals: 6,
    teams: 32,
    totalGoals: 169,
    highlight: "Les Bleus champions du monde !",
    highlightDetail:
      "La France de Deschamps, Mbappé (19 ans !), Griezmann et Pogba domine et remporte son 2e titre mondial. La Croatie, petite nation de 4M d'habitants, atteint la finale pour la 1ère fois. Kane soulier d'or.",
    color: "from-blue-600 to-red-500",
  },
  {
    year: 2022,
    host: "Qatar",
    hostFlag: "🇶🇦",
    winner: "Argentine",
    winnerFlag: "🇦🇷",
    runnerUp: "France",
    runnerUpFlag: "🇫🇷",
    score: "3–3 a.p. (4–2 tab)",
    topScorer: "Kylian Mbappé",
    topScorerGoals: 8,
    teams: 32,
    totalGoals: 172,
    highlight: "Messi enfin champion du monde",
    highlightDetail:
      "La plus grande finale de l'histoire : Argentine 3-3 France après prolongations. Mbappé inscrit un triplé historique mais perd aux tab (4-2). Lionel Messi, 35 ans, soulève enfin le Graal. Un épilogue de conte de fées.",
    color: "from-sky-400 to-purple-600",
  },
];

// ── Carte édition ──────────────────────────────────────────────────────────

interface EditionCardProps {
  edition: CdmEdition;
  side: "left" | "right";
}

function EditionCard({ edition, side }: EditionCardProps) {
  const isLeft = side === "left";

  return (
    <div
      className={`relative flex items-start gap-0 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Conteneur card (50% width sur desktop) */}
      <div
        className={`w-full md:w-[calc(50%-2rem)] ${
          isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
        }`}
      >
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow group">
          {/* Header */}
          <div
            className={`flex items-center gap-3 mb-3 ${
              isLeft ? "md:flex-row-reverse" : "flex-row"
            }`}
          >
            <span
              className={`text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${edition.color}`}
            >
              {edition.year}
            </span>
            <div
              className={`flex-1 ${isLeft ? "md:text-right" : ""}`}
            >
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                {edition.hostFlag} {edition.host}
              </div>
            </div>
          </div>

          {/* Vainqueur */}
          <div
            className={`flex items-center gap-2 mb-2 ${
              isLeft ? "md:justify-end" : "justify-start"
            }`}
          >
            <span className="text-2xl">{edition.winnerFlag}</span>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">
                {edition.winner}
              </div>
              <div className="text-xs text-[#06D6A0] dark:text-[#06D6A0] font-medium">
                🏆 Champion · {edition.score} vs {edition.runnerUpFlag} {edition.runnerUp}
              </div>
            </div>
          </div>

          {/* Meilleur buteur */}
          <div
            className={`flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 mb-3 ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <span>⚽</span>
            <span>
              <strong>{edition.topScorer}</strong> — {edition.topScorerGoals} but
              {edition.topScorerGoals > 1 ? "s" : ""}
            </span>
          </div>

          {/* Fait marquant */}
          <div
            className={`border-t border-gray-100 dark:border-slate-700 pt-3 ${
              isLeft ? "md:text-right" : ""
            }`}
          >
            <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
              {edition.highlight}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {edition.highlightDetail}
            </p>
          </div>

          {/* Stats footer */}
          <div
            className={`flex items-center gap-3 mt-3 text-xs text-gray-500 ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <span className="flex items-center gap-1">
              <span>👥</span> {edition.teams} équipes
            </span>
            <span className="flex items-center gap-1">
              <span>⚽</span> {edition.totalGoals} buts
            </span>
          </div>
        </div>
      </div>

      {/* Point central (visible uniquement md+) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
        <div
          className={`w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-sm font-bold text-white shadow-lg bg-gradient-to-br ${edition.color}`}
        >
          {edition.winnerFlag}
        </div>
      </div>

      {/* Spacer de l'autre côté (desktop) */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </div>
  );
}

// ── Page principale ────────────────────────────────────────────────────────

export default function HistoirePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Histoire de la CDM", url: "/histoire" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Fil d'Ariane */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li>
              <Link href="/" className="hover:text-primary dark:hover:text-white transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Histoire</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-primary text-white py-16 overflow-hidden">
        {/* Motif déco */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-9xl">⚽</div>
          <div className="absolute bottom-10 right-10 text-9xl">🏆</div>
          <div className="absolute top-1/2 left-1/4 text-6xl rotate-12">🌍</div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Coupe du Monde FIFA
          </p>
          <h1 className="text-2xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            📅 L'Histoire du Mondial
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
            92 ans d'émotions, de légendes et de moments inoubliables.
            De l'Uruguay 1930 à l'Argentine 2022, retracez chaque épopée.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "22", label: "Éditions" },
              { val: "8", label: "Champions différents" },
              { val: "1930", label: "Première édition" },
              { val: "2026", label: "Prochaine édition" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3 min-w-[110px]">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {/* ── Intro ────────────────────────────────────────────── */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Une timeline de légendes
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed">
            De Pelé à Maradona, de Zidane à Messi, chaque édition a produit ses propres héros et moments mythiques.
            Découvrez l'histoire complète du tournoi le plus regardé de la planète.
          </p>
        </div>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <div className="relative">
          {/* Ligne centrale verticale (desktop uniquement) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-primary" />

          <div className="space-y-8">
            {editions.map((ed, i) => (
              <EditionCard
                key={ed.year}
                edition={ed}
                side={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>

        {/* ── Section spéciale 2026 ────────────────────────────── */}
        <div className="mt-16">
          <div className="relative">
            {/* Continuation de la ligne */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-8 w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 top-0">
              <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-xl font-bold text-white shadow-xl bg-gradient-to-br from-primary to-primary">
                🌟
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-primary border-2 border-primary/20 p-8 shadow-2xl text-white mt-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <span>🌟</span>
                <span>Édition historique</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                2026 : La Plus Grande CDM de l'Histoire
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                La Coupe du Monde 2026 brisera tous les records avec un format révolutionnaire
                et une dimension jamais atteinte.
              </p>
            </div>

            {/* Stats clés */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { val: "48", label: "Équipes", icon: "👥", desc: "vs 32 auparavant (+50%)" },
                { val: "104", label: "Matchs", icon: "⚽", desc: "vs 64 en 2022" },
                { val: "3", label: "Pays hôtes", icon: "🌍", desc: "USA · Canada · Mexique" },
                { val: "16", label: "Villes", icon: "🏟️", desc: "sur 3 continents" },
              ].map(({ val, label, icon, desc }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center"
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-3xl font-extrabold">{val}</div>
                  <div className="font-bold text-sm">{label}</div>
                  <div className="text-[11px] text-white/80 mt-1">{desc}</div>
                </div>
              ))}
            </div>

            {/* 3 pays hôtes */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  flag: "🇺🇸",
                  country: "États-Unis",
                  cities: "New York, Los Angeles, Dallas, San Francisco, Seattle, Boston, Miami, Atlanta, Houston, Kansas City, Philadelphia",
                  matches: "78 matchs",
                  color: "from-blue-600/30 to-red-500/30",
                },
                {
                  flag: "🇨🇦",
                  country: "Canada",
                  cities: "Toronto, Vancouver",
                  matches: "13 matchs",
                  color: "from-red-600/30 to-red-700/30",
                },
                {
                  flag: "🇲🇽",
                  country: "Mexique",
                  cities: "Mexico City, Guadalajara, Monterrey",
                  matches: "13 matchs",
                  color: "from-green-600/30 to-red-500/30",
                },
              ].map((p) => (
                <div
                  key={p.country}
                  className={`rounded-2xl border border-white/20 bg-gradient-to-br ${p.color} p-4`}
                >
                  <div className="text-4xl mb-2">{p.flag}</div>
                  <div className="font-bold text-lg">{p.country}</div>
                  <div className="text-xs text-white/80 mt-1 mb-2">{p.cities}</div>
                  <div className="inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs font-bold">
                    ⚽ {p.matches}
                  </div>
                </div>
              ))}
            </div>

            {/* Nouveau format */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                🔄 Nouveau format révolutionnaire
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
                <div>
                  <div className="font-semibold text-white mb-1">Phase de groupes</div>
                  <ul className="space-y-1 text-xs">
                    <li>✓ 12 groupes de 4 équipes</li>
                    <li>✓ Les 2 premiers + 8 meilleurs 3es qualifiés</li>
                    <li>✓ 32 équipes au tour suivant</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Phases finales</div>
                  <ul className="space-y-1 text-xs">
                    <li>✓ Huitièmes de finale</li>
                    <li>✓ Quarts de finale</li>
                    <li>✓ Demi-finales</li>
                    <li>✓ Finale : 19 juillet 2026, MetLife Stadium (New York)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Favoris 2026 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">🎯 Favoris pour 2026</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { flag: "🇧🇷", country: "Brésil", cote: "5e titre ?" },
                  { flag: "🇦🇷", country: "Argentine", cote: "Tenant du titre" },
                  { flag: "🇫🇷", country: "France", cote: "3e titre ?" },
                  { flag: "🇩🇪", country: "Allemagne", cote: "5e titre ?" },
                  { flag: "🇵🇹", country: "Portugal", cote: "1er titre ?" },
                  { flag: "🇪🇸", country: "Espagne", cote: "2e titre ?" },
                  { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "Angleterre", cote: "2e titre ?" },
                ].map(({ flag, country, cote }) => (
                  <div
                    key={country}
                    className="rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-center min-w-[90px]"
                  >
                    <div className="text-2xl">{flag}</div>
                    <div className="text-xs font-bold mt-1">{country}</div>
                    <div className="text-[10px] text-white/80">{cote}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/pronostic-vainqueur"
                className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-bold px-6 py-3 hover:bg-gray-100 transition-colors shadow-lg"
              >
                🏆 Pronostic vainqueur 2026
              </Link>
              <Link
                href="/simulateur"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 text-white font-bold px-6 py-3 hover:bg-white/10 transition-colors"
              >
                🎮 Simuler le Mondial
              </Link>
              <Link
                href="/statistiques"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 text-white font-bold px-6 py-3 hover:bg-white/10 transition-colors"
              >
                📊 Statistiques historiques
              </Link>
            </div>
          </div>
        </div>

        {/* ── Navigation bas de page ────────────────────────────── */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { href: "/palmares", icon: "🏆", label: "Palmarès complet", desc: "Tous les vainqueurs de 1930 à 2022" },
            { href: "/statistiques", icon: "📊", label: "Statistiques", desc: "Records, buteurs, buts par édition" },
            { href: "/equipes", icon: "🌍", label: "Les 48 équipes 2026", desc: "Groupes, effectifs et pronostics" },
          ].map(({ href, icon, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <span className="text-3xl flex-shrink-0">{icon}</span>
              <div>
                <div className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{desc}</div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Histoire de la Coupe du Monde - Timeline 1930 à 2026",
            description:
              "Timeline complète de l'histoire de la Coupe du Monde FIFA, de 1930 à 2026, avec faits marquants et records.",
            url: "https://cdm2026.fr/histoire",
            mainEntity: {
              "@type": "ItemList",
              name: "Éditions de la Coupe du Monde FIFA",
              numberOfItems: editions.length + 1,
              itemListElement: editions.map((ed, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: `CDM ${ed.year} — ${ed.winner} champion`,
                description: ed.highlightDetail,
              })),
            },
          }),
        }}
      />
    </>
  );
}
