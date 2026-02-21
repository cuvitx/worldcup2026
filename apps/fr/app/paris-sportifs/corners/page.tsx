import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { CornerDownRight, ArrowRight, AlertTriangle, TrendingUp, BarChart3, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Paris Corners CDM 2026 — Over/Under, Stats & Stratégies",
  description:
    "Paris corners Coupe du Monde 2026 : over/under 9.5, stats historiques, équipes offensives et cotes comparées. Guide et stratégies.",
  openGraph: {
    title: "Paris Corners CDM 2026 — Guide & Stratégies",
    description:
      "Over/under corners, stats historiques CDM, top 5 équipes les plus cornereuses et meilleures cotes bookmakers.",
    url: "https://www.cdm2026.fr/paris-sportifs/corners",
  },
  alternates: { canonical: "https://www.cdm2026.fr/paris-sportifs/corners" },
};

/* ---------- data ---------- */

const statsHistoriques = [
  { edition: "Russie 2018", matchs: 64, totalCorners: 628, moyenne: "9.8" },
  { edition: "Qatar 2022", matchs: 64, totalCorners: 672, moyenne: "10.5" },
  { edition: "Brésil 2014", matchs: 64, totalCorners: 604, moyenne: "9.4" },
  { edition: "Afrique du Sud 2010", matchs: 64, totalCorners: 587, moyenne: "9.2" },
  { edition: "Allemagne 2006", matchs: 64, totalCorners: 614, moyenne: "9.6" },
];

