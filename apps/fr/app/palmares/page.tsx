import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Palmarès Coupe du Monde FIFA | Historique 1930–2022",
  description:
    "Palmarès complet de la Coupe du Monde FIFA de 1930 à 2022. Tous les vainqueurs, finalistes, scores, records et statistiques historiques. Qui a le plus de titres ?",
  openGraph: {
    title: "Palmarès CDM FIFA 1930–2022",
    description:
      "Tous les champions du Monde depuis 1930 : Brésil 5 titres, Allemagne 4, Italie 4, Argentine 3…",
    url: "https://cdm2026.fr/palmares",
  },
};

// ── Static data ──────────────────────────────────────────────────────────────

interface WorldCupEdition {
  year: number;
  host: string;
  hostFlag: string;
  winner: string;
  winnerFlag: string;
  runnerUp: string;
  runnerUpFlag: string;
  score: string;
  thirdPlace: string;
  thirdPlaceFlag: string;
  teams: number;
  topScorer: string;
  topScorerGoals: number;
}

const editions: WorldCupEdition[] = [
  {
    year: 1930,
    host: "Uruguay",
    hostFlag: "🇺🇾",
    winner: "Uruguay",
    winnerFlag: "🇺🇾",
    runnerUp: "Argentine",
    runnerUpFlag: "🇦🇷",
    score: "4–2",
    thirdPlace: "États-Unis",
    thirdPlaceFlag: "🇺🇸",
    teams: 13,
    topScorer: "Guillermo Stábile (ARG)",
    topScorerGoals: 8,
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
    thirdPlace: "Allemagne",
    thirdPlaceFlag: "🇩🇪",
    teams: 16,
    topScorer: "Oldřich Nejedly (TCH)",
    topScorerGoals: 5,
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
    thirdPlace: "Brésil",
    thirdPlaceFlag: "🇧🇷",
    teams: 15,
    topScorer: "Leônidas (BRA)",
    topScorerGoals: 7,
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
    thirdPlace: "Suède",
    thirdPlaceFlag: "🇸🇪",
    teams: 13,
    topScorer: "Ademir (BRA)",
    topScorerGoals: 9,
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
    thirdPlace: "Autriche",
    thirdPlaceFlag: "🇦🇹",
    teams: 16,
    topScorer: "Sándor Kocsis (HUN)",
    topScorerGoals: 11,
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
    thirdPlace: "France",
    thirdPlaceFlag: "🇫🇷",
    teams: 16,
    topScorer: "Just Fontaine (FRA)",
    topScorerGoals: 13,
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
    thirdPlace: "Chili",
    thirdPlaceFlag: "🇨🇱",
    teams: 16,
    topScorer: "Garrincha, Vavá, Leonel Sánchez, Drazan Jerkovic, Valentin Ivanov, Florian Albert",
    topScorerGoals: 4,
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
    thirdPlace: "Portugal",
    thirdPlaceFlag: "🇵🇹",
    teams: 16,
    topScorer: "Eusébio (POR)",
    topScorerGoals: 9,
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
    thirdPlace: "Allemagne",
    thirdPlaceFlag: "🇩🇪",
    teams: 16,
    topScorer: "Gerd Müller (FRG)",
    topScorerGoals: 10,
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
    thirdPlace: "Pologne",
    thirdPlaceFlag: "🇵🇱",
    teams: 16,
    topScorer: "Grzegorz Lato (POL)",
    topScorerGoals: 7,
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
    thirdPlace: "Brésil",
    thirdPlaceFlag: "🇧🇷",
    teams: 16,
    topScorer: "Mario Kempes (ARG)",
    topScorerGoals: 6,
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
    thirdPlace: "Pologne",
    thirdPlaceFlag: "🇵🇱",
    teams: 24,
    topScorer: "Paolo Rossi (ITA)",
    topScorerGoals: 6,
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
    thirdPlace: "France",
    thirdPlaceFlag: "🇫🇷",
    teams: 24,
    topScorer: "Gary Lineker (ENG)",
    topScorerGoals: 6,
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
    thirdPlace: "Italie",
    thirdPlaceFlag: "🇮🇹",
    teams: 24,
    topScorer: "Salvatore Schillaci (ITA)",
    topScorerGoals: 6,
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
    thirdPlace: "Suède",
    thirdPlaceFlag: "🇸🇪",
    teams: 24,
    topScorer: "Hristo Stoïchkov (BUL), Oleg Salenko (RUS)",
    topScorerGoals: 6,
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
    thirdPlace: "Croatie",
    thirdPlaceFlag: "🇭🇷",
    teams: 32,
    topScorer: "Davor Šuker (CRO)",
    topScorerGoals: 6,
  },
  {
    year: 2002,
    host: "Corée/Japon",
    hostFlag: "🇰🇷🇯🇵",
    winner: "Brésil",
    winnerFlag: "🇧🇷",
    runnerUp: "Allemagne",
    runnerUpFlag: "🇩🇪",
    score: "2–0",
    thirdPlace: "Turquie",
    thirdPlaceFlag: "🇹🇷",
    teams: 32,
    topScorer: "Ronaldo (BRA)",
    topScorerGoals: 8,
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
    thirdPlace: "Allemagne",
    thirdPlaceFlag: "🇩🇪",
    teams: 32,
    topScorer: "Miroslav Klose (GER)",
    topScorerGoals: 5,
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
    thirdPlace: "Allemagne",
    thirdPlaceFlag: "🇩🇪",
    teams: 32,
    topScorer: "Thomas Müller (GER), David Villa (ESP), Wesley Sneijder (NED), Diego Forlán (URU)",
    topScorerGoals: 5,
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
    thirdPlace: "Pays-Bas",
    thirdPlaceFlag: "🇳🇱",
    teams: 32,
    topScorer: "James Rodríguez (COL)",
    topScorerGoals: 6,
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
    thirdPlace: "Belgique",
    thirdPlaceFlag: "🇧🇪",
    teams: 32,
    topScorer: "Harry Kane (ENG)",
    topScorerGoals: 6,
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
    thirdPlace: "Croatie",
    thirdPlaceFlag: "🇭🇷",
    teams: 32,
    topScorer: "Kylian Mbappé (FRA)",
    topScorerGoals: 8,
  },
];

