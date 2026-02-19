import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { StatBar } from "../components/StatBar";

export const metadata: Metadata = {
  title: "Statistiques Coupe du Monde - Records et chiffres clés | CDM 2026",
  description:
    "Toutes les statistiques de la Coupe du Monde FIFA : top buteurs all-time, pays les plus titrés, buts par édition, records historiques et fun facts. De 1930 à 2026.",
  openGraph: {
    title: "Statistiques Coupe du Monde - Records et chiffres clés",
    description:
      "Top buteurs, pays titrés, buts par édition et records historiques de la Coupe du Monde FIFA depuis 1930.",
    url: "https://cdm2026.fr/statistiques",
  },
  alternates: {
    canonical: "https://cdm2026.fr/statistiques",
  },
};

// ── Données ────────────────────────────────────────────────────────────────

const topScorers = [
  { name: "Miroslav Klose", country: "🇩🇪 Allemagne", goals: 16, editions: "2002–2014" },
  { name: "Ronaldo (R9)", country: "🇧🇷 Brésil", goals: 15, editions: "1994–2006" },
  { name: "Gerd Müller", country: "🇩🇪 Allemagne", goals: 14, editions: "1970–1974" },
  { name: "Just Fontaine", country: "🇫🇷 France", goals: 13, editions: "1958" },
  { name: "Pelé", country: "🇧🇷 Brésil", goals: 12, editions: "1958–1970" },
  { name: "Sándor Kocsis", country: "🇭🇺 Hongrie", goals: 11, editions: "1954" },
  { name: "Jürgen Klinsmann", country: "🇩🇪 Allemagne", goals: 11, editions: "1990–1998" },
  { name: "Helmut Rahn", country: "🇩🇪 Allemagne", goals: 10, editions: "1954–1958" },
  { name: "Teófilo Cubillas", country: "🇵🇪 Pérou", goals: 10, editions: "1970–1978" },
  { name: "Grzegorz Lato", country: "🇵🇱 Pologne", goals: 10, editions: "1974–1982" },
  { name: "Gary Lineker", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", goals: 10, editions: "1986–1990" },
  { name: "Gabriel Batistuta", country: "🇦🇷 Argentine", goals: 10, editions: "1994–2002" },
];

const titledCountries = [
  { country: "🇧🇷 Brésil", titles: 5, color: "green" as const },
  { country: "🇩🇪 Allemagne", titles: 4, color: "accent" as const },
  { country: "🇮🇹 Italie", titles: 4, color: "blue" as const },
  { country: "🇦🇷 Argentine", titles: 3, color: "accent" as const },
  { country: "🇫🇷 France", titles: 2, color: "blue" as const },
  { country: "🇺🇾 Uruguay", titles: 2, color: "teal" as const },
  { country: "🇪🇸 Espagne", titles: 1, color: "orange" as const },
  { country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", titles: 1, color: "purple" as const },
];

const goalsByEdition = [
  { year: 1930, goals: 70, teams: 13, matches: 18, avg: 3.89 },
  { year: 1934, goals: 70, teams: 16, matches: 17, avg: 4.12 },
  { year: 1938, goals: 84, teams: 15, matches: 18, avg: 4.67 },
  { year: 1950, goals: 88, teams: 13, matches: 22, avg: 4.00 },
  { year: 1954, goals: 140, teams: 16, matches: 26, avg: 5.38 },
  { year: 1958, goals: 126, teams: 16, matches: 35, avg: 3.60 },
  { year: 1962, goals: 89, teams: 16, matches: 32, avg: 2.78 },
  { year: 1966, goals: 89, teams: 16, matches: 32, avg: 2.78 },
  { year: 1970, goals: 95, teams: 16, matches: 32, avg: 2.97 },
  { year: 1974, goals: 97, teams: 16, matches: 38, avg: 2.55 },
  { year: 1978, goals: 102, teams: 16, matches: 38, avg: 2.68 },
  { year: 1982, goals: 146, teams: 24, matches: 52, avg: 2.81 },
  { year: 1986, goals: 132, teams: 24, matches: 52, avg: 2.54 },
  { year: 1990, goals: 115, teams: 24, matches: 52, avg: 2.21 },
  { year: 1994, goals: 141, teams: 24, matches: 52, avg: 2.71 },
  { year: 1998, goals: 171, teams: 32, matches: 64, avg: 2.67 },
  { year: 2002, goals: 161, teams: 32, matches: 64, avg: 2.52 },
  { year: 2006, goals: 147, teams: 32, matches: 64, avg: 2.30 },
  { year: 2010, goals: 145, teams: 32, matches: 64, avg: 2.27 },
  { year: 2014, goals: 171, teams: 32, matches: 64, avg: 2.67 },
  { year: 2018, goals: 169, teams: 32, matches: 64, avg: 2.64 },
  { year: 2022, goals: 172, teams: 32, matches: 64, avg: 2.69 },
];

const records = [
  {
    icon: "🔥",
    category: "Record de victoire",
    title: "Hongrie 10–1 Salvador",
    detail: "Phase de groupes — Coupe du Monde 1982, Elche, Espagne",
    badge: "Record absolu",
    badgeColor: "bg-red-500",
  },
  {
    icon: "⚽",
    category: "Match le plus prolifique",
    title: "Autriche 7–5 Suisse",
    detail: "Phase de groupes — CDM 1954 (12 buts en un seul match !)",
    badge: "12 buts",
    badgeColor: "bg-orange-500",
  },
  {
    icon: "👶",
    category: "Plus jeune buteur",
    title: "Pelé — 17 ans, 239 jours",
    detail: "Brésil vs Pays de Galles — CDM 1958, quart de finale",
    badge: "Record de jeunesse",
    badgeColor: "bg-green-500",
  },
  {
    icon: "👴",
    category: "Plus vieux buteur",
    title: "Roger Milla — 42 ans, 39 jours",
    detail: "Cameroun vs Russie — CDM 1994 (groupe A)",
    badge: "Record de longévité",
    badgeColor: "bg-primary",
  },
  {
    icon: "🎯",
    category: "Record en 1 tournoi",
    title: "Just Fontaine — 13 buts en 1958",
    detail: "Record imbattu depuis 66 ans ! (France, CDM 1958 Suède)",
    badge: "Imbattable ?",
    badgeColor: "bg-primary/500",
  },
  {
    icon: "🏃",
    category: "Plus de matchs joués",
    title: "Lothar Matthäus — 25 matchs",
    detail: "Allemagne, 5 Coupes du Monde (1982–1998)",
    badge: "25 matchs",
    badgeColor: "bg-teal-500",
  },
  {
    icon: "🏆",
    category: "Plus de titres (joueur)",
    title: "Pelé — 3 couronnes mondiales",
    detail: "Brésil 1958, 1962, 1970 — le seul joueur à avoir remporté 3 CDM",
    badge: "Légende absolue",
    badgeColor: "bg-gold",
  },
  {
    icon: "🥅",
    category: "Match sans buts",
    title: "CDM 1990 — édition la plus défensive",
    detail: "Moyenne : 2,21 buts/match — la plus basse de l'histoire",
    badge: "Édition plus défensive",
    badgeColor: "bg-gray-500",
  },
];

const funFacts = [
  {
    emoji: "🇸🇦",
    fact: "L'Arabie Saoudite a battu l'Argentine 2-1 lors du Mondial 2022, l'une des plus grandes surprises de l'histoire.",
  },
  {
    emoji: "🇩🇰",
    fact: "Le Danemark a gagné toutes ses 3 qualifications pour un Mondial et tous ses matchs du premier tour (1986, 1998, 2002).",
  },
  {
    emoji: "🎵",
    fact: "La chanson 'Waka Waka' de Shakira pour le Mondial 2010 est la chanson officielle de CDM la plus écoutée de l'histoire : +3 milliards de vues YouTube.",
  },
  {
    emoji: "🐙",
    fact: "Paul le Poulpe a prédit correctement tous les résultats de l'équipe d'Allemagne (6/6) et la finale du Mondial 2010.",
  },
  {
    emoji: "⚽",
    fact: "Just Fontaine (France) a inscrit ses 13 buts en 1958 en seulement 6 matchs — soit plus de 2 buts par match en moyenne.",
  },
  {
    emoji: "🌍",
    fact: "Le Brésil est le seul pays à avoir participé à TOUTES les éditions de la Coupe du Monde FIFA (22/22).",
  },
  {
    emoji: "🏠",
    fact: "6 équipes ont remporté la CDM en jouant à domicile (ou quasi-domicile) : Uruguay, Italie, Angleterre, Allemagne, Argentine, France.",
  },
  {
    emoji: "🔢",
    fact: "En 2026, 48 équipes disputeront 104 matchs sur 3 pays. En 1930, seulement 13 équipes et 18 matchs. Une révolution totale !",
  },
];

// ── Composant graphique buts ───────────────────────────────────────────────

function GoalsChart() {
  const maxGoals = Math.max(...goalsByEdition.map((e) => e.goals));

  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[600px]">
        {/* Barres verticales */}
        <div className="flex items-end gap-1.5 h-48 px-1">
          {goalsByEdition.map((ed) => {
            const heightPct = Math.round((ed.goals / maxGoals) * 100);
            const isRecord = ed.goals === maxGoals;
            return (
              <div key={ed.year} className="flex-1 flex flex-col items-center gap-1 group">
                <div
                  className="relative w-full rounded-t-sm transition-all duration-700 hover:opacity-90 cursor-default"
                  style={{
                    height: `${heightPct}%`,
                    background: isRecord
                      ? "linear-gradient(to top, #FF6B35, #ff9060)"
                      : "linear-gradient(to top, #060D18, #2EC4B6)",
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] rounded px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {ed.goals} buts · {ed.avg}/match
                  </div>
                </div>
                <span className="text-[9px] text-gray-500 dark:text-gray-400 rotate-45 origin-left translate-y-3 whitespace-nowrap">
                  {ed.year}
                </span>
              </div>
            );
          })}
        </div>
        {/* Légende */}
        <div className="mt-6 flex items-center gap-4 justify-center text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-accent inline-block" />
            Record (172 buts en 2022)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-primary dark:bg-primary inline-block" />
            Autres éditions
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Page principale ────────────────────────────────────────────────────────

export default function StatistiquesPage() {
  const maxGoals = Math.max(...topScorers.map((s) => s.goals));
  const maxTitles = Math.max(...titledCountries.map((c) => c.titles));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Statistiques CDM", url: "/statistiques" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Fil d'Ariane */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary dark:hover:text-white transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Statistiques</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-green-300 uppercase tracking-widest mb-2">
            Coupe du Monde FIFA · 1930–2026
          </p>
          <h1 className="text-4xl font-extrabold sm:text-6xl mb-4">
            📊 Statistiques &amp; Records
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
            92 ans de football mondial condensés en chiffres, graphiques et records inédits.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            {[
              { val: "22", label: "Éditions" },
              { val: "2 788", label: "Buts marqués" },
              { val: "16", label: "Buts Klose (record)" },
              { val: "48", label: "Équipes en 2026" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3 min-w-[110px]">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-16">

        {/* ── Top buteurs all-time ─────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2">
            ⚽ Top buteurs all-time
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Meilleurs réalisateurs de l'histoire de la Coupe du Monde FIFA.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <div className="space-y-4">
              {topScorers.map((scorer, i) => (
                <div key={scorer.name} className="flex items-center gap-3">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0
                        ? "bg-yellow-400 text-yellow-900"
                        : i === 1
                        ? "bg-gray-300 text-gray-700"
                        : i === 2
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">
                          {scorer.name}
                        </span>
                        <span className="ml-2 text-xs text-gray-400">{scorer.country}</span>
                      </div>
                      <span className="text-xs text-gray-400 hidden sm:inline">{scorer.editions}</span>
                    </div>
                    <StatBar
                      label=""
                      value={scorer.goals}
                      maxValue={maxGoals}
                      color={i === 0 ? "gold" : i < 3 ? "accent" : "blue"}
                      suffix=" buts"
                      size="md"
                      layout="default"
                      showValue={true}
                      animDelay={i * 60}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pays les plus titrés ─────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2">
            🏆 Pays les plus titrés
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Seules 8 nations ont remporté la Coupe du Monde depuis 1930.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <div className="space-y-5">
              {titledCountries.map((c, i) => (
                <div key={c.country} className="flex items-center gap-3">
                  <span className="w-6 text-sm font-bold text-gray-400 text-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <StatBar
                      label={c.country}
                      value={c.titles}
                      maxValue={maxTitles}
                      color={c.color}
                      suffix={c.titles > 1 ? " titres" : " titre"}
                      size="lg"
                      animDelay={i * 80}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-400 text-center">
              * Seules des équipes européennes et sud-américaines ont remporté le titre.
            </p>
          </div>
        </section>

        {/* ── Buts par édition ─────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2">
            📈 Buts marqués par édition (1930–2022)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Survolez les barres pour voir le détail. Édition 1954 : 5,38 buts/match — record absolu.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <GoalsChart />
            {/* Tableau compact */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs text-center">
                <thead>
                  <tr className="text-gray-400 uppercase border-b border-gray-100 dark:border-slate-700">
                    <th className="py-2 px-2 text-left">Édition</th>
                    <th className="py-2 px-2">Équipes</th>
                    <th className="py-2 px-2">Matchs</th>
                    <th className="py-2 px-2">Buts</th>
                    <th className="py-2 px-2">Moy/match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
                  {[...goalsByEdition].reverse().map((ed) => (
                    <tr
                      key={ed.year}
                      className={`hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors ${
                        ed.goals === maxGoals
                          ? "bg-accent/5 dark:bg-accent/10"
                          : ""
                      }`}
                    >
                      <td className="py-1.5 px-2 font-bold text-accent text-left">{ed.year}</td>
                      <td className="py-1.5 px-2 text-gray-600 dark:text-gray-400">{ed.teams}</td>
                      <td className="py-1.5 px-2 text-gray-600 dark:text-gray-400">{ed.matches}</td>
                      <td className="py-1.5 px-2 font-bold text-gray-900 dark:text-gray-100">
                        {ed.goals}
                        {ed.goals === maxGoals && (
                          <span className="ml-1 text-accent text-[9px]">★</span>
                        )}
                      </td>
                      <td className="py-1.5 px-2 text-gray-500">{ed.avg.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Records ──────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2">
            🏅 Records historiques
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Les moments qui ont marqué l'histoire du football mondial.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {records.map((rec) => (
              <div
                key={rec.title}
                className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 shadow-sm hover:border-accent hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">{rec.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-gray-400 uppercase tracking-wide">
                        {rec.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${rec.badgeColor}`}
                      >
                        {rec.badge}
                      </span>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-accent transition-colors">
                      {rec.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{rec.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Fun facts ────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold mb-2 flex items-center gap-2">
            💡 Saviez-vous que…
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Les anecdotes et curiosités méconnues de la Coupe du Monde.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {funFacts.map((ff, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 shadow-sm hover:border-accent transition-colors"
              >
                <span className="text-3xl flex-shrink-0">{ff.emoji}</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {ff.fact}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA / liens ──────────────────────────────────────── */}
        <section className="rounded-2xl bg-gradient-to-br from-primary to-accent text-white p-8 text-center shadow-xl">
          <h2 className="text-2xl font-extrabold mb-3">
            🌟 Explorez toute l'histoire
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Des statistiques aux pronostics, découvrez tout ce que vous devez savoir sur le Mondial 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/histoire"
              className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-bold px-6 py-3 hover:bg-gray-100 transition-colors"
            >
              📅 Timeline historique
            </Link>
            <Link
              href="/palmares"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 text-white font-bold px-6 py-3 hover:bg-white/30 transition-colors"
            >
              🏆 Palmarès complet
            </Link>
            <Link
              href="/pronostic-vainqueur"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 text-white font-bold px-6 py-3 hover:bg-white/30 transition-colors"
            >
              🎯 Pronostic 2026
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
            "@type": "WebPage",
            name: "Statistiques Coupe du Monde - Records et chiffres clés",
            description:
              "Toutes les statistiques historiques de la Coupe du Monde FIFA depuis 1930 : buteurs, pays, buts par édition et records.",
            url: "https://cdm2026.fr/statistiques",
            mainEntity: {
              "@type": "Dataset",
              name: "Statistiques Coupe du Monde FIFA 1930–2022",
              description: "Données historiques complètes de la CDM",
            },
          }),
        }}
      />
    </>
  );
}