const topEquipes = [
  { equipe: "🇧🇷 Brésil", moyCorners: "6.8", style: "Jeu de possession offensif, débordements constants sur les ailes" },
  { equipe: "🇪🇸 Espagne", moyCorners: "6.5", style: "Tiki-taka, pressing haut, multiples centres depuis les couloirs" },
  { equipe: "🇩🇪 Allemagne", moyCorners: "6.2", style: "Latéraux offensifs (Kimmich), corners sur coups de pied arrêtés" },
  { equipe: "🇫🇷 France", moyCorners: "5.9", style: "Attaques rapides, frappes déviées, pressing en 2e mi-temps" },
  { equipe: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", moyCorners: "5.7", style: "Centres fréquents, jeu direct, set-pieces travaillées" },
];

const cotesCorners = [
  { marche: "Over 9.5 corners", winamax: "1.85", betclic: "1.82", unibet: "1.88" },
  { marche: "Under 9.5 corners", winamax: "1.95", betclic: "1.98", unibet: "1.92" },
  { marche: "Over 11.5 corners", winamax: "2.40", betclic: "2.35", unibet: "2.45" },
  { marche: "Under 11.5 corners", winamax: "1.55", betclic: "1.58", unibet: "1.52" },
  { marche: "1er corner — Équipe A", winamax: "1.80", betclic: "1.75", unibet: "1.82" },
  { marche: "Dernier corner — Équipe B", winamax: "2.10", betclic: "2.05", unibet: "2.15" },
];

const bookmakers = [
  { nom: "Winamax", desc: "Large choix de marchés corners, cotes compétitives, interface intuitive", url: "https://www.winamax.fr" },
  { nom: "Betclic", desc: "Over/under corners dès la phase de groupes, promos régulières CDM", url: "https://www.betclic.fr" },
  { nom: "Unibet", desc: "Corners en live, cashout disponible, stats intégrées dans l'appli", url: "https://www.unibet.fr" },
];

const strategies = [
  {
    titre: "Pressing haut = plus de corners",
    contenu:
      "Les équipes qui pratiquent un pressing haut forcent l'adversaire à dégager en touche ou en corner. Repérez les équipes au PPDA (Passes Per Defensive Action) bas : Espagne, Allemagne, Argentine. Ces matchs dépassent souvent les 10.5 corners.",
  },
  {
    titre: "Équipes défensives = under corners",
    contenu:
      "Lorsque deux équipes défensives se rencontrent (blocs bas, peu de possession dans le dernier tiers), le total corners reste souvent sous 9.5. Exemples typiques : matchs Iran, Arabie Saoudite, Australie en phase de groupes.",
  },
  {
    titre: "Analyser la météo et le terrain",
    contenu:
      "La CDM 2026 se joue en été aux USA, Canada et Mexique. La chaleur fatigue les défenses en 2e mi-temps, provoquant davantage de corners dans les 30 dernières minutes. Ciblez le marché « corners 2e mi-temps over ».",
  },
  {
    titre: "1er corner : l'équipe qui domine",
    contenu:
      "Dans 68 % des matchs CDM, l'équipe favorite obtient le 1er corner. Combinez ce pari avec un « victoire 1e mi-temps » pour un mini-combiné à cote attractive (~3.20).",
  },
];

const faqItems = [
  {
    question: "Qu'est-ce qu'un pari over/under corners ?",
    answer:
      "Un pari over/under corners consiste à miser sur le nombre total de corners dans un match. Par exemple, over 9.5 signifie que vous pariez sur 10 corners ou plus. Under 9.5 signifie 9 corners ou moins. Les lignes les plus courantes en CDM sont 9.5 et 11.5.",
  },
  {
    question: "Quelle est la moyenne de corners par match en Coupe du Monde ?",
    answer:
      "Sur les 5 dernières Coupes du Monde, la moyenne oscille entre 9.2 et 10.5 corners par match. Au Qatar 2022, la moyenne était de 10.5, la plus haute récemment. Pour la CDM 2026, les experts tablent sur environ 10.0 à 10.8 corners par match.",
  },
  {
    question: "Comment analyser les corners avant un match ?",
    answer:
      "Vérifiez le style de jeu des deux équipes (pressing haut vs bloc bas), les stats de corners des qualifications, la forme récente et la météo. Les équipes offensives avec des ailiers percutants génèrent naturellement plus de corners.",
  },
  {
    question: "Peut-on parier sur les corners en live ?",
    answer:
      "Oui, la plupart des bookmakers (Winamax, Betclic, Unibet) proposent les marchés corners en live. C'est même une stratégie populaire : observer les 15 premières minutes pour évaluer le rythme du match avant de miser sur le total corners.",
  },
];

/* ---------- page ---------- */

export default function ParisCornersPage() {
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Paris corners CDM 2026" },
  ];
  
  return (
    <>
<Breadcrumb items={breadcrumbItems} />

      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Paris sportifs — corners
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Guide des paris corners CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Over/under 9.5 &amp; 11.5, total corners, 1er corner, dernier corner : exploitez les
            stats historiques et nos stratégies pour parier sur les corners de la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">

        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <CornerDownRight className="h-7 w-7 text-accent" /> Comprendre les paris corners
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              Les paris corners constituent un marché en pleine expansion sur les compétitions internationales.
              Contrairement aux paris classiques (1X2, buts), les corners offrent une approche statistique
              où l'analyse des styles de jeu prime sur la forme pure des équipes. En Coupe du Monde,
              chaque match génère en moyenne <strong>9 à 11 corners</strong>, ce qui rend les lignes
              over/under 9.5 et 11.5 particulièrement intéressantes.
            </p>
            <p>
              Les marchés disponibles incluent le <strong>total corners du match</strong>, le nombre de
              corners par équipe, le <strong>1er corner</strong> (quelle équipe l'obtient), le <strong>dernier
              corner</strong>, et les corners par mi-temps. Chacun de ces marchés nécessite une analyse
              différente — et c'est là que réside la valeur pour les parieurs avertis.
            </p>
          </div>
        </section>

        {/* Stats historiques */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-accent" /> Statistiques corners par Coupe du Monde
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-accent/30 text-left">
                  <th className="py-3 px-4 text-primary font-semibold">Édition</th>
                  <th className="py-3 px-4 text-primary font-semibold">Matchs</th>
                  <th className="py-3 px-4 text-primary font-semibold">Total corners</th>
                  <th className="py-3 px-4 text-primary font-semibold">Moyenne / match</th>
                </tr>
              </thead>
              <tbody>
                {statsHistoriques.map((s) => (
                  <tr key={s.edition} className="border-b border-gray-100">
                    <td className="py-2.5 px-4 font-medium text-gray-900">{s.edition}</td>
                    <td className="py-2.5 px-4 text-gray-600">{s.matchs}</td>
                    <td className="py-2.5 px-4 text-gray-600">{s.totalCorners}</td>
                    <td className="py-2.5 px-4 text-accent font-bold">{s.moyenne}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2 italic">
            Tendance : la moyenne de corners augmente à chaque édition, portée par un jeu plus offensif et un pressing plus intense.
          </p>
        </section>

        {/* Top 5 équipes */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-accent" /> Top 5 équipes les plus &ldquo;cornereuses&rdquo;
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Ces équipes génèrent le plus de corners par match en compétitions internationales récentes.
            Ciblez leurs matchs pour vos paris over corners.
          </p>
          <div className="space-y-3">
            {topEquipes.map((eq, i) => (
              <div
                key={eq.equipe}
                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900">{eq.equipe}</h3>
                    <span className="text-xs bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full">
                      {eq.moyCorners} corners/match
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{eq.style}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tableau cotes */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-accent" /> Cotes over/under corners — comparatif
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-accent/30 text-left">
                  <th className="py-3 px-4 text-primary font-semibold">Marché</th>
                  <th className="py-3 px-4 text-primary font-semibold">Winamax</th>
                  <th className="py-3 px-4 text-primary font-semibold">Betclic</th>
                  <th className="py-3 px-4 text-primary font-semibold">Unibet</th>
                </tr>
              </thead>
              <tbody>
                {cotesCorners.map((c) => (
                  <tr key={c.marche} className="border-b border-gray-100">
                    <td className="py-2.5 px-4 font-medium text-gray-900">{c.marche}</td>
                    <td className="py-2.5 px-4 text-gray-600">{c.winamax}</td>
                    <td className="py-2.5 px-4 text-gray-600">{c.betclic}</td>
                    <td className="py-2.5 px-4 text-accent font-bold">{c.unibet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2 italic">
            Cotes indicatives pour un match type de phase de groupes CDM 2026. Comparez toujours avant de miser.
          </p>
        </section>

        {/* Stratégies */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <CornerDownRight className="h-7 w-7 text-accent" /> Stratégies pour parier sur les corners
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {strategies.map((s) => (
              <div
                key={s.titre}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <h3 className="font-bold text-gray-900 text-base mb-2">{s.titre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.contenu}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lien pronostics par match */}
        <section className="rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
          <h2 className="text-xl font-bold text-primary mb-2">
            Pronostics corners match par match
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Retrouvez nos analyses corners détaillées pour chaque match de la CDM 2026 :
            over/under, 1er corner, corners par mi-temps.
          </p>
          <Link
            href="/paris-sportifs/corners"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Voir les pronostics corners <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Bookmakers CTA */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <CornerDownRight className="h-7 w-7 text-accent" /> Meilleurs bookmakers pour les paris corners
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {bookmakers.map((b) => (
              <a
                key={b.nom}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="rounded-xl border border-gray-200 bg-white p-5 hover:border-accent/50 hover:shadow-md transition-all block"
              >
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  {b.nom} <ExternalLink className="h-4 w-4 text-gray-400" />
                </h3>
                <p className="text-sm text-gray-600 mt-1">{b.desc}</p>
                <span className="inline-block mt-3 bg-accent text-white rounded-xl py-3.5 px-4 text-sm font-semibold text-center w-full">
                  Parier sur {b.nom}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* CTA secondaires */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/comparateur-cotes"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Comparateur de cotes <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/paris-sportifs/combines"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Paris combinés CDM 2026
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