interface CountryRecord {
  country: string;
  flag: string;
  titles: number;
  finals: number;
  years: number[];
  confederation: string;
}

const countryRecords: CountryRecord[] = [
  {
    country: "Brésil",
    flag: "🇧🇷",
    titles: 5,
    finals: 7,
    years: [1958, 1962, 1970, 1994, 2002],
    confederation: "CONMEBOL",
  },
  {
    country: "Allemagne",
    flag: "🇩🇪",
    titles: 4,
    finals: 8,
    years: [1954, 1974, 1990, 2014],
    confederation: "UEFA",
  },
  {
    country: "Italie",
    flag: "🇮🇹",
    titles: 4,
    finals: 6,
    years: [1934, 1938, 1982, 2006],
    confederation: "UEFA",
  },
  {
    country: "Argentine",
    flag: "🇦🇷",
    titles: 3,
    finals: 5,
    years: [1978, 1986, 2022],
    confederation: "CONMEBOL",
  },
  {
    country: "France",
    flag: "🇫🇷",
    titles: 2,
    finals: 3,
    years: [1998, 2018],
    confederation: "UEFA",
  },
  {
    country: "Uruguay",
    flag: "🇺🇾",
    titles: 2,
    finals: 2,
    years: [1930, 1950],
    confederation: "CONMEBOL",
  },
  {
    country: "Espagne",
    flag: "🇪🇸",
    titles: 1,
    finals: 1,
    years: [2010],
    confederation: "UEFA",
  },
  {
    country: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    titles: 1,
    finals: 1,
    years: [1966],
    confederation: "UEFA",
  },
];

const records = [
  {
    icon: "⚽",
    label: "Meilleur buteur de l'histoire",
    value: "Miroslav Klose",
    detail: "16 buts (Allemagne, 2002–2014)",
  },
  {
    icon: "🏃",
    label: "Plus de matchs joués",
    value: "Lothar Matthäus",
    detail: "25 matchs (Allemagne, 1982–1998)",
  },
  {
    icon: "🏆",
    label: "Plus de titres (joueur)",
    value: "Pelé",
    detail: "3 titres (Brésil, 1958, 1962, 1970)",
  },
  {
    icon: "🎽",
    label: "Plus jeune buteur",
    value: "Pelé",
    detail: "17 ans, 239 jours (Brésil vs Pays de Galles, 1958)",
  },
  {
    icon: "👴",
    label: "Plus vieux buteur",
    value: "Roger Milla",
    detail: "42 ans, 39 jours (Cameroun vs Russie, 1994)",
  },
  {
    icon: "🎯",
    label: "Record buts en 1 tournoi",
    value: "Just Fontaine",
    detail: "13 buts (France, 1958) — record imbattable",
  },
  {
    icon: "📅",
    label: "Plus grand nombre de CDM",
    value: "Antonio Carbajal & Lothar Matthäus",
    detail: "5 Coupes du Monde chacun",
  },
  {
    icon: "🌍",
    label: "Pays à avoir remporté la CDM",
    value: "8 nations",
    detail: "Brésil, Allemagne, Italie, Argentine, France, Uruguay, Espagne, Angleterre",
  },
  {
    icon: "🔥",
    label: "Plus grande victoire",
    value: "Hongrie 10–1 Salvador",
    detail: "Phase de groupes, 1982",
  },
  {
    icon: "💔",
    label: "Plus grande déroute en finale",
    value: "Brésil 0–3 France (finale 1998)",
    detail: "Ronaldo joue malgré une crise d'épilepsie la veille",
  },
  {
    icon: "🏠",
    label: "Pays hôte vainqueur",
    value: "6 fois",
    detail: "Uruguay 1930, Italie 1934, Angleterre 1966, Allemagne 1974, Argentine 1978, France 1998",
  },
  {
    icon: "🎪",
    label: "Édition 2026",
    value: "48 équipes, 104 matchs",
    detail: "USA, Canada, Mexique — 3 pays co-organisateurs",
  },
];

export default function PalmaresPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Palmarès CDM", url: "/palmares" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">
              Palmarès
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm font-medium text-green-300 uppercase tracking-widest mb-2">
            Coupe du Monde FIFA
          </p>
          <h1 className="text-4xl font-extrabold sm:text-6xl mb-4">
            🏆 Palmarès Historique
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            92 ans de football mondial · 22 éditions · 1930 → 2022
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-center">
            {[
              { val: "22", label: "Éditions" },
              { val: "8", label: "Champions différents" },
              { val: "5", label: "Titres Brésil (record)" },
              { val: "16", label: "Buts Klose (record)" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 space-y-12">

        {/* ── Palmarès par pays ────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            🌍 Palmarès par pays
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {countryRecords.map((cr, idx) => (
              <div
                key={cr.country}
                className={`rounded-xl border-2 p-5 shadow-sm transition-transform hover:-translate-y-1 ${
                  idx === 0
                    ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                    : idx <= 2
                    ? "border-gray-300 bg-gray-50 dark:bg-gray-800/40"
                    : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{cr.flag}</span>
                  <div>
                    <div className="font-bold text-lg">{cr.country}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {cr.confederation}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg bg-white dark:bg-slate-700 py-2">
                    <div className="text-2xl font-extrabold text-accent">
                      {cr.titles}
                    </div>
                    <div className="text-xs text-gray-500">titre{cr.titles > 1 ? "s" : ""}</div>
                  </div>
                  <div className="rounded-lg bg-white dark:bg-slate-700 py-2">
                    <div className="text-2xl font-extrabold text-gray-600 dark:text-gray-300">
                      {cr.finals}
                    </div>
                    <div className="text-xs text-gray-500">finale{cr.finals > 1 ? "s" : ""}</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {cr.years.map((y) => (
                    <span
                      key={y}
                      className="rounded bg-accent/10 dark:bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent"
                    >
                      {y}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2">
            📅 Timeline — tous les vainqueurs
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Cliquez sur une édition pour voir les détails.
          </p>

          {/* Timeline visual */}
          <div className="relative">
            {/* Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent hidden sm:block" />
            <div className="space-y-3 sm:pl-20">
              {editions.map((ed) => (
                <div
                  key={ed.year}
                  className="group relative rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 shadow-sm hover:border-accent hover:shadow-md transition-all"
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-[26px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-accent bg-white dark:bg-slate-800 hidden sm:block group-hover:bg-accent transition-colors" />
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center">
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-2xl font-extrabold text-accent">{ed.year}</span>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span>{ed.hostFlag}</span>
                        <span>{ed.host}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{ed.winnerFlag}</span>
                      <div>
                        <div className="font-bold text-sm">{ed.winner}</div>
                        <div className="text-xs text-green-600 dark:text-green-400">
                          🏆 Champion
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <div className="font-mono font-bold text-lg">{ed.score}</div>
                      <div className="text-xs">Score final</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{ed.runnerUpFlag}</span>
                      <div>
                        <div className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                          {ed.runnerUp}
                        </div>
                        <div className="text-xs text-gray-400">🥈 Finaliste</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                      <div className="flex items-center gap-1">
                        <span>{ed.thirdPlaceFlag}</span>
                        <span>{ed.thirdPlace}</span>
                        <span className="text-gray-300 dark:text-gray-600">(3e)</span>
                      </div>
                      <div className="mt-1">
                        ⚽ {ed.topScorer} ({ed.topScorerGoals} buts)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tableau complet ──────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            📊 Tableau complet des finales
          </h2>
          <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-primary text-white text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3 text-left">Année</th>
                    <th className="px-4 py-3 text-left">Pays hôte</th>
                    <th className="px-4 py-3 text-left">Champion</th>
                    <th className="px-4 py-3 text-center">Score</th>
                    <th className="px-4 py-3 text-left">Finaliste</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">3e place</th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">Meilleur buteur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {[...editions].reverse().map((ed) => (
                    <tr
                      key={ed.year}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors"
                    >
                      <td className="px-4 py-3 font-bold text-accent">
                        {ed.year}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        <span className="mr-1">{ed.hostFlag}</span>
                        {ed.host}
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 font-semibold">
                          <span>{ed.winnerFlag}</span>
                          <span>{ed.winner}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-mono font-bold bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
                          {ed.score}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-1.5">
                          <span>{ed.runnerUpFlag}</span>
                          <span>{ed.runnerUp}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                        <span className="flex items-center gap-1">
                          <span>{ed.thirdPlaceFlag}</span>
                          <span>{ed.thirdPlace}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs hidden lg:table-cell">
                        {ed.topScorer} ({ed.topScorerGoals})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Records ──────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
            🏅 Records &amp; stats marquantes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((rec) => (
              <div
                key={rec.label}
                className="rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 shadow-sm hover:border-accent transition-colors"
              >
                <div className="text-3xl mb-3">{rec.icon}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  {rec.label}
                </div>
                <div className="font-bold text-lg mb-1">{rec.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {rec.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section "Et en 2026 ?" ────────────────────────────── */}
        <section className="rounded-2xl bg-gradient-to-br from-primary to-accent text-white p-8 text-center shadow-xl">
          <h2 className="text-3xl font-extrabold mb-3">
            🌟 Et en 2026 ?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
            La Coupe du Monde 2026 (USA · Canada · Mexique) est la plus grande de l'histoire avec{" "}
            <strong className="text-white">48 équipes</strong> et{" "}
            <strong className="text-white">104 matchs</strong>. Qui écrira la prochaine page ?
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { flag: "🇧🇷", country: "Brésil", note: "6e titre ?" },
              { flag: "🇦🇷", country: "Argentine", note: "Défend son titre" },
              { flag: "🇫🇷", country: "France", note: "3e titre ?" },
              { flag: "🇩🇪", country: "Allemagne", note: "5e titre ?" },
              { flag: "🇵🇹", country: "Portugal", note: "1er titre ?" },
              { flag: "🇪🇸", country: "Espagne", note: "2e titre ?" },
            ].map(({ flag, country, note }) => (
              <div
                key={country}
                className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 text-center min-w-[100px]"
              >
                <div className="text-3xl">{flag}</div>
                <div className="font-bold text-sm mt-1">{country}</div>
                <div className="text-xs text-white/70 mt-0.5">{note}</div>
              </div>
            ))}
          </div>
          <Link
            href="/pronostic-vainqueur"
            className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-bold px-8 py-4 text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            🏆 Voir le pronostic vainqueur 2026
          </Link>
          <div className="mt-4">
            <Link
              href="/pronostic"
              className="text-white/70 hover:text-white text-sm underline transition-colors"
            >
              Tous les pronostics →
            </Link>
          </div>
        </section>

      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Palmarès Coupe du Monde FIFA 1930–2022",
            description: "Liste complète des vainqueurs de la Coupe du Monde FIFA",
            numberOfItems: editions.length,
            itemListElement: editions.map((ed, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: `CDM ${ed.year} — ${ed.winner} champion`,
            })),
          }),
        }}
      />
    </>
  );
}
